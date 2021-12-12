import toggleSidebar from "../layout/nav.js";
import { loginForm, emailInput, passwordInput } from "../components/elements.js";
import { submitLogin } from "../forms/submitLogin.js";
import { changeCartIcon } from "../common/changeCartIcon.js";
import { validateLoginForm } from "../forms/validateLoginForm.js";
import { fillNavHeart } from "../common/fillNavHeart.js";

toggleSidebar();
fillNavHeart();
changeCartIcon();

loginForm.addEventListener("submit", submitForm);
loginForm.addEventListener("focusin", validateLoginForm);

function submitForm(event) {
  event.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  validateLoginForm();
  submitLogin(email, password);
}
