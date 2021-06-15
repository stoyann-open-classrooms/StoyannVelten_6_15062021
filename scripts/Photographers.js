export class Photographers {
  constructor(name, id, city, country, tags, tagline, price, portrait) {
    this.name = name;
    this.id = id;
    this.city = city;
    this.country = country;
    this.tags = tags;
    this.tagline = tagline;
    this.price = price;
    this.portrait = portrait;
  }

  getFolderName() {
    return this.name.toLowerCase().replace(" ", "");
  }

  getPhotographerId() {
    console.log(this.id);
  }

  // faire une fonctions qui remplie automatiquement la balises alt des images
}
