import toggleSidebar from "../layout/nav.js";
import { getFromStorage } from "../settings/storage.js";
import { favKey } from "../settings/keys.js";
import { emptyResult } from "../components/emptyResult.js";
import { createHtml } from "../common/createHtml.js";

toggleSidebar();

export function favourites() {
  const current = getFromStorage(favKey);
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
// clearAll();
