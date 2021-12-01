import { signedIn } from "../components/missingToken.js";

export function editIcon() {
  if (signedIn) {
    const editIcons = document.querySelectorAll(".fa-edit");
    editIcons.forEach((icon) => {
      icon.style.display = "none";
    });
  }
}
