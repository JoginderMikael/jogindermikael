const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
const backToTop = document.querySelector(".back-to-top");

if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
        const isOpen = nav.classList.toggle("open");
        menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    nav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            nav.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });
}

const revealTargets = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.16 }
    );

    revealTargets.forEach((element, index) => {
        element.style.transitionDelay = `${Math.min(index * 70, 280)}ms`;
        observer.observe(element);
    });
} else {
    revealTargets.forEach((element) => element.classList.add("visible"));
}

const updateBackToTop = () => {
    if (!backToTop) return;
    backToTop.classList.toggle("visible", window.scrollY > 520);
};

window.addEventListener("scroll", updateBackToTop, { passive: true });
updateBackToTop();
