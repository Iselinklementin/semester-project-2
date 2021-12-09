import toggleSidebar from "../layout/nav.js";
import { productsUrl } from "../settings/constant.js";
import { productImage } from "../components/elements.js";
import { getFromStorage } from "../settings/storage.js";
import { favKey } from "../settings/keys.js";
import { editIcon } from "../buttons/editIcon.js";
import handleFavourites from "../buttons/handleFavorites.js";
import { fillNavHeart } from "../common/fillNavHeart.js";
import {
  breacrumbTitle,
  imageContainer,
  productDescription,
  productNutrition,
  loader,
  documentTitle,
} from "../components/elements.js";
import { addToCart } from "../common/addToCart.js";
import { showPrice } from "../common/showPrice.js";
import { changeCartIcon } from "../common/changeCartIcon.js";

toggleSidebar();

// skift navn på den her
export const productContainer = document.querySelector(".text-content-container");

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

fillNavHeart();
changeCartIcon();

// tok vekk volume, se om det bør være med på designet

(async function fetchProducts() {
  const response = await fetch(productsUrl + "/" + id);
  const result = await response.json();

  loader.style.display = "none";

  // add heart-icon if its in favorites
  // har den to plasser
  const currentFavorites = getFromStorage(favKey);
  const doesFavExists = currentFavorites.find(fav => {
    if (parseInt(fav.id) === result.id || fav.id === result.id) {
      return true;
    }
  });
  let cssClass = doesFavExists ? "fa" : "far";

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
    `<i class="far fa-heart favorite-icon ${cssClass}" data-id="${result.id}" data-title="${result.title}" 
    data-description="${result.description}" data-price="${result.price}" data-volume="${result.volume}" 
    data-image_url="${result.image_url}"></i>`
  );

  // jeg kan lage en funksjon her som kan brukes flere plasser?
  let titleWithoutSpan = result.title.replace("<span>", "").replace("</span>", "");
  breacrumbTitle.innerText = titleWithoutSpan;
  documentTitle.innerHTML = titleWithoutSpan;
  productImage.alt = titleWithoutSpan;
  productImage.src = result.image_url;
  productDescription.innerText = result.description_details;
  productNutrition.innerText = result.nutrition;

  const minus = document.querySelector(".minus");
  const plus = document.querySelector(".plus");
  const favoritesHeart = document.querySelector(".favorite-icon");
  const addToCartBtn = document.querySelector("#addToCart-btn");

  // gå over alle navnene her, ulikt på hver side
  addToCartBtn.addEventListener("click", addToCart);
  favoritesHeart.addEventListener("click", handleFavourites);
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
  showPrice(result);
  // changeButton(result);
})();
