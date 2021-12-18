import { getFromStorage, saveToStorage } from "../settings/storage.js";
import { CART_STORAGE_KEY } from "../settings/keys.js";
import { changeCartIcon } from "../layout/changeCartIcon.js";
import { modal, closeBtn, confirmBtn } from "../components/elements.js";
import { closeModal } from "../common/modal/closeModal.js";
import { openModal } from "../common/modal/openModal.js";
import { MESSAGES } from "../components/messages.js";

// Adding product to cart

export function addToCart() {
  const id = this.dataset.id;
  const title = this.dataset.title;
  const price = this.dataset.price;
  const volume = this.dataset.volume;
  const image_url = this.dataset.image_url;
  const description = this.dataset.description;
  const inputQuantity = document.querySelector(".input-quantity");

  // Use the input-quantity to see how many products they want
  let count = inputQuantity.value;
  const cartItems = getFromStorage(CART_STORAGE_KEY);
  const productExists = cartItems.find((product) => product.id === id);

  if (productExists) {
    if (count <= 1) {
      // If the product already is in cart and input quantity is 1, just add one extra
      productExists.quantity++;
    }
    if (count >= 2) {
      // If the product already is in cart and input quantity is 2 or more,
      // add them up with the existing quantity
      productExists.quantity = parseFloat(productExists.quantity) + parseFloat(count);
    }

    // Give feedback that the product is added, and how many are in cart.
    openModal(MESSAGES.added, `${count} of ${title} is added! You now have ${productExists.quantity} in cart.`);
    closeBtn.innerText = MESSAGES.confirm;
    confirmBtn.innerText = MESSAGES.go_to_cart;
    changeCartIcon();

    confirmBtn.addEventListener("click", () => {
      modal.style.display = "none";
      location.href = "cart.html";
    });

    saveToStorage(CART_STORAGE_KEY, cartItems);
  } else {
    const product = { id, title, price, volume, image_url, description, quantity: count };
    cartItems.push(product);
    saveToStorage(CART_STORAGE_KEY, cartItems);

    // Give feedback that the product is added
    openModal(MESSAGES.added, `${title} is added!`);
    closeBtn.innerText = MESSAGES.confirm;
    confirmBtn.innerText = MESSAGES.go_to_cart;
    changeCartIcon();

    confirmBtn.addEventListener("click", () => {
      modal.style.display = "none";
      location.href = "cart.html";
    });
  }

  // set input back to one
  inputQuantity.value = 1;
  changeCartIcon();
}
closeModal();
