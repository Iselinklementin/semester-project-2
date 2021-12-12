import { FAV_STORAGE_KEY } from "../settings/keys.js";
import { getFromStorage } from "../settings/storage.js";

// denne fyller hjertet i navbaren hvis det ligger produkter inne

export function fillNavHeart() {
  const navHeart = document.querySelector(".fa-heart");
  const favStorage = getFromStorage(FAV_STORAGE_KEY);
  if (favStorage.length) {
    navHeart.classList.add("fa");
  } else {
    navHeart.classList.remove("fa");
  }
}
