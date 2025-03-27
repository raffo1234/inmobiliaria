var iOS = ( navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false );
if(iOS){
    $("body").addClass("is_ios");
    
}

var windowWidth;
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


function setDimensionesBlocksBanner() {

    var wrapperWidth = $(".w_banner_multiple").outerWidth(),
            block = $(".block_item_banner_js"),
            blockW2 = $(".block_item_banner_js.w2"),
            blockW3 = $(".block_item_banner_js.w3"),
            blockW4 = $(".block_item_banner_js.w4");

//    if (getWidthViewport() >= 1400) {
//        TweenLite.set(block, {width: Math.floor(wrapperWidth / 5) + "px"});
//        TweenLite.set(blockW2, {width: Math.floor(2 * wrapperWidth / 5) + "px"});
//        TweenLite.set(blockW3, {width: Math.floor(3 * wrapperWidth / 5) + "px"});
//        TweenLite.set(blockW4, {width: Math.floor(4 * wrapperWidth / 5) + "px"});
//    }
    if (getWidthViewport() >= 1132) {
        TweenLite.set(block, {width: Math.floor(wrapperWidth / 4) + "px"});
        TweenLite.set(blockW2, {width: Math.floor(2 * wrapperWidth / 4) + "px"});
        TweenLite.set(blockW3, {width: Math.floor(3 * wrapperWidth / 4) + "px"});
        TweenLite.set(blockW4, {width: Math.floor(4 * wrapperWidth / 4) + "px"});
    }
    if (getWidthViewport() < 1132 && getWidthViewport() >= 930) {
        TweenLite.set(block, {width: Math.floor(wrapperWidth / 3) + "px"});
        TweenLite.set(blockW2, {width: Math.floor(wrapperWidth / 3) + "px"});
        TweenLite.set(blockW3, {width: Math.floor(wrapperWidth / 3) + "px"});
        TweenLite.set(blockW4, {width: Math.floor(wrapperWidth / 3) + "px"});
    }
    if (getWidthViewport() < 930 && getWidthViewport() >= 560) {
        TweenLite.set(block, {width: Math.floor(wrapperWidth / 2) + "px"});
        TweenLite.set(blockW2, {width: Math.floor(wrapperWidth / 2) + "px"});
        TweenLite.set(blockW3, {width: Math.floor(wrapperWidth / 2) + "px"});
        TweenLite.set(blockW4, {width: Math.floor(wrapperWidth / 2) + "px"});
    }
    if (getWidthViewport() < 560) {
        TweenLite.set(block, {width: (wrapperWidth) + "px"});
        TweenLite.set(blockW2, {width: (wrapperWidth) + "px"});
        TweenLite.set(blockW3, {width: (wrapperWidth) + "px"});
        TweenLite.set(blockW4, {width: (wrapperWidth) + "px"});
    }
}

function banner_multiple() {

    var elem_js = $('.banner_multiple_js'),
            elem = $('.banner_multiple');

    if (elem_js.length > 0) {

        elem_js.owlCarousel({
            navigation: false, // Show next and prev buttons
            autoPlay: 7500,
            pagination: true,
            singleItem: false,
            slideSpeed: 680,
            lazyLoad: true,
            loop: true,
            animateOut: 'slideOutDown',
            animateIn: 'flipInX',
            onInitialized: function() {
                TweenLite.to(elem, 0.5, {autoAlpha: 1});
            },
            responsive: {
                0: {
                    items: 1,
                    center: false
                },
                560: {
                    items: 2,
                    center: false
                },
                930: {
                    items: 3,
                    center: false,
                    merge: false,
                    mergeFit: false
                },
                1132: {// >= 1132
                    center: false,
                    items: 4,
                    merge: true,
                    mergeFit: true
                }
//                ,
//                1400: {
//                    center: false,
//                    items: 5,
//                    merge: true,
//                    mergeFit: true
//                   
//                }
            }
        });
    } else {
        TweenLite.to(elem, 0.5, {autoAlpha: 1});
    }

}

