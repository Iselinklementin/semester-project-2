const main = document.querySelector("main");

// skift classes

export default function modal(bodyText, headerText, attribute, action) {
  main.insertAdjacentHTML(
    "beforeend",

    `<div class="modal fade" id="infoModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">${headerText}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">${bodyText}</div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary confirmBtn" data-id="${attribute}">Save changes</button>
          </div>
        </div>
      </div>
    </div>`
  );

  let myModal = new bootstrap.Modal(document.getElementById("infoModal"));
  myModal.show();
  let confirmBtn = document.querySelector(".confirmBtn");

  confirmBtn.addEventListener("click", e => {
    e.preventDefault();
    action();
    myModal.hide();
  });
}
