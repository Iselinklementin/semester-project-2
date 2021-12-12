import { createHtml } from "../common/createHtml.js";
// import modal from "../common/modal.js";
import { emptyResult } from "../components/emptyResult.js";
import { FAV_STORAGE_KEY } from "../settings/keys.js";
import { clearKey } from "../settings/storage.js";
import { clearBtn } from "../components/elements.js";
import { modal, confirmBtn } from "../components/elements.js";
import { closeModal } from "../common/closeModal.js";
import { openModal } from "../common/openModal.js";
import { MESSAGES } from "../components/messages.js";

export default function clearAll() {
  clearBtn.addEventListener("click", clearAll);

  function clearAll() {
    openModal(MESSAGES.clear, MESSAGES.clearing_all);

    confirmBtn.addEventListener("click", () => {
      modal.style.display = "none";
      clearKey(FAV_STORAGE_KEY);
      createHtml([]);
      emptyResult();
    });
  }

  closeModal();
}
