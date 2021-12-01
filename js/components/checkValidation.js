// length val

export default function checkValidation(value, len) {
  if (value < len) {
    return true;
  }
}

// export default function validateLoginForm() {
// 	const usernameError = elements.username.nextElementSibling.nextElementSibling;
// 	const passwordError = elements.password.nextElementSibling.nextElementSibling;

// 	let validationPassed = true;

// 	if (elements.username.value.trim().length === 0) {
// 		usernameError.innerText = "Please enter your username";
// 		validationPassed = false;
// 	} else {
// 		usernameError.innerText = "";
// 	}

// 	if (elements.password.value.trim().length === 0) {
// 		passwordError.innerText = "Please enter your password";
// 		validationPassed = false;
// 	} else {
// 		passwordError.innerText = "";
// 	}
// 	return validationPassed;
// }
