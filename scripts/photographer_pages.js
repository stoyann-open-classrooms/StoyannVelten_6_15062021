// import { Photographers } from "./Photographers.js";
// import { PhotographerList } from "./PhotographerList.js";

const linkToData = "data/FishEyeDataFR.json";
const urlParams = new URLSearchParams(window.location.search);
const banner = document.querySelector(".banner");

fetch(linkToData)
  .then((reponse) => reponse.json())
  .then((data) => {
    displayBanner(data);
  });

function displayBanner(data) {
  data.photographers.forEach((photographer) => {
    if (photographer.id === Number(urlParams.get("id"))) {
      const linkToPhoto =
        "./sources/img/PhotographersID/" + photographer.portrait;
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
      banerTitle.textContent = photographer.name;
      banerLocation.textContent =
        photographer.city + " ," + photographer.country;

      banerTagline.textContent = photographer.tagline;
      tagsSpan.textContent = photographer.tags;
      btnBaner.setAttribute("type", "button");
      bannerImg.src = linkToPhoto;
      btnBaner.textContent = "Contactez-moi";
      banner.appendChild(banerBody);
      banerBody.appendChild(banerTitle);
      banerBody.appendChild(banerLocation);
      banerBody.appendChild(banerTagline);
      banerBody.appendChild(containerTagsBanner);
      containerTagsBanner.appendChild(tagsLink);
      tagsLink.appendChild(tagsSpan);
      banner.appendChild(containerBtnBaner);
      containerBtnBaner.appendChild(btnBaner);
      banner.appendChild(containerImgBanner);
      containerImgBanner.appendChild(bannerImg);
    }
  });
}
