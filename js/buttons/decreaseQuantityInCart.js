import { getFromStorage, saveToStorage } from "../settings/storage.js";
import { CART_STORAGE_KEY } from "../settings/keys.js";
import { subtotal } from "../common/handlePrice/subtotal.js";
import { setCartPrices } from "../common/handlePrice/setCartPrices.js";
import { removeFromCart } from "./removeFromCart.js";

// decrease quantity in cart
// and update the price

export function decreaseQuantityInCart() {
  let id = this.getAttribute("data-id");

  const cartProducts = getFromStorage(CART_STORAGE_KEY);
  const product = cartProducts.find((product) => product.id === id);
  product.quantity--;
  this.nextElementSibling.value = `${product.quantity}`;

  // If quantity is 1 and the button is clicked

  if (product.quantity < 1) {
    // ask if they wish to delete product
    removeFromCart(id);
    // if not, quantity is one
    this.nextElementSibling.value = "1";
    product.quantity = 1;
  }

  setCartPrices(id, product);
  saveToStorage(CART_STORAGE_KEY, cartProducts);
  subtotal();
}
