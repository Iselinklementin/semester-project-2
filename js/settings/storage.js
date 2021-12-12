import { TOKEN_STORAGE_KEY, USER_STORAGE_KEY } from "./keys.js";
export const token = getToken();
export const user = getUsername();

export function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getFromStorage(key) {
  const value = localStorage.getItem(key);
  if (!value) {
    return [];
  }
  return JSON.parse(value);
}

export function clearKey(key) {
  localStorage.removeItem(key);
}

export function saveToken(token) {
  saveToStorage(TOKEN_STORAGE_KEY, token);
}

export function getToken() {
  return getFromStorage(TOKEN_STORAGE_KEY);
}

export function saveUser(user) {
  saveToStorage(USER_STORAGE_KEY, user);
}

export function getUsername() {
  const user = getFromStorage(USER_STORAGE_KEY);

  if (user) {
    return user.username;
  }
  return null;
}
