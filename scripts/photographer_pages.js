import { Photographers } from "./Photographers.js";
import { PhotographerList } from "./PhotographerList.js";

const linkToData = "data/FishEyeDataFR.json";
const urlParams = new URLSearchParams(window.location.search);
const banner = document.querySelector(".banner");

let currentPhotographer = new PhotographerList();

fetch(linkToData)
  .then((reponse) => reponse.json())
  .then((data) => {
    getCurrentPhoptographer(data);
    displayBanner();
  });

function getCurrentPhoptographer(data) {
  data.photographers.forEach((photographer) => {
    if (photographer.id === Number(urlParams.get("id"))) {
      currentPhotographer.addPhotographer(
        new Photographers(
          photographer.name,
          photographer.id,
          photographer.city,
          photographer.country,
          photographer.tags,
          photographer.tagline,
          photographer.price,
          photographer.portrait
        )
      );
      console.log(photographer);
    }
  });
}

function displayBanner() {
  // ajoute le nom du photographe sur le titre de la page
  document.title += " - " + photographer.name;
  // création de la banniere
  const banerBody = document.createElement("div");
  const banerTitle = document.createElement("h1");
  const banerLocation = document.createElement("p");
  const banerTagline = document.createElement("p");
  banerTitle.textContent = photographer.name;
  banerLocation.textContent = photographer.city + " ," + photographer.country;

  banerTagline.textContent = photographer.tagline;
  banner.appendChild(banerBody);
  banerBody.appendChild(banerTitle);
  banerBody.appendChild(banerLocation);
  banerBody.appendChild(banerTagline);
}
