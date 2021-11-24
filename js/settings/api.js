// import { token, getFromStorage } from "./storage.js";
// import { favKey } from "./keys.js";

import { token } from "./storage.js";

export const baseUrl = "https://iselin-sp2-api.herokuapp.com/";
export const loginUrl = baseUrl + "auth/local";
export const productsUrl = baseUrl + "products";
export const homeUrl = baseUrl + "home";

export const authorization = {
  Authorization: `Bearer ${token}`,
};

export const contentType = {
  "Content-type": "application/json",
};

export const contentTypeAuth = {
  "Content-type": "application/json",
  Authorization: `Bearer ${token}`,
};
