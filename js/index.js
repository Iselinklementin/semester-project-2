import toggleSidebar from "./layout/nav.js";
toggleSidebar();

const featuredProducts = document.querySelector(".featured-products-container");

(async function getProducts() {
  const response = await fetch("https://iselin-sp2-api.herokuapp.com/products");
  const result = await response.json();
  console.log(result);

  result.forEach(product => {
    const productImages = product.image;

    if (product.featured) {
      productImages.forEach(img => {
        featuredProducts.innerHTML += `<a href="#" class="col"> 
                                      <div class="card">
                                      <img src="${img.url}" class="card-img-top" alt="..." />
                                      </div>

                                      <div class="featured-main-info">
                                      <h2 class="card-title">${product.title}</h2>
                                      <p class="card-price">${product.price} $</p>
                                      </div>
                                      <p class="card-text">${product.description}</p>
                                      
                                      </a> `;
      });
    }
  });
})();

// const featured = document.querySelector(".featured-container-test");

// (async function getStrapi() {
//   const response = await fetch("https://iselin-sp2-api.herokuapp.com/products");
//   const result = await response.json();
//   console.log(result);

//   result.forEach(product => {
//     const images = product.image;
//     console.log(product);

//     if (product.featured) {
//       images.forEach(img => {
//         featured.innerHTML += `<div class="container border">
//                             <h1>${product.title}</h1>
//                             <p>${product.description}</p>
//                             <b>${product.price} $</b>
//                             <img src="${img.url}" class="" style="width:10rem; "alt="..." />
//                             </div>`;
//       });
//     }
//   });
// })();
