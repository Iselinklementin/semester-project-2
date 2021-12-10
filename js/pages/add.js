import toggleSidebar from "../layout/nav.js";
import { submitProduct } from "../forms/submitProduct.js";
import { submitBtn } from "../components/elements.js";
import { validateForm } from "../forms/validateForm.js";
import { imageUploader } from "../common/imageUploader.js";
import { fillNavHeart } from "../common/fillNavHeart.js";
import { changeCartIcon } from "../common/changeCartIcon.js";
import { missingToken } from "../components/missingToken.js";

missingToken();
toggleSidebar();
imageUploader();
validateForm();
fillNavHeart();
changeCartIcon();

submitBtn.addEventListener("click", submitProduct);
