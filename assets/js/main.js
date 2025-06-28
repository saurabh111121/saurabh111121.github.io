/**
* Template Name: BizLand - v1.2.1
* Template URL: https://bootstrapmade.com/bizland-bootstrap-business-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
!(function($) {
  "use strict";

  // Preloader
  $(window).on('load', function() {
    if ($('#preloader').length) {
      $('#preloader').delay(100).fadeOut('slow', function() {
        $(this).remove();
      });
    }
  });

  // Smooth scroll for the navigation menu and links with .scrollto classes
  var scrolltoOffset = $('#header').outerHeight() - 21;
  if (window.matchMedia("(max-width: 991px)").matches) {
    scrolltoOffset += 20;
  }
  $(document).on('click', '.nav-menu a, .mobile-nav a, .scrollto', function(e) {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      if (target.length) {
        e.preventDefault();

        var scrollto = target.offset().top - scrolltoOffset;

        if ($(this).attr("href") == '#header') {
          scrollto = 0;
        }

$('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'swing');

        if ($(this).parents('.nav-menu, .mobile-nav').length) {
          $('.nav-menu .active, .mobile-nav .active').removeClass('active');
          $(this).closest('li').addClass('active');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }
        return false;
      }
    }
  });

  // Activate smooth scroll on page load with hash links in the url
  $(document).ready(function() {
    if (window.location.hash) {
      var initial_nav = window.location.hash;
      if ($(initial_nav).length) {
        var scrollto = $(initial_nav).offset().top - scrolltoOffset;
$('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'swing');
      }
    }
  });

  // Navigation active state on scroll
  var nav_sections = $('section');
  var main_nav = $('.nav-menu, .mobile-nav');

  $(window).on('scroll', function() {
    var cur_pos = $(this).scrollTop() + 200;

    nav_sections.each(function() {
      var top = $(this).offset().top,
        bottom = top + $(this).outerHeight();

      if (cur_pos >= top && cur_pos <= bottom) {
        if (cur_pos <= bottom) {
          main_nav.find('li').removeClass('active');
        }
        main_nav.find('a[href="#' + $(this).attr('id') + '"]').parent('li').addClass('active');
      }
      if (cur_pos < 300) {
        $(".nav-menu ul:first li:first, .mobile-menu ul:first li:first").addClass('active');
      }
    });
  });

  // Mobile Navigation
  if ($('.nav-menu').length) {
    var $mobile_nav = $('.nav-menu').clone().prop({
      class: 'mobile-nav d-lg-none'
    });
    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>');
    $('body').append('<div class="mobile-nav-overly"></div>');

    $(document).on('click', '.mobile-nav-toggle', function(e) {
      $('body').toggleClass('mobile-nav-active');
      $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
      $('.mobile-nav-overly').toggle();
    });

    $(document).on('click', '.mobile-nav .drop-down > a', function(e) {
      e.preventDefault();
      $(this).next().slideToggle(300);
      $(this).parent().toggleClass('active');
    });

    $(document).click(function(e) {
      var container = $(".mobile-nav, .mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }
      }
    });
  } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
    $(".mobile-nav, .mobile-nav-toggle").hide();
  }

  // Toggle .header-scrolled class to #header when page is scrolled
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('#header').addClass('header-scrolled');
      $('#topbar').addClass('topbar-scrolled');
    } else {
      $('#header').removeClass('header-scrolled');
      $('#topbar').removeClass('topbar-scrolled');
    }
  });

  if ($(window).scrollTop() > 100) {
    $('#header').addClass('header-scrolled');
    $('#topbar').addClass('topbar-scrolled');
  }

  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });

  $('.back-to-top').click(function() {
$('html, body').animate({
      scrollTop: 0
    }, 1500, 'swing');
    return false;
  });

  // Skills section - Modified to not require waypoint plugin
  $(window).on('scroll', function() {
    var skillsSection = $('.skills-content');
    if (skillsSection.length) {
      var skillsTop = skillsSection.offset().top;
      var skillsHeight = skillsSection.height();
      var windowHeight = $(window).height();
      var scrollTop = $(window).scrollTop();
      
      if (scrollTop > (skillsTop - windowHeight + skillsHeight/2)) {
        $('.progress .progress-bar').each(function() {
          $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
      }
    }
  });

  // jQuery counterUp - Temporarily disabled due to missing plugin
  /*
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 1000
  });
  */

  // Testimonials carousel - Disabled due to missing Owl Carousel library
  // Simple fallback for testimonials
  $(document).ready(function() {
    if ($('.testimonials-carousel').length) {
      // If there are testimonials, make sure at least the first one is visible
      $('.testimonials-carousel .testimonial-item:first-child').addClass('active');
    }
  });

  // Portfolio filter - Modified to work without Isotope plugin
  $(window).on('load', function() {
    // Simple filter functionality
    $('#portfolio-flters li').on('click', function() {
      $("#portfolio-flters li").removeClass('filter-active');
      $(this).addClass('filter-active');
      
      var filterValue = $(this).data('filter');
      
      $('.portfolio-item').each(function() {
        if (filterValue === '*') {
          $(this).removeClass('d-none');
          $(this).addClass('d-block');
        } else if ($(this).hasClass(filterValue.replace('.', ''))) {
          $(this).removeClass('d-none');
          $(this).addClass('d-block');
        } else {
          $(this).removeClass('d-block');
          $(this).addClass('d-none');
        }
      });
    });
  });

  // Removed owl carousel and venobox dependencies

  // Removed AOS (Animate On Scroll) dependency
  // Simple animation fallback
  $(window).on('load', function() {
    // Add a small fade-in effect to elements that would have been animated
    $('.section-title, .about, .skills, .portfolio-item').css({
      'opacity': '0'
    }).animate({
      'opacity': '1'
    }, 1000);
  });

})(jQuery);
