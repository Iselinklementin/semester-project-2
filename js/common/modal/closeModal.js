import { closeBtn, modal } from "../../components/elements.js";

export function closeModal() {
  closeBtn.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (e) {
    if (e.target == modal) {
      modal.style.display = "none";
    }
  };
}
