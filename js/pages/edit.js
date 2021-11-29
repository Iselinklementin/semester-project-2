import { productsUrl } from "../settings/constant.js";
import { contentTypeAuth, authorization } from "../settings/constant.js";
import { getFromStorage, saveToStorage } from "../settings/storage.js";
import { favKey, cartKey } from "../settings/keys.js";
// import { displayMessage } from "../components/displayMessage.js";
// import { messages } from "../components/messages.js";

// hmm. samme navn på function og dokument?
import toggleSidebar from "../layout/nav.js";
toggleSidebar();

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const url = productsUrl + `/` + id;

export const editForm = document.querySelector(".edit-form");
export const editTitle = document.querySelector(".edit-title");
export const editPrice = document.querySelector(".edit-price");
export const editImage = document.querySelector(".edit-image");
export const editDescription = document.querySelector(".edit-description");
export const idInput = document.querySelector("#id");
export const updateBtn = document.querySelector(".update-btn");

(async function () {
  try {
    const response = await fetch(url);
    const product = await response.json();
    // console.log(product);

    // husk volume og featured og pagetitle
    editTitle.value = product.title;
    editPrice.value = product.price;
    editDescription.value = product.description;
    editImage.value = product.image_url;
    idInput.value = product.id;
  } catch (error) {}
})();

editForm.addEventListener("submit", submitEdit);

function submitEdit(event) {
  event.preventDefault();

  const titleValue = editTitle.value.trim();
  const priceValue = editPrice.value.trim();
  const descriptionValue = editDescription.value.trim();
  const idValue = idInput.value;
  const imageValue = editImage.value.trim();

  // if (
  //   checkValidation(titleValue, 1) ||
  //   checkValidation(authorValue, 1) ||
  //   checkValidation(summaryValue, 1 || checkValidation(idValue, 1)
  // || isNaNprice )
  // ) {
  //   displayMessage(classes.error, messages.empty_input, messageContainer);
  // }

  updateProduct(titleValue, priceValue, descriptionValue, idValue, imageValue);
}

// import displayMessage from "../../global/components/displayMessage.js";
// import { articlesUrl, contentTypeAuth } from "../../global/settings/api.js";
// import { messageContainer } from "../../global/components/elements.js";
// import { messages } from "../../global/components/messages.js";
// import { classes } from "../../global/components/classes.js";
// import { getFromStorage, saveToStorage } from "../../global/settings/storage.js";
// import { favKey } from "../../global/settings/keys.js";

export async function updateProduct(title, price, description, id, image) {
  const url = productsUrl + `/` + id;
  const data = JSON.stringify({ title: title, price: price, description: description, image_url: image });
  const options = {
    method: "PUT",
    body: data,
    headers: contentTypeAuth,
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();

    if (json.error) {
      // console.log(error);
      // console.log()
      // return displayMessage(classes.error, json.message, messageContainer);
    }

    if (json.updated_at) {
      // if the article is in favourite, replace it with the new updated one
      // const currentFav = getFromStorage(favKey);
      // let editFavourite = currentFav.filter(article => parseInt(article.id) === json.id);
      // if (editFavourite.length) {
      //   const updatedArticle = {
      //     id: JSON.stringify(json.id),
      //     title: json.title,
      //     summary: json.summary,
      //     author: json.author,
      //   };
      //   const newFavourites = currentFav.filter(article => parseInt(article.id) !== json.id);
      //   newFavourites.push(updatedArticle);
      //   saveToStorage(favKey, newFavourites);
      // }
      // displayMessage(classes.success, messages.updated_article, messageContainer);
    }
  } catch (error) {
    // console.log(error);
    // displayMessage(classes.warning, error, messageContainer);
  }
}

// egen js

const currentFav = getFromStorage(favKey);

const deleteContainer = document.querySelector(".delete-container");
deleteContainer.innerHTML = `<button type="button" class="delete delete-btn btn btn-primary mb-4">Delete</button>`;
const deleteBtn = document.querySelector("button.delete");

// console.log(deleteContainer);

// export default function deleteButton(id) {
deleteBtn.onclick = async function () {
  const deleteProduct = confirm("Are you sure you want to delete the product?");

  if (deleteProduct) {
    const url = productsUrl + `/` + id;

    const option = {
      method: "DELETE",
      headers: authorization,
    };
    try {
      const response = await fetch(url, option);
      const json = await response.json();
      location.href = "/";

      // delete the article from favourite-list
      const newFavourites = currentFav.filter((product) => parseInt(product.id) !== json.id);
      saveToStorage(favKey, newFavourites);
    } catch (error) {
      // console.log(error);
      // displayMessage("error", messages.server_error, ".message-container");
    }
  }
};
// }
