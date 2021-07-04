/**
 * @module main
 */

import { Photographers } from "./Photographers.js";
import { PhotographerList } from "./photographerList.js";

const photographerList = new PhotographerList();

/**
 * name linkToData
 * @type {string}
 * @description le liens vers les données Json Fisheye
 *
 */
const linkToData = "./data/FishEyeDataFR.json";
const loader = document.querySelector(".loader-container");
window.addEventListener("load", () => {
  fetch(linkToData)
    .then((reponse) => reponse.json())
    .then((data) => {
      createPhotographerList(data);
      displayPage();

      setTimeout(function loaderAnim() {
        loader.className += " hidden";
      }, 2000);
    });
});

/**
 *créer un objet pour chaque photographe et les push dans un nouveaux tableau
 * @param {string} data linkToData
 * @returns {array}
 */
function createPhotographerList(data) {
  data.photographers.forEach((photographer) => {
    photographerList.addPhotographer(
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
  });
  return PhotographerList;
}

// affiche les elements de la page
function displayPage() {
  displayTags();
  displayPhotographers();
  displayReturnMain();
}

// creation et affichages des tags (header) plus ajout toggle au cick
function displayTags() {
  const tagList = document.querySelector(".tag-list");

  photographerList.getAllTags().forEach((tag) => {
    const a = document.createElement("a");
    const span = document.createElement("span");

    span.id = `${tag}`;
    span.classList.add("tags");
    a.classList.add("tags-link");

    tagList.append(a);
    a.append(span);
    a.href = "#";
    span.textContent = "#" + tag;
    a.setAttribute("aria-labelledby", `${tag}`);

    //ajoute la classe tag--selected si le tag est selectionner par l'uttilisateur
    a.addEventListener("click", (e) => {
      e.preventDefault();
      a.classList.toggle("tag--selected");
      displayPhotographers();
    });
  });
}

function displayPhotographers() {
  const main = document.querySelector("#main");
  const filters = [];

  main.innerHTML = "";
  document.querySelectorAll(".tag--selected").forEach((tagselected) => {
    filters.push(tagselected.textContent.replace("#", ""));
  });

  photographerList.getPhotographerList(...filters).forEach((photographer) => {
    const linkToPage = "photographerPage.html?id=" + photographer.id;
    const linkToPhoto =
      "./sources/img/PhotographersID/" + photographer.portrait;
    const cardPhotographer = document.createElement("section");
    const cardLink = document.createElement("a");
    const cardImg = document.createElement("img");
    const cardTitle = document.createElement("h2");
    const cardBody = document.createElement("div");
    const cardLocation = document.createElement("p");
    const cardTagline = document.createElement("p");
    const cardPrice = document.createElement("p");
    const cardTags = document.createElement("nav");
    const modalBg = document.createElement("form");

    photographer.tags.forEach((el) => {
      const tagsA = document.createElement("a");
      const tagsspan = document.createElement("span");
      cardTags.classList.add("cards-tags");
      tagsspan.textContent = photographer.tags;
      cardTags.append(tagsA);
      tagsA.append(tagsspan);
      tagsspan.textContent = "#" + el;
      tagsA.classList.add("tags-link");
      tagsspan.classList.add("tags");

      tagsA.setAttribute("aria-labelledby", `${el}`);

      tagsA.href = linkToPage + "&tag=" + el;
    });

    cardPhotographer.classList.add("photographer-cards");
    cardImg.classList.add("cards-img");
    cardTitle.classList.add("cards-title");
    cardLocation.classList.add("cards-location");
    cardLink.classList.add("cards-photographer-link");
    cardTagline.classList.add("cards-tagline");
    cardPrice.classList.add("cards-price");
    modalBg.classList.add("modal");
    cardBody.classList.add("cards-body");

    cardLink.setAttribute("role", "link");
    cardLink.href = linkToPage;
    cardImg.src = linkToPhoto;
    cardImg.alt = "";

    cardTitle.textContent = photographer.name;
    cardLocation.textContent = photographer.city + ", " + photographer.country;
    cardTagline.textContent = photographer.tagline;
    cardPrice.textContent = photographer.price + "€/Jour";

    main.append(cardPhotographer);
    cardLink.append(cardImg, cardTitle);
    cardPhotographer.append(cardLink, cardBody);
    cardBody.append(cardLocation, cardTagline, cardPrice, cardTags);
  });
}

function displayReturnMain() {
  const returnMain = document.querySelector(".return-main ");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      returnMain.style.display = "block";
    } else {
      returnMain.style.display = "none";
    }
  });
}
