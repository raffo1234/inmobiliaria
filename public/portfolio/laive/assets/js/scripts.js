/* GLOBALS */
var windowWidth = 0,
        imageWidth = 0,
        leftInicial = 0,
        slideWidth = 0,
        containerWidth = 0,
        id = "sec_1";
/* FUNCTIONS */

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

function bannerHome() {
    var slider = $(".banner_inner_js"),
            item = slider.find(".banner_item"),
            h2 = item.find("h2"),
            img = item.find(".img_inner"),
            p = item.find("p"),
            a = item.find("a"),
            btn_prev = $('#link_prev'),
            btn_next = $('#link_next');
    if (slider.length > 0) {

        slider.owlCarousel({
            items: 1,
            autoplay: false,
            autoplayHoverPause: true,
            autoplayTimeout: 5000,
            dots: false,
            nav: false,
            slideSpeed: 980,
            smartSpeed: 950,
            lazyLoad: true,
            loop: false,
            fallbackEasing: 'Power1.easeInOut'
        });
        slider.on('changed.owl.carousel', function(event) {

            var index = event.item.index;
            h2.removeClass("active");
            item.eq(index).find("h2").addClass("active");
            img.removeClass("active");
            item.eq(index).find(".img_inner").addClass("active");
            p.removeClass("active");
            item.eq(index).find("p").addClass("active");
            a.removeClass("active");
            item.eq(index).find("a").addClass("active");
            if (index === 0) {
                btn_prev.fadeOut();
            } else {
                btn_prev.fadeIn();
            }
            if (index === item.length - 1) {
                btn_next.fadeOut();
            } else {
                btn_next.fadeIn();
            }
        });
        if (item.length > 0) {
            btn_prev.click(function() {
                slider.trigger('prev.owl.carousel');
            });
            btn_next.click(function() {
                slider.trigger('next.owl.carousel');
            });
        } else {
            TweenLite.set($('#nav_prev'), {autoAlpha: 0});
            TweTweenLite.setenLite.set($('#nav_next'), {autoAlpha: 0});
        }
    }
}

function banner_blur() {
    var slider = $(".banner_blur_js"),
            item = slider.find(".item");
    if (slider.length > 0) {
        slider.owlCarousel({
            margin: -60,
            autoWidth: true,
            items: 1,
            autoplay: false,
            dots: false,
            center: true,
            nav: false,
            slideSpeed: 900,
            smartSpeed: 900,
            lazyLoad: false,
            loop: false,
            mouseDrag: true,
            touchDrag: true,
            fallbackEasing: 'Power1.easeInOut'

        });

        slider.on('initialized.owl.carousel', function(event) {
            TweenLite.to(slider, 1, {autoAlpha: 1});
        });

        var index = 0,
                indexPrev = 0;

        TweenLite.set(item, {scale: 0.8});
        TweenLite.set(item.eq(0), {scale: 1});

        // para hallar el Index anterior
        slider.on('change.owl.carousel', function(event) {
            if (indexPrev !== index) {
                indexPrev = index;
            }
        });

        // todo con el Index Actual
        slider.on('changed.owl.carousel', function(event) {

            index = event.item.index;
            TweenLite.to(item, 0.8, {delay: Math.abs(index - indexPrev) * 0.55, scale: 0.8, opacity: 0.9, ease: "Power4.easeInOut"});
            setTimeout(function() {
                item.removeClass("blured");
            }, 600);

            TweenLite.to(item.eq(index), 0.8, {delay: Math.abs(index - indexPrev) * 0.55, scale: 1, opacity: 1, ease: "Power4.easeInOut"});
            setTimeout(function() {
                item.eq(index).addClass("blured");
            }, 600);

            setTimeout(function() {
                $(".anios_js").trigger("to.owl.carousel", [index, 800, true]);
                
            }, 600);


        });
    }
}

