import toggleSidebar from "./layout/nav.js";
import { productsUrl, homeUrl } from "./settings/constant.js";
import { createHtml } from "./common/createHtml.js";

toggleSidebar();

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

      herobanner.src = `${homeAPI.hero_banner.url}`;

      const featuredProducts = productsAPI.filter(product => (product.featured ? true : false));
      createHtml(featuredProducts);

      const newBtn = document.querySelectorAll(".filter-btn");
      newBtn.forEach(btn => {
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

// A search text box. When searching (filtering),
// only the products that include the searched text in their title or
// description should be listed.

// index search
// function searchProducts(products) {
//   const search = document.querySelectorAll(".search");

//   search.forEach(input => {
//     input.onkeyup = event => {
//       const searchValue = event.target.value.trim();

//       console.log(searchValue);

//       const newProducts = products.filter(product => product.volume === "Small");
//       const featuredProducts = products.filter(product => (product.featured ? true : false));

//       const availableProductSearch = newProducts.concat(featuredProducts);

//       const filteredProducts = availableProductSearch.filter(item => {
//         // console.log(item.title.toLowerCase().includes(searchValue));
//         // console.log(item.description.toLowerCase().includes(searchValue));
//         if (
//           item.title.toLowerCase().includes(searchValue) ||
//           item.description.toLowerCase().includes(searchValue)
//         ) {
//           return true;
//         }

//         if (!searchValue) {
//           console.log("this");
//         }
//       });

//       // console.log(availableProductSearch);
//       // });

//       console.log(filteredProducts);
//       createHtml(filteredProducts);
//       // emptyResult();
//     };
//   });
// }
