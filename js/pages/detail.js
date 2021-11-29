import toggleSidebar from "../layout/nav.js";
import { productsUrl } from "../settings/constant.js";
import { productImage } from "../components/elements.js";
import { getFromStorage, saveToStorage } from "../settings/storage.js";
import { cartKey, favKey } from "../settings/keys.js";
toggleSidebar();

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

(async function fetchProducts() {
  const response = await fetch(productsUrl + "/" + id);
  const result = await response.json();
  console.log(result);

  productImage.src = `${result.image_url}`;

  const productContainer = document.querySelector(".product-container");
  const productDescription = document.querySelector(".product-description");
  const productNutrition = document.querySelector(".product-nutrition");

  // form?

  productContainer.innerHTML += `<h1>${result.title}</h1>
  <i class="far fa-heart favorite-icon" data-id="${result.id}" data-title="${result.title}" data-description="${result.description}" data-price="${result.price}" data-volume="${result.volume}" data-image="${result.image_url}"></i>
  <a href="edit.html?id=${result.id}"><i class="far fa-edit"></i></a>
                                  <div class="buy-container">
                                    <div class="volume-quantity-container">
                                      <p class="price">${result.price}$</p>

                                      <select class="form-select volume" aria-label="Select volume">
                                        <option selected>Choose volume</option>
                                        <option value="1">250ml</option>
                                        <option value="2">750ml</option>
                                      </select>
                                  
                                      <div class="number">
                                        <span class="minus">-</span>
                                        <input type="text" value="1"/>
                                        <span class="plus">+</span>
                                      </div>
                                    </div>

                                    <button type="button" class="btn btn-primary" id="addToCart-btn" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="${result.id}" data-title="${result.title}" data-description="${result.description}" data-price="${result.price}" data-volume="${result.volume}" data-featured="${result.featured}" data-image_url="${result.image_url}">
                                    Add to cart
                                    </button>

                                   
                                  </div`;

  //   <div class="button">
  //   <a href="#" class="btn addToCart-btn" data-id="${result.id}" data-title="${result.title}" data-description="${result.description}" data-price="${result.price}" data-volume="${result.volume}" data-image="${result.image_url}">Add to cart</a>
  // </div>

  productDescription.innerText = `${result.description}`;
  // data-id="${result.id}" data-title="${result.title}" data-description="${result.description}" data-price="${result.price}" data-volume="${result.volume}" data-image="${result.image_url}"
  // her kommer nutrition
  const favoritesHeart = document.querySelector(".favorite-icon");
  const addToCartBtn = document.querySelector("#addToCart-btn");
  console.log(addToCartBtn);
  addToCartBtn.addEventListener("click", addToCart);
  favoritesHeart.addEventListener("click", addFavorite);
  // console.log(favoritesHeart);
  // productName.innerText = `${result.title}`;
})();

// en funksjon som dekker begge, bare bytter ut navn

function addToCart() {
  const id = this.dataset.id;
  const title = this.dataset.title;
  const description = this.dataset.description;
  const price = this.dataset.price;
  const volume = this.dataset.volume;
  const image_url = this.dataset.image_url;
  const featured = this.dataset.featured;

  const cartItems = getFromStorage(cartKey);
  const productExists = cartItems.find((product) => product.id === id);

  // legg til produktet, selv om det allerede er i cart
  // if (productExists) {
  // const product = { id, title, description, price, volume };
  if (productExists) {
    const idDuplicate = true;
    const product = { id, title, description, price, volume, image_url, featured, idDuplicate };
    cartItems.push(product);
    saveToStorage(cartKey, cartItems);
  } else {
    const idDuplicate = false;
    const product = { id, title, description, price, volume, image_url, featured, idDuplicate };
    cartItems.push(product);
    saveToStorage(cartKey, cartItems);
  }

  // }
  // else {
  //   const newCartItem = cartItems.filter((product) => product.id !== id);
  //   saveToStorage(cartKey, newCartItem);
  // }
}

function addFavorite() {
  this.classList.toggle("fa");

  const id = this.dataset.id;
  const title = this.dataset.title;
  const description = this.dataset.description;
  const price = this.dataset.price;
  const volume = this.dataset.volume;

  const favList = getFromStorage(favKey);
  const favExists = favList.find((fav) => fav.id === id);

  if (!favExists) {
    const favorite = { id: id, title: title, description: description, price: price, volume: volume };
    favList.push(favorite);
    saveToStorage(favKey, favList);
  } else {
    const newfavorite = favList.filter((fav) => fav.id !== id);
    saveToStorage(favKey, newfavorite);
  }
}
