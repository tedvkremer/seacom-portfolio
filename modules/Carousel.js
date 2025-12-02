import { $, $$ } from './utils.js';

/*************************************
  Carousel
 *************************************/

/**
 * Carousel component for managing slide transitions and navigation.
 * Supports automatic progression, manual navigation via indicators, and pause on user interaction.
 *
 * @example
 * const carousel = new Carousel('#my-carousel');
 * carousel.init();
 */
export default class Carousel {
  /**
   * Default duration in milliseconds between automatic slide transitions.
   * @type {number}
   */
  static DURATION = 8000;

  #id = 0;
  #slides = [];
  #indicators = [];
  #curr = 0;
  #total = 0;
  #interval = null;

  /**
   * Creates a new Carousel instance.
   * @param {string} id - CSS selector for the carousel container element
   */
  constructor(id) {
    this.#id = id;
  }

  /**
   * Initializes the carousel by setting up event listeners and starting automatic progression.
   * @returns {Carousel} The carousel instance for chaining
   */
  init() {
    const carousel = $(this.#id);
    this.#slides = $$('.CarouselSlide', carousel);
    this.#total = this.#slides.length;
    this.#indicators = $$('.CarouselIndicators>button.CarouselDot', carousel);
    this.#indicators.forEach((indicator, i) =>
      indicator.addEventListener('click', () => this.toSlide(i))
    );

    this.#updateCarousel();
    this.startCarousel();

    return this;
  }

  /**
   * Updates the visual state of the carousel slides and indicators.
   * @private
   */
  #updateCarousel() {
    let offset = (0 - this.#curr) * 100;
    this.#slides.forEach(slide => {
      slide.style.transform = `translateX(${offset}%)`;
      offset += 100;
    });

    this.#indicators.forEach((indicator, i) => {
      if (this.#curr === i) {
        indicator.classList.remove('CarouselDot');
        indicator.classList.add('CarouselDotActive');
        indicator.setAttribute('aria-current', 'true');
      } else {
        indicator.classList.remove('CarouselDotActive');
        indicator.classList.add('CarouselDot');
        indicator.removeAttribute('aria-current');
      }
    });
  }

  /**
   * Advances to the next slide and restarts automatic progression.
   */
  nextSlide() {
    this.stopCarousel();
    this.#curr = (this.#curr + 1) % this.#total;
    this.#updateCarousel();
    this.startCarousel();
  }

  /**
   * Goes back to the previous slide and restarts automatic progression.
   */
  prevSlide() {
    this.stopCarousel();
    this.#curr = (this.#curr - 1 + this.#total) % this.#total;
    this.#updateCarousel();
    this.startCarousel();
  }

  /**
   * Jumps to a specific slide by index and restarts automatic progression.
   * @param {number} index - The slide index to navigate to (0-based)
   */
  toSlide(index) {
    if (index < 0 || index >= this.#total) return;
    this.stopCarousel();
    this.#curr = index;
    this.#updateCarousel();
    this.startCarousel();
  }

  /**
   * Starts automatic slide progression.
   */
  startCarousel() {
    if (this.#interval) return;
    this.#interval = setInterval(() => this.nextSlide(), Carousel.DURATION);
  }

  /**
   * Stops automatic slide progression.
   */
  stopCarousel() {
    if (!this.#interval) return;
    clearInterval(this.#interval);
    this.#interval = null;
  }
}
