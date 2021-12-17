import { getFromStorage, saveToStorage } from "../settings/storage.js";
import { CART_STORAGE_KEY } from "../settings/keys.js";
import { subtotal } from "../common/handlePrice/subtotal.js";
import { setCartPrices } from "../common/handlePrice/setCartPrices.js";
import { changeCartIcon } from "../layout/changeCartIcon.js";

// increase quantity in cart
// and update the price

export function increaseQuantityInCart() {
  let id = this.getAttribute("data-id");

  // increase quantity in cart
  const cartProducts = getFromStorage(CART_STORAGE_KEY);
  const product = cartProducts.find((product) => product.id === id);
  product.quantity++;
  this.previousElementSibling.value = product.quantity;
  setCartPrices(id, product);
  saveToStorage(CART_STORAGE_KEY, cartProducts);
  subtotal();
  changeCartIcon();
}
