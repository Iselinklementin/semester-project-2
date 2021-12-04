import { createHtml } from "../common/createHtml.js";
import toggleSidebar from "../layout/nav.js";
import { fetchProductsApi } from "../settings/fetchApi.js";
import { emptyResult } from "../components/emptyResult.js";
// import { fetchProductHeaderApi } from "../settings/fetchApi.js";
const btnfilter = document.querySelectorAll(".filter-btn");
const searchInput = document.querySelector(".search-product-page");

const products = await fetchProductsApi();
// denne fungerer ikke
// const banner = await fetchProductHeaderApi();

toggleSidebar();
createHtml(products);

function filterSearch(products) {
  searchInput.onkeyup = (event) => {
    const searchValue = event.target.value.trim();
    const searchTitle = products.filter((item) => {
      // Tar vekk span så produktet kan søkes på
      let titleStr = item.title;
      let title = titleStr.replace("<span>", "");
      console.log(title);
      if (title.toLowerCase().includes(searchValue) || item.description.toLowerCase().includes(searchValue)) {
        return true;
      }
    });

    createHtml(searchTitle);
    // emptyResult();
  };
}

filterSearch(products);

btnfilter.forEach((btn) => {
  btn.addEventListener("click", filterProducts);
});

// lag en filter function som fungerer på begge sidene?
// denne er bedre enn på index

function filterProducts() {
  const parentChildren = this.parentElement.children;
  const findChildrenClass = [...parentChildren];

  const removeClass = findChildrenClass.filter((child) => child.classList.contains("active-filter"));
  if (removeClass.length) {
    removeClass[0].classList.remove("active-filter");
  }

  // kan vurdere en funksjon som gjør dette siden alt er likt

  if (this.value === "All products") {
    createHtml(products);
    this.classList.add("active-filter");
  }

  if (this.value === "Small") {
    const smallProducts = products.filter((product) => product.volume === "Small");
    createHtml(smallProducts);
    this.classList.add("active-filter");
  }

  if (this.value === "Large") {
    const largeProducts = products.filter((product) => product.volume === "Large");
    createHtml(largeProducts);
    this.classList.add("active-filter");
  }
}
