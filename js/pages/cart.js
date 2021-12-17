import { getFromStorage } from "../settings/storage.js";
import { CART_STORAGE_KEY } from "../settings/keys.js";
import { emptyResult } from "../components/emptyResult.js";
import { createProductCards } from "../common/createHtml/createProductCards.js";
import { productContainer, loader } from "../components/elements.js";
import { addQuantityHtml } from "../common/createHtml/addQuantityHtml.js";
import { subtotal } from "../common/handlePrice/subtotal.js";
import toggleSidebar from "../layout/nav.js";
import { setCartPrices } from "../common/handlePrice/setCartPrices.js";

const currentItems = getFromStorage(CART_STORAGE_KEY);
productContainer.innerHTML = "";

toggleSidebar();
createProductCards(currentItems);
emptyResult();
addQuantityHtml();
subtotal();

currentItems.forEach((product) => {
  setCartPrices(product.id, product);
});

loader.style.display = "none";
