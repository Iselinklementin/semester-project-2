// skeletonLoading in product-container
// used on index.html, products.html and favourites

export function loadingHtml() {
  const productContainer = document.querySelector(".product-container");

  for (let i = 0; i <= 3; i++) {
    productContainer.innerHTML += `
    <div class="col loading-col">
    <div class="card" aria-hidden="true">
      <img src="" class="card-img-top" id="loading-img" alt="..." style="height: 200px;" />
      <div class="card-body">
        <h5 class="card-title placeholder-glow">
          <span class="placeholder loadspan"></span>
        </h5>
        <p class="card-text text-center placeholder-glow">
          <span class="placeholder col-7 loadspan"></span>
          <span class="placeholder col-4 loadspan"></span>
          <span class="placeholder col-4 loadspan"></span>
          <span class="placeholder col-6 loadspan"></span>
        </p>
      </div>
      </div>
    </div>`;
  }
}
