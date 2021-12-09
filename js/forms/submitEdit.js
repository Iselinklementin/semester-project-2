import { updateProduct } from "./updateProduct.js";
import {
  editVolume,
  editFeatured,
  editDescriptionDetail,
  editDescription,
  editTitle,
  editPrice,
  editNutrition,
  idInput,
  hiddenImageContainer,
} from "../components/elements.js";

export async function submitEdit(event) {
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