function banner_platillos() {

    var elem_js = $('.banner_platillos_js'),
            elem = $('.banner_platillo');

    if (elem_js.length > 0) {

        elem_js.owlCarousel({
            autoWidth: true,
            navigation: true,
            autoPlay: 7500,
            nav: true,
            dots: false,
            singleItem: false,
            slideBy: 4,
            slideSpeed: 800,
            loop: true,
            lazyLoad: true,
            animateOut: 'slideOutDown',
            animateIn: 'flipInX',
            navText: [, ],
            onInitialized: function() {
                TweenLite.to(elem, 0.5, {autoAlpha: 1});
            },
            responsive: {
                0: {
                    slideBy: 1
                },
                560: {
                    slideBy: 1
                }
            }
        });
    } else {
        TweenLite.to(elem, 0.5, {autoAlpha: 1});
    }
}

function video_home() {
    /* LOADING */
    TweenLite.to($(".video_inner_js"), 0.35, {autoAlpha: 1});

    /* CLICK */
    var play_hover_js = $(".play_hover_js"),
            video_hidden_js = $(".video_hidden_js"),
            video = video_hidden_js.find("video");
    play_hover_js.on("click", function(e) {
        e.preventDefault();
        var self = $(this);
        if (!self.hasClass("active")) {
            self.addClass("active");
            TweenLite.to(video_hidden_js, 0.5, {autoAlpha: 1});
            video.get(0).play();
        } else {
            self.removeClass("active");
            TweenLite.to(video_hidden_js, 0.5, {autoAlpha: 0});
            video.get(0).stop();
        }
    });
}

function bloquesIsotope() {
    var container = $(".container_blocks_js");

    container.isotope({
        itemSelector: '.isotope-item',
        resizable: true,
        masonry: {columnWidth: container.width() / 4},
        layoutMode: 'sloppyMasonry'
    });
}

function hoverBlocks() {
    var item = $(".isotope-item");
    item.hover(function() {
        var self = $(this),
                hover = self.find(".hover");
        TweenLite.to(hover, 0.5, {autoAlpha: 1});
        hover.addClass("hovered");
    }, function() {
        var self = $(this),
                hover = self.find(".hover");
        TweenLite.to(hover, 0.5, {autoAlpha: 0});
        hover.removeClass("hovered");
    });

}


function clickBlocks() {
    var item = $(".isotope-item");


    item.on("click", function(e) {

        var self = $(this),
                click = self.find(".click"),
                clickAll = item.find(".click"),
                //
                btn_mas = item.find(".btn_mas"),
                btn_mas_ico = btn_mas.find(".ico_mas"),
                btn_masSelf = self.find(".btn_mas"),
                btn_masSelf_ico = btn_masSelf.find(".ico_mas");

        if (!click.hasClass("clicked")) {
            TweenLite.to(clickAll, 0.5, {autoAlpha: 0});

            item.removeClass("active");
            clickAll.removeClass("clicked");
            TweenLite.to(click, 0.5, {autoAlpha: 1});
            self.addClass("active");
            click.addClass("clicked");
        }

        TweenLite.to(btn_mas, 0.1, {autoAlpha: 0, top: "-20px"});
        TweenLite.to(btn_mas_ico, 0.1, {autoAlpha: 0});

        TweenLite.to(btn_masSelf, 0.25, {autoAlpha: 1, top: "0"});
        TweenLite.to(btn_masSelf_ico, 0.25, {delay: 0.35, autoAlpha: 1});

    });
}

