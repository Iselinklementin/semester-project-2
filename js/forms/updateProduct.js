import { MESSAGES } from "../components/messages.js";
import displayMessage from "../components/displayMessage.js";
import { PRODUCT_URL } from "../settings/api.js";
import { JSON_CONTENT_TYPE_AUTH } from "../settings/api.js";

export async function updateProduct(
  title,
  price,
  description,
  description_details,
  nutrition,
  featured,
  image_url,
  volume,
  id
) {
  const url = PRODUCT_URL + id;
  const data = JSON.stringify({
    title: title,
    price: price,
    description: description,
    description_details: description_details,
    nutrition: nutrition,
    featured: featured,
    image_url: image_url,
    volume: volume,
  });

  const options = {
    method: "PUT",
    body: data,
    headers: JSON_CONTENT_TYPE_AUTH,
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();

    if (json.error) {
      console.log(error);
      return displayMessage("error", json.message, ".message-container");
    }

    if (json.updated_at) {
      displayMessage("success", MESSAGES.updated_product, ".message-container");
    }
  } catch (error) {
    displayMessage("error", MESSAGES.server_error, ".message-container");
  }
}
