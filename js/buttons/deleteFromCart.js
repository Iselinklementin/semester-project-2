import { modal, confirmBtn, productsInCart } from "../components/elements.js";
import { getFromStorage, saveToStorage } from "../settings/storage.js";
import { CART_STORAGE_KEY } from "../settings/keys.js";
import { createHtml } from "../common/createHtml.js";
import { addQuantityHtml } from "../common/addQuantityHtml.js";
import { subtotal } from "../common/subtotal.js";
import { closeModal } from "../common/closeModal.js";
import { openModal } from "../common/openModal.js";
import { MESSAGES } from "../components/messages.js";

export function deleteFromCart() {
  let id = this.getAttribute("data-id");
  const currentItems = getFromStorage(CART_STORAGE_KEY);

  currentItems.forEach((item) => {
    if (item.id === id) {
      openModal(MESSAGES.delete, `Are you sure you want to remove ${item.title} from your cart?`);

      confirmBtn.addEventListener("click", () => {
        // productDelete(); ??
        const currentCart = getFromStorage(CART_STORAGE_KEY);
        const newList = currentCart.filter((product) => product.id !== id);
        saveToStorage(CART_STORAGE_KEY, newList);
        createHtml(newList);
        subtotal();
        addQuantityHtml();
        productsInCart.innerText = `${newList.length} products in cart`;
        modal.style.display = "none";
      });

      closeModal();
    }
  });
}
