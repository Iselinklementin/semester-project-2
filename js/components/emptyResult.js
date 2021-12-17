import { results } from "../components/elements.js";
import { changeCartIcon } from "../layout/changeCartIcon.js";

// If search, favourites or cart is empty
// give feedback

export function emptyResult() {
  const child = results.firstChild;
  if (!child) {
    results.innerHTML = `<div class="empty-results-container">
                          <p class="empty-results">No products found</p>
                          </div>`;
  }
}
