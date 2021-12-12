import { getFromStorage } from "../settings/storage.js";
import { CART_STORAGE_KEY } from "../settings/keys.js";
import { emptyResult } from "../components/emptyResult.js";
import { createHtml } from "../common/createHtml.js";
import { productsInCart, productContainer, loader } from "../components/elements.js";
import { addQuantityHtml } from "../common/addQuantityHtml.js";
import { subtotal } from "../common/subtotal.js";
import { updateProductPrice } from "../common/updateProductPrice.js";
import toggleSidebar from "../layout/nav.js";

const currentItems = getFromStorage(CART_STORAGE_KEY);
productContainer.innerHTML = "";

toggleSidebar();
createHtml(currentItems);
emptyResult();
addQuantityHtml();
subtotal();
updateProductPrice();

loader.style.display = "none";
productsInCart.innerText = `${currentItems.length} product(s) in cart`;
