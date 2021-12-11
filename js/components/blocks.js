export default class Block {
  constructor(title, price, description, id, cssClass, image_url, volume, featured) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.id = id;
    this.cssClass = cssClass;
    this.image_url = image_url;
    this.volume = volume;
    this.featured = featured;
  }

  draw() {
    return `<div class="col">
        
              <i class="far fa-heart favorite-heart ${this.cssClass}" data-id="${this.id}" data-title="${this.title}" 
              data-price="${this.price}" data-description="${this.description}" data-volume="${this.volume}" 
              data-featured="${this.featured}" data-image_url="${this.image_url}"></i>
              <a href="edit.html?id=${this.id}"><i class="fas fa-edit"></i></a>
              
              <a href="detail.html?id=${this.id}" class="product-link">
                <div class="card">
                  <img src="${this.image_url}" class="card-img-top" alt="${this.title}" />
                </div>

                <div class="product-info">
                    <h2 class="card-title">${this.title}</h2>
                    <p class="card-text">${this.description}</p>
                    <p class="card-price">$ ${this.price}</p>
                </div>
              </a> 
            </div>`;
  }
}
