import { CART_STORAGE_KEY } from "../settings/keys.js";
import { getFromStorage } from "../settings/storage.js";

// If its items in cart, the icon get an arrow inside

export function changeCartIcon() {
  const span = document.querySelector(".cart-count");
  const currentCart = getFromStorage(CART_STORAGE_KEY);

  let inCart = 0;

  if (currentCart.length) {
    // Show how many items it is in cart
    currentCart.filter((product) => {
      inCart += parseFloat(product.quantity);
    });
    span.style.display = "initial";
    span.innerText = inCart;
  } else {
    span.style.display = "none";
  }
}
