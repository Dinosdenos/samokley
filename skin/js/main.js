(function($) {
    "use strict";

    /*---------------------------
       Commons Variables
    ------------------------------ */
    var $window = $(window),
        $body = $("body");

    /*---------------------------------
    Off Canvas Function
-----------------------------------*/
    (function() {
        var $offCanvasToggle = $(".offcanvas-toggle"),
            $offCanvas = $(".offcanvas"),
            $offCanvasOverlay = $(".offcanvas-overlay"),
            $mobileMenuToggle = $(".mobile-menu-toggle");
        $offCanvasToggle.on("click", function(e) {
            e.preventDefault();
            var $this = $(this),
                $target = $this.attr("href");
            $body.addClass("offcanvas-open");
            $($target).addClass("offcanvas-open");
            $offCanvasOverlay.fadeIn();
            if ($this.parent().hasClass("mobile-menu-toggle")) {
                $this.addClass("close");
            }
        });
        $(".offcanvas-close, .offcanvas-overlay").on("click", function(i) {
            i.preventDefault();
            $body.removeClass("offcanvas-open");
            $offCanvas.removeClass("offcanvas-open");
            $offCanvasOverlay.fadeOut();
            $mobileMenuToggle.find("a").removeClass("close");
        });
    })();

    /*----------------------------------
        Off Canvas Menu
    -----------------------------------*/
    function mobileOffCanvasMenu() {
        var $offCanvasNav = $(".offcanvas-menu, .overlay-menu"),
            $offCanvasNavSubMenu = $offCanvasNav.find(".sub-menu");

        /*Add Toggle Button With Off Canvas Sub Menu*/
        $offCanvasNavSubMenu.parent().prepend('<span class="menu-expand"></span>');

        /*Category Sub Menu Toggle*/
        $offCanvasNav.on("click", "li a, .menu-expand", function(e) {
            var $this = $(this);
            if ($this.attr("href") === "#" || $this.hasClass("menu-expand")) {
                e.preventDefault();
                if ($this.siblings("ul:visible").length) {
                    $this.parent("li").removeClass("active");
                    $this.siblings("ul").slideUp();
                    $this.parent("li").find("li").removeClass("active");
                    $this.parent("li").find("ul:visible").slideUp();
                } else {
                    $this.parent("li").addClass("active");
                    $this.closest("li").siblings("li").removeClass("active").find("li").removeClass("active");
                    $this.closest("li").siblings("li").find("ul:visible").slideUp();
                    $this.siblings("ul").slideDown();
                }
            }
        });
    }
    mobileOffCanvasMenu();

    /*----------------------------------
        Off Canvas Menu2
    -----------------------------------*/
    function mobileOffCanvasMenu2() {
        var $offCanvasNav = $(".category-menu"),
            $offCanvasNavSubMenu = $offCanvasNav.find(".sub-menu");

        /*Add Toggle Button With Off Canvas Sub Menu*/
        $offCanvasNavSubMenu.parent().prepend('<span class="menu-expand"></span>');

        /*Category Sub Menu Toggle*/
        $offCanvasNav.on("click", "li a, .menu-expand", function(e) {
            var $this = $(this);
            if ($this.attr("href") === "#" || $this.hasClass("menu-expand")) {
                e.preventDefault();
                if ($this.siblings("ul:visible").length) {
                    $this.parent("li").removeClass("active");
                    $this.siblings("ul").slideUp();
                    $this.parent("li").find("li").removeClass("active");
                    $this.parent("li").find("ul:visible").slideUp();
                } else {
                    $this.parent("li").addClass("active");
                    $this.closest("li").siblings("li").removeClass("active").find("li").removeClass("active");
                    $this.closest("li").siblings("li").find("ul:visible").slideUp();
                    $this.siblings("ul").slideDown();
                }
            }
        });
    }
    mobileOffCanvasMenu2();


    /*----------------------------------------
          Bootstrap dropdown               
  -------------------------------------------*/

    // Add slideDown animation to Bootstrap dropdown when expanding.

    $('.dropdown').on('show.bs.dropdown', function() {
        $(this).find('.dropdown-menu').first().stop(true, true).slideDown();
    });
    // Add slideUp animation to Bootstrap dropdown when collapsing.
    $('.dropdown').on('hide.bs.dropdown', function() {
        $(this).find('.dropdown-menu').first().stop(true, true).slideUp();
    });


    /*-----------------------
     Shop filter active 
 ------------------------- */
    $('.filter-active a').on('click', function(e) {
        e.preventDefault();
        $('.product-filter-wrapper').slideToggle();
    })



    /*---------------------
        Nice Select
    --------------------- */
    $('select').niceSelect();


    /*---------------------
        Cart Dropdown 
    --------------------- */
    var iconCart = $('.mini-cart-warp');
    iconCart.on('click', function() {
        $('.mini-cart-content').toggleClass('cart-visible');
    });
    /*---------------------
        Toggle Search Bar
    --------------------- */
    $(".search_list > a").on("click", function() {
        $(this).toggleClass('active');
        $('.dropdown_search').slideToggle('medium');
    });


  
    /*---------------------------
       Best Sell Slider Active
    ------------------------------ */
    $('.best-sell-slider').owlCarousel({
        autoplay: false,
        loop: false,
        smartSpeed: 1000,
        nav: true,
        dots: false,
        margin: 30,
        lazyLoad: true,
        responsive: {
            0: {
                items: 2,
                autoplay: true,
                loop: true,
            },
            360: {
                items: 2,
                autoplay: true,
                loop: true,
            },
            480: {
                items: 2,
                autoplay: true,
                loop: true,

            },
            768: {
                items: 3,
            },
            992: {
                items: 4,
            },
            1200: {
                items: 5,
            }
        }
    })


    /*---------------------------
       Category Slider Active
    ------------------------------ */

    /*---------------------------
       Best Sell Slider Active
    ------------------------------ */
    $('.category-slider-2').owlCarousel({
        autoplay: false,
        loop: false,
        lazyLoad: true,
        smartSpeed: 1000,
        nav: true,
        dots: false,
        margin: 30,
        responsive: {
            0: {
                items: 2,
                autoplay: true,
                loop: true,
            },
            360: {
                items: 2,
                autoplay: true,
                loop: true,
            },
            500: {
                items: 2,
                autoplay: true,
                loop: true,

            },
            768: {
                items: 3,
            },
            992: {
                items: 4,
            },
            1200: {
                items: 5,
            }
        }
    })



    /*---------------------------
       Recent Product Slider Active
    ------------------------------ */
    $('.recent-product-slider').owlCarousel({
        autoplay: false,
        smartSpeed: 1000,
        nav: true,
        lazyLoad: true,
        loop: false,
        dots: false,
        items: 4,
        margin: 30,
        responsive: {
            0: {
                items: 1,
                autoplay: true,
                loop: true,
            },
            360: {
                items: 1,
                autoplay: true,
                loop: true,
            },
            480: {
                items: 2,
                autoplay: true,
                loop: true,

            },
            768: {
                items: 3,
            },
            992: {
                items: 4,
            },
            1200: {
                items: 5,
            },
            1300: {
                items: 6,
            }
        }
    })


    /*---------------------------
       Blog Slider Active
    ------------------------------ */
    $('.blog-slider-active').owlCarousel({
        autoplay: false,
        nav: true,
        smartSpeed: 1000,
        dots: false,
        items: 3,
        lazyLoad: true,
        margin: 30,
        responsive: {
            0: {
                items: 1,
                autoplay: true,
            },
            360: {
                items: 1,
                autoplay: true,
            },
            576: {
                items: 1,
                autoplay: true,
            },
            768: {
                items: 2,
            },
            992: {
                items: 2,
            },
            1200: {
                items: 3,
            }
        }
    })





    /*--------------------------
      ScrollUp
  ---------------------------- */
    $.scrollUp({
        scrollText: '<i class="fa fa-arrow-up"></i>',
        easingType: 'linear',
        scrollSpeed: 900,
        animation: 'fade'
    });


    /*----------------------------
           Cart Plus Minus Button
       ------------------------------ */
    var CartPlusMinus = $('.cart-plus-minus');
    CartPlusMinus.prepend('<div class="dec qtybutton">-</div>');
    CartPlusMinus.append('<div class="inc qtybutton">+</div>');
    $(".qtybutton").on("click", function() {
        var $button = $(this);
        var oldValue = $button.parent().find("input").val();
        if ($button.text() === "+") {
            var newVal = parseFloat(oldValue) + 1;
        } else {
            // Don't allow decrementing below zero
            if (oldValue > 1) {
                var newVal = parseFloat(oldValue) - 1;
            } else {
                newVal = 1;
            }
        }
        $button.parent().find("input").val(newVal);
    });



    /*---------------------------
       Menu Fixed On Scroll Active
    ------------------------------ */
    $(window).scroll(function() {
        var window_top = $(window).scrollTop() + 1;
        if (window_top > 50) {
            $('.sticky-nav').addClass('menu_fixed animated fadeInDown');
        } else {
            $('.sticky-nav').removeClass('menu_fixed animated fadeInDown');
        }
    });


    /*--------------------  
     Category more toggle  
     ----------------------*/

    $(".vertical-menu li.hidden").hide();
    $("#more-btn").on('click', function(e) {

        e.preventDefault();
        $(".vertical-menu li.hidden").toggle(500);
        var htmlAfter = '<i class="ion-ios-minus-empty" aria-hidden="true"></i> Скрыть';
        var htmlBefore = '<i class="ion-ios-plus-empty" aria-hidden="true"></i> Показать больше';


        if ($(this).html() == htmlBefore) {
            $(this).html(htmlAfter);
        } else {
            $(this).html(htmlBefore);
        }
    });

    /*--------------------  
    All Category toggle  
    ----------------------*/

    $(".category-toggle").click(function() {
        $(".category-menu").slideToggle("slow");
    });
    $(".menu-item-has-children-1").click(function() {
        $(".category-mega-menu-1").slideToggle("slow");
    });
    $(".menu-item-has-children-2").click(function() {
        $(".category-mega-menu-2").slideToggle("slow");
    });
    $(".menu-item-has-children-3").click(function() {
        $(".category-mega-menu-3").slideToggle("slow");
    });
    $(".menu-item-has-children-4").click(function() {
        $(".category-mega-menu-4").slideToggle("slow");
    });
    $(".menu-item-has-children-5").click(function() {
        $(".category-mega-menu-5").slideToggle("slow");
    });
    $(".menu-item-has-children-6").click(function() {
        $(".category-mega-menu-6").slideToggle("slow");
    });

    /*-------------------------
      Create an account toggle
      --------------------------*/
    $('.checkout-toggle2').on('click', function() {
        $('.open-toggle2').slideToggle(1000);
    });

    $('.checkout-toggle').on('click', function() {
        $('.open-toggle').slideToggle(1000);
    });


    $('.vertical-menu-toggle').on('click', function() {
        $('.open-menu-toggle').slideToggle(500);
    });


    $('.owl-carousel').owlCarousel({
        items: 1,
        lazyLoad: true,
        video:true,
        loop: true,
        margin: 10,
        dots: true,
        nav: true,
    });
    

}(jQuery));
