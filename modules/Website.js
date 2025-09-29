import Carousel from './Carousel.js';

/*************************************
  Website Application Singleton
 *************************************/

export default class Website {
  heroCarousel = new Carousel('#hero-carousel');

  init() {
    this.heroCarousel.init();
  }

  static bootstrap() {
    window.seacom_website = new Website();
    window.addEventListener(
      'DOMContentLoaded', 
      () => window.seacom_website.init()
    );
  }
}
