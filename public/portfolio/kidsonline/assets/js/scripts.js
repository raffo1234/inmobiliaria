
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



function validFormContacto() {
    var form = $("#formulario_contacto");

    form.validate({
        debug: false,
        rules: {
            nombres: {
                minlength: 2,
                required: true,
                regex: "^[a-zA-Z ]+$"
            },
            apellidos: {
                minlength: 2,
                required: true,
                regex: "^[a-zA-Z ]+$"
            },
            asunto: {
                minlength: 2,
                required: true
            },
            email: {
                minlength: 2,
                required: true,
                email: true
            },
            mensaje: {
                minlength: 2,
                required: true
            }
        },
        highlight: function (element) {
            $(element).parent('div').addClass('error');
            $(element).addClass('error');
        },
        unhighlight: function (element) {
            $(element).parent('div').removeClass('error');
            $(element).removeClass('error');
        }
    });
}

function validFormComprar() {
    var form = $("#form_compra");

    form.validate({
        debug: false,
        ignore: [],
        rules: {
            talla: {
                minlength: 1,
                required: true
            },
            color: {
                minlength: 1,
                required: true
            },
            cantidad: {
                minlength: 1,
                required: true
            },
            para_cuando: {
                minlength: 1,
                required: true
            }
        },
        submitHandler: function (form) {
            var btn = $(".btn_comprar"),
                    btn_close = $(".btn_close_pop_js"),
                    popup = $(".w_popup_comprar"),
                    overlay = $(".pp_overlay_js");

            var self = $(this),
                    selfHref = self.data("href");
            overlay.fadeIn();

            btn_close.on("click", function (e) {
                e.preventDefault();

                var self = $(this);
                overlay.fadeOut();

            });
        },
        highlight: function (element) {
            $(element).parent('div').addClass('error');
            $(element).addClass('error');
        },
        unhighlight: function (element) {
            $(element).parent('div').removeClass('error');
            $(element).removeClass('error');
        }
    });
}

function validFormCompra_1() {
    var form = $("#form_compra_1");

    form.validate({
        debug: false,
        ignore: [],
        rules: {
            ciudad: {
                minlength: 1,
                required: true
            },
            distrito: {
                minlength: 1,
                required: true
            },
            direccion: {
                minlength: 1,
                required: true
            }

        },
        highlight: function (element) {
            $(element).parent('div').addClass('error');
            $(element).addClass('error');
        },
        unhighlight: function (element) {
            $(element).parent('div').removeClass('error');
            $(element).removeClass('error');
        }
    });
}
function validFormCompra_3() {
    var form = $("#form_compra_3");

    form.validate({
        debug: false,
        ignore: [],
        rules: {
            nombre: {
                minlength: 1,
                required: true,
                regex: "^[a-zA-Z ]+$"
            },
            apellidos: {
                minlength: 1,
                required: true,
                regex: "^[a-zA-Z ]+$"
            },
            direccion: {
                minlength: 1,
                required: true
            },
            email: {
                minlength: 1,
                required: true,
                email: true
            },
            telefono: {
                minlength: 1,
                required: true,
                regex: "^[0-9*+()-_ ]+$"
            }
//            ,
//            factura_ruc: {
//                minlength: 1,
//                required: true,
//                maxlength: 11,
//                rangelength: [11, 11],
//                regex: "^[0-9]+$"
//            }
//            ,
//            factura_razon_social: {
//                minlength: 1,
//                required: true
//            }
            ,
            terminos: {
                required: true
            }
        },
        highlight: function (element) {
            $(element).parent('div').addClass('error').removeClass("valid");
            $(element).addClass('error').removeClass("valid");
        },
        unhighlight: function (element) {
            $(element).parent('div').removeClass('error').addClass("valid");
            $(element).removeClass('error').addClass("valid");
        }
    });
}
function validFormPerfil() {
    var form = $("#formulario_perfil");

    form.validate({
        debug: false,
        rules: {
            nombre: {
                minlength: 2,
                required: true,
                regex: "^[a-zA-Z ]+$"
            },
            mail: {
                minlength: 2,
                required: true,
                email: true
            },
            contrasenia: {
                minlength: 2,
                required: true
            },
            cumpleanios: {
                minlength: 2,
                required: true
            },
            acerca: {
                minlength: 2,
                required: true
            }
        }
    });
}
function validFormIngresar() {
    var form = $("#formulario_ingresar");

    form.validate({
        debug: false,
        rules: {
            usuario: {
                minlength: 2,
                required: true
            },
            contrasena: {
                minlength: 5,
                required: true
            }
        }
    });
}
function validFormRegistro() {
    var form = $("#formulario_registro");

    form.validate({
        debug: false,
        rules: {
            nombres: {
                minlength: 2,
                required: true,
                regex: "^[a-zA-Z ]+$"
            },
            apellidos: {
                minlength: 2,
                required: true,
                regex: "^[a-zA-Z ]+$"
            },
            fecha_nacimiento: {
                minlength: 2,
                required: true
            },
            telefono: {
                minlength: 2,
                required: true,
                regex: "^[0-9*+()-_ ]+$"
            },
            email: {
                minlength: 2,
                required: true,
                email: true
            },
            password: {
                minlength: 5,
                required: true
            }
        }
    });
}
function validFormRecuperarContrasena() {
    var form = $("#recuperar_contrasena");

    form.validate({
        debug: false,
        rules: {
            usuario: {
                minlength: 2,
                required: true,
                email: true
            }
        },
        submitHandler: function (form) {

            var msg = $(".mensaje_success_js");

            msg.fadeIn();

            var t = setTimeout(function () {
                msg.fadeOut();
            }, 3000);

            // ajax para enviar los datos
            // ...
        }
    });
}


