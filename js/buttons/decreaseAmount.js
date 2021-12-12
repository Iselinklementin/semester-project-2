import { confirmBtn, modal, productsInCart } from "../components/elements.js";
import { getFromStorage, saveToStorage } from "../settings/storage.js";
import { CART_STORAGE_KEY } from "../settings/keys.js";
import { subtotal } from "../common/subtotal.js";
import { closeModal } from "../common/closeModal.js";
import { openModal } from "../common/openModal.js";
import { MESSAGES } from "../components/messages.js";
import { removeProductFunction } from "../common/removeProductFunction.js";

// decrease quantity in cart
// and update the price

export function decreaseAmount() {
  let id = this.getAttribute("data-id");
  const cartProducts = getFromStorage(CART_STORAGE_KEY);
  const product = cartProducts.find((product) => product.id === id);
  product.quantity--;
  this.nextElementSibling.value = `${product.quantity}`;

  let originalPrice = parseFloat(this.offsetParent.offsetParent.firstElementChild.getAttribute("data-price"));
  let newPrice = originalPrice * product.quantity;
  let priceDom = this.offsetParent.offsetParent.children[2].children[1].lastElementChild;
  priceDom.innerText = `$ ` + newPrice.toFixed(2);

  // If quantity is 1 and the button is clicked
  // ask if they wish to delete product

  if (product.quantity < 1) {
    this.nextElementSibling.value = "1";
    product.quantity = 1;
    priceDom.innerText = `$ ${originalPrice.toFixed(2)}`;

    openModal(MESSAGES.delete, MESSAGES.last_item);

    // If its confirmed - delete it

    confirmBtn.addEventListener("click", () => {
      removeProductFunction(id);
      modal.style.display = "none";
    });

    closeModal();
  }
  saveToStorage(CART_STORAGE_KEY, cartProducts);
  subtotal();
}
