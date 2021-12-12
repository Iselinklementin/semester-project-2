import { TOKEN_STORAGE } from "../settings/storage.js";

// check if user is signed in
export const signedIn = !TOKEN_STORAGE.length ? true : false;

// redirect when not signed in
export function missingToken() {
  if (signedIn) {
    location.href = "/";
  }
}
