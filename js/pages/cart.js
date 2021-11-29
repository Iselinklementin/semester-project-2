import { getFromStorage } from "../settings/storage.js";
import { cartKey } from "../settings/keys.js";
import { emptyResult } from "../components/emptyResult.js";
import toggleSidebar from "../layout/nav.js";
import { createHtml } from "../common/createHtml.js";

toggleSidebar();

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

  const plus = document.querySelector(".plus");
  minus.forEach((decrease) => {
    decrease.dataset = dataAttributes;
    decrease.addEventListener("click", removeItem);
  });
})();

// plus.addEventListener("click", addItem);

if (!currentItems.length) {
  emptyResult();
}

export default function removeItem() {
  // this.classList.toggle("fa");

  const id = this.dataset.id;
  const title = this.dataset.title;
  const summary = this.dataset.summary;
  const author = this.dataset.author;

  const currentCart = getFromStorage(cartKey);
  console.log(this.dataset.id);

  // const articleExists = favourites.find(article => article.id === id);

  // if (!articleExists) {
  //   const article = { id: id, title: title, summary: summary, author: author };
  //   favourites.push(article);
  //   saveToStorage(favKey, favourites);
  // } else {
  //   const newFavArticle = favourites.filter(article => article.id !== id);
  //   saveToStorage(favKey, newFavArticle);
  // }
}
