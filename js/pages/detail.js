import toggleSidebar from "../layout/nav.js";
import { productsUrl } from "../settings/api.js";
import { productImage } from "../components/elements.js";
toggleSidebar();

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

(async function fetchProducts() {
  const response = await fetch(productsUrl + "/" + id);
  const result = await response.json();
  console.log(result);

  productImage.src = `${result.image_url}`;

  const productContainer = document.querySelector(".product-container");

  // form?

  productContainer.innerHTML += `<h1>${result.title}</h1>
                                  <div class="buy-container">
                                    <p class="price">${result.price}$</p>
                                    <select class="form-select volume" aria-label="Select volume">
                                      <option selected>Choose volume</option>
                                      <option value="1">250ml</option>
                                      <option value="2">750ml</option>
                                    </select>
                                  
                                    <div class="number">
                                     <span class="minus">-</span>
                                     <input type="text" value="1"/>
                                     <span class="plus">+</span>
                                   </div>
                                  </div`;

  // productName.innerText = `${result.title}`;
})();
