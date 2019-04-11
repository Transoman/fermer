'use strict';

global.jQuery = require('jquery');
var svg4everybody = require('svg4everybody'),
    popup = require('jquery-popup-overlay'),
    Rellax = require('rellax'),
    Swiper = require('swiper'),
    SimpleBar = require('simplebar'),
    pickmeup = require('pickmeup'),
    tabslet = require('tabslet'),
    IMask = require('imask');

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
    // scrolllock: true,
    onclose: function() {
      $(this).find('label.error').remove();
    },
    opentransitionend: function() {
      updateSlider();
      $('.general__info-text').each(function(i, el) {
        var sb = new SimpleBar(el);
        sb.recalculate();
      });
    }
  });

  // Open Search Form
  $('.small-search__link').click(function(e) {
    e.preventDefault();
    $('.small-search__body').addClass('is-active');
    setTimeout(function() {
      $('.small-search__form input[type="text"]').focus();
    }, 200);
    
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
    speed: 1000,
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    autoplay: {
      delay: 3000,
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
    }
  });

  new Swiper('.product-slider', {
    slidesPerView: 4,
    spaceBetween: 30,
    speed: 1000,
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    autoplay: {
      delay: 3000,
    },
    breakpoints: {
      1200: {
        slidesPerView: 3,
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

  $('.general-slider').each(function(i, el) {
    var $this = $(this);
    $this.addClass("general-slider-" + i);
    $this.parent().find(".swiper-button-prev").addClass("button-prev-" + i);
    $this.parent().find(".swiper-button-next").addClass("button-next-" + i);
  
    var btnNext = '.button-next-' + i;
    var btnPrev = '.button-prev-' + i;

    var generalSlider = 'generalSlider' + i;
  
    window[generalSlider] = new Swiper ('.general-slider-' + i, {
      slidesPerView: 1,
      spaceBetween: 30,
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      },
      navigation: {
        nextEl: btnNext,
        prevEl: btnPrev,
      },
    });
  });

  $('.qview .review-slider').each(function(i, el) {
    var $this = $(this);
    $this.addClass("review-slider-" + i);
    // $this.parent().find(".swiper-button-prev").addClass("button-prev-" + i);
    // $this.parent().find(".swiper-button-next").addClass("button-next-" + i);
  
    // var btnNext = '.button-next-' + i;
    // var btnPrev = '.button-prev-' + i;

    var reviewSlider = 'reviewSlider' + i;
  
    window[reviewSlider] = new Swiper ('.review-slider-' + i, {
      slidesPerView: 2,
      spaceBetween: 30,
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      },
      breakpoints: {
        767: {
          slidesPerView: 1,
          spaceBetween: 30
        }
      }
    });
  });

  var updateSlider = function() {
    $('.general-slider').each(function(i, el) {
      var generalSlider = 'generalSlider' + i;
      window[generalSlider].update();
    });

    $('.qview .review-slider').each(function(i, el) {
      var reviewSlider = 'reviewSlider' + i;
      window[reviewSlider].update();
    });
  };

  updateSlider();

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
  pickmeup.defaults.locales['ru'] = {
    days: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
    daysShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    daysMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    monthsShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек']
  };

  if ($('.small-filters__dates-body').length) {

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

  if ($('#product-date').length || $('#order-date').length) {
    pickmeup('#product-date, #order-date', {
      format: 'd.m.Y',
      hide_on_select: true,
      locale: 'ru'
    });
  }

  // Qty buton
  function changeProductQuantity() {
    $(document).on( 'click', '.quantity__btn', function(e) {
        e.preventDefault();

        var $button = $( this ),
        $qty = $button.siblings( '.quantity__val' ),
        current = parseInt( $qty.val() && $qty.val() > 0 ? $qty.val() : 0, 10 ),
        min = parseInt( $qty.attr( 'min' ), 10 ),
        max = parseInt( $qty.attr( 'max' ), 10 );

        min = min ? min : 0;
        max = max ? max : current + 1;

        if ( $button.hasClass( 'quantity__btn--minus' ) && current > min ) {
            $qty.val( current - 1 );
            $qty.trigger( 'change' );
        }

        if ( $button.hasClass( 'quantity__btn--plus' ) && current < max ) {
            $qty.val( current + 1 );
            $qty.trigger( 'change' );
        }
    });
  }

  changeProductQuantity();

  $('.quantity__val').keydown(function (e) {
    // Allow: backspace, delete, tab, escape, enter and .
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
         // Allow: Ctrl/cmd+A
        (e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true)) ||
         // Allow: Ctrl/cmd+C
        (e.keyCode == 67 && (e.ctrlKey === true || e.metaKey === true)) ||
         // Allow: Ctrl/cmd+X
        (e.keyCode == 88 && (e.ctrlKey === true || e.metaKey === true)) ||
         // Allow: home, end, left, right
        (e.keyCode >= 35 && e.keyCode <= 39)) {
             // let it happen, don't do anything
             return;
    }
    // Ensure that it is a number and stop the keypress
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }
  });

  // Tabs
  $('.qview-tabs').tabslet();

  $('.qview-tabs__list li').click(function() {
    updateSlider();
  });

  // Filter toggle list
  $('.filter-search__btn').click(function(e) {
    e.preventDefault();
    $(this).toggleClass('is-active');
    $(this).next().toggleClass('is-active');
  });

  $('.filter-search__toggle-filters').click(function(e) {
    e.preventDefault();
    $('.filter-search').toggleClass('is-active');
    $('.filter-search').find('.dropdown-list').removeClass('is-active');
  });

  $('.dropdown-list a').click(function(e) {
    e.preventDefault();
    $('.dropdown-list li').removeClass('is-active')
    var val = $(this).text();
    $(this).parent().addClass('is-active');
    $(this).parents('ul').prev().find('span').text(val);
  });

  $('.map-advert__hidden-img').click(function(e) {
    e.preventDefault();
    var hideText = 'Скрыть фото';
    var showText = 'Показать фото';
    $('.map-advert__item').toggleClass('is-active');
    $('.map-advert__img-wrap').slideToggle();
    if ($('.map-advert__item').hasClass('is-active')) {
      $(this).text(showText);
    }
    else {
      $(this).text(hideText);
    }
  });

  // Table search
  function tableSearch() {
    var phrase = document.querySelector('.small-filters__search input');
    var table = document.querySelector('.profile-history');
    var regPhrase = new RegExp(phrase.value, 'i');
    var flag = false;
    for (var i = 1; i < table.rows.length; i++) {
        flag = false;
        for (var j = table.rows[i].cells.length - 1; j >= 0; j--) {
            flag = regPhrase.test(table.rows[i].cells[j].innerHTML);
            if (flag) break;
        }
        if (flag) {
            table.rows[i].style.display = "";
        } else {
            table.rows[i].style.display = "none";
        }
    }
  }

  $('.small-filters__search input').keyup(function() {
    tableSearch();
  });

  // Input mask
  var inputsPhone = document.querySelectorAll('input[type="tel"]');

  if (inputsPhone.length) {
    var maskOptions = {
      mask: '+{7} (000) 000-00-00'
    };

    for (var i = 0; i < inputsPhone.length; i++) {
      new IMask(inputsPhone[i], maskOptions);
    }
  }

  $('.product-card__action, .product-action').click(function() {
    $(this).toggleClass('is-active');
  });

  $('.product-card').click(function(e) {
    if (e.target.offsetParent != undefined) {
      if (e.target.offsetParent.classList[0] != 'product-card__action' && e.target.offsetParent.classList[0] != 'product-card__action-body') {
        $(this).find('.product-card__check').toggleClass('product-card__check--checked');
      }
    }
  });

  // SVG
  svg4everybody({});

});