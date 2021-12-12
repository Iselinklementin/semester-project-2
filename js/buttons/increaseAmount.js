import { getFromStorage, saveToStorage } from "../settings/storage.js";
import { CART_STORAGE_KEY } from "../settings/keys.js";
import { subtotal } from "../common/subtotal.js";

export function increaseAmount() {
  let id = this.getAttribute("data-id");
  const cartProducts = getFromStorage(CART_STORAGE_KEY);
  const product = cartProducts.find((product) => product.id === id);

  product.quantity++;
  this.previousElementSibling.value = product.quantity;
  let originalPrice = parseFloat(
    this.offsetParent.offsetParent.offsetParent.firstElementChild.getAttribute("data-price")
  );
  let newPrice = originalPrice * product.quantity;
  let priceDom = this.offsetParent.offsetParent.offsetParent.children[2].children[1].lastElementChild;

  priceDom.innerText = `$ ` + newPrice.toFixed(2);
  saveToStorage(CART_STORAGE_KEY, cartProducts);
  subtotal();
}
