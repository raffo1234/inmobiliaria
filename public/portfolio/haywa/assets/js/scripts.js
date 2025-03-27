
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


function validFormContacto() {
    var form = $("#formulario_contacto");

    form.validate({
        debug: false,
        rules: {
            name: {
                minlength: 2,
                required: true
            },
            correo: {
                minlength: 2,
                required: true,
                email: true
            },
            telefono: {
                minlength: 2,
                required: true,
                regex: "^[0-9*+()-_ ]+$"
            }

        },
        submitHandler: function(form) {
            if (getWidthViewport() > 767) {
                animateSobre(form);
            } else {
                form.submit();
            }
        }
    });
}

function validFormTop() {
    var form = $("#formulario_top");

    form.validate({
        debug: false,
        rules: {
            correo_top: {
                minlength: 2,
                required: true,
                email: true
            }
        },
        submitHandler: function() {
            var target = "#section_5",
                    correoTop = $("#correo_top"),
                    correoTopVal = correoTop.val(),
                    correo = $("#correo");

            if ($(target).length === 1) {
                $("html, body").animate({scrollTop: $(target).offset().top}, 850, function() {
                    correo.val(correoTopVal);
                    
                });
            }
        }
    });
}

function btnScroll() {
    var btn = $(".btn_scroll_js");

    btn.on("click", function(e) {
        e.preventDefault();

        var self = $(this),
                target = self.data("target");

        //console.log($(target));

        if ($(target).length === 1) {
            $("html, body").animate({scrollTop: $(target).offset().top}, 850);
        }
    });
}

function btnScrollDown() {
    var btn = $(".btn_scroll_down");

    btn.hover(function() {
        btn.removeClass("levitando");
    }, function() {
        btn.addClass("levitando");
    })
}

function show(id, xo) {
    TweenLite.to($(id), 1, {css: {'opacity': '1', top: '0', scaleX: 1, scaleY: 1}, ease: Power4.easeInOut, delay: xo});
}

function appear() {
//    if (Modernizr.touch) {
//
//        TweenLite.to($(id), 1, {'opacity': '1', top: '0'});
//
//    } else {

    $('.section_1 .apear:eq(0)').waypoint(function() {
        show($('.section_1 .apear:eq(0)'), 0);
    }, {offset: '80%'});
    $('.section_1 .apear:eq(1)').waypoint(function() {
        show($('.section_1 .apear:eq(1)'), 0.4);
    }, {offset: '80%'});
    $('.section_1 .apear:eq(2)').waypoint(function() {
        show($('.section_1 .apear:eq(2)'), 0.8);
    }, {offset: '80%'});

    $('.section_2 .apear:eq(0)').waypoint(function() {
        show($('.section_2 .apear:eq(0)'), 0);
    }, {offset: '80%'});
    $('.section_2 .apear:eq(1)').waypoint(function() {
        show($('.section_2 .apear:eq(1)'), 0.4);
    }, {offset: '80%'});

    $('.section_3 .apear:eq(0)').waypoint(function() {
        show($('.section_3 .apear:eq(0)'), 0);
    }, {offset: '80%'});
    $('.section_3 .apear:eq(1)').waypoint(function() {
        show($('.section_3 .apear:eq(1)'), 0.4);
    }, {offset: '80%'});

    $('.section_4 .apear:eq(0)').waypoint(function() {
        show($('.section_4 .apear:eq(0)'), 0);
    }, {offset: '80%'});
    $('.section_4 .apear:eq(1)').waypoint(function() {
        show($('.section_4 .apear:eq(1)'), 0.4);
    }, {offset: '80%'});

    $('.section_5 .apear:eq(0)').waypoint(function() {
        show($('.section_5 .apear:eq(0)'), 0);
    }, {offset: '80%'});
    $('.section_5 .apear:eq(1)').waypoint(function() {
        show($('.section_5 .apear:eq(1)'), 0.4);
    }, {offset: '80%'});
    $('.section_5 .apear:eq(2)').waypoint(function() {
        show($('.section_5 .apear:eq(2)'), 0.8);
    }, {offset: '80%'});
    $('.section_5 .apear:eq(3)').waypoint(function() {
        show($('.section_5 .apear:eq(3)'), 1.2);
    }, {offset: '80%'});
//    }
}

