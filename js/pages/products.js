import { createHtml } from "../common/createHtml.js";
import toggleSidebar from "../layout/nav.js";
import { fetchApi } from "../settings/fetchApi.js";
import { emptyResult } from "../components/emptyResult.js";

const btnfilter = document.querySelectorAll(".filter-btn");
const searchInput = document.querySelector(".search-product-page");

const products = await fetchApi();

toggleSidebar();
createHtml(products);

// search, fungerer ikke ordentlig pga <span>

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

btnfilter.forEach(btn => {
  btn.addEventListener("click", filterProducts);
});

// lag en filter function som fungerer på begge sidene?

function filterProducts() {
  const parentChildren = this.parentElement.children;
  console.log(parentChildren);
  // const findClass = parentChildren.filter(child => {
  //   console.log(child);
  // });

  if (this.value === "All products") {
    createHtml(products);
    this.classList.add("active-filter");
  }

  if (this.value === "Small") {
    const smallProducts = products.filter(product => product.volume === "Small");
    createHtml(smallProducts);
    this.classList.add("active-filter");
  }

  if (this.value === "Large") {
    const largeProducts = products.filter(product => product.volume === "Large");
    createHtml(largeProducts);
    this.classList.add("active-filter");
  }
}
