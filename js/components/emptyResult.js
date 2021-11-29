// const results = document.querySelector(".results");
import { results } from "../components/elements.js";

export function emptyResult() {
  results.innerHTML = `<p class="no-results">No products found</p>`;
}
