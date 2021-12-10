import { submitBtn, uploadedImage, form } from "../components/elements.js";
import { PRODUCT_URL, JSON_CONTENT_TYPE_AUTH } from "../settings/api.js";
import displayMessage from "../components/displayMessage.js";
const formInputs = document.querySelectorAll(".add-product-wrap .form-control");

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
    method: "POST",
    body: data,
    headers: JSON_CONTENT_TYPE_AUTH,
  };

  try {
    const response = await fetch(PRODUCT_URL, options);
    const json = await response.json();

    formInputs.forEach(input => {
      input.disabled = true;
    });

    submitBtn.innerText = "Adding product...";

    if (json.error) {
      displayMessage("error", json.message, ".message-container");
    }

    if (json.created_at) {
      form.reset();
      uploadedImage.src = "";
      console.log(json.created_at);
      displayMessage("success", "Product created", ".message-container");
    }
  } catch (error) {
    displayMessage("error", MESSAGES.server_error, ".message-container");
  } finally {
    formInputs.forEach(input => {
      input.disabled = false;
    });

    submitBtn.innerText = "Add product";
  }
}
