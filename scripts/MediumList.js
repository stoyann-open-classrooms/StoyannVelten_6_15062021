/**
 * @module MediumList
 */
/**
 * Class pour creer un tableau constructor avec des methodes de tri sur les objets instancié avec la class Medium
 */
export class MediumList {
  constructor() {
    this.mediaList = [];
  }

  addMedia(media) {
    this.mediaList.push(media);
  }

  getMediaList(...tags) {
    const localMediaList = this.mediaList.slice();
    let returnedList = [];

    if (tags.length !== 0) {
      localMediaList.forEach((media) => {
        media.tags.forEach((tag) => {
          if (tags.includes(tag) && !returnedList.includes(media)) {
            returnedList.push(media);
          }
        });
      });
    } else {
      returnedList = localMediaList.slice();
    }

    return returnedList;
  }
}
