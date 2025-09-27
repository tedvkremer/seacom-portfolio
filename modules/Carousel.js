const $  = (selector, node = document) => node.querySelector(selector);
const $$ = (selector, node = document) => node.querySelectorAll(selector);

export default class Carousel {
  #id         = 0;
  #slides     = [];
  #indicators = [];
  #currSlide  = 0;
  #totSlides  = 0;
  #interval   = null;

  constructor(id) {
    this.#id = id;
  }

  init() {
    const carousel   = $(this.#id);
    this.#slides     = $$('.carousel-slide', carousel);
    this.#totSlides  = this.#slides.length;
    this.#indicators = $$('.carousel-indicators>button.carousel-dot', carousel);
    this.#indicators.forEach((indicator, i) =>
      indicator.addEventListener('click', () => this.toSlide(i))
    );
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
    this.#interval = setInterval(() => this.nextSlide(), 8000);
  }

  stopCarousel() {
    if (!this.#interval) return;
    clearInterval(this.#interval);
    this.#interval = null;
  }
}
