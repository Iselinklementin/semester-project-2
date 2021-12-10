import { decreaseAmount } from "../buttons/decreaseAmount.js";
import { increaseAmount } from "../buttons/increaseAmount.js";
import { deleteFromCart } from "../buttons/deleteFromCart.js";
import { getFromStorage } from "../settings/storage.js";
import { cartKey } from "../settings/keys.js";

export function addQuantityHtml() {
  const productCards = document.querySelectorAll(".col");
  const currentItems = getFromStorage(cartKey);

  productCards.forEach(product => {
    let id = product.firstElementChild.getAttribute("data-id");
    currentItems.forEach(item => {
      if (item.id === id) {
        product.insertAdjacentHTML(
          "beforeend",
          `<div class="quantity">
              <div class="number">
                <span class="minus modal-btn-minus" data-id="${id}">-</span>
                <input type="text" disabled="true" data-id="${id}" class="input-quantity" value="${item.quantity}"/>
                <span class="plus" data-id="${id}">+</span>
              </div>
              <button class="remove btn" data-id="${id}">Remove</button>
          </div>`
        );
      }
    });
  });

  const minus = document.querySelectorAll(".minus");
  const plus = document.querySelectorAll(".plus");
  const removeItem = document.querySelectorAll(".remove");

  minus.forEach(decrease => {
    decrease.addEventListener("click", decreaseAmount);
  });
  plus.forEach(increase => {
    increase.addEventListener("click", increaseAmount);
  });

  removeItem.forEach(deleteItem => {
    deleteItem.addEventListener("click", deleteFromCart);
  });
}
