$(function () {
  'use strict';

  // Mobile navigation toggle
  $('.header-menu-toggle').on('click', function (event) {
    event.preventDefault();
    $('body').toggleClass('mobile-nav-open');
  });
});
