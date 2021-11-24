import { productsUrl, baseUrl, contentTypeAuth } from "../settings/api.js";
import displayMessage from "../components/displayMessage.js";
import { messages } from "../components/messages.js";
// egen js
import checkValidation from "../components/checkValidation.js";
import { token } from "../settings/storage.js";
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
} from "../components/elements.js";

const image = document.querySelector(".image");

const myWidget = cloudinary.createUploadWidget(
  {
    cloudName: cloudName,
    uploadPreset: uploadPreset,
  },
  (error, result) => {
    if (!error && result && result.event === "success") {
      console.log("Done! Here is the image info: ", result.info);
      uploadedImage.setAttribute("src", result.info.secure_url);
      // const image = document.querySelector(".image");
      image.value = result.info.secure_url;
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

// async function callApi() {
//   const response = await fetch(productsUrl);
//   const result = await response.json();

//   console.log(result);
//   result.forEach((element) => {
//     console.log(element.image_url);
//   });
//   // // result.forEach((product) => {
//   // //   const imageArray = product.image;
//   // //   imageArray.forEach((img) => {
//   // //     console.log(img.url);
//   // //   });
//   // // });
// }

// callApi();

export async function addProduct(title, price, description, featured) {
  const data = JSON.stringify({
    title: title,
    price: price,
    description: description,
    featured: featured,
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
    }

    if (json.created_at) {
      console.log(json);
      // addForm.reset();
      displayMessage("success", messages.created_article, ".message-container");
    }
  } catch {
    displayMessage("error", messages.server_error, ".message-container");
  }
}

// egen js

addBtn.addEventListener("click", submitProduct);

function submitProduct(event) {
  event.preventDefault();

  const title = addTitle.value.trim();
  const price = addPrice.value.trim();
  const description = addDescription.value.trim();
  const featured = featuredBox.checked;
  // const image_url = image.value;

  // console.log(image_url);

  if (checkValidation(title.length, 1) || checkValidation(price.length, 1) || checkValidation(description.length, 1)) {
    return displayMessage("error", messages.empty_input, ".message-container");
  }

  addProduct(title, price, description, featured);
}
