// import { favKey } from "../settings/keys.js";
// import { getFromStorage } from "../settings/storage.js";

import { user } from "../settings/storage.js";
import logOutBtn from "./logOutBtn.js";
const navDesktop = document.querySelector(".nav-desktop");
const navSidebar = document.querySelector(".sidebar-nav-links");

// open sidebar on mobile
export default function toggleSidebar() {
  const { pathname } = document.location;
  // let authLink = `<li><a href="/login.html" class="${pathname === "/login.html" ? "active" : ""}">Login</a></li>`;

  const toggleNav = document.querySelector(".sidebar-nav-toggle");
  const hamburger = toggleNav.children[0];

  // if (user) {
  //   authLink = `<li><a href="/add.html" class="d-none d-lg-block ${
  //     pathname === "/add.html" ? "active" : ""
  //   }">Add product</a></li>`;
  // }

  if (user) {
    navDesktop.innerHTML = `
    <li><a class="nav-link d-none d-lg-block" href="index.html">Home</a></li>
    <li><a class="nav-link d-none d-lg-block" href="products.html">Products</a></li>
    <li><a href="/add.html" class="nav-link d-none d-lg-block ${
      pathname === "/add.html" ? "active" : ""
    }">Add product</a></li>
    <li><a class="nav-link" href="favorites.html"><i class="far fa-heart"></i></a></li>
    <li><a class="nav-link" href="cart.html"><i class="fas fa-shopping-cart cart-icon"></i></a></li>
    <li><a class="nav-link logout modal-btn-signout"><i class="fas fa-sign-out-alt"></i></a></li>`;

    navSidebar.innerHTML = `
    <li><a href="index.html" class="active nav-link" aria-current="page"><i class="fas fa-chevron-right"></i>Home</a></li>
    <li><a href="products.html" class="nav-link"><i class="fas fa-chevron-right"></i>Products</a></li>
    <li><a href="favorites.html" class="nav-link"><i class="fas fa-chevron-right"></i>Favorites</a></li>
    <li><a href="/add.html" class="${
      pathname === "/add.html" ? "active" : ""
    } nav-link"><i class="fas fa-chevron-right"></i>Add product</a></li>
    `;

    logOutBtn();
  }

  toggleNav.addEventListener("click", (event) => {
    event.preventDefault();
    const wrapper = document.querySelector(".sidebar-nav-wrapper");
    wrapper.classList.toggle("show");
    hamburger.classList.toggle("fa-times");
  });
}
