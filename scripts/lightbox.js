/**
 * @module lightbox
 */

/**
 * @property {function} openLightbox  Ouvre  la lightbox au click sur un média
 *
 *
 */
function openLightbox(media) {
  let currentMedia = media;
  const lightboxModal = document.querySelector(".lightbox-modal");
  const lightboxLink = document.querySelectorAll(".media-img");
  const closeMediaModal = document.querySelectorAll(".close-lightbox-media");
  const arrows = document.querySelectorAll(".lightbox-arrow");
  const titleBox = document.querySelector(".titre-media-lightbox");
  const leftArrow = arrows[0];
  const rightArrow = arrows[1];
  const mediaContainer = document.querySelector(".media-container");
  const mediaTitle = currentMedia.title;
  const mediaLink = "./sources/img/2_big/" + currentMedia.link;
  const mediaImg = document.createElement("img");
  mediaContainer.append(mediaImg);
  titleBox.textContent = mediaTitle;
  mediaImg.src = mediaLink;
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

  function nextMedia(e) {
    e.preventDefault();
    if (
      displayedMediaList.indexOf(currentMedia) + 1 >=
      displayedMediaList.length
    ) {
      currentMedia = displayedMediaList[0];
    } else {
      currentMedia =
        displayedMediaList[displayedMediaList.indexOf(currentMedia) + 1];
    }
    showContent();
  }

  function showContent() {
    mediaTitle.textContent = currentMedia.title;
  }
}

export { openLightbox };
