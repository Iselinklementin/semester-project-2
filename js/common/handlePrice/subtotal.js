import { getFromStorage } from "../../settings/storage.js";
import { CART_STORAGE_KEY } from "../../settings/keys.js";
import { emptyResult } from "../../components/emptyResult.js";
import { productsInCart } from "../../components/elements.js";

// Subtotal in cart

export function subtotal() {
  const sum = document.querySelector(".sum");
  const currentCart = getFromStorage(CART_STORAGE_KEY);
  let cost = 0;
  let inCart = 0;

  // Show how many items it is in cart
  currentCart.filter((product) => {
    inCart += parseFloat(product.quantity);
    productsInCart.innerText = `${inCart} product(s) in cart`;
  });

  if (currentCart.length === 0) {
    sum.innerHTML = `$ 0.00`;
    emptyResult();
    productsInCart.innerText = `0 product(s) in cart`;
  }

  // using quantity to get the correct price

  currentCart.map((product) => {
    let productTotal = parseFloat(product.price) * product.quantity;
    cost += productTotal;
    sum.innerHTML = `$ ${cost.toFixed(2)}`;
  });
}
