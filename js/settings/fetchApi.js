import { productsUrl } from "./constant.js";
import { productpageUrl } from "./constant.js";

export async function fetchProductsApi() {
  const response = await fetch(productsUrl);
  const result = await response.json();
  return result;
}

// export async function

export async function fetchProductHeaderApi() {
  const response = await fetch(productpageUrl);
  const result = await response.json();
  return result;
}