function menuResponsive() {
    var link = $(".link_menu_responsive_js"),
            menu = $(".w_links_js");
    link.on("click", function(e) {
        e.preventDefault();
        var self = $(this);
        if (!self.hasClass("active")) {
            self.addClass("active");
            menu.slideDown();
        } else {
            self.removeClass("active");
            menu.slideUp();
        }
    });
    $(window).on("click", function() {
        if (link.hasClass("active")) {
            link.removeClass("active");
            menu.slideUp();
        }
    });
    menu.on("click", function(e) {
        e.stopPropagation();
    });
    link.on("click", function(e) {
        e.stopPropagation();
    });


}
function menuResponsivePorSecciones() {
    var link = $(".link_responsive_js"),
            menu = $(".menu_head_items");
    link.on("click", function(e) {
        e.preventDefault();
        var self = $(this);
        if (!self.hasClass("active")) {
            self.addClass("active");
            menu.slideDown();
        } else {
            self.removeClass("active");
            menu.slideUp();
        }
    });
    $(window).on("click", function() {
        if (link.hasClass("active")) {
            link.removeClass("active");
            menu.slideUp();
        }
    });
    menu.on("click", function(e) {
        e.stopPropagation();
    });
    link.on("click", function(e) {
        e.stopPropagation();
    });
}



var marker,
        marker_2,
        map,
        map_2;
function initialize() {

    var miUbicacion = new google.maps.LatLng(-11.963508, -77.063849),
            miUbicacion_2 = new google.maps.LatLng(-11.963508, -77.083849),
            mapOptions = {
                zoom: 16,
                center: miUbicacion,
                scrollwheel: false,
                draggable: !Modernizr.touch ? true : false,
                styles: [{featureType: 'water', stylers: [{color: '#46bcec'}, {visibility: 'on'}]}, {featureType: 'landscape', stylers: [{color: '#f2f2f2'}]}, {featureType: 'road', stylers: [{saturation: -100}, {lightness: 45}]}, {featureType: 'road.highway', stylers: [{visibility: 'simplified'}]}, {featureType: 'road.arterial', elementType: 'labels.icon', stylers: [{visibility: 'off'}]}, {featureType: 'administrative', elementType: 'labels.text.fill', stylers: [{color: '#444444'}]}, {featureType: 'transit', stylers: [{visibility: 'off'}]}, {featureType: 'poi', stylers: [{visibility: 'off'}]}]
            },
    mapOptions_2 = {
        zoom: 16,
        center: miUbicacion_2,
        scrollwheel: false,
        draggable: !Modernizr.touch ? true : false,
        styles: [{featureType: 'water', stylers: [{color: '#46bcec'}, {visibility: 'on'}]}, {featureType: 'landscape', stylers: [{color: '#f2f2f2'}]}, {featureType: 'road', stylers: [{saturation: -100}, {lightness: 45}]}, {featureType: 'road.highway', stylers: [{visibility: 'simplified'}]}, {featureType: 'road.arterial', elementType: 'labels.icon', stylers: [{visibility: 'off'}]}, {featureType: 'administrative', elementType: 'labels.text.fill', stylers: [{color: '#444444'}]}, {featureType: 'transit', stylers: [{visibility: 'off'}]}, {featureType: 'poi', stylers: [{visibility: 'off'}]}]
    };
    map = new google.maps.Map(document.getElementById('map_js'),
            mapOptions);
    map.panBy(100, 0);
    map_2 = new google.maps.Map(document.getElementById('map_js_2'),
            mapOptions_2);
    map_2.panBy(100, 0);
    marker = new google.maps.Marker({
        position: miUbicacion,
        map: map,
        title: "Bravo",
        icon: 'assets/icons/marker.png',
        animation: google.maps.Animation.DROP
    });
    google.maps.event.addListener(marker, 'click', function() {

        var mapDom = $(map.getDiv()),
                wrapper_map = mapDom.parents(".map_inner_js"),
                windowInfo = wrapper_map.find(".w_map_info_window_js"),
                map_info_window = wrapper_map.find(".map_info_window_js");
        TweenLite.to(windowInfo, 0.4, {autoAlpha: 1});
        TweenLite.to(map_info_window, 0.4, {marginBottom: 0});
    });
    marker_2 = new google.maps.Marker({
        position: miUbicacion_2,
        map: map_2,
        title: "Bravo",
        icon: 'assets/icons/marker.png',
        animation: google.maps.Animation.DROP

    });
    google.maps.event.addListener(marker_2, 'click', function() {

        var mapDom = $(map_2.getDiv()),
                wrapper_map = mapDom.parents(".map_inner_js"),
                windowInfo = wrapper_map.find(".w_map_info_window_js"),
                map_info_window = wrapper_map.find(".map_info_window_js");
        TweenLite.to(windowInfo, 0.4, {autoAlpha: 1});
        TweenLite.to(map_info_window, 0.4, {marginBottom: 0});
    });
    $(".info_close_js").on("click", function() {
        var self = $(this),
                windowInfo = self.parents(".w_map_info_window_js"),
                map_info_window = self.parents(".map_info_window_js");
        TweenLite.to(map_info_window, 0.4, {marginBottom: "30px"});
        TweenLite.to(windowInfo, 0.4, {autoAlpha: 0});
    });
}

