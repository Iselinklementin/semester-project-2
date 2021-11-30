import Block from "../components/blocks.js";
import { cartKey, favKey } from "../settings/keys.js";
import { getFromStorage } from "../settings/storage.js";
import handleFavourites from "../buttons/handleFavorites.js";

export function createHtml(products) {
  const productContainer = document.querySelector(".product-container");
  productContainer.innerHTML = "";
  const currentFavorites = getFromStorage(favKey);
  // const currentCart = getFromStorage(cartKey);

  products.forEach(product => {
    const doesFavExists = currentFavorites.find(fav => {
      if (parseInt(fav.id) === product.id || fav.id === product.id) {
        return true;
      }

      // const doesCartExists = currentCart.find((prod) => {
      //   if (prod.id === product.id) {
      //     return true;
      //   }
      // });
      // console.log(doesCartExists);
    });

    let cssClass = doesFavExists ? "fa" : "far";

    const newBlock = new Block(
      `${product.title}`,
      `${product.price}`,
      `${product.description}`,
      `${product.id}`,
      `${cssClass}`,
      `${product.image_url}`,
      `${product.volume}`,
      `${product.featured}`
    );

    productContainer.innerHTML += newBlock.draw();
    // hvis det er i cart - ha med amount?
  });

  const favHeart = document.querySelectorAll(".favorite-heart");
  favHeart.forEach(heart => {
    heart.addEventListener("click", handleFavourites);
    heart.addEventListener("click", fillNavHeart);
  });
}

// spesifiser navheart bedre
// denne fyller hjertet i navbaren hvis det ligger produkter inne
// funker ikke hvis du går ut av siden å kommer tilbake
// må kjøre en function på loading av siden også

export function fillNavHeart() {
  const navHeart = document.querySelector(".fa-heart");
  const favStorage = getFromStorage(favKey);
  // console.log(favStorage.length);
  if (favStorage.length) {
    navHeart.classList.add("fa");
  } else {
    navHeart.classList.remove("fa");
  }
}

// export function createHtml(articles) {
//   container.innerHTML = "";
//   const currentFav = getFromStorage(favKey);

//   articles.forEach(article => {
//     const doesFavExists = currentFav.find(fav => {
//       if (parseInt(fav.id) === article.id || fav.id === article.id) {
//         return true;
//       }
//     });
//     // if it already exists in storage, it should show a full fav-heart
//     let cssClass = doesFavExists ? "fa" : "far";

//     const newBlock = new Block(
//       `${article.title}`,
//       `${article.summary}`,
//       `${article.author}`,
//       `${article.id}`,
//       `${cssClass}`
//     );
//     container.innerHTML += newBlock.draw();
//   });

//   const favHeart = document.querySelectorAll(".fa-heart");
//   favHeart.forEach(heart => {
//     // toggle in and out of storage
//     heart.addEventListener("click", handleFavourites);
//   });
//   // show edit-icon and a greeting if user is signed in
//   editIcon();
//   greeting();
// }
