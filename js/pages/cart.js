import { getFromStorage } from "../settings/storage.js";
import { CART_STORAGE_KEY } from "../settings/keys.js";
import { emptyResult } from "../components/emptyResult.js";
import { createProductCards } from "../common/createHtml/createProductCards.js";
import { productsInCart, productContainer, loader } from "../components/elements.js";
import { addQuantityHtml } from "../common/createHtml/addQuantityHtml.js";
import { subtotal } from "../common/handlePrice/subtotal.js";
import { updatePriceCart } from "../common/handlePrice/updatePriceCart.js";
import toggleSidebar from "../layout/nav.js";

const currentItems = getFromStorage(CART_STORAGE_KEY);
productContainer.innerHTML = "";

toggleSidebar();
createProductCards(currentItems);
emptyResult();
addQuantityHtml();
subtotal();
updatePriceCart();

loader.style.display = "none";
productsInCart.innerText = `${currentItems.length} product(s) in cart`;
