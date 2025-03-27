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


/* BANNER DEL HEADER - BANNER PRINCIPAL */

function banner_home() {

    var elem = $('.banner_js');
    elem.owlCarousel({
        navigation: false, // Show next and prev buttons
        autoPlay: 7500,
        pagination: true,
        singleItem: true,
        transitionStyle: "fade",
        mouseDrag: true,
        touchDrag: true

    });
}

function tabs() {
    var ele = $('.tabs_js'),
            btn = ele.find('.tab_btn_js'),
            txt = ele.find('.tab_txt_js');

    btn.on('click', function(e) {

        var self = $(this),
                btn_id = self.data('id'),
                self_txt = $("#" + btn_id);
        if (!self.hasClass('active')) {
            btn.removeClass('active');
            self.addClass('active');

            txt.removeClass('active').fadeOut();
            self_txt.addClass('active').fadeIn();
        }
    });
}

function menu_responsivo() {
    var btn = $('.menu_responsivo_js'),
            menu = $('.w_menu_js');

    btn.on('click', function(e) {
        e.preventDefault();

        if (getWidthViewport() <= 1100) {
            var self = $(this);

            if (!self.hasClass('active')) {
                self.addClass('active');
                menu.slideDown();
            } else {
                self.removeClass('active');
                menu.slideUp();
            }
        }
    });
}

function nubes() {
    var nubes = $(".w_nubes, .w_nubes_2");

    nubes.pan({fps: 30, speed: 0.005, dir: 'left'});
    nubes.spRelSpeed(2);
}


function avions() {
    var avion = $(".avion"),
            nubesH = $(".w_nubes").outerHeight();

    TweenLite.set(avion, {left: "50%", bottom: 0});

    var vuela = setTimeout(function() {
        TweenLite.to(avion, 5, {
            left: "+=100px",
            bottom: "+=100px",
            opacity: 1,
            onUpdate: function() {

            },
            onComplete: function() {
                TweenLite.to(avion, 0.5, {opacity: 0, onComplete: function() {
                        avions();
                    }
                });
            }
        });
    }, 1000);
}

function scrollUp() {
    var btn = $(".link_up_js");

    btn.on("click", function(e) {
        e.preventDefault();
        $('html, body').animate({scrollTop: 0}, 800);
    });
}

function menu_responsivo_scroll_fixed() {
    var menu_top = $(".menu");

    $(window).scroll(function() {
        if ($(this).scrollTop() > 142) {
            menu_top.addClass("fixed");
        } else {
            menu_top.removeClass("fixed");
        }
    });
}

function radio_button() {
    var ele = $('.wrapper_radiobutton_js');

    ele.on("click", function() {
        var self = $(this),
                input = self.find("input[type=radio]"),
                name = input.prop("name"),
                self_ele = $("input[name=" + name + "]").parent(".wrapper_radiobutton_js");

        if (input.length > 0) {
            if (!input.is(":checked")) {
                $("input[name=" + name + "]").prop("checked", false);
                input.prop("checked", true);

                self_ele.removeClass("active");
                self.addClass("active");
            }
        }
    });
}

function focusFadeIn() {
    var input = $(".focus_fadeIn_js"),
            hidden = $(".focus_fadeOut_js"),
            link = $(".link_fadeOut_js");

    input.focus(function() {
        hidden.fadeIn();
        link.fadeOut();
    });
}

function desplegableVacation() {
    var desplegable = $(".desplegable_vacation_txt_js"),
            inner = desplegable.find(".inner"),
            btn = $(".desplegable_vacation_btn_js"),
            content = desplegable.find(".deplegable_content_js");

    btn.hover(function() {
        desplegable.slideDown(function() {
            TweenLite.to(inner, 0.5, {marginLeft: 0, delay: 0.35, onComplete: function() {
                    TweenLite.to(content, 0.5, {autoAlpha: 1, delay: 0.25});
                }
            });
        });
    }, function() {
        TweenLite.to(content, 0.5, {autoAlpha: 0, delay: 0, onComplete: function() {
                TweenLite.to(inner, 0.5, {marginLeft: "-100%", onComplete: function() {
                        desplegable.slideUp();
                    }
                });
            }
        });

    });
}

$(window).on('resize orientationchange', function() {

});
$(document).ready(function() {
    banner_home();
    tabs();
    menu_responsivo();
    nubes();
    avions();
    scrollUp();
    menu_responsivo_scroll_fixed();
    radio_button();
    focusFadeIn();
    desplegableVacation();
});