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
