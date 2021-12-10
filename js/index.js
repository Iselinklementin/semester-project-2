import toggleSidebar from "./layout/nav.js";
import { productsUrl, homeUrl } from "./settings/constant.js";
import { createHtml } from "./common/createHtml.js";
import { loadingHtml } from "./common/skeletonLoading.js";

toggleSidebar();
loadingHtml();

const herobanner = document.querySelector(".hero-banner");

// husk try fetch finally og autocall

(function callApi() {
  let fetchBanner = fetch(homeUrl);
  let fetchProducts = fetch(productsUrl);

  Promise.all([fetchBanner, fetchProducts])
    .then(values => Promise.all(values.map(value => value.json())))
    .then(finalValues => {
      const homeAPI = finalValues[0];
      const productsAPI = finalValues[1];

      herobanner.src = homeAPI.hero_banner.url;
      const featuredProducts = productsAPI.filter(product => (product.featured ? true : false));
      const productContainer = document.querySelector(".product-container");
      productContainer.innerHTML = "";
      createHtml(featuredProducts);

      const newBtn = document.querySelectorAll(".filter-btn");
      newBtn.forEach(btn => {
        btn.addEventListener("click", filterNewsFeatured);
      });

      function filterNewsFeatured() {
        // Fiks en remove class sånn som på products?

        if (this.nextElementSibling) {
          this.classList.add("active-filter");
          this.nextElementSibling.classList.remove("active-filter");
        }

        if (!this.nextElementSibling) {
          this.classList.add("active-filter");
          this.previousElementSibling.classList.remove("active-filter");
        }

        if (this.value === "New") {
          const newProducts = productsAPI.filter(product => product.volume === "Small");
          createHtml(newProducts);
        }

        if (this.value === "Featured") {
          const featuredProducts = productsAPI.filter(product => (product.featured ? true : false));
          createHtml(featuredProducts);
        }
      }
    });
})();
