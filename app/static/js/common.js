'use strict';

global.jQuery = require('jquery');
let svg4everybody = require('svg4everybody'),
    popup = require('jquery-popup-overlay');

jQuery(document).ready(function($) {

  // Toggle nav menu
  $('.nav-toggle').on('click', function (e) {
    e.preventDefault();
    $(this).toggleClass('is-active');
    $('.header__nav').toggleClass('open');
  });

  // Modal
  $('.modal').popup({
    transition: 'all 0.3s',
    onclose: function() {
      $(this).find('label.error').remove();
    }
  });

  // Open Search Form
  $('.small-search__link').click(function(e) {
    e.preventDefault();
    $('.small-search__body').addClass('is-active');
    $('.small-search__form input[type="text"]').focus();
    document.onkeydown = function(evt) {
      evt = evt || window.event;
        if (evt.keyCode == 27) {
          $('.small-search__body').removeClass('is-active');
        }
      };
  });

  $('.small-search__close').click(function() {
    $('.small-search__body').removeClass('is-active');
  });

  // SVG
  svg4everybody({});

});