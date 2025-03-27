
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

function menuLoad() {
    var menu = $(".menu_js"),
            bg_menu = $(".menu .container"),
            src = bg_menu.css('background-image');

    src = src.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');

    $('<img />').attr('src', src).load(function() {
        TweenLite.to(menu, 1, {
            autoAlpha: 1, top: 0, ease: Power4.easeInOut
        });
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


//            beforeMove: function() {
//                if (!ie || ie >= 10) {
//
//                    TweenLite.to(block, 0.2, {
//                        delay: 0, marginTop: '25px', opacity: 0
//                    });
//                    TweenLite.to(h3, 0.3, {
//                        delay: 0, opacity: 0
//                    });
//                    TweenLite.to(p, 0.5, {
//                        delay: 0, opacity: 0
//                    });
//                }
//            },
//            afterMove: function() {
//                if (!ie || ie >= 10) {
//
//                    TweenLite.to(block, 0.55, {
//                        delay: 0.8, marginTop: '0', opacity: 1
//                    });
//                    TweenLite.to(h3, 0.55, {
//                        delay: 1.2, opacity: 1
//                    });
//                    TweenLite.to(p, 0.55, {
//                        delay: 1.65, opacity: 1
//                    });
//                }
//            }
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
function bannerSection2() {
    var slider = $(".banner_section_2_js"),
            item = slider.find(".item_2");

    if (slider.length > 0) {
        var owl = slider.owlCarousel({
            nav: false,
            autoplay: true,
            smartSpeed: 650,
            autoplayHoverPause: true,
            autoplayTimeout: 5000,
            pagination: false,
            slideSpeed: 680,
            items: 5,
            loop: false,
            lazyLoad: true,
            responsive: {
                0: {
                    items: 1,
                    loop: true,
                    mouseDrag: true,
                    touchDrag: true
                },
                741: {
                    items: 2,
                    loop: true,
                    mouseDrag: true,
                    touchDrag: true
                },
                1025: {
                    items: 3,
                    loop: true,
                    mouseDrag: true,
                    touchDrag: true
                },
                1301: {
                    items: 4,
                    loop: true,
                    mouseDrag: true,
                    touchDrag: true
                },
                1491: {
                    items: 5,
                    loop: false,
                    mouseDrag: false,
                    touchDrag: false
                }
            }
        });

        $('#next_2').click(function() {
            owl.trigger('next.owl.carousel');
        });
        $('#prev_2').click(function() {
            owl.trigger('prev.owl.carousel');
        });
    }
}
function bannerSection4() {
    var slider = $(".banner_section_4_js"),
            item = slider.find(".item");

    /* SLIDER */

    if (slider.length > 0) {
        var owl = slider.owlCarousel({
            nav: true,
            autoplay: true,
            smartSpeed: 650,
            autoplayHoverPause: true,
            autoplayTimeout: 5000,
            pagination: false,
            slideSpeed: 680,
            items: 4,
            loop: true,
            lazyLoad: true,
            responsive: {
                0: {
                    items: 1
                },
                851: {
                    items: 2
                },
                1166: {
                    items: 3
                },
                1491: {
                    items: 4
                }
            }
        });

        $('#next_4').click(function() {
            owl.trigger('next.owl.carousel');
        });
        $('#prev_4').click(function() {
            owl.trigger('prev.owl.carousel');
        });
    }
}
function bannerSection5() {
    var slider = $(".banner_section_5_js"),
            item = slider.find(".item_5");

    /* SLIDER */

    if (slider.length > 0) {
        var owl = slider.owlCarousel({
            nav: false,
            autoplay: true,
            smartSpeed: 650,
            autoplayHoverPause: true,
            autoplayTimeout: 5000,
            pagination: false,
            slideSpeed: 680,
            items: 4,
            loop: true,
            lazyLoad: true,
            responsive: {
                0: {
                    items: 1
                },
                851: {
                    items: 2
                },
                1166: {
                    items: 3
                },
                1491: {
                    items: 4
                }
            }
        });

        $('#next_5').click(function() {
            owl.trigger('next.owl.carousel');
        });
        $('#prev_5').click(function() {
            owl.trigger('prev.owl.carousel');
        });
    }
}
function bannerDetalle() {
    var slider = $(".banner_detalle_js"),
            item = slider.find(".itm");

    /* SLIDER */

    if (slider.length > 0) {
        var owl = slider.owlCarousel({
            nav: false,
            autoplay: true,
            smartSpeed: 650,
            autoplayHoverPause: true,
            autoplayTimeout: 5000,
            pagination: false,
            slideSpeed: 680,
            items: 1,
            loop: true,
            lazyLoad: true

        });
        if (item.length > 1) {
            item.show();
            $('#detalle_next').click(function() {
                owl.trigger('next.owl.carousel');
            });
            $('#detalle_prev').click(function() {
                owl.trigger('prev.owl.carousel');
            });
        } else {
            item.hide();
        }

    }
}

function loadImageFulll() {
    var section = $('.section');

    section.each(function() {
        var self = $(this),
                section_image = self.find('.section_image_js'),
                section_inner = self.find('.section_inner'),
                src = section_image.css('background-image');

        src = src.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
        $('<img />').attr('src', src).load(function() {
            TweenLite.to(section_inner, 1, {autoAlpha: 1, ease: Power4.easeInOut
            });
        });
    });
}

function scrollSpy() {
    var lastId,
            menuItems_top = $(".w_nav_js .link_navigation_js"),
            menuItems = $(".link_navigation_js"),
            scrollItems = menuItems_top.map(function() {
                var item = $($(this).attr("href"));
                if (item.length) {
                    return item;
                }
            });

    menuItems.click(function(e) {

        var href = $(this).attr("href"),
                offsetTop = href === "#" ? 0 : $(href).offset().top + 1;

        if (offsetTop !== 0) {

            e.preventDefault();

            $('html, body').stop().animate({
                scrollTop: offsetTop
            }, 650);
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
            menuItems_top.removeClass("active");
            if ($("#" + id).length === 1) {
                $("a[href=#" + id + "]").addClass("active");
            }
        }

        //  console.log(cur);

        if (!Modernizr.touch) {
            var w_idioma_sociales = $(".w_languages.con_hover");
            if (cur) {
                if (cur.index() !== 1) {
                    w_idioma_sociales.addClass("oculto");

                    TweenLite.to($("#btn_up_js"), 0.5, {autoAlpha: 1, bottom: "20px", ease: Power4.easeInOut});
                } else {
                    w_idioma_sociales.removeClass("oculto");

                    TweenLite.to($("#btn_up_js"), 0.5, {autoAlpha: 0, bottom: "10px", ease: Power4.easeInOut});
                }
            }

            if ($(this).scrollTop() > 140) {
                w_idioma_sociales.addClass("oculto");
                TweenLite.to($("#btn_up_js"), 0.5, {autoAlpha: 1, bottom: "20px", ease: Power4.easeInOut});
            } else {
                w_idioma_sociales.removeClass("oculto");
                TweenLite.to($("#btn_up_js"), 0.5, {autoAlpha: 0, bottom: "10px", ease: Power4.easeInOut});
            }
        }
    });
}

function acordion() {
    var aco = $(".acco_js"),
            hea = $(".head_js"),
            ico = hea.find(".icon-aspa"),
            bod = $(".bodi_js"),
            inn = bod.find(".in");

    hea.on("click", function() {
        var self = $(this),
                selfIco = self.find(".icon-aspa"),
                selfAco = self.parent(".acco_js"),
                selfBody = selfAco.find(".bodi"),
                selfInner = selfBody.find(".in");

        if (!self.hasClass("active")) {
            hea.removeClass("active");
            self.addClass("active");

            //bod.slideUp();
            TweenLite.to(bod, 0.8, {
                height: 0, ease: Power4.easeInOut
            });
            TweenLite.to(inn, 0.8, {
                autoAlpha: 0, ease: Power4.easeInOut
            });

            /**/
//            selfBody.slideDown();
            TweenLite.to(selfBody, 0.8, {
                height: "301px", ease: Power4.easeInOut
            });
            TweenLite.to(selfInner, 0.8, {
                autoAlpha: 1, delay: 0.2, ease: Power4.easeInOut
            });

        } else {
            self.removeClass("active");
            // selfBody.slideUp();
            TweenLite.to(selfBody, 0.8, {
                height: 0, ease: Power4.easeInOut
            });
            TweenLite.to(selfInner, 0.8, {
                autoAlpha: 0, ease: Power4.easeInOut
            });
        }
    });
}


var marker;
var map;
var mapOptions;

function initialize() {

    $('.mapa_inner').fadeOut('slow');

    var miUbicacion = new google.maps.LatLng(-12.127598, -77.02807),
            mapOptions = {
                zoom: 16,
                center: miUbicacion,
                scrollwheel: false,
                draggable: (Modernizr.touch) ? false : true,
                styles: [{featureType: 'water', stylers: [{color: '#46bcec'}, {visibility: 'on'}]}, {featureType: 'landscape', stylers: [{color: '#f2f2f2'}]}, {featureType: 'road', stylers: [{saturation: -100}, {lightness: 45}]}, {featureType: 'road.highway', stylers: [{visibility: 'simplified'}]}, {featureType: 'road.arterial', elementType: 'labels.icon', stylers: [{visibility: 'off'}]}, {featureType: 'administrative', elementType: 'labels.text.fill', stylers: [{color: '#444444'}]}, {featureType: 'transit', stylers: [{visibility: 'off'}]}, {featureType: 'poi', stylers: [{visibility: 'off'}]}]
            };

    map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);

    var centerVertical = (Modernizr.touch) ? 0 : -100;

    map.panBy(centerVertical, 0);
    google.maps.event.addListener(map, 'click', function(event) {

        updateMarker(event.latLng);

    });

    marker = new google.maps.Marker({
        position: miUbicacion,
        map: map, title: "Golden Palace",
        icon: 'assets/icons/marker.png',
        animation: google.maps.Animation.DROP

    });
}

function dropDownLanguages() {
    var ele = $(".languages_js"),
            ul = ele.find("ul");

    ele.on("click", function() {
        var self = $(this);

        if (!self.hasClass("active")) {
            self.addClass("active");
            ul.fadeIn();
        } else {
            self.removeClass("active");
            ul.fadeOut();
        }
    });

    $(window).on("click", function() {

        if (ele.hasClass("active")) {
            ele.removeClass("active");
            ul.fadeOut();
        }
    });

    ele.on("click", function(e) {
        e.stopPropagation();
    });
}

function loadScript() {

    var script = document.createElement('script');

    script.type = 'text/javascript';

    script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&' +
            'callback=initialize';

    document.body.appendChild(script);

}

function menuDropDown() {
    var btn = $(".btn_menu_reponsivo_js"),
            menu = $(".w_nav_js"),
            icon_menu = btn.find(".itm"),
            icon_close = btn.find(".icon-cancel");

    btn.on("click", function(e) {
        e.preventDefault();
        var self = $(this);

        if (!self.hasClass("active")) {
            self.addClass("active");

            icon_menu.hide();
            icon_close.show();
            menu.addClass("active");

        } else {
            self.removeClass("active");

            icon_menu.show();
            icon_close.hide();
            menu.removeClass("active");

        }

    });
    $(window).on("click", function() {

        if (btn.hasClass("active")) {
            btn.removeClass("active");
            icon_menu.show();
            icon_close.hide();
            menu.removeClass("active");
        }
    });

    btn.on("click", function(e) {
        e.stopPropagation();
    });

    $(".languages_js").on("click", function(e) {
        e.stopPropagation();
    });

    $(".languages_js ul a").on("click", function(e) {
        var self = $(this),
                selfHref = self.attr("href");

        window.location.href = selfHref;

    });
}

function scrollable() {
    var ele = $(".scrollable");
    ele.mCustomScrollbar({
    });
}

function popupsRedesSociales() {
    var ele = $("#share a");
    ele.jqSocialSharer();
}

function scrollToUp() {
    var btn = $("#btn_up_js");

    btn.on("click", function(e) {
        e.preventDefault();

        $('html, body').animate({scrollTop: 0}, 1000);
    });
}

function formulario_contacto() {
    var form = $("#formulario_contacto");

    form.validate({
        debug: false,
        rules: {
            nombres: {
                minlength: 2,
                required: true
            },
            correo: {
                required: true,
                email: true
            },
            telefono: {
                minlength: 2,
                required: true,
                regex: "^[0-9*+()-_ ]+$"
            },
            nro_documento: {
                minlength: 2,
                required: true
            },
            distrito: {
                required: true
            }
        },
        messages: {
            nombres: {
                minlength: "Mínimo 2 carácteres",
                required: "Este campo es necesario"
            },
            correo: {
                required: "Este campo es necesario",
                email: "Correo no válido"
            },
            telefono: {
                minlength: "Mínimo 2 carácteres",
                required: "Este campo es necesario",
                regex: "Solo valores numéricos"
            },
            nro_documento: {
                minlength: "Mínimo 2 carácteres",
                required: "Este campo es necesario"
            },
            distrito: {
                minlength: "Mínimo 2 carácteres",
                required: "Este campo es necesario"
            }
        }
    });
}

function formulario_trabajo() {
    var form = $("#formulario_trabajo");

    form.validate({
        debug: false,
        rules: {
            nombres: {
                minlength: 2,
                required: true
            },
            correo: {
                required: true,
                email: true
            },
            telefono: {
                minlength: 2,
                required: true,
                regex: "^[0-9*+()-_ ]+$"
            },
            nro_documento: {
                minlength: 2,
                required: true,
                digits: true
            },
            filen: {
                required: true
            }
        },
        messages: {
            nombres: {
                minlength: "Mínimo 2 carácteres",
                required: "Este campo es necesario"
            },
            correo: {
                required: "Este campo es necesario",
                email: "Correo no válido"
            },
            telefono: {
                minlength: "Mínimo 2 carácteres",
                required: "Este campo es necesario",
                regex: "Solo valores numéricos"
            },
            nro_documento: {
                minlength: "Mínimo 2 carácteres",
                required: "Este campo es necesario",
                digits: "Solo números"
            },
            filen: {
                minlength: "Mínimo 2 carácteres",
                required: "Este campo es necesario"

            }
        }
    });
}

function GetFileInfo() {
    var fileInput = document.getElementById("archivo");
    $("#texto_file").val(fileInput.value);

    $("#texto_file").removeClass("error");

}

function popupVideo() {
    $('.play-video').on('click', function(e) {

        var videoContainer = $('.box-video');
        videoContainer.prepend('<iframe width="560" height="315" src="//www.youtube.com/embed/inq36XyWG-Q?wmode=transparent" frameborder="0" allowfullscreen></iframe>');
        videoContainer.fadeIn(300);
        $("body").addClass("overflow");
        e.preventDefault();

    });

    // CLOSE VIDEO CONFERENCE

    $('.close-video').on('click', function(e) {

        $("body").removeClass("overflow");

        $('.box-video').fadeOut(400, function() {
            $("iframe", this).remove().fadeOut(300);
        });



    });
}

function ellipsis() {
    $(".w_ellipsis_js p").each(function() {
        var longitud = 56;
        if ($(this).text().length > longitud) {
            var texto = $(this).text().substring(0, longitud);
            var indiceUltimoEspacio = texto.lastIndexOf(' ');
            texto = texto.substring(0, indiceUltimoEspacio) + '<span class="puntos">...</span>';

            var primeraParte = '<span class="texto-mostrado">' + texto + '</span>';
            var segundaParte = '<span class="texto-ocultado">' + $(this).text().substring(indiceUltimoEspacio, $(this).text().length - 1) + '</span>';
            $(this).html(primeraParte + segundaParte);
        }
    });
}

function linkTel() {
    var ele = $(".tel");

    if (!Modernizr.touch) {
        ele.each(function() {
            var self = $(this),
                    selfText = self.text();

            self.replaceWith("<span>" + selfText + "</span>");
        });
    }
}

$(window).on('load', function() {
    if ($('#map-canvas').length > 0) {
        loadScript();
    }
});

$(window).on('resize orientationchange', function() {
    /* MENU RESPONSIVE */
    if (getWidthViewport() > 1024) {

        $(".w_nav_js").addClass("active");
    } else {
        if (!$(".btn_menu_reponsivo_js").hasClass("active")) {

            $(".w_nav_js").removeClass("active");

        }
    }
});
$(document).ready(function() {

    /* MENU RESPONSIVE */
    if (getWidthViewport() > 1024) {

        $(".w_nav_js").addClass("active");
    } else {
        if (!$(".btn_menu_reponsivo_js").hasClass("active")) {

            $(".w_nav_js").removeClass("active");

        }
    }

    $.validator.addMethod("regex", function(value, element, regexp) {
        var re = new RegExp(regexp);
        return this.optional(element) || re.test(value);
    }, "");

    /* LOAD FUNCTIONS */

    menuLoad();
    bannerHome();
    if (!Modernizr.touch) {
        scrollSpy();
    }
    acordion();
    bannerSection2();
    bannerSection4();
    bannerSection5();
    dropDownLanguages();
    menuDropDown();
    scrollable();
    popupsRedesSociales();
    bannerDetalle();
    scrollToUp();
    formulario_contacto();
    formulario_trabajo();
    popupVideo();
    ellipsis();
    linkTel();
});