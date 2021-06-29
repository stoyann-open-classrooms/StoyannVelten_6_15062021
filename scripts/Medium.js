export class Medium {
  createMedia(
    type,
    alt,
    date,
    id,
    link,
    likes,
    photographerId,
    tags,
    title,
    path
  ) {
    if (type == "jpg") {
      const photo = new Photo();

      photo.alt = alt;
      photo.date = new Date(date);
      photo.id = id;
      photo.link = link;
      photo.likes = likes;
      photo.photographerId = photographerId;
      photo.tags = tags;
      photo.title = title;
      photo.path = path + link;

      return photo;
    } else if (type == "mp4") {
      const video = new Video();

      video.alt = alt;
      video.date = new Date(date);
      video.id = id;
      video.link = link;
      video.likes = likes;
      video.photographerId = photographerId;
      video.tags = tags;
      video.title = title;
      return video;
    }
  }
}

export class Photo extends Medium {
  // createImg() {
  //   console.log(photo);
  //   photo.push(mediaList);
  // }
  createImg() {
    const linkToSmalPhoto = `./sources/img/1_small/`;
    const cardsMediaImg = document.createElement("img");
    cardsMediaImg.src = linkToSmalPhoto + this.link;
    cardsMediaImg.alt = this.alt;
    cardsMediaImg.classList.add("cards-media-img");
    // cardsMediaImgContainer.append(cardsMediaImg);
    return cardsMediaImg;
  }
}

export class Video extends Medium {
  createImg(controls = true) {
    const linkToSmalPhoto = `./sources/img/1_small/`;
    const cardsMediaVideo = document.createElement("video");
    cardsMediaVideo.controls = controls;
    cardsMediaVideo.loop = true;
    cardsMediaVideo.muted = true;
    cardsMediaVideo.src = linkToSmalPhoto + this.link;
    cardsMediaVideo.alt = this.alt;
    cardsMediaVideo.classList.add("cards-media-img");
    return cardsMediaVideo;

    // cardsMediaVideoContainer.append(cardsMediaImg);
  }
}
