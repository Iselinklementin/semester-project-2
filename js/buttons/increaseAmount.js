import { getFromStorage, saveToStorage } from "../settings/storage.js";
import { cartKey } from "../settings/keys.js";
import { subtotal } from "../common/subtotal.js";

export function increaseAmount() {
  let id = this.getAttribute("data-id");
  const cartProducts = getFromStorage(cartKey);
  const product = cartProducts.find(product => product.id === id);

  // if its been edited without being in...

  // if (!product.quantity) {
  //   product.quantity = 1;
  // }

  product.quantity++;
  this.previousElementSibling.value = product.quantity;
  let originalPrice = parseFloat(
    this.offsetParent.offsetParent.offsetParent.firstElementChild.getAttribute("data-price")
  );
  let newPrice = originalPrice * product.quantity;
  let priceDom =
    this.offsetParent.offsetParent.offsetParent.children[2].children[1].lastElementChild;

  priceDom.innerText = `$ ` + newPrice.toFixed(2);
  saveToStorage(cartKey, cartProducts);
  subtotal();
}