function setPositionLogo() {
    var form_top_js = $(".form_top_js"),
            head = $(".head_js"),
            logo = $(".logo_js"),
            logoWidth = logo.outerWidth();

    if (!logo.hasClass("fixed")) {

        TweenLite.to(head, 1, {top: 0, ease: Power4.easeInOut, onComplete: function() {
                TweenLite.to(logo, 1, {autoAlpha: 1, ease: Power4.easeInOut});
            }
        });
    }

}

function formTop() {
    var form_top_js = $(".form_top_js"),
            logo = $(".logo_js"),
            logoWidth = logo.find("a").outerWidth();

    $("#section_1").waypoint(function(direction) {

        if (direction === "down") {
            logo.addClass("fixed");

            TweenLite.to(logo, 0.65, {width: (logoWidth * 1 + 5) + "px", ease: Power4.easeInOut});
            TweenLite.to(form_top_js, 0.65, {right: 0, autoAlpha: 1, ease: Power4.easeInOut});
        } else {
            logo.removeClass("fixed");
            TweenLite.to(logo, 0.65, {width: "100%", ease: Power4.easeInOut});
            TweenLite.to(form_top_js, 0.65, {right: "-10px", autoAlpha: 0, ease: Power4.easeInOut});

        }
    }, {offset: -200});
    
    $("#section_5").waypoint(function(direction) {
        
        if (direction === "down") {
            TweenLite.to(logo, 0.65, {width: "100%", ease: Power4.easeInOut});
            TweenLite.to(form_top_js, 0.65, {right: "-10px", autoAlpha: 0, ease: Power4.easeInOut});
            
        } else {
            TweenLite.to(logo, 0.65, {width: (logoWidth * 1 + 5) + "px", ease: Power4.easeInOut});
            TweenLite.to(form_top_js, 0.65, {right: 0, autoAlpha: 1, ease: Power4.easeInOut});

        }
    }, {offset: 0});

}

function scrollBtnResponsivo() {
    var btn = $(".btn_responsivo_js"),
            target = $("#section_5");

    btn.on("click", function(e) {
        e.preventDefault();
        $('html, body').animate({scrollTop: target.offset().top}, 750);
    });

}

function bannerTestimonios() {
    var slider = $(".testimonios_js"),
            item = slider.find(".testimonio_itm");

    if (slider.length > 0) {

        slider.owlCarousel({
            items: 1,
            autoplay: true,
            autoplayHoverPause: true,
            autoplayTimeout: 5000,
            dots: false,
            nav: false,
            mouseDrag: true,
            touchDrag: true,
            slideSpeed: 680,
            smartSpeed: 650,
            loop: !Modernizr.touch ? true : false
        });

        if (item.length > 0) {
            $('#nav_next').click(function() {
                slider.trigger('next.owl.carousel');
            });
            $('#nav_prev').click(function() {
                slider.trigger('prev.owl.carousel');
            });
        } else {
            TweenLite.set($('#nav_prev'), {autoAlpha: 0});
            TweenLite.set($('#nav_next'), {autoAlpha: 0});
        }
    }
}

