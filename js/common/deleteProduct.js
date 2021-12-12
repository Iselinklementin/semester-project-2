import { AUTH_TOKEN, PRODUCT_URL, DELETE } from "../settings/api.js";
import { getFromStorage, saveToStorage } from "../settings/storage.js";
import { FAV_STORAGE_KEY } from "../settings/keys.js";
import displayMessage from "../components/displayMessage.js";
import { MESSAGES } from "../components/messages.js";
import { confirmBtn } from "../components/elements.js";
import { openModal } from "./openModal.js";

const currentFav = getFromStorage(FAV_STORAGE_KEY);

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

      const newFavourites = currentFav.filter((product) => parseInt(product.id) !== json.id);
      saveToStorage(FAV_STORAGE_KEY, newFavourites);
    } catch (error) {
      console.log(error);
      displayMessage("error", MESSAGES.server_error, ".message-container");
    }
  });
}