function loadScript() {

    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&' +
            'callback=initialize';
    document.body.appendChild(script);
}

function audioStyled() {
    $('.audio-player').mediaelementplayer({
        alwaysShowControls: true,
        enableAutosize: true,
        features: ['playpause', 'progress', 'volume'],
        audioVolume: 'horizontal',
        audioWidth: "100%",
        audioHeight: 70,
        iPadUseNativeControls: false,
        iPhoneUseNativeControls: false,
        AndroidUseNativeControls: false
    });
}

function validateFormContactoPageHome() {
    var form = $("#form_contacto");

    form.validate({
        debug: false,
        errorContainer: $(".mensaje_error"),
        rules: {
            fecha: {
                minlength: 2,
                required: true
            },
            hora: {
                required: true
            },
            personas: {
                minlength: 1,
                required: true,
                regex: "^[0-9*]+$"
            },
            telefono: {
                minlength: 2,
                required: true,
                regex: "^[0-9*+()-_ ]+$"
            },
            restaurante: {
                minlength: 1,
                required: true
            },
            email: {
                minlength: 2,
                required: true,
                email: true
            },
            nombres: {
                minlength: 2,
                required: true
            },
            apellidos: {
                minlength: 2,
                required: true
            }
        },
        submitHandler: function() {

        },
        onfocusout: function(element, event) {
            this.element(element);
        },
        onkeyup: function(element, event) {
            if (event.which === 9 && this.elementValue(element) === '') {
                return;
            } else if (element.name in this.submitted) {
                this.element(element);
            }
        },
        onchange: function(element, event) {
            if (element.name in this.submitted) {
                this.element(element);
            }
        },
        highlight: function(element) {
            $(element).parent().addClass("error").removeClass('valid');
            $(element).addClass("error").removeClass('valid');
        },
        unhighlight: function(element) {
            $(element).parent().removeClass("error").addClass('valid');
            $(element).removeClass("error").addClass('valid');
        }
    });
}
function validateFormContactoPageContacto() {
    var form = $("#form_contacto_2");

    form.validate({
        debug: false,
        errorContainer: $(".mensaje_error"),
        rules: {
            nombres: {
                minlength: 2,
                required: true
            },
            apellidos: {
                minlength: 2,
                required: true
            },
            email: {
                minlength: 2,
                required: true,
                email: true
            },
            telefono: {
                minlength: 2,
                required: true,
                regex: "^[0-9*+()-_ ]+$"
            },
            restaurante: {
                minlength: 1,
                required: true
            }
        },
        onfocusout: function(element, event) {
            this.element(element);
        },
        onkeyup: function(element, event) {
            if (event.which === 9 && this.elementValue(element) === '') {
                return;
            } else if (element.name in this.submitted) {
                this.element(element);
            }
        },
        onchange: function(element, event) {
            if (element.name in this.submitted) {
                this.element(element);
            }
        },
        highlight: function(element) {
            $(element).parent().addClass("error").removeClass('valid');
            $(element).addClass("error").removeClass('valid');
        },
        unhighlight: function(element) {
            $(element).parent().removeClass("error").addClass('valid');
            $(element).removeClass("error").addClass('valid');
        }
    });
}
function validateFormNewsletter() {
    var form = $("#form_newsletter");

    form.validate({
        debug: false,
        rules: {
            email_2: {
                minlength: 2,
                required: true,
                email: true
            }
        },
        onfocusout: function(element, event) {
            this.element(element);
        },
        onkeyup: function(element, event) {
            if (event.which === 9 && this.elementValue(element) === '') {
                return;
            } else if (element.name in this.submitted) {
                this.element(element);
            }
        },
        onchange: function(element, event) {
            if (element.name in this.submitted) {
                this.element(element);
            }
        },
        highlight: function(element) {
            $(element).parent().addClass("error").removeClass('valid');
            $(element).addClass("error").removeClass('valid');
        },
        unhighlight: function(element) {
            $(element).parent().removeClass("error").addClass('valid');
            $(element).removeClass("error").addClass('valid');
        }
    });
}

