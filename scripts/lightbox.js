/**
 * @module lightbox
 */

/**
 * @property {function} openLightbox  Ouvre  la lightbox au click sur un média
 *
 *
 */
function openLightbox() {
  const lightboxModal = document.querySelector(".lightbox-modal");
  const lightboxLink = document.querySelectorAll(".media-img");
  const closeMediaModal = document.querySelectorAll(".close-lightbox-media");

  lightboxLink.forEach((link) =>
    link.addEventListener("click", openModalMedia)
  );
  closeMediaModal.forEach((el) => el.addEventListener("click", closelightbox));

  function openModalMedia() {
    lightboxModal.style.display = "flex";
  }
  function closelightbox() {
    lightboxModal.style.display = "none";
  }
}

export { openLightbox };
