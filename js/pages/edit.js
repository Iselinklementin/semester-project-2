import toggleSidebar from "../layout/nav.js";
import { PRODUCT_URL } from "../settings/api.js";
import {
  volume,
  featuredCheckbox,
  descriptionDetails,
  description,
  form,
  image,
  title,
  price,
  nutrition,
  idInput,
  hiddenImageContainer,
  documentTitle,
  loader,
} from "../components/elements.js";
import displayMessage from "../components/displayMessage.js";
import { MESSAGES } from "../components/messages.js";
import { submitEdit } from "../forms/submitEdit.js";
import { validateForm } from "../forms/validateForm.js";
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
const url = PRODUCT_URL + id;

(async function showProduct() {
  try {
    const response = await fetch(url);
    const product = await response.json();
    const selected = [...volume.options];

    loader.style.display = "none";

    if (product.featured) {
      featuredCheckbox.checked = true;
    }

    if (product.volume === "Small") {
      selected[1].setAttribute("selected", true);
    }

    if (product.volume === "Large") {
      selected[2].setAttribute("selected", true);
    }

    // remove Milky and span from title
    let titleWithoutSpan = product.title.replace("<span>", "").replace("</span>", "").replace("Milky", "");

    documentTitle.innerHTML = `Edit Milky` + titleWithoutSpan;
    image.src = product.image_url;
    title.value = titleWithoutSpan;
    price.value = product.price;
    description.value = product.description;
    descriptionDetails.value = product.description_details;
    idInput.value = product.id;
    nutrition.value = product.nutrition;
    hiddenImageContainer.value = product.image_url;
  } catch (error) {
    displayMessage("error", MESSAGES.server_error, ".message-container");
  }
})();

form.addEventListener("submit", submitEdit);
validateForm();

// delete button
const buttonContainer = document.querySelector(".button-container");
buttonContainer.insertAdjacentHTML(
  "afterbegin",
  `<button type="button" class="delete delete-btn btn btn-secondary"><i class="fas fa-trash-alt"></i> Delete</button>`
);
const deleteBtn = document.querySelector("button.delete");
deleteBtn.onclick = () => {
  deleteProduct(id);
};
