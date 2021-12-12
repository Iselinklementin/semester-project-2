// This is used in increase/decrease quantity (cart)
// Finding the original price to get the right cost when
// adding more of the same product

export function originalProductPrice(id) {
  // Find original price, to add it to current price
  const getData = document.querySelectorAll(".favorite-heart");
  const data = [...getData];
  let originalPrice = data.find((price) => {
    if (price.getAttribute("data-id") === id) return price;
  });

  // Find price-html, so you can change it
  const getPrices = document.querySelectorAll(".card-price");
  const prices = [...getPrices];
  let priceHtml = prices.find((price) => {
    if (price.getAttribute("data-id") === id) return price;
  });

  let productPrice = originalPrice.getAttribute("data-price");
  priceHtml.setAttribute("productPrice", productPrice);

  return priceHtml;
}
