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

/* SELECT DE IDIOMAS */

function dropdown() {
    var w_input = $('.w_input'),
            select_global = w_input.find('.select'),
            label_global = w_input.find('label');
    w_input.on('click', function() {

        var $this = $(this),
                dropdown = $this.find('.dropdown'),
                id = dropdown.attr('id'),
                select = $("[data-id=" + id + "]"),
                label = $("label[for=" + id + "]");
        if (!$this.hasClass('active')) {

            w_input.removeClass('active');
            select_global.removeClass('active');
            $this.addClass('active');
            label.addClass('active');
            select.addClass('active');
        } else {
            $this.removeClass('active');
            label.removeClass('active');
            select.removeClass('active');
        }
    });
    var select = $('.select'),
            option = select.find('a');
    option.on('click', function(e) {
        e.preventDefault();
        var $this = $(this),
                optionId = $this.attr('data-option'),
                optionVal = $this.text(),
                select = $this.parents('.select'),
                selectId = select.attr('data-id');
        var input = $('#' + selectId);
        input.attr('value', optionVal);
        input.attr('data-id', optionId).focus().blur();
    });
    /* PARA CERRAR FUERA DEL SELECT */

    $('body').on('click', function() {

        if (w_input.hasClass('active')) {
            w_input.removeClass('active');
            select_global.removeClass('active');
            label_global.removeClass('active');
        }
    });
    w_input.on('click', function(e) {
        e.stopPropagation();
    });
}

/* BANNER DEL HEADER - BANNER PRINCIPAL */

function banner_home() {

    var banner_item = $('.banner_item'),
            texto = banner_item.find('.texto_js'),
            link = banner_item.find('.link_js'),
            banner_item_bg = banner_item.find('.banner_item_bg');
    if (ie < 10) {
        TweenLite.set(banner_item_bg, {marginLeft: '0', opacity: 1});
        TweenLite.set(texto, {marginLeft: '0', opacity: 1});
        TweenLite.set(link, {marginLeft: '0', opacity: 1});
    }

    var elem = $('.banner_js');
    elem.owlCarousel({
        navigation: false, // Show next and prev buttons
        autoPlay: 7500,
        pagination: true,
        singleItem: true,
        transitionStyle: "fade",
        mouseDrag: false,
        touchDrag: false,
        afterInit: function() {
            if (!ie || ie >= 10) {

                TweenLite.to(banner_item_bg, 0.55, {
                    delay: 0.8, marginLeft: '0', opacity: 1
                });
                TweenLite.to(texto, 0.55, {
                    delay: 1.2, marginLeft: 0, opacity: 1
                });
                TweenLite.to(link, 0.55, {
                    delay: 1.65, marginLeft: 0, opacity: 1
                });
            }
        },
        beforeMove: function() {
            if (!ie || ie >= 10) {

                TweenLite.to(banner_item_bg, 0.2, {
                    delay: 0, marginLeft: '25px', opacity: 0
                });
                TweenLite.to(texto, 0.3, {
                    delay: 0, marginLeft: "-25px", opacity: 0
                });
                TweenLite.to(link, 0.5, {
                    delay: 0, marginLeft: "-25px", opacity: 0
                });
            }
        },
        afterMove: function() {
            if (!ie || ie >= 10) {

                TweenLite.to(banner_item_bg, 0.55, {
                    delay: 0.8, marginLeft: '0', opacity: 1
                });
                TweenLite.to(texto, 0.55, {
                    delay: 1.2, marginLeft: 0, opacity: 1
                });
                TweenLite.to(link, 0.55, {
                    delay: 1.65, marginLeft: 0, opacity: 1
                });
            }
        }
    });
}

/* CARRUSEL DE LOGOS - SECCION: "¿EN DONDE PODRAS COMPRAR?" */

