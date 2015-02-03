//= require jquery.scrollTo
//= require typed
//= require locales
//= require_self

// Screenshot parallax
var initScreenshotParallax = function () {
  'use strict';
  var scrollMultiplier = .5;
  var $window = $(window);
  var $browser = $('.browser');
  var $browserWindow = $browser.find('.window');
  var $browserScroll = $browser.find('.scroll-inner');
  var browserWindowTop;
  var windowHalfHeight;
  var windowCenter;

  function onResize () {
    windowHalfHeight = $window.height() / 2;
    browserWindowTop = $browserWindow.offset().top;
  }

  function onScroll () {
    windowCenter = $window.scrollTop() + windowHalfHeight;
    if (browserWindowTop < windowCenter) {
      $browserScroll.css('top', (browserWindowTop - windowCenter) * scrollMultiplier);
    } else {
      $browserScroll.css('top', 0);
    }
  }

  onResize();
  $window.on('scroll', onScroll);
  $window.on('resize', onResize);
};

// Features slide in
var initFeatureSlide = function () {
  'use strict';
  var slideInOffset = -100;
  var $elements = $('#features .slide-in .feature');
  var $window = $(window);

  function doFade () {
    var windowTop = $window.scrollTop();
    var windowBottom = windowTop + $window.height();

    $elements.each(function (i) {
      var $self = $(this);
      var selfBottom = $self.offset().top + $self.outerHeight() + slideInOffset;

      if (windowBottom > selfBottom) {
        window.setTimeout(function () {
          $self.addClass('in');
        }, i * 200);

        $elements = $elements.not($self);
      }
    });

    // remove handlers when done
    if ($elements.length === 0) {
      $window.off('scroll', doFade)
             .off('resize', doFade);
    }
  }

  $window.on('scroll', doFade)
         .on('resize', doFade);
};

// DOM ready
$(function () {
  'use strict';

  // Mobile navigation
  var $menu = $('#header-menu');
  var $menuToggle = $('#mobile-menu-toggle');
  $menuToggle.on('click', function (event) {
    event.preventDefault();
    $menu.slideToggle(200, function () {
      if($menu.is(':hidden')) {
        $menu.removeAttr('style');
      }
    });
  });

  // Landing index specific
  if ($('body').hasClass('landing')) {
    // Typewriter effect
    var $typed = $('#intro .typed');
    $typed.empty().typed({
      // strings: I18n.t('landing.typewriter'),
      strings: I18n.typewriter,
      startDelay: 0,
      typeSpeed: 50,
      backDelay: 3000,
      backSpeed: 0,
      loop: true,
      loopCount: false
    });

    // Scroll to
    $('[data-scrollto]').on('click', function (event) {
      event.preventDefault();
      var target = $(this).data('scrollto');
      if (target || target == 0) {
        $(window).scrollTo(target, 500);
      }
    });

    initFeatureSlide();
    initScreenshotParallax();
  }
});
