import Carousel from './Carousel.js';

/*************************************
  Website Application Singleton
 *************************************/

/**
 * Singleton class managing the website application.
 * Handles initialization of components and provides global access to the application instance.
 *
 * @example
 * Website.bootstrap();
 * // Later in code:
 * const app = Website.the;
 */
export default class Website {
  /** @static @private {Website} Singleton instance */
  static #the = null;
  
  /** @type {Carousel} The hero carousel instance for the main page carousel */
  #heroCarousel = new Carousel('#hero-carousel');

  /**
   * Initializes the website components.
   * @private
   */
  #init() {
    this.#heroCarousel.init();
  }

  /**
   * Get the singleton instance of the Website.
   * @static
   * @returns {Website} The singleton Website instance
   * @throws {Error} If bootstrap() has not been called first
   */
  static get the() {
    if (!Website.#the) throw new Error('bootstrap() must be completed first!');
    return Website.#the;
  }

  /**
   * Boots up the website application and sets up DOM event listeners.
   * Can only be called once; subsequent calls will log an error.
   */
  static bootstrap() {
    if (Website.#the) console.error("bootstrap() already completed!");
    
    Website.#the = new Website();
    window.addEventListener('DOMContentLoaded', () => Website.the.#init());
    window.addEventListener('DOMContentLoaded', () => document.body.style.opacity = "1");
  }
}
