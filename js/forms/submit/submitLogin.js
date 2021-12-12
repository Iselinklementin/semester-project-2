import displayMessage from "../../components/displayMessage.js";
import { JSON_CONTENT_TYPE, LOGIN_URL, POST } from "../../settings/api.js";
import { saveToken, saveUser } from "../../settings/storage.js";
import { MESSAGES } from "../../components/messages.js";
import { emailInput, passwordInput, loginBtn } from "../../components/elements.js";
import { ERROR, STATUS_ELEMENT } from "../../components/misc.js";

export async function submitLogin(username, password) {
  const data = JSON.stringify({ identifier: username, password: password });

  const options = {
    method: POST,
    body: data,
    headers: JSON_CONTENT_TYPE,
  };

  try {
    emailInput.disabled = true;
    passwordInput.disabled = true;
    loginBtn.innerText = MESSAGES.signing_in;
    const response = await fetch(LOGIN_URL, options);
    const json = await response.json();

    if (json.user) {
      saveToken(json.jwt);
      saveUser(json.user);
      location.href = "/";
    }

    if (json.error) {
      displayMessage(ERROR, MESSAGES.incorrect, STATUS_ELEMENT);
    }
  } catch (error) {
    console.log(error);
    displayMessage(ERROR, MESSAGES.server_error, STATUS_ELEMENT);
  } finally {
    emailInput.disabled = false;
    passwordInput.disabled = false;
    loginBtn.innerText = "Sign in";
  }
}