function banner_blur_responsivo() {

    var slider = $(".banner_blur_responsivo_js"),
            item = slider.find(".item");
    if (slider.length > 0) {
        slider.owlCarousel({
            margin: 0,
            items: 1,
            autoplay: false,
            dots: false,
            center: true,
            nav: false,
            slideSpeed: 900,
            smartSpeed: 900,
            lazyLoad: false,
            loop: false,
            mouseDrag: true,
            touchDrag: true,
            fallbackEasing: 'Power1.easeInOut',
            onInitialized: function() {
                TweenLite.to(slider, 1, {autoAlpha: 1});
            }
        });


        var index = 0,
                indexPrev = 0;

        TweenLite.set(item, {scale: 0.8});
        TweenLite.set(item.eq(0), {scale: 1});

        // para hallar el Index anterior
        slider.on('change.owl.carousel', function(event) {
            if (indexPrev !== index) {
                indexPrev = index;
            }
        });

        // todo con el Index Actual
        slider.on('changed.owl.carousel', function(event) {

            index = event.item.index;
            TweenLite.to(item, 0.3, {delay: Math.abs(index - indexPrev) * 0.55, scale: 0.8, opacity: 0.7, ease: "Quad.easeInOut"});
            setTimeout(function() {
                item.removeClass("blured");
            }, 600);

            TweenLite.to(item.eq(index), 0.3, {delay: Math.abs(index - indexPrev) * 0.55, scale: 1, opacity: 1, ease: "Quad.easeInOut"});
            setTimeout(function() {
                item.eq(index).addClass("blured");
            }, 600);

            setTimeout(function() {
                $(".anios_js").trigger("to.owl.carousel", [index, 800, true]);
            }, 600);
        });
    }
}

function banner_anios() {
    var w_anios = $(".w_anios"),
            slider = $(".anios_js"),
            item = slider.find(".anio_item");
    if (slider.length > 0) {
        slider.owlCarousel({
            margin: 0,
            autoWidth: true,
            items: 0,
            autoplay: false,
            dots: false,
            center: true,
            nav: false,
            slideSpeed: 1500,
            smartSpeed: 1500,
            lazyLoad: false,
            loop: false,
            mouseDrag: false,
            touchDrag: false
        });

        item.on("click", function(e) {
            e.preventDefault();
            var self = $(this),
                    w_item = self.parent(".owl-item"),
                    idx = w_item.index();

            $(".anio_item").mouseout();

            slider.trigger("to.owl.carousel", [idx, 600, true]);
            $('.banner_blur_js').trigger("to.owl.carousel", [idx, 800, true]);
            $('.banner_blur_responsivo_js').trigger("to.owl.carousel", [idx, 800, true]);


        });
    }
}


function calendar() {
    if ($("#datepicker").length) {

        $.datepicker.regional['es'] = {
            closeText: 'Cerrar',
            prevText: '<Ant',
            nextText: 'Sig>',
            currentText: 'Hoy',
            monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
            dayNames: ['Domingo', 'Lunes', 'Martes', 'MiÃ©rcoles', 'Jueves', 'Viernes', 'SÃ¡bado'],
            dayNamesShort: ['Dom', 'Lun', 'Mar', 'MiÃ©', 'Juv', 'Vie', 'SÃ¡b'],
            dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'SÃ¡'],
            weekHeader: 'Sm',
            dateFormat: 'dd/mm/yy',
            firstDay: 1,
            isRTL: false,
            showMonthAfterYear: false,
            yearSuffix: ''
        };
        $("#datepicker").datepicker({
            changeMonth: true,
            changeYear: true,
            maxDate: "-18Y"
        });
        $("#datepicker").datepicker("option", "dateFormat", "dd-mm-yy");
        $.datepicker.setDefaults($.datepicker.regional['es']);
        $(".icon_datepicker").click(function() {
            $("#datepicker").datepicker("show");
        });
    }
}

function upload_foto_trabaja() {
    var fileInput = $(".input.archivo");
    if (fileInput.val() !== "") {
        $("#texto_file").val(fileInput.val());
        $("#texto_file").removeClass("error");
        $(".w_foto_file").removeClass("error");
    } else {
        $("#texto_file").val("Subir CV");
        $(".w_foto_file").addClass("error");
    }
}

