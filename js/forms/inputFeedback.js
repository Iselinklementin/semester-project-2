// give feedback on inputs if they are not filled in correct
// used on validationForm

export function inputFeedback(targetElement, message, icon) {
  const container = document.querySelector(targetElement);

  container.innerHTML = `${message}
                        <i class="fas ${icon}"></i>
                        `;

  if (message.length) {
    container.classList.add("error-displayed");
  } else {
    container.classList.remove("error-displayed");
  }
}
