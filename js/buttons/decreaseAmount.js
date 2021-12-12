import { modal, confirmBtn, productsInCart } from "../components/elements.js";
import { getFromStorage, saveToStorage } from "../settings/storage.js";
import { CART_STORAGE_KEY } from "../settings/keys.js";
import { createHtml } from "../common/createHtml.js";
import { addQuantityHtml } from "../common/addQuantityHtml.js";
import { subtotal } from "../common/subtotal.js";
import { closeModal } from "../common/closeModal.js";
import { openModal } from "../common/openModal.js";
import { MESSAGES } from "../components/messages.js";

export function decreaseAmount() {
  let id = this.getAttribute("data-id");
  const cartProducts = getFromStorage(CART_STORAGE_KEY);
  const product = cartProducts.find((product) => product.id === id);
  product.quantity--;
  this.nextElementSibling.value = `${product.quantity}`;

  let originalPrice = parseFloat(
    this.offsetParent.offsetParent.offsetParent.firstElementChild.getAttribute("data-price")
  );
  let newPrice = originalPrice * product.quantity;
  let priceDom = this.offsetParent.offsetParent.offsetParent.children[2].children[1].lastElementChild;
  priceDom.innerText = `$ ` + newPrice.toFixed(2);

  if (product.quantity < 1) {
    this.nextElementSibling.value = "1";
    product.quantity = 1;
    priceDom.innerText = `$ ${originalPrice.toFixed(2)}`;

    openModal(MESSAGES.delete, MESSAGES.last_item);

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
  saveToStorage(CART_STORAGE_KEY, cartProducts);
  subtotal();
}
