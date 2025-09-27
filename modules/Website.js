import Carousel from './Carousel.js';

export default class Website {
  #heroCarousel = new Carousel('#hero-carousel');

  init() {
    this.#heroCarousel.init();
  }

  static bootstrap() {
    window.website = new Website();
    window.addEventListener('DOMContentLoaded', () => window.website.init());
  }
}

