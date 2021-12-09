import toggleSidebar from "../layout/nav.js";
import { submitProduct } from "../forms/submitProduct.js";
import { addBtn } from "../components/elements.js";
import { validateAddForm } from "../forms/validateAddForm.js";
import { imageUploader } from "../common/imageUploader.js";

toggleSidebar();
imageUploader();
validateAddForm();

addBtn.addEventListener("click", submitProduct);
