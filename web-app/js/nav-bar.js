const currentUrl = window.location.href;

const navLinks = document.querySelectorAll('nav ul li a');

navLinks.forEach(link => {
    if (link.href === currentUrl) {
        link.classList.add('active');
    }
});