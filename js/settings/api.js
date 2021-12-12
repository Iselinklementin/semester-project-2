import { token } from "./storage.js";

export const BASE_URL = "https://iselin-sp2-api.herokuapp.com/";
export const LOGIN_URL = BASE_URL + "auth/local";
export const PRODUCT_URL = BASE_URL + "products/";
export const homeUrl = BASE_URL + "home";

export const PRODUCTPAGE_URL = BASE_URL + "productpage";

export const AUTH_TOKEN = {
  Authorization: `Bearer ${token}`,
};

export const JSON_CONTENT_TYPE = {
  "Content-type": "application/json",
};

export const JSON_CONTENT_TYPE_AUTH = {
  "Content-type": "application/json",
  Authorization: `Bearer ${token}`,
};

export const POST = "POST";
export const DELETE = "DELETE";
