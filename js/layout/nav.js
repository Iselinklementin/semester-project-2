export default function toggleSidebar() {
  const toggleNav = document.querySelector(".sidebar-nav-toggle");
  const hamburger = toggleNav.children[0];

  toggleNav.addEventListener("click", (event) => {
    event.preventDefault();
    const wrapper = document.querySelector(".sidebar-nav-wrapper");
    wrapper.classList.toggle("show");
    hamburger.classList.toggle("fa-times");
  });
}
