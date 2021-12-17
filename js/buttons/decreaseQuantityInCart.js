import { confirmBtn, modal } from "../components/elements.js";
import { getFromStorage, saveToStorage } from "../settings/storage.js";
import { CART_STORAGE_KEY } from "../settings/keys.js";
import { subtotal } from "../common/handlePrice/subtotal.js";
import { closeModal } from "../common/modal/closeModal.js";
import { openModal } from "../common/modal/openModal.js";
import { MESSAGES } from "../components/messages.js";
import { removeLastQuantityInCart } from "../common/removeLastQuantityInCart.js";
import { originalProductPrice } from "../common/handlePrice/originalProductPrice.js";
import { updatePriceCart } from "../common/handlePrice/updatePriceCart.js";

// decrease quantity in cart
// and update the price

export function decreaseQuantityInCart() {
  // her fungerer ikke prisen når jeg fjerner noe
  // den går tilbake til start
  // skjer også når jeg sletter

  let id = this.getAttribute("data-id");
  const cartProducts = getFromStorage(CART_STORAGE_KEY);
  const product = cartProducts.find((product) => product.id === id);

  product.quantity--;
  this.nextElementSibling.value = `${product.quantity}`;
  let priceHtml = originalProductPrice(id);
  let productPrice = priceHtml.getAttribute("productPrice");

  // update price
  let newPrice = productPrice * product.quantity;
  priceHtml.innerText = `$ ` + newPrice.toFixed(2);

  // If quantity is 1 and the button is clicked
  // ask if they wish to delete product
  // if not, quantity is one

  if (product.quantity < 1) {
    this.nextElementSibling.value = "1";
    product.quantity = 1;
    priceHtml.innerText = `$ ${parseFloat(productPrice).toFixed(2)}`;
    openModal(MESSAGES.delete, MESSAGES.last_item);

    // If its confirmed - delete it

    confirmBtn.addEventListener("click", () => {
      removeLastQuantityInCart(id);
      modal.style.display = "none";
    });
    closeModal();
  }
  saveToStorage(CART_STORAGE_KEY, cartProducts);
  subtotal();
}
