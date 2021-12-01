import toggleSidebar from "../layout/nav.js";
import checkValidation from "../components/checkValidation.js";
import displayMessage from "../components/displayMessage.js";
import { messages } from "../components/messages.js";
import { loginForm, emailInput, passwordInput } from "../components/elements.js";
import { submitLogin } from "../forms/submitLogin.js";

toggleSidebar();

function validateEmail(email) {
  const regEx =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const patternMatches = regEx.test(email);
  return patternMatches;
}

function validatePassword(password) {
  const regEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
  const patternMatches = regEx.test(password);
  return patternMatches;
}

loginForm.addEventListener("submit", submitForm);

// fiks sånn at det må tall i passordet
// fiks også at den blir disablet mens man venter

function submitForm(event) {
  event.preventDefault();

  // rydd opp i username/email navnrot

  const username = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (checkValidation(username.length, 3) || checkValidation(password.length, 3)) {
    return displayMessage("error", messages.not_valid, ".message-container");
  }
  submitLogin(username, password);
}

// ikke sikker på om jeg skal bruke lengden for å validere her

// loginForm.addEventListener("submit", submitForm);
// const loginInputs = document.querySelectorAll(".login-input");
// const errorLogin = document.querySelector(".login-error-username");
// const errorPassword = document.querySelector(".login-error-password");

// const username = emailInput.value.trim();
// const password = passwordInput.value.trim();

// loginInputs.forEach((input) => {
//   input.addEventListener("focusin", (event) => {
//     //
//     if (event.target.type === "email") {
//       event.target.addEventListener("blur", () => {
//         console.log(username);
//         if (validateEmail(emailInput)) {
//           console.log(emailInput);
//           console.log(username);
//           errorLogin.innerText = "";
//         } else {
//           console.log("username");
//           errorLogin.innerText = "Please insert a valid email";
//         }
//       });
//     }
//     //
//     if (event.target.type === "password") {
//       event.target.addEventListener("blur", () => {
//         console.log(password);
//         if (validatePassword(password)) {
//           console.log(password);
//           errorPassword.innerText = "";
//         } else if (!validatePassword(password)) {
//           console.log("password");
//           errorPassword.innerText =
//             "Over 6 characters which contain at least one numeric digit, one uppercase and one lowercase letter";
//         }
//       });
//     }
//   });
// });
