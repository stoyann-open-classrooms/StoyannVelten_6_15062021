/**
 * @module dropdownMenu
 */

function sortByDate(filter) {
  filter.addEventListener("click", (e) => {
    console.log("trie par date");
  });
}

function sortByPopularity(filter) {
  filter.addEventListener("click", (e) => {
    console.log("trie par popularite");
  });
}

function sortByTitle(filter) {
  filter.addEventListener("click", (e) => {
    console.log("trie par titre");
  });
}
export { sortByDate, sortByPopularity, sortByTitle };
