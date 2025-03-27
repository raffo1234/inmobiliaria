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

function formularioBuscador() {
    var form = $(".formulario_buscador"),
            w_resultados = $(".w_resultados"),
            populares_html = $(".resultado_populares"),
            vistos_html = $(".resultado_vistos"),
            comprados_html = $(".resultado_comprados"),
            form_pop = $("#formulario_buscador_popup"),
            buscador = $(".buscador"),
            resultados = $(".w_buscador_js"),
            html_body = $("body, html"),
            btn_close = $(".btn_close_buscador_js");

    form.submit(function () {
        var self = $(this);

        form.addClass("active");

        html_body.addClass("overflow");
        buscador.addClass("active");
        resultados.fadeIn(function () {
            showResultado(self.find("input").val(), 1);
        });

        self.find("input").blur();
        form_pop.find("input").val(self.find("input").val());


        return false;
    });

    btn_close.on("click", function (e) {
        e.preventDefault();

        buscador.removeClass("active");

        setTimeout(function () {
            resultados.fadeOut(function () {
                populares_html.html("").empty();
                vistos_html.html("").empty();
                comprados_html.html("").empty();
                w_resultados.css({opacity: 0});
            });
        }, 300);
        setTimeout(function () {
            html_body.removeClass("overflow");
        }, 650);

        form.find("input").val("");

    });

    $(document).keyup(function (e) {
        if (e.keyCode == 27) {
            if (buscador.hasClass("active")) {
                buscador.removeClass("active");

                setTimeout(function () {
                    resultados.fadeOut(function () {
                        populares_html.html("").empty();
                        vistos_html.html("").empty();
                        comprados_html.html("").empty();
                        w_resultados.css({opacity: 0});
                    });
                }, 300);
                setTimeout(function () {
                    html_body.removeClass("overflow");
                }, 650);

                form.find("input").val("");
            }

        }

    });

    form_pop.submit(function () {
        var self = $(this);

        showResultado(self.find("input").val(), 0);

        if (Modernizr.touch) {
            self.find("input").blur();
        }

        return false;
    });
}

function showResultado(string, param) {
    var w_resultados = $(".w_resultados"),
            populares_html = $(".resultado_populares"),
            vistos_html = $(".resultado_vistos"),
            comprados_html = $(".resultado_comprados"),
            loading = $(".loading_js");

    TweenLite.to(loading, 0.45, {autoAlpha: 1});
    TweenLite.to(w_resultados, 0.45, {
        opacity: 0, onComplete: function () {
            if (param === 1) {
                w_resultados.slideUp();
            }

            $.ajax({
                type: "POST",
                url: "resultados.php",
                data: {s: string},
                dataType: "json",
                async: true,
                success: function (data) {

                    if (data !== "" && data !== "false") {

                        var populares = data["populares"];
                        var vistos = data["vistos"];
                        var comprados = data["comprados"];

                        populares_html.html(" ").empty();
                        vistos_html.html(" ").empty();
                        comprados_html.html(" ").empty();

                        populares_html.html(createProducto(populares));
                        vistos_html.html(createProducto(vistos));
                        comprados_html.html(createProducto(comprados));

                        if (param === 0) {
                            TweenLite.to(w_resultados, 1, {
                                delay: 0.2, opacity: 1
                            });
                        } else if (param === 1) {
                            w_resultados.slideDown(function () {
                                TweenLite.to(w_resultados, 1, {
                                    delay: 0.2, opacity: 1
                                });
                            });
                        }
                        TweenLite.to(loading, 0.45, {delay: 0.4, autoAlpha: 0});

                    }
                }
            });
        }
    });
}

function createProducto(productos) {
    var output = "";
    $.map(productos, function (n, i) {
        output += '<a href="' + n['url'] + '" id="prod_' + n['id'] + '" class="resultado_in">' +
                '<div class="resultado_inner">' +
                '    <div class="img">' +
                '        <img src="' + n['img'] + '" width="79" alt="' + n['title'] + '">' +
                '    </div>' +
                '    <div class="txt align_left">' +
                '        <p>' + n['title'] + '</p>' +
                '    </div>' +
                '    <div class="price">' +
                '        <p>$ ' + n['price'] + '</p>' +
                '    </div>' +
                '</div>' +
                '</a>';
    });

    return output;
}

