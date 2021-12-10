import toggleSidebar from "../layout/nav.js";
import { productsUrl } from "../settings/constant.js";
import {
  editVolume,
  editFeatured,
  editDescriptionDetail,
  editDescription,
  editForm,
  editImage,
  editTitle,
  editPrice,
  editNutrition,
  idInput,
  hiddenImageContainer,
} from "../components/elements.js";
import displayMessage from "../components/displayMessage.js";
import { MESSAGES } from "../components/messages.js";
import { submitEdit } from "../forms/submitEdit.js";
import { validateEditForm } from "../forms/validateEditForm.js";
import { deleteProduct } from "../common/deleteProduct.js";
import { imageUploader } from "../common/imageUploader.js";
import { fillNavHeart } from "../common/fillNavHeart.js";
import { changeCartIcon } from "../common/changeCartIcon.js";
import { missingToken } from "../components/missingToken.js";

missingToken();
toggleSidebar();
imageUploader();
fillNavHeart();
changeCartIcon();

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const url = productsUrl + `/` + id;

(async function showProduct() {
  try {
    const response = await fetch(url);
    const product = await response.json();
    const selected = [...editVolume.options];

    if (product.featured) {
      editFeatured.checked = true;
    }

    if (product.volume === "Small") {
      selected[1].setAttribute("selected", true);
    }

    if (product.volume === "Large") {
      selected[2].setAttribute("selected", true);
    }

    // remove span from input-text
    // convert string to html

    let stringToHTML = function (str) {
      let parser = new DOMParser();
      let title = parser.parseFromString(str, "text/html");
      return title.body;
    };

    let originalTitle = product.title;
    const findSpan = originalTitle.split(" ", 3);
    let tasteTitle = stringToHTML(findSpan[1]);

    editImage.src = product.image_url;
    editTitle.value = tasteTitle.innerText;
    editPrice.value = product.price;
    editDescription.value = product.description;
    editDescriptionDetail.value = product.description_details;
    idInput.value = product.id;
    editNutrition.value = product.nutrition;
    hiddenImageContainer.value = product.image_url;
  } catch (error) {
    displayMessage("error", MESSAGES.server_error, ".message-container");
  }
})();

editForm.addEventListener("submit", submitEdit);
validateEditForm();

// delete button
const buttonContainer = document.querySelector(".button-container");
buttonContainer.insertAdjacentHTML(
  "afterbegin",
  `<button type="button" class="delete delete-btn btn btn-primary"><i class="fas fa-trash-alt"></i> Delete</button>`
);
const deleteBtn = document.querySelector("button.delete");
deleteBtn.onclick = function () {
  deleteProduct(id);
};
