const main = document.querySelector("main");

export default function modal(bodyText, headerText, attribute, action) {
  main.insertAdjacentHTML(
    "beforeend",
    `<div class="modal fade" id="modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">${headerText}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">${bodyText}</div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" value="no"> No </button>
            <button type="button" class="btn btn-primary confirmBtn" value="yes">Ok</button>
          </div>
        </div>
      </div>
    </div>`
  );
  let myModal = new bootstrap.Modal(document.getElementById("modal"));
  let confirmBtn = document.querySelector(".confirmBtn");
  myModal.show();
  confirmBtn.setAttribute("data", attribute);

  confirmBtn.addEventListener("click", () => {
    myModal.hide();
    action();
  });
}
