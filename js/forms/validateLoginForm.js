import { validateEmail, validatePassword } from "../components/checkValidation.js";
import { loginBtn, errorLogin, errorPassword, emailInput, passwordInput } from "../components/elements.js";

export function validateLoginForm() {
  loginBtn.disabled = false;

  emailInput.addEventListener("blur", () => {
    if (validateEmail(emailInput.value.trim())) {
      errorLogin.innerHTML = ``;
      errorLogin.nextElementSibling.classList = "fas fa-check-circle";
    } else {
      errorLogin.innerHTML = `<p>Please insert a valid email</p>`;
      errorLogin.nextElementSibling.classList = "fas fa-exclamation-circle";
      loginBtn.disabled = true;
    }
  });

  passwordInput.addEventListener("blur", () => {
    if (validatePassword(passwordInput.value.trim())) {
      errorPassword.innerHTML = ``;
      errorPassword.nextElementSibling.classList = "fas fa-check-circle";
    } else {
      errorPassword.innerHTML = `<p>Password must contain a numeric digit, upper-/lowercase letter</p>`;
      errorPassword.nextElementSibling.classList = "fas fa-exclamation-circle";
      loginBtn.disabled = true;
    }
  });
}