function videoPopupTestimonios() {
    var body = $("body"),
            btnOpen = $(".btn_open_video_js"),
            btnClose = $(".close_js"),
            btnPlay = $(".play_js"),
            popup = $(".popup_js"),
            containerIframe = $(".popup_iframe_js"),
            containerPlay = $(".popup_play_js"),
            iframe = "",
            selfUrl = "";

    btnOpen.on("click", function(e) {
        e.preventDefault();

        var self = $(this);

        selfUrl = self.data("idyoutube");

        body.addClass("overflow");
        TweenLite.to(popup, 0.6, {autoAlpha: 1, ease: Power4.easeInOut});
        TweenLite.to(btnClose, 0.6, {delay: 0.4, autoAlpha: 1, top: 0, ease: Power4.easeInOut});
//        TweenLite.to(containerPlay, 0.6, {delay: 0.8, autoAlpha: 1, ease: Power4.easeInOut});

        iframe = '<iframe width="560" height="315" src="//www.youtube.com/embed/' + selfUrl + '?wmode=transparent" frameborder="0" allowfullscreen></iframe>';
        containerIframe.html(iframe);

        TweenLite.to(containerIframe, 0.6, {autoAlpha: 1, ease: Power4.easeInOut});

    });
//    btnPlay.on("click", function(e) {
//        e.preventDefault();
//
//        TweenLite.to(containerPlay, 0.3, {autoAlpha: 0, onComplete: function() {
//                iframe = '<iframe width="560" height="315" src="//www.youtube.com/embed/' + selfUrl + '?wmode=transparent" frameborder="0" allowfullscreen></iframe>';
//                containerIframe.html(iframe);
//
//                TweenLite.to(containerIframe, 0.6, {autoAlpha: 1, ease: Power4.easeInOut});
//            }
//        });
//    });
    btnClose.on("click", function(e) {
        e.preventDefault();

        var t = setTimeout(function() {
            body.removeClass("overflow");
        }, 0.6)

        TweenLite.to(containerIframe, 0.6, {delay: 0, autoAlpha: 0, ease: Power4.easeInOut, onComplete: function() {
                containerIframe.html("").empty();
            }
        });
        TweenLite.to(containerPlay, 0.6, {delay: 0.2, autoAlpha: 0, ease: Power4.easeInOut});
        TweenLite.to(btnClose, 0.6, {delay: 0.4, autoAlpha: 0, top: "-20px", ease: Power4.easeInOut});

        TweenLite.to(popup, 0.6, {delay: 0.6, autoAlpha: 0});
    });
}

function animateSobre(form) {
    var w_sobre = $(".w_sobre"),
            carta = $(".carta"),
            sobre_cerrado = $(".sobre_cerrado"),
            w_sobre = $(".w_sobre");

    w_sobre.removeClass("cerrado");
    sobre_cerrado.addClass("hide");
    TweenLite.to(carta, 1, {delay: 0.5, autoAlpha: 1, top: 0, ease: Power4.easeInOut, onComplete: function() {

            w_sobre.addClass("cerrado");
            sobre_cerrado.removeClass("hide");

            TweenLite.to(w_sobre, 1, {delay: 0.5, autoAlpha: 0, right: "-200px", ease: Power4.easeInOut, onComplete: function() {
                    form.submit();
                }
            });
        }
    });
}

function lapicero() {

    var lapiz = $("#lapiz_js"),
            input = $(".w_form").find(".input");

    lapiz.jrumble({
        speed: 100
    });

    input.focus(function() {

        lapiz.trigger('startRumble');
    });
    input.blur(function() {
        lapiz.trigger('stopRumble');
    });
}

function lapiceroMovimiento() {
    var lapiz = $(".lapiz"),
            input = $(".w_form").find(".input"),
            lLeft = "20px",
            lTop = -53;

    var tl = new TimelineLite();
    tl.pause();

    var recursivo = function() {
        tl.to(lapiz, 5, {left: "75px", onComplete: function() {
                lTop = lTop + 8;
                if (lTop >= -8) {
                    lTop = -53;
                }
                tl.set(lapiz, {left: lLeft, top: lTop + "px"});
                if (lTop <= 0) {
                    recursivo();
                }

            }
        });
    };

    recursivo();

    input.focus(function() {
        tl.resume();
    });
    input.blur(function() {
        tl.pause();
    });
}

$(window).on('load', function() {
    setPositionLogo();
    formTop();
}
);
$(window).on('resize orientationchange', function() {
    setPositionLogo();
    formTop();
});
$(document).ready(function() {

    $.validator.addMethod("regex", function(value, element, regexp) {
        var re = new RegExp(regexp);
        return this.optional(element) || re.test(value);
    }, "");

    validFormContacto();
    validFormTop();
    btnScroll();
    appear();
    scrollBtnResponsivo();
    bannerTestimonios();
    videoPopupTestimonios();
    btnScrollDown();
    lapicero();
    lapiceroMovimiento();
});