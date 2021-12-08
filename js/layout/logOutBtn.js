import { clearKey } from "../settings/storage.js";
import { tokenKey, userKey } from "../settings/keys.js";
import modalHtml, { getButton } from "../common/modal.js";

modalHtml();

export default function logOutBtn() {
  const clearToken = () => {
    clearKey(userKey);
    clearKey(tokenKey);
    location.href = "/";
  };

  const logoutbtn = document.querySelector(".logout");
  logoutbtn.setAttribute("data-modal", "Sure you want to sign out?");
  logoutbtn.setAttribute("data-bs-toggle", "modal");
  logoutbtn.setAttribute("data-bs-target", "#infoModal");
  logoutbtn.setAttribute("data-title-modal", "Sign out");
  logoutbtn.setAttribute("data-function", `${clearToken}`);

  // const clearToken = () => {
  //   clearKey(userKey);
  //   clearKey(tokenKey);
  //   location.href = "/";
  // };

  if (logoutbtn) {
    let myModal = document.getElementById("infoModal");
    myModal.addEventListener("show.bs.modal", (e) => {
      getButton(e);
      // let confirmBtn = document.querySelector(".confirmBtn");
      // console.log(confirmBtn);
      // // confirmBtn.addEventListener("click", (e) => {
      // //   e.preventDefault();
      // //   // myModal.hide();
      // //   action();
      // // });
    });
  }
}

// function clearToken() {
//   clearKey(userKey);
//   clearKey(tokenKey);
//   location.href = "/";
// }

// let button = e.relatedTarget;
// let newBodytext = button.getAttribute("data-modal");
// let newTitle = button.getAttribute("data-title-modal");
// // Update the modal's content.
// let modalTitle = myModal.querySelector(".modal-title");
// let modalBody = myModal.querySelector(".modal-body");
// modalTitle.innerHTML = newTitle;
// modalBody.innerHTML = `<b>${newBodytext}</b>`;

// let button = e.relatedTarget;
// let newBodytext = button.getAttribute("data-modal");
// let newTitle = button.getAttribute("data-title-modal");
// let modalTitle = myModal.querySelector(".modal-title");
// let modalBody = myModal.querySelector(".modal-body");

// // Update the modal's content.

// modalTitle.innerHTML = newTitle;
// modalBody.innerHTML = `<b>${newBodytext}</b>`;

// function clearToken() {
//   clearKey(userKey);
//   clearKey(tokenKey);
//   location.href = "/";
// }

// if (logoutbtn) {
//   logoutbtn.onclick = (e) => {
//     modal(
//       "You are about to log out from Milky-admin. <br> Please confirm.",
//       "Logout",
//       "logout",
//       "Logout",
//       clearToken
//     );
//   };
// }
