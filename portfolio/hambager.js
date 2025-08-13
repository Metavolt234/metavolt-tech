const hamburger = document.querySelector(".hamburger")
const navMenu = document.querySelector(".nav-menu")

//OPENING AND CLOSING OF THE HAMBURGER
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
})

//CLOSING OF THE MENU AFTER A SELECTION
document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
  hamburger.classList.remove("active");
  navMenu.classList.remove("active");
}))
  