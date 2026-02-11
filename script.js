const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
const scrollProgressBar = document.querySelector(".scroll-progress-bar");

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
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.15 }
);

revealTargets.forEach((el, idx) => {
    el.style.transitionDelay = `${Math.min(idx * 80, 320)}ms`;
    observer.observe(el);
});

const updateScrollProgress = () => {
    if (!scrollProgressBar) return;

    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollHeight > 0 ? Math.min(scrollTop / scrollHeight, 1) : 1;

    scrollProgressBar.style.transform = `scaleX(${progress})`;
};

window.addEventListener("scroll", updateScrollProgress, { passive: true });
window.addEventListener("resize", updateScrollProgress);
updateScrollProgress();
