const main = document.querySelector("main");

// skift classes

export default function modalHtml() {
  main.insertAdjacentHTML(
    "beforeend",

    `<div class="modal fade" id="infoModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title"></h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body"></div>
          <div class="modal-footer">
            <button id="modal-btn-close" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button id="modal-btn-ok" type="button" class="btn btn-primary confirmBtn" > OK </button>
          </div>
        </div>
      </div>
    </div>`
  );
}

export function getButton(e, action) {
  let myModal = document.getElementById("infoModal");
  let button = e.relatedTarget;
  let newBodytext = button.getAttribute("data-modal");
  let newTitle = button.getAttribute("data-title-modal");
  let doThis = button.getAttribute("data-function");
  // Update the modal's content.
  let modalTitle = myModal.querySelector(".modal-title");
  let modalBody = myModal.querySelector(".modal-body");

  modalTitle.innerHTML = newTitle;
  modalBody.innerHTML = `<b>${newBodytext}</b>`;

  let confirmBtn = document.querySelector(".confirmBtn");

  confirmBtn.addEventListener("click", (e) => {
    e.preventDefault();
    console.log(doThis());
    // myModal.hide();
    // action();
  });
}

// export default function modal(bodyText, headerText, attribute, buttonText, action) {
//   main.insertAdjacentHTML(
//     "beforeend",
// `<div class="modal fade" id="infoModal" tabindex="-1" aria-hidden="true">
// <div class="modal-dialog modal-dialog-centered">
//   <div class="modal-content">
//     <div class="modal-header">
//       <h5 class="modal-title">${headerText}</h5>
//       <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//     </div>
//     <div class="modal-body">${bodyText}</div>
//     <div class="modal-footer">
//       <button id="modal-btn-close" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
//       <button id="modal-btn-ok" type="button" class="btn btn-primary confirmBtn" data-id="${attribute}">${buttonText}</button>
//     </div>
//   </div>
// </div>
// </div>`
//);
// let confirmBtn = document.querySelector(".confirmBtn");

// confirmBtn.addEventListener("click", (e) => {
//   e.preventDefault();
//   myModal.hide();
//   action();
// });
// }

// let myModal = new bootstrap.Modal(document.getElementById("infoModal"));
//This event fires immediately when the show instance method is called.
//If caused by a click, the clicked element is available as the relatedTarget property of the event.

// let myModal = document.getElementById("infoModal");
// // myModal.show();
// myModal.addEventListener("show.bs.modal", (e) => {
//   // Button that triggered the modal
//   let button = e.relatedTarget;
//   // Extract info from data-bs-* attributes
//   let recipient = button.getAttribute("data-modal");

//   // Update the modal's content.
//   let modalTitle = myModal.querySelector(".modal-title");
//   let modalBodyInput = myModal.querySelector(".modal-body input");

//   modalTitle.textContent = "New message to " + recipient;
//   modalBodyInput.value = recipient;
// });

// let confirmBtn = document.querySelector(".confirmBtn");

// confirmBtn.addEventListener("click", (e) => {
//   e.preventDefault();
//   myModal.hide();
//   action();
// });
