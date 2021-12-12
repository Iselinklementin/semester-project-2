import toggleSidebar from "../layout/nav.js";
import { loginForm, emailInput, passwordInput } from "../components/elements.js";
import { submitLogin } from "../forms/submit/submitLogin.js";
import { changeCartIcon } from "../layout/changeCartIcon.js";
import { validateLoginForm } from "../forms/validate/validateLoginForm.js";
import { fillNavHeart } from "../layout/fillNavHeart.js";

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
