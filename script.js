console.log("Portfolio loaded.");

// Simple mobile menu toggle (functionality can be expanded)
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        // We'll need to add a class for 'active' in CSS to show the menu
        // For now just logging
        console.log("Menu clicked");
        navLinks.classList.toggle('active');
    });
}
