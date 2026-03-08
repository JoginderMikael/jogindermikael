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

const expertiseAccordionItems = document.querySelectorAll(".skill-accordion-item");

const closeSkillPanel = (item) => {
    const toggle = item.querySelector(".skill-toggle");
    const panel = item.querySelector(".skill-panel");
    if (!toggle || !panel) return;

    if (panel.style.height === "auto") {
        panel.style.height = `${panel.scrollHeight}px`;
    }

    requestAnimationFrame(() => {
        panel.style.height = "0px";
    });

    item.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
};

const openSkillPanel = (item) => {
    const toggle = item.querySelector(".skill-toggle");
    const panel = item.querySelector(".skill-panel");
    if (!toggle || !panel) return;

    item.classList.add("open");
    toggle.setAttribute("aria-expanded", "true");
    panel.style.height = `${panel.scrollHeight}px`;

    const onEnd = (event) => {
        if (event.propertyName === "height" && item.classList.contains("open")) {
            panel.style.height = "auto";
        }
        panel.removeEventListener("transitionend", onEnd);
    };

    panel.addEventListener("transitionend", onEnd);
};

expertiseAccordionItems.forEach((item) => {
    const toggle = item.querySelector(".skill-toggle");
    const panel = item.querySelector(".skill-panel");
    if (!toggle || !panel) return;

    panel.style.height = "0px";

    toggle.addEventListener("click", () => {
        if (item.classList.contains("open")) {
            closeSkillPanel(item);
        } else {
            openSkillPanel(item);
        }
    });
});

window.addEventListener("resize", () => {
    expertiseAccordionItems.forEach((item) => {
        if (!item.classList.contains("open")) return;

        const panel = item.querySelector(".skill-panel");
        if (!panel) return;

        panel.style.height = "auto";
    });
});

const carousels = document.querySelectorAll("[data-carousel]");
const lightbox = document.querySelector("#image-lightbox");
const lightboxImage = lightbox ? lightbox.querySelector(".lightbox-image") : null;
const lightboxClose = lightbox ? lightbox.querySelector(".lightbox-close") : null;

const openLightbox = (src, alt) => {
    if (!lightbox || !lightboxImage) return;
    lightboxImage.src = src;
    lightboxImage.alt = alt || "Expanded project screenshot";
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
};

const closeLightbox = () => {
    if (!lightbox || !lightboxImage) return;
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImage.src = "";
    document.body.style.overflow = "";
};

if (lightboxClose) {
    lightboxClose.addEventListener("click", closeLightbox);
}

if (lightbox) {
    lightbox.addEventListener("click", (event) => {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });
}

window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox && lightbox.classList.contains("open")) {
        closeLightbox();
    }
});

carousels.forEach((carousel) => {
    const slides = carousel.querySelectorAll(".project-carousel-slide");
    const prevBtn = carousel.querySelector(".project-carousel-btn.prev");
    const nextBtn = carousel.querySelector(".project-carousel-btn.next");
    if (!slides.length || !prevBtn || !nextBtn) return;

    let currentIndex = 0;
    let touchStartX = 0;
    let touchEndX = 0;

    const showSlide = (index) => {
        slides.forEach((slide, idx) => {
            slide.classList.toggle("active", idx === index);
        });
    };

    const showNext = () => {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    };

    const showPrev = () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(currentIndex);
    };

    prevBtn.addEventListener("click", showPrev);
    nextBtn.addEventListener("click", showNext);

    carousel.addEventListener("touchstart", (event) => {
        touchStartX = event.changedTouches[0].clientX;
    }, { passive: true });

    carousel.addEventListener("touchend", (event) => {
        touchEndX = event.changedTouches[0].clientX;
        const swipeDistance = touchEndX - touchStartX;

        if (Math.abs(swipeDistance) < 40) return;
        if (swipeDistance > 0) {
            showPrev();
        } else {
            showNext();
        }
    }, { passive: true });

    slides.forEach((slide) => {
        slide.addEventListener("click", () => {
            openLightbox(slide.src, slide.alt);
        });
    });

    showSlide(currentIndex);
});
