export class MediumList {
  constructor() {
    this.mediaList = [];
  }

  addMedia(media) {
    this.mediaList.push(media);
  }

  getTags(tags) {
    console.log(tags);
  }
}
