const main = document.querySelector("main");

// skift classes

export default function modal(bodyText, headerText, attribute, buttonText, action) {
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
            <button id="modal-btn-close" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button id="modal-btn-ok" type="button" class="btn btn-primary confirmBtn" data-id="${attribute}">${buttonText}</button>
          </div>
        </div>
      </div>
    </div>`
  );

  let myModal = new bootstrap.Modal(document.getElementById("infoModal"));
  myModal.show();

  // myModal.on("show.bs.modal", function (event) {
  //   let button = event.target; // Button that triggered the modal
  //   let recipient = button.data("remove"); // Extract info from data-* attributes
  //   // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
  //   // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
  //   let modal = this;
  //   modal.find(".modal-title").text("New message to " + recipient);
  //   modal.find(".modal-body input").val(recipient);
  // });

  let confirmBtn = document.querySelector(".confirmBtn");

  confirmBtn.addEventListener("click", e => {
    e.preventDefault();
    action();

    myModal.hide();
    myModal.dispose();
  });
}
