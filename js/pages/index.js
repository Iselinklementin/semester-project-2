import toggleSidebar from "../layout/nav.js";
import { PRODUCT_URL, homeUrl } from "../settings/api.js";
import { createHtml } from "../common/createHtml.js";
import { loadingHtml } from "../common/skeletonLoading.js";
import { herobanner, productContainer, filterBtns } from "../components/elements.js";

toggleSidebar();
loadingHtml();

// husk try fetch finally og autocall

(function callApi() {
  let fetchBanner = fetch(homeUrl);
  let fetchProducts = fetch(PRODUCT_URL);

  Promise.all([fetchBanner, fetchProducts])
    .then((values) => Promise.all(values.map((value) => value.json())))
    .then((finalValues) => {
      const home = finalValues[0];
      const products = finalValues[1];

      herobanner.src = home.hero_banner.url;

      const featuredProducts = products.filter((product) => (product.featured ? true : false));
      productContainer.innerHTML = "";
      createHtml(featuredProducts);

      filterBtns.forEach((btn) => {
        btn.addEventListener("click", filterNewsFeatured);
      });

      function filterNewsFeatured() {
        if (this.nextElementSibling) {
          this.classList.add("active-filter");
          this.nextElementSibling.classList.remove("active-filter");
        }

        if (!this.nextElementSibling) {
          this.classList.add("active-filter");
          this.previousElementSibling.classList.remove("active-filter");
        }

        if (this.value === "New") {
          const newProducts = products.filter((product) => product.volume === "Small");
          createHtml(newProducts);
        }

        if (this.value === "Featured") {
          const featuredProducts = products.filter((product) => (product.featured ? true : false));
          createHtml(featuredProducts);
        }
      }
    });
})();
