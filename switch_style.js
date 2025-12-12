const themeToggle = document.getElementById("colorSelector");
let theme_color = document.querySelector(":root")


function saveTheme() {
  localStorage.setItem("theme", themeToggle.value)
}
if (localStorage.getItem("theme") == null) {
  localStorage.setItem("theme", document.querySelector("select > option").value)
}

themeToggle.value = localStorage.getItem("theme")

function updateTheme() {
  theme_color.style.setProperty("--theme", themeToggle.value)
}

document.addEventListener("DOMContentLoaded", ()=>{
  updateTheme()
});

themeToggle.addEventListener("input", () => {
  updateTheme()
  saveTheme()
});