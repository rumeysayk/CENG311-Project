/**
 * Loads motivational quotes from a local JSON file and displays them with image and text.
 * Updates the quote every 10 seconds using a smooth fade transition.
 *
 * Technologies: jQuery, AJAX, CSS fade effects
 */

$(document).ready(function () {
  let index = 0;
  let quotes = [];

  $.getJSON("data/quotes.json", function (data) {
    quotes = data;
    showQuote();
    setInterval(showQuote, 10000); // Changes every 10 seconds
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
});

