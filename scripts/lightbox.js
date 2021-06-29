function openLightbox() {
  const lightboxModal = document.querySelector(".lightbox-modal");
  const lightboxLink = document.querySelector(".media-img");
  const lightboxContent = document.querySelector(".lightbox-content");

  lightboxLink.addEventListener("click", () => {
    // e.preventDefault();
    lightboxModal.style.display = "flex";
    const closeMediaModal = document.createElement("i");
    const leftArrow = document.createElement("i");
    const lightboxMedia = document.createElement("img");
    const rightArrow = document.createElement("i");

    closeMediaModal.classList.add("fas");
    closeMediaModal.classList.add("fa-times");
    closeMediaModal.classList.add("close-media-modal");
    leftArrow.classList.add("fas");
    leftArrow.classList.add("fa-chevron-left");
    rightArrow.classList.add("fas");
    rightArrow.classList.add("fa-chevron-right");

    lightboxContent.append(closeMediaModal, leftArrow, rightArrow);
    // console.log("ok");

    closeMediaModal.addEventListener("click", () => {
      lightboxModal.style.display = "none";
    });
  });
}

export { openLightbox };
