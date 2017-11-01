var vimeoGAJS = (window.vimeoGAJS) ? window.vimeoGAJS : {};

(function($) {
  vimeoGAJS = {
    iframes: [],
    gaTracker: undefined,
    eventMarker: {},

    init: function () {
      vimeoGAJS.iframes = $('iframe');

      $.each(vimeoGAJS.iframes, function (index, iframe) {
        var iframeId = $(iframe).attr('id');

        vimeoGAJS.eventMarker[iframeId] = {
          progress25: false,
          progress50: false,
          progress75: false,
          videoPlayed: false,
          videoPaused: false,
          videoResumed: false,
          videoSeeking: false,
          videoCompleted: false,
          timePercentComplete: 0,
        };
      });

      vimeoGAJS.gaTracker = 'ua'; // Universal Analytics (universal.js)

      if (window.addEventListener) {
        window.addEventListener('message', vimeoGAJS.onMessageReceived, false);
      } else {
        window.attachEvent('onmessage', vimeoGAJS.onMessageReceived, false);
      }
    },

    onMessageReceived: function(e) {
      if (e.origin.replace('https:', 'http:') !== 'http://player.vimeo.com' ||
        typeof vimeoGAJS.gaTracker === 'undefined') {
        //console.warn('Tracker is missing!');
        return;
      }

      var data = JSON.parse(e.data),
          iframeEl = $('#'+data.player_id),
          iframeId = iframeEl.attr('id');

      switch (data.event) {
      case 'ready':
        vimeoGAJS.onReady();
        break;

      case 'playProgress':
        vimeoGAJS.onPlayProgress(data.data, iframeEl);
        break;

      case 'seek':
        if (iframeEl.data('seek') &&
        !vimeoGAJS.eventMarker[iframeId].videoSeeking) {
          vimeoGAJS.sendEvent(iframeEl, 'Skipped video forward or backward');
          vimeoGAJS.eventMarker[iframeId].videoSeeking = true;
        }
        break;

      case 'play':
        if (!vimeoGAJS.eventMarker[iframeId].videoPlayed) {
          vimeoGAJS.sendEvent(iframeEl, 'Started video');
          vimeoGAJS.eventMarker[iframeId].videoPlayed = true;
        } else if (!vimeoGAJS.eventMarker[iframeId].videoResumed &&
          vimeoGAJS.eventMarker[iframeId].videoPaused) {
          vimeoGAJS.sendEvent(iframeEl, 'Resumed video');
          vimeoGAJS.eventMarker[iframeId].videoResumed = true;
        }
        break;

      case 'pause':
        vimeoGAJS.onPause(iframeEl);
        break;

      case 'finish':
        if (!vimeoGAJS.eventMarker[iframeId].videoCompleted) {
          vimeoGAJS.sendEvent(iframeEl, 'Completed video');
          vimeoGAJS.eventMarker[iframeId].videoCompleted = true;
        }
        break;
      }
    },

    getLabel : function(iframeEl) {
      var iframeSrc = iframeEl.attr('src').split('?')[0];
      var label = iframeSrc;
      if (iframeEl.data('title')) {
        label += ' (' + iframeEl.data('title') + ')';
      } else if (iframeEl.attr('title')) {
        label += ' (' + iframeEl.attr('title') + ')';
      }
      return label;
    },

    post : function (action, value, iframe) {
      var data = {
        method: action
      };

      if (value) {
        data.value = value;
      }

      var iframeSrc = $(iframe).attr('src').split('?')[0];

      iframe.contentWindow.postMessage(JSON.stringify(data), iframeSrc);
    },

    onReady :function() {
      $.each(vimeoGAJS.iframes, function(index, iframe) {
        vimeoGAJS.post('addEventListener', 'play', iframe);
        vimeoGAJS.post('addEventListener', 'seek', iframe);
        vimeoGAJS.post('addEventListener', 'pause', iframe);
        vimeoGAJS.post('addEventListener', 'finish', iframe);
        vimeoGAJS.post('addEventListener', 'playProgress', iframe);
      });
    },

    onPause: function(iframeEl) {
      var iframeId = iframeEl.attr('id');
      if (vimeoGAJS.eventMarker[iframeId].timePercentComplete < 99 &&
        !vimeoGAJS.eventMarker[iframeId].videoPaused) {
        vimeoGAJS.sendEvent(iframeEl, 'Paused video');
        vimeoGAJS.eventMarker[iframeId].videoPaused = true;
      }
    },

    onPlayProgress: function(data, iframeEl) {
      var progress,
          iframeId = iframeEl.attr('id');
      vimeoGAJS.eventMarker[iframeId].timePercentComplete =
      Math.round((data.percent) * 100);

      if (!iframeEl.data('progress')) {
        return;
      }

      if (vimeoGAJS.eventMarker[iframeId].timePercentComplete > 24 &&
        !vimeoGAJS.eventMarker[iframeId].progress25) {
        progress = 'Played video: 25%';
        vimeoGAJS.eventMarker[iframeId].progress25 = true;
      }

      if (vimeoGAJS.eventMarker[iframeId].timePercentComplete > 49 &&
        !vimeoGAJS.eventMarker[iframeId].progress50) {
        progress = 'Played video: 50%';
        vimeoGAJS.eventMarker[iframeId].progress50 = true;
      }

      if (vimeoGAJS.eventMarker[iframeId].timePercentComplete > 74 &&
        !vimeoGAJS.eventMarker[iframeId].progress75) {
        progress = 'Played video: 75%';
        vimeoGAJS.eventMarker[iframeId].progress75 = true;
      }

      if (progress) {
        vimeoGAJS.sendEvent(iframeEl, progress);
      }
    },

    sendEvent: function (iframeEl, action) {
      var bounce = iframeEl.data('bounce');
      var label = vimeoGAJS.getLabel(iframeEl);
      var ga = ga || function () {};

      switch (vimeoGAJS.gaTracker) {

      case 'ua':
        ga('send', 'event', 'Vimeo', action, label, undefined,
          { 'nonInteraction': (bounce) ? 0 : 1 });
        break;
      }
    }
  };

  vimeoGAJS.init();
})(jQuery);
