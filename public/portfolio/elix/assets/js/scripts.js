
function viewport() {
    var e = window, a = 'inner';
    if (!('innerWidth' in window)) {
        a = 'client';
        e = document.documentElement || document.body;
    }
    return {width: e[ a + 'Width' ], height: e[ a + 'Height' ]};
}

function getWidthViewport() {
    return viewport().width;
}
function getHeightViewport() {
    return viewport().height;
}

/* VERIFICA VERSION DEL NAVEGADOR IE (INTERNET EXPLORER) */

var ie = (function() {

    var undef,
            v = 3,
            div = document.createElement('div'),
            all = div.getElementsByTagName('i');
    while (
            div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
            all[0]
            )
        ;
    return v > 4 ? v : undef;
}());
function scrollSpy() {
    var lastId,
            menuItems_top = $(".nav_js .link_navigation_js"),
            menuItems = $(".link_navigation_js"),
            scrollItems = menuItems_top.map(function() {
                var item = $($(this).attr("href"));
                if (item.length) {
                    return item;
                }
            });
    if (location.hash !== "" && $(location.hash).length === 1) {

        var offsetTop = location.hash === "#" ? 0 : $(location.hash).offset().top + 1;
        if (offsetTop !== 0) {

            $('html, body').stop().animate({
                scrollTop: offsetTop
            }, 650);
            location.hash = "";
        }
    }

    menuItems.click(function(e) {

        var href = $(this).attr("href");
        if ($(href).length === 1) {

            var offsetTop = href === "#" ? 0 : $(href).offset().top + 1;
            if (offsetTop !== 0) {

                e.preventDefault();
                $('html, body').stop().animate({
                    scrollTop: offsetTop
                }, 650);
            }
        }
    });
    $(window).scroll(function() {
        var self = $(this);
        var fromTop = self.scrollTop();
        var cur = scrollItems.map(function() {
            if ($(this).offset().top < fromTop)
                return this;
        });
        cur = cur[cur.length - 1];
        var id = cur && cur.length ? cur[0].id : "";
        if (lastId !== id) {
            lastId = id;
            // Set/remove active class
            menuItems.removeClass("active");
            if ($("#" + id).length === 1) {
                $("a[href=#" + id + "]").addClass("active");
            }
        }
    });
}

function bannerHome() {
    var slider = $(".banner_js"),
            item = slider.find(".item");
    /* SLIDER */

    if (slider.length > 0) {

        item.each(function() {
            var $this = $(this),
                    src = $this.css('background-image').replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
            $('<img />').attr('src', src).load(function() {
                TweenLite.to($this, 1, {
                    autoAlpha: 1, ease: Power4.easeInOut, onComplete: function() {

                    }
                });
            });
        });
        var block = $('.bloque_banner_js'),
                h3 = block.find('h3'),
                p = block.find('p');
//        if (ie < 10) {
//            TweenLite.set(block, {marginTop: '0', opacity: 1});
//            TweenLite.set(h3, {opacity: 1});
//            TweenLite.set(p, {opacity: 1});
//        }

        TweenLite.set(block, {marginTop: '0', opacity: 1});
        TweenLite.set(h3, {opacity: 1});
        TweenLite.set(p, {opacity: 1});
        slider.owlCarousel({
            items: 1,
            autoplay: true,
            autoplayHoverPause: true,
            autoplayTimeout: 5000,
            dots: false,
            nav: false,
            animateOut: !Modernizr.touch ? 'fadeOut' : false,
            animateIn: !Modernizr.touch ? 'fadeIn' : false,
            mouseDrag: false,
            touchDrag: true,
            slideSpeed: 680,
            loop: !Modernizr.touch ? true : false


        });
        if (item.length > 0) {
            $('#next_1').click(function() {
                slider.trigger('next.owl.carousel');
            });
            $('#prev_1').click(function() {
                slider.trigger('prev.owl.carousel');
            });
        } else {
            TweenLite.set($('#next_1'), {autoAlpha: 0});
            TweenLite.set($('#prev_1'), {autoAlpha: 0});
        }

    }
}


