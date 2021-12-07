import toggleSidebar from "../layout/nav.js";
import { authorization, contentTypeAuth, productsUrl } from "../settings/constant.js";
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
} from "../components/elements.js";
import { cloudName, uploadPreset, uploadWidget, uploadedImage } from "../components/elements.js";
import displayMessage from "../components/displayMessage.js";
import checkValidation from "../components/checkValidation.js";
import { inputFeedback } from "../forms/inputFeedback.js";
import { getFromStorage } from "../settings/storage.js";
import { favKey } from "../settings/keys.js";
const hiddenImageContainer = document.querySelector(".edit-image");
toggleSidebar();

// hvis tittelen har mer enn bare et ord, så vises fortsatt bare det ene ordet og ikke hele setningen
// bekreftelse på sendt kommer øverst og ikke nede, så man ser det ikke på tlf
const myWidget = cloudinary.createUploadWidget(
  {
    cloudName: cloudName,
    uploadPreset: uploadPreset,
  },
  (error, result) => {
    if (!error && result && result.event === "success") {
      console.log("Done! Here is the image info: ", result.info);
      const editImage = document.querySelector(".image");
      editImage.setAttribute("src", result.info.secure_url);
      hiddenImageContainer.value = result.info.secure_url;
    }
  }
);

uploadWidget.addEventListener(
  "click",
  () => {
    myWidget.open();
  },
  false
);

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const url = productsUrl + `/` + id;

console.log(url);
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
    // console.log(product);
  } catch (error) {
    displayMessage("error", "Something went wrong", ".message-container");
  }
})();

editForm.addEventListener("submit", submitEdit);

async function submitEdit(event) {
  event.preventDefault();
  const titleValue = `Milky <span>${editTitle.value.trim()}</span>`;
  const priceValue = editPrice.value.trim();
  const idValue = idInput.value;
  const descriptionValue = editDescription.value.trim();
  const descriptionDetailValue = editDescriptionDetail.value.trim();
  const nutritionValue = editNutrition.value.trim();
  const featuredValue = editFeatured.checked;
  const imageSrc = hiddenImageContainer.value.trim();
  const volumeValue = editVolume.value;

  // validation

  updateProduct(
    titleValue,
    priceValue,
    descriptionValue,
    descriptionDetailValue,
    nutritionValue,
    featuredValue,
    imageSrc,
    volumeValue,
    idValue
  );
}
export async function updateProduct(
  title,
  price,
  description,
  description_details,
  nutrition,
  featured,
  image_url,
  volume,
  id
) {
  const url = productsUrl + `/` + id;
  const data = JSON.stringify({
    title: title,
    price: price,
    description: description,
    description_details: description_details,
    nutrition: nutrition,
    featured: featured,
    image_url: image_url,
    volume: volume,
  });

  const options = {
    method: "PUT",
    body: data,
    headers: contentTypeAuth,
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();

    if (json.error) {
      console.log(error);
      return displayMessage("error", json.message, ".message-container");
    }

    if (json.updated_at) {
      displayMessage("success", "Product is updated!", ".message-container");
    }
  } catch (error) {
    displayMessage("error", "Something went wrong", ".message-container");
  }
}

const buttonContainer = document.querySelector(".button-container");

buttonContainer.insertAdjacentHTML(
  "afterbegin",
  `<button type="button" class="delete delete-btn btn btn-primary"><i class="fas fa-trash-alt"></i> Delete</button>`
);

const deleteBtn = document.querySelector("button.delete");

deleteBtn.onclick = async function () {
  // her må det komme en modal
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

      location.href = "products.html";
      currentFav = getFromStorage(favKey);
      const newFavourites = currentFav.filter(product => parseInt(product.id) !== json.id);
      saveToStorage(favKey, newFavourites);
    } catch (error) {
      displayMessage("error", "Server error", ".message-container");
    }
  }
};

// samme som add-page
// gjør alle classene like, så slipper man å ha det dobbelt opp

function validateAddForm() {
  let validationPassed = true;

  editTitle.addEventListener("blur", () => {
    if (checkValidation(editTitle.value.length, 1)) {
      inputFeedback(".input-warning__title", "Please insert text", "fa-exclamation-circle");
      validationPassed = false;
    } else {
      inputFeedback(".input-warning__title", "", "");
    }
  });

  editPrice.addEventListener("blur", () => {
    if (isNaN(editPrice.value) || checkValidation(editPrice.value, 1)) {
      inputFeedback(".input-warning__price", "Insert numbers", "fa-exclamation-circle");
      validationPassed = false;
    } else {
      inputFeedback(".input-warning__price", "", "");
    }
  });

  editDescription.addEventListener("blur", () => {
    if (checkValidation(editDescription.value.length, 1)) {
      inputFeedback(".input-warning__description", "Please insert text", "fa-exclamation-circle");
      validationPassed = false;
    } else {
      inputFeedback(".input-warning__description", "", "");
    }
  });

  editDescriptionDetail.addEventListener("blur", () => {
    if (checkValidation(editDescriptionDetail.value.length, 1)) {
      inputFeedback(
        ".input-warning__description-details",
        "Please insert text",
        "fa-exclamation-circle"
      );
      validationPassed = false;
    } else {
      inputFeedback(".input-warning__description-details", "", "");
    }
  });

  editNutrition.addEventListener("blur", () => {
    if (checkValidation(editNutrition.value.length, 1)) {
      inputFeedback(".input-warning__nutrition", "Please insert text", "fa-exclamation-circle");
      validationPassed = false;
    } else {
      inputFeedback(".input-warning__nutrition", "", "");
    }
  });

  editVolume.addEventListener("blur", () => {
    if (editVolume.value === "Choose volume") {
      inputFeedback(".input-warning__volume", "Choose volume", "fa-exclamation-circle");
      validationPassed = false;
    } else {
      inputFeedback(".input-warning__volume", "", "");
    }
  });

  return validationPassed;
}

validateAddForm();
