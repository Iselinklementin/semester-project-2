import { volume, descriptionDetails, description, title, price, nutrition } from "../../components/elements.js";
import validateLength from "../../components/checkValidation.js";
import { inputFeedback } from "../inputFeedback.js";
import { MESSAGES } from "../../components/messages.js";
import { ALERT, WARNING } from "../../components/misc.js";

// Validation both for adding and editing products

export function validateForm() {
  let validationPassed = true;

  title.addEventListener("blur", () => {
    if (validateLength(title.value.length, 1)) {
      inputFeedback(ALERT.title, MESSAGES.insert_text, WARNING);
      validationPassed = false;
    } else {
      inputFeedback(ALERT.title, "", "");
    }
  });

  price.addEventListener("blur", () => {
    if (isNaN(price.value) || validateLength(price.value, 1)) {
      inputFeedback(ALERT.price, MESSAGES.insert_number, WARNING);
      validationPassed = false;
    } else {
      inputFeedback(ALERT.price, "", "");
    }
  });

  description.addEventListener("blur", () => {
    if (validateLength(description.value.length, 1)) {
      inputFeedback(ALERT.description, MESSAGES.insert_text, WARNING);
      validationPassed = false;
    } else {
      inputFeedback(ALERT.description, "", "");
    }
  });

  descriptionDetails.addEventListener("blur", () => {
    if (validateLength(descriptionDetails.value.length, 1)) {
      inputFeedback(ALERT.details, MESSAGES.insert_text, WARNING);
      validationPassed = false;
    } else {
      inputFeedback(ALERT.details, "", "");
    }
  });

  nutrition.addEventListener("blur", () => {
    if (validateLength(nutrition.value.length, 1)) {
      inputFeedback(ALERT.nutrition, MESSAGES.insert_text, WARNING);
      validationPassed = false;
    } else {
      inputFeedback(ALERT.nutrition, "", "");
    }
  });

  volume.addEventListener("blur", () => {
    if (volume.value === "Choose volume") {
      inputFeedback(ALERT.volume, MESSAGES.choose_volume, WARNING);
      validationPassed = false;
    } else {
      inputFeedback(ALERT.volume, "", "");
    }
  });

  return validationPassed;
}
