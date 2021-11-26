import toggleSidebar from "./layout/nav.js";
import { productsUrl, homeUrl } from "./settings/api.js";
toggleSidebar();

const featuredProducts = document.querySelector(".featured-products-container");
const herobanner = document.querySelector(".hero-banner");

// husk try fetch finally

function callApi() {
  let fetchBanner = fetch(homeUrl);
  let fetchProducts = fetch(productsUrl);

  Promise.all([fetchBanner, fetchProducts])
    .then((values) => Promise.all(values.map((value) => value.json())))
    .then((finalValues) => {
      let homeAPI = finalValues[0];
      let productsAPI = finalValues[1];

      console.log(productsAPI);

      herobanner.src = `${homeAPI.hero_banner.url}`;

      productsAPI.forEach((product) => {
        if (product.featured) {
          featuredProducts.innerHTML += `<a href="detail.html?id=${product.id}" class="col">
                                          <div class="card">
                                            <img src="${product.image_url}" class="card-img-top" alt="..." />
                                          </div>

                                            <div class="featured-main-info">
                                              <div class="featured-main-info__heading">
                                                <h2 class="card-title">${product.title}</h2>
                                                <p class="card-price">${product.price}$</p>
                                              </div>
                                            <p class="card-text">${product.description}</p>
                                          </div>
                                        </a> `;
        }
      });
    });
}

callApi();

// callApi()(async function fetchBanner() {
//   const response = await fetch(homeUrl);
//   const result = await response.json();
//   herobanner.src = `${result.hero_banner.url}`;
// })();

// (async function fetchProducts() {
//   const response = await fetch(productsUrl);
//   const result = await response.json();
//   console.log(result);

//   result.forEach((product) => {
//     const productImages = product.image;

//     if (product.featured) {
//       productImages.forEach((img) => {
//         featuredProducts.innerHTML += `<a href="#" class="col">
//                                       <div class="card">
//                                       <img src="${img.url}" class="card-img-top" alt="..." />
//                                       </div>

//                                       <div class="featured-main-info">
//                                       <h2 class="card-title">${product.title}</h2>
//                                       <p class="card-price">${product.price}$</p>

//                                       <p class="card-text">${product.description}</p>
//                                       </div>

//                                       </a> `;
//       });
//     }
//   });
// })();
