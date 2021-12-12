import { results } from "../components/elements.js";

// If search, favourites or cart is empty
// give feedback

export function emptyResult() {
  const child = results.firstChild;
  if (!child) {
    results.innerHTML = `<p class="no-results">No products found</p>`;
  }
}
