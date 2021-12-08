import { clearKey } from "../settings/storage.js";
import { tokenKey, userKey } from "../settings/keys.js";
// import modalHtml from "../common/modal.js";
import { modal, modalHeader, closeBtn, confirmBtn } from "../components/elements.js";

export default function logOutBtn() {
  const logoutbtn = document.querySelector(".logout");

  if (logoutbtn) {
    // modalHtml();
    const openModalSignout = document.querySelector(".modal-btn-signout");

    openModalSignout.onclick = function () {
      // console.log("this worked");
      modal.style.display = "block";
      modalHeader.innerHTML = `<p>Sign out</p>`;
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
