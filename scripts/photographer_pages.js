import { Photographers } from "./Photographers.js";
import { MediumList } from "./MediumList.js";
import { Medium } from "./Medium.js";
import { displayBanner } from "./bannerPhotographer.js";
import { openModalForm, closeModalForm, validForm } from "./modale.js";
import { openLightbox } from "./lightbox.js";

const linkToData = "data/FishEyeDataFR.json";
const urlParams = new URLSearchParams(window.location.search);
const mediaList = new MediumList();
let mediaFactory = new Medium();

let currentPhotographer;
let totalLikes = [];

const main = document.querySelector(".main");

function createContent() {
  fetch(linkToData)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        console.log("erreur");
      }
    })

    .then((data) => createData(data))

    .then(displayPage);
}

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
          media.id,
          media.photographerId,
          media.image || media.video,
          media.tags,
          media.likes,
          media.date,
          media.price,
          currentPhotographer.name.toLowerCase().replace(" ", "") + "/"
        )
      );
    }
  });

  console.log(mediaList);
}

function displayPage() {
  document.title += " - " + currentPhotographer.name;
  displayBanner(currentPhotographer);
  openModalForm(currentPhotographer);
  closeModalForm();
  validForm();
  openLightbox();
  getTotalLikes(totalLikes);
}

function getLikes(likes) {
  totalLikes.push(likes);
  return totalLikes;
}

function getTotalLikes(totalLikes) {
  let totalLikesPhotographer = 0;
  for (let i = 0; i < totalLikes.length; i++) {
    totalLikesPhotographer += totalLikes[i];
  }
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

  return totalLikesPhotographer;
}
createContent();

// mediaList.forEach((el) => {
//   const cardsMediaLink = document.createElement("a");
//   const cardsMedia = document.createElement("div");
//   const cardsMediaImgContainer = document.createElement("div");
//   const cardsMediaImg = document.createElement("img");
//   const cardsMediaFooter = document.createElement("div");
//   const cardsMediaHeaderTitle = document.createElement("h3");
//   const heartLink = document.createElement("a");
//   const likeCompteur = document.createElement("div");
//   const likeheart = document.createElement("i");

//   cardsMediaLink.classList.add("cards-media-link");
//   cardsMedia.classList.add("cards-media");
//   cardsMediaImgContainer.classList.add("cards-media-img");
//   cardsMediaImg.classList.add("cards-Img");
//   cardsMediaFooter.classList.add("cards-media-footer");
//   cardsMediaHeaderTitle.classList.add("cards-media-title");
//   cardsMediaHeaderLike.classList.add("header-like");
//   likeCompteur.classList.add("compteur");
//   heartLink.classList.add("heart-link");
//   likeheart.classList.add(`far`);
//   likeheart.classList.add(`fa-heart`);
//   likeheart.classList.add(`heart`);

//   main.append(cardsMedia);
//   cardsMedia.append(cardsMediaLink);
//   cardsMediaLink.append(cardsMediaImgContainer);
//   cardsMedia.append(cardsMediaLink, cardsMediaFooter);
//   cardsMediaImgContainer.append(cardsMediaImg);
//   cardsMediaFooter.append(cardsMediaHeaderTitle, cardsMediaHeaderLike);
//   console.log(media);
// });

// function displayMedia() {
//   data.media.forEach((mediaList) => {
//     if (currentPhotographer === media.photographerId) {
//       const linkToPhoto = `sources/img/1_small/${media.image}`;
//       const cardsMediaLink = document.createElement("a");
//       const cardsMedia = document.createElement("div");
//       const cardsMediaImgContainer = document.createElement("div");
//       const cardsMediaImg = document.createElement("img");
//       const cardsMediaFooter = document.createElement("div");
//       const cardsMediaHeaderTitle = document.createElement("h3");
//       const cardsMediaHeaderLike = document.createElement("div");
//       const heartLink = document.createElement("a");
//       const likeCompteur = document.createElement("div");
//       const likeheart = document.createElement("i");
//       let title = `${media.title}`;
//       cardsMediaLink.classList.add("cards-media-link");
//       cardsMedia.classList.add("cards-media");
//       cardsMediaImgContainer.classList.add("cards-media-img");
//       cardsMediaImg.classList.add("cards-Img");
//       cardsMediaFooter.classList.add("cards-media-footer");
//       cardsMediaHeaderTitle.classList.add("cards-media-title");
//       cardsMediaHeaderLike.classList.add("header-like");
//       likeCompteur.classList.add("compteur");
//       heartLink.classList.add("heart-link");
//       likeheart.classList.add(`far`);
//       likeheart.classList.add(`fa-heart`);
//       likeheart.classList.add(`heart`);

//       cardsMediaImg.src = linkToPhoto;

//       cardsMediaHeaderTitle.textContent = `${title}`;

//       likeCompteur.textContent = `${media.likes}`;

//       main.append(cardsMedia);
//       cardsMedia.append(cardsMediaLink);
//       cardsMediaLink.append(cardsMediaImgContainer);
//       cardsMedia.append(cardsMediaLink, cardsMediaFooter);
//       cardsMediaImgContainer.append(cardsMediaImg);
//       cardsMediaFooter.append(cardsMediaHeaderTitle, cardsMediaHeaderLike);