function menuTop() {
    var top = $(".top_menu"),
            btn = $(".menu_top_js"),
            bar_1 = btn.find("#bar_1"),
            bar_2 = btn.find("#bar_2"),
            bar_3 = btn.find("#bar_3");
    btn.on("click", function (e) {
        e.preventDefault();
        var self = $(this);
        if (!self.hasClass("active")) {
            self.addClass("active");
            setTimeout(function () {
                top.addClass("active");
            }, 250);
            TweenLite.to(top, 0.45, {
                height: '47px'
            });
            TweenLite.to(bar_1, 0.45, {
                rotation: 45, x: 4.5
            });
            TweenLite.to(bar_2, 0.45, {
                opacity: 0,
            });
            TweenLite.to(bar_3, 0.45, {
                rotation: -45, x: 2.25
            });
        } else {
            self.removeClass("active");
            top.removeClass("active");
            TweenLite.to(top, 0.45, {
                height: 0
            });
            TweenLite.to(bar_1, 0.45, {
                rotation: 0, x: 0
            });
            TweenLite.to(bar_2, 0.45, {
                opacity: 1
            });
            TweenLite.to(bar_3, 0.45, {
                rotation: 0, x: 0
            });
        }

    });
}
function menuTopResponsive() {

    var btn = $(".menu_top_mobile_js"),
            ul = $(".menu_responsive_ul"),
            bar_1 = btn.find("#bar_11"),
            bar_2 = btn.find("#bar_21"),
            bar_3 = btn.find("#bar_31"),
            menu = $(".menu_responsive"),
            height = 141;

    btn.on("click", function (e) {
        e.preventDefault();
        var self = $(this);

        if (!self.hasClass("active")) {
            self.addClass("active");
            menu.addClass("active");

            TweenLite.to(ul, 0.45, {
                height: height + 'px'
            });
            TweenLite.to(bar_1, 0.45, {
                rotation: 45, x: 4.5
            });
            TweenLite.to(bar_2, 0.45, {
                opacity: 0,
            });
            TweenLite.to(bar_3, 0.45, {
                rotation: -45, x: 2.25
            });
        } else {
            self.removeClass("active");
            menu.removeClass("active");

            TweenLite.to(ul, 0.45, {
                height: 0
            });
            TweenLite.to(bar_1, 0.45, {
                rotation: 0, x: 0
            });
            TweenLite.to(bar_2, 0.45, {
                opacity: 1
            });
            TweenLite.to(bar_3, 0.45, {
                rotation: 0, x: 0
            });
        }

    });
}

function scrollTop() {
    var btn = $(".up_js");

    btn.on("click", function (e) {
        e.preventDefault();

        $('html, body').animate({scrollTop: 0}, 450);
    });
}

function humo() {
    var hum = $(".humo"),
            humo_1 = $(".humo_1"),
            humo_2 = $(".humo_2"),
            humo_3 = $(".humo_3");

    TweenMax.set(hum, {scale: 0.6, opacity: 0, x: 0, y: 0});
    TweenMax.to(humo_1, 6, {opacity: 1, scale: 1, bezier: {type: "soft", values: [{x: 2, y: -4}, {x: 10, y: -8}, {x: 30, y: -12}], autoRotate: false}, ease: Power2.easeInOut});
    TweenMax.to(humo_1, 2, {delay: 4, opacity: 0});
    
    TweenMax.to(humo_2, 6, {delay: 2, opacity: 1, scale: 1, bezier: {type: "soft", values: [{x: 2, y: -6}, {x: 20, y: -8}, {x: 25, y: -10}], autoRotate: false}, ease: Power2.easeInOut});
    TweenMax.to(humo_2, 2, {delay: 5, opacity: 0});
    
    TweenMax.to(humo_3, 6, {delay: 3, opacity: 1, scale: 1, bezier: {type: "soft", values: [{x: 2, y: -6}, {x: 10, y: -10}, {x: 18, y: -14}], autoRotate: false}, ease: Power2.easeInOut});
    TweenMax.to(humo_3, 2, {delay: 6, opacity: 0, onComplete: function () {
                    TweenMax.set(hum, {scale: 0.6, opacity: 0});
                    humo();
                }
            });
}


$(window).on('load', function () {

});
$(window).on('resize orientationchange', function () {

});

$(document).ready(function () {

    humo();
    formularioBuscador();
    menuTop();
    menuTopResponsive();
    scrollTop();
});