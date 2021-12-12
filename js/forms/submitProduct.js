import {
  title,
  price,
  description,
  image,
  volume,
  nutrition,
  descriptionDetails,
  featuredCheckbox,
} from "../components/elements.js";
import { MESSAGES } from "../components/messages.js";
import displayMessage from "../components/displayMessage.js";
import validateLength from "../components/checkValidation.js";
import { addProduct } from "./addProduct.js";
import { validateForm } from "./validateForm.js";

export function submitProduct(event) {
  event.preventDefault();

  // Get the right volume of the product added

  let volumeValue = "";

  if (volume.value == 1) {
    volumeValue = "Small";
  }

  if (volume.value == 2) {
    volumeValue = "Large";
  }

  const titleValue = `Milky <span>${title.value.trim()}</span>`;
  const priceValue = price.value.trim();
  const descriptionValue = description.value.trim();
  const featured = featuredCheckbox.checked;
  const imageValue = image.value.trim();
  const volumeSize = volumeValue;
  const description_details = descriptionDetails.value.trim();
  const nutritionValue = nutrition.value.trim();

  if (!validateForm || validateLength(imageValue.length, 1)) {
    return displayMessage("error", MESSAGES.fill_fields, ".message-container");
  }

  addProduct(
    titleValue,
    priceValue,
    descriptionValue,
    featured,
    imageValue,
    volumeSize,
    description_details,
    nutritionValue
  );
}
