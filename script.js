const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
const backToTop = document.querySelector(".back-to-top");
const currentYear = document.querySelector("#current-year");
const projectTrack = document.querySelector("[data-project-track]");
const projectScrollButtons = document.querySelectorAll("[data-project-scroll]");

if (currentYear) {
    currentYear.textContent = String(new Date().getFullYear());
}

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

if (projectTrack && projectScrollButtons.length) {
    const getScrollDistance = () => {
        const firstCard = projectTrack.querySelector(".project-card");
        if (!firstCard) return projectTrack.clientWidth;

        const styles = window.getComputedStyle(projectTrack);
        const gap = parseFloat(styles.columnGap || styles.gap || "0");
        return firstCard.getBoundingClientRect().width + gap;
    };

    const updateProjectButtons = () => {
        const maxScroll = projectTrack.scrollWidth - projectTrack.clientWidth;
        const atStart = projectTrack.scrollLeft <= 2;
        const atEnd = projectTrack.scrollLeft >= maxScroll - 2;

        projectScrollButtons.forEach((button) => {
            const direction = button.dataset.projectScroll;
            button.disabled = direction === "left" ? atStart : atEnd;
        });
    };

    projectScrollButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const direction = button.dataset.projectScroll === "left" ? -1 : 1;
            projectTrack.scrollBy({
                left: direction * getScrollDistance(),
                behavior: "smooth"
            });
        });
    });

    projectTrack.addEventListener("scroll", updateProjectButtons, { passive: true });
    window.addEventListener("resize", updateProjectButtons);
    updateProjectButtons();
}
