// const results = document.querySelector(".results");
import { results } from "../components/elements.js";
// const results = document.querySelector(".product-container");

// export function emptyResult() {
//   results.innerHTML = `<p class="no-results">No products found</p>`;
// }

// fiks så denne fungerer i cart og på favorites

export function emptyResult() {
  const child = results.firstChild;
  console.log(child);
  if (!child) {
    results.innerHTML = `<p class="no-results">No products found</p>`;
  }
}