function menuCategorias() {
    var btn = $(".btn_menu_js"),
            navigation = $(".navigation_js"),
            navigation_inner = navigation.find(".navigation_inner_js");

    btn.on("click", function (e) {
        e.preventDefault();
        var self = $(this);

        if (!self.hasClass("active")) {
            self.addClass("active");
            navigation.slideDown();
            TweenLite.to(navigation_inner, 1, {delay: 0.35, opacity: 1, left: 0, ease: "Powe4.easeInOut"});
        } else {
            self.removeClass("active");
            TweenLite.to(navigation_inner, 0.5, {delay: 0, opacity: 0, left: "-40px", ease: "Powe4.easeInOut", onComplete: function () {
                    navigation.slideUp();
                }
            });
        }
    });
}

function navigation_categories() {
    var btn = $(".navigation_btns_js").find("a.first, a.last"),
            btnParentLi = btn.parent("li"),
            btn_i = btn.find("i"),
            groups = $(".navigation_groups_js"),
            group = groups.find("ul"),
            child_li = btn.parent("li").find("ul");

    btn.on("click", function (e) {
        e.preventDefault();
        var self = $(this),
                selfParentLi = self.parent("li"),
                selfId = self.attr("href"),
                self_i = self.find("i"),
                selfChild_li = self.parent("li").find("ul");

        if (!self.hasClass("active")) {

            btnParentLi.removeClass("active");
            selfParentLi.addClass("active");

            btn.removeClass("active");
            self.addClass("active");

            group.removeClass("active");
            $(selfId).addClass("active");

            child_li.removeClass("active");
            if (selfChild_li) {
                selfChild_li.addClass("active");
            }

            /* TABS EN MOBILE */
            if (getWidthViewport() <= 1024) {

                btn_i.removeClass("icon-arrow-up").addClass("icon-arrow-down");

                child_li.slideUp().removeClass("active");
                if (selfChild_li) {
                    selfChild_li.slideDown().addClass("active");
                    self_i.removeClass("icon-arrow-down").addClass("icon-arrow-up");
                }
            }
        } else {
            self.removeClass("active");
            selfParentLi.removeClass("active");

            /* TABS EN MOBILE */
            if (getWidthViewport() <= 1024) {
                selfChild_li.slideUp().removeClass("active");
                self_i.addClass("icon-arrow-down").removeClass("icon-arrow-up");
            }
        }
    });
}

function show(id, xo) {
    TweenLite.to($(id), 1, {css: {'opacity': '1', top: '0', scaleX: 1, scaleY: 1}, ease: Power4.easeInOut, delay: xo});
}

