// Toggle mobile menu visibility
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    const hamburger = document.querySelector('.hamburger');

    navLinks.classList.toggle('show'); // Toggle visibility of navigation links
    hamburger.classList.toggle('active'); // Toggle active state of hamburger icon
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
            // Close mobile menu if it's open
            const navLinks = document.getElementById('navLinks');
            if (navLinks.classList.contains('show')) {
                toggleMenu();
            }
        }
    });
});

// Highlight active section in navigation on scroll
window.addEventListener('scroll', function() {
    let currentSection = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        if (window.pageYOffset >= sectionTop - 60 && window.pageYOffset < sectionTop + sectionHeight - 60) {
            currentSection = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === currentSection) {
            link.classList.add('active');
        }
    });
});

// Intersection Observer for fade-in animations on scroll
const observerOptions = {
    threshold: 0.25
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target); // Stop observing after element is in view
        }
    });
}, observerOptions);

// Observe elements for fade-in effect
document.querySelectorAll('.experience-card, .project-card, .skills-category').forEach(el => {
    observer.observe(el);
});
