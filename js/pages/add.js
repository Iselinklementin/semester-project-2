import toggleSidebar from "../layout/nav.js";
import { productsUrl, baseUrl, contentTypeAuth } from "../settings/constant.js";
import displayMessage from "../components/displayMessage.js";
import { MESSAGES } from "../components/messages.js";
// egen js
import validateLength from "../components/checkValidation.js";
import {
  addTitle,
  addPrice,
  addDescription,
  featuredBox,
  addBtn,
  cloudName,
  uploadPreset,
  uploadWidget,
  uploadedImage,
  addImage,
  addForm,
  addVolume,
  addNutrition,
  descriptionDetails,
} from "../components/elements.js";
import { inputFeedback } from "../forms/inputFeedback.js";
const formInputs = document.querySelectorAll(".add-product-wrap .form-control");

toggleSidebar();

// vanskelig å laste opp bildet på mobil

const myWidget = cloudinary.createUploadWidget(
  {
    cloudName: cloudName,
    uploadPreset: uploadPreset,
  },
  (error, result) => {
    if (!error && result && result.event === "success") {
      console.log("Done! Here is the image info: ", result.info);
      uploadedImage.setAttribute("src", result.info.secure_url);
      addImage.value = result.info.secure_url;
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

export async function addProduct(
  title,
  price,
  description,
  featured,
  imageValue,
  volume,
  description_details,
  nutrition
) {
  const data = JSON.stringify({
    title,
    price,
    description,
    featured,
    image_url: imageValue,
    volume,
    description_details,
    nutrition,
  });

  const options = {
    method: "POST",
    body: data,
    headers: contentTypeAuth,
  };

  try {
    const response = await fetch(productsUrl, options);
    const json = await response.json();

    formInputs.forEach((input) => {
      input.disabled = true;
    });

    addBtn.innerText = "Adding product...";

    if (json.error) {
      displayMessage("error", json.message, ".message-container");
    }

    if (json.created_at) {
      addForm.reset();
      console.log(json.created_at);
      displayMessage("success", "Product created", ".message-container");
    }
  } catch (error) {
    displayMessage("error", MESSAGES.server_error, ".message-container");
  } finally {
    formInputs.forEach((input) => {
      input.disabled = false;
    });

    addBtn.innerText = "Add product";
  }
}

// egen js

addBtn.addEventListener("click", submitProduct);

// IMAGE error vises selv om du legger til bilde

function submitProduct(event) {
  event.preventDefault();

  let volumeValue = "";

  if (addVolume.value == 1) {
    volumeValue = "Small";
  }

  if (addVolume.value == 2) {
    volumeValue = "Large";
  }

  const title = `Milky <span>${addTitle.value.trim()}</span>`;
  const price = addPrice.value.trim();
  const description = addDescription.value.trim();
  const featured = featuredBox.checked;
  const imageValue = addImage.value.trim();
  const volume = volumeValue;
  const description_details = descriptionDetails.value.trim();
  const nutrition = addNutrition.value.trim();

  // if (validateLength(addImage.value.length, 1)) {
  //   inputFeedback(".input-warning__image", "Please upload an image", "fa-exclamation-circle");
  // } else {
  //   inputFeedback(".input-warning__image", "", "");
  // }

  // const imageContainer = document.querySelector("#uploadedimage.src");

  // if (!imageContainer) {
  //   inputFeedback(".input-warning__image", "Please upload an image", "fa-exclamation-circle");
  // } else {
  //   inputFeedback(".input-warning__image", "", "");
  // }

  if (!validateAddForm || validateLength(addImage.value.length, 1)) {
    return displayMessage("error", MESSAGES.fill_fields, ".message-container");
  }

  addProduct(title, price, description, featured, imageValue, volume, description_details, nutrition);
}

function validateAddForm() {
  let validationPassed = true;

  addTitle.addEventListener("blur", () => {
    if (validateLength(addTitle.value.length, 1)) {
      inputFeedback(".input-warning__title", MESSAGES.insert_text, "fa-exclamation-circle");
      validationPassed = false;
    } else {
      inputFeedback(".input-warning__title", "", "");
    }
  });

  addPrice.addEventListener("blur", () => {
    if (isNaN(addPrice.value) || validateLength(addPrice.value, 1)) {
      inputFeedback(".input-warning__price", MESSAGES.insert_number, "fa-exclamation-circle");
      validationPassed = false;
    } else {
      inputFeedback(".input-warning__price", "", "");
    }
  });

  addDescription.addEventListener("blur", () => {
    if (validateLength(addDescription.value.length, 1)) {
      inputFeedback(".input-warning__description", MESSAGES.insert_text, "fa-exclamation-circle");
      validationPassed = false;
    } else {
      inputFeedback(".input-warning__description", "", "");
    }
  });

  descriptionDetails.addEventListener("blur", () => {
    if (validateLength(descriptionDetails.value.length, 1)) {
      inputFeedback(".input-warning__description-details", MESSAGES.insert_text, "fa-exclamation-circle");
      validationPassed = false;
    } else {
      inputFeedback(".input-warning__description-details", "", "");
    }
  });

  addNutrition.addEventListener("blur", () => {
    if (validateLength(addNutrition.value.length, 1)) {
      inputFeedback(".input-warning__nutrition", MESSAGES.insert_text, "fa-exclamation-circle");
      validationPassed = false;
    } else {
      inputFeedback(".input-warning__nutrition", "", "");
    }
  });

  addVolume.addEventListener("blur", () => {
    console.log(addVolume.value);
    if (addVolume.value === "Choose volume") {
      inputFeedback(".input-warning__volume", MESSAGES.choose_volume, "fa-exclamation-circle");
      validationPassed = false;
    } else {
      inputFeedback(".input-warning__volume", "", "");
    }
  });

  return validationPassed;
}

validateAddForm();

// if (
//   validateLength(title.length, 1) ||
//   validateLength(price.length, 1) ||
//   validateLength(description.length, 1) ||
//   validateLength(description_details.length, 1) ||
//   validateLength(nutrition.length, 1) ||
//   validateLength(imageValue.length, 1) ||
//   isNaN(addPrice.value) ||
//   !volumeValue
// ) {

// addPrice.addEventListener("keyup", () => {
//   console.log(!isNaN(addPrice.value));
//   return true;
// });

// emailInput.addEventListener("blur", () => {
//   if (validateEmail(emailInput.value.trim())) {
//     errorLogin.innerHTML = ``;
//     errorLogin.nextElementSibling.classList = "fas fa-check-circle";
//   } else {
//     errorLogin.innerHTML = `<p>Please insert a valid email</p>`;
//     errorLogin.nextElementSibling.classList = "fas fa-exclamation-circle";
//     loginBtn.disabled = true;
//   }
// });
