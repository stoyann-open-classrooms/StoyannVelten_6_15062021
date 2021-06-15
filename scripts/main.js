import { Photographers } from "./Photographers.js";
import { PhotographerList } from "./PhotographerList.js";
const photographerList = new PhotographerList();

const linkToData = "sources/data/FishEyeDataFR.json";

fetch(linkToData)
  .then((reponse) => reponse.json())
  .then((data) => {
    // console.log(data);
    createPhotographerList(data);
    displayPage();
  });

// console.log(PhotographerList);
function createPhotographerList(fetchedData) {
  fetchedData.photographers.forEach((photographer) => {
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

  // console.log(photographerList.getAllTags());
}

// affiche les elements de la page
function displayPage() {
  displayTags();
  displayPhotographers();
}

// creation et affichages des tags (header) plus ajout toggle au cick
function displayTags() {
  const tagList = document.querySelector(".tag-list");

  photographerList.getAllTags().forEach((tag) => {
    const a = document.createElement("a");
    const span = document.createElement("span");
    a.href = "#";
    a.textContent = "#" + tag;
    a.setAttribute("aria-labelledby", `${tag}`);

    span.id = `${tag}`;
    span.classList.add("sr-only");

    tagList.append(a);
    tagList.append(span);

    a.addEventListener("click", (e) => {
      e.preventDefault();
      a.classList.toggle("tag--selected");
      displayPhotographers();
      console.log(tag);
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
  console.log(filters);

  photographerList.getPhotographerList(...filters).forEach((photographer) => {
    const linkToPage = "photographerPage.html?id=" + photographer.id;
    const linkToPhoto =
      "./sources/img/PhotographersID/" + photographer.portrait;
    const cardPhotographer = document.createElement("section");
    const cardLink = document.createElement("a");
    const cardImg = document.createElement("img");
    const cardTitle = document.createElement("h2");
    const cardLocation = document.createElement("p");
    const cardTagline = document.createElement("p");
    const cardPrice = document.createElement("p");
    const cardTags = document.createElement("div");

    cardPhotographer.classList.add("photographer-cards");
    cardImg.classList.add("cards-img");
    cardTitle.classList.add("cards-title");
    cardLocation.classList.add("cards-location");
    cardTagline.classList.add("cards-tagline");
    cardPrice.classList.add("cards-price");
    cardTags.classList.add("cards-tags");

    cardLink.href = linkToPage;
    cardLink.setAttribute("role", "link");
    cardImg.src = linkToPhoto;
    cardTitle.textContent = photographer.name;
    cardLocation.textContent = photographer.city + ", " + photographer.country;
    cardTagline.textContent = photographer.tagline;
    cardPrice.textContent = photographer.price + "€/Jour";
    main.append(cardLink);
    cardLink.append(cardPhotographer);
    cardPhotographer.append(
      cardImg,
      cardTitle,
      cardLocation,
      cardTagline,
      cardPrice,
      cardTags
    );
  });
}
