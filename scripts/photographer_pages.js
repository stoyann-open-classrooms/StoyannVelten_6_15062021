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

      const banerTitle = document.createElement("h1");
      const banerLocation = document.createElement("p");
      banerTitle.textContent = photographer.name;
      banner.appendChild(banerTitle);
      banerLocation.textContent =
        photographer.city + " ," + photographer.country;
      banner.appendChild(banerLocation);
    }
  });
}
