function openLightbox() {
  const lightboxModal = document.querySelector(".lightbox-modal");
  const lightboxLink = document.querySelector(".media-img");

  lightboxLink.addEventListener("click", () => {
    // e.preventDefault();
    lightboxModal.style.display = "flex";
    // console.log("ok");
  });
  // closeMediaModal.addEventListener("click", () => {
  //   lightboxModal.style.display = "none";
  // });
}

export { openLightbox };
