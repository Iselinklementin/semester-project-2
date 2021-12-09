import { createHtml } from "./createHtml.js";
import { emptyResult } from "../components/emptyResult.js";

export function searchFunction(products) {
  const searchInput = document.querySelector(".search-product-page");
  searchInput.onkeyup = event => {
    const searchValue = event.target.value.trim();
    const searchTitle = products.filter(item => {
      // Tar vekk span så produktet kan søkes på
      let titleStr = item.title;
      let title = titleStr.replace("<span>", "");
      if (
        title.toLowerCase().includes(searchValue) ||
        item.description.toLowerCase().includes(searchValue)
      ) {
        return true;
      }
    });

    createHtml(searchTitle);
    emptyResult();
  };
}
