import toggleSidebar from "../layout/nav.js";
import { productsUrl } from "../settings/constant.js";
import { productImage } from "../components/elements.js";
import { getFromStorage, saveToStorage } from "../settings/storage.js";
import { cartKey, favKey } from "../settings/keys.js";
import { editIcon } from "../buttons/editIcon.js";
import modal from "../common/modal.js";
import handleFavourites from "../buttons/handleFavorites.js";
import { fillNavHeart } from "../common/createHtml.js";
toggleSidebar();

const breacrumbTitle = document.querySelector(".breadcrumb-item.active");
const imageContainer = document.querySelector(".image-container");
const productContainer = document.querySelector(".text-content-container");
const productDescription = document.querySelector(".product-description-details");
const productNutrition = document.querySelector(".product-nutrition");

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

// denne fungerer ikke her inne hvis du trykker hjerte
fillNavHeart();

(async function fetchProducts() {
  const response = await fetch(productsUrl + "/" + id);
  const result = await response.json();

  // sett hjerte hvis det er i favoritter
  const currentFavorites = getFromStorage(favKey);
  const doesFavExists = currentFavorites.find(fav => {
    if (parseInt(fav.id) === result.id || fav.id === result.id) {
      return true;
    }
  });

  let cssClass = doesFavExists ? "fa" : "far";

  productImage.src = `${result.image_url}`;
  // jeg kan lage en funksjon her som kan brukes flere plasser
  let titleWithoutSpan = result.title.replace("<span>", "").replace("</span>", "");
  breacrumbTitle.innerText = `${titleWithoutSpan}`;

  // form?

  // HUSK Å FIKS MODAL CLASSES

  productContainer.innerHTML += `<div class="title-container">
                                  <h1 class="title">${result.title}</h1>
                                  <a href="edit.html?id=${result.id}"><i class="far fa-edit"></i></a>
                                  <p>${result.description}</p>
                                </div>
                                  
                                  <div class="buy-container">
                                    <div class="container price-quantity-container">
                                      <div class="number">
                                        <span class="minus">-</span>
                                        <input class="input-quantity" type="text" value="1" disabled="true"/>
                                        <span class="plus">+</span>
                                      </div>
                                    <p class="price"></p>
                                    </div>

                                    <button type="button" class="btn btn-primary" id="addToCart-btn" data-id="${result.id}" data-title="${result.title}" 
                                    data-description="${result.description}" data-price="${result.price}" data-volume="${result.volume}" 
                                    data-featured="${result.featured}" data-image_url="${result.image_url}" data-nutrition="${result.nutrition}"
                                    data-description_detail="${result.description_details}">
                                    <i class="fas fa-plus"></i> Add to cart</button>
                                
                                  </div`;

  imageContainer.insertAdjacentHTML(
    "afterbegin",
    `<i class="far fa-heart favorite-icon ${cssClass}" data-id="${result.id}" data-title="${result.title}" data-description="${result.description}" data-price="${result.price}" data-volume="${result.volume}" data-image_url="${result.image_url}"></i>`
  );

  // tok vekk volume
  const minus = document.querySelector(".minus");
  const plus = document.querySelector(".plus");

  productDescription.innerText = `${result.description_details}`;
  productNutrition.innerText = `${result.nutrition}`;

  const favoritesHeart = document.querySelector(".favorite-icon");
  const addToCartBtn = document.querySelector("#addToCart-btn");

  addToCartBtn.addEventListener("click", addToCart);
  favoritesHeart.addEventListener("click", handleFavourites);
  // gå over alle navnene her, ulikt på hver side
  minus.addEventListener("click", decreaseQuantity);
  plus.addEventListener("click", increaseQuantity);

  function decreaseQuantity() {
    this.nextElementSibling.value--;

    if (this.nextElementSibling.value <= 1) {
      this.nextElementSibling.value = 1;
    }
    showPrice(result);
  }

  function increaseQuantity() {
    this.previousElementSibling.value++;
    showPrice(result);
  }

  editIcon();
  // changeButton(result);
  showPrice(result);
})();

// en funksjon som dekker begge, bare bytter ut navn

function addToCart() {
  // dette kan vel være en egen funksjon?
  const id = this.dataset.id;
  const title = this.dataset.title;
  const price = this.dataset.price;
  const volume = this.dataset.volume;
  const image_url = this.dataset.image_url;
  const description = this.dataset.description;

  const input = document.querySelector(".input-quantity");
  let count = input.value;

  const cartItems = getFromStorage(cartKey);
  const productExists = cartItems.find(product => product.id === id);

  if (productExists) {
    if (count <= 1) {
      productExists.quantity++;
    }
    if (count >= 2) {
      productExists.quantity = parseFloat(productExists.quantity) + parseFloat(count);
    }
    saveToStorage(cartKey, cartItems);
  } else {
    const product = { id, title, price, volume, image_url, description, quantity: count };
    cartItems.push(product);
    saveToStorage(cartKey, cartItems);
  }

  modal(`${title} is added to cart!`, "Product added", "cart", "Go to cart", productAdded);

  function productAdded() {
    location.href = "cart.html";
    input.value = 1;
  }
  input.value = 1;
}

function showPrice(result) {
  const priceSection = document.querySelector(".price");
  const input = document.querySelector(".input-quantity");
  let price = result.price * input.value;
  priceSection.innerText = `${price.toFixed(2)}$`;
}
