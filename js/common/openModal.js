import { modal, modalHeader, modalBody } from "../components/elements.js";

export function openModal(header, body) {
  modal.style.display = "block";
  modalHeader.innerHTML = `<h2>${header}</h2>`;
  modalBody.innerHTML = `<p>${body}</p>`;
}
