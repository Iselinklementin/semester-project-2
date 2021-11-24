import toggleSidebar from "./layout/nav.js";
import { productsUrl, homeUrl } from "./settings/api.js";
toggleSidebar();

const featuredProducts = document.querySelector(".featured-products-container");
const herobanner = document.querySelector(".hero-banner");

// husk try fetch finally

(async function fetchBanner() {
  const response = await fetch(homeUrl);
  const result = await response.json();
  herobanner.src = `${result.hero_banner.url}`;
})();

(async function fetchProducts() {
  const response = await fetch(productsUrl);
  const result = await response.json();
  console.log(result);

  result.forEach((product) => {
    const productImages = product.image;

    if (product.featured) {
      productImages.forEach((img) => {
        featuredProducts.innerHTML += `<a href="#" class="col"> 
                                      <div class="card">
                                      <img src="${img.url}" class="card-img-top" alt="..." />
                                      </div>

                                      <div class="featured-main-info">
                                      <h2 class="card-title">${product.title}</h2>
                                      <p class="card-price">${product.price}$</p>
                                      
                                      <p class="card-text">${product.description}</p>
                                      </div>
                                      
                                      </a> `;
      });
    }
  });
})();
