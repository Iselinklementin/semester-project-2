import { getFromStorage } from "../settings/storage.js";
import { cartKey } from "../settings/keys.js";
import { emptyResult } from "../components/emptyResult.js";
import { createHtml } from "../common/createHtml.js";
import { loadingCart } from "../common/loadingHtml.js";
import { productsInCart, productContainer } from "../components/elements.js";
import { addQuantityHtml } from "../common/addQuantityHtml.js";
import { subtotal } from "../common/subtotal.js";
import { updateProductPrice } from "../common/updateProductPrice.js";
import toggleSidebar from "../layout/nav.js";

const currentItems = getFromStorage(cartKey);
productContainer.innerHTML = "";
loadingCart();
toggleSidebar();
createHtml(currentItems);
emptyResult();
addQuantityHtml();
subtotal();
updateProductPrice();

productsInCart.innerText = `${currentItems.length} products in cart`;