function top_loading() {
    var top = $(".top");

    if (top.length) {

        var src = top.css('background-image').replace(/^url\(["']?/, '').replace(/["']?\)$/, '');

        if (src) {
            $('<img />').attr('src', src).load(function() {
                TweenLite.to(top, 1, {autoAlpha: 1, top: 0, ease: Power4.easeInOut});
            });
        }
    }
}

function open_menu() {
    var html = $("html"),
            body = $("body"),
            btn_open = $(".btn_menu_js"),
            menu_popup = $(".menu_open_js"),
            menu_popup_inner = $(".menu_open_inner_js"),
            btn_close = $(".btn_menu_close_js");
    btn_open.on("click", function(e) {
        e.preventDefault();

        var self = $(this);
        if (!self.hasClass("active")) {
            html.addClass("overflow_hidden");
            body.addClass("overflow_hidden");
            menu_popup.addClass("active");
            menu_popup_inner.addClass("active");
        }
    });
    btn_close.on("click", function(e) {
        e.preventDefault();
        if (menu_popup.hasClass("active")) {
            html.removeClass("overflow_hidden");
            body.removeClass("overflow_hidden");
            menu_popup_inner.removeClass("active");
            setTimeout(function() {
                menu_popup.removeClass("active");
            }, 100);
        }
    });
}

function left_inicial_resize() {
    containerWidth = $(".container").outerWidth();
    windowWidth = getWidthViewport();
    leftInicial = ((windowWidth - imageWidth) / 2);
    var bottom_back = $(".w_menu_bottom_back");
    TweenLite.set(bottom_back, {width: imageWidth + "px", left: leftInicial + "px"});
}

function animate_footer() {
    var banner = $(".banner_js"),
            bottom = $(".w_menu_bottom"),
            bottom_back = $(".w_menu_bottom_back"),
            ele = $(".menu_bottom li"),
            container = $(".container"),
            slice = 0,
            img = new Image;
    if (bottom_back.length) {
        var src = bottom_back.css('background-image').replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
        if (src) {
            img.src = src;
            $(img).load(function() {

                containerWidth = container.outerWidth();
                slice = containerWidth / 6;
                windowWidth = getWidthViewport();
                imageWidth = img.width;
                leftInicial = ((windowWidth - imageWidth) / 2);
                TweenLite.set(bottom_back, {width: imageWidth + "px", left: leftInicial + "px", onComplete: function() {
                        TweenLite.to(bottom, 0.6, {opacity: 1});
                        TweenLite.to(banner, 0.6, {opacity: 1});
                    }
                });
            });
        }
    }

    ele.hover(function() {
        var self = $(this),
                offsetLeft = self.offset().left,
                offsetLeftCenter = offsetLeft + (slice / 2),
                selfCenter = offsetLeftCenter - (windowWidth / 2);
        TweenLite.to(bottom_back, 0.6, {left: (leftInicial + selfCenter) + "px"});
    }, function() {
        TweenLite.to(bottom_back, 0.6, {left: leftInicial + "px"});

    });
}

function animate_footer_historia() {
    var bottom = $(".w_anios"),
            bottom_back = $(".anios_back_js"),
            ele = $(".anio_item"),
            container = $(".container"),
            slice = 0,
            img = new Image;

    if (bottom_back.length) {
        var src = bottom_back.css('background-image').replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
        if (src) {
            img.src = src;
            $(img).load(function() {

                containerWidth = container.outerWidth();
                slice = 177;
                windowWidth = getWidthViewport();
                imageWidth = img.width;
                leftInicial = ((windowWidth - imageWidth) / 2);
                TweenLite.set(bottom_back, {width: imageWidth + "px", left: leftInicial + "px", onComplete: function() {
                        TweenLite.to(bottom, 0.6, {autoAlpha: 1});
                    }
                });
            });
        }
    }

    ele.hover(function() {
        var self = $(this),
                offsetLeft = self.offset().left,
                offsetLeftCenter = offsetLeft + (slice / 2),
                selfCenter = offsetLeftCenter - (windowWidth / 2);
        TweenLite.to(bottom_back, 0.6, {left: (leftInicial + selfCenter) + "px"});
    }, function() {
        TweenLite.to(bottom_back, 0.6, {left: leftInicial + "px"});
    });
}

function footer_fixed() {
    var header = $(".wrapper_header"),
            body = $(".wrapper_body"),
            footer = $(".footer_fixed_bottom"),
            totalHeight = header.outerHeight() + body.outerHeight() + footer.outerHeight(),
            windowHeight = getHeightViewport();

    if (totalHeight >= windowHeight) {
        footer.removeClass("fixed");
    } else {
        footer.addClass("fixed");
    }
    TweenLite.to(footer, 0.6, {opacity: 1});
}

function scrollSpy_productos() {
    var btn_navigation = $(".btn_producto_down_js"),
            lastId,
            cur,
            sections = $(".producto_seccion_js"),
            navItem = $(".productos_nav_js li a"),
            scrollItems = sections.map(function() {
                var item = $("#" + $(this).attr("id"));
                if (item.length) {
                    return item;
                }
            });

    if (Modernizr.touch) {
        return;
    }

    if (location.hash !== "" && $(location.hash).length === 1) {

        var offsetTop = location.hash === "#" ? 0 : $(location.hash).offset().top + 1 - topHeight;
        if (offsetTop !== 0) {

            $('html, body').stop().animate({
                scrollTop: offsetTop
            }, 650);
            location.hash = "";
        }
    }

    navItem.click(function(e) {
        e.preventDefault();

        var href = $(this).attr("href");

        if ($(href).length === 1) {



            var offsetTop = href === "#" ? "" : $(href).offset().top;
            if (offsetTop !== "") {

                $('html, body').stop().animate({
                    scrollTop: offsetTop
                }, 1500, "easeInOutExpo");
            }
        }
    });

    $(window).scroll(function() {
        var self = $(this),
                fromTop = self.scrollTop();

        cur = scrollItems.map(function() {
            if ($(this).offset().top - 2 < fromTop)
                return this;
        });

        cur = cur[cur.length - 1];
        id = cur && cur.length ? cur[0].id : "";
        if (lastId !== id) {
            lastId = id;
            // Set/remove active class
            sections.removeClass("active");
            navItem.removeClass("active");
            if ($("#" + id).length === 1) {
                $("a[href=#" + id + "]").addClass("active");
            }
        }

        if ($("#" + id).index(".producto_seccion_js") === sections.length - 1 || $(window).scrollTop() + $(window).height() == $(document).height()) {
            $(".btn_producto_down_js.down").stop().fadeOut("slow");
            $(".btn_producto_down_js.up").stop().fadeIn("slow");
        } else {
            $(".btn_producto_down_js.up").fadeOut("slow");
            $(".btn_producto_down_js.down").fadeIn("slow");
        }

    });

    $(".btn_producto_down_js.down").on("click", function(e) {
        e.preventDefault();

        if ($("#" + id).closest(".producto_seccion").nextAll(".producto_seccion").eq(0).length) {
            $("html, body").stop().animate({scrollTop: $("#" + id).closest(".producto_seccion").nextAll(".producto_seccion").eq(0).offset().top}, 1500, "easeInOutExpo");
        }
    });
    $(".btn_producto_down_js.up").on("click", function(e) {
        e.preventDefault();
        var self = $(this);

        $("html, body").stop().animate({scrollTop: 0}, 500 * sections.length, "easeInOutExpo");
    });

    $(window).keydown(function(e) {

        if (e.keyCode == 40 || e.keyCode == 34) { // down
            e.preventDefault();
            if ($("#" + id).closest(".producto_seccion").nextAll(".producto_seccion").eq(0).length === 1) {
                $("html, body").stop().animate({scrollTop: $("#" + id).closest(".producto_seccion").nextAll(".producto_seccion").eq(0).offset().top}, 1500, "easeInOutExpo");
            }
        } else if (e.keyCode == 38 || e.keyCode == 33) { //up
            e.preventDefault();
            if ($("#" + id).closest(".producto_seccion").prevAll(".producto_seccion").eq(0).length === 1) {
                $("html, body").stop().animate({scrollTop: $("#" + id).closest(".producto_seccion").prevAll(".producto_seccion").eq(0).offset().top}, 1500, "easeInOutExpo");
            }
        }
    });
}

function vertical_parallax() {

    var $window = $(window),
            windowHeight = $window.height();

    if (!Modernizr.touch) {
        $('[data-type="element"]').each(function(i) {
            var self = $(this),
                    scrollTop = $window.scrollTop(),
                    offset = self.offset().top,
                    height = self.outerHeight();

            if (offset + height <= scrollTop || offset >= scrollTop + windowHeight) {
                return;
            }

            var yBgPosition = Math.round((offset - scrollTop) * -0.4);

            TweenLite.set(self, {css: {'backgroundPosition': "50% " + yBgPosition + "px"}});

        });
    }

    $(window).scroll(function() {

        if (!Modernizr.touch) {
            $('[data-type="element"]').each(function(i) {
                var self = $(this),
                        scrollTop = $window.scrollTop(),
                        offset = self.offset().top,
                        height = self.outerHeight();

                if (offset + height <= scrollTop || offset >= scrollTop + windowHeight) {
                    return;
                }

                var yBgPosition = Math.round((offset - scrollTop) * -0.4);

                TweenLite.set(self, {css: {'backgroundPosition': "50% " + yBgPosition + "px"}});

            });
        }
    });

}

function set_class_parallax_item() {

    if (!Modernizr.touch) {
        if ($("#" + id).length) {
            $("html, body").stop().animate({scrollTop: $("#" + id).offset().top}, 850, "easeInOutExpo");
        }
    }
}

function animate_nav_producto_detalle() {
    var wrapper_nav = $(".nav_producto_detalle_inner"),
            nav_item = $(".nav_producto_detalle").find("li"),
            nav_item_height = nav_item.height(),
            nav_active = $(".nav_active"),
            nav_hover = $(".nav_hover"),
            currentIndex = 0;

    wrapper_nav.hover(function() {
        TweenLite.set(nav_hover, {top: (currentIndex * nav_item_height) + 1 + "px", ease: "Power4.easeInOutExpo", onComplete: function() {
                TweenLite.to(nav_hover, 0.3, {opacity: 0.5, ease: "Power4.easeInOutExpo"});
            }
        });
    }, function() {
        TweenLite.to(nav_hover, 0.3, {opacity: 0, ease: "Power4.easeInOutExpo"});
    });

    nav_item.hover(function() {
        var self = $(this),
                selfHeight = self.height(),
                selfIndex = self.index();

        currentIndex = selfIndex;
        TweenLite.to(nav_hover, 0.5, {top: (selfIndex * selfHeight) + 1 + "px", ease: "Power4.easeInOutExpo"});
    }, function() {

    });

    nav_item.on("click", function() {
        var self = $(this),
                selfHeight = self.height(),
                selfIndex = self.index();

        currentIndex = selfIndex;
        TweenLite.to(nav_active, 0.5, {css: {top: (selfIndex * selfHeight) + 1 + "px", ease: "Power4.easeInOut"}});
    });
}

function select_botella() {
    
    $("body").on("click", '.presentacion_detalle a', function() {
        var self = $(this);
            
        if (!self.hasClass('active')) {
            
            self.parent("ul").find("a").removeClass('active');
            
            self.parents("ul").find("li").find("a").removeClass("active");
            self.addClass('active');
        }
    });
}

function nav_producto() {
    var btn = $(".nav_producto_js"),
            loading = $("#loading"),
            w_title = $(".types_detalle").find("h1"),
            w_types = $(".types_detalle").find("ul"),
            w_image = $(".image_detalle"),
            flag = true,
            w_detalle = $('.w_producto_detalle_js');

    btn.on("click", function() {

        if (flag) {
            flag = false;

            var self = $(this),
                    selfURL = self.data("url");

            $.ajax({
                beforeSend: function(XMLHttpRequest) {

                    TweenLite.to(loading, 0.85, {autoAlpha: 1});

                },
                data: {},
                dataType: "html",
                type: "post",
                url: selfURL,
                success: function(data, textStatus) {

                    if (data !== "") {

                        var title = $(data).find("h1"),
                                types = $(data).find(".presentacion_detalle");

                        /* CHECK IMAGE LOADED */
                        var src = "",
                                image = $(data).find("img.image_detalle");

                        src = image.attr("src");

                        var img = new Image();
                        img.src = src;

                        $(img).load(function() {
                            TweenLite.to(loading, 0.35, {autoAlpha: 0});
                        });

                        /* <img> - ADD HTML FROM AJAX */

                        TweenLite.to(w_image, 0.35, {left: '-20px', opacity: 0, onComplete: function() {
                                w_image.attr("src", src);
                                TweenLite.to(w_image, 0.85, {left: 0, opacity: 1});
                            }
                        });

                        /* <H1> - ADD HTML FROM AJAX */

                        TweenLite.to(w_title, 0.35, {top: '-15px', opacity: 0, onComplete: function() {
                                TweenLite.set(w_title, {top: '15px'});
                                w_title.html(title.html());
                                TweenLite.to(w_title, 0.85, {top: 0, opacity: 1});
                                
                            }
                        });

                        /* <UL> - ADD HTML FROM AJAX */

                        TweenLite.to(w_types, 0.35, {top: '15px', opacity: 0, onComplete: function() {
                                TweenLite.set(w_types, {top: '-15px'});
                                w_types.html(types.html());
                                TweenLite.to(w_types, 0.85, {top: 0, opacity: 1});
                                
                                flag = true;
                            }
                        });
                        
                        

                    }
                }

            });
        }

    });
}

function canvas_loader() {
    if($("#loading").length > 0){
        var clarr = new CanvasLoader('loading');
        clarr.setColor('#ffffff'); // default is '#000000'
        clarr.setDiameter(52); // default is 40
        clarr.setDensity(95); // default is 40
        clarr.setRange(0.8); // default is 1.3
        clarr.setSpeed(5); // default is 2
        clarr.setFPS(60); // default is 24
        clarr.show();
    }
}



var marker;
var map;
var mapOptions;

function initialize() {

    var miUbicacion = new google.maps.LatLng(-33.890542, 151.274856),
            mapOptions = {
                zoom: 10,
                center: miUbicacion,
                scrollwheel: (Modernizr.touch) ? false : true,
                draggable: (Modernizr.touch) ? false : true
            };

    var locations = [
      ['Sede 1', -33.890542, 151.274856, 4],
      ['Sede 2', -33.923036, 151.259052, 5],
      ['Sede 3', -34.028249, 151.157507, 3],
      ['Sede 4', -33.80010128657071, 151.28747820854187, 2],
      ['Sede 5', -33.950198, 151.259302, 1]
    ];

    map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);

    var bounds = new google.maps.LatLngBounds();
    var centerHorizontal = (Modernizr.touch) ? 0 : 0;
    var centerVertical = (Modernizr.touch) ? 0 : -60;
    var infowindow = new google.maps.InfoWindow();

    
    google.maps.event.addListener(map, 'click', function(event) {

        updateMarker(event.latLng);

    });

    var image = {
    url: template_url + '/assets/icons/mapa_marker2x.png',
        size: new google.maps.Size(34, 59),
        scaledSize: new google.maps.Size(34,59), 
        origin: new google.maps.Point(0,0),
        anchor: new google.maps.Point(0, 34)
    };

    for(var i = 0; i < locations.length; i++){

        var myLatLng = new google.maps.LatLng(locations[i][1], locations[i][2]);

        marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            title: "Laive",
            icon: image,
            animation: google.maps.Animation.DROP
        });

        bounds.extend (myLatLng);

        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
              infowindow.setContent('<div style="width: 80px; height: 20px; text-align: center;">' + locations[i][0] + '</div>');
              infowindow.open(map, marker);
            }
        })(marker, i));  
    }
    map.fitBounds(bounds);
    map.panBy(centerHorizontal, centerVertical);
    
}

