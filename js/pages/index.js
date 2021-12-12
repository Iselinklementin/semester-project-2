import toggleSidebar from "../layout/nav.js";
import { PRODUCT_URL, HOME_URL } from "../settings/api.js";
import { createProductCards } from "../common/createHtml/createProductCards.js";
import { loadingHtml } from "../layout/skeletonLoading.js";
import { herobanner, productContainer, filterBtns } from "../components/elements.js";

toggleSidebar();
loadingHtml();

// husk try fetch finally og autocall

(function callApi() {
  let fetchBanner = fetch(HOME_URL);
  let fetchProducts = fetch(PRODUCT_URL);

  Promise.all([fetchBanner, fetchProducts])
    .then((values) => Promise.all(values.map((value) => value.json())))
    .then((finalValues) => {
      const home = finalValues[0];
      const products = finalValues[1];
      herobanner.src = home.hero_banner.url;

      // if featured, create html
      const featuredProducts = products.filter((product) => (product.featured ? true : false));
      productContainer.innerHTML = "";
      createProductCards(featuredProducts);

      filterBtns.forEach((btn) => {
        btn.addEventListener("click", filterNewsFeatured);
      });

      // filter function

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
          createProductCards(newProducts);
        }

        if (this.value === "Featured") {
          const featuredProducts = products.filter((product) => (product.featured ? true : false));
          createProductCards(featuredProducts);
        }
      }
    })
    .catch((error) => {
      const hero_banner_text = document.querySelector(".hero-banner__text");
      console.error(error.message);
      herobanner.style.height = "100px";
      hero_banner_text.style.top = "20%";
    });
})();
