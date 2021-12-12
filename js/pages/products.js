import { createProductCards } from "../common/createHtml/createProductCards.js";
import toggleSidebar from "../layout/nav.js";
import { loadingHtml } from "../layout/skeletonLoading.js";
import { PRODUCTPAGE_URL, PRODUCT_URL } from "../settings/api.js";
import { searchFunction } from "../common/searchFunction.js";
import { herobanner, filterBtns } from "../components/elements.js";

loadingHtml();
toggleSidebar();

(function callApi() {
  let fetchBanner = fetch(PRODUCTPAGE_URL);
  let fetchProducts = fetch(PRODUCT_URL);

  Promise.all([fetchBanner, fetchProducts])
    .then((values) => Promise.all(values.map((value) => value.json())))
    .then((finalValues) => {
      const productBanner = finalValues[0];
      const products = finalValues[1];

      herobanner.src = productBanner.banner[0].url;

      createProductCards(products);
      searchFunction(products);

      filterBtns.forEach((btn) => {
        btn.addEventListener("click", filterProducts);
      });

      // filter products with buttons
      function filterProducts() {
        const parentChildren = this.parentElement.children;
        const findChildrenClass = [...parentChildren];
        const removeClass = findChildrenClass.filter((child) => child.classList.contains("active-filter"));
        if (removeClass.length) {
          removeClass[0].classList.remove("active-filter");
        }
        if (this.value === "All products") {
          createProductCards(products);
          this.classList.add("active-filter");
        }
        if (this.value === "Small") {
          const smallProducts = products.filter((product) => product.volume === "Small");
          createProductCards(smallProducts);
          this.classList.add("active-filter");
        }
        if (this.value === "Large") {
          const largeProducts = products.filter((product) => product.volume === "Large");
          createProductCards(largeProducts);
          this.classList.add("active-filter");
        }
      }
    })
    .catch((error) => {
      console.error(error.message);
      const hero_banner_container = document.querySelector(".hero-banner-container");
      hero_banner_container.style.display = "none";
    });
})();
