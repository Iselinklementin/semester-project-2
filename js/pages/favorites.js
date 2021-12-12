import toggleSidebar from "../layout/nav.js";
import { getFromStorage } from "../settings/storage.js";
import { FAV_STORAGE_KEY } from "../settings/keys.js";
import { emptyResult } from "../components/emptyResult.js";
import { createProductCards } from "../common/createHtml/createProductCards.js";
import clearAll from "../buttons/clearFavorites.js";
import { loadingHtml } from "../layout/skeletonLoading.js";
import { productContainer } from "../components/elements.js";

toggleSidebar();
loadingHtml();

export function favourites() {
  const current = getFromStorage(FAV_STORAGE_KEY);

  productContainer.innerHTML = "";
  createProductCards(current);

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
