var ModalEffects = (function() {

    function init() {

        var trigger = $('.md-trigger'),
                html = $('html'),
                close = $('.md-close_js');
        
        trigger.on('click', function() {
            var self = $(this),
                    modal = $('#' + self.attr('data-modal'));

            modal.addClass('md-show').fadeIn();
            html.addClass('hidden');
        });
        close.on('click', function(ev) {
            $('.md-modal').removeClass('md-show').fadeOut();
            html.removeClass('hidden');
        });
        $('.md-modal').on("click", function(ev) {
            $('.md-modal').removeClass('md-show').fadeOut();
            html.removeClass('hidden');
        });
        $('.md-content').on("click", function(e) {
            e.stopPropagation();
        });
    }

    init();
})();