export class MediumList {
  constructor() {
    this.mediaList = [];
  }

  addMedia(media) {
    this.mediaList.push(media);
  }
  getTags(...tags) {
    console.log(tags);
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
