import { createProductCards } from "./createHtml/createProductCards.js";
import { emptyResult } from "../components/emptyResult.js";
import { productContainer } from "../components/elements.js";

export function searchFunction(products) {
  const searchInput = document.querySelector(".search-product-page");
  const filterBtn = document.querySelectorAll(".filter-btn");

  searchInput.oninput = event => {
    const searchValue = event.target.value.trim().toLowerCase();
    const findChildrenClass = [...filterBtn];
    const hasClass = findChildrenClass.filter(child => child.classList.contains("active-filter"));

    const filterProducts = products.filter(product => {
      // remove span from the title
      let title = product.title.replace("<span>", "").replace("</span>", "").toLowerCase();
      const descProduct = product.description.toLowerCase();

      if (descProduct.includes(searchValue) || title.includes(searchValue)) {
        return true;
      }
    });

    // If its filtered on volume first, and then on input
    let filterVolume = filterProducts.filter(product => {
      if (hasClass[0].value === product.volume) {
        return true;
      }
    });

    // If its two or less in searchresults, columns is set to 2 instead of 4.
    if (filterProducts.length === 1 || filterVolume.length === 1) {
      productContainer.classList = `p-0 row row-cols-1 g-4 row-cols-lg-1 results product-container`;
    } else {
      productContainer.classList = `container p-0 row row-cols-2 g-4 row-cols-lg-4 results product-container`;
    }

    if (filterVolume.length) {
      createProductCards(filterVolume);
    } else {
      createProductCards(filterProducts);
    }
    emptyResult();
  };
}
