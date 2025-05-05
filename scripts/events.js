// jQuery script that implements an autocomplete search for event titles and 
// smoothly scrolls to the corresponding event section when selected.

$(function () {
  const eventTitles = [
    { label: "Yoga & Breathing Exercises", targetId: "event-yoga" },
    { label: "Nature Walks", targetId: "event-nature" },
    { label: "Dance Therapy", targetId: "event-dance" },
    { label: "Painting & Drawing Workshops", targetId: "event-painting" },
    { label: "Music Therapy", targetId: "event-music" },
    { label: "Crochet & Knitting Sessions", targetId: "event-crochet" },
    { label: "Creative Writing Sessions", targetId: "event-writing" },
    { label: "Baking Sessions", targetId: "event-baking" },
    { label: "Sculpture and Clay Works", targetId: "event-sculpture" },
    { label: "Mindfulness & Meditation", targetId: "event-meditation" },
    { label: "Stress Management", targetId: "event-stress" },
    {
      label: "Self-Awareness & Reflection",
      targetId: "event-reflection",
    },
  ];

  $("#event-search").autocomplete({
    minLength: 1,
    source: function (request, response) {
      const term = request.term.toLowerCase();
      const results = eventTitles.filter((item) => {
        const words = item.label.toLowerCase().split(/\s+/);
        return words.some((word) => word.startsWith(term));
      });
      response(results);
    },
    select: function (event, ui) {
      const target = document.getElementById(ui.item.targetId);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    },
  });
});