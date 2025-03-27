function radiobutton() {

    var wrapper_check = $('.radiobutton_tarjetas_js');
    wrapper_check.on('click', function(e) {
        e.preventDefault();
        var self = $(this),
                checkbox_hidden = self.parent('.radiobutton').find('.radiobutton_hidden'),
                self_value = self.data('value');
        if (!self.hasClass('checked')) {
            self.siblings().removeClass('checked');
            self.addClass('checked');
            checkbox_hidden.attr('value', self_value);
            /* CAMBIA IMAGEN DEL RADIOBUTTON: TIPO DE TARJETA */
            if (self.parent('.radiobutton').hasClass('radiobutton_tipo_tarjeta_js')) {
                var img = $('.img_tipo_tarjeta');
                var img_visa = "assets/icons/img_visa_white.png";
                var img_master = "assets/icons/img_mastercard_white.png";
                if (self_value * 1 === 1) {
                    img.prop("src", img_visa);
                } else {
                    img.prop("src", img_master);
                }
            }
        }

    });
}

function radiobutton_general() {
    var radiobutton_item = $('.radiobutton_item_js');

    radiobutton_item.on('click', function() {
        var self = $(this),
                wrapper_radiobutton = self.parents('.wrapper_radiobutton_js'),
                radiobutton_items = wrapper_radiobutton.find('.radiobutton_item_js'),
                radiobutton_input = wrapper_radiobutton.find('.radiobutton_hidden'),
                self_value = self.data('value');

        if (!self.hasClass('checked')) {

            //console.log(self_value);

            radiobutton_items.removeClass('checked');
            self.addClass('checked');
            radiobutton_input.attr('value', self_value);
        }
    });
}

function checkbox() {
    var wrapper_checkbox = $('.wrapper_checkbox');
    wrapper_checkbox.on('click', function() {
        var self = $(this),
                self_value = self.data('value'),
                input_hidden = self.find('.input_hidden'),
                icon = self.find('.check');
        if (!self.hasClass('checked')) {
            self.addClass('checked');
            icon.addClass('icon-checked').removeClass('icon-checked-empty');
            input_hidden.attr('value', self_value);
        } else {
            self.removeClass('checked');
            icon.removeClass('icon-checked').addClass('icon-checked-empty');
            input_hidden.attr('value', 0);
        }
    });
}

function popup() {
    var overlay = $('.overlay_js'),
            body = $('html'),
            close = $('.close_js'),
            wrapper_popup_js = $('.wrapper_popup_js'),
            popup_container = $('.popup_js').find(".container"),
            open_popup_js = $('.open_popup_js');
    open_popup_js.on("click", function(e) {
        e.preventDefault();
        var self = $(this);
        if (!overlay.hasClass("shown")) {

            overlay.addClass("shown").fadeIn();

            wrapper_popup_js.addClass('shown');
            body.addClass('shown');
        }
    });
    close.on("click", function(e) {
        e.preventDefault();
        if (wrapper_popup_js.hasClass('shown')) {
            wrapper_popup_js.removeClass("shown");

            overlay.removeClass("shown").fadeOut();

            body.removeClass('shown');
        }
    });
    wrapper_popup_js.on("click", function(e) {
        e.preventDefault();
        if ($(this).hasClass('shown')) {
            wrapper_popup_js.removeClass("shown");

            overlay.removeClass("shown").fadeOut();

            body.removeClass('shown');

        }
    });
    popup_container.on("click", function(e) {
        e.stopPropagation();
    });
}

function accordion() {
    var wrapper_accordion = $('.wrapper_accordion');
    wrapper_accordion.on('click', function() {
        var self = $(this),
                accordion = self.find('.acordion_link'),
                icon = accordion.find('i'),
                wrapper_accordions = self.parents('.wrapper_accordions'),
                wrapper_accordion = wrapper_accordions.find('.wrapper_accordion'),
                acordion_link = wrapper_accordion.find('.acordion_link'),
                acordion_link_icon = acordion_link.find('i');
        if (!self.hasClass('opened')) {
            wrapper_accordion.removeClass("opened");
            wrapper_accordion.find(".box_pci").slideUp('fast');
            self.addClass('opened');
            self.find('.box_pci').slideDown('fast');
            acordion_link_icon.removeClass('icon-down-dir').addClass('icon-left-dir');
            icon.addClass('icon-down-dir').removeClass('icon-left-dir');
        } else {
            self.removeClass('opened');
            self.find('.box_pci').slideUp('fast');
            icon.removeClass('icon-down-dir').addClass('icon-left-dir');
        }
    });
}

