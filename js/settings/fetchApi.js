import { productsUrl } from "./constant.js";

export async function fetchApi() {
  const response = await fetch(productsUrl);
  const result = await response.json();
  return result;
}
