import { updateProduct } from "./updateProduct.js";
import {
  volume,
  featuredCheckbox,
  descriptionDetails,
  description,
  title,
  price,
  nutrition,
  idInput,
  hiddenImageContainer,
} from "../components/elements.js";

export async function submitEdit(event) {
  event.preventDefault();
  const titleValue = `Milky <span>${title.value.trim()}</span>`;
  const priceValue = price.value.trim();
  const idValue = idInput.value;
  const descriptionValue = description.value.trim();
  const descriptionDetailValue = descriptionDetails.value.trim();
  const nutritionValue = nutrition.value.trim();
  const featuredValue = featuredCheckbox.checked;
  const imageSrc = hiddenImageContainer.value.trim();
  const volumeValue = volume.value;

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
