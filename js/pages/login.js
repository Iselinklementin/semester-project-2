import toggleSidebar from "../layout/nav.js";
import checkValidation from "../components/checkValidation.js";
import displayMessage from "../components/displayMessage.js";
import { messages } from "../components/messages.js";
import { loginForm, emailInput, passwordInput } from "../components/elements.js";
import { submitLogin } from "../forms/submitLogin.js";

toggleSidebar();

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

// import {
//   loginForm,
//   username,
//   password,
//   messageContainer,
// } from "../../global/components/elements.js";
// import checkValidation from "../../global/components/checkValidation.js";
// import displayMessage from "../../global/components/displayMessage.js";
// import { submitLogin } from "../loginForm/submitLogin.js";
// import createMenu from "../../global/menu/createMenu.js";
// import { messages } from "../../global/components/messages.js";
// import { classes } from "../../global/components/classes.js";

// createMenu();

// loginForm.addEventListener("submit", submitForm);

// function submitForm(event) {
//   event.preventDefault();

//   const usernameValue = username.value.trim();
//   const passwordValue = password.value.trim();

//   if (checkValidation(usernameValue.length, 3) || checkValidation(passwordValue.length, 3)) {
//     return displayMessage(classes.error, messages.not_valid, messageContainer);
//   }
//   submitLogin(usernameValue, passwordValue);
//   loginForm.reset();
// }
