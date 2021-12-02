// Skift navn på dokumentet

export function inputFeedback(targetElement, message, icon) {
  const container = document.querySelector(targetElement);

  container.innerHTML = `${message}
                        <i class="fas ${icon}"></i>
                        `;
}
