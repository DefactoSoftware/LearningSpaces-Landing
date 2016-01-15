var tld = window.location.hostname.split('.').pop();

$(function () {
  $('#tld').text('.learningspaces.' + tld);
  var onClickHandler = function () {
    var subdomain = $('#subdomain').val().toLowerCase();
    var endpoint = 'https://public.learningspaces.' + tld + '/api/v1/accounts/' + subdomain;
    $.ajax(endpoint).fail(function () {
      $('#error').show();
    }).done(function () {
      var url = 'https://' + subdomain + '.learningspaces.' + tld + '/login';
      window.location = url;
    });
  };

  $('#continue').on('click', onClickHandler);
});
