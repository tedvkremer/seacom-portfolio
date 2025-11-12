import Carousel from './Carousel.js';

/*************************************
  Website Application Singleton
 *************************************/

export default class Website {
  heroCarousel = new Carousel('#hero-carousel');

  #init() {
    this.heroCarousel.init();
  }

  static get the() {
    if (!window._sc_the) throw new Error('bootstrap() must be completed first!');
    return window._sc_the;
  }

  static bootstrap() {
    if (window._sc_the) {
      console.error("bootstrap() already completed!");
      return;
    }

    window._sc_the = new Website();
    window.addEventListener('DOMContentLoaded', () => window._sc_the.#init());
    window.addEventListener('DOMContentLoaded', () => document.body.style.opacity = "1");
  }
}
