import { signedIn } from "../components/missingToken.js";

// if the user is signed in, add edit-icons on the products

export function editIcon() {
  if (signedIn) {
    const editIcons = document.querySelectorAll(".fa-edit");
    editIcons.forEach((icon) => {
      icon.style.display = "none";
    });
  }
}
