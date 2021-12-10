import toggleSidebar from "../layout/nav.js";
import { submitProduct } from "../forms/submitProduct.js";
import { addBtn } from "../components/elements.js";
import { validateAddForm } from "../forms/validateAddForm.js";
import { imageUploader } from "../common/imageUploader.js";
import { fillNavHeart } from "../common/fillNavHeart.js";
import { changeCartIcon } from "../common/changeCartIcon.js";
import { missingToken } from "../components/missingToken.js";

// det må stå at den første description må være kort

missingToken();
toggleSidebar();
imageUploader();
validateAddForm();
fillNavHeart();
changeCartIcon();

addBtn.addEventListener("click", submitProduct);
