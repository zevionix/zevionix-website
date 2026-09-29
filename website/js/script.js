
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("open");

        menuToggle.textContent =
            navLinks.classList.contains("open") ? "✕" : "☰";
    });
}

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks?.classList.remove("open");

        if (menuToggle) {
            menuToggle.textContent = "☰";
        }
    });
});

const year = document.getElementById("year");

if (year) {
    year.textContent = new Date().getFullYear();
}