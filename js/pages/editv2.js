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
const newImageContainer = document.querySelector(".edit-image");
toggleSidebar();

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
      newImageContainer.value = result.info.secure_url;
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

    // Prøve å kun bytte tittelen og ikke det rundt
    // console.log(editTitle.value.trim().substr(0, 12));
    // editTitle.value = product.title.substr(12, 4);
    // function addStr(str, index, stringToAdd) {
    //   return str.substring(0, index) + stringToAdd + str.substring(index, str.length);
    // }

    // let str = "This is a string";
    // let stringToAdd = "modyfied ";
    // console.log(addStr(str, 10, stringToAdd));

    let stringToHTML = function (str) {
      let parser = new DOMParser();
      let doc = parser.parseFromString(str, "text/html");
      return doc.body;
    };

    if (product.title.includes("<span>")) {
      let testTitle = product.title;

      const splits = testTitle.split(" ", 3);
      console.log(splits);
    }

    editImage.src = product.image_url;
    editTitle.value = product.title;
    editPrice.value = product.price;
    editDescription.value = product.description;
    editDescriptionDetail.value = product.description_details;
    idInput.value = product.id;
    editNutrition.value = product.nutrition;

    newImageContainer.value = product.image_url;

    // console.log(product);
  } catch (error) {
    displayMessage("error", "Something went wrong", ".message-container");
  }
})();

editForm.addEventListener("submit", submitEdit);

async function submitEdit(event) {
  event.preventDefault();
  const titleValue = editTitle.value.trim();
  const priceValue = editPrice.value.trim();
  const idValue = idInput.value;
  const descriptionValue = editDescription.value.trim();
  const descriptionDetailValue = editDescriptionDetail.value.trim();
  const nutritionValue = editNutrition.value.trim();
  const featuredValue = editFeatured.checked;
  const imageSrc = newImageContainer.value.trim();
  const volumeValue = editVolume.value;

  // validation
  // updateProductFunction
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

  console.log(data);

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
      // Hvis den ligger i favorites - legg kode her
    } catch (error) {
      displayMessage("error", "Server error", ".message-container");
    }
  }
};
