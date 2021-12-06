import { results } from "../components/elements.js";

export function emptyResult() {
  const child = results.firstChild;
  if (!child) {
    results.innerHTML = `<p class="no-results">No products found</p>`;
  }
}
