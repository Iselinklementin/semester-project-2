import { getFromStorage, saveToStorage } from "../settings/storage.js";
import { CART_STORAGE_KEY } from "../settings/keys.js";
import { subtotal } from "../common/handlePrice/subtotal.js";
import { originalProductPrice } from "../common/handlePrice/originalProductPrice.js";

// increase quantity in cart
// and update the price

export function increaseQuantityInCart() {
  let id = this.getAttribute("data-id");
  const cartProducts = getFromStorage(CART_STORAGE_KEY);
  const product = cartProducts.find(product => product.id === id);
  product.quantity++;
  this.previousElementSibling.value = product.quantity;

  let priceHtml = originalProductPrice(id);
  let productPrice = priceHtml.getAttribute("productPrice");

  // update price
  let newPrice = productPrice * product.quantity;
  priceHtml.innerText = `$ ` + newPrice.toFixed(2);
  saveToStorage(CART_STORAGE_KEY, cartProducts);
  subtotal();
}