function acordion() {
    var aco = $(".acco_js"),
            hea = $(".head_js"),
            ico = hea.find("i"),
            bod = $(".bodi_js"),
            inn = bod.find(".in");
    hea.on("click", function() {
        var self = $(this),
                selfIco = self.find(".ico").find("i"),
                selfAco = self.parent(".acco_js"),
                selfBody = selfAco.find(".bodi"),
                selfInner = selfBody.find(".in");
        if (!self.hasClass("active")) {
            hea.removeClass("active");
            self.addClass("active");
            ico.removeClass("icon-up-dir-1").addClass("icon-down-dir-1");
            selfIco.removeClass("icon-down-dir-1").addClass("icon-up-dir-1");
            bod.slideUp();
            TweenLite.to(inn, 0.8, {
                autoAlpha: 0, ease: Power4.easeInOut
            });
            selfBody.slideDown();
            TweenLite.to(selfInner, 0.8, {
                autoAlpha: 1, delay: 0.2, ease: Power4.easeInOut
            });
        } else {
            self.removeClass("active");
            selfIco.removeClass("icon-up-dir-1").addClass("icon-down-dir-1");
            selfBody.slideUp();
            TweenLite.to(selfInner, 0.8, {
                autoAlpha: 0, ease: Power4.easeInOut
            });
        }
    });
}

function scrollable() {
    var ele = $(".scrollable");
    ele.mCustomScrollbar({
    });
}


function menuResponsivoDropdown() {
    var btn = $(".btn_nav_responsivo_js"),
            nav = $(".nav_js");
    btn.on("click", function(e) {
        e.preventDefault();
        var self = $(this);
        if (!self.hasClass("active")) {
            self.addClass("active");
            nav.slideDown();
        } else {
            self.removeClass("active");
            nav.slideUp();
        }
    });
    $(window).on("click", function() {
        if (btn.hasClass("active")) {
            btn.removeClass("active");
            nav.slideUp();
        }
    });
    btn.on("click", function(e) {
        e.stopPropagation();
    });
}




function popup() {
    var body = $("body"),
            overlay = $(".overlay_js"),
            popup = $(".popup"),
            close = $(".close_js");
    overlay.fadeIn();
    body.addClass("overflow");
    close.on("click", function() {
        overlay.fadeOut();
        body.removeClass("overflow");
    });
    overlay.on("click", function() {
        overlay.fadeOut();
        body.removeClass("overflow");
    });
    popup.on("click", function(e) {
        e.stopPropagation();
    });
}

function verMasRepertorio() {
    var btn = $(".btn_ver_js"),
            repertorio = $(".repertorio"),
            description = $(".description");

    btn.on("click", function(e) {
        e.preventDefault();

        var self = $(this),
                selfRepertorio = self.parents(".repertorio"),
                selfDescription = selfRepertorio.find(".description");

        if (!self.hasClass("active")) {
            btn.removeClass("active");
            self.addClass("active").html('<span>Ver menos</span> <i class="icon-toup"></i>');
            description.hide();
            selfDescription.fadeIn();

        } else {
            self.removeClass("active").html('<span>Ver más</span> <i class="icon-todown"></i>');
            selfDescription.hide();
        }

    });
}


$(window).on('load', function() {

});
$(window).on('resize orientationchange', function() {
    /* MENU RESPONSIVE */
    if (getWidthViewport() > 835) {

        $(".nav_js").show();
    } else {
        if (!$(".btn_nav_responsivo_js").hasClass("active")) {

            $(".nav_js").hide();
        }
    }
});
$(document).ready(function() {

    /* MENU RESPONSIVE */

    menuResponsivoDropdown();
    if (getWidthViewport() > 835) {

        $(".nav_js").show();
    } else {
        if (!$(".btn_nav_responsivo_js").hasClass("active")) {

            $(".nav_js").hide();
        }
    }

    $.validator.addMethod("regex", function(value, element, regexp) {
        var re = new RegExp(regexp);
        return this.optional(element) || re.test(value);
    }, "");
    
    /* LOAD FUNCTIONS */

    bannerHome();
    if (!Modernizr.touch) {
        scrollSpy();
    }
    acordion();
    scrollable();
    formulario_contacto();
    
    verMasRepertorio();
});