function loadGoogleMap() {

    var script = document.createElement('script');

    script.type = 'text/javascript';

    script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&' +
            'callback=initialize';

    document.body.appendChild(script);

}

function formulario_visitas() {
    var form = $("#formulario_visitas");

    form.validate({
        debug: false,
        rules: {
            nombre: {
                minlength: 2,
                required: true
            },
            apellidos: {
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
            direccion: {
                minlength: 2,
                required: true
            },
            mensaje: {
                minlength: 2,
                required: true
            }
        },
        highlight: function(element) {
        $(element).parent('div').addClass('error');
        $(element).addClass('error');
        },
        unhighlight: function(element) {
            $(element).parent('div').removeClass('error');
            $(element).removeClass('error');
        }
    });
}
function formulario_sugerencias() {
    var form = $("#formulario_sugerencias");

    form.validate({
        debug: false,
        rules: {
            nombre: {
                minlength: 2,
                required: true
            },
            apellidos: {
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
            direccion: {
                minlength: 2,
                required: true
            },
            mensaje: {
                minlength: 2,
                required: true
            },
            foto: {
                required: true,
                minlength: 2
            }
        },
        highlight: function(element) {
        $(element).parent('div').addClass('error');
        $(element).addClass('error');
        },
        unhighlight: function(element) {
            $(element).parent('div').removeClass('error');
            $(element).removeClass('error');
        }
    });
}

function formulario_trabaja() {
    var form = $("#formulario_trabaja");

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
            direccion: {
                minlength: 2,
                required: true
            },
            dia: {
                required: true
            },
            mes: {
                required: true
            },
            anio: {
                required: true
            },
            archivo: {
                required: true,
                minlength: 2
            }
        },
        highlight: function(element) {
        $(element).parent('div').addClass('error');
        $(element).addClass('error');
        },
        unhighlight: function(element) {
            $(element).parent('div').removeClass('error');
            $(element).removeClass('error');
        }
    });
}

function GetFileInfo() {

    var fileInput = document.getElementById("foto_file");
    $("#foto_text").val(fileInput.value);

    if(fileInput.value != ""){
        $("#foto_text").removeClass("error").addClass("active");
        $(".w_foto_file").removeClass("error");
    }else{
        $("#foto_text").addClass("error").removeClass("active");
        $(".w_foto_file").addClass("error"); 
    }
}

function animateSwitchFormulariosContacto(){

    var btn = $(".form_opciones_js").find("a"),
        form = $(".form_contacto");
    
    btn.on("click", function(e){
        e.preventDefault();

        var self = $(this),
        selfID = self.attr("href"),
        selfForm = $(selfID);

        if(!self.hasClass("active")){
            btn.removeClass("active");
            self.addClass("active");
            TweenLite.to(form, 0.8, {left: "-20px", autoAlpha: 0, ease: "Power4.easeInOut", onComplete: function() {
                
                } 
            });
            setTimeout(function(){
                form.hide();
                selfForm.show();
                TweenLite.to(selfForm, 0.8, {delay: 0.3, left: 0, autoAlpha: 1, ease: "Power4.easeInOut"});
            }, 500);
            
        }
        
        
    });
}

function popupsRedesSociales() {
    var ele = $(".share");
    ele.jqSocialSharer();
}

function banner_watts() {

    var slider = $(".banner_watts_js"),
            item = slider.find(".banner_watt"),
            btn_prev = $('.w_banner_watts .nav.lft'),
            btn_next = $('.w_banner_watts .nav.rgt'),
            agroud = 4;

    if (slider.length > 0) {

        slider.owlCarousel({
            items: agroud,
            autoplay: false,
            autoplayHoverPause: true,
            autoplayTimeout: 5000,
            dots: false,
            nav: false,
            slideBy: 1,
            slideSpeed: 980,
            smartSpeed: 950,
            lazyLoad: true,
            loop: false,
            fallbackEasing: 'Power4.easeInOut'
        });

        if (item.length < agroud) {
            btn_next.fadeOut();
        }

        slider.on('changed.owl.carousel', function (event) {

            var index = event.item.index;

            if (index === 0) {
                btn_prev.fadeOut();
            } else {
                btn_prev.fadeIn();
            }
            if (index === item.length - agroud) {
                btn_next.fadeOut();
            } else {
                btn_next.fadeIn();
            }

        });


        if (item.length > 0) {
            btn_prev.click(function () {
                slider.trigger('prev.owl.carousel');
            });
            btn_next.click(function () {
                slider.trigger('next.owl.carousel');
            });
        } else {
            TweenLite.set(btn_prev, {
                autoAlpha: 0
            });
            TweenLite.set(btn_next, {
                autoAlpha: 0
            });
        }

    }
}


$(window).on('load', function() {
    banner_anios();
    footer_fixed();
    if ($('#map-canvas').length > 0) {
        loadGoogleMap();
    }
});
$(window).on('resize orientationchange', function() {

    left_inicial_resize();
    footer_fixed();
    set_class_parallax_item();

});
$(document).ready(function() {

    $.validator.addMethod("regex", function(value, element, regexp) {
        var re = new RegExp(regexp);
        return this.optional(element) || re.test(value);
    }, "");

    top_loading();
    bannerHome();
    open_menu();
    animate_footer();
    animate_footer_historia();
    calendar();
    banner_blur();
    banner_blur_responsivo();
    scrollSpy_productos();
    vertical_parallax();
    animate_nav_producto_detalle();
    select_botella();
    nav_producto();
    canvas_loader();
    formulario_sugerencias();
    formulario_visitas();
    animateSwitchFormulariosContacto();
    formulario_trabaja();
    popupsRedesSociales();
    banner_watts();

    if (Modernizr.touch) {
        $(".width_touch").addClass("touch");
        $(".banner_blur").removeClass("blur");
    }

});