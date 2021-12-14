import { submitBtn, uploadedImage, form, formInputs } from "../components/elements.js";
import { PRODUCT_URL, JSON_CONTENT_TYPE_AUTH, POST } from "../settings/api.js";
import displayMessage from "../components/displayMessage.js";
import { MESSAGES } from "../components/messages.js";
import { ERROR, STATUS_ELEMENT, SUCCESS } from "../components/misc.js";

export async function addProduct(
  title,
  price,
  description,
  featured,
  imageValue,
  volume,
  description_details,
  nutrition
) {
  const data = JSON.stringify({
    title,
    price,
    description,
    featured,
    image_url: imageValue,
    volume,
    description_details,
    nutrition,
  });

  const options = {
    method: POST,
    body: data,
    headers: JSON_CONTENT_TYPE_AUTH,
  };

  try {
    const response = await fetch(PRODUCT_URL, options);
    const json = await response.json();

    formInputs.forEach(input => {
      input.disabled = true;
    });

    submitBtn.innerText = MESSAGES.adding;

    if (json.error) {
      displayMessage(ERROR, json.message, STATUS_ELEMENT);
    }

    if (json.created_at) {
      form.reset();
      uploadedImage.src = "";
      displayMessage(SUCCESS, MESSAGES.created, STATUS_ELEMENT);
    }
  } catch (error) {
    displayMessage(ERROR, MESSAGES.server_error, STATUS_ELEMENT);
  } finally {
    formInputs.forEach(input => {
      input.disabled = false;
    });

    submitBtn.innerHTML = `<i class="fas fa-plus"></i> Add product`;
  }
}
