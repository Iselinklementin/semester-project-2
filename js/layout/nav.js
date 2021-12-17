import { wrapper, navSidebar, navDesktop } from "../components/elements.js";
import { USER_STORAGE } from "../settings/storage.js";
import signout from "../buttons/signout.js";

// open sidebar on mobile
// extra options when signed in
export default function toggleSidebar() {
  const { pathname } = document.location;
  const toggleNav = document.querySelector(".sidebar-nav-toggle");
  const hamburger = toggleNav.children[0];

  function currentPage(link) {
    return `${pathname === `${link}` ? "active" : ""}`;
  }

  let classes = "nav-link d-none d-lg-block";

  if (USER_STORAGE) {
    navDesktop.innerHTML = `
    <li><a class="${classes} ${currentPage("/index.html")}" href="/index.html">Home</a></li>
    <li><a class="${classes} ${currentPage("/products.html")}" href="products.html">Products</a></li>
    <li><a href="/add.html" class="${classes} ${currentPage("/add.html")}">Add product</a></li>
    <li><a class="nav-link ${currentPage(
      "/favorites.html"
    )}" href="favorites.html"><i class="far fa-heart"></i></a></li>
    <li><a class="nav-link ${currentPage(
      "/cart.html"
    )}" href="cart.html"><i class="fas fa-shopping-cart cart-icon"></i><span class="cart-count"></span></a></li>
    <li><a class="nav-link logout modal-btn-signout"><i class="fas fa-sign-out-alt"></i></a></li>`;

    navSidebar.innerHTML = `
    <li><a href="index.html" class="nav-link ${currentPage(
      "/index.html"
    )}" aria-current="page"><i class="fas fa-chevron-right"></i>Home</a></li>
    <li><a href="products.html" class="nav-link ${currentPage(
      "/products.html"
    )}"><i class="fas fa-chevron-right"></i>Products</a></li>
    <li><a href="favorites.html" class="nav-link ${currentPage(
      "/favorites.html"
    )}"><i class="fas fa-chevron-right"></i>Favourites</a></li>
    <li><a href="/add.html" class="${currentPage(
      "/add.html"
    )} nav-link"><i class="fas fa-chevron-right"></i>Add product</a></li>
    `;

    signout();
  }

  toggleNav.addEventListener("click", (event) => {
    event.preventDefault();
    wrapper.classList.toggle("show");
    hamburger.classList.toggle("fa-times");
  });
}
