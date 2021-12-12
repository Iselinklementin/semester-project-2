import { createHtml } from "./createHtml.js";
import { emptyResult } from "../components/emptyResult.js";
import { productContainer } from "../components/elements.js";

export function searchFunction(products) {
  const searchInput = document.querySelector(".search-product-page");
  searchInput.onkeyup = (event) => {
    const searchValue = event.target.value.trim();
    const searchTitle = products.filter((item) => {
      // Tar vekk span så produktet kan søkes på
      let titleStr = item.title;
      let title = titleStr.replace("<span>", "");
      if (title.toLowerCase().includes(searchValue) || item.description.toLowerCase().includes(searchValue)) {
        return true;
      }
    });

    if (searchTitle.length <= 2) {
      productContainer.classList = `row row-cols-2 row-cols-md-2 g-4 row-cols-lg-2 results product-container`;
    } else {
      productContainer.classList = `row row-cols-2 row-cols-md-2 g-4 row-cols-lg-4 results product-container`;
    }

    createHtml(searchTitle);

    emptyResult();
  };
}
