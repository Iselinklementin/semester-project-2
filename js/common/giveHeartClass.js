import { favKey } from "../settings/keys.js";
import { getFromStorage } from "../settings/storage.js";

export function giveHeartClass(result) {
  // add heart-icon if its in favorites
  const currentFavorites = getFromStorage(favKey);
  const doesFavExists = currentFavorites.find(fav => {
    if (parseInt(fav.id) === result.id || fav.id === result.id) {
      return true;
    }
  });
  let cssClass = doesFavExists ? "fa" : "far";
}
