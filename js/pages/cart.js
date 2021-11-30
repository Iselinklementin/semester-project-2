import { getFromStorage, saveToStorage } from "../settings/storage.js";
import { cartKey } from "../settings/keys.js";
import { emptyResult } from "../components/emptyResult.js";
import toggleSidebar from "../layout/nav.js";
import { createHtml } from "../common/createHtml.js";

toggleSidebar();

// summary

function sum() {
  const sum = document.querySelector(".sum");
  const currentCart = getFromStorage(cartKey);
  let countPrice = [];

  currentCart.map(product => {
    const price = product.price;
    countPrice.push(parseFloat(price));
    let total = countPrice.reduce((a, b) => a + b);

    sum.innerHTML = `Total: ${total.toFixed(2)}$`;
  });
}

sum();

function createCart() {
  const currentItems = getFromStorage(cartKey);
  let newCurrentList = [];

  currentItems.forEach(item => {
    if (!item.idDuplicate) {
      newCurrentList.push(item);
      createHtml(newCurrentList);
    }
  });

  (function countProducts() {
    // renskriv denne koden så du skjønner den
    let productsInCart = currentItems;
    let countProductId = productsInCart.reduce((acc, child) => {
      acc[child.id] = (acc[child.id] || 0) + 1;
      return acc;
    }, {});

    const col = document.querySelectorAll(".col");
    // let dataAttributes = [];

    col.forEach(product => {
      let dataID = product.firstElementChild.getAttribute("data-id");
      let newArr = Object.entries(countProductId);
      let inCart = [];
      // dataAttributes.push(product.firstElementChild.attributes);

      // finn duplicate ID
      newArr.forEach(id => {
        if (id[0] === dataID) {
          inCart.push(id[1]);
        }
      });

      // "afterend"
      // "beforeend"
      product.insertAdjacentHTML(
        "beforeend",
        `<div class="quantity">
        <p>In cart: ${inCart}</p>
        <div class="number">
          <span class="minus" >-</span>
          <input type="text" value="${inCart}"/>
          <span class="plus">+</span>
          </div>
      <i class="fas fa-trash-alt"></i></div>`
      );
    });

    const minus = document.querySelectorAll(".minus");
    const plus = document.querySelectorAll(".plus");
    const trashcan = document.querySelectorAll(".fa-trash-alt");

    // Se på navn her
    minus.forEach(decrease => {
      decrease.addEventListener("click", removeItem);
    });
    plus.forEach(increase => {
      increase.addEventListener("click", increaseAmount);
    });

    trashcan.forEach(trash => {
      trash.addEventListener("click", deleteFromCart);
    });
  })();

  if (!currentItems.length) {
    emptyResult();
  }

  sum();
}

createCart();

export default function removeItem() {
  const currentCart = getFromStorage(cartKey);
  const id = this.offsetParent.firstElementChild.getAttribute("data-id");
  let newItemList = [];

  currentCart.forEach(item => {
    if (id === item.id) {
      newItemList.push(item);
    }
  });

  // skriv denne funksjonen annerledes
  function removeElement(arr) {
    if (arr.length > 0) arr.length--;
    return arr;
  }

  // få produktet til å ikke hoppe

  let newArray = removeElement(newItemList);
  const newCart = currentCart.filter(product => product.id !== id);
  const newItems = newArray.concat(newCart);
  saveToStorage(cartKey, newItems);
  createCart();
  sum();
}

// skift navn

function increaseAmount() {
  const currentCart = getFromStorage(cartKey);
  const id = this.offsetParent.firstElementChild.getAttribute("data-id");

  let newItem = currentCart.find(product => product.id === id);
  const new_obj = { ...newItem, idDuplicate: true };
  currentCart.push(new_obj);

  saveToStorage(cartKey, currentCart);
  createCart();
  sum();
}

// modal hvis det er flere enn èn i handlekurven?
const modalText = document.querySelector(".modal-body");
const confirmBtn = document.querySelector(".confirmBtn");
let myModal = new bootstrap.Modal(document.getElementById("exampleModal"));

function deleteFromCart() {
  const id = this.offsetParent.firstElementChild.getAttribute("data-id");
  const itemsInCart = this.parentElement.children[1].children[1].value;
  console.log(itemsInCart);
  // hvis det er fler enn 2, send en advarsel
  if (itemsInCart >= 2) {
    myModal.show();
    modalText.innerHTML = `<p>Are you sure you want to delete ${itemsInCart} products?</p>`;
    confirmBtn.setAttribute("id", `${id}`);
    confirmBtn.addEventListener("click", deleteProduct);
    console.log(confirmBtn);
  } else {
    const currentCart = getFromStorage(cartKey);
    const deletedItem = currentCart.filter(product => product.id !== id);
    saveToStorage(cartKey, deletedItem);
    createCart();
    sum();
  }
}

function deleteProduct() {
  console.log(this.id);
  const id = this.id;
  const currentCart = getFromStorage(cartKey);
  const deletedItem = currentCart.filter(product => product.id !== id);
  saveToStorage(cartKey, deletedItem);
  myModal.hide();
  createCart();
  sum();
}
