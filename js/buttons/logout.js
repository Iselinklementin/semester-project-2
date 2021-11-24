// import { clearKey } from "../settings/storage.js";
// import { tokenKey, userKey } from "../settings/keys.js";
// import { messages } from "../components/messages.js";

// export default function logoutButton() {
//   const logoutBtn = document.querySelector(".logout");
//   if (logoutBtn) {
//     logoutBtn.onclick = () => {
//       const logout = confirm(messages.log_out);

//       // only logout user and token, not favourites-list
//       if (logout) {
//         clearKey(userKey);
//         clearKey(tokenKey);
//         location.href = "/";
//       }
//     };
//   }
// }
