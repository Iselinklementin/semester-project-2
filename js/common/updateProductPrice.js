export function updateProductPrice() {
  const productPrice = document.querySelectorAll(".card-price");
  const prices = [...productPrice];

  prices.forEach(price => {
    let findQuantity = price.offsetParent.lastElementChild.firstElementChild.children[1].value;
    let originalPriceString = price.innerText.replace("$ ", "");
    let originalPrice = parseFloat(originalPriceString);
    let currentQuantity = parseFloat(findQuantity);
    let newPrice = originalPrice * currentQuantity;
    price.innerText = `$ ` + newPrice.toFixed(2);
  });
}
