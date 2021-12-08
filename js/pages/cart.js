import { getFromStorage, saveToStorage } from "../settings/storage.js";
import { cartKey } from "../settings/keys.js";
import { emptyResult } from "../components/emptyResult.js";
import toggleSidebar from "../layout/nav.js";
import { createHtml } from "../common/createHtml.js";
import { loadingCart } from "../common/loadingHtml.js";
import { modal, modalHeader, closeBtn, confirmBtn, modalBody } from "../components/elements.js";
const productContainer = document.querySelector(".product-container");
loadingCart();
toggleSidebar();

const currentItems = getFromStorage(cartKey);
const productsInCart = document.querySelector(".count-products");
productContainer.innerHTML = "";
createHtml(currentItems);
emptyResult();
columns();
total();
updateProductPrice();

productsInCart.innerText = `${currentItems.length} products in cart`;

// Noe buggy med minus. Forsvinner når den kommer til 0, dukker plutselig opp igjen senere
// skift navn

function columns() {
  const productCards = document.querySelectorAll(".col");
  productCards.forEach((product) => {
    let id = product.firstElementChild.getAttribute("data-id");
    // let modalMessage = "This is the last item, sure you want to delete it?";
    // let modalTitle = "Delete product";

    currentItems.forEach((item) => {
      if (item.id === id) {
        product.insertAdjacentHTML(
          "beforeend",
          `<div class="quantity">
              <div class="number">
                <span class="minus modal-btn-minus" data-id="${id}">-</span>
                <input type="text" disabled="true" data-id="${id}" class="input-quantity" value="${item.quantity}"/>
                <span class="plus" data-id="${id}">+</span>
              </div>
              <p class="remove" data-id="${id}">Remove</p>
          </div>`
        );
      }
    });
  });

  const minus = document.querySelectorAll(".minus");
  const plus = document.querySelectorAll(".plus");
  const removeItem = document.querySelectorAll(".remove");

  minus.forEach((decrease) => {
    decrease.addEventListener("click", decreaseAmount);
  });
  plus.forEach((increase) => {
    increase.addEventListener("click", increaseAmount);
  });

  removeItem.forEach((deleteItem) => {
    deleteItem.addEventListener("click", deleteFromCart);
  });
}

function decreaseAmount() {
  let id = this.getAttribute("data-id");
  const cartProducts = getFromStorage(cartKey);
  const product = cartProducts.find((product) => product.id === id);
  product.quantity--;

  this.nextElementSibling.value = `${product.quantity}`;

  let originalPrice = parseFloat(this.offsetParent.offsetParent.firstElementChild.getAttribute("data-price"));
  let newPrice = originalPrice * product.quantity;
  let priceDom = this.offsetParent.offsetParent.children[2].children[1].lastElementChild;
  priceDom.innerText = `$ ` + newPrice.toFixed(2);

  if (product.quantity < 1) {
    this.nextElementSibling.value = "1";
    product.quantity = 1;
    priceDom.innerText = `$ ${originalPrice.toFixed(2)}`;
    // modal
    modal.style.display = "block";
    modalHeader.innerHTML = `<p>Last item</p>`;
    modalBody.innerHTML = `<p>Last item</p>`;
    confirmBtn.addEventListener("click", () => {
      // productDelete();
      const currentCart = getFromStorage(cartKey);
      const newList = currentCart.filter((product) => product.id !== id);
      saveToStorage(cartKey, newList);
      createHtml(newList);
      total();
      columns();
      productsInCart.innerText = `${newList.length} products in cart`;
      modal.style.display = "none";
    });

    closeBtn.onclick = function () {
      modal.style.display = "none";
    };

    window.onclick = function (e) {
      if (e.target == modal) {
        modal.style.display = "none";
      }
    };
  }
  saveToStorage(cartKey, cartProducts);
  total();
}

function increaseAmount() {
  let id = this.getAttribute("data-id");
  const cartProducts = getFromStorage(cartKey);
  const product = cartProducts.find((product) => product.id === id);
  product.quantity++;
  this.previousElementSibling.value = product.quantity;
  let originalPrice = parseFloat(this.offsetParent.offsetParent.firstElementChild.getAttribute("data-price"));
  let newPrice = originalPrice * product.quantity;
  let priceDom = this.offsetParent.offsetParent.children[2].children[1].lastElementChild;

  priceDom.innerText = `$ ` + newPrice.toFixed(2);
  saveToStorage(cartKey, cartProducts);
  total();
}

function deleteFromCart() {
  let id = this.getAttribute("data-id");

  currentItems.forEach((item) => {
    if (item.id === id) {
      modal.style.display = "block";
      modalHeader.innerHTML = `<p>Delete product</p>`;
      modalBody.innerHTML = `<p>Are you sure you want to delete ${item.title}?</p>`;
      confirmBtn.addEventListener("click", () => {
        // productDelete();
        const currentCart = getFromStorage(cartKey);
        const newList = currentCart.filter((product) => product.id !== id);
        saveToStorage(cartKey, newList);
        createHtml(newList);
        total();
        columns();
        productsInCart.innerText = `${newList.length} products in cart`;
        modal.style.display = "none";
      });

      closeBtn.onclick = function () {
        modal.style.display = "none";
      };

      window.onclick = function (e) {
        if (e.target == modal) {
          modal.style.display = "none";
        }
      };
      // Her må jeg sette inn ny modal
      // modal(`Are you sure you want to delete ${item.title}?`, "Delete product", id, "Delete product", productDelete);

      // function productDelete() {
      //   const currentCart = getFromStorage(cartKey);
      //   const newList = currentCart.filter((product) => product.id !== id);
      //   saveToStorage(cartKey, newList);
      //   createHtml(newList);
      //   total();
      //   columns();
      //   productsInCart.innerText = `${newList.length} products in cart`;
      // }
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

  currentCart.map((product) => {
    let productTotal = parseFloat(product.price) * product.quantity;
    cost += productTotal;
    sum.innerHTML = `$ ${cost.toFixed(2)}`;
  });
}

function updateProductPrice() {
  const productPrice = document.querySelectorAll(".card-price");
  const prices = [...productPrice];

  prices.forEach((price) => {
    let findQuantity = price.offsetParent.lastElementChild.firstElementChild.children[1].value;
    let originalPriceString = price.innerText.replace("$ ", "");
    let originalPrice = parseFloat(originalPriceString);
    let currentQuantity = parseFloat(findQuantity);
    let newPrice = originalPrice * currentQuantity;
    price.innerText = `$ ` + newPrice.toFixed(2);
  });
}

// BootstrapDialog.show({
//   message: "Hi Apple!",
// });
