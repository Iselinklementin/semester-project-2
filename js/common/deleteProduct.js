import { authorization, productsUrl } from "../settings/constant.js";
import { getFromStorage } from "../settings/storage.js";
import { favKey } from "../settings/keys.js";
import displayMessage from "../components/displayMessage.js";
import { MESSAGES } from "../components/messages.js";
import { modal, modalHeader, modalBody, confirmBtn } from "../components/elements.js";

export function deleteProduct(id) {
  // MODAL
  // sjekk om den fungerer

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
      currentFav = getFromStorage(favKey);

      const newFavourites = currentFav.filter((product) => parseInt(product.id) !== json.id);
      saveToStorage(favKey, newFavourites);
    } catch (error) {
      displayMessage("error", MESSAGES.server_error, ".message-container");
    }
  });
}
