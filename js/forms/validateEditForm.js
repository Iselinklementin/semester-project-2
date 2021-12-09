import validateLength from "../components/checkValidation.js";
import { inputFeedback } from "./inputFeedback.js";
import {
  editVolume,
  editDescriptionDetail,
  editDescription,
  editTitle,
  editPrice,
  editNutrition,
} from "../components/elements.js";
import { MESSAGES } from "../components/messages.js";

// samme som add-page
// gjør alle classene like, så slipper man å ha det dobbelt opp

export function validateEditForm() {
  let validationPassed = true;

  editTitle.addEventListener("blur", () => {
    if (validateLength(editTitle.value.length, 1)) {
      inputFeedback(".input-warning__title", MESSAGES.insert_text, "fa-exclamation-circle");
      validationPassed = false;
    } else {
      inputFeedback(".input-warning__title", "", "");
    }
  });

  editPrice.addEventListener("blur", () => {
    if (isNaN(editPrice.value) || validateLength(editPrice.value, 1)) {
      inputFeedback(".input-warning__price", MESSAGES.insert_number, "fa-exclamation-circle");
      validationPassed = false;
    } else {
      inputFeedback(".input-warning__price", "", "");
    }
  });

  editDescription.addEventListener("blur", () => {
    if (validateLength(editDescription.value.length, 1)) {
      inputFeedback(".input-warning__description", MESSAGES.insert_text, "fa-exclamation-circle");
      validationPassed = false;
    } else {
      inputFeedback(".input-warning__description", "", "");
    }
  });

  editDescriptionDetail.addEventListener("blur", () => {
    if (validateLength(editDescriptionDetail.value.length, 1)) {
      inputFeedback(".input-warning__description-details", MESSAGES.insert_text, "fa-exclamation-circle");
      validationPassed = false;
    } else {
      inputFeedback(".input-warning__description-details", "", "");
    }
  });

  editNutrition.addEventListener("blur", () => {
    if (validateLength(editNutrition.value.length, 1)) {
      inputFeedback(".input-warning__nutrition", MESSAGES.insert_text, "fa-exclamation-circle");
      validationPassed = false;
    } else {
      inputFeedback(".input-warning__nutrition", "", "");
    }
  });

  editVolume.addEventListener("blur", () => {
    if (editVolume.value === "Choose volume") {
      inputFeedback(".input-warning__volume", MESSAGES.choose_volume, "fa-exclamation-circle");
      validationPassed = false;
    } else {
      inputFeedback(".input-warning__volume", "", "");
    }
  });

  return validationPassed;
}
