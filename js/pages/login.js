import toggleSidebar from "../layout/nav.js";
import checkValidation from "../components/checkValidation.js";
import displayMessage from "../components/displayMessage.js";
import { messages } from "../components/messages.js";
import { loginForm, emailInput, passwordInput, loginBtn } from "../components/elements.js";
import { submitLogin } from "../forms/submitLogin.js";
import { fillNavHeart } from "../common/createHtml.js";

const errorLogin = document.querySelector(".login-error-username");
const errorPassword = document.querySelector(".login-error-password");

toggleSidebar();
fillNavHeart();

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

  validateForm();

  const username = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (checkValidation(username.length, 1) || checkValidation(password.length, 1)) {
    return displayMessage("error", messages.not_valid, ".message-container");
  }
  submitLogin(username, password);
}

loginForm.addEventListener("focusin", validateForm);

function validateForm() {
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
      errorPassword.innerHTML = `<p>Please at least one numeric digit, one uppercase and one lowercase letter</p>`;
      errorPassword.nextElementSibling.classList = "fas fa-exclamation-circle";
      loginBtn.disabled = true;
    }
  });
}

// vurder validateJs
