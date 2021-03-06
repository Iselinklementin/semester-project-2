import { AUTH_TOKEN, PRODUCT_URL, DELETE } from "../settings/api.js";
import { getFromStorage, saveToStorage } from "../settings/storage.js";
import { CART_STORAGE_KEY, FAV_STORAGE_KEY } from "../settings/keys.js";
import displayMessage from "../components/displayMessage.js";
import { MESSAGES } from "../components/messages.js";
import { confirmBtn } from "../components/elements.js";
import { openModal } from "../common/modal/openModal.js";
import { ERROR, STATUS_ELEMENT } from "../components/misc.js";

const currentFav = getFromStorage(FAV_STORAGE_KEY);
const currentCart = getFromStorage(CART_STORAGE_KEY);

export function deleteProduct(id) {
  openModal(MESSAGES.delete, MESSAGES.delete_product);

  confirmBtn.addEventListener("click", async function () {
    const url = PRODUCT_URL + id;
    const option = {
      method: DELETE,
      headers: AUTH_TOKEN,
    };

    try {
      const response = await fetch(url, option);
      const json = await response.json();

      location.href = "products.html";

      // if its in cart, remove it
      const newCartItems = currentCart.filter(product => parseInt(product.id) !== json.id);
      saveToStorage(CART_STORAGE_KEY, newCartItems);

      // if its in favourites, remove it
      const newFavourites = currentFav.filter(product => parseInt(product.id) !== json.id);
      saveToStorage(FAV_STORAGE_KEY, newFavourites);
    } catch (error) {
      console.log(error);
      displayMessage(ERROR, MESSAGES.server_error, STATUS_ELEMENT);
    }
  });
}
