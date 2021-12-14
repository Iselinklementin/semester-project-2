import { decreaseQuantityInCart } from "../../buttons/decreaseQuantityInCart.js";
import { increaseQuantityInCart } from "../../buttons/increaseQuantityInCart.js";
import { removeFromCart } from "../../buttons/removeFromCart.js";
import { getFromStorage } from "../../settings/storage.js";
import { CART_STORAGE_KEY } from "../../settings/keys.js";

export function addQuantityHtml() {
  const productCards = document.querySelectorAll(".col");
  const currentItems = getFromStorage(CART_STORAGE_KEY);

  productCards.forEach(product => {
    let id = product.firstElementChild.getAttribute("data-id");

    // add quantity-html to product-columns in cart

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

  // Minus/plus controls how many of the same product the customer wants
  minus.forEach(decrease => {
    decrease.addEventListener("click", decreaseQuantityInCart);
  });
  plus.forEach(increase => {
    increase.addEventListener("click", increaseQuantityInCart);
  });

  removeItem.forEach(deleteItem => {
    deleteItem.addEventListener("click", removeFromCart);
  });
}
