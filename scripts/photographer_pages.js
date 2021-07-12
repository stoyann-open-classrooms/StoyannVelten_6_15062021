/**
 * @module photographer-pages
 */

import { Photographers } from "./Photographers.js";
import { MediumList } from "./MediumList.js";
import { Medium } from "./Medium.js";
import { displayFilterMenu } from "./dropdown.js";
import { openModalForm } from "./modale.js";

// import { sortByDate, sortByPopularity, sortByTitle } from "./dropdownMenu.js";

/**
 * name linkToData
 * @type {string}
 * @description le liens vers les données Json Fisheye
 *
 */
const linkToData = "data/FishEyeDataFR.json";
const urlParams = new URLSearchParams(window.location.search);
/**
 * @name mediaList
 * @type {array}
 * @description un tableau contenant les objets media  du photographe courant et les methodes qui lui sont associées
 *
 */
const mediaList = new MediumList();
const main = document.querySelector(".main");
/**
 * @name mediaFactory
 * @type {object}
 * @description une instance de la classe mediums image ou videos
 */
let mediaFactory = new Medium();
/**
 * @name currentPhotographer
 * @type {object}
 * @description informations sur le photographe courant
 *
 */
let currentPhotographer;
/**
 * @name totalLikes
 * @type {Array<number>}
 * @description Nonbres de likes de chaque médias
 *
 */
let totalLikes = [];
/**
 * @name totalLikesPhotographer
 * @type {number}
 * @description Nonbres de likes total du photographe courant
 *
 */
let totalLikesPhotographer;
/**
 *  createContent
 * @property {function} createContent  recuperation des données Json
 *
 * @returns  {createData}
 */

const loader = document.querySelector(".loader-container");

window.addEventListener("load", () => {
  fetch(linkToData)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        setTimeout(function loaderAnim() {
          console.log(
            `Une erreur est survenue type d'erreur : ${response.status} `
          );
          loader.className += " hidden";
        }, 2000);
      }
    })
    .then((data) => createData(data))
    .then(displayPage);
  setTimeout(function loaderAnim() {
    loader.className += " hidden";
  }, 2000);
});

function createData(data) {
  data.photographers.forEach((photographer) => {
    if (photographer.id === Number(urlParams.get("id"))) {
      currentPhotographer = new Photographers(
        photographer.name,
        photographer.id,
        photographer.city,
        photographer.country,
        photographer.tags,
        photographer.tagline,
        photographer.price,
        photographer.portrait
      );
    }
  });

  data.media.forEach((media) => {
    if (media.photographerId === currentPhotographer.id) {
      getLikes(media.likes);

      mediaList.addMedia(
        mediaFactory.createMedia(
          media.image?.split(".").pop() || media.video?.split(".").pop(),
          media.alt,
          media.date,
          media.id,
          media.image || media.video,
          media.likes,
          media.photographerId,
          media.tags,
          media.title,
          currentPhotographer.name.toLowerCase().replace(" ", "") + "/"
        )
      );
    }
  });
}

function displayBanner(currentPhotographer) {
  const urlParams = new URLSearchParams(window.location.search);

  const linkToPhoto =
    "./sources/img/1_small/PhotographersID/" + currentPhotographer.portrait;

  //  création des elements html
  const banerBody = document.createElement("div");
  const banerTitle = document.createElement("h1");
  const banerLocation = document.createElement("p");
  const banerTagline = document.createElement("p");
  const containerTagsBanner = document.createElement("div");
  const containerImgBanner = document.createElement("div");
  const bannerImg = document.createElement("img");
  const btnModal = document.createElement("button");
  const banner = document.querySelector(".banner");

  // ajouts des classes et attributs html

  banerBody.classList.add("banner-body");
  btnModal.classList.add("banner-btn");
  containerImgBanner.classList.add("banner-img");
  banerTitle.classList.add("banner-body-title");
  banerLocation.classList.add("banner-body-location");
  banerTagline.classList.add("banner-body-tagline");
  banerTagline.classList.add("banner-body-tagline");
  bannerImg.src = linkToPhoto;
  banerTitle.setAttribute("lang", "en");

  // ajout du contenu html
  banerTitle.textContent = currentPhotographer.name;
  banerLocation.textContent =
    currentPhotographer.city + " ," + currentPhotographer.country;
  banerTagline.textContent = currentPhotographer.tagline;
  btnModal.textContent = "Contacter-moi";

  // ajouts des tags
  currentPhotographer.tags.forEach((el) => {
    const tagsLink = document.createElement("a");
    const tagsSpan = document.createElement("span");
    containerTagsBanner.classList.add("banner-tags-container");
    tagsLink.classList.add("tags-link");
    tagsSpan.classList.add("tags");
    containerTagsBanner.appendChild(tagsLink);
    tagsSpan.textContent = "#" + el;
    tagsLink.appendChild(tagsSpan);

    tagsLink.addEventListener("click", (e) => {
      e.preventDefault();
      tagsLink.classList.toggle("tag--selected");
      displayMediaList();
    });

    if (urlParams.get("tag") && urlParams.get("tag") === el) {
      tagsLink.classList.toggle("tag--selected");
    }
  });

  // ajout des elements dans le DOM
  banner.append(banerBody, btnModal, containerImgBanner);
  banerBody.append(
    banerTitle,
    banerLocation,
    banerTagline,
    containerTagsBanner
  );

  containerImgBanner.appendChild(bannerImg);
}
/** display mediaList
 * @property {function} displaymediaList  créer et affiche les cards medias filtrer selon le ou les tags sélèctioner par l'uttilisateur
 *
 * @returns  {filters}
 */
