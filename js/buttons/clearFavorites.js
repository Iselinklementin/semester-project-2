import { createHtml } from "../common/createHtml.js";
// import modal from "../common/modal.js";
import { emptyResult } from "../components/emptyResult.js";
import { favKey } from "../settings/keys.js";
import { clearKey } from "../settings/storage.js";
import { clearBtn } from "../components/elements.js";
import { modal, modalHeader, closeBtn, confirmBtn, modalBody } from "../components/elements.js";

export default function clearAll() {
  clearBtn.addEventListener("click", clearAll);

  function clearAll() {
    // MODAL
    // SE PÅ KODEN SENERE
    // jeg må også trykke to ganger

    const openModal = document.querySelector(".clear");

    openModal.onclick = function () {
      modal.style.display = "block";
      modalHeader.innerHTML = `<p>Clear all favorites</p>`;
      modalBody.innerHTML = `<p>Are you sure you want to delete all of your favorite products?</p>`;
      confirmBtn.addEventListener("click", () => {
        modal.style.display = "none";
        clearKey(favKey);
        createHtml([]);
        emptyResult();
      });
    };

    closeBtn.onclick = function () {
      modal.style.display = "none";
    };

    window.onclick = function (e) {
      if (e.target == modal) {
        modal.style.display = "none";
      }
    };
  }
}

// modal(
//   "Are you sure you want to delete all of your favorite products?",
//   "Clear all favorites",
//   "fav",
//   "Clear all",
//   confirmed
// );
