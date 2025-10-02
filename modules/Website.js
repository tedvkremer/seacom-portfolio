import Carousel from './Carousel.js';

/*************************************
  Website Application Singleton
 *************************************/

export default class Website {
  heroCarousel = new Carousel('#hero-carousel');

  #init() {
    this.heroCarousel.init();
  }

  static bootstrap() {
    if (window._sc_website !== undefined) {
        console.error("bootstrap() already completed!");
        return;
    }

    window._sc_website = new Website();
    window.addEventListener(
      'DOMContentLoaded', 
      () => window._sc_website.#init()
    );
  }
}
