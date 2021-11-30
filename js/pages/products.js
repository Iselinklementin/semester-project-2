import { createHtml } from "../common/createHtml.js";
import toggleSidebar from "../layout/nav.js";
import { fetchApi } from "../settings/fetchApi.js";
import { emptyResult } from "../components/emptyResult.js";

const products = await fetchApi();

toggleSidebar();
createHtml(products);

const searchInput = document.querySelector(".search-product-page");

function filterSearch(products) {
  searchInput.onkeyup = event => {
    const searchValue = event.target.value.trim();
    const searchTitle = products.filter(item => {
      if (
        item.title.toLowerCase().includes(searchValue) ||
        item.description.toLowerCase().includes(searchValue)
      ) {
        return true;
      }
    });

    console.log(searchTitle);
    createHtml(searchTitle);
    // emptyResult();
  };
}

filterSearch(products);

const btnfilter = document.querySelectorAll(".filter-btn");

btnfilter.forEach(btn => {
  btn.addEventListener("click", filterProducts);
});

function filterProducts() {}
