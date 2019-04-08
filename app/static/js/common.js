'use strict';

global.jQuery = require('jquery');
var svg4everybody = require('svg4everybody'),
    popup = require('jquery-popup-overlay'),
    Rellax = require('rellax'),
    Swiper = require('swiper'),
    simplebar = require('simplebar'),
    pickmeup = require('pickmeup');

jQuery(document).ready(function($) {

  // Toggle nav menu
  $('.nav-toggle').on('click', function (e) {
    e.preventDefault();
    $(this).toggleClass('is-active');
    $('.mobile-menu').toggleClass('open');
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
  });

  $('.small-search__close').click(function() {
    $('.small-search__body').removeClass('is-active');
  });

  document.onkeydown = function(evt) {
    evt = evt || window.event;
    if (evt.keyCode == 27) {
      $('.small-search__body').removeClass('is-active');
      $('.nav-toggle').removeClass('is-active');
    $('.mobile-menu').removeClass('open');
    }
  };

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
    slidesPerView: 3,
    spaceBetween: 30,
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      1740: {
        slidesPerView: 2,
        spaceBetween: 30
      },
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

  new Swiper('.about-slider', {
    slidesPerView: 1,
    spaceBetween: 30,
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
  });

  new Swiper('.general-slider', {
    slidesPerView: 1,
    spaceBetween: 30,
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
  });

  new Swiper('.users-slider', {
    slidesPerView: 3,
    spaceBetween: 30,
    slidesPerColumn: 2,
    slidesPerColumnFill: 'row',
    speed: 1000,
    pagination: {
      el: '.users-slider-pagination',
      type: 'bullets',
      clickable: true
    },
    autoplay: {
      delay: 3000,
    },
    breakpoints: {
      1499: {
        slidesPerView: 2,
        spaceBetween: 30
      },
      767: {
        slidesPerView: 1,
        spaceBetween: 30
      },
    }
  });

  // Youtube Video Lazy Load
  function findVideos() {
    var videos = document.querySelectorAll('.video');

    for (var i = 0; i < videos.length; i++) {
      setupVideo(videos[i]);
    }
  }

  function setupVideo(video) {
    var link = video.querySelector('.video__link');
    var button = video.querySelector('.video__button');
    var id = parseMediaURL(link);

    video.addEventListener('click', function() {
      var iframe = createIframe(id);

      link.remove();
      button.remove();
      video.appendChild(iframe);
    });

    var source = "https://img.youtube.com/vi/"+ id +"/maxresdefault.jpg";
    var image = new Image();
    image.src = source;
    image.classList.add('video__media');

    image.addEventListener('load', function() {
      link.append( image );
    } (video) );
  
    link.removeAttribute('href');
    video.classList.add('video--enabled');
  }

  function parseMediaURL(media) {
    var regexp = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/;
    var url = media.href;
    var match = url.match(regexp);

    return match[5];
  }

  function createIframe(id) {
    var iframe = document.createElement('iframe');

    iframe.setAttribute('allowfullscreen', '');
    iframe.setAttribute('allow', 'autoplay');
    iframe.setAttribute('src', generateURL(id));
    iframe.classList.add('video__media');

    return iframe;
  }

  function generateURL(id) {
    var query = '?rel=0&showinfo=0&autoplay=1';

    return 'https://www.youtube.com/embed/' + id + query;
  }

  findVideos();

  // Accordion
  var accorderon = function() {
    var container = $('.faq-list');
    var toggle = container.find('.faq-list__title');
    var content = container.find('.faq-list__content');
    var speed = 500;

    $('.faq-list__item.is-active').find('.faq-list__content').slideDown(speed);

    toggle.click(function(e) {
      e.preventDefault();

      if ($(this).parent().hasClass('is-active')) {
        $(this).parent().removeClass('is-active');
        $(this).next().slideUp(speed);
      }
      else {
        $(this).parent().addClass('is-active');
        content.not($(this).next()).slideUp(speed);
        toggle.not($(this)).parent().removeClass('is-active');
        $(this).next().slideDown(speed);
      }
    });

  }

  accorderon();

  // Datepicker
  if ($('.small-filters__dates-body').length) {
    pickmeup.defaults.locales['ru'] = {
      days: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
      daysShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
      daysMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
      months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
      monthsShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек']
    };
  
    pickmeup('.small-filters__dates-body', {
      flat: true,
      mode: 'range',
      format: 'd.m.Y',
      hide_on_select: true,
      locale: 'ru'
    });
  
    // Set default dates
    var nowDate = new Date;
    var datesArr = [];
    datesArr.push(new Date);
    datesArr.push(new Date(nowDate.setDate(nowDate.getDate() + 7)));
    pickmeup('.small-filters__dates-body').set_date(datesArr);
  
    var dates = pickmeup('.small-filters__dates-body').get_date(true)
    $('.small-filters__date').text(dates[0] + ' - ' + dates[1]);
  
    $('.small-filters__btn-date').click(function(e) {
      e.preventDefault();
      $('.small-filters__dates-body').toggleClass('is-active');
    });
  
    document.querySelector('.small-filters__dates-body').addEventListener('pickmeup-change', function (e) {
      $('.small-filters__date').text(e.detail.formatted_date[0] + ' - ' + e.detail.formatted_date[1]);
    });
  }

  // SVG
  svg4everybody({});

});