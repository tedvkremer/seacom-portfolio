const $ = (selector, node = document) => node.querySelector(selector);
const $$ = (selector, node = document) => node.querySelectorAll(selector);

/*************************************
  Carousel
 *************************************/

export default class Carousel {
  static INT_NEXT_DURR = 8000;
  static INT_COUNTDOWN_DURR = 50;

  #id = 0;
  #slides = [];
  #indicators = [];
  #currSlide = 0;
  #totSlides = 0;
  #interval = null;
  #countdown = null;
  #tick = 0;
  #progMeter = null;

  constructor(id) {
    this.#id = id;
  }

  init() {
    const carousel = $(this.#id);
    this.#slides = $$('.carousel-slide', carousel);
    this.#totSlides = this.#slides.length;
    this.#indicators = $$('.carousel-indicators>button.carousel-dot', carousel);
    this.#indicators.forEach((indicator, i) =>
      indicator.addEventListener('click', () => this.toSlide(i))
    );
    this.#progMeter = $('div.carousel-next-slide-countdown', carousel);
    this.#updateCarousel();
    this.startCarousel();
  }

  #updateCarousel() {
    let offset = (0 - this.#currSlide) * 100;
    this.#slides.forEach(slide => {
      slide.style.transform = `translateX(${offset}%)`;
      offset += 100;
    });

    this.#indicators.forEach((indicator, i) => {
      if (this.#currSlide === i) {
        indicator.classList.remove('carousel-dot');
        indicator.classList.add('carousel-dot-active');
        indicator.setAttribute('aria-current', 'true');
      } else {
        indicator.classList.remove('carousel-dot-active');
        indicator.classList.add('carousel-dot');
        indicator.removeAttribute('aria-current');
      }
    });
  }

  #updateCountdown() { 
    const incr = Math.trunc(Carousel.INT_NEXT_DURR / Carousel.INT_COUNTDOWN_DURR);
    const size = 100 / incr;
    this.#tick = (this.#tick + 1) % incr;
    this.#progMeter.style.width = `${size * this.#tick}%`;
  }

  nextSlide() {
    this.stopCarousel();
    this.#currSlide = (this.#currSlide + 1) % this.#totSlides;
    this.#updateCarousel();
    this.startCarousel();
  }

  prevSlide() {
    this.stopCarousel();
    this.#currSlide = (this.#currSlide - 1 + this.#totSlides) % this.#totSlides;
    this.#updateCarousel();
    this.startCarousel();
  }

  toSlide(index) {
    if (index < 0 || index >= this.#totSlides) return;
    this.stopCarousel();
    this.#currSlide = index;
    this.#updateCarousel();
    this.startCarousel();
  }

  startCarousel() {
    if (!this.#interval) {
      this.#interval = setInterval(
        () => this.nextSlide(),
        Carousel.INT_NEXT_DURR);
    }
    if (!this.#countdown) {
      this.#tick = 0;
      this.#progMeter.style.width = 0;
      this.#countdown = setInterval(
        () => this.#updateCountdown(),
        Carousel.INT_COUNTDOWN_DURR);
    }
  }

  stopCarousel() {
    this.#progMeter.style.width = 0;
    [this.#interval, this.#countdown].forEach(i => i && clearInterval(i));
    this.#interval = this.#countdown = null;
  }
}
