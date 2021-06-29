export class PhotographerList {
  constructor() {
    this.photographerList = [];
  }
  // ajouter les ojets photographe dans un tableau
  addPhotographer(photographer) {
    this.photographerList.push(photographer);
  }
  // retourne qui trie les photographes selon les tags
  getPhotographerList(...tags) {
    let returnedList = [];

    if (tags.length !== 0) {
      this.photographerList.forEach((photograph) => {
        photograph.tags.forEach((tag) => {
          if (tags.includes(tag) && !returnedList.includes(photograph)) {
            returnedList.push(photograph);
          }
        });
      });
    } else {
      returnedList = this.photographerList.slice();
    }

    return returnedList;
  }

  // retourne un tableau qui contient tous les tags
  getAllTags() {
    const tags = [];

    this.photographerList.forEach((photographer) => {
      photographer.tags.forEach((tag) => {
        tags.push(tag);
      });
    });

    return new Set(tags);
  }
  // retourne un photographe depuis son ID
  getPhotographerById(id) {
    for (const photographer of this.photographerList) {
      if (photographer.id === id) {
      }
    }
  }
}
