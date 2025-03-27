var porcentajeInicial = 30,
        porcentaje,
        speedTransition = 0.8,
        speedDelaySlide,
        flag_global = true,
        idx = 0,
        slugInicio = "inicio";
objStates = {},
        objStatesPrev = {};


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

var ie = (function () {

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


var currentSlug;
var linksPopup;
$(document).ready(function () {

    linksPopup = $.map(pages, function (value, key) {
        if (value.ispopup === 'yes') {
            return $(".btn_animate_js[data-href=" + key + "]");
        }
    });

    if ($(".into_js").length) {
        btn_continuar_intro(function () {
            do_animate(GET, true, true, "", loadingInit);
        });
    } else {
        do_animate(GET, true, true, "", loadingInit);
    }
});

var doitPopstate; // para clearTimeout(doit);
var objStatesPrev;
if (supports_history_api()) {

    window.addEventListener('popstate', function (event) {

        if (event.state === null)
            return;

        if (currentSlug === event.state.slug)
            return;

        /* GET DIRECION STATS */
        /* currentSlug */
        var direction = "toleft";

        TweenLite.to($(".w_loading_panel_js"), speedTransition, {autoAlpha: 1}); // loading panel

        clearTimeout(doitPopstate);
        doitPopstate = setTimeout(function () {

            var len = Object.keys(event.state).length;

            //currentSlug = objStates[len - 1].slug;
//            var prevPopup = objStatesPrev[len - 1].popup;
//            var curr;

            currentSlug = event.state[len - 1].slug;

//                console.log("prev: " + prevPopup);
//                console.log("curr: " + currentPopup);

            do_animate(currentSlug, false, false, direction);


            //currentSlug = event.state.slug;

            //    do_animate(currentSlug, false, false, direction);
        }, speedTransition * 1000);
    });
}

function do_animate(slug, loadFirstTime, push, direction, callback) { // check slug for popup

    if (document.location.protocol === 'file:') {
        alert('The HTML5 History API (and thus History.js) do not work on files, please upload it to a server.');
    }

    if (slug.search('--') === -1 && slug.search('__') === -1) { // sin popup

        currentSlug = (typeof pages[slug] !== 'undefined' && pages[slug]['ispopup'] === 'no') ? slug : slugInicio;

        if (supports_history_api()) {
            $(".btn_close_popup_js").attr("href", currentSlug + "__");
        } else {
            $(".btn_close_popup_js").attr("href", currentSlug);
        }

        $(".w_popup").fadeOut('fast', function () {
            $(".popup_inner").html(" ").empty();
        }).removeClass("active");
        $("body").css({overflowY: 'scroll'});

        load_content(currentSlug, false, "", direction, callback);

        // Actualiza el href de los link que abren popup
        $.map(linksPopup, function (value, key) {

            var href = '';
            var datahref = '';
            datahref = value.data("href");

            if (typeof datahref !== 'undefined') {

                href = currentSlug + '--' + datahref;
                value.attr("href", href);
            }
        });

        // push
        if (supports_history_api()) {
            if (push) {
                var id = idx++;
                objStates[id] = {idx: id, slug: currentSlug, popup: "sinpopup"};
                history.pushState(objStates, currentSlug, currentSlug);
                objStatesPrev = objStates;
            }
        }

        document.title = pages[currentSlug].title;
    }
    if (slug.search('--') !== -1) { // abre popup

        var arraySlug = slug.split("--");
        var stringSlugFirst = arraySlug[0];
        var stringSlugSecond = arraySlug[1];

        // check first slug array element
        stringSlugFirst = (typeof pages[stringSlugFirst] !== "undefined" && pages[stringSlugFirst]['ispopup'] === 'no') ? stringSlugFirst : slugInicio;
        if (supports_history_api()) {
            $(".btn_close_popup_js").attr("href", stringSlugFirst + "__");
        } else {
            $(".btn_close_popup_js").attr("href", stringSlugFirst);
        }

        // check second slug array element
        stringSlugSecond = (typeof pages[stringSlugSecond] !== 'undefined' && pages[stringSlugSecond]['ispopup'] === 'yes') ? stringSlugSecond : '';

        // set current slug with (--)
        if (stringSlugSecond !== '') {
            currentSlug = stringSlugFirst + '--' + stringSlugSecond;

            if (loadFirstTime) {
                load_content(stringSlugFirst, true, stringSlugSecond, "", callback); /// true => load popup

            } else {
                load_popup(stringSlugSecond);

            }
        } else {
            currentSlug = stringSlugFirst;
            if (loadFirstTime) {
                load_content(stringSlugFirst, false, stringSlugSecond, "", callback);

            }

        }
        // push
        if (supports_history_api()) {
            if (push) {
                var id = idx++;
                objStates[id] = {idx: id, slug: currentSlug, popup: "abrepopup"};
                history.pushState(objStates, currentSlug, currentSlug);
                objStatesPrev = objStates;
            }
        }

        document.title = pages[stringSlugSecond].title;
    }
    if (slug.search('__') !== -1) { // cierra popup

        var arraySlug = slug.split("__");
        var stringSlugFirst = arraySlug[0];

        stringSlugFirst = (typeof pages[stringSlugFirst] !== "undefined" && pages[stringSlugFirst]['ispopup'] === 'no') ? stringSlugFirst : slugInicio;

        $(".w_popup").fadeOut('fast', function () {
            $(".popup_inner").html(" ").empty();
        }).removeClass("active");
        $("body").css({overflowY: 'scroll'});
        flag_global = true;
        TweenLite.to($(".w_loading_panel_js"), speedTransition, {autoAlpha: 0});

        currentSlug = stringSlugFirst;

        // push
        if (supports_history_api()) {
            if (push) {
                var id = idx++;
                objStates[id] = {idx: id, slug: currentSlug, popup: "cierrapopup"};
                history.pushState(objStates, currentSlug, currentSlug);
                objStatesPrev = objStates;
            }
        }

        document.title = pages[currentSlug].title;
    }

   // setTrackGoogleAnalitycs();
}

function click_handler() {

    var clickOrTouch = (('ontouchend' in window)) ? 'touchend' : 'click';
    $("body").delegate(".btn_animate_js", "click", function (e) {
        if (supports_history_api())
            e.preventDefault();

        var self = $(this),
                href = self.attr("href"),
                slug;

        if (href === currentSlug)
            return;

        if (self.hasClass("btn_close_popup_js")) {
            is_btn_close = true;
        } else {
            is_btn_close = false;
        }

        var n = href.search("--");
        if (n === -1) {
            slug = href;
        } else {
            var arraySlug = href.split("--");
            var stringSlugFirst = arraySlug[0];

            slug = stringSlugFirst;
        }

        if (flag_global === false)
            return;
        flag_global = false;
        TweenLite.to($(".w_loading_panel_js"), speedTransition, {autoAlpha: 1});

        do_animate(href, false, true, "");

    });
}

function load_popup(slug) {

    var w_popup = $(".w_popup"),
            popup_inner = $(".popup_inner_js"),
            loading_popup = $(".loading_popup_js"),
            body = $("body"),
            url_popup;

    if (!w_popup.hasClass("active")) {
        w_popup.fadeIn("fast").addClass("active");
        body.css({overflow: 'hidden'});
    }

    $.each(pages, function (index, value) { // pages, variable en pages.js
        if (index === slug) {
            url_popup = value.url_left;
        }
    });

    TweenLite.to(loading_popup, speedTransition * 0.5, {autoAlpha: 1, ease: Power4.easeInOut, onComplete: function () {
            TweenLite.to(popup_inner, speedTransition * 0.75, {autoAlpha: 0, ease: Power4.easeInOut, onComplete: function () {
                    var obtenerContenidoPopup = $.ajax({
                        url: url_popup,
                        type: "POST",
                        dataType: "html"
                    });

                    $.when(obtenerContenidoPopup).then(function (dataPopup) {

                        if (dataPopup[0] !== '') {
                            popup_inner.html("").empty().html(dataPopup);
                            TweenLite.to(loading_popup, speedTransition * 0.75, {autoAlpha: 0, ease: Power4.easeInOut, onComplete: function () {
                                    TweenLite.to(popup_inner, speedTransition * 0.75, {autoAlpha: 1, ease: Power4.easeInOut, onComplete: function () {
                                            flag_global = true; // after loaded popup

                                            // change href to links popup
                                            linksPopup = $.map(pages, function (value, key) {
                                                if (value.ispopup === 'yes') {

                                                    return $(".btn_animate_js[data-href=" + key + "]");
                                                }
                                            });
                                            $.map(linksPopup, function (value, key) { //check if slug exist en pages.js

                                                var href = '';
                                                var datahref = '';
                                                var current = '';
                                                datahref = value.data("href");

                                                if (typeof datahref !== 'undefined') {

                                                    current = currentSlug.split('--');
                                                    current = current[0];

                                                    href = current + '--' + datahref;
                                                    value.attr("href", href);
                                                }
                                            });
                                        }
                                    });
                                }
                            });

                        }
                    }, function () {

                    }, function () {

                    });
                }
            });
        }
    });



}

function load_content(slug, loadPopup, slugSecond, direction, callback) {
    var self_id,
            self_url_left,
            self_url_right,
            self_dir,
            self_type,
            logo,
            logo_img,
            wrapper_panel_left,
            wrapper_panel_right,
            flag_lft = true,
            flag_rgt = true,
            flag_animate = true,
            submenu = $(".submenu_js");

    $.each(pages, function (index, value) { // pages, variable en pages.js
        if (index === slug) {

            self_id = value.id;
            self_url_left = value.url_left;
            self_url_right = value.url_right;
            self_dir = (direction !== '') ? direction : value.dir;
            self_type = value.type;
            logo = $(".logo_js"),
                    logo_img = logo.find("img"),
                    wrapper_panel_left = $('.wrapper_panel_left_js'),
                    wrapper_panel_right = $('.wrapper_panel_right_js');
        }
    });
    var html_body = $("html, body");
    var obtenerContenidoLeft = $.ajax({
        url: self_url_left,
        type: "POST",
        dataType: "html"
    });
    var obtenerContenidoRight = $.ajax({
        url: self_url_right,
        type: "POST",
        dataType: "html"
    });
    $.when(obtenerContenidoLeft, obtenerContenidoRight).then(function (dataLeft, dataRight) {

        if (dataLeft[0] !== '' && dataRight[0] !== '') {
            if (flag_animate) {
                flag_animate = false;
                TweenLite.to($(".w_loading_panel_js"), speedTransition, {autoAlpha: 0, onComplete: function () {

                        // animate el logo
                        if (self_type === "todetail") {
                            TweenLite.to(logo, speedTransition, {left: '30%', marginLeft: '-80px', ease: Power4.easeInOut});
                            TweenLite.to(logo_img, speedTransition, {width: '160px', ease: Power4.easeInOut});
                            TweenLite.to(submenu, speedTransition, {width: '70%', ease: Power4.easeInOut});
                        } else if (self_type === "tohome") {
                            TweenLite.to(logo, speedTransition, {left: '50%', marginLeft: '-95px', ease: Power4.easeInOut});
                            TweenLite.to(logo_img, speedTransition, {width: '190px', ease: Power4.easeInOut});
                            TweenLite.to(submenu, speedTransition, {width: '50%', ease: Power4.easeInOut});
                        }
                        setDimentionsPanelLeft(self_type, true);
                        TweenLite.to(wrapper_panel_right, speedTransition, {width: (100 - porcentaje) + '%', ease: Power4.easeInOut});

                        // animate panels
                        if (self_dir === "toleft") {
                            if (flag_lft === true && flag_rgt === true) {
                                flag_lft = false;
                                flag_rgt = false;
                                wrapper_panel_left.append(dataLeft[0]);
                                TweenLite.set(wrapper_panel_left.find('.panel_animate_js').eq(1), {left: '100%'});
                                TweenLite.to(wrapper_panel_left.find('.panel_animate_js').eq(0), speedDelaySlide, {left: '-100%', zIndex: 1, ease: Power4.easeInOut});
                                TweenLite.to(wrapper_panel_left.find('.panel_animate_js').eq(1), speedDelaySlide, {left: 0, zIndex: 2, ease: Power4.easeInOut, onComplete: function () {
                                        wrapper_panel_left.find('.panel_animate_js').eq(0).remove();
                                        flag_lft = true;
                                    }
                                });
                                setHomeFullScreen(wrapper_panel_right, html_body, 1, "no");
                                wrapper_panel_right.append(dataRight[0]);
                                TweenLite.set(wrapper_panel_right.find('.panel_animate_js').eq(1), {left: '100%'});
                                TweenLite.to(wrapper_panel_right.find('.panel_animate_js').eq(0), speedDelaySlide, {left: '-100%', zIndex: 1, ease: Power4.easeInOut});
                                TweenLite.to(wrapper_panel_right.find('.panel_animate_js').eq(1), speedDelaySlide, {left: 0, zIndex: 2, ease: Power4.easeInOut, onComplete: function () {
                                        setHomeFullScreen(wrapper_panel_right, html_body, 1, "yes");
                                        wrapper_panel_right.find('.panel_animate_js').eq(0).remove();
                                        flag_rgt = true;
//                                        
                                        if (flag_rgt && flag_lft) {
                                            typeof callback === 'function' && callback();
                                            flag_global = true;

                                            if (loadPopup === true) {
                                                load_popup(slugSecond);
                                            }

                                            // solo para < 1023
                                            var speedScroll = (getWidthViewport() < 1023) ? 500 : 250;
                                            if (slug !== slugInicio) {
                                                var t = setTimeout(function () {
                                                    $('html, body').animate({scrollTop: wrapper_panel_right.offset().top - 60}, speedScroll);
                                                }, 300);
                                            }

                                            //alert(wrapper_panel_right.offset().top + 60);
                                        }
                                    }
                                });
                            }
                        } else if (self_dir === "toright") {
                            if (flag_lft === true && flag_rgt === true) {
                                flag_lft = false;
                                flag_rgt = false;
                                wrapper_panel_left.prepend(dataLeft[0]);
                                TweenLite.set(wrapper_panel_left.find('.panel_animate_js').eq(0), {left: '-100%'});
                                TweenLite.to(wrapper_panel_left.find('.panel_animate_js').eq(0), speedDelaySlide, {left: '0', zIndex: 2, ease: Power4.easeInOut});
                                TweenLite.to(wrapper_panel_left.find('.panel_animate_js').eq(1), speedDelaySlide, {left: '100%', zIndex: 1, ease: Power4.easeInOut, onComplete: function () {
                                        wrapper_panel_left.find('.panel_animate_js').eq(1).remove();
                                        flag_lft = true;
                                    }
                                });
                                setHomeFullScreen(wrapper_panel_right, html_body, 0, "no");
                                wrapper_panel_right.prepend(dataRight[0]);
                                TweenLite.set(wrapper_panel_right.find('.panel_animate_js').eq(0), {left: '-100%'});
                                TweenLite.to(wrapper_panel_right.find('.panel_animate_js').eq(0), speedDelaySlide, {left: 0, zIndex: 1, ease: Power4.easeInOut});
                                TweenLite.to(wrapper_panel_right.find('.panel_animate_js').eq(1), speedDelaySlide, {left: "100%", zIndex: 2, ease: Power4.easeInOut, onComplete: function () {
                                        setHomeFullScreen(wrapper_panel_right, html_body, 1, "yes");
                                        wrapper_panel_right.find('.panel_animate_js').eq(1).remove();
                                        flag_rgt = true;
                                        if (flag_rgt && flag_lft) {
                                            typeof callback === 'function' && callback();
                                            flag_global = true;

                                            if (loadPopup === true) {
                                                load_popup(slugSecond);
                                            }

                                            // solo para < 1023
                                            var speedScroll = (getWidthViewport() < 1023) ? 500 : 250;
                                            if (slug !== slugInicio) {
                                                var t = setTimeout(function () {
                                                    $('html, body').animate({scrollTop: wrapper_panel_right.offset().top - 60}, speedScroll);
                                                }, 300);
                                            }
                                        }
                                    }
                                });
                            }
                        }
                    }
                });
            }
        }

    }, function () {

    }, function () {

    });
}

function setHomeFullScreen(wrapper_panel_right, html_body, idx, onComplete) {

    var n = currentSlug.search("--");
    var slug;

    if (n === -1) {
        slug = currentSlug;
    } else {
        var arraySlug = currentSlug.split("--");
        var stringSlugFirst = arraySlug[0];
        slug = stringSlugFirst;
    }

    //
    if (slug === slugInicio || slug === 'guia-para-personas-naturales' || slug === 'guia-para-empresas-y-negocios') {
        TweenLite.set($(".submenu_js"), {autoAlpha: 0, ease: Power4.easeInOut});
    } else {
        TweenLite.to($(".submenu_js"), speedTransition, {delay: 1, autoAlpha: 1, ease: Power4.easeInOut});
    }
    if (slug === slugInicio) {
        html_body.css("height", "100%");
        TweenLite.set(wrapper_panel_right.find('.panel_animate_js').eq(idx), {
            position: 'absolute'
        });
    } else {
        if (onComplete === "yes") {
            html_body.css("height", "auto");
            TweenLite.set(wrapper_panel_right.find('.panel_animate_js').eq(idx), {
                position: 'static'
            });
            setOpcionesSubMenu();
        }
    }
}

function setOpcionesSubMenu() {
    var submenu = $(".submenu_js"),
            current_title = $(".current_title_js"),
            currentTitle = '',
            btn = $(".submenu_link_js"),
            clase = '',
            ul = $(".submenu_opciones_js"),
            w_submenu_link_inner = $(".w_submenu_link_inner_js"),
            title,
            active,
            currentPersona,
            li = '',
            slugOpc;

    var n = currentSlug.search("--");

    if (n === -1) {
        slugOpc = currentSlug;
    } else {
        var arraySlug = currentSlug.split("--");
        var stringSlugFirst = arraySlug[0];

        slugOpc = stringSlugFirst;
    }

    $.each(pages, function (index, value) {
        if ((index === slugOpc)) {
            currentPersona = value.persona;
            currentTitle = value.title;
        }
    });
    $.each(pages, function (index, value) {
        active = (slugOpc === index) ? "active" : "";
        if (currentPersona === value.persona) {
            title = value.title;
            li += '<li><a href="' + index + '" class="btn_animate_js ' + active + '"><i class="icon-circle"></i>' + title + '</a></li>';
        }
    });
    clase = (currentPersona === "natural") ? "submenu_blue" : "submenu_green";
    (currentPersona === "natural") ? btn.find(".txt").text("Personas naturales") : btn.find(".txt").text("Personas jurídicas");
    current_title.text(currentTitle);
    submenu.removeClass("submenu_blue").removeClass("submenu_green").addClass(clase);
    ul.html("").empty().html(li);

    // click open and close
    w_submenu_link_inner.hover(function () {
        $(this).addClass("active");
    }, function () {
        $(this).removeClass("active");
    });
    ul.find("a").on("click", function () {
        w_submenu_link_inner.removeClass("active");
    });

}

function setDimentionsPanelLeft(self_type, isAnimating) {

    switch (self_type) {
        case "todetail":
        case porcentajeInicial:
            porcentaje = porcentajeInicial;
            break;
        default:
            porcentaje = 50;
    }

    var wrapper_panel_left = $(".w_panel_lft_js");
    if (getWidthViewport() > 1023) {
        speedDelaySlide = speedTransition;
        wrapper_panel_left.removeClass("responsive");

        switch (self_type) {
            case "todetail":
            case porcentajeInicial:
                wrapper_panel_left.addClass("lefted");
                break;
            default:
                wrapper_panel_left.removeClass("lefted");
        }

        var wrapper = $(".wrapper"),
                wrapper_width = wrapper.outerWidth(),
                paddingLeft = ($("body").innerWidth() - wrapper_width) * 0.5,
                width = paddingLeft + wrapper_width * porcentaje * 0.01;
        if (isAnimating === true) {
            TweenLite.to(wrapper_panel_left, speedTransition, {
                paddingLeft: paddingLeft + 'px', width: width + 'px', ease: Power4.easeInOut
            });
        } else {
            TweenLite.set(wrapper_panel_left, {
                paddingLeft: paddingLeft + 'px', width: width + 'px'
            });
        }
    } else {
        speedDelaySlide = 0;
        wrapper_panel_left.addClass("responsive");
    }



}

function setMinHeightPanelRight() {
    var panelLeft = $(".wrapper_panel_left_js"),
            panelLeftHeight = panelLeft.outerHeight(),
            panelRight = $(".wrapper_panel_right_js");

    TweenLite.set(panelRight, {minHeight: panelLeftHeight + 'px'});
}

function setTrackGoogleAnalitycs() {

// track google analytics
    ga('send', 'pageview', currentSlug);
}

function supports_history_api() {
    return !!(window.history && history.pushState);
}
function loadingInit() {

    var panel_lft = $(".w_panel_lft_js"),
            wrapper = $(".wrapper");
    TweenLite.to(wrapper, speedTransition, {autoAlpha: 1, ease: Power4.easeInOut});
    TweenLite.to(panel_lft, speedTransition, {autoAlpha: 1, ease: Power4.easeInOut});

    var loading = $(".loading_init_js");
    TweenLite.to(loading, speedTransition, {autoAlpha: 0, ease: Power4.easeInOut, onComplete: function () {
            loading.remove();
        }
    });
}

function tabs() {

    $("body").delegate(".tab_head_js", "click", function () {
        var self = $(this),
                self_ico = self.find(".tab_ico").find("i"),
                self_body = self.parents(".tab_js").find(".tab_body_js");
        if (!self.hasClass("active")) {
            $("body").find(".tab_head").removeClass("active");
            self.addClass("active");
            $("body").find(".tab_ico").find("i").removeClass("icon-keyboard-arrow-up").addClass("icon-keyboard-arrow-down");
            self_ico.removeClass("icon-keyboard-arrow-down").addClass("icon-keyboard-arrow-up");
            $("body").find(".tab_body_js").slideUp("fast");
            self_body.slideDown("fast");
            TweenLite.to($("body").find(".tab_body_js"), 0.5, {delay: 0.3, autoAlpha: 0});
            TweenLite.to(self_body, 0.5, {delay: 0.3, autoAlpha: 1});
        } else {
            self.removeClass("active");
            self_body.slideUp("fast");
            TweenLite.to(self_body, 0.5, {delay: 0.3, autoAlpha: 0});
            self_ico.removeClass("icon-keyboard-arrow-up").addClass("icon-keyboard-arrow-down");
        }
    });
}

function show_loading_ie() {
    var gif = $(".gif_loading_init"),
            svg = $(".svg_loading_init");
    if (ie > 10) {
        gif.hide();
        svg.show();
    } else if (ie <= 10) {
        gif.show();
        svg.hide();
    } else {
        gif.hide();
        svg.show();
    }
}

function btn_continuar_intro(callback) {
    var btn = $(".continuar_js"),
            intro = $(".into_js");

    btn.on("click", function (e) {
        e.preventDefault();

        if (intro.hasClass("active")) {
            intro.fadeOut("fast", function () {
                intro.removeClass("active");
                intro.remove();
                typeof callback === 'function' && callback();
            });
        }
    });
}

function menuResponsive() {
    var btn = $(".btn_mobile_js"),
            className = "desplazado",
            panel_left = $(".w_panel_lft_js"),
            wrapper = $(".wrapper"),
            logo = $(".logo"),
            top = $(".top"),
            nav_top = $(".nav_top"),
            redes_sociales = $(".redes_sociales"),
            html = $("html"),
            body = $("body");

    btn.on('click', function (e) {
        e.preventDefault();

        if (getWidthViewport() < 767) {
            var self = $(this);

            if (!self.hasClass("active")) {
                self.addClass("active");
                body.addClass(className);
                html.addClass(className);
                panel_left.addClass(className);
                wrapper.addClass(className);
                logo.addClass(className);
                top.addClass(className);
                nav_top.addClass(className);
                redes_sociales.addClass(className);
            } else {
                self.removeClass("active");

                panel_left.removeClass(className);
                wrapper.removeClass(className);
                logo.removeClass(className);
                top.removeClass(className);
                nav_top.removeClass(className);
                redes_sociales.removeClass(className);

                var t = setTimeout(function () {
                    body.removeClass(className);
                    html.removeClass(className);
                }, 300);
            }
        }
    });
}

$(window).on('load', function () {

});
$(window).on('resize orientationchange', function () {
    setDimentionsPanelLeft(porcentaje, false);
    setMinHeightPanelRight();

});
$(document).ready(function () {
    show_loading_ie();
    click_handler();
    tabs();
    setMinHeightPanelRight();
    menuResponsive();
});