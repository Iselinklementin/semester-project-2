import toggleSidebar from "../layout/nav.js";
import { submitProduct } from "../forms/submit/submitProduct.js";
import { submitBtn } from "../components/elements.js";
import { validateForm } from "../forms/validate/validateForm.js";
import { imageUploader } from "../components/imageUploader.js";
import { fillNavHeart } from "../layout/fillNavHeart.js";
import { changeCartIcon } from "../layout/changeCartIcon.js";
import { missingToken } from "../components/missingToken.js";

missingToken();
toggleSidebar();
imageUploader();
validateForm();
fillNavHeart();
changeCartIcon();

submitBtn.addEventListener("click", submitProduct);
