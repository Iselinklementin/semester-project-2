import { cartKey } from "../settings/keys.js";
import { getFromStorage } from "../settings/storage.js";

export function changeCartIcon() {
  const shoppingCart = document.querySelector(".cart-icon");
  const cartStorage = getFromStorage(cartKey);

  if (cartStorage.length) {
    shoppingCart.classList.remove("fa-shopping-cart");
    shoppingCart.classList.add("fa-cart-arrow-down");
  } else {
    shoppingCart.classList.remove("fa-cart-arrow-down");
    shoppingCart.classList.add("fa-shopping-cart");
  }
}
