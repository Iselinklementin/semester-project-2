import { MESSAGES } from "../components/messages.js";
import displayMessage from "../components/displayMessage.js";
import { PRODUCT_URL, PUT } from "../settings/api.js";
import { JSON_CONTENT_TYPE_AUTH } from "../settings/api.js";
import { getFromStorage, saveToStorage } from "../settings/storage.js";
import { CART_STORAGE_KEY, FAV_STORAGE_KEY } from "../settings/keys.js";
import { ERROR, STATUS_ELEMENT, SUCCESS } from "../components/misc.js";

let currentFav = getFromStorage(FAV_STORAGE_KEY);
let currentCart = getFromStorage(CART_STORAGE_KEY);

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
    method: PUT,
    body: data,
    headers: JSON_CONTENT_TYPE_AUTH,
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();

    if (json.error) {
      console.log(error);
      return displayMessage(ERROR, json.message, STATUS_ELEMENT);
    }

    if (json.updated_at) {
      json.id = JSON.stringify(json.id);

      // if product is in cart while updating it,
      // update cart too

      let quantityInCart;

      currentCart.find((product) => {
        if (product.id === json.id) {
          quantityInCart = product.quantity;
          const newCartProducts = currentCart.filter((product) => product.id !== json.id);
          json.quantity = quantityInCart;
          newCartProducts.push(json);
          saveToStorage(CART_STORAGE_KEY, newCartProducts);
        }
      });

      // if product is in favourites while updating it,
      // update favourites too

      const newFavourites = currentFav.filter((product) => product.id !== json.id);
      newFavourites.push(json);
      saveToStorage(FAV_STORAGE_KEY, newFavourites);

      displayMessage(SUCCESS, MESSAGES.updated_product, STATUS_ELEMENT);
    }
  } catch (error) {
    displayMessage(ERROR, MESSAGES.server_error, STATUS_ELEMENT);
  }
}
