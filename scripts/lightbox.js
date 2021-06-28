function openLightbox() {
  const lightboxModal = document.querySelector(".lightbox-modal");
  const lightboxLink = document.querySelector(".lightbox-link");
  const closeMediaModal = document.querySelector(".close-media-modal");
  lightboxLink.addEventListener("click", () => {
    lightboxModal.style.display = "flex";
  });
  closeMediaModal.addEventListener("click", () => {
    lightboxModal.style.display = "none";
  });
}

export { openLightbox };
