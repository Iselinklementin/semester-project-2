import { createHtml } from "../common/createHtml.js";
// import modal from "../common/modal.js";
import { emptyResult } from "../components/emptyResult.js";
import { FAV_STORAGE_KEY } from "../settings/keys.js";
import { clearKey } from "../settings/storage.js";
import { clearBtn } from "../components/elements.js";
import { modal, modalHeader, confirmBtn, modalBody } from "../components/elements.js";
import { closeModal } from "../common/closeModal.js";

export default function clearAll() {
  clearBtn.addEventListener("click", clearAll);

  function clearAll() {
    //modal
    modal.style.display = "block";
    modalHeader.innerHTML = `<p>Clear all favorites</p>`;
    modalBody.innerHTML = `<p>Are you sure you want to delete all of your favorite products?</p>`;
    confirmBtn.addEventListener("click", () => {
      modal.style.display = "none";
      clearKey(FAV_STORAGE_KEY);
      createHtml([]);
      emptyResult();
    });
  }

  closeModal();
}
