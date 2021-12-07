import { clearKey } from "../settings/storage.js";
import { tokenKey, userKey } from "../settings/keys.js";
import modal from "../common/modal.js";

export default function logOutBtn() {
  const logoutbtn = document.querySelector(".logout");
  logoutbtn.setAttribute("data-modal", "out");

  if (logoutbtn) {
    logoutbtn.onclick = () => {
      modal(
        "You are about to log out from Milky-admin. <br> Please confirm.",
        "Logout",
        "logout",
        "Logout",
        clearToken
      );
    };
  }
}

function clearToken() {
  clearKey(userKey);
  clearKey(tokenKey);
  location.href = "/";
}
