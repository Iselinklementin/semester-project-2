import { getFromStorage, saveToStorage } from "../settings/storage.js";
import { cartKey } from "../settings/keys.js";
import { emptyResult } from "../components/emptyResult.js";
import toggleSidebar from "../layout/nav.js";
import { createHtml } from "../common/createHtml.js";
import modal from "../common/modal.js";
// import modal from "../common/modal.js";

toggleSidebar();

const currentItems = getFromStorage(cartKey);
const productsInCart = document.querySelector(".count-products");

createHtml(currentItems);
emptyResult();
columns();
total();

productsInCart.innerText = `${currentItems.length} products in cart`;

// Noe buggy med minus. Forsvinner når den kommer til 0, dukker plutselig opp igjen senere
// skift navn

function columns() {
  const productCards = document.querySelectorAll(".col");
  productCards.forEach(product => {
    let id = product.firstElementChild.getAttribute("data-id");

    currentItems.forEach(item => {
      if (item.id === id) {
        product.insertAdjacentHTML(
          "beforeend",
          `<div class="quantity">
              <div class="number">
                <span class="minus" data-id="${id}" >-</span>
                <input type="text" disabled="true" class="input-quantity" value="${item.quantity}"/>
                <span class="plus" data-id="${id}">+</span>
              </div>
              <p class="remove" data-id="${id}" data-modal="remove">Remove</p>
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

function decreaseAmount() {
  let id = this.getAttribute("data-id");
  const cartProducts = getFromStorage(cartKey);
  const product = cartProducts.find(product => product.id === id);
  product.quantity--;
  this.nextElementSibling.value = `${product.quantity}`;
  saveToStorage(cartKey, cartProducts);
  total();

  if (product.quantity === 0) {
    const products = cartProducts.filter(product => product.id !== id);
    console.log(products);
    saveToStorage(cartKey, products);
    createHtml(products);
    columns();
    total();
  }
}

function increaseAmount() {
  let id = this.getAttribute("data-id");
  const product = currentItems.find(product => product.id === id);
  product.quantity++;
  this.previousElementSibling.value = `${product.quantity}`;
  saveToStorage(cartKey, currentItems);
  total();
}

function deleteFromCart() {
  let id = this.getAttribute("data-id");

  currentItems.forEach(item => {
    if (item.id === id) {
      modal(
        `Are you sure you want to delete ${item.title}?`,
        "Delete product",
        id,
        "Delete product",
        productDelete
      );

      function productDelete() {
        const currentCart = getFromStorage(cartKey);
        const newList = currentCart.filter(product => product.id !== id);
        saveToStorage(cartKey, newList);
        createHtml(newList);
        total();
        columns();
        productsInCart.innerText = `${newList.length} products in cart`;
      }
    }
  });
}

function total() {
  const sum = document.querySelector(".sum");
  const currentCart = getFromStorage(cartKey);
  let cost = 0;

  if (currentCart.length === 0) {
    sum.innerHTML = `$ 0.00`;
    emptyResult();
  }

  currentCart.map(product => {
    let productTotal = parseFloat(product.price) * product.quantity;
    cost += productTotal;
    sum.innerHTML = `$ ${cost.toFixed(2)}`;
  });
}
