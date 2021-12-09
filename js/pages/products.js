import { createHtml } from "../common/createHtml.js";
import toggleSidebar from "../layout/nav.js";
import { loadingHtml } from "../common/loadingHtml.js";
import { productpageUrl, productsUrl } from "../settings/constant.js";
import { searchFunction } from "../common/searchFunction.js";

const btnfilter = document.querySelectorAll(".filter-btn");

// loadingBanner();
loadingHtml();
toggleSidebar();

const herobanner = document.querySelector(".hero-banner");

(function callApi() {
  let fetchBanner = fetch(productpageUrl);
  let fetchProducts = fetch(productsUrl);

  Promise.all([fetchBanner, fetchProducts])
    .then(values => Promise.all(values.map(value => value.json())))
    .then(finalValues => {
      const productBanner = finalValues[0];
      const products = finalValues[1];
      herobanner.src = productBanner.banner[0].url;

      createHtml(products);
      searchFunction(products);

      btnfilter.forEach(btn => {
        btn.addEventListener("click", filterProducts);
      });

      function filterProducts() {
        const parentChildren = this.parentElement.children;
        const findChildrenClass = [...parentChildren];
        const removeClass = findChildrenClass.filter(child =>
          child.classList.contains("active-filter")
        );
        if (removeClass.length) {
          removeClass[0].classList.remove("active-filter");
        }
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
    });
})();