function tabs() {
    var tabs_links = $('.tabs_links'),
            links = tabs_links.find('a');
    links.on("click", function() {
        var self = $(this),
                wrapper_tabs = self.parents('.wrapper_tabs'),
                w_tab_link = wrapper_tabs.find('.w_tab_link'),
                tab_link = w_tab_link.find('a'),
                tabs_body = wrapper_tabs.find('.tabs_body'),
                self_id = self.data('id'),
                self_tabs_body = $('#' + self_id);
        if (!self.hasClass('active')) {
            tab_link.removeClass('active');
            self.addClass('active');
            tabs_body.hide().removeClass('active');
            self_tabs_body.fadeIn('fast').addClass('active');
        }
    });
}

function menu_responsivo() {
    var menu_mobile = $('.menu_mobile_js'),
            icon = menu_mobile.find('i'),
            box_right_responsivo = $('.box_right_responsivo_js');
    menu_mobile.on('click', function() {
        var self = $(this);

        if (!self.hasClass('active')) {

            self.addClass('active');
            box_right_responsivo.addClass('active');
            TweenLite.to(box_right_responsivo, 0.5, {left: 0, ease: Power1.easeInOut});

            icon.addClass('icon-cancel').removeClass('icon-th-list');
        } else {
            self.removeClass('active');
            box_right_responsivo.removeClass('active');
            TweenLite.to(box_right_responsivo, 0.5, {left: '-100%', ease: Power1.easeInOut});

            icon.addClass('icon-th-list').removeClass('icon-cancel');
        }
    });
    $('html').on("click", function(e) {
        if (menu_mobile.hasClass('active')) {

            menu_mobile.removeClass('active');
            box_right_responsivo.removeClass('active');
            TweenLite.to(box_right_responsivo, 0.5, {left: '-100%', ease: Power1.easeInOut});

            icon.addClass('icon-th-list').removeClass('icon-cancel');
        }
    });
    box_right_responsivo.on("click", function(e) {
        e.stopPropagation();
    });
    menu_mobile.on("click", function(e) {
        e.stopPropagation();
    });
}

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




function textto_cortado() {
    $('.texto-cortado').each(function() {

        var longitud = 190;

        if ($(this).text().length > longitud) {

            var texto = $(this).text().substring(0, longitud);
            var indiceUltimoEspacio = texto.lastIndexOf(' ');
            texto = texto.substring(0, indiceUltimoEspacio) + '<span class="puntos">...</span>';

            var primeraParte = '<span class="texto-mostrado">' + texto + '</span>';
            var segundaParte = '<span class="texto-ocultado">' + $(this).text().substring(indiceUltimoEspacio, $(this).text().length - 1) + '</span>';

            $(this).html(primeraParte + segundaParte);
            $(this).after('<a href="javascript:void(0);" class="boton_mas_info color_verde roboto-bold link_ver_mas transition"><i class="icon-plus-circle"></i>&nbsp;&nbsp;&nbsp; Ver más</a>');
        }
    });
    $('.boton_mas_info').on('click', function() {
        var self = $(this);

        if (!self.prev().find('.texto-ocultado').hasClass('mostrado')) {
            self.prev().find('.texto-ocultado').addClass('mostrado').fadeIn();
            self.prev().find('.puntos').css('display', 'none');
            self.html('<i class="icon-minus-circle"></i>&nbsp;&nbsp;&nbsp; Ver menos');
        }
        else {
            self.prev().find('.texto-ocultado').removeClass('mostrado').fadeOut('fast');
            self.prev().find('.puntos').css('display', 'inline');
            self.html('<i class="icon-plus-circle"></i>&nbsp;&nbsp;&nbsp; Ver más');
        }
        ;
    });
}

