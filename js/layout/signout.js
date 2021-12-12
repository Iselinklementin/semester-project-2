import { clearKey } from "../settings/storage.js";
import { TOKEN_STORAGE_KEY, USER_STORAGE_KEY } from "../settings/keys.js";
import { closeBtn, confirmBtn } from "../components/elements.js";
import { closeModal } from "../common/closeModal.js";
import { openModal } from "../common/openModal.js";
import { MESSAGES } from "../components/messages.js";

export default function signout() {
  const logoutbtn = document.querySelector(".logout");

  if (logoutbtn) {
    const openModalSignout = document.querySelector(".modal-btn-signout");

    openModalSignout.onclick = function () {
      openModal(MESSAGES.sign_out, MESSAGES.sign_out_confirm);
      closeBtn.innerText = "Close";
      confirmBtn.innerText = "Sign out";
      confirmBtn.addEventListener("click", () => {
        clearKey(USER_STORAGE_KEY);
        clearKey(TOKEN_STORAGE_KEY);
        location.href = "/";
      });
    };

    closeModal();
  }
}
