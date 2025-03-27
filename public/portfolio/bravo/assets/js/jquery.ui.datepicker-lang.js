
$.datepicker.regional['es'] = {
    closeText: 'Cerrar',
    prevText: '&#x3c;Ant',
    nextText: 'Sig&#x3e;',
    currentText: 'Hoy',
    monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio',
    'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
    monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun',
    'Jul','Ago','Sep','Oct','Nov','Dic'],
    dayNames: ['Domingo','Lunes','Martes','Mi&eacute;rcoles','Jueves','Viernes','S&aacute;bado'],
    dayNamesShort: ['Dom','Lun','Mar','Mi&eacute;','Juv','Vie','S&aacute;b'],
    dayNamesMin: ['D','L','M','X','J','V','S'],
    weekHeader: 'Sm',
    dateFormat: 'dd/mm/yy',
    firstDay: 1,
    isRTL: false,
    showMonthAfterYear: false,
    yearSuffix: ''
};

$.datepicker.regional['fr'] = {
    closeText: 'Fermer',
    prevText: '&#x3c;PrÃ©c',
    nextText: 'Suiv&#x3e;',
    currentText: 'Courant',
    monthNames: ['Janvier','FÃ©vrier','Mars','Avril','Mai','Juin',
    'Juillet','AoÃ»t','Septembre','Octobre','Novembre','DÃ©cembre'],
    monthNamesShort: ['Jan','FÃ©v','Mar','Avr','Mai','Jun',
    'Jul','AoÃ»','Sep','Oct','Nov','DÃ©c'],
    dayNames:
    ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
    dayNamesShort: ['Dim','Lun','Mar','Mer','Jeu','Ven','Sam'],
    dayNamesMin: ['D','L','M','X','J','V','S'],
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