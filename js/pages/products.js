import { createHtml } from "../common/createHtml.js";
import toggleSidebar from "../layout/nav.js";
import { fetchApi } from "../settings/fetchApi.js";

const products = await fetchApi();

toggleSidebar();
createHtml(products);
