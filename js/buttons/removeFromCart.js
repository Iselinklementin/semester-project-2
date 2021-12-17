import { confirmBtn, modal } from "../components/elements.js";
import { getFromStorage, saveToStorage } from "../settings/storage.js";
import { CART_STORAGE_KEY } from "../settings/keys.js";
import { closeModal } from "../common/modal/closeModal.js";
import { openModal } from "../common/modal/openModal.js";
import { MESSAGES } from "../components/messages.js";
import { addQuantityHtml } from "../common/createHtml/addQuantityHtml.js";
import { subtotal } from "../common/handlePrice/subtotal.js";
import { createProductCards } from "../common/createHtml/createProductCards.js";
import { setCartPrices } from "../common/handlePrice/setCartPrices.js";

// Remove products from cart
// if button is confirmed

export function removeFromCart(id) {
  const currentItems = getFromStorage(CART_STORAGE_KEY);

  currentItems.forEach((item) => {
    if (item.id === id) {
      // ask if they wish to delete product
      openModal(MESSAGES.delete, `Are you sure you want to remove ${item.title} from your cart?`);

      // If its confirmed - delete it
      confirmBtn.addEventListener("click", () => {
        const currentCart = getFromStorage(CART_STORAGE_KEY);
        const newList = currentCart.filter((product) => product.id !== id);
        saveToStorage(CART_STORAGE_KEY, newList);
        createProductCards(newList);
        subtotal();
        addQuantityHtml();

        // Set price on the other products
        newList.forEach((product) => {
          setCartPrices(product.id, product);
        });
        modal.style.display = "none";
      });
      closeModal();
    }
  });
}
