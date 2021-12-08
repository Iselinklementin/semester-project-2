import { clearKey } from "../settings/storage.js";
import { tokenKey, userKey } from "../settings/keys.js";
import { modal, modalHeader, closeBtn, confirmBtn, modalBody } from "../components/elements.js";

export default function logOutBtn() {
  const logoutbtn = document.querySelector(".logout");

  if (logoutbtn) {
    const openModalSignout = document.querySelector(".modal-btn-signout");

    openModalSignout.onclick = function () {
      modal.style.display = "block";
      modalHeader.innerHTML = `<p>Sign out</p>`;
      modalBody.innerHTML = `<p>You are about to sign out of Milky admin. Please confirm.</p>`;
      confirmBtn.addEventListener("click", () => {
        clearKey(userKey);
        clearKey(tokenKey);
        location.href = "/";
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