function datePicker() {

    var elem = $(".datepicker_js");

    elem.datepicker({
        numberOfMonths: 1,
        minDate: -20
    });
    $.datepicker.regional['en'] = {
        closeText: 'Close',
        prevText: 'Back',
        nextText: 'Next',
        currentText: '???en_ES.BOOKING.RB.actual???',
        monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        dayNamesMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
        weekHeader: 'Sm',
        dateFormat: 'mm/dd/yy',
        firstDay: 0,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ''
    };

    $.datepicker.regional['es'] = {
        closeText: 'Cerrar',
        prevText: '<Ant',
        nextText: 'Sig>',
        currentText: 'Hoy',
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
        dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Juv', 'Vie', 'Sáb'],
        dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'],
        weekHeader: 'Sm',
        dateFormat: 'dd/mm/yy',
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ''
    };

    var language = 'es';
    if ((typeof globalConfig != 'undefined') && globalConfig.currentLanguage) {
        language = globalConfig.currentLanguage;
    }
    $.datepicker.setDefaults($.datepicker.regional[language]);

    $(".mask_time_js").inputmask('h:s t');
}

function btnReservas() {
    var btn_top = $(".link_reservas_top_js"),
            btn = $(".link_reservas_js"),
            target = $("#reserva_js");

    /* POPUP RESERVA */
    var w_popup = $(".w_reserva_popup_js"),
            popup = (".reserva_popup_js"),
            cerrar_popup = $(".btn_cerrar_popup_reserva_js");

    if (target.length === 1) {
//        btn_top.hover(function(e) {
//            e.preventDefault();
//            var self = $(this);
//            if (self.hasClass("to_down")) {
//                $('html, body').animate({scrollTop: target.offset().top}, 500);
//            }
//        });
        btn_top.click(function(e) {
            e.preventDefault();
            var self = $(this);
            if (self.hasClass("to_down")) {

                self.addClass("active");
                $('html, body').animate({scrollTop: target.offset().top}, 500);

                /* CIERRA EL DESPLEGABLE DEL MENU RESPONSIVO */

                $(".link_menu_responsive_js").removeClass("active");
                $(".w_links_js").hide();

            }
        });
    } else {
        btn_top.mouseover(function(e) {
            //e.preventDefault();
            var self = $(this);

            self.addClass("active");

            $('html, body').animate({scrollTop: 0}, 500, function() {
                TweenLite.to(w_popup, 0.5, {autoAlpha: 1});
                TweenLite.to(popup, 0.5, {right: 0});
            });
        });
        btn.click(function(e) {
            e.preventDefault();
            var self = $(this);

            self.addClass("active");

            $('html, body').animate({scrollTop: 0}, 500, function() {
                TweenLite.to(w_popup, 0.5, {autoAlpha: 1});
                TweenLite.to(popup, 0.5, {right: 0});
            });

        });
    }


    cerrar_popup.on("click", function() {

        btn.removeClass("active");

        TweenLite.to(w_popup, 0.5, {autoAlpha: 0});
        TweenLite.to(popup, 0.5, {right: "-10px"});
    });
    $(window).on("click", function() {

        btn.removeClass("active");

        TweenLite.to(w_popup, 0.5, {autoAlpha: 0});
        TweenLite.to(popup, 0.5, {right: "-10px"});
    });
    btn.on("click", function(e) {
        e.stopPropagation();
    });
    w_popup.on("click", function(e) {
        e.stopPropagation();
    });

}

