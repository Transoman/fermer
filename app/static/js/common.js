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

  // Fixed header
  var fixedHeader = function(e) {
    var h = $('.header__bottom').innerHeight();

    if(e.scrollTop() > 150) {
      $('.header').css('padding-bottom', h);
      $('.header__bottom').addClass('fixed');
    }
    else {
      $('.header').css('padding-bottom', 0);
      $('.header__bottom').removeClass('fixed');
    }
  }

  fixedHeader($(this));

  $(window).scroll(function() {
    fixedHeader($(this));
  });

  // Toggle nav menu
  $('.nav-toggle').on('click', function (e) {
    e.preventDefault();
    $('.mobile-menu').addClass('open');
  });

  $('.mobile-menu__close').on('click', function (e) {
    e.preventDefault();
    $('.mobile-menu').removeClass('open');
  });

  // Modal
  $('.modal').popup({
    transition: 'all 0.3s',
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
      $('.mobile-menu').removeClass('open');
      $('.user-menu__body').removeClass('is-active');
    }
  };

  // Toggle user menu
  $('.user-menu__head').click(function() {
    $('.user-menu__body').toggleClass('is-active');
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

  if ($('.datepicker').length) {
    for (var i = 0; i < $('.datepicker').length; i++) {
      pickmeup($('.datepicker')[i], {
        format: 'd.m.Y',
        hide_on_select: true,
        locale: 'ru',
        default_date: false
      });
    }
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
    if ($(this).hasClass('is-active')) {
      $(this).removeClass('is-active');
      $(this).next().removeClass('is-active');
    }
    else {
      $('.filter-search__btn').removeClass('is-active');
      $('.filter-search__btn').next().removeClass('is-active');
      $(this).addClass('is-active');
      $(this).next().addClass('is-active');
    }
  });

  $('.small-filters__btn').click(function(e) {
    e.preventDefault();
    if ($(this).hasClass('is-active')) {
      $(this).removeClass('is-active');
      $(this).next().removeClass('is-active');
    }
    else {
      $('.small-filters__btn').removeClass('is-active');
      $('.small-filters__btn').next().removeClass('is-active');
      $(this).addClass('is-active');
      $(this).next().addClass('is-active');
    }
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

  // File upload
  function handleFileSelect(files) {
    var files = this.files;
    var numFiles = files.length;
    var maxFiles = 10;

    if (numFiles <= maxFiles) {
      var preview = document.querySelector('.upload__thumbnails');
      preview.innerHTML = '';
      for (var i = 0; i < files.length; i++) {
        var file = files[i];

        if (!file.type.match('image.*')) {
          continue;
        }
        var reader = new FileReader();
        
        var itemWrap = document.createElement('div');
        itemWrap.classList.add('upload__thumbnails-item');
        var img = document.createElement('img');

        img.file = file;
        itemWrap.appendChild(img);
        preview.appendChild(itemWrap);
        reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
        reader.readAsDataURL(file);
      }
    }
    else {
      alert('Загрузить можно не более 10 файлов');
    }
  }

  $('.upload__main-img').click(function(e) {
    e.preventDefault();
    if ($(this).parent()[0].className == 'upload__thumbnails-item') {
      $(this).parent().remove();
    }
    else {
      $(this).remove();

    }
  });

  if (document.querySelector('#profile-photos, #file') != null) {
    document.querySelector('#profile-photos, #file').addEventListener('change', handleFileSelect, false);
  }

  if (document.querySelector('#profile-avatar') != null) {
      document.querySelector('#profile-avatar').addEventListener('change', handleFileSelectAvatar, false);
  }

  function handleFileSelectAvatar(files) {
    var file = this.files[0];
    var preview = document.querySelector('#profile-avatar + .upload__label').querySelector('.upload__output');
    preview.innerHTML = '';

    if (!file.type.match('image.*')) {
      return;
    }
    var reader = new FileReader();
    var img = document.createElement('img');

    img.file = file;
    preview.appendChild(img);
    reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
    reader.readAsDataURL(file);
  }

  if (document.querySelector('#profile-bg') != null) {
    document.querySelector('#profile-bg').addEventListener('change', handleFileSelectBg, false);
  }

  function handleFileSelectBg(files) {
    var file = this.files[0];
    var preview = document.querySelector('#profile-bg + .upload__label').querySelector('.upload__output');
    preview.innerHTML = '';

    if (!file.type.match('image.*')) {
      return;
    }
    var reader = new FileReader();
    var img = document.createElement('img');

    img.file = file;
    preview.appendChild(img);
    reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
    reader.readAsDataURL(file);
  }

  $('.add-okved').click(function(e) {
    e.preventDefault();
    var links = $('.form-profile__form-okved').length
    $('#profile-okved').clone().attr('id', 'profile-okved-' + links).appendTo('.clone-okved');
  });

  $('.add-time').click(function(e) {
    e.preventDefault();
    var links = $('.form-profile__form-time').length
    $('#profile-time').clone().attr('id', 'profile-time-' + links).appendTo('.clone-time');
  });

  $('.add-address').click(function(e) {
    e.preventDefault();
    var links = $('.form-profile__form-address').length
    $('#profile-address').clone().attr('id', 'profile-address-' + links).appendTo('.clone-address');
  });

  // SVG
  svg4everybody({});

});