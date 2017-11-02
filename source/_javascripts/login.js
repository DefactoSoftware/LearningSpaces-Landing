var tld = window.location.hostname.split('.').pop();

$(function () {
  $('#tld').text('.learningspaces.' + tld);

  var $form = $('#login-form');
  var $input = $form.find('#subdomain');
  var $submit = $form.find('button[type="submit"]');
  var $error = $form.find('#error');

  var onSubmitHandler = function (event) {
    event.preventDefault();
    var subdomain = $input.val().toLowerCase();
    var endpoint = 'https://public.learningspaces.' + tld + '/api/v1/accounts/' + subdomain;

    $submit.prop('disabled', true);
    $error.hide();

    $.ajax(endpoint)
      .done(function () {
        window.location = 'https://' + subdomain + '.learningspaces.' + tld + '/login';
      })
      .fail(function () {
        $error.show();
        $input.focus();
      })
      .always(function() {
        $submit.prop('disabled', false);
      });
  };

  $form.on('submit', onSubmitHandler);
});
