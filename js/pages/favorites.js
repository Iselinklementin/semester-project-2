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
  const currentFav = getFromStorage(FAV_STORAGE_KEY);

  productContainer.innerHTML = "";
  createProductCards(currentFav);
  const favLength = currentFav.length;

  // If its just one in favourites, I dont need any columns.
  if (favLength === 1) {
    productContainer.classList = `row results product-container`;
    const col = document.querySelector(".col");
    col.style.width = "250px";
  }

  // If its two or less in favourites, columns is set to 2 instead of 4.
  if (favLength === 2) {
    productContainer.classList = `row row-cols-2 g-4 results product-container`;
  } else {
    currentFav.classList = `row row-cols-4 g-4 results product-container`;
  }

  const favHeart = document.querySelectorAll(".fa-heart");
  favHeart.forEach(heart => {
    // render new html when clicking heart-icon
    heart.addEventListener("click", favourites);
  });

  emptyResult();
}
emptyResult();
favourites();
clearAll();