function playDown() {
    var btn = $(".play_down_js"),
            target = $("#isotope_js");

    btn.on("click", function(e) {
        e.preventDefault();
        $('html, body').animate({scrollTop: target.offset().top * 1 - 66}, 650);
    });
}

function scroll_sections() {
    var lastId,
            link = $(".menu_head_js").find("a"),
            scrollItems = link.map(function() {
                var item = $($(this).attr("href"));
                if (item.length) {
                    return item;
                }
            });

    if (location.hash !== "" && $(location.hash).length === 1) {

        var offsetTop = location.hash === "#" ? 0 : $(location.hash).offset().top + 1 - 99;
        if (offsetTop !== 0) {

            $('html, body').stop().animate({
                scrollTop: offsetTop
            }, 650);
            location.hash = "";
        }
    }


    link.click(function(e) {

        var href = $(this).attr("href"),
                offsetTop = href === "#" ? 0 : $(href).offset().top + 1 - 99;

        if (offsetTop !== 0) {

            e.preventDefault();

            $('html, body').stop().animate({
                scrollTop: offsetTop
            }, 650);
        }
    });

    $(window).scroll(function() {
        var self = $(this);
        var fromTop = $(this).scrollTop();

        var cur = scrollItems.map(function() {
            if ($(this).offset().top - 99 < fromTop)
                return this;
        });

        cur = cur[cur.length - 1];
        var id = cur && cur.length ? cur[0].id : "";
        if (lastId !== id) {
            lastId = id;
            // Set/remove active class
            link.removeClass("active");
            if ($("#" + id).length === 1) {
                $("a[href=#" + id + "]").addClass("active");
            }
        }
        //   console.log(cur);
        if (getWidthViewport() <= 1024) {
            $(".menu_head_items").slideUp();
        }
    });

    // Menu top fixed

    var menu = $(".w_menu_head");

    if (menu.length > 0) {
        var menuOffsetTop = menu.offset().top;
        $(window).scroll(function() {
            if ($(this).scrollTop() > menuOffsetTop - 66) {
                menu.addClass("fixed");
            } else {
                menu.removeClass("fixed");
            }
        });
    }
}

function cronologia() {
    var ele = $(".w_crono_numero"),
            sumHeight = 0;

    ele.first().addClass("first");
    ele.last().addClass("last");

    ele.each(function(i) {
        var self = $(this),
                selfHeigth = self.outerHeight(),
                prev = self.prev(),
                prevHeight = prev.outerHeight();

        if (getWidthViewport() > 1035) {

            if (prev.length === 1) {
                if (prevHeight > selfHeigth) {
                    sumHeight = selfHeigth;
                } else {
                    sumHeight = prevHeight - 50;
                }
                TweenLite.set(self, {marginTop: Math.floor(-1 * sumHeight / 2) + "px"});
            }

        } else {
            TweenLite.set(self, {marginTop: "auto"});
        }
    });

}

function progressButton() {
    [].slice.call(document.querySelectorAll('button.progress-button')).forEach(function(bttn) {
        new ProgressButton(bttn, {
            callback: function(instance) {
                var progress = 0,
                        interval = setInterval(function() {
                            progress = Math.min(progress + Math.random() * 0.1, 1);
                            instance._setProgress(progress);

                            if (progress === 1) {
                                instance._stop(1);
                                clearInterval(interval);
                            }
                        }, 200);
            }
        });
    });
}

function menuTop() {
    var top = $(".top.top_normal"),
            top_fixed = $(".top.top_fixed");

    $(window).on({
        scroll: function() {
            if ($(this).scrollTop() >= 100) {

                top.addClass("hidden");
                top_fixed.addClass("visible");

            }
            if ($(this).scrollTop() < 100) {

                top_fixed.removeClass("visible");
                top.removeClass("hidden");

            }
        },
        load: function() {
            if ($(this).scrollTop() >= 100) {

                top.addClass("hidden");
                top_fixed.addClass("visible");

            }
            if ($(this).scrollTop() < 100) {

                top_fixed.removeClass("visible");
                top.removeClass("hidden");

            }
        }
    });
}