function appear() {
    if (Modernizr.touch) {

        TweenLite.to($(".apear"), 0.5, {'opacity': '1', top: '0'});

    } else {

        $('.content_home .apear:eq(0)').waypoint(function () {
            show($('.content_home .apear:eq(0)'), 0);
        }, {offset: '80%'});
        $('.content_home .apear:eq(1)').waypoint(function () {
            show($('.content_home .apear:eq(1)'), 0.4);
        }, {offset: '80%'});

        $('.home_pasos .apear:eq(0)').waypoint(function () {
            show($('.home_pasos .apear:eq(0)'), 0);
        }, {offset: '80%'});
        $('.home_pasos .apear:eq(1)').waypoint(function () {
            show($('.home_pasos .apear:eq(1)'), 0.4);
        }, {offset: '90%'});
        $('.home_pasos .apear:eq(2)').waypoint(function () {
            show($('.home_pasos .apear:eq(2)'), 0.8);
        }, {offset: '80%'});

        $('.promociona .apear:eq(0)').waypoint(function () {
            show($('.promociona .apear:eq(0)'), 0);
        }, {offset: '80%'});

        $('.revisa .apear:eq(0)').waypoint(function () {
            show($('.revisa .apear:eq(0)'), 0);
        }, {offset: '80%'});
        $('.revisa .apear:eq(1)').waypoint(function () {
            show($('.revisa .apear:eq(1)'), 0.4);
        }, {offset: '90%'});
        $('.revisa .apear:eq(2)').waypoint(function () {
            show($('.revisa .apear:eq(2)'), 0.8);
        }, {offset: '80%'});
    }
}

function olvide_clave() {
    var btn = $(".olvide_js"),
            ele_olvide = $(".ele_olvide_js");

    btn.on("click", function (e) {
        e.preventDefault();

        var self = $(this);

        if (!self.hasClass("active")) {
            self.addClass("active");
            btn.addClass("active");
            ele_olvide.slideDown();
            TweenLite.to(ele_olvide, 0.8, {delay: 0.30, opacity: 1, left: 0, ease: Power4.easeInOut});
        } else {
            self.removeClass("active");
            btn.removeClass("active");
            TweenLite.to(ele_olvide, 0.8, {delay: 0, opacity: 0, left: "-15px", ease: Power4.easeInOut, onComplete: function () {
                    ele_olvide.slideUp();
                }
            });
        }
    });
}

function checkeable() {
    var ele = $(".w_checkable_js"),
            eleInput = ele.find("input[type=checkbox]");

    eleInput.each(function () {
        var self = $(this),
                selfID = self.attr("id"),
                selfName = self.attr("name"),
                selfMask = $("label[for=" + selfID + "]");

        if (self.is(':checked')) {
            self.prop("checked", true);

            self.addClass("active");
            selfMask.addClass("active");
        } else {
            self.prop("checked", false);

            self.removeClass("active");
            selfMask.removeClass("active");
        }
    });

    eleInput.change(function (e) {
        e.preventDefault();


        var self = $(this),
                selfID = self.attr("id"),
                selfMask = $("label[for=" + selfID + "]");

        if (!self.hasClass("active")) {

            self.addClass("active");
            selfMask.addClass("active");
        } else {


            self.removeClass("active");
            selfMask.removeClass("active");
        }
    });
}

function radioable() {
    var ele = $(".w_radio_js"),
            eleInput = ele.find("input[type=radio]");

    eleInput.each(function () {
        var self = $(this),
                selfID = self.attr("id"),
                selfName = self.attr("name"),
                mask = $("label[data-name=" + selfName + "]"),
                selfMask = $("label[for=" + selfID + "]"),
                selfBrother = $("input[name=" + selfName + "]");

        if (self.is(':checked')) {
            selfBrother.prop("checked", false);
            self.prop("checked", true);

            selfBrother.removeClass("active");
            self.addClass("active");

            mask.removeClass("active");
            selfMask.addClass("active");
        }
    });


    eleInput.change(function (e) {
        e.preventDefault();

        var self = $(this),
                selfID = self.attr("id"),
                selfName = self.attr("name"),
                mask = $("label[data-name=" + selfName + "]"),
                selfMask = $("label[for=" + selfID + "]"),
                selfBrother = $("input[name=" + selfName + "]");

        if (self.is(':checked')) {

            selfBrother.prop("checked", false);
            self.prop("checked", true);

            selfBrother.removeClass("active");
            self.addClass("active");

            mask.removeClass("active");
            selfMask.addClass("active");
        }
    });
}

