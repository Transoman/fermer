'use strict';

global.jQuery = require('jquery');
var svg4everybody = require('svg4everybody'),
    popup = require('jquery-popup-overlay'),
    Rellax = require('rellax'),
    Swiper = require('swiper');

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

  // Parallax
  new Rellax('.rellax', {
    speed: -2,
    center: false,
    wrapper: null,
    round: true,
    vertical: true,
    horizontal: false
  });

  // Slider
  new Swiper('.s-review .review-slider', {
    slidesPerView: 2,
    spaceBetween: 30,
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      1200: {
        slidesPerView: 1,
        spaceBetween: 30
      },
      992: {
        slidesPerView: 2,
        spaceBetween: 30
      },
      767: {
        slidesPerView: 1,
        spaceBetween: 30
      },
    }
  });

  // SVG
  svg4everybody({});

});