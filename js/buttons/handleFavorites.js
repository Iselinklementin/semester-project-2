import { getFromStorage, saveToStorage } from "../settings/storage.js";
import { FAV_STORAGE_KEY } from "../settings/keys.js";
import { fillNavHeart } from "../layout/fillNavHeart.js";

export default function handleFavourites() {
  this.classList.toggle("fa");

  const id = this.dataset.id;
  const title = this.dataset.title;
  const price = this.dataset.price;
  const image_url = this.dataset.image_url;
  const description = this.dataset.description;
  const volume = this.dataset.volume;
  const featured = this.dataset.featured;

  const favourites = getFromStorage(FAV_STORAGE_KEY);
  const productExists = favourites.find(product => product.id === id);

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
    saveToStorage(FAV_STORAGE_KEY, favourites);
    fillNavHeart();
  } else {
    const newProduct = favourites.filter(product => product.id !== id);
    saveToStorage(FAV_STORAGE_KEY, newProduct);
    fillNavHeart();
  }
}
