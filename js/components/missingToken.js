import { token } from "../settings/storage.js";

// check if user is signed in
export const signedIn = !token.length ? true : false;

// redirect when not signed in
export function missingToken() {
  if (signedIn) {
    location.href = "/";
  }
}
