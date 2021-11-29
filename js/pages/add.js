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
} from "../components/elements.js";

// const addImage = document.querySelector(".image");

toggleSidebar();

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

export async function addProduct(title, price, description, featured, imageValue, volume) {
  const data = JSON.stringify({
    title: title,
    price: price,
    description: description,
    featured: featured,
    image_url: imageValue,
    volume: volume,
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

    if (json.error) {
      displayMessage("error", json.message, ".message-container");
      // console.log(error);
    }

    if (json.created_at) {
      addForm.reset();
      console.log(json.created_at);
      displayMessage("success", messages.created_article, ".message-container");
    }
  } catch (error) {
    // console.log(error);
    displayMessage("error", messages.server_error, ".message-container");
  }
}

// egen js

addBtn.addEventListener("click", submitProduct);

// husk validering

function submitProduct(event) {
  event.preventDefault();

  let volumeValue = "";

  if (addVolume.value == 1) {
    volumeValue = "Small";
  }

  if (addVolume.value == 2) {
    volumeValue = "Large";
  }

  if (isNaN(addVolume.value)) {
    displayMessage("error", messages.empty_input, ".message-container");
  }

  const title = `Milky <span>${addTitle.value.trim()}</span>`;
  const price = addPrice.value.trim();
  const description = addDescription.value.trim();
  const featured = featuredBox.checked;
  const imageValue = addImage.value.trim();
  const volume = volumeValue;

  // console.log(volume);

  if (checkValidation(title.length, 1) || checkValidation(price.length, 1) || checkValidation(description.length, 1)) {
    return displayMessage("error", messages.empty_input, ".message-container");
  }

  addProduct(title, price, description, featured, imageValue, volume);
}

// console.log(addVolume.value);

// (async function fetchProducts() {
//   const response = await fetch(productsUrl);
//   const result = await response.json();
//   console.log(result);
// })();