export function displayMediaList() {
  /**
   * @name filters
   * @type {Array<object>}
   * @description Liste des medias filtrer selon le ou les tags sélèctioner par l'uttilisateur
   *
   */
  let displayMediaList = [];

  const filters = [];
  const cardsMediaContainer = document.querySelector(".cards-media-container");
  const sort = document
    .querySelector(".filter-option.selected")
    ?.getAttribute("data-value");

  cardsMediaContainer.innerHTML = "";
  document.querySelectorAll(".tag--selected").forEach((tagSelected) => {
    filters.push(tagSelected.textContent.replace("#", ""));
  });

  displayMediaList = mediaList.getMediaList(sort, ...filters);

  displayMediaList.forEach((media) => {
    const mediaElement = media.createImg();
    const cardsMedia = document.createElement("div");
    const cardsMediaImg = document.createElement("a");
    const cardsMediaFooter = document.createElement("div");
    const cardsMediaTitle = document.createElement("p");
    const cardsMediaHeaderLike = document.createElement("div");

    const playLogo = document.createElement("i");
    playLogo.classList.add("fas");
    playLogo.classList.add("fa-play-circle");

    const cardsMediaCompteurLike = document.createElement("p");
    const heartLink = document.createElement("a");
    const heart = document.createElement("i");
    cardsMediaCompteurLike.setAttribute("aria-label", `likes`);

    cardsMedia.classList.add("cards-media");
    cardsMediaImg.classList.add("cards-media-img");

    cardsMediaFooter.classList.add("cards-media-footer");
    cardsMediaTitle.classList.add("cards-media-title");
    cardsMediaHeaderLike.classList.add("header-like");
    cardsMediaCompteurLike.classList.add("compteur");
    heartLink.classList.add("heart-link");
    heart.classList.add("heart");
    heart.classList.add("far");
    heart.classList.add("fa-heart");

    cardsMediaImg.href = "#";

    if (media.type === "mp4") {
      cardsMediaImg.append(playLogo);
    }

    cardsMediaTitle.textContent = `${media.title}`;
    cardsMediaCompteurLike.textContent = `${media.likes}`;

    cardsMediaContainer.append(cardsMedia);
    cardsMedia.append(cardsMediaImg, cardsMediaFooter);
    cardsMediaImg.append(mediaElement);
    cardsMediaFooter.append(cardsMediaTitle, cardsMediaHeaderLike);
    cardsMediaHeaderLike.append(cardsMediaCompteurLike, heartLink);
    heartLink.append(heart);
    compteurLikes(totalLikes);

    // compteur de likes
    function compteurLikes(totalLikes) {
      cardsMediaCompteurLike.classList.add("compteur");

      heartLink.addEventListener("click", () => {
        if (heart.classList.contains("fas")) {
          media.likes--;
          heart.classList.remove("fas");
          heart.classList.add("far");
          totalLikes.push(-1);
          cardsMediaCompteurLike.textContent = media.likes;
          getTotalLikes();
        } else {
          media.likes++;
          heart.classList.remove("far");
          heart.classList.add("fas");
          totalLikes.push(1);
          cardsMediaCompteurLike.textContent = media.likes;

          getTotalLikes();
        }
      });
    }

    cardsMediaImg.addEventListener(
      "click",
      openLightbox(media, displayMediaList)
    );
    return filters;
  });
}
function displayPage() {
  document.title += " - " + currentPhotographer.name;

  displayBanner(currentPhotographer);
  openModalForm(currentPhotographer);
  displayFilterMenu(displayMediaList);
  getTotalLikes(totalLikes);
  displayMediaList();
}
function getLikes(likes) {
  totalLikes.push(likes);
  return totalLikes;
}

