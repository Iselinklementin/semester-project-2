import toggleSidebar from "../layout/nav.js";
import { PRODUCT_URL } from "../settings/api.js";
import { productImage } from "../components/elements.js";
import { getFromStorage } from "../settings/storage.js";
import { FAV_STORAGE_KEY } from "../settings/keys.js";
import { showEditIcon } from "../layout/showEditIcon.js";
import handleFavourites from "../buttons/handleFavorites.js";
import { fillNavHeart } from "../layout/fillNavHeart.js";
import {
  breacrumbTitle,
  imageContainer,
  productDescription,
  productNutrition,
  loader,
  documentTitle,
  contentContainer,
} from "../components/elements.js";
import { addToCart } from "../buttons/addToCart.js";
import { updatePriceDetail } from "../common/handlePrice/updatePriceDetail.js";
import { changeCartIcon } from "../layout/changeCartIcon.js";

toggleSidebar();
fillNavHeart();
changeCartIcon();

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

(async function fetchProducts() {
  const response = await fetch(PRODUCT_URL + id);
  const product = await response.json();

  loader.style.display = "none";
  const currentFavorites = getFromStorage(FAV_STORAGE_KEY);
  const doesFavExists = currentFavorites.find((fav) => {
    if (parseInt(fav.id) === product.id || fav.id === product.id) {
      return true;
    }
  });
  let cssClass = doesFavExists ? "fa" : "far";

  contentContainer.innerHTML += `<div class="title-container">
                                  <h1 class="title">${product.title}</h1>
                                  <a href="edit.html?id=${product.id}"><i class="fas fa-edit"></i></a>
                                  <p>${product.description}</p>
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

                                    <button type="button" class="btn btn-primary" id="addToCart-btn" data-id="${product.id}" data-title="${product.title}" 
                                    data-description="${product.description}" data-price="${product.price}" data-volume="${product.volume}" 
                                    data-featured="${product.featured}" data-image_url="${product.image_url}" data-nutrition="${product.nutrition}"
                                    data-description_detail="${product.description_details}">
                                    <i class="fas fa-plus"></i> Add to cart</button>
                                  </div`;

  // adding favourite-heart
  imageContainer.insertAdjacentHTML(
    "afterbegin",
    `<i class="far fa-heart favorite-icon ${cssClass}" data-id="${product.id}" data-title="${product.title}" 
    data-description="${product.description}" data-price="${product.price}" data-volume="${product.volume}" 
    data-image_url="${product.image_url}"></i>`
  );

  // remove span from the title
  let titleWithoutSpan = product.title.replace("<span>", "").replace("</span>", "");

  breacrumbTitle.innerText = titleWithoutSpan;
  documentTitle.innerHTML = titleWithoutSpan;
  productImage.alt = titleWithoutSpan;
  productImage.src = product.image_url;
  productDescription.innerText = product.description_details;
  productNutrition.innerText = product.nutrition;

  const minus = document.querySelector(".minus");
  const plus = document.querySelector(".plus");

  const favoritesHeart = document.querySelector(".favorite-icon");
  const addToCartBtn = document.querySelector("#addToCart-btn");

  addToCartBtn.addEventListener("click", addToCart);
  favoritesHeart.addEventListener("click", handleFavourites);
  minus.addEventListener("click", decreaseQuantity);
  plus.addEventListener("click", increaseQuantity);

  function decreaseQuantity() {
    this.nextElementSibling.value--;

    if (this.nextElementSibling.value <= 1) {
      this.nextElementSibling.value = 1;
    }
    updatePriceDetail(product);
  }

  function increaseQuantity() {
    this.previousElementSibling.value++;
    updatePriceDetail(product);
  }

  showEditIcon();
  updatePriceDetail(product);
})();