function slider() {
    var elem = $('.wrapper_slider_js');
    elem.owlCarousel({
        navigation: true, // Show next and prev buttons
        slideSpeed: 300,
        paginationSpeed: 400,
        singleItem: true,
        navigationText: [
            '<a href="javascript:void(0);" class="display-inline nav_prev transition"><i class="icon-angle-circled-left"></i></a>',
            '<a href="javascript:void(0);" class="display-inline nav_next transition"><i class="icon-angle-circled-right"></i></a>'
        ]
    });
}

/* VALIDATE */

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
function validate_formulario_login() {
    var form = $('#formulario_login');
    form.validate({
        rules: {
            login_name: {
                required: true,
                minlength: 2,
                email: true
            },
            login_password: {
                required: true,
                minlength: 5
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
        }
    });
}

function validate_formulario_datos_tarjeta() {
    var form = $('#formulario_datos_tarjeta');
    form.validate({
        rules: {
            tarjeta_numero: {
                required: true,
                minlength: 2,
                number: true
            },
            codigo_seguridad: {
                required: true,
                minlength: 4,
                number: true
            },
            codigo_seguridad_2: {
                required: true,
                minlength: 4,
                number: true
            },
            mes: {
                required: true,
                notEqual: "Mes"
            },
            anio: {
                required: true,
                notEqual: "Año"
            },
            nombre: {
                required: true,
                minlength: 2
            },
            apellido: {
                required: true,
                minlength: 2
            },
            correo: {
                required: true,
                minlength: 2,
                email: true
            },
            recorreo: {
                required: true,
                minlength: 2,
                email: true,
                equalTo: '#correo_1'
            },
            pais: {
                required: true,
                notEqual: "País"
            },
            departamento: {
                required: true,
                notEqual: "Departamento"
            },
            ciudad: {
                required: true,
                notEqual: "Ciudad"
            },
            distrito: {
                required: true,
                notEqual: "Distrito"
            },
            direccion: {
                required: true,
                minlength: 2
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

function abrir_cerrar_grupo() {

    var input = $('.input_grupo');
    input.blur(function() {
        var self = $(this),
                self_grupo = self.parents('.wrapper_box');
        var countTotal = self_grupo.find('.input_grupo').length;
        var countValid = self_grupo.find('.input_grupo.valid').length;
        if (countTotal === countValid) {
            self_grupo.addClass('closed');
        }
    });
    $('.w_icon_editable').on('click', function() {
        var self = $(this),
                self_grupo = self.parents('.wrapper_box');
        if (self_grupo.hasClass('closed')) {
            self_grupo.removeClass('closed');
        }
    });
}
function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}

function tooltip() {
    var ele = $('.tooltip'),
            pp = ele.find(".tooltip_pp");

    ele.on("click", function(e) {
        e.preventDefault();
        var self = $(this),
                pp = self.find(".tooltip_pp");

        if (!self.hasClass("active")) {
            self.addClass("active");
            TweenLite.to(pp, 0.3, {autoAlpha: 1, bottom: "35px", ease: Power1.easeInOut});
        } else {
            self.removeClass("active");
            TweenLite.to(pp, 0.3, {autoAlpha: 0, bottom: "30px", ease: Power1.easeInOut});
        }
    });
    $(window).on("click", function(e) {
        e.preventDefault();
        if (ele.hasClass("active")) {
            ele.removeClass("active");
            TweenLite.to(pp, 0.3, {autoAlpha: 0, bottom: "30px", ease: Power1.easeInOut});
        }
    });
    ele.on("click", function(e) {
        e.stopPropagation();
    });
}


$(document).ready(function() {
    radiobutton();
    radiobutton_general();
    checkbox();
    popup();
    accordion();
    tabs();
    menu_responsivo();
    dropdown();
    slider();
    abrir_cerrar_grupo();
    validate_formulario_login();
    validate_formulario_datos_tarjeta();
    textto_cortado();
    tooltip();
    
});
$(window).on('resize orientationchange', function() {

});
