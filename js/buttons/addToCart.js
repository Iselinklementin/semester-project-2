import { getFromStorage, saveToStorage } from "../settings/storage.js";
import { CART_STORAGE_KEY } from "../settings/keys.js";
import { changeCartIcon } from "../common/changeCartIcon.js";
import { modal, closeBtn, confirmBtn } from "../components/elements.js";
import { closeModal } from "../common/closeModal.js";
import { openModal } from "../common/openModal.js";
import { MESSAGES } from "../components/messages.js";

export function addToCart() {
  // dette kan vel være en egen funksjon? nevnt mange plasser
  const id = this.dataset.id;
  const title = this.dataset.title;
  const price = this.dataset.price;
  const volume = this.dataset.volume;
  const image_url = this.dataset.image_url;
  const description = this.dataset.description;
  const inputQuantity = document.querySelector(".input-quantity");

  let count = inputQuantity.value;

  const cartItems = getFromStorage(CART_STORAGE_KEY);
  const productExists = cartItems.find((product) => product.id === id);

  if (productExists) {
    if (count <= 1) {
      productExists.quantity++;
    }
    if (count >= 2) {
      productExists.quantity = parseFloat(productExists.quantity) + parseFloat(count);
    }
    saveToStorage(CART_STORAGE_KEY, cartItems);
  } else {
    const product = { id, title, price, volume, image_url, description, quantity: count };
    cartItems.push(product);
    saveToStorage(CART_STORAGE_KEY, cartItems);
  }

  inputQuantity.value = 1;
  changeCartIcon();
  openModal(MESSAGES.added, `${title} is added to cart!`);

  // modal buttons
  closeBtn.innerText = MESSAGES.confirm;
  confirmBtn.innerText = MESSAGES.go_to_cart;

  confirmBtn.addEventListener("click", () => {
    modal.style.display = "none";
    location.href = "cart.html";
  });
}

closeModal();
