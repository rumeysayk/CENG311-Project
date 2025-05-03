/**
 * home.js
 * 
 * This script dynamically loads motivational quotes and their associated images
 * from a local JSON file using AJAX. Every 10 seconds, it updates the displayed
 * quote with a smooth fade transition effect. Each quote consists of two parts
 * of text (before and after the image) and a related image shown between them.
 * 
 * Technologies used:
 * - jQuery for DOM manipulation and AJAX
 * - CSS transitions for smooth fade in/out effects
 * 
 * The main functions include:
 * - Loading the quotes from 'quotes.json'
 * - Cycling through each quote with a timer
 * - Updating the HTML content with fade transitions for a better UX
 */

$(document).ready(function () {
    let index = 0;
    let quotes = [];
  
    function showQuote() {
      if (quotes.length === 0) return;
  
      const current = quotes[index];
      const html = `
        <h1 class="quote-text">
          <span>${current.textStart}</span>
          <img src="${current.image}" alt="Quote Icon" class="inline-icon">
          <span>${current.textEnd}</span>
        </h1>
      `;
      $("#quote-area").html(html);
  
      index = (index + 1) % quotes.length;
    }
  
    $.getJSON("data/quotes.json", function (data) {
      quotes = data;
      showQuote();
      setInterval(showQuote, 10000); // Changes every 10 seconds
    });
  });
  function showQuote() {
    if (quotes.length === 0) return;
  
    const current = quotes[index];
    const html = `
      <h1 class="quote-text">
        <span>${current.textStart}</span>
        <img src="${current.image}" alt="Quote Icon" class="inline-icon">
        <span>${current.textEnd}</span>
      </h1>
    `;
  
    $("#quote-area").fadeOut(400, function () {
      $(this).html(html).fadeIn(400);
    });
  
    index = (index + 1) % quotes.length;
  }
    