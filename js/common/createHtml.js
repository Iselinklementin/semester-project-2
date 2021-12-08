import Block from "../components/blocks.js";
import { cartKey, favKey } from "../settings/keys.js";
import { getFromStorage } from "../settings/storage.js";
import handleFavourites from "../buttons/handleFavorites.js";
import { editIcon } from "../buttons/editIcon.js";

export function createHtml(products) {
  const productContainer = document.querySelector(".product-container");
  productContainer.innerHTML = "";
  const currentFavorites = getFromStorage(favKey);

  products.forEach((product) => {
    const doesFavExists = currentFavorites.find((fav) => {
      if (parseInt(fav.id) === product.id || fav.id === product.id) {
        return true;
      }
    });

    let cssClass = doesFavExists ? "fa" : "far";

    const newBlock = new Block(
      `${product.title}`,
      `${product.price}`,
      `${product.description}`,
      `${product.id}`,
      `${cssClass}`,
      `${product.image_url}`,
      `${product.volume}`,
      `${product.featured}`
    );

    productContainer.innerHTML += newBlock.draw();
  });

  const favHeart = document.querySelectorAll(".favorite-heart");
  favHeart.forEach((heart) => {
    heart.addEventListener("click", handleFavourites);
    heart.addEventListener("click", fillNavHeart);
  });
  fillNavHeart();
  changeCartIcon();
  editIcon();
}

// spesifiser navheart bedre
// denne fyller hjertet i navbaren hvis det ligger produkter inne
// funker ikke hvis du går ut av siden å kommer tilbake
// må kjøre en function på loading av siden også

export function fillNavHeart() {
  const navHeart = document.querySelector(".fa-heart");
  const favStorage = getFromStorage(favKey);
  // console.log(favStorage.length);
  if (favStorage.length) {
    navHeart.classList.add("fa");
  } else {
    navHeart.classList.remove("fa");
  }
}

export function changeCartIcon() {
  const shoppingCart = document.querySelector(".cart-icon");
  const cartStorage = getFromStorage(cartKey);

  if (cartStorage.length) {
    shoppingCart.classList.remove("fa-shopping-cart");
    shoppingCart.classList.add("fa-cart-arrow-down");
  } else {
    shoppingCart.classList.remove("fa-cart-arrow-down");
    shoppingCart.classList.add("fa-shopping-cart");
  }
}

{
  /* <i class="fas fa-cart-arrow-down"></i> */
}
