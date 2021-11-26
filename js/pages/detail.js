import toggleSidebar from "../layout/nav.js";
import { productsUrl } from "../settings/api.js";
toggleSidebar();

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

(async function fetchProducts() {
  const response = await fetch(productsUrl + "/" + id);
  const result = await response.json();
  console.log(result);
})();
