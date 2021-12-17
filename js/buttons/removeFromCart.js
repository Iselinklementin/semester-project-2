import { confirmBtn, modal, productsInCart } from "../components/elements.js";
import { getFromStorage } from "../settings/storage.js";
import { CART_STORAGE_KEY } from "../settings/keys.js";
import { closeModal } from "../common/modal/closeModal.js";
import { openModal } from "../common/modal/openModal.js";
import { MESSAGES } from "../components/messages.js";
import { removeLastQuantityInCart } from "../common/removeLastQuantityInCart.js";
import { subtotal } from "../common/handlePrice/subtotal.js";

// Remove products completely from cart

export function removeFromCart() {
  let id = this.getAttribute("data-id");
  const currentItems = getFromStorage(CART_STORAGE_KEY);

  currentItems.forEach((item) => {
    if (item.id === id) {
      // ask if they wish to delete product
      openModal(MESSAGES.delete, `Are you sure you want to remove ${item.title} from your cart?`);

      // If its confirmed - delete it
      confirmBtn.addEventListener("click", () => {
        removeLastQuantityInCart(id);
        modal.style.display = "none";
      });

      closeModal();
    }
  });
}
