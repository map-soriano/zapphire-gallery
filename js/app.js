const lightboxImages = document.querySelectorAll("img[data-lightbox='true']");
const video = document.getElementById("bg-video");

const overlay = document.createElement("div");
overlay.className = "lightbox";
overlay.hidden = true;
overlay.setAttribute("role", "dialog");
overlay.setAttribute("aria-modal", "true");
overlay.setAttribute("aria-label", "Artwork preview");

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

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeLightbox();
    }
});
