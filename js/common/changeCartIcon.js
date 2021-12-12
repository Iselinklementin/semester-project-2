import { CART_STORAGE_KEY } from "../settings/keys.js";
import { getFromStorage } from "../settings/storage.js";

// If its items in cart, the icon get an arrow inside

export function changeCartIcon() {
  const shoppingCart = document.querySelector(".cart-icon");
  const cartStorage = getFromStorage(CART_STORAGE_KEY);

  if (cartStorage.length) {
    shoppingCart.classList.remove("fa-shopping-cart");
    shoppingCart.classList.add("fa-cart-arrow-down");
  } else {
    shoppingCart.classList.remove("fa-cart-arrow-down");
    shoppingCart.classList.add("fa-shopping-cart");
  }
}