function getTotalLikes() {
  let totalLikesPhotographer = 0;
  for (let i = 0; i < totalLikes.length; i++) {
    totalLikesPhotographer += totalLikes[i];
  }
  displayTotalLikes(totalLikesPhotographer);
}
function displayTotalLikes(totalLikesPhotographer) {
  const totalLikesContainer = document.createElement("div");
  const totalLikesNb = document.createElement("div");
  const heart = document.createElement("i");

  heart.classList.add(`fas`);
  heart.classList.add(`fa-heart`);
  heart.classList.add(`heart`);

  totalLikesContainer.classList.add("total-likes-container");
  totalLikesNb.classList.add("total-likes");
  totalLikesNb.textContent = `${totalLikesPhotographer}`;

  main.append(totalLikesContainer);
  totalLikesContainer.append(totalLikesNb, heart);
}

function openLightbox(media, displayMediaList) {
  let currentMedia = media;
  const lightboxModal = document.querySelector(".lightbox-modal");
  const lightboxLink = document.querySelectorAll(".media-img");
  const closeMediaModal = document.querySelectorAll(".close-lightbox-media");
  const arrows = document.querySelectorAll(".lightbox-arrow");
  const leftArrow = arrows[0];
  const rightArrow = arrows[1];
  const mediaImg = document.createElement("img");
  const mediaVid = document.createElement("video");
  const mediaContainer = document.querySelector(".media-container");

  mediaVid.src = mediaImg.src = "./sources/img/2_big/" + currentMedia.link;

  const mediaTitle = document.querySelector(".titre-media-lightbox");

  lightboxLink.forEach((link) => link.addEventListener("click", openLightbox));
  closeMediaModal.forEach((el) => el.addEventListener("click", closelightbox));

  function openLightbox() {
    lightboxModal.style.display = "flex";
  }
  function closelightbox() {
    lightboxModal.style.display = "none";
  }

  rightArrow.addEventListener("click", (e) => nextMedia(e));
  leftArrow.addEventListener("click", (e) => previousMedia(e));

  displayContent();

  function nextMedia(e) {
    e.preventDefault();

    if (displayMediaList.indexOf(currentMedia) + 1 >= displayMediaList.length) {
      currentMedia = displayMediaList[0];
    } else {
      currentMedia =
        displayMediaList[displayMediaList.indexOf(currentMedia) + 1];
    }
    displayContent();
  }
  function previousMedia(e) {
    e.preventDefault();
    if (displayMediaList.indexOf(currentMedia) - 1 < 0) {
      currentMedia = displayMediaList[displayMediaList.length - 1];
    } else {
      currentMedia =
        displayMediaList[displayMediaList.indexOf(currentMedia) - 1];
    }
    displayContent();
  }

  console.log(displayMediaList);

  function displayContent() {
    mediaTitle.textContent = currentMedia.title;

    // displayMediaList.forEach((el) => {
    if (currentMedia.type == "jpg") {
      mediaVid.replaceWith(mediaImg);
      mediaContainer.appendChild(mediaImg);
      mediaImg.alt = media.alt;

      //   const mediaVid = document.createElement("video");
      //   mediaVid.controls = true;
      //   mediaVid.src = "./sources/img/2_big/" + media.link;
      //   mediaTitle.textContent = currentMedia.title;
      //   mediaContainer.append(mediaVid);
      //   // mediaVid.replaceWith(img);
      //   const mediaImg = document.createElement("img");
      //
      //   mediaImg.src = "./sources/img/2_big/" + media.link;
      //   mediaContainer.append(mediaImg);
    } else if (media.type == "mp4") {
      // mediaContainer.removeChild();
      mediaImg.replaceWith(mediaVid);

      mediaVid.setAttribute("alt", media.alt);

      mediaContainer.appendChild(mediaVid);

      mediaVid.controls = true;
      mediaVid.autoplay = true;
      mediaVid.loop = true;

      // console.log(displayMediaList[0].type);
      // mediaContainer.append(mediaImg);
      // if (currentMedia.type == "mp4") {
      //   mediaVid.controls = true;
      //   mediaVid.src = "./sources/img/2_big/" + media.link;
      // } else if (currentMedia.type === "jpg") {
      //   mediaImg.alt = media.alt;

      //   mediaImg.src = "./sources/img/2_big/" + media.link;
      // }
    }
  }
}
