import displayMessage from "../components/displayMessage.js";
import { contentType, loginUrl } from "../settings/constant.js";
import { saveToken, saveUser } from "../settings/storage.js";
import { MESSAGES } from "../components/messages.js";
import { emailInput, passwordInput, loginBtn } from "../components/elements.js";

export async function submitLogin(username, password) {
  const data = JSON.stringify({ identifier: username, password: password });

  const options = {
    method: "POST",
    body: data,
    headers: contentType,
  };

  try {
    emailInput.disabled = true;
    passwordInput.disabled = true;
    loginBtn.innerText = "Signing in...";
    const response = await fetch(loginUrl, options);
    const json = await response.json();

    if (json.user) {
      saveToken(json.jwt);
      saveUser(json.user);
      location.href = "/";
    }

    if (json.error) {
      displayMessage("error", MESSAGES.incorrect, ".message-container");
    }
  } catch (error) {
    console.log(error);
    displayMessage("error", MESSAGES.server_error, ".message-container");
  } finally {
    emailInput.disabled = false;
    passwordInput.disabled = false;
    loginBtn.innerText = "Sign in";
  }
}
