import toggleSidebar from "../layout/nav.js";
import { productsUrl, baseUrl, contentTypeAuth } from "../settings/constant.js";
import displayMessage from "../components/displayMessage.js";
import { messages } from "../components/messages.js";
// egen js
import checkValidation from "../components/checkValidation.js";
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

// export async function addProduct(title, price, description, featured, imageValue, volume) {
//   const data = JSON.stringify({
//     title: title,
//     price: price,
//     description: description,
//     featured: featured,
//     image_url: imageValue,
//     volume: volume,
//   });

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

  // console.log(data);

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
    displayMessage("error", messages.server_error, ".message-container");
  } finally {
    formInputs.forEach((input) => {
      input.disabled = false;
    });

    addBtn.innerText = "Add product";
  }
}

// egen js

addBtn.addEventListener("click", submitProduct);

// husk validering

function submitProduct(event) {
  event.preventDefault();

  // sjekk den her

  // if (isNaN(addVolume.value)) {
  //   displayMessage("error", messages.empty_input, ".message-container");
  // }

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

  // if (checkValidation(addImage.value.length, 1)) {
  //   inputFeedback(".input-warning__image", "Please upload an image", "fa-exclamation-circle");
  // } else {
  //   inputFeedback(".input-warning__image", "", "");
  // }

  const imageContainer = document.querySelector("#uploadedimage.src");

  if (!imageContainer) {
    inputFeedback(".input-warning__image", "Please upload an image", "fa-exclamation-circle");
  } else {
    inputFeedback(".input-warning__image", "", "");
  }

  if (!validateAddForm || checkValidation(addImage.value.length, 1)) {
    return displayMessage("error", messages.empty_input, ".message-container");
  }

  addProduct(title, price, description, featured, imageValue, volume, description_details, nutrition);
}

function validateAddForm() {
  let validationPassed = true;

  addTitle.addEventListener("blur", () => {
    if (checkValidation(addTitle.value.length, 1)) {
      inputFeedback(".input-warning__title", "Please insert text", "fa-exclamation-circle");
      validationPassed = false;
    } else {
      inputFeedback(".input-warning__title", "", "");
    }
  });

  addPrice.addEventListener("blur", () => {
    if (isNaN(addPrice.value) || checkValidation(addPrice.value, 1)) {
      inputFeedback(".input-warning__price", "Please insert numbers", "fa-exclamation-circle");
      validationPassed = false;
    } else {
      inputFeedback(".input-warning__price", "", "");
    }
  });

  addDescription.addEventListener("blur", () => {
    if (checkValidation(addDescription.value.length, 1)) {
      inputFeedback(".input-warning__description", "Please insert text", "fa-exclamation-circle");
      validationPassed = false;
    } else {
      inputFeedback(".input-warning__description", "", "");
    }
  });

  descriptionDetails.addEventListener("blur", () => {
    if (checkValidation(descriptionDetails.value.length, 1)) {
      inputFeedback(".input-warning__description-details", "Please insert text", "fa-exclamation-circle");
      validationPassed = false;
    } else {
      inputFeedback(".input-warning__description-details", "", "");
    }
  });

  addNutrition.addEventListener("blur", () => {
    if (checkValidation(addNutrition.value.length, 1)) {
      inputFeedback(".input-warning__nutrition", "Please insert text", "fa-exclamation-circle");
      validationPassed = false;
    } else {
      inputFeedback(".input-warning__nutrition", "", "");
    }
  });

  addVolume.addEventListener("blur", () => {
    console.log(addVolume.value);
    if (addVolume.value === "Choose volume") {
      inputFeedback(".input-warning__volume", "Please choose volume", "fa-exclamation-circle");
      validationPassed = false;
    } else {
      inputFeedback(".input-warning__volume", "", "");
    }
  });

  return validationPassed;
}

validateAddForm();

// if (
//   checkValidation(title.length, 1) ||
//   checkValidation(price.length, 1) ||
//   checkValidation(description.length, 1) ||
//   checkValidation(description_details.length, 1) ||
//   checkValidation(nutrition.length, 1) ||
//   checkValidation(imageValue.length, 1) ||
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