function carruselLogosFooter() {
    var carrusel = $("#logos").owlCarousel({
        autoPlay: 5000,
        items: 4,
        itemsScaleUp: false,
        pagination: false
    });
    $(".arrow_left").click(function(e) {
        e.preventDefault();
        carrusel.trigger('owl.next');
    });
    $(".arrow_right").click(function(e) {
        e.preventDefault();
        carrusel.trigger('owl.prev');
    });
}

/* VALIDACION METODOS PERSONALIZADOS */

$.validator.addMethod("regex", function(value, element, regexp) {
    var re = new RegExp(regexp);
    return this.optional(element) || re.test(value);
}, "Solo caracteres alfanumericos");
$.validator.addMethod("defaultInvalid", function(value, element)
{
    if (element.value == element.defaultValue)
    {
        return false;
    }
    return true;
}, "Es igual a su valor por defecto");
$.validator.addMethod("notEqual", function(value, element, param) {
    return this.optional(element) || value != param;
}, "Please specify a different (non-default) value");

/* VALIDA FORMULARIO DE LOGIN */

function validate_formulario_login() {
    var form = $('#formulario_login');
    form.validate({
        rules: {
            correo_1: {
                required: true,
                email: true
            },
            contrasenia_1: {
                required: true,
                minlength: 4
            },
            codigo: {
                required: true,
                minlength: 6,
                maxlength: 6
            }

        },
        messages: {
            correo_1: {
                required: 'Ingrese su correo',
                email: 'Ingrese un email válido'
            },
            contrasenia_1: {
                required: 'Ingrese su contraseña',
                minlength: 'Mínimo 4 carácteres'
            },
            codigo: {
                required: 'Ingrese su código',
                minlength: 'Mínimo 6 carácteres',
                maxlength: 'Máximo 6 carácteres'
            }
        },
        onfocusout: function(element, event) {
            this.element(element);
        },
        onkeyup: function(element, event) {
            if (event.which === 9 && this.elementValue(element) === "") {
                return;
            } else if (element.name in this.submitted || element === this.lastElement) {
                this.element(element);
            }
        },
        highlight: function(element) {

            var self_name = $(element).prop('name');
            if ($(element).attr('type') === "checkbox") {
                var label = $('[for=' + self_name + ']');

                label.addClass('error_checkbox').removeClass('valid');
            }

            $(element).addClass("error").removeClass('valid');

        },
        unhighlight: function(element) {
            var self_name = $(element).prop('name');
            if ($(element).attr('type') === "checkbox") {
                var label = $('[for=' + self_name + ']');

                label.removeClass("error_checkbox").addClass('valid');
            }

            $(element).removeClass("error").addClass('valid');

        },
    });
}

/* VALIDA FORMULARIO DE REGISTRO */

function validate_formulario_registro() {
    var form = $('#formulario_registro');
    form.validate({
        rules: {
            nombre: {
                required: true,
                minlength: 2
            },
            apellidos: {
                required: true,
                minlength: 2
            },
            correo_2: {
                required: true,
                email: true
            },
            condiciones: {
                required: true
            }
        },
        messages: {
            nombre: {
                required: 'Ingrese su nombre',
                minlength: 'Mínimo 2 carácteres'
            },
            apellidos: {
                required: 'Ingrese sus apellidos',
                minlength: 'Mínimo 2 carácteres'
            },
            correo_2: {
                required: 'Ingrese su correo',
                email: 'Ingrese un email válido'
            },
            condiciones: {
                required: 'Acepte las condiciones'
            }
        },
        errorPlacement: function(error, element) {
            var name = $(element).prop("name"),
                    tooltip_content = $('[data-name=' + name + ']').find('.tooltip_content');
            tooltip_content.html(error);
        },
        onfocusout: function(element, event) {
            this.element(element);
        },
        onkeyup: function(element, event) {
            if (event.which === 9 && this.elementValue(element) === "") {
                return;
            } else if (element.name in this.submitted || element === this.lastElement) {
                this.element(element);
            }
        },
        highlight: function(element) {

            var self_name = $(element).prop('name');
            if ($(element).attr('type') === "checkbox") {
                var label = $('[for=' + self_name + ']');

                label.addClass('error_checkbox').removeClass('valid');
            }

            $(element).addClass("error").removeClass('valid');

        },
        unhighlight: function(element) {
            var self_name = $(element).prop('name');
            if ($(element).attr('type') === "checkbox") {
                var label = $('[for=' + self_name + ']');

                label.removeClass("error_checkbox").addClass('valid');
            }

            $(element).removeClass("error").addClass('valid');

        },
        submitHandler: function() {
            $('#modal-9').removeClass('md-show').fadeOut('slow', function() {
                $('#modal-10').addClass('md-show').fadeIn('slow');
            });

        }

    });
}

