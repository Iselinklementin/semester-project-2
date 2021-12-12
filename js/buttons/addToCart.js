import { getFromStorage, saveToStorage } from "../settings/storage.js";
import { cartKey } from "../settings/keys.js";
import { changeCartIcon } from "../common/changeCartIcon.js";
import { modal, modalHeader, closeBtn, confirmBtn, modalBody } from "../components/elements.js";
import { closeModal } from "../common/closeModal.js";

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

  const cartItems = getFromStorage(cartKey);
  const productExists = cartItems.find((product) => product.id === id);

  if (productExists) {
    if (count <= 1) {
      productExists.quantity++;
    }
    if (count >= 2) {
      productExists.quantity = parseFloat(productExists.quantity) + parseFloat(count);
    }
    saveToStorage(cartKey, cartItems);
  } else {
    const product = { id, title, price, volume, image_url, description, quantity: count };
    cartItems.push(product);
    saveToStorage(cartKey, cartItems);
  }

  inputQuantity.value = 1;
  changeCartIcon();

  modal.style.display = "block";
  modalHeader.innerHTML = `<h2>Added to cart!</h2>`;
  modalBody.innerHTML = `<p>${title} is added to cart!</p>`;
  // modal buttons
  closeBtn.innerText = `Got it`;
  confirmBtn.innerText = `Go to cart`;

  confirmBtn.addEventListener("click", () => {
    modal.style.display = "none";
    location.href = "cart.html";
  });
}

closeModal();
