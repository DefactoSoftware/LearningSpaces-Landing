$(function () {
  'use strict';

  $('.slideshow').each(function () {
    var $this = $(this);
    var $slides = $this.find('.slideshow-screens img');
    var $nav = $this.find('.slideshow-nav li');

    $nav.on('click', function (event) {
      event.preventDefault();
      var $li = $(this);
      var index = $li.index();

      // Activate nav
      $nav.removeClass('active');
      $li.addClass('active');

      // Activate slide
      $slides.removeClass('active');
      $slides.eq(index).addClass('active');
    });
  });
});
