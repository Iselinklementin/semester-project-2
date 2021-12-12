// Adjust total price of product, when adding more or less of the same item
// Works on cart page

export function updateProductPrice() {
  const productPrice = document.querySelectorAll(".card-price");
  const prices = [...productPrice];

  prices.forEach((price) => {
    let findQuantity = price.offsetParent.lastElementChild.firstElementChild.children[1].value;
    let originalPriceString = price.innerText.replace("$ ", "");
    let originalPrice = parseFloat(originalPriceString);
    let currentQuantity = parseFloat(findQuantity);
    let newPrice = originalPrice * currentQuantity;
    price.innerText = `$ ` + newPrice.toFixed(2);
  });
}
