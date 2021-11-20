(function () {
  const menuItem = document.querySelector(".sidebar-nav-toggle");
  const burgerIcon = menuItem.children[0];

  menuItem.addEventListener("click", (event) => {
    event.preventDefault();
    const wrapper = document.querySelector(".sidebar-nav-wrapper");
    wrapper.classList.toggle("menuDisplayed");
    burgerIcon.classList.toggle("fa-times");
  });
})();
