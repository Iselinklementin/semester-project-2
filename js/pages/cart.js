import { getFromStorage, saveToStorage } from "../settings/storage.js";
import { cartKey } from "../settings/keys.js";
import { emptyResult } from "../components/emptyResult.js";
import toggleSidebar from "../layout/nav.js";
import { createHtml } from "../common/createHtml.js";
import modal from "../common/modal.js";

toggleSidebar();

const currentItems = getFromStorage(cartKey);
createHtml(currentItems);

columns();
total();

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
                  <p>In cart: ${item.quantity}</p>
                  <div class="number">
                    <span class="minus" data-id="${id}" >-</span>
                    <input type="text" class"quantity-input" value="${item.quantity}"/>
                    <span class="plus" data-id="${id}">+</span>
                    </div>
                <i class="fas fa-trash-alt" data-id="${id}"></i></div>`
        );
      }
    });
  });

  const minus = document.querySelectorAll(".minus");
  const plus = document.querySelectorAll(".plus");
  const trashcan = document.querySelectorAll(".fa-trash-alt");

  minus.forEach(decrease => {
    decrease.addEventListener("click", decreaseAmount);
  });
  plus.forEach(increase => {
    increase.addEventListener("click", increaseAmount);
  });

  trashcan.forEach(trash => {
    trash.addEventListener("click", deleteFromCart);
  });
}

function total() {
  const sum = document.querySelector(".sum");
  const currentCart = getFromStorage(cartKey);
  let cost = 0;

  currentCart.map(product => {
    let productTotal = parseFloat(product.price) * product.quantity;
    cost += productTotal;
    sum.innerHTML = `Total: ${cost.toFixed(2)}$`;
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
      // const confirmBtn = document.querySelector(".confirmBtn");
      // const id = confirmBtn.attributes.data.value;
      const currentCart = getFromStorage(cartKey);
      const newList = currentCart.filter(product => product.id !== id);
      saveToStorage(cartKey, newList);
      createHtml(newList);
      columns();
      total();
    }
  });
}

// function createCart() {
//   const currentItems = getFromStorage(cartKey);
//   let newCurrentList = [];

//   currentItems.forEach(item => {
//     if (!item.idDuplicate) {
//       newCurrentList.push(item);
//       newCurrentList.sort(function (a, b) {
//         return a.id - b.id;
//       });
//       createHtml(newCurrentList);
//     }
//   });

// // summary

// function total() {
//   const sum = document.querySelector(".sum");
//   const currentCart = getFromStorage(cartKey);
//   let countPrice = [];

//   currentCart.map(product => {
//     const price = product.price;
//     countPrice.push(parseFloat(price));
//     let total = countPrice.reduce((a, b) => a + b);

//     sum.innerHTML = `Total: ${total.toFixed(2)}$`;
//   });
// }

// total();

// function createCart() {
//   const currentItems = getFromStorage(cartKey);
//   let newCurrentList = [];

//   currentItems.forEach(item => {
//     if (!item.idDuplicate) {
//       newCurrentList.push(item);
//       newCurrentList.sort(function (a, b) {
//         return a.id - b.id;
//       });
//       createHtml(newCurrentList);
//     }
//   });

//   (function countProducts() {
//     // renskriv denne koden så du skjønner den
//     let productsInCart = currentItems;
//     let countProductId = productsInCart.reduce((acc, child) => {
//       acc[child.id] = (acc[child.id] || 0) + 1;
//       return acc;
//     }, {});

//     const col = document.querySelectorAll(".col");

//     col.forEach(product => {
//       let dataID = product.firstElementChild.getAttribute("data-id");
//       let newArr = Object.entries(countProductId);
//       let inCart = [];

//       // finn duplicate ID
//       newArr.forEach(id => {
//         if (id[0] === dataID) {
//           inCart.push(id[1]);
//         }
//       });

//       product.insertAdjacentHTML(
//         "beforeend",
//         `<div class="quantity">
//         <p>In cart: ${inCart}</p>
//         <div class="number">
//           <span class="minus" >-</span>
//           <input type="text" value="${inCart}"/>
//           <span class="plus">+</span>
//           </div>
//       <i class="fas fa-trash-alt" data-id="${dataID}"></i></div>`
//       );
//     });

//     const minus = document.querySelectorAll(".minus");
//     const plus = document.querySelectorAll(".plus");
//     const trashcan = document.querySelectorAll(".fa-trash-alt");

//     // Se på navn her
//     minus.forEach(decrease => {
//       decrease.addEventListener("click", removeItem);
//     });
//     plus.forEach(increase => {
//       increase.addEventListener("click", increaseAmount);
//     });

//     trashcan.forEach(trash => {
//       trash.addEventListener("click", deleteFromCart);
//     });
//   })();

//   if (!currentItems.length) {
//     emptyResult();
//   }

//   total();
// }

// createCart();

// export default function removeItem() {
//   const currentCart = getFromStorage(cartKey);
//   const id = this.offsetParent.firstElementChild.getAttribute("data-id");

//   // skriv denne funksjonen annerledes
//   // her fjerner man en fra length
//   function removeElement(arr) {
//     if (arr.length > 0) arr.length--;
//     return arr;
//   }

//   // dette er listen med alle med samme id
//   let newItemList = [];
//   currentCart.forEach(item => {
//     if (id === item.id) {
//       newItemList.push(item);
//     }
//   });

//   let newArray = removeElement(newItemList);
//   const newCart = currentCart.filter(product => product.id !== id);
//   const newItems = newCart.concat(newArray);
//   saveToStorage(cartKey, newItems);
//   createCart();
//   total();
// }

// // skift navn

// function increaseAmount() {
//   const currentCart = getFromStorage(cartKey);
//   const id = this.offsetParent.firstElementChild.getAttribute("data-id");
//   let newItem = currentCart.find(product => product.id === id);
//   const new_obj = { ...newItem, idDuplicate: true };
//   currentCart.push(new_obj);
//   saveToStorage(cartKey, currentCart);
//   createCart();
//   total();
// }

// // modal hvis det er flere enn èn i handlekurven

// function deleteFromCart() {
//   const id = this.offsetParent.firstElementChild.getAttribute("data-id");
//   const itemsInCart = this.parentElement.children[1].children[1].value;

//   // hvis det er fler enn 2, send en advarsel
//   if (itemsInCart >= 2) {
//     modal(
//       `Are you sure you want to delete ${itemsInCart} products?`,
//       "Delete products",
//       id,
//       deleteProduct
//     );
//   } else {
//     const currentCart = getFromStorage(cartKey);
//     const deletedItem = currentCart.filter(product => product.id !== id);
//     saveToStorage(cartKey, deletedItem);
//     createCart();
//     total();
//   }
// }

// function deleteProduct() {
//   const confirmBtn = document.querySelector(".confirmBtn");
//   const id = confirmBtn.attributes.data.value;
//   const currentCart = getFromStorage(cartKey);
//   const deletedItem = currentCart.filter(product => product.id !== id);
//   saveToStorage(cartKey, deletedItem);
//   createCart();
//   total();
// }
