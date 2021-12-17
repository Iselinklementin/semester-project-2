import { createProductCards } from "./createHtml/createProductCards.js";
import { emptyResult } from "../components/emptyResult.js";
import { productContainer } from "../components/elements.js";

export function searchFunction(products) {
  const searchInput = document.querySelector(".search-product-page");

  searchInput.oninput = (event) => {
    const searchValue = event.target.value.trim().toLowerCase();

    const filterProducts = products.filter((item) => {
      // remove span from the title
      let title = item.title.replace("<span>", "").replace("</span>", "").toLowerCase();
      const descProduct = item.description.toLowerCase();
      if (descProduct.includes(searchValue) || title.toLowerCase().includes(searchValue)) {
        return true;
      }
    });

    // If its two or less in searchresults, columns is set to 2 instead of 4.
    if (filterProducts.length <= 2) {
      productContainer.classList = `row row-cols-2 row-cols-md-2 g-4 row-cols-lg-2 results product-container`;
    } else {
      productContainer.classList = `row row-cols-2 row-cols-md-2 g-4 row-cols-lg-4 results product-container`;
    }

    createProductCards(filterProducts);
    emptyResult();
  };
}
