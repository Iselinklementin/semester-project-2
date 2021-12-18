// Cart page
// Show correct product-price, even if there are more than one in cart

export function setCartPrices(id, product) {
  const getPrices = document.querySelectorAll(".card-price");
  const prices = [...getPrices];
  let priceHtml = prices.find(price => {
    if (price.getAttribute("data-id") === id) return price;
  });

  let productPrice = priceHtml.getAttribute("data-price");
  let newPrice = productPrice * product.quantity;
  priceHtml.innerText = `$ ` + newPrice.toFixed(2);
}
