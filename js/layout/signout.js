import { clearKey } from "../settings/storage.js";
import { TOKEN_STORAGE_KEY, USER_STORAGE_KEY } from "../settings/keys.js";
import { modal, modalHeader, confirmBtn, modalBody } from "../components/elements.js";
import { closeModal } from "../common/closeModal.js";

export default function signout() {
  const logoutbtn = document.querySelector(".logout");

  if (logoutbtn) {
    const openModalSignout = document.querySelector(".modal-btn-signout");

    openModalSignout.onclick = function () {
      const modalButton = document.querySelector("#modal-btn-ok");
      modal.style.display = "block";
      modalHeader.innerHTML = `<h2>Sign out</h2>`;
      modalBody.innerHTML = `<p>You are about to sign out of Milky admin. Please confirm.</p>`;
      modalButton.innerText = `Sign out`;
      confirmBtn.addEventListener("click", () => {
        clearKey(USER_STORAGE_KEY);
        clearKey(TOKEN_STORAGE_KEY);
        location.href = "/";
      });
    };

    closeModal();
  }
}
