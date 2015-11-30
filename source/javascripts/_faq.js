$(function () {
  'use strict';

  // Question toggle
  $('.faq-list').on('click', '.faq-question', function (event) {
    event.preventDefault();
    $(this).closest('li').find('.faq-answer').slideToggle(100)
      .end().toggleClass('expanded');
  });
});

