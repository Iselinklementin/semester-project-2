import { validateEmail, validatePassword } from "../../components/checkValidation.js";
import { loginBtn, errorLogin, errorPassword, emailInput, passwordInput } from "../../components/elements.js";
import { MESSAGES } from "../../components/messages.js";

export function validateLoginForm() {
  loginBtn.disabled = false;

  emailInput.addEventListener("blur", () => {
    if (validateEmail(emailInput.value.trim())) {
      errorLogin.innerHTML = ``;
      errorLogin.nextElementSibling.classList = "fas fa-check-circle";
    } else {
      errorLogin.innerHTML = `<p>${MESSAGES.valid_email}</p>`;
      errorLogin.nextElementSibling.classList = "fas fa-exclamation-circle";
      loginBtn.disabled = true;
    }
  });

  passwordInput.addEventListener("blur", () => {
    if (validatePassword(passwordInput.value.trim())) {
      errorPassword.innerHTML = ``;
      errorPassword.nextElementSibling.classList = "fas fa-check-circle";
    } else {
      errorPassword.innerHTML = `<p>${MESSAGES.valid_password}</p>`;
      errorPassword.nextElementSibling.classList = "fas fa-exclamation-circle";
      loginBtn.disabled = true;
    }
  });
}
