import { modal, modalHeader, closeBtn, confirmBtn, modalBody, productsInCart } from "../components/elements.js";
import { getFromStorage, saveToStorage } from "../settings/storage.js";
import { cartKey } from "../settings/keys.js";
import { createHtml } from "../common/createHtml.js";
import { addQuantityHtml } from "../common/addQuantityHtml.js";
import { subtotal } from "../common/subtotal.js";

export function deleteFromCart() {
  let id = this.getAttribute("data-id");
  const currentItems = getFromStorage(cartKey);

  currentItems.forEach((item) => {
    if (item.id === id) {
      modal.style.display = "block";
      modalHeader.innerHTML = `<p>Delete product</p>`;
      modalBody.innerHTML = `<p>Are you sure you want to delete ${item.title}?</p>`;
      confirmBtn.addEventListener("click", () => {
        // productDelete();
        const currentCart = getFromStorage(cartKey);
        const newList = currentCart.filter((product) => product.id !== id);
        saveToStorage(cartKey, newList);
        createHtml(newList);
        subtotal();
        addQuantityHtml();
        productsInCart.innerText = `${newList.length} products in cart`;
        modal.style.display = "none";
      });

      closeBtn.onclick = function () {
        modal.style.display = "none";
      };

      window.onclick = function (e) {
        if (e.target == modal) {
          modal.style.display = "none";
        }
      };
    }
  });
}
