/**
 * @module dropdownMenu
 */

function sortByDate(filter) {
  filter.addEventListener("click", (e) => {
    filter.classList.add(".sort-option-selected");
  });
}

function sortByPopularity(filter) {
  filter.addEventListener("click", (e) => {
    filter.classList.add(".sort-option-selected");
  });
}

function sortByTitle(filter) {
  filter.addEventListener("click", (e) => {
    filter.classList.add(".sort-option-selected");
  });
}
export { sortByDate, sortByPopularity, sortByTitle };
