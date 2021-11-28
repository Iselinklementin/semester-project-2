// import { container } from "./elements.js";
const results = document.querySelector(".results");

export function emptyResult() {
  const child = results.firstChild;
  if (!child) {
    results.innerHTML = `<p class="no-results">No products found</p>`;
  }
}
