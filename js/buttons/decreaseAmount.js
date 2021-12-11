import {
  modal,
  modalHeader,
  closeBtn,
  confirmBtn,
  modalBody,
  productsInCart,
} from "../components/elements.js";
import { getFromStorage, saveToStorage } from "../settings/storage.js";
import { cartKey } from "../settings/keys.js";
import { createHtml } from "../common/createHtml.js";
import { addQuantityHtml } from "../common/addQuantityHtml.js";
import { subtotal } from "../common/subtotal.js";

export function decreaseAmount() {
  let id = this.getAttribute("data-id");
  const cartProducts = getFromStorage(cartKey);
  const product = cartProducts.find(product => product.id === id);
  product.quantity--;
  this.nextElementSibling.value = `${product.quantity}`;

  let originalPrice = parseFloat(
    this.offsetParent.offsetParent.offsetParent.firstElementChild.getAttribute("data-price")
  );
  let newPrice = originalPrice * product.quantity;
  let priceDom =
    this.offsetParent.offsetParent.offsetParent.children[2].children[1].lastElementChild;
  priceDom.innerText = `$ ` + newPrice.toFixed(2);

  if (product.quantity < 1) {
    this.nextElementSibling.value = "1";
    product.quantity = 1;
    priceDom.innerText = `$ ${originalPrice.toFixed(2)}`;
    // modal
    modal.style.display = "block";
    modalHeader.innerHTML = `<h2>Remove product</h2>`;
    modalBody.innerHTML = `<p>This is the last item, are you sure you want to delete it?</p>`;
    confirmBtn.addEventListener("click", () => {
      // productDelete();
      const currentCart = getFromStorage(cartKey);
      const newList = currentCart.filter(product => product.id !== id);
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
  saveToStorage(cartKey, cartProducts);
  subtotal();
}
