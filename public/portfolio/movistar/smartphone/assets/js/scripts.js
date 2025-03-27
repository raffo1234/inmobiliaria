"use strict"

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

function check() {
    var check = $(".check_js");

    check.hover(function() {
        var self = $(this),
                ico = self.find(".ico");
        TweenLite.to(ico, 0.25, {left: 0});
    }, function() {
        var self = $(this),
                ico = self.find(".ico");
        TweenLite.to(ico, 0.25, {left: "100%"});
    });
}

function verMas() {
    var btn = $(".mas_js"),
            ocultos = $(".ocultos_js"),
            top = $(".top_js"),
            wrapper = $(".wrapper_js"),
            content = $(".content_js");

    btn.on("click", function(e) {
        e.preventDefault();
        var self = $(this);
        if (!self.hasClass("active")) {
            self.addClass("active").html('Ver menos&nbsp;&nbsp;<img src="assets/icons/arrow_up.png" class="display-inline" alt="" />');
            top.addClass("active");
            wrapper.addClass("active");
            content.addClass("active");
            ocultos.slideDown();
        } else {
            self.removeClass("active").html('Ver más&nbsp;&nbsp;<img src="assets/icons/arrow_down.png" class="display-inline" alt="" />');
            ;
            top.removeClass("active");
            wrapper.removeClass("active");
            content.removeClass("active");
            ocultos.slideUp();
        }

    });
}

function getHeightTop() {
    return $(".top_js").outerHeight();
}
function getHeightBotones() {
    return $(".botones_js").outerHeight();
}

function setHeightContent() {
    var wrapper = $(".wrapper_js"),
            windowHeight = getHeightViewport(),
            topHeight = getHeightTop(),
            botonesHeight = getHeightBotones();

    if (!wrapper.hasClass("active")) {
        TweenLite.set($(".content_js"), {height: windowHeight * 1 - (topHeight + botonesHeight) + "px", top: getHeightTop() + "px"});
    }
}

$(window).on('load', function() {

});
$(window).on('resize orientationchange', function() {
    getHeightTop();
    getHeightViewport()
    setHeightContent();
    getHeightBotones();

});
$(document).ready(function() {
    check();
    verMas();

    getHeightTop();
    getHeightViewport();
    setHeightContent();
    getHeightBotones();
});