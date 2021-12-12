import { modal, productsInCart } from "../components/elements.js";
import { CART_STORAGE_KEY } from "../settings/keys.js";
import { getFromStorage, saveToStorage } from "../settings/storage.js";
import { addQuantityHtml } from "./addQuantityHtml.js";
import { createHtml } from "./createHtml.js";
import { subtotal } from "./subtotal.js";

// Removes product in cart

export function removeProductFunction(id) {
  const currentCart = getFromStorage(CART_STORAGE_KEY);
  const newList = currentCart.filter((product) => product.id !== id);
  saveToStorage(CART_STORAGE_KEY, newList);
  createHtml(newList);
  subtotal();
  addQuantityHtml();
  productsInCart.innerText = `${newList.length} products in cart`;
}
