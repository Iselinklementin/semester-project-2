import { getFromStorage, saveToStorage } from "../settings/storage.js";
import { cartKey } from "../settings/keys.js";
import { emptyResult } from "../components/emptyResult.js";
import toggleSidebar from "../layout/nav.js";
import { createHtml } from "../common/createHtml.js";

toggleSidebar();

function createCart() {
  const currentItems = getFromStorage(cartKey);
  let newCurrentList = [];

  currentItems.forEach((item) => {
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
    let dataAttributes = [];

    col.forEach((product) => {
      let dataID = product.firstElementChild.getAttribute("data-id");
      let newArr = Object.entries(countProductId);
      let inCart = [];
      dataAttributes.push(product.firstElementChild.attributes);

      // finn duplicate ID
      newArr.forEach((id) => {
        if (id[0] === dataID) {
          inCart.push(id[1]);
        }
      });

      // "afterend"
      product.insertAdjacentHTML(
        "beforeend",
        `<div class="quantity"><b>In cart: ${inCart}</b>
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

    // Se på navn her
    minus.forEach((decrease) => {
      decrease.addEventListener("click", removeItem);
    });
    plus.forEach((increase) => {
      increase.addEventListener("click", increaseAmount);
    });
  })();

  // plus.addEventListener("click", addItem);

  if (!currentItems.length) {
    emptyResult();
  }
}

createCart();

export default function removeItem() {
  const currentCart = getFromStorage(cartKey);
  const id = this.offsetParent.firstElementChild.getAttribute("data-id");
  let newItemList = [];

  currentCart.forEach((item) => {
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
  // console.log(newArray);
  const newCart = currentCart.filter((product) => product.id !== id);
  // console.log(newCart);
  const newItems = newArray.concat(newCart);
  // console.log(newItems);
  saveToStorage(cartKey, newItems);
  createCart();
}

function increaseAmount() {
  const currentCart = getFromStorage(cartKey);
  const id = this.offsetParent.firstElementChild.getAttribute("data-id");

  // function addElement(arr) {
  //   if (arr.length > 0) arr.length++;
  //   return arr;
  // }

  let newItem = currentCart.find((product) => product.id === id);
  // newItem = newItem["idDuplicate"] = true; // property name with a space
  // function makeDup(item) {
  //   return (item.idDuplicate = true);
  // }
  // // newItem.idDuplicate = true;
  // const addItem = makeDup(newItem);
  const new_obj = { ...newItem, idDuplicate: true };
  // console.log(new_obj);
  currentCart.push(new_obj);
  console.log(currentCart);

  saveToStorage(cartKey, currentCart);
  createCart();
}

// newItem.idDuplicate = true;
// function findDup(value, index) {
//   return value, index;
// }

// let thisIsNew = findDup(newItem, index);
// console.log(thisIsNew);
// currentCart.push(newItem);
// console.log(currentCart);

// const newProduct = {
//   id: product.id,
//   title: product.title,
//   description: product.description,
//   price: product.price,
//   featured: product.featured,
//   idDuplicate: true,
//   image_url: product.image_url,
//   volume: product.volume,

// let newArray = addElement(newProduct);
// console.log(newArray);
// currentCart.push(newArray);
// console.log(currentCart);
// saveToStorage(cartKey, currentCart);
// createCart();
// }
// });