function popupBannerImages() {
    var elem_js = $('.popup_banner_c_js'),
            item = elem_js.find(".itm");

    if (elem_js.length > 0) {

        elem_js.owlCarousel({
            nav: true,
            autoplayTimeout: 3500,
            dots: false,
            items: 1,
            smartSpeed: 650
        });
    }
    elem_js.on('changed.owl.carousel', function(event) {

        $('.popup_thumbs_js').trigger("to.owl.carousel", event.item.index);
        $('.popup_thumbs_js').find(".owl-item").removeClass("actived").eq(event.item.index).addClass("actived")
    });
}

function popupBannerThumbs() {

    var elem_js = $('.popup_thumbs_js'),
            item = elem_js.find("a"),
            itemOwl = elem_js.find(".owl-item");

    if (elem_js.length > 0) {

        elem_js.owlCarousel({
            nav: true,
            autoplayTimeout: 3500,
            dots: false,
            items: 4,
            smartSpeed: 650,
            onInitialized: function() {
                item.parent(".owl-item").eq(0).addClass("actived");
            }
        });
    }
    item.on("click", function(e) {
        e.preventDefault();

        var self = $(this),
                selfIndex = self.parent(".owl-item").index();

        $('.popup_banner_c_js').trigger("to.owl.carousel", selfIndex);
    });
}

function popupEventos() {
    var btnOpen = $(".btn_crono"),
            btnClose = $(".close_js"),
            overlay = $(".overlay"),
            popup_inner = $(".popup_inner_js"),
            body = $("body"),
            btn_prev = $("#popup_prev_js"),
            btn_next = $("#popup_next_js");

    $(".cronologia_js").on("click", ".btn_crono", function(e) {
        e.preventDefault();

        var self = $(this),
                selfId = self.data("id");

        overlay.fadeIn();
        body.addClass("overflow");

        $.ajax({
            type: "POST",
            url: "assets/popups/popup.html",
            data: {
                'id': selfId
            },
            asyn: true,
            cache: false,
            dataType: "html",
            success: function(data) {
                if (data !== "") {
                    popup_inner.html("").empty();
                    popup_inner.append(data);

                    popupBannerImages();
                    popupBannerThumbs();
                    scrollable();

                    TweenLite.to(popup_inner, 0.5, {opacity: 1, delay: 0.5});

                }
            }
        });
    });

    $("#popup_prev_js, #popup_next_js").on("click", function(e) {
        e.preventDefault();

        var self = $(this),
                selfId = self.data("id");

        TweenLite.to(popup_inner, 0.5, {opacity: 0, onComplete: function() {
                $.ajax({
                    type: "POST",
                    url: "assets/popups/popup.html",
                    data: {
                        'id': selfId
                    },
                    asyn: true,
                    cache: false,
                    dataType: "html",
                    success: function(data) {
                        if (data !== "") {
                            popup_inner.html("").empty();
                            popup_inner.append(data);

                            popupBannerImages();
                            popupBannerThumbs();
                            scrollable();

                            TweenLite.to(popup_inner, 0.5, {opacity: 1, delay: 0.5});

                        }
                    }
                });
            }
        });

    });

    btnClose.on("click", function(e) {
        e.preventDefault();

        overlay.fadeOut();
        body.removeClass("overflow");

    });
    overlay.on("click", function(e) {

        overlay.fadeOut();
        body.removeClass("overflow");
    });
    $(".popup").on("click", function(e) {
        e.stopPropagation();
    });

}




function scrollable() {
    var ele = $(".scrollable_js");

    if (!Modernizr.touch && ele.length > 0) {

        ele.mCustomScrollbar({
        });
    }
}
function addStyleAttribute($element, styleAttribute) {
    $element.attr('style', $element.attr('style') + '; ' + styleAttribute);
}
function redesSocialesCuadrados() {
    var ele = $(".blocks_redes_sociales").find(".block"),
            eleWidth = ele.outerWidth();

    addStyleAttribute(ele, 'height: ' + eleWidth + 'px !important');
}

