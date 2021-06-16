export class Media {
  createMedia(id, photographerId, type, link, tags, likes, date, price, path) {
    if (type === "jpg") {
      const photo = new Photo();
      photo.title = link.replace(".jpg", "").replaceAll("_", " ");
      photo.id = id;
      photo.photographerId = photographerId;
      photo.link = path + link;
      photo.tags = tags;
      photo.likes = likes;
      photo.date = new Date(date);
      photo.price = price;
      photo.alt = alt;
      return photo;
    } else if (type === "mp4") {
      const video = new Video();
      video.title = link.replace(".mp4", "").replaceAll("_", " ");
      video.id = id;
      video.photographerId = photographerId;
      video.link = path + link;
      video.tags = tags;
      video.likes = likes;
      video.date = new Date(date);
      video.price = price;
      video.alt = alt;
      return video;
    }
  }
}
