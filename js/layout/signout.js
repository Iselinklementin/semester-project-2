import { clearKey } from "../settings/storage.js";
import { tokenKey, userKey } from "../settings/keys.js";
import { modal, modalHeader, closeBtn, confirmBtn, modalBody } from "../components/elements.js";

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