function loadMoreCronologia() {
    var wrapper_btn = $(".link_load_more"),
            btn = $(".btn_circle_plus_js"),
            wrapper_cronos = $(".cronologia_js");


    btn.on("click", function(e) {

        var lastItem = $(".w_crono_numero:last"),
                lastClass = "",
                clearfix = wrapper_cronos.find(".clearfix.last");

        (lastItem.hasClass("lft")) ? lastClass = "rgt" : lastClass = "lft";

        wrapper_btn.addClass("active");

        $.ajax({
            type: "POST",
            url: "assets/pages/cronologia.html",
            data: {
                'lastClass': lastClass
            },
            asyn: true,
            cache: false,
            dataType: "html",
            success: function(data) {
                if (data !== "") {
                    clearfix.remove();
                    wrapper_cronos.append(data);
                    $(".w_crono_numero").removeClass("last");
                    $(".w_crono_numero:last").addClass("last").addClass(lastClass);
                    cronologia();
                    TweenLite.to($(".w_crono_numero:last"), 0.5, {opacity: 1});
                    wrapper_btn.removeClass("active");
                }

            }
        });
    });
}
function animateActiveMenu() {
    var menu = $(".menu"),
            ele = menu.find(".border"),
            top = menu.find(".border.top"),
            rgt = menu.find(".border.rgt"),
            bot = menu.find(".border.bot"),
            lft = menu.find(".border.lft");

    if (ele.length) {
        if (ele.parent("li.active")) {
            TweenLite.to(top, 0.5, {width: "100%", ease: Power2.easeOut, onComplete: function() {
                    TweenLite.to(rgt, 0.5, {height: "100%", ease: Power2.easeOut, onComplete: function() {
                            TweenLite.to(bot, 0.5, {width: "100%", ease: Power2.easeOut, onComplete: function() {
                                    TweenLite.to($(lft), 0.5, {height: "100%", ease: Power2.easeOut});
                                }
                            });
                        }
                    });
                }
            });
        }
    }

}


$(window).on('load', function() {
    video_home();
    cronologia();

    animateActiveMenu();

    redesSocialesCuadrados();

    if ($('#map_js').length > 0) {
        loadScript();
    }

});



$(window).on('resize orientationchange', function() {

    getWidthViewport();
    setDimensionesBlocksBanner();
    cronologia();
    redesSocialesCuadrados();

    /* MENU RESPONSIVE */
    if (getWidthViewport() > 1024) {
        $(".w_links_js").show();
        $(".link_menu_responsive_js").removeClass("active");
    } else {
        if (!$(".link_menu_responsive_js").hasClass("active")) {
            $(".w_links_js").hide();
            $(".link_menu_responsive_js").removeClass("active");
        }
    }
    /* MENU RESPONSIVE  POR SECCIONES */
    if (getWidthViewport() > 1024) {
        $(".menu_head_items").show();
        $(".link_responsive_js").removeClass("active");
    } else {
        if (!$(".link_responsive_js").hasClass("active")) {
            $(".menu_head_items").hide();
            $(".link_responsive_js").removeClass("active");
        }
    }

});
$(document).ready(function() {
    $.validator.addMethod("regex", function(value, element, regexp) {
        var re = new RegExp(regexp);
        return this.optional(element) || re.test(value);
    }, "");


    bloquesIsotope();
    hoverBlocks();
    clickBlocks();
    menuResponsive();
    audioStyled();
    validateFormContactoPageHome();
    validateFormContactoPageContacto();
    validateFormNewsletter();
    datePicker();
    btnReservas();
    setDimensionesBlocksBanner();

    playDown();
    banner_platillos();
    scroll_sections();
    menuResponsivePorSecciones();
    cronologia();
    progressButton();
    menuTop();

    banner_multiple();

    scrollable();


    popupBannerImages();
    popupBannerThumbs();
    popupEventos();

    redesSocialesCuadrados();
    loadMoreCronologia();
});