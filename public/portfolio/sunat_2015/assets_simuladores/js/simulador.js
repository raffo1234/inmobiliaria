// JavaScript Document

var maxlength = 10
var iniciaCampos = function(){

    $('input').attr('readonly','readonly').addClass('readonly')
    $('input.edit').removeAttr('readonly').attr('maxlength', maxlength)
    $('input.edit').parent('td').addClass('edit')
    $('input.edit[negativo="true"]').removeAttr('readonly').attr('maxlength', maxlength+2)
    $('input[readyonly="readonly"]').addClass('readonly')


    $('input.edit').bind('click', function(e){
        if($(this).attr('format') == 'true'){
            $(this).toNumber()
            $(this).removeAttr('format')
        }
    })
    $('input.edit[negativo="true"]').bind('click', function(e){
        if(typeof $(this).attr('focus') == 'undefined'){
            //$(this).setCursorPosition($(this).val().length-1);
            $(this).attr('focus', 'true')
            $(this).val(sinNegativo($(this).val()))
        }

    }).bind('focus', function(e){
        e.stopPropagation()
        e.preventDefault()
    })

    $('input').bind('blur', function(e){
        $(this).formatCurrency()
        $(this).attr('format', true)
    })
    $('input.edit').bind('blur', function(e){
        if($(this).val() == '')
            sValB($(this), '')

        /* if(cint(sinNegativo($('input.edit:eq(0)').val())) == 0 || $('input.edit:eq(0)').val() == '')
            sVal($('input[readonly="readonly"]'), '')*/

        v = sinNegativo($(this).val())
        v = valInteger(v)
        if(v != 0)
            v = sVal($(this), v)
        
        var todoVacio = true
        $('input.edit').each(function(i, elem){
            if(sinNegativo($(this).val()) != '')
                todoVacio = false
        })

        if(todoVacio){
            sValB($('input[readonly="readonly"]'), '')
        }
        
        if($(this).attr('negativo') == 'true'){
            if($(this).val() != ''){
                $(this).val(showNegativo($(this).val()))
            }else{
                sValB($(this), '')
            }
            $(this).removeAttr('focus')
        }
    })
    var tocorregir
    var isShift = false
    var isAlt = false
    var stopKeyup = false

    $('input.edit').bind('keyup', function(e){
        if(!stopKeyup){
            if(e.which == 16) isShift=false;
            if(e.which == 18) isAlt=false;
            if(e.keyCode != 116){
                iv = $(this)
                v = sinNegativo($(this).val())
        
                if(/^((0)0*|(0)[1-9]*)/.test(v)){
                    tocorregir = setTimeout(function(){
                        if(/^((0)0*|(0)[1-9]*)/.test(iv.val().toString())){
                            sVal(iv, iv.val().toString().replace(new RegExp('^(0)0*', 'g'), ''))
                            iv.setCursorPosition(0);
                        }else{
                            clearTimeout(tocorregir)
                        }

                        $('input[readonly="readonly"]').toNumber()
                        calPrimera()
                        $('input[readonly="readonly"]').formatCurrency()
                    }, 1000)
                }
            
                snVal($(this), $(this).val())
                var todoVacio = true
                $('input.edit').each(function(i, elem){
                    if(sinNegativo($(elem).val()) != ''){
                        todoVacio = false
                    }
                })

                if(todoVacio){
                    sValB($('input[readonly="readonly"]'), '')
                }


                $('input[readonly="readonly"]').toNumber()
                calPrimera()
                $('input[readonly="readonly"]').formatCurrency()
            }
        }
    //stopKeyup = false
        
    }).bind('keydown', function(e){
        if($(this).val() == '0'){
            $(this).val('')
        }
        if(((e.keyCode >= 37 && e.keyCode <= 40) || (e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105) || e.keyCode == 8 || e.keyCode == 46 || e.keyCode == 9 || e.keyCode == 116) && e.keyCode != 16 && e.keyCode != 18){

            stopKeyup = false
            $('input[readonly="readonly"]').toNumber()
            calPrimera()
            $('input[readonly="readonly"]').formatCurrency()
        }else{
            e.preventDefault()
            stopKeyup = true
        }
        if(e.which == 16) isShift=true;
        if(e.which == 18) isAlt=true;
        if(isShift || isAlt) {
            e.preventDefault()
            return false
        }
                
        
    })
}

var mayorCero = function(v){
    return parseInt(v) > 0 ? true : false
}

var showNegativo = function(v){
    v = sinNegativo(v)
    return '(' + v + ')'
}

var sinNegativo = function(v){
    v = v.toString().replace(new RegExp('\\(|\\)', 'gim'), '')
    return v
}

var gVal = function(o, t){
    var _n
    if(typeof o.attr('nval') != 'undefined' && o.attr('nval') != '')
        _n = o.attr('nval')
    else{
        _n = o.val() == '' ? 0 : o.val()
        _n = sinNegativo(_n)
    }
    
    v__ = (t=='i' ? cint(_n) : t=='f' ? cflt(_n) : _n)
    v__ = isNaN(v__) ? 0 : v__
    return v__

}

var sVal = function(o, n){
    o.attr('nval', sinNegativo(n))
    if(typeof o.attr('negativo') == 'undefined'){
        v = Math.round(n)
    }else{
        v = showNegativo(Math.round(n))
    }
    o.val(v==0 ? '0' : v)
}
var sValB = function(o, n){ // VER BLANCO
    o.attr('nval', sinNegativo(n))
    o.val('')
}
var sValR = function(o, n){ // REDONDEADO
    o.attr('nval', Math.round(sinNegativo(n)))
    if(typeof o.attr('negativo') == 'undefined'){
        v = Math.round(n)
    }else{
        v = showNegativo(Math.round(n))
    }
    o.val(v==0 ? '0' : v)
}
var snVal = function(o, n){
    o.attr('nval', sinNegativo(n))
}

var cint = function(n){
    return parseInt(n)
}

var cflt = function(n){
    return parseFloat(n)
}

var IsInteger = function(str)
{
    if (typeof(str)=='undefined')
    {
        return false;
    }
    //    var expr = /^[\+\-]?[0-9]*$/;
    var expr = /^0?[0]*[0-9]*$/;
    if (expr.test(str))
        return false;

    expr = /^[0-9]*$/;
    if (!expr.test(str))
        return false;

    return true;
}
var valInteger = function(ctrl){
    if(!(IsInteger(ctrl))){
        ctrl = ctrl * 1
        if(isNaN(parseInt(ctrl))){
            ctrl = "";
        }else{
            ctrl = parseInt(ctrl);
            ctrl = ctrl < 0 ? ctrl * -1 : ctrl
        }
        return ctrl
    }else{
        return true
    }
}
/*var valInteger = function(ctrl){
    if(!(IsInteger(ctrl.value))){
        if(isNaN(parseInt(ctrl.value))){
            ctrl.value = "";
        }else{
            ctrl.value = parseInt(ctrl.value);
            ctrl.value = ctrl.value < 0 ? ctrl.value * -1 : ctrl.value
        }
    }
}*/

var userAgent = navigator.userAgent.toLowerCase()
jQuery.browser = {
    version: (userAgent.match( /.+(?:rv|it|ra|ie|me)[\/: ]([\d.]+)/ ) || [])[1],
    chrome: /chrome/.test( userAgent ),
    safari: /webkit/.test( userAgent ) && !/chrome/.test( userAgent ),
    opera: /opera/.test( userAgent ),
    msie: /msie/.test( userAgent ) && !/opera/.test( userAgent ),
    mozilla: /mozilla/.test( userAgent ) && !/(compatible|webkit)/.test( userAgent )
}


$.fn.setCursorPosition = function(position){
    if(this.length == 0) return this;
    return $(this).setSelection(position, position);
}

$.fn.setSelection = function(selectionStart, selectionEnd) {

    if(this.length == 0) return this;
    input = this[0];

    if (input.createTextRange) {
        var range = input.createTextRange();
        range.collapse(true);
        range.moveEnd('character', selectionEnd);
        range.moveStart('character', selectionStart);
        range.select();
    } else if (input.setSelectionRange) {
        input.focus();
        input.setSelectionRange(selectionStart, selectionEnd);
    }

    return this;
}

$.fn.focusEnd = function(){
    this.setCursorPosition(this.val().length);
}

//setCaretToPos(document.getElementById("YOURINPUT"), 4);


$.fn.formatCurrency = function(settings) {
    settings = jQuery.extend({
        name: "formatCurrency",
        useHtml: false,
        symbol: '',
        global: true
    }, settings);

    return this.each(function() {
        var negativo = false
        var num = "0";
        num = $(this)[settings.useHtml ? 'html' : 'val']();

        if(num != ''){
            if(new RegExp('\\(|\\)', 'gim').test(num)){
                negativo = true
                num = num.replace(new RegExp('\\(|\\)', 'gim'), '');
            }
            num = num.replace(/\$|\,/g, '');
            if (isNaN(num))
                num = "0";
            sign = (num == (num = Math.abs(num)));
            num = Math.floor(num * 100 + 0.50000000001);
            cents = num % 100;
            num = Math.floor(num / 100).toString();
            if (cents < 10)
                cents = "0" + cents;
            for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
                num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));

            $(this)[settings.useHtml ? 'html' : 'val']((negativo ? '(' : '')+((sign) ? '' : '-') + settings.symbol + num + (negativo ? ')' : '') /*+ '.' + cents*/);
        }else{
            $(this)[settings.useHtml ? 'html' : 'val']('')
        }
    });
};

// Remove all non numbers from text
$.fn.toNumber = function(settings) {
    settings = jQuery.extend({
        name: "toNumber",
        useHtml: false,
        global: true
    }, settings);

    return this.each(function() {
        var method = settings.useHtml ? 'html' : 'val';
        if($(this)[method]() != ''){
            $(this)[method]($(this)[method]().replace(new RegExp('\\(|\\)', 'gim'), ''));
            $(this)[method]($(this)[method]().replace(/[^\d\.]/g, ''));
            $(this)[method]($(this)[method]().replace(/\.00/g, ''));
        }else{
            $(this)[method]('')
        }
    });
};