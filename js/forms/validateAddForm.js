import validateLength from "../components/checkValidation.js";
import {
  addTitle,
  addPrice,
  addDescription,
  addVolume,
  addNutrition,
  descriptionDetails,
} from "../components/elements.js";
import { inputFeedback } from "../forms/inputFeedback.js";
import { MESSAGES } from "../components/messages.js";

export function validateAddForm() {
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
