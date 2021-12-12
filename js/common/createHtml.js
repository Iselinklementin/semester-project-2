import Block from "../components/blocks.js";
import { FAV_STORAGE_KEY } from "../settings/keys.js";
import { getFromStorage } from "../settings/storage.js";
import handleFavourites from "../buttons/handleFavorites.js";
import { editIcon } from "../buttons/editIcon.js";
import { fillNavHeart } from "./fillNavHeart.js";
import { changeCartIcon } from "./changeCartIcon.js";

export function createHtml(products) {
  const productContainer = document.querySelector(".product-container");
  productContainer.innerHTML = "";
  const currentFavorites = getFromStorage(FAV_STORAGE_KEY);

  products.forEach((product) => {
    const doesFavExists = currentFavorites.find((fav) => {
      if (parseInt(fav.id) === product.id || fav.id === product.id) {
        return true;
      }
    });

    let cssClass = doesFavExists ? "fa" : "far";

    // using Block to create html

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
