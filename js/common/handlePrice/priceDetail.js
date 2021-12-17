// Price on detail page
// Adjust total price of product, when adding more or less of the same item

export function priceDetail(result) {
  const priceSection = document.querySelector(".price");
  const input = document.querySelector(".input-quantity");
  let price = result.price * input.value;
  priceSection.innerText = `$${price.toFixed(2)}`;
}
