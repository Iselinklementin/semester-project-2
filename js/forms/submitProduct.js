import {
  addTitle,
  addPrice,
  addDescription,
  featuredBox,
  addImage,
  addVolume,
  addNutrition,
  descriptionDetails,
} from "../components/elements.js";
import { MESSAGES } from "../components/messages.js";
import displayMessage from "../components/displayMessage.js";
import validateLength from "../components/checkValidation.js";
import { addProduct } from "./addProduct.js";
import { validateAddForm } from "./validateAddForm.js";

export function submitProduct(event) {
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

  if (!validateAddForm || validateLength(addImage.value.length, 1)) {
    return displayMessage("error", MESSAGES.fill_fields, ".message-container");
  }

  addProduct(title, price, description, featured, imageValue, volume, description_details, nutrition);
}
