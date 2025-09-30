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
    window.sc_website = new Website();
    window.addEventListener(
      'DOMContentLoaded', 
      () => window.sc_website.#init()
    );
  }
}
