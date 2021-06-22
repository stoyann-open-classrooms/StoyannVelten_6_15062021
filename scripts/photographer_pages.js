const linkToData = "data/FishEyeDataFR.json";
const urlParams = new URLSearchParams(window.location.search);
const banner = document.querySelector(".banner");
const main = document.querySelector(".main");

let currentPhotographerId;
const btnModalMobile = document.querySelector(".btn-modal-mobile");
const banerBody = document.createElement("div");
const containerBtnBaner = document.createElement("div");
const btnBaner = document.createElement("button");
const banerTitle = document.createElement("h1");
const banerLocation = document.createElement("p");
const banerTagline = document.createElement("p");
const containerTagsBanner = document.createElement("div");
const tagsLink = document.createElement("a");
const tagsSpan = document.createElement("span");
const containerImgBanner = document.createElement("div");
const bannerImg = document.createElement("img");
const bannerModal = document.createElement("div");
const bannerModalHeader = document.createElement("div");
const modalClose = document.createElement("p");
const modalTitle = document.createElement("h3");
const bannerForm = document.createElement("form");
const formFirstName = document.createElement("label");
const formFirstNameInp = document.createElement("input");
const formLastName = document.createElement("label");
const formLastNameInp = document.createElement("input");
const formEmail = document.createElement("label");
const formEmailInp = document.createElement("input");
const formTxt = document.createElement("label");
const formTxtInp = document.createElement("textarea");
const formBtn = document.createElement("button");

fetch(linkToData)
  .then((reponse) => reponse.json())
  .then((data) => {
    displayBanner(data);
    displayMedia(data);
  });

// }
function displayMedia(data) {
  data.media.forEach((media) => {
    if (currentPhotographerId === media.photographerId) {
      const linkToPhoto = `sources/img/${media.image}`;
      const cardsMediaLink = document.createElement("a");
      const cardsMedia = document.createElement("div");
      const cardsMediaImgContainer = document.createElement("div");
      const cardsMediaImg = document.createElement("img");
      const cardsMediaFooter = document.createElement("div");
      const cardsMediaHeaderTitle = document.createElement("h3");
      const cardsMediaHeaderLike = document.createElement("div");
      const heartLink = document.createElement("a");
      const likeCompteur = document.createElement("div");
      const likeheart = document.createElement("i");
      let title = `${media.title}`;
      cardsMediaLink.classList.add("cards-media-link");
      cardsMedia.classList.add("cards-media");
      cardsMediaImgContainer.classList.add("cards-media-img");
      cardsMediaImg.classList.add("cards-Img");
      cardsMediaFooter.classList.add("cards-media-footer");
      cardsMediaHeaderTitle.classList.add("cards-media-title");
      cardsMediaHeaderLike.classList.add("header-like");
      likeCompteur.classList.add("compteur");
      heartLink.classList.add("heart-link");
      likeheart.classList.add(`far`);
      likeheart.classList.add(`fa-heart`);
      likeheart.classList.add(`heart`);

      cardsMediaImg.src = linkToPhoto;

      cardsMediaHeaderTitle.textContent = `${title}`;

      likeCompteur.textContent = `${media.likes}`;

      main.append(cardsMedia);
      cardsMedia.append(cardsMediaLink);
      cardsMediaLink.append(cardsMediaImgContainer);
      cardsMedia.append(cardsMediaLink, cardsMediaFooter);
      cardsMediaImgContainer.append(cardsMediaImg);
      cardsMediaFooter.append(cardsMediaHeaderTitle, cardsMediaHeaderLike);

      cardsMediaHeaderLike.append(likeCompteur, heartLink);
      heartLink.append(likeheart);
      console.log(media);
      console.log(media.likes);
      // compteur de likes
      heartLink.addEventListener("click", () => {
        if (likeheart.classList.contains("fas")) {
          media.likes--;
          likeheart.classList.remove("fas");
          likeheart.classList.add("far");
          likeCompteur.textContent = `${media.likes}`;
        } else {
          media.likes++;
          likeheart.classList.remove("far");
          likeheart.classList.add("fas");
          likeCompteur.textContent = `${media.likes}`;
        }
      });
    }
  });
}

