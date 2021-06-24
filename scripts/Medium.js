export class Medium {
  createMedia(
    alt,
    date,
    id,
    type,
    link,
    likes,
    photographerId,
    tags,
    title,
    path
  ) {
    if (type === "jpg") {
      const photo = new Photo();
      this.alt = alt;
      this.date = new Date(date);
      this.id = id;
      this.link = link;
      this.likes = likes;
      this.photographerId = photographerId;
      this.tags = tags;
      this.title = title;
      this.path = path + link;
      return photo;
    } else if (type === "mp4") {
      const video = new Video();
      this.alt = alt;
      this.date = new Date(date);
      this.id = id;
      this.link = path + link;
      this.likes = likes;
      this.photographerId = photographerId;
      this.tags = tags;
      this.title = title;
      return video;
    }
  }
}
export class Photo extends Medium {
  getDomComposant() {
    const linkToSmalPhoto = `./sources/img/1_small/`;

    const cardsMediaImgContainer = document.createElement("div");
    const cardsMediaImg = document.createElement("img");

    cardsMediaImg.src = linkToSmalPhoto + this.link;
    cardsMediaImg.alt = this.alt;
    cardsMediaImgContainer.append(cardsMediaImg);
    return cardsMediaImgContainer;
  }
}

export class Video extends Medium {
  getDomComposant(controls = false) {
    const linkToSmalPhoto = `./sources/img/1_small/`;

    const cardsMediaVideoContainer = document.createElement("div");
    const cardsMediaVideo = document.createElement("video");
    video.controls = controls;
    video.muted = true;
    video.loop = true;
    cardsMediaVideo.src = linkToSmalPhoto + this.link;
    cardsMediaVideo.alt = this.alt;
    cardsMediaVideoContainer.append(cardsMediaImg);

    return cardsMediaVideoContainer;
  }
}
