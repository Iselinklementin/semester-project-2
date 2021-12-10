import { authorization, productsUrl } from "../settings/constant.js";
import { getFromStorage, saveToStorage } from "../settings/storage.js";
import { favKey } from "../settings/keys.js";
import displayMessage from "../components/displayMessage.js";
import { MESSAGES } from "../components/messages.js";
import { modal, modalHeader, modalBody, confirmBtn } from "../components/elements.js";

const currentFav = getFromStorage(favKey);

export function deleteProduct(id) {
  modal.style.display = "block";
  modalHeader.innerHTML = `<p>Delete product</p>`;
  modalBody.innerHTML = `<p>Are you sure you want to delete this product?</p>`;

  confirmBtn.addEventListener("click", async function () {
    const url = productsUrl + `/` + id;
    const option = {
      method: "DELETE",
      headers: authorization,
    };

    try {
      const response = await fetch(url, option);
      const json = await response.json();

      location.href = "products.html";

      const newFavourites = currentFav.filter(product => parseInt(product.id) !== json.id);
      console.log(newFavourites);
      saveToStorage(favKey, newFavourites);
    } catch (error) {
      console.log(error);
      displayMessage("error", MESSAGES.server_error, ".message-container");
    }
  });
}
