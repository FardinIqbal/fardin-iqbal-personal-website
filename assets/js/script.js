function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}

/* Load HTML sections dynamically */
function loadHTML(elementId, fileName) {
    fetch(fileName)
        .then(response => response.text())
        .then(data => document.getElementById(elementId).innerHTML = data);
}

document.addEventListener("DOMContentLoaded", function() {
    loadHTML('header', 'partials/header.html');
    loadHTML('profile', 'partials/profile.html');
    loadHTML('about', 'partials/about.html');
    loadHTML('experience', 'partials/experience.html');
    loadHTML('projects', 'partials/projects.html');
    loadHTML('contact', 'partials/contact.html');
    loadHTML('footer', 'partials/footer.html');
});
