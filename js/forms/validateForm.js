import {
  volume,
  descriptionDetails,
  description,
  title,
  price,
  nutrition,
} from "../components/elements.js";
import validateLength from "../components/checkValidation.js";
import { inputFeedback } from "./inputFeedback.js";
import { MESSAGES } from "../components/messages.js";

export function validateForm() {
  let validationPassed = true;

  title.addEventListener("blur", () => {
    if (validateLength(title.value.length, 1)) {
      inputFeedback(".input-warning__title", MESSAGES.insert_text, "fa-exclamation-circle");
      validationPassed = false;
    } else {
      inputFeedback(".input-warning__title", "", "");
    }
  });

  price.addEventListener("blur", () => {
    if (isNaN(price.value) || validateLength(price.value, 1)) {
      inputFeedback(".input-warning__price", MESSAGES.insert_number, "fa-exclamation-circle");
      validationPassed = false;
    } else {
      inputFeedback(".input-warning__price", "", "");
    }
  });

  description.addEventListener("blur", () => {
    if (validateLength(description.value.length, 1)) {
      inputFeedback(".input-warning__description", MESSAGES.insert_text, "fa-exclamation-circle");
      validationPassed = false;
    } else {
      inputFeedback(".input-warning__description", "", "");
    }
  });

  descriptionDetails.addEventListener("blur", () => {
    if (validateLength(descriptionDetails.value.length, 1)) {
      inputFeedback(
        ".input-warning__description-details",
        MESSAGES.insert_text,
        "fa-exclamation-circle"
      );
      validationPassed = false;
    } else {
      inputFeedback(".input-warning__description-details", "", "");
    }
  });

  nutrition.addEventListener("blur", () => {
    if (validateLength(nutrition.value.length, 1)) {
      inputFeedback(".input-warning__nutrition", MESSAGES.insert_text, "fa-exclamation-circle");
      validationPassed = false;
    } else {
      inputFeedback(".input-warning__nutrition", "", "");
    }
  });

  volume.addEventListener("blur", () => {
    if (volume.value === "Choose volume") {
      inputFeedback(".input-warning__volume", MESSAGES.choose_volume, "fa-exclamation-circle");
      validationPassed = false;
    } else {
      inputFeedback(".input-warning__volume", "", "");
    }
  });

  return validationPassed;
}

// validateEditForm
// validateAddForm