function displayBanner(data) {
  data.photographers.forEach((photographer) => {
    if (photographer.id === Number(urlParams.get("id"))) {
      const linkToPhoto =
        "./sources/img/PhotographersID/" + photographer.portrait;

      currentPhotographerId = photographer.id;
      document.title += " - " + photographer.name;

      // création des elements html
      const banerBody = document.createElement("div");
      const containerBtnBaner = document.createElement("div");
      const btnBaner = document.createElement("button");
      const banerTitle = document.createElement("h1");
      const banerLocation = document.createElement("p");
      const banerTagline = document.createElement("p");
      const containerTagsBanner = document.createElement("div");

      const containerImgBanner = document.createElement("div");
      const bannerImg = document.createElement("img");
      const bannerModal = document.createElement("div");
      const bannerModalContent = document.createElement("div");
      const bannerModalHeader = document.createElement("div");
      const modalClose = document.createElement("i");
      const modalTitle = document.createElement("h3");
      const bannerForm = document.createElement("form");
      const formFirstName = document.createElement("label");
      const formFirstNameInp = document.createElement("input");
      const formLastName = document.createElement("label");
      const formLastNameInp = document.createElement("input");
      const formEmail = document.createElement("label");
      const formEmailInp = document.createElement("input");
      const formTxt = document.createElement("label");
      const formTxtInp = document.createElement("textarea");
      const formBtn = document.createElement("button");

      // ajouts des classes et attributs html
      bannerModal.classList.add("banner-modal");
      banerBody.classList.add("banner-body");
      containerBtnBaner.classList.add("banner-btn");
      containerImgBanner.classList.add("banner-img");
      banerTitle.classList.add("banner-body-title");
      banerLocation.classList.add("banner-body-location");
      banerTagline.classList.add("banner-body-tagline");
      banerTagline.classList.add("banner-body-tagline");
      bannerModal.classList.add("contact-modal");
      btnBaner.classList.add("btn-banner");
      modalClose.classList.add("fas");
      modalClose.classList.add("fa-times");
      bannerModalContent.classList.add("modal-content");

      bannerImg.src = linkToPhoto;
      btnBaner.setAttribute("type", "button");
      btnModalMobile.setAttribute("type", "button");

      // ajout du contenu html
      banerTitle.textContent = photographer.name;
      banerLocation.textContent =
        photographer.city + " ," + photographer.country;
      banerTagline.textContent = photographer.tagline;
      btnBaner.textContent = "Contactez-moi";
      modalTitle.innerHTML = `Contactez-Moi <br>${photographer.name}`;

      formFirstName.innerHTML = "Prénom";
      formLastName.innerHTML = "Nom";
      formEmail.innerHTML = "Email<br>";
      formTxt.innerHTML = "Votre Message<br>";
      formBtn.textContent = "Envoyer";
      // open modal
      btnModalMobile.addEventListener("click", () => {
        bannerModal.style.display = "flex";
      });
      // close modal
      modalClose.addEventListener("click", () => {
        bannerModal.style.display = "none";
      });

      // ajouts des tags
      photographer.tags.forEach((el) => {
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
      banner.append(banerBody, containerBtnBaner, containerImgBanner);
      banerBody.append(
        banerTitle,
        banerLocation,
        banerTagline,
        containerTagsBanner
      );

      containerBtnBaner.appendChild(btnBaner);
      containerImgBanner.appendChild(bannerImg);
      banerBody.append(bannerModal);
      bannerModal.append(bannerModalContent);
      bannerModalContent.append(bannerModalHeader, bannerForm);
      bannerModalHeader.append(modalTitle, modalClose);
      bannerForm.append(
        formFirstName,
        formFirstNameInp,
        formLastName,
        formLastNameInp,
        formEmail,
        formEmailInp,
        formTxt,
        formTxtInp,
        formBtn
      );
    }
  });
  // console.log(currentPhotographerId);
}

console.log(btnModalMobile);
