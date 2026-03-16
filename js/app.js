const lightboxImages = document.querySelectorAll("img[data-lightbox='true']");
const video = document.getElementById("bg-video");

const overlay = document.createElement("div");
overlay.className = "lightbox";
overlay.hidden = true;
overlay.setAttribute("role", "dialog");
overlay.setAttribute("aria-modal", "true");
overlay.setAttribute("aria-label", "Artwork preview");

let lightboxBackgroundElements = [];

const closeButton = document.createElement("button");
closeButton.type = "button";
closeButton.className = "lightbox-close";
closeButton.setAttribute("aria-label", "Close artwork preview");
closeButton.textContent = "Close";

const previewImage = document.createElement("img");
previewImage.alt = "Expanded artwork preview";

overlay.appendChild(closeButton);
overlay.appendChild(previewImage);
document.body.appendChild(overlay);

let focusedBeforeOpen = null;

const closeLightbox = () => {
    if (overlay.hidden) {
        return;
    }

    overlay.hidden = true;
    document.body.classList.remove("lightbox-open");

    // Restore background interactivity and aria-hidden state
    lightboxBackgroundElements.forEach((el) => {
        if ("inert" in el) {
            el.inert = false;
        }
        el.removeAttribute("inert");

        if (el.dataset.prevAriaHidden !== undefined) {
            if (el.dataset.prevAriaHidden === "") {
                el.removeAttribute("aria-hidden");
            } else {
                el.setAttribute("aria-hidden", el.dataset.prevAriaHidden);
            }
            delete el.dataset.prevAriaHidden;
        } else {
            el.removeAttribute("aria-hidden");
        }
    });
    lightboxBackgroundElements = [];

    if (video) {
        video.play().catch(() => {
            // Ignore autoplay restrictions after user interaction.
        });
    }

    if (focusedBeforeOpen) {
        focusedBeforeOpen.focus();
    }
};

const openLightbox = (sourceImage) => {
    focusedBeforeOpen = document.activeElement;
    previewImage.src = sourceImage.src;
    previewImage.alt = sourceImage.alt || "Expanded artwork preview";

    // Inert and hide the rest of the page while the lightbox is open
    lightboxBackgroundElements = Array.from(document.body.children).filter(
        (el) => el !== overlay
    );
    lightboxBackgroundElements.forEach((el) => {
        if (!Object.prototype.hasOwnProperty.call(el.dataset, "prevAriaHidden")) {
            el.dataset.prevAriaHidden = el.getAttribute("aria-hidden") || "";
        }
        el.setAttribute("aria-hidden", "true");

        if ("inert" in el) {
            el.inert = true;
        }
        el.setAttribute("inert", "");
    });

    overlay.hidden = false;
    document.body.classList.add("lightbox-open");

    if (video) {
        video.pause();
    }

    closeButton.focus();
};

lightboxImages.forEach((image) => {
    image.tabIndex = 0;
    image.setAttribute("role", "button");
    image.setAttribute("aria-haspopup", "dialog");
    image.setAttribute("aria-label", `${image.alt}. Open full-size preview.`);

    image.addEventListener("click", () => {
        openLightbox(image);
    });

    image.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openLightbox(image);
        }
    });
});

closeButton.addEventListener("click", closeLightbox);

overlay.addEventListener("click", (event) => {
    if (event.target === overlay) {
        closeLightbox();
    }
});

// Trap focus within the lightbox while it is open
overlay.addEventListener("keydown", (event) => {
    if (event.key !== "Tab") {
        return;
    }

    const focusableElements = [closeButton, previewImage];
    const current = document.activeElement;
    let index = focusableElements.indexOf(current);

    // If focus is not currently on a known focusable element, move it to the close button
    if (index === -1) {
        event.preventDefault();
        closeButton.focus();
        return;
    }

    event.preventDefault();

    if (event.shiftKey) {
        // Move backwards
        index = index === 0 ? focusableElements.length - 1 : index - 1;
    } else {
        // Move forwards
        index = index === focusableElements.length - 1 ? 0 : index + 1;
    }

    focusableElements[index].focus();
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeLightbox();
    }
});

const yearEl = document.getElementById("footer-year");
if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}

// Active nav highlighting via IntersectionObserver
const navLinks = document.querySelectorAll(".nav-links a[href^='#']");
const sectionIds = Array.from(navLinks)
    .map((a) => a.getAttribute("href").slice(1))
    .filter((id) => document.getElementById(id));

const sectionEls = sectionIds.map((id) => document.getElementById(id));

const setActiveLink = (id) => {
    navLinks.forEach((a) => {
        const isActive = a.getAttribute("href") === `#${id}`;
        a.classList.toggle("active", isActive);
    });
};

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                setActiveLink(entry.target.id);
            }
        });
    },
    {
        rootMargin: "-40% 0px -55% 0px",
        threshold: 0,
    }
);

sectionEls.forEach((el) => observer.observe(el));
