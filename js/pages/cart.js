import { getFromStorage } from "../settings/storage.js";
import { cartKey } from "../settings/keys.js";
import { emptyResult } from "../components/emptyResult.js";
import toggleSidebar from "../layout/nav.js";
import { createHtml } from "../common/createHtml.js";
import { loadingCart } from "../common/loadingHtml.js";
import { productsInCart, productContainer } from "../components/elements.js";
import { addQuantityHtml } from "../common/addQuantityHtml.js";
import { subtotal } from "../common/subtotal.js";

loadingCart();
toggleSidebar();

const currentItems = getFromStorage(cartKey);
productContainer.innerHTML = "";

createHtml(currentItems);
emptyResult();
addQuantityHtml();
subtotal();
updateProductPrice();

productsInCart.innerText = `${currentItems.length} products in cart`;

// Noe buggy med minus. Forsvinner når den kommer til 0, dukker plutselig opp igjen senere
// skift navn

function updateProductPrice() {
  const productPrice = document.querySelectorAll(".card-price");
  const prices = [...productPrice];

  prices.forEach((price) => {
    let findQuantity = price.offsetParent.lastElementChild.firstElementChild.children[1].value;
    let originalPriceString = price.innerText.replace("$ ", "");
    let originalPrice = parseFloat(originalPriceString);
    let currentQuantity = parseFloat(findQuantity);
    let newPrice = originalPrice * currentQuantity;
    price.innerText = `$ ` + newPrice.toFixed(2);
  });
}
