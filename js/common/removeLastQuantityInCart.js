import { productsInCart } from "../components/elements.js";
import { CART_STORAGE_KEY } from "../settings/keys.js";
import { getFromStorage, saveToStorage } from "../settings/storage.js";
import { addQuantityHtml } from "./createHtml/addQuantityHtml.js";
import { createProductCards } from "./createHtml/createProductCards.js";
import { subtotal } from "./handlePrice/subtotal.js";

// Removes product if quantity is below one

export function removeLastQuantityInCart(id) {
  const currentCart = getFromStorage(CART_STORAGE_KEY);
  const newList = currentCart.filter(product => product.id !== id);
  saveToStorage(CART_STORAGE_KEY, newList);
  createProductCards(newList);
  subtotal();
  addQuantityHtml();
  productsInCart.innerText = `${newList.length} products in cart`;
}