function show(id, xo) {
    TweenLite.to($(id), 1, {css: {'opacity': '1', top: '0', scaleX: 1, scaleY: 1}, ease: Power4.easeInOut, delay: xo});
}

/* MUESTRA SECUENCIALMENTE LOS 3 PASOS - SECCION "COMO FUNCIONA" */

function appear() {
    if (Modernizr.touch) {

// avoid scolling animation on touch devices

    } else {
        TweenLite.set($('.apear'), {css: {'opacity': '0', top: '30px', scaleX: 0.9, scaleY: 0.9}});
        $('.como_funciona_items .apear:eq(0)').waypoint(function() {
            show($('.como_funciona_items .apear:eq(0)'), 0)
        }, {offset: '80%'});
        $('.como_funciona_items .apear:eq(1)').waypoint(function() {
            show($('.como_funciona_items .apear:eq(1)'), 0.5)
        }, {offset: '80%'});
        $('.como_funciona_items .apear:eq(2)').waypoint(function() {
            show($('.como_funciona_items .apear:eq(2)'), 1)
        }, {offset: '80%'});
    }
}

/* ABRE Y CIERRA EL MENU RESPONSIVO */

function menu_responsivo() {
    var menu_responsivo_trigger = $('.menu_responsivo_trigger'),
            icon = menu_responsivo_trigger.find('i'),
            top_right = $('.top_right');
    menu_responsivo_trigger.on('click', function() {

        var self = $(this);
        if (!self.hasClass('active')) {

            self.addClass('active');
            top_right.addClass('active');
            TweenLite.to(top_right, 0.5, {'top': '75px', ease: Power2.easeInOut});
            icon.addClass('icon-cancel').removeClass('icon-reorder');
        } else {
            self.removeClass('active');
            top_right.removeClass('active');
            top_right.addClass('active');
            TweenLite.to(top_right, 0.5, {'top': '-100%', ease: Power2.easeInOut});
            icon.addClass('icon-reorder').removeClass('icon-cancel');
        }
    });
    $('html').on("click", function(e) {
        if (menu_responsivo_trigger.hasClass('active')) {

            menu_responsivo_trigger.removeClass('active');
            top_right.removeClass('active');
            top_right.addClass('active');
            TweenLite.to(top_right, 0.5, {'top': '-100%', ease: Power2.easeInOut});
            icon.addClass('icon-reorder').removeClass('icon-cancel');
        }
    });
    top_right.on("click", function(e) {
        e.stopPropagation();
    });
    menu_responsivo_trigger.on("click", function(e) {
        e.stopPropagation();
    });
}


/* CIERRA MENSAJE DE ERROR DE LOS FORMULARIO */

function closeAlert(){
    var btn =  $('.close_alert');
    
    btn.on('click', function(e){
        e.preventDefault();
        
       var self = $(this),
       alerta = self.parent('.alert');
       
       alerta.fadeOut('slow');
    });
}

$(window).on('resize orientationchange', function() {

});
$(document).ready(function() {
    banner_home();
    carruselLogosFooter();
    appear();
    menu_responsivo();
    validate_formulario_login();
    validate_formulario_registro();
    closeAlert();
});