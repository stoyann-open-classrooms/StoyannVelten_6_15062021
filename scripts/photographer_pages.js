const linkToData = "data/FishEyeDataFR.json";
const urlParams = new URLSearchParams(window.location.search);
const banner = document.querySelector(".banner");
let currentPhotographerId;

fetch(linkToData)
  .then((reponse) => reponse.json())
  .then((data) => {
    displayBanner(data);
    // createData(data);
  });

// }

function displayBanner(data) {
  data.photographers.forEach((photographer) => {
    if (photographer.id === Number(urlParams.get("id"))) {
      const linkToPhoto =
        "./sources/img/PhotographersID/" + photographer.portrait;

      currentPhotographerId = photographer.id;
      // ajoute le nom du photographe sur le titre de la page
      document.title += " - " + photographer.name;
      // création de la banniere
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
      const bannerModal = document.createElement("form");
      const modalClose = document.createElement("p");
      const modalTitle = document.createElement("h3");

      banerTitle.textContent = photographer.name;
      banerLocation.textContent =
        photographer.city + " ," + photographer.country;
      bannerModal.classList.add("banner-modal");
      banerTagline.textContent = photographer.tagline;
      tagsSpan.textContent = photographer.tags;
      btnBaner.setAttribute("type", "button");
      bannerImg.src = linkToPhoto;
      btnBaner.textContent = "Contactez-moi";
      banner.append(banerBody, containerBtnBaner, containerImgBanner);
      modalTitle.textContent = `Contactez-Moi ${photographer.name}`;
      modalClose.textContent = "X";

      banerBody.append(
        banerTitle,
        banerLocation,
        banerTagline,
        containerTagsBanner
      );

      containerTagsBanner.appendChild(tagsLink);
      tagsLink.appendChild(tagsSpan);
      containerBtnBaner.appendChild(btnBaner);
      containerImgBanner.appendChild(bannerImg);
      banerBody.append(bannerModal);
      bannerModal.append(modalTitle, modalClose);

      //  ouvrir la modal de la bannieres
      btnBaner.addEventListener("click", () => {
        bannerModal.style.opacity = "1";
        console.log("hello");
      });

      modalClose.addEventListener("click", () => {
        bannerModal.style.opacity = "0";
      });
    }
  });
  console.log(currentPhotographerId);
}
