import { clearKey } from "../settings/storage.js";
import { tokenKey, userKey } from "../settings/keys.js";
import modal from "../common/modal.js";

export default function logOutBtn() {
  const logoutbtn = document.querySelector(".logout");
  if (logoutbtn) {
    logoutbtn.onclick = () => {
      modal("Sure you want to log out?", "Logout", "logout", clearToken);
    };
  }
}

function clearToken() {
  clearKey(userKey);
  clearKey(tokenKey);
  location.href = "/";
}
