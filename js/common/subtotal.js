import { getFromStorage } from "../settings/storage.js";
import { cartKey } from "../settings/keys.js";
import { emptyResult } from "../components/emptyResult.js";

export function subtotal() {
  const sum = document.querySelector(".sum");
  const currentCart = getFromStorage(cartKey);
  let cost = 0;

  if (currentCart.length === 0) {
    sum.innerHTML = `$ 0.00`;
    emptyResult();
  }

  currentCart.map((product) => {
    let productTotal = parseFloat(product.price) * product.quantity;
    cost += productTotal;
    sum.innerHTML = `$ ${cost.toFixed(2)}`;
  });
}
