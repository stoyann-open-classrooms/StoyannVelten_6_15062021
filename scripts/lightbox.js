function openLightbox() {
  const lightboxModal = document.querySelector(".lightbox-modal");
  const lightboxLink = document.querySelector(".media-img");
  const closeMediaModal = document.querySelector(".close-lightbox-media");

  lightboxLink.addEventListener("click", (e) => {
    e.preventDefault();
    lightboxModal.style.display = "flex";

    closeMediaModal.addEventListener("click", () => {
      lightboxModal.style.display = "none";
    });
  });
}
export { openLightbox };
