//= require jquery.scrollTo
//= require typed
//= require_self

// Language selection
var initLangSelect = function () {
  var $lang = $('ul.lang-select');
  var locale = $lang.data('locale');
  var isOpen;
  var hoverTimeout;

  function isOpen () {
    return $lang.hasClass('open');
  }

  function open () {
    $lang.addClass('open');
    $lang.children('li').not($active).fadeIn(300);
  }

  function close () {
    $lang.removeClass('open');
    $lang.children('li').not($active).fadeOut(300);
  }

  // move current lang to top of the list
  var $active = $lang.find('li[data-lang="' + locale + '"]');
  $active.addClass('current').prependTo($lang);

  // click
  $(document).on('click', function (event) {
    // select is open
    if (isOpen()) {
      if ($active.has(event.target).length) {
        event.preventDefault();
      }
      close();

    // select is closed and click is on target
    } else if ($lang.has(event.target).length) {
      event.preventDefault();
      open();
    }
  });

  // mouseenter
  $lang.on('mouseenter', function () {
    window.clearTimeout(hoverTimeout);
  });

  // mouseleave
  $lang.on('mouseleave', function () {
    if (isOpen()) {
      hoverTimeout = window.setTimeout(close, 2000);
    }
  });
};

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

  $elements.addClass("out");

  function doFade () {
    var windowTop = $window.scrollTop();
    var windowBottom = windowTop + $window.height();

    $elements.each(function (i) {
      var $self = $(this);
      var selfBottom = $self.offset().top + $self.outerHeight() + slideInOffset;

      if (windowBottom > selfBottom) {
        window.setTimeout(function () {
          $self.removeClass('out');
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

  // Language selection
  initLangSelect();

  // Landing index specific
  if ($('body').hasClass('landing')) {

    // Remove SEO / NO-JS strings
    $('#intro ul').remove();

    // Typewriter effect
    var $typed = $('#intro .typed');
    if (typeof lines !== 'undefined') {
      $typed.empty().typed({
        strings: lines,
        startDelay: 0,
        typeSpeed: 50,
        backDelay: 3000,
        backSpeed: 0,
        loop: true,
        loopCount: false
      });
    }

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
