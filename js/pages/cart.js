import { getFromStorage } from "../settings/storage.js";
import { cartKey } from "../settings/keys.js";
import { emptyResult } from "../components/emptyResult.js";
import toggleSidebar from "../layout/nav.js";

toggleSidebar();

const currentItems = getFromStorage(cartKey);
// function that creates html

console.log(currentItems);

const results = document.querySelector(".results");

currentItems.forEach((product) => {
  results.innerHTML += `<h1>${product.title}</h1>`;
});

if (!currentItems.length) {
  emptyResult();
}
