import { Photographers } from "./Photographers.js";
const linkToData = "data/FishEyeDataFR.json";
const urlParams = new URLSearchParams(window.location.search);
let currentPhotographer = [];
fetch(linkToData)
  .then((reponse) => reponse.json())
  .then((data) => {
    createPhotographer(data);
  });

function createPhotographer(data) {
  data.photographers.forEach((photographer) => {
    if (photographer.id === Number(urlParams.get("id"))) {
      currentPhotographer.push(
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
      return Photographers;
    }
  });
}

// function createData(fetchedData) {
//   fetchedData.photographers.forEach((photographer) => {
//     if (photographer.id === Number(urlParams.get("id"))) {
//       currentPhotographer = new Photographers(
//         photographer.name,
//         photographer.id,
//         photographer.city,
//         photographer.country,
//         photographer.tags,
//         photographer.tagline,
//         photographer.price,
//         photographer.portrait
//       );
//     }
//   });
// }

console.log(currentPhotographer);
console.log(Photographers.name);
