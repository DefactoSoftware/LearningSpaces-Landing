$(function () {
  'use strict';

  var $ul = $('.faq-list');

  function toggleQuestion (id) {
    if (!id) {
      return false;
    }

    var hash = '#' + id;
    var $li = $ul.find(hash);
    var expanding = !$li.hasClass('expanded');

    // Update URL by adding/removing question hash
    if (window.history && 'pushState' in window.history) {
      history.replaceState(null, null, expanding ? hash : '.');
    }

    // Send GA pageview when expaning a question
    if (expanding && typeof ga === 'function') {
      ga('send', 'pageview', location.pathname + location.search + hash);
    }

    // Toggle question
    $li.find('.faq-answer').slideToggle(100)
      .end().toggleClass('expanded');
  }

  // Collapse answers by default (when js is enabled)
  $ul.children('li').removeClass('expanded')
    .find('.faq-answer').css('display', 'none');

  // Open question if linked to
  toggleQuestion(window.location.hash.replace(/^#/, ''));

  // Question click
  $ul.on('click', '.faq-question', function (event) {
    event.preventDefault();
    toggleQuestion($(this).closest('li')[0].id);
  });
});
