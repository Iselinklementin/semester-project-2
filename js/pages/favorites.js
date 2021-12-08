import toggleSidebar from "../layout/nav.js";
import { getFromStorage } from "../settings/storage.js";
import { favKey } from "../settings/keys.js";
import { emptyResult } from "../components/emptyResult.js";
import { createHtml } from "../common/createHtml.js";
import clearAll from "../buttons/clearFavorites.js";
import { loadingHtml } from "../common/loadingHtml.js";

const productContainer = document.querySelector(".product-container");

toggleSidebar();
loadingHtml();

export function favourites() {
  const current = getFromStorage(favKey);
  productContainer.innerHTML = "";
  createHtml(current);

  const favHeart = document.querySelectorAll(".fa-heart");
  favHeart.forEach((heart) => {
    // render new html when clicking heart-icon
    heart.addEventListener("click", favourites);
  });

  if (!current.length) {
    emptyResult();
  }
}

favourites();
clearAll();