//       cardsMediaHeaderLike.append(likeCompteur, heartLink);
//       heartLink.append(likeheart);

// compteur de likes
//   heartLink.addEventListener("click", () => {
//     if (likeheart.classList.contains("fas")) {
//       media.likes--;
//       likeheart.classList.remove("fas");
//       likeheart.classList.add("far");
//       likeCompteur.textContent = `${media.likes}`;
//     } else {
//       media.likes++;
//       likeheart.classList.remove("far");
//       likeheart.classList.add("fas");
//       likeCompteur.textContent = `${media.likes}`;
//     }
//   });
// }
//   });
// }

// function displayBanner(data) {
//   data.photographers.forEach((photographer) => {
//     if (photographer.id === Number(urlParams.get("id"))) {
//       const linkToPhoto =
//         "./sources/img/1_small/PhotographersID/" + photographer.portrait;

//       currentPhotographerId = photographer.id;
//       document.title += " - " + photographer.name;

//       // création des elements html
//       const banerBody = document.createElement("div");
//       const containerBtnBaner = document.createElement("div");
//       const btnBaner = document.createElement("button");
//       const banerTitle = document.createElement("h1");
//       const banerLocation = document.createElement("p");
//       const banerTagline = document.createElement("p");
//       const containerTagsBanner = document.createElement("div");

//       const containerImgBanner = document.createElement("div");
//       const bannerImg = document.createElement("img");
//       const bannerModal = document.createElement("div");
//       const bannerModalContent = document.createElement("div");
//       const bannerModalHeader = document.createElement("div");
//       const modalClose = document.createElement("i");
//       const modalTitle = document.createElement("h3");
//       const bannerForm = document.createElement("form");
//       const formFirstName = document.createElement("label");
//       const formFirstNameInp = document.createElement("input");
//       const formLastName = document.createElement("label");
//       const formLastNameInp = document.createElement("input");
//       const formEmail = document.createElement("label");
//       const formEmailInp = document.createElement("input");
//       const formTxt = document.createElement("label");
//       const formTxtInp = document.createElement("textarea");
//       const formBtn = document.createElement("button");

//       // ajouts des classes et attributs html
//       banerBody.classList.add("banner-body");
//       containerBtnBaner.classList.add("banner-btn");
//       containerImgBanner.classList.add("banner-img");
//       banerTitle.classList.add("banner-body-title");
//       banerLocation.classList.add("banner-body-location");
//       banerTagline.classList.add("banner-body-tagline");
//       banerTagline.classList.add("banner-body-tagline");
//       bannerModal.classList.add("banner-modal");
//       btnBaner.classList.add("btn-banner");
//       bannerModal.classList.add("contact-modal");
//       modalClose.classList.add("fas");
//       modalClose.classList.add("fa-times");
//       bannerModalContent.classList.add("modal-content");
//       btnModalMobile.setAttribute("type", "button");

//       bannerImg.src = linkToPhoto;
//       btnBaner.setAttribute("type", "button");

//       // ajout du contenu html
//       banerTitle.textContent = photographer.name;
//       banerLocation.textContent =
//         photographer.city + " ," + photographer.country;
//       banerTagline.textContent = photographer.tagline;
//       btnBaner.textContent = "Contactez-moi";
//       modalTitle.innerHTML = `Contactez-Moi <br>${photographer.name}`;

//       formFirstName.innerHTML = "Prénom";
//       formLastName.innerHTML = "Nom";
//       formEmail.innerHTML = "Email<br>";
//       formTxt.innerHTML = "Votre Message<br>";
//       formBtn.textContent = "Envoyer";
//       // open modal
//       btnModalMobile.addEventListener("click", () => {
//         bannerModal.style.display = "flex";
//       });
//       // close modal
//       modalClose.addEventListener("click", () => {
//         bannerModal.style.display = "none";
//       });

//       // ajouts des tags
//       photographer.tags.forEach((el) => {
//         const tagsLink = document.createElement("a");
//         const tagsSpan = document.createElement("span");
//         containerTagsBanner.classList.add("banner-tags-container");
//         tagsLink.classList.add("tags-link");
//         tagsSpan.classList.add("tags");
//         containerTagsBanner.appendChild(tagsLink);
//         tagsSpan.textContent = "#" + el;
//         tagsLink.appendChild(tagsSpan);
//       });

//       // ajout des elements dans le DOM
//       banner.append(banerBody, containerBtnBaner, containerImgBanner);
//       banerBody.append(
//         banerTitle,
//         banerLocation,
//         banerTagline,
//         containerTagsBanner
//       );

//       containerBtnBaner.appendChild(btnBaner);
//       containerImgBanner.appendChild(bannerImg);
//       banerBody.append(bannerModal);
//       bannerModal.append(bannerModalContent);
//       bannerModalContent.append(bannerModalHeader, bannerForm);
//       bannerModalHeader.append(modalTitle, modalClose);
//       bannerForm.append(
//         formFirstName,
//         formFirstNameInp,
//         formLastName,
//         formLastNameInp,
//         formEmail,
//         formEmailInp,
//         formTxt,
//         formTxtInp,
//         formBtn
//       );
//     }
//   });
// console.log(currentPhotographerId);
//
