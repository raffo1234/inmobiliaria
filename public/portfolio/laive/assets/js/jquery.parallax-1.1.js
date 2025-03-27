/*
 Plugin: jQuery Parallax
 Version 1.1
 Author: Ian Lunn
 Author URL: http://www.ianlunn.co.uk/
 Plugin URL: http://www.ianlunn.co.uk/plugins/jquery-parallax/
 
 Dual licensed under the MIT and GPL licenses:
 http://www.opensource.org/licenses/mit-license.php
 http://www.gnu.org/licenses/gpl.html
 */

(function($) {
    $.fn.parallax = function(xpos, adjuster, inertia, outerHeight, endY, isAnimate) {

        function inView(pos, element) {

            element.each(function() { //for each selector, determine whether it's inview and run the move() function

                var element = $(this);
                var top = element.offset().top;

                if (outerHeight == true) {
                    var height = element.outerHeight(true);
                } else {
                    var height = element.height();
                }

                //above & in view
                if (top + height >= pos && top + height - windowHeight < pos) {
                    move(pos, height);
                }

                //full view
                if (top <= pos && (top + height) >= pos && (top - windowHeight) < pos && top + height - windowHeight > pos) {
                    move(pos, height);
                }

                //below & in view
                if (top + height > pos && top - windowHeight < pos && top > pos) {
                    move(pos, height);
                }
            });
        }

        var $window = $(window);
        var windowHeight = $(window).height();
        var pos = $window.scrollTop(); //position of the scrollbar
        var $this = $(this);

        //setup defaults if arguments aren't specified
        if (xpos == null) {
            xpos = "50%"
        }
        if (adjuster == null) {
            adjuster = 0
        }
        if (inertia == null) {
            inertia = 0.1
        }
        if (outerHeight == null) {
            outerHeight = true
        }
        height = $this.height();
        $this.css({'backgroundPosition': newPos(xpos, outerHeight, adjuster, inertia)});
        //var q=newPos(xpos, outerHeight, adjuster, inertia);
        //$this.animate( { backgroundPosition:q },1000); 
        function newPos(xpos, windowHeight, pos, adjuster, inertia) {
            var posi = Math.round((-((windowHeight + pos) - adjuster) * inertia));
            return xpos + " " + posi + "px";
        }
        $this.css({'backgroundPosition': newPos(xpos, height, pos, adjuster, inertia)});
        //function to be called whenever the window is scrolled or resized
        function move(pos, height) {
            //$('#msg').html(window.innerHeight+','+endY+','+Math.round((-((windowHeight + pos) - adjuster) * inertia)));
            if (endY > Math.round((-((windowHeight + pos) - adjuster) * inertia)))
            {
                var ss = newPos(xpos, height, pos, adjuster, inertia);
                if (isAnimate == false)
                {
                    $this.css({'backgroundPosition': ss});
                }
                else
                {
                    $this.stop().animate({'backgroundPosition': ss}, 400);
                }
                //$('#msg').append('  =>>>>  '+ss+' |||| '+inertia);
            }
            else
            {
                ss = xpos + " " + (endY - .5 * inertia * window.innerHeight) + "px";
                //$this.css({'backgroundPosition':ss}); 
                if (isAnimate == false)
                {
                    $this.css({'backgroundPosition': ss});
                }
                else
                {
                    $this.stop().animate({'backgroundPosition': ss}, 50);
                }
                //$('#msg').append('  =>>>>  '+ss+' |||| '+inertia);
            }
        }
        $window.bind('scroll', function() { //when the user is scrolling...
            var pos = $window.scrollTop(); //position of the scrollbar
            inView(pos, $this);
            $('#pixels').html(pos);
            
           // console.log(pos);
        })
        $this.css({'backgroundPosition': newPos(xpos, height, pos, adjuster, inertia)});

    }
})(jQuery);