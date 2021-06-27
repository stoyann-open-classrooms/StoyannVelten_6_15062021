// import { Medium } from "./Medium";
import { Photographers } from "./Photographers.js";
import { MediumList } from "./MediumList.js";
import { Medium, Video } from "./Medium.js";
const linkToData = "data/FishEyeDataFR.json";
const urlParams = new URLSearchParams(window.location.search);
const mediaList = new MediumList();
let currentPhotographer;
const banner = document.querySelector(".banner");
const main = document.querySelector(".main");

let totalLikes = [];

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
  for (let i of data.media) {
    if (currentPhotographer.id === i.photographerId) {
      // console.log(i);
      getLikes(i.likes);
      const mediaFactory = new Medium(
        i.image?.split(".").pop() || i.video?.split(".").pop(),
        i.alt,
        i.image || i.video,
        i.likes,
        i.photographerId,
        i.tags,
        i.title,
        i.id,
        i.date,
        currentPhotographer.name.toLowerCase().replace(" ", "") + "/"
      );
      mediaList.addMedia(mediaFactory);
    }
  }

  // console.log(totalLikes);
  getTotalLikes(totalLikes);
  // data.media.forEach((media) => {
  //   if (currentPhotographer.id === media.photographerId) {
  //     mediaList.addMedia(
  //       mediaFactory.createMedia(
  //         media.image?.split(".").pop() || media.video?.split(".").pop(),
  //         media.alt,
  //         media.image || media.video,
  //         media.likes,
  //         media.photographerId,
  //         media.tags,
  //         media.title,
  //         media.id,
  //         media.date,

  //         currentPhotographer.name.toLowerCase().replace(" ", "") + "/"
  //       )
  //     );
  //   }
  // });
  console.log(currentPhotographer);
}
console.log(mediaList instanceof MediumList);

function displayPage() {
  document.title += " - " + currentPhotographer.name;
  displayBanner();
  openModalForm();
  closeModalForm();
  validForm();
}

function displayBanner() {
  const linkToPhoto =
    "./sources/img/1_small/PhotographersID/" + currentPhotographer.portrait;
  // console.log(linkToPhoto);
  //  création des elements html
  const banerBody = document.createElement("div");
  const banerTitle = document.createElement("h1");
  const banerLocation = document.createElement("p");
  const banerTagline = document.createElement("p");
  const containerTagsBanner = document.createElement("div");
  const containerImgBanner = document.createElement("div");
  const bannerImg = document.createElement("img");
  const btnModal = document.createElement("button");

  // ajouts des classes et attributs html

  banerBody.classList.add("banner-body");
  btnModal.classList.add("banner-btn");
  containerImgBanner.classList.add("banner-img");
  banerTitle.classList.add("banner-body-title");
  banerLocation.classList.add("banner-body-location");
  banerTagline.classList.add("banner-body-tagline");
  banerTagline.classList.add("banner-body-tagline");
  bannerImg.src = linkToPhoto;
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

function openModalForm() {
  const banerBody = document.querySelector(".banner-body");
  const bannerBtnTablet = document.querySelector(".banner-btn");
  const btnModalMobile = document.querySelector(".btn-modal-mobile");
  const bannerModal = document.createElement("div");
  const bannerModalContent = document.createElement("div");
  const bannerModalValidationMsg = document.createElement("div");
  const bannerModalHeader = document.createElement("div");
  const modalClose = document.createElement("i");
  const modalTitle = document.createElement("h3");
  const bannerForm = document.createElement("form");
  const formFirstName = document.createElement("label");
  const formFirstNameInp = document.createElement("input");
  const messageAlertFirst = document.createElement("span");

  const formLastName = document.createElement("label");
  const formLastNameInp = document.createElement("input");
  const messageAlertLast = document.createElement("span");

  const formEmail = document.createElement("label");
  const formEmailInp = document.createElement("input");
  const messageAlertMail = document.createElement("span");

  const formTxt = document.createElement("label");
  const formTxtInp = document.createElement("textarea");
  const messageAlertMsg = document.createElement("span");

  const formBtn = document.createElement("button");

  bannerModal.classList.add("contact-modal");
  bannerModalValidationMsg.classList.add("modal-validation-msg");
  modalClose.classList.add("fas");
  modalClose.classList.add("fa-times");
  bannerModalHeader.classList.add("modal-header");
  bannerForm.classList.add("modal-form");
  messageAlertFirst.classList.add("message-alert");
  messageAlertLast.classList.add("message-alert");
  messageAlertMail.classList.add("message-alert");
  messageAlertMsg.classList.add("message-alert");

  formFirstNameInp.classList.add("firstName-inp");
  formFirstNameInp.id = "prenom";
  formFirstName.setAttribute("for", "prenom");
  formFirstNameInp.setAttribute("type", "text");
  formFirstNameInp.setAttribute("placeholder", "Jean");
  formFirstNameInp.setAttribute("maxlenght", "24");

  formLastNameInp.classList.add("lastName-inp");
  formLastNameInp.id = "nom";
  formLastName.setAttribute("for", "nom");
  formLastNameInp.setAttribute("type", "text");
  formLastNameInp.setAttribute("placeholder", "Dupont");
  formLastNameInp.setAttribute("maxlenght", "24");

  formEmailInp.classList.add("email-inp");
  formEmailInp.id = "email";
  formEmail.setAttribute("for", "email");
  formEmailInp.setAttribute("type", "email");
  formEmailInp.setAttribute("placeholder", "jean-dupont@hotmail.com");
  formBtn.setAttribute("type", "submit");
  formBtn.setAttribute("value", "Envoyer");

  formTxtInp.classList.add("msg-inp");
  formTxtInp.id = "msg";
  formTxt.setAttribute("for", "msg");
  formTxtInp.setAttribute("type", "text");
  formTxtInp.setAttribute("placeholder", "Votre message");

  bannerModalContent.classList.add("modal-content");
  btnModalMobile.setAttribute("type", "button");

  modalTitle.innerHTML = `Contactez-Moi <br>${currentPhotographer.name}`;

  formFirstName.innerHTML = "Prénom";
  messageAlertFirst.textContent = "Vous devez entrer votre prénom !";
  messageAlertLast.textContent = "Vous devez entrer votre nom !";
  messageAlertMail.textContent = "Vous devez entrer un Email valide ! ";
  messageAlertMsg.textContent = "Votre devez entrer un message ! ";
  formLastName.innerHTML = "Nom";
  formEmail.innerHTML = "Email<br>";
  formTxt.innerHTML = "Votre Message<br>";
  formBtn.textContent = "Envoyer";
  // bannerModalValidationMsg.textContent = `Votre message a bien été envoyé à ${currentPhotographer.name} `;

  banerBody.append(bannerModal);
  bannerModal.append(bannerModalContent);
  bannerModalContent.append(bannerModalHeader, bannerForm);
  bannerModalHeader.append(modalTitle, modalClose);
  bannerForm.append(
    formFirstName,
    formFirstNameInp,
    messageAlertFirst,
    formLastName,
    formLastNameInp,
    messageAlertLast,
    formEmail,
    formEmailInp,
    messageAlertMail,
    formTxt,
    formTxtInp,
    messageAlertMsg,

    formBtn
  );

  bannerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    modalTitle.textContent = `Votre message a bien été envoyé à ${currentPhotographer.name} `;
    bannerForm.style.display = "none";
    modalTitle.style.animation = "apparition-down 0.8s ease-in-out";
    modalTitle.style.margin = "65% 0";
    modalTitle.style.fontSize = "30px";
  });
  //open modal
  btnModalMobile.addEventListener("click", () => {
    bannerModal.style.display = "flex";
  });
  bannerBtnTablet.addEventListener("click", () => {
    bannerModal.style.display = "flex";
  });
}
function closeModalForm() {
  const modalClose = document.querySelector(".fa-times");
  const bannerModal = document.querySelector(".contact-modal");

  modalClose.addEventListener("click", () => {
    bannerModal.style.display = "none";
  });
}

function validForm() {
  // event.prevenDEfault();
  const formFirstNameInp = document.querySelector(".firstName-inp");
  const formLastNameInp = document.querySelector(".lastName-inp");
  const formEmailInp = document.querySelector(".email-inp");
  const formMsgInp = document.querySelector(".msg-inp");

  const errorMessage = document.querySelectorAll(".message-alert");

  formFirstNameInp.addEventListener("input", (e) => {
    if (e.target.value.length <= 3) {
      errorMessage[0].style.display = "inline";
      formFirstNameInp.classList.add("echec");
      formFirstNameInp.classList.add("border");

      setTimeout(() => {
        formFirstNameInp.classList.remove("echec");
      }, 500);
    } else {
      errorMessage[0].style.display = "none";
    }
  });
  formLastNameInp.addEventListener("input", (e) => {
    if (e.target.value.length <= 3) {
      errorMessage[1].style.display = "inline";
      formLastNameInp.classList.add("echec");
      formLastNameInp.classList.add("border");

      setTimeout(() => {
        formLastNameInp.classList.remove("echec");
      }, 500);
    } else {
      errorMessage[1].style.display = "none";
    }
  });
  formEmailInp.addEventListener("input", (e) => {
    const regexMail = /\S+@\S+\.\S+/;
    if (e.target.value.search(regexMail) === 0) {
      errorMessage[2].style.display = "none";
    } else if (e.target.value.search(regexMail) === -1) {
      errorMessage[2].style.display = "inline";
      formEmailInp.classList.add("echec");
      formEmailInp.classList.add("border");

      setTimeout(() => {
        formEmailInp.classList.remove("echec");
      }, 500);
    }
  });
  formMsgInp.addEventListener("input", (e) => {
    if (e.target.value.length <= 3) {
      errorMessage[3].style.display = "inline";
      formMsgInp.classList.add("echec");
      formMsgInp.classList.add("border");

      setTimeout(() => {
        formMsgInp.classList.remove("echec");
      }, 500);
    } else {
      errorMessage[3].style.display = "none";
    }
  });
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
  console.log(totalLikesPhotographer);
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
