import { createProductCards } from "../common/createHtml/createProductCards.js";
import { emptyResult } from "../components/emptyResult.js";
import { FAV_STORAGE_KEY } from "../settings/keys.js";
import { clearKey } from "../settings/storage.js";
import { clearBtn } from "../components/elements.js";
import { modal, confirmBtn } from "../components/elements.js";
import { closeModal } from "../common/modal/closeModal.js";
import { openModal } from "../common/modal/openModal.js";
import { MESSAGES } from "../components/messages.js";

export default function clearAll() {
  clearBtn.addEventListener("click", clearAll);

  function clearAll() {
    // ask if they want to clear all favourites
    openModal(MESSAGES.clear, MESSAGES.clearing_all);

    // if its confirmed - clear all
    confirmBtn.addEventListener("click", () => {
      modal.style.display = "none";
      clearKey(FAV_STORAGE_KEY);
      createProductCards([]);
      emptyResult();
    });
  }

  closeModal();
}
