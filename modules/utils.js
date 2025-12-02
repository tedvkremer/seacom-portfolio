/**
 * Select a single DOM element using a CSS selector.
 * @param {string} selector - CSS selector string
 * @param {Element} [node=document] - Root element to search within
 * @returns {Element|null} The first matching element or null if not found
 */
export const $ = (selector, node = document) => node.querySelector(selector);

/**
 * Select multiple DOM elements using a CSS selector.
 * @param {string} selector - CSS selector string
 * @param {Element} [node=document] - Root element to search within
 * @returns {NodeList} A NodeList of matching elements
 */
export const $$ = (selector, node = document) => node.querySelectorAll(selector);