function select_styled() {
    var ele = $(".select");

    ele.selectBoxIt({
        showEffect: "fadeIn",
        showEffectSpeed: 200,
        hideEffect: "fadeOut",
        hideEffectSpeed: 200,
        aggressiveChange: true,
        downArrowIcon: "icon-arrow-down",
        autoWidth: true
    });
    ele.bind({
        "open": function () {
            $(this).data("selectBox-selectBoxIt").dropdown.find(".selectboxit-arrow").removeClass("icon-arrow-down").addClass("icon-arrow-up");
        },
        "close": function () {
            $(this).data("selectBox-selectBoxIt").dropdown.find(".selectboxit-arrow").addClass("icon-arrow-down").removeClass("icon-arrow-up");
        }
    });
}

function banner_thumbs() {

    var slider = $(".banner_thumbs_inner .ul"),
            item = slider.find(".li"),
            btn_prev = $('.nav.lft'),
            btn_next = $('.nav.rgt');
    if (slider.length > 0) {

        slider.owlCarousel({
            items: 3,
            autoplay: false,
            autoplayHoverPause: true,
            autoplayTimeout: 5000,
            dots: false,
            nav: false,
            slideBy: 3,
            slideSpeed: 980,
            smartSpeed: 950,
            lazyLoad: true,
            loop: false,
            fallbackEasing: 'Power4.easeInOut'
        });

        slider.on('changed.owl.carousel', function (event) {

            var index = event.item.index;

            if (index === 0) {
                btn_prev.fadeOut();
            } else {
                btn_prev.fadeIn();
            }
            if (index === item.length - 3) {
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


        /* UPDATE IMG */

        var img_big = $(".carrusel_js");

        item.on("click", function () {
            var self = $(this),
                    selfImg = self.data("img");

            if (selfImg != "") {
                img_big.attr("src", selfImg);
            }
        });

    }
}

function opinion_banner() {
    var slider = $(".opinion_js"),
            item = slider.find(".opinion"),
            btn_prev = $('#opinion_prev'),
            btn_next = $('#opinion_next');
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
            fallbackEasing: 'Power4.easeInOut'
        });

        slider.on('changed.owl.carousel', function (event) {

            var index = event.item.index;

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
function productos_relacionados() {
    var slider = $(".productos_relacionados_js"),
            item = slider.find(".agregados_prod"),
            btn_prev = $('.relacionados_prev'),
            btn_next = $('.relacionados_next'),
            items = 5;

    if (slider.length > 0) {

        slider.owlCarousel({
            items: items,
            autoplay: false,
            autoplayHoverPause: true,
            autoplayTimeout: 5000,
            dots: false,
            nav: false,
            slideSpeed: 980,
            smartSpeed: 950,
            lazyLoad: true,
            loop: true,
            fallbackEasing: 'Power4.easeInOut',
            responsive: {
                0: {
                    items: 1
                },
                500: {
                    items: 2
                },
                768: {
                    items: 3
                },
                850: {
                    items: 4
                },
                1030: {
                    items: 5
                }
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

function perfil_editable() {
    var btn = $(".pencil_js"),
            ele = $(".perfil_datos_js");

    btn.on("click", function (e) {
        e.preventDefault();
        var self = $(this);
        if (!self.hasClass("active")) {
            self.addClass("active");
            ele.addClass("active");
        } else {
            self.removeClass("active");
            ele.removeClass("active");
        }
    });
}

function eliminar_compra() {
    var ele = $(".producto_compra_js"),
            btn_trash = ele.find(".tacho");

    btn_trash.on("click", function (e) {
        e.preventDefault();

        var self = $(this),
                selfWrapper = self.parents(".producto_compra");

        TweenLite.to(selfWrapper, 0.5, {opacity: 0, left: "-25px", ease: "Powe4.easeInOut"});

        setTimeout(function () {
            selfWrapper.slideUp(function () {
                selfWrapper.remove();
            });
        }, 300);


        /* ELIMINA DEL LADO DEL SERVIDOR, EJEMPLO: AJAX */

    });
}

function rotateRibbon() {
    var ele = $(".ribbon_inner"),
            ele_big = $(".ribbon_detalle_inner");

    TweenMax.set(ele, {rotation: 42, onComplete: function () {
            TweenMax.to(ele, 0.6, {opacity: 1});
        }
    });
    TweenMax.set(ele_big, {rotation: 42, onComplete: function () {
            TweenMax.to(ele_big, 0.6, {opacity: 1});
        }
    });
}

function tortaDragable() {
    var wrapper = $(".w_dragable"),
            barra = $(".barra"),
            barra_inner = $(".barra_inner"),
            w_torta = $(".w_torta_js"),
            wrapperWidth = 242, //w_torta.outerWidth(),
            resultWidht = wrapperWidth - 41 - 2,
            ele = $(".torta_js");

    if (wrapper.length > 0) {
        ele.draggable({
            axis: "x",
            containment: "parent",
            drag: function () {
                var self = $(this),
                        selfWrapper = self.parents(".w_dragable"),
                        selfCount = selfWrapper.find(".torta_count"),
                        selfInput = selfWrapper.find("input"),
                        selfBarraInner = selfWrapper.find(".barra_inner"),
                        maxValue = selfWrapper.find(".barra_right").text() * 1,
                        xPos = parseInt(self.css("left"), 10),
                        xPostFinal = (xPos * (maxValue / resultWidht)).toFixed(0),
                        
                        xPostFinalMax = xPostFinal <= maxValue ? xPostFinal : maxValue; // fix bug en mobiles, se pasa del valor maximo
                        
                //console.log(self.css("left"));
                
                selfCount.text(xPostFinalMax);
                selfInput.val(xPostFinalMax);
                //selfBarraInner.text(xPostFinal);
                TweenMax.to(selfBarraInner, 0.3, {width: xPostFinalMax * (100 / maxValue) + "%"});

            }
        });
        barra.on("click", function (e) {
            var self = $(this),
                    selfWrapper = self.parents(".w_dragable"),
                    selfTorta = selfWrapper.find(".torta"),
                    selfCount = selfWrapper.find(".torta_count"),
                    selfInput = selfWrapper.find("input"),
                    selfBarraInner = selfWrapper.find(".barra_inner"),
                    maxValue = selfWrapper.find(".barra_right").text() * 1,
                    posX = self.position().left,
                    xPostFinal = Math.round((e.pageX - posX) * (maxValue / resultWidht)),
                    
                    xPostFinalMax = xPostFinal <= maxValue ? xPostFinal : maxValue;  // fix bug en mobiles, se pasa del valor maximo
                    
                    
            selfCount.text(xPostFinalMax);
            selfInput.val(xPostFinalMax);
            TweenMax.to(selfBarraInner, 0.3, {width: Math.round(xPostFinalMax * (100 / maxValue)) + "%"});
            TweenMax.to(selfTorta, 0.5, {left: Math.round(e.pageX - posX) * (100 / wrapperWidth) + "%"});
        });
    }

}


function sidebarCategoria() {
    var ele = $(".w_categoria"),
            btn = ele.find(".btn"),
            subcategorias = $(".w_subcategoria_js");

    btn.on("click", function (e) {
        e.preventDefault();

        var self = $(this),
                selfParent = self.parents(".w_categoria"),
                selfSubcategorias = selfParent.find(".w_subcategoria_js");

        if (!self.hasClass("active")) {

            // cierra todos
            TweenMax.to(subcategorias, 0.6, {opacity: 0});
            subcategorias.slideUp();
            btn.removeClass("active");
            ele.removeClass("active");

            // abre self
            self.addClass("active");
            selfParent.addClass("active");
            selfSubcategorias.slideDown();
            TweenMax.to(selfSubcategorias, 1, {delay: 0.4, opacity: 1});

        } else {

            TweenMax.to(selfSubcategorias, 0.6, {opacity: 0});
            setTimeout(function () {
                selfSubcategorias.slideUp();
                self.removeClass("active");
                selfParent.removeClass("active");
            }, 300);

        }

    });
}
function sidebarCategoriaItem() {
    var ele = $(".sidebar_item"),
            btn = ele.find(".btn_large"),
            desplegable = $(".sidebar_desplegable");

    btn.on("click", function (e) {
        e.preventDefault();

        var self = $(this),
                selfParent = self.parents(".sidebar_item"),
                selfTallas = selfParent.find(".sidebar_desplegable");

        if (!self.hasClass("active")) {

            // CIERRA TODOS
            ele.removeClass("active");
            btn.removeClass("active");
            TweenMax.to(desplegable, 1, {height: 0});
            TweenMax.to(desplegable, 1, {delay: 0.4, opacity: 0});

            // ABRE ACTUAL
            self.addClass("active");
            selfParent.addClass("active");
            TweenMax.to(selfTallas, 1, {height: "auto"});
            TweenMax.to(selfTallas, 1, {delay: 0.4, opacity: 1});

        } else {

            TweenMax.to(selfTallas, 0.6, {opacity: 0});
            setTimeout(function () {

                TweenMax.to(selfTallas, 0.15, {height: 0});
                self.removeClass("active");
                selfParent.removeClass("active");
            }, 300);

        }

    });
}

function sidebarCategoriaChecks() {
    var ele = $(".w_desplegable_checks"),
            btn = ele.find(".btn_small_2"),
            desplegable = $(".w_desp_checks");

    btn.on("click", function (e) {
        e.preventDefault();

        var self = $(this),
                selfParent = self.parents(".w_desplegable_checks"),
                selfTallas = selfParent.find(".w_desp_checks");

        if (!self.hasClass("active")) {

            selfTallas.slideDown();
            TweenMax.to(selfTallas, 1, {delay: 0.4, opacity: 1, onComplete: function () {

                }
            });
            setTimeout(function () {
                self.addClass("active");
                selfParent.addClass("active");
            }, 300);

        } else {

            TweenMax.to(selfTallas, 0.6, {opacity: 0});
            setTimeout(function () {
                selfTallas.slideUp();
                self.removeClass("active");
                selfParent.removeClass("active");
            }, 300);

        }

    });
}

function coverActived() {
    var wrapper = $(".wrapper_cover_js"),
            btn = $(".w_cover_js");

    btn.on("click", function (e) {
        e.preventDefault();
        var self = $(this);

        if (!self.hasClass("actived")) {
            btn.removeClass("actived");
            self.addClass("actived");
        }
    });
}

function touch() {
    var touch = $(".touch"),
            no_touch = $(".no_touch");

    if (Modernizr.touch) {
        touch.addClass("show").removeClass("hide");
        no_touch.addClass("hide").removeClass("show");
    } else {
        touch.addClass("hide").removeClass("show");
        no_touch.addClass("show").removeClass("hide");
    }
}

function obsequio_check() {
    var check = $(".obsequio_js"),
            ele = $(".w_obsequio_js");

    check.on("click", function () {
        var self = $(this);

        // elementos ha incluir en el validate si está checked
        var para_quien = $("#para_quien"),
                ocasion = $("#ocasion"),
                obsequio_mensaje = $("#obsequio_mensaje"),
                de_quien = $("#de_quien");

        if (!self.hasClass("actived")) {
            self.addClass("actived");

            ele.slideDown();
            TweenLite.to(ele, 0.8, {delay: 0.30, opacity: 1, left: 0, ease: Power4.easeInOut});

            para_quien.addClass("required");
            ocasion.addClass("required");
            obsequio_mensaje.addClass("required");
            de_quien.addClass("required");

        } else {
            self.removeClass("actived");
            TweenLite.to(ele, 0.8, {delay: 0, opacity: 0, left: "-15px", ease: Power4.easeInOut, onComplete: function () {

                }
            });
            var t = setTimeout(function () {
                ele.slideUp();
            }, 500);

            para_quien.removeClass("required");
            ocasion.removeClass("required");
            obsequio_mensaje.removeClass("required");
            de_quien.removeClass("required");

        }
    });
}

function direccion_distinta_check() {
    var check = $(".direccion_distinta_js"),
            ele = $(".w_direccion_distinta_js");

    // elementos ha incluir en el validate si está checked
    var ciudad = $("#ciudad_distinta"),
            distrito = $("#distrito_distinto"),
            direccion = $("#direccion_distinta");

    if (!check.hasClass("active")) {

        TweenLite.to(ele, 0.8, {delay: 0, opacity: 0, left: "-15px", ease: Power4.easeInOut, onComplete: function () {

            }
        });
        var t = setTimeout(function () {
            ele.slideUp();
        }, 500);

        ciudad.removeClass("required");
        distrito.removeClass("required");
        direccion.removeClass("required");
    } else {
        ele.slideDown();
        TweenLite.to(ele, 0.8, {delay: 0.30, opacity: 1, left: 0, ease: Power4.easeInOut});

        ciudad.addClass("required");
        distrito.addClass("required");
        direccion.addClass("required");
    }

    check.on("click", function () {
        var self = $(this);

        if (!self.hasClass("active")) {

            TweenLite.to(ele, 0.8, {delay: 0, opacity: 0, left: "-15px", ease: Power4.easeInOut, onComplete: function () {

                }
            });
            var t = setTimeout(function () {
                ele.slideUp();
            }, 500);

            ciudad.removeClass("required");
            distrito.removeClass("required");
            direccion.removeClass("required");
        } else {
            ele.slideDown();
            TweenLite.to(ele, 0.8, {delay: 0.30, opacity: 1, left: 0, ease: Power4.easeInOut});

            ciudad.addClass("required");
            distrito.addClass("required");
            direccion.addClass("required");
        }
    });
}

function boleta_factura() {
    var check = $(".check_boleta_factura_js"),
            ele = $(".w_boleta_factura_js");

    // required
    var ruc = $("#factura_ruc"),
            razon_social = $("#factura_razon_social");


    if ($(".check_boleta_factura_js:checked").val() === "1") {

        TweenLite.to(ele, 0.8, {delay: 0, opacity: 0, left: "-15px", ease: Power4.easeInOut, onComplete: function () {
            }
        });
        var t = setTimeout(function () {
            ele.slideUp();
        }, 500);


        ruc.removeClass("required");
        ruc.removeAttr("minlength");
        ruc.removeAttr("maxlength");
        ruc.removeAttr("rangelength");
        ruc.removeAttr("regex");

        razon_social.removeClass("required");
    } else {
        ele.slideDown();
        TweenLite.to(ele, 0.8, {delay: 0.30, opacity: 1, left: 0, ease: Power4.easeInOut});

        ruc.addClass("required");
        ruc.attr("minlength", 1);
        ruc.attr("maxlength", 11);
        ruc.attr("rangelength", [11, 11]);
        ruc.attr("regex", "^[0-9]+$");

        razon_social.addClass("required");
    }

    check.on("click", function () {
        var self = $(this);

        if (self.val() === "1") {

            TweenLite.to(ele, 0.8, {delay: 0, opacity: 0, left: "-15px", ease: Power4.easeInOut, onComplete: function () {
                }
            });
            var t = setTimeout(function () {
                ele.slideUp();
            }, 500);

            ruc.removeClass("required");
            ruc.removeAttr("minlength");
            ruc.removeAttr("maxlength");
            ruc.removeAttr("rangelength");
            ruc.removeAttr("regex");

            razon_social.removeClass("required");
        } else {
            ele.slideDown();
            TweenLite.to(ele, 0.8, {delay: 0.30, opacity: 1, left: 0, ease: Power4.easeInOut});

            ruc.addClass("required");
            ruc.attr("minlength", 1);
            ruc.attr("maxlength", 11);
            ruc.attr("rangelength", [11, 11]);
            ruc.attr("regex", "^[0-9]+$");
            razon_social.addClass("required");
        }
    });
}

function terminos_check() {
    var check = $(".check_terminos_js"),
            btn = $(".btn_terminos_js");

    if (check.hasClass("active")) {
        btn.removeClass("disabled");
    } else {
        btn.addClass("disabled");
    }

    check.on("click", function () {
        var self = $(this);

        if (self.hasClass("active")) {
            btn.removeClass("disabled");
        } else {
            btn.addClass("disabled");
        }
    });
}

function calendar_nacimiento() {
    if ($(".datepicker_nacimiento").length) {

        $(".datepicker_nacimiento").each(function () {
            var self = $(this);

            self.datetimepicker({
                lang: 'es',
                i18n: {
                    es: {
                        months: [
                            'Enero', 'Febrero', 'Marzo', 'Abril',
                            'Mayo', 'Junio', 'Julio', 'Agosto',
                            'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
                        ],
                        dayOfWeek: [
                            "Do", "Lu", "Ma", "Mi",
                            "Ju", "Vi", "Sa",
                        ]
                    }
                },
                timepicker: false,
                format: 'd/m/Y'

            });
        });
    }
}

function calendar() {
    if ($(".datepicker").length) {

        $(".datepicker").each(function () {
            var self = $(this);

            self.datetimepicker({
                lang: 'es',
                i18n: {
                    es: {
                        months: [
                            'Enero', 'Febrero', 'Marzo', 'Abril',
                            'Mayo', 'Junio', 'Julio', 'Agosto',
                            'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
                        ],
                        dayOfWeek: [
                            "Do", "Lu", "Ma", "Mi",
                            "Ju", "Vi", "Sa",
                        ]
                    }
                },
                timepicker: false,
                format: 'd/m/Y',
                minDate: '0'
            });
        });
    }

    if ($(".timepicker").length) {

        $(".timepicker").each(function () {
            var self = $(this);

            self.datetimepicker({
                datepicker: false,
                format: 'h:i A'

            });
        });
    }

//        $.datepicker.regional['es'] = {
//            closeText: 'Cerrar',
//            prevText: '<Ant',
//            nextText: 'Sig>',
//            currentText: 'Hoy',
//            monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
//            monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
//            dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
//            dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Juv', 'Vie', 'Sab'],
//            dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
//            weekHeader: 'Sm',
//            dateFormat: 'dd/mm/yy',
//            firstDay: 1,
//            isRTL: false,
//            showMonthAfterYear: false,
//            yearSuffix: ''
//        };
//        $(".datepicker").datepicker({
//            changeMonth: true,
//            changeYear: true,
//            minDate: "today"
//        });
//        $(".datepicker").datepicker("option", "dateFormat", "dd/mm/yy");
//        $.datepicker.setDefaults($.datepicker.regional['es']);
//        $(".icon_datepicker").click(function () {
//            $("#datepicker").datepicker("show");
//        });

}



function add_product_carrito_1() {
    var ele = $(".add_producto_js");

    ele.on("click", function () {
        var self = $(this);

        window.location.href = "#mis_productos";

    });
}


$(window).on('load', function () {

});
$(window).on('resize orientationchange', function () {

    /* DESPLEGABLE Y TABS DE CATEGORIAS */
    if (getWidthViewport() < 1024) {
        $(".tabs_mobile.active").show();
        $(".navigation_btns li:first-child a").removeClass("active");
    } else {
        $(".tabs_mobile.active").hide();
        $('.navigation_btns > li a[href=#' + $(".navigation_groups ul.active").attr("id") + ']').addClass("active");
    }
});
$(document).ready(function () {

    /* DESPLEGABLE Y TABS DE CATEGORIAS */
    if (getWidthViewport() < 1024) {
        $(".tabs_mobile.active").show();
        $(".navigation_btns li:first-child a").removeClass("active");
    } else {
        $(".tabs_mobile.active").hide();
        $('.navigation_btns > li a[href=#' + $(".navigation_groups ul.active").attr("id") + ']').addClass("active");

    }

    $.validator.addMethod("regex", function (value, element, regexp) {
        var re = new RegExp(regexp);
        return this.optional(element) || re.test(value);
    }, "");


    navigation_categories();
    menuCategorias();
    appear();
    checkeable();
    olvide_clave();
    opinion_banner();
    perfil_editable();
    eliminar_compra();
    radioable();
    rotateRibbon();
    tortaDragable();
    sidebarCategoria();
    sidebarCategoriaItem();
    sidebarCategoriaChecks();
    banner_thumbs();
    coverActived();
    touch();
    obsequio_check();
    validFormRecuperarContrasena();
    direccion_distinta_check();
    terminos_check();
    validFormComprar();
    validFormContacto();
    validFormRegistro();
    validFormIngresar();
    validFormPerfil();
    calendar();
    calendar_nacimiento();

    validFormCompra_1();
    validFormCompra_3();
    boleta_factura();
    add_product_carrito_1();
    productos_relacionados();
    select_styled();
}
);