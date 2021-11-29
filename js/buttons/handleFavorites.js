import { getFromStorage, saveToStorage } from "../settings/storage.js";
import { favKey } from "../settings/keys.js";

export default function handleFavourites() {
  this.classList.toggle("fa");

  const id = this.dataset.id;
  const title = this.dataset.title;
  const price = this.dataset.price;
  const image_url = this.dataset.image_url;
  const description = this.dataset.description;
  const volume = this.dataset.volume;
  const featured = this.dataset.featured;
  const favourites = getFromStorage(favKey);
  const productExists = favourites.find((product) => product.id === id);

  // tror ikke man trenger å skrive :, og man bare trenger å føre det inn èn gang?

  if (!productExists) {
    const product = {
      id,
      title,
      price,
      image_url,
      description,
      volume,
      featured,
    };

    favourites.push(product);
    saveToStorage(favKey, favourites);
  } else {
    const newProduct = favourites.filter((product) => product.id !== id);
    saveToStorage(favKey, newProduct);
  }
}

// export default function handleFavourites() {
//   this.classList.toggle("fa");

//   const id = this.dataset.id;
//   const title = this.dataset.title;
//   const summary = this.dataset.summary;
//   const author = this.dataset.author;

//   const favourites = getFromStorage(favKey);
//   const articleExists = favourites.find(article => article.id === id);

//   if (!articleExists) {
//     const article = { id: id, title: title, summary: summary, author: author };
//     favourites.push(article);
//     saveToStorage(favKey, favourites);
//   } else {
//     const newFavArticle = favourites.filter(article => article.id !== id);
//     saveToStorage(favKey, newFavArticle);
//   }
// }
