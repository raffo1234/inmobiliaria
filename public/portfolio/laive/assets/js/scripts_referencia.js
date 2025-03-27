var bgleft = 0;
var wid, hei, f = 0, fl = 0, pf = 0, pfl = 0, ff = 0;
var cur_page = 1;
var dura = 200;
var tophei = 0;
var minwid = 1100;
var cur_gr = 1;
var pre = "\/";
var cur_pr = 1;
var cur_prnum = 0;
var lang = 0;
$(function() {
    cur_page = 1;
    if ($('#menu_item_title').hasClass('yekan'))
        lang = 1;
    else
        lang = 0;

    var arr = new Array();
    var clarr = new Array();
    var mnarr = new Array();
    for (i = 1; i < 8; i++)
    {
        clarr[i] = new CanvasLoader('tl' + i, {id: "canvasLoader", safeVML: true});
        clarr[i].setColor('#ffffff'); // default is '#000000'
        clarr[i].setDiameter(52); // default is 40
        clarr[i].setDensity(95); // default is 40
        clarr[i].setRange(0.8); // default is 1.3
        clarr[i].setSpeed(5); // default is 2
        clarr[i].setFPS(60); // default is 24
        clarr[i].show();
    }
    for (i = 1; i < 12; i++)
    {
        mnarr[i] = new CanvasLoader('ml' + i, {id: "canvasLoader", safeVML: true});
        mnarr[i].setColor('#ffffff'); // default is '#000000'
        mnarr[i].setDiameter(52); // default is 40
        mnarr[i].setDensity(95); // default is 40
        mnarr[i].setRange(0.8); // default is 1.3
        mnarr[i].setSpeed(5); // default is 2
        mnarr[i].setFPS(60); // default is 24
        mnarr[i].show();
    }
    var bigcl = new CanvasLoader('bigloader', {id: "canvasLoader", safeVML: true});
    bigcl.setColor('#ffffff'); // default is '#000000'
    bigcl.setDiameter(52); // default is 40
    bigcl.setDensity(95); // default is 40
    bigcl.setRange(0.8); // default is 1.3
    bigcl.setSpeed(5); // default is 2
    bigcl.setFPS(60); // default is 24
    bigcl.show();
    $.fn.center = function(str, w) {
        if (w == 0)
            $(str).css('left', (wid - parseInt($(str).css('width'))) / 2);
        else
            $(str).css('left', (wid - w) / 2);

    }

    $.fn.centerVertical = function(str, h) {
        if (h == 0)
            $(str).css('top', (hei - parseInt($(str).css('height'))) / 2);
        else
            $(str).css('top', (hei - h) / 2);
    }

    $.fn.initial = function() {
        wid = window.innerWidth;
        hei = window.innerHeight;
        if (wid < minwid)
            wid = minwid;
        bgleft = (wid - parseInt($('#bgs').css('width'))) / 2;

        $.fn.center('#menu_content_box', 800);
        $.fn.center('#bigloader', 55);
        $.fn.center('#pr_detail_container', 800);
        $.fn.centerVertical('#menu_btn', 0);
        $.fn.centerVertical('#down_btn', 76);
        $.fn.center('#prtable_box', 800);
        $.fn.centerVertical('#prtable_box', 500);
        $.fn.centerVertical('#pr_info_box', 400);
        $.fn.centerVertical('#pr_pic_box', 0);
        $.fn.centerVertical('#menu_info', 0);
        $.fn.centerVertical('#close_menu', 0);
        $.fn.centerVertical('#close_detail', 0);
        $.fn.centerVertical('#slider_container', 0);
        $('#cook_page').css('height', hei);
        $('#contact_page').css('height', hei);
        $('#pr_slider').css('height', hei);
        tophei = (hei - 360) / 2;
        $('#menu_paddtop').css('height', tophei);
        arr[0] = tophei + 844 - hei + 100;
        //$('#page1').parallax("50%",0,0.3, true,11111,false);
        for (i = 1; i < 9; i++)
        {

            yy = $('.gol:eq(' + (i - 1) + ')').offset().top;
            arr[i - 1] = yy + 944 - hei;
            //alert(i+':'+yy);//document.getElementsByClassName('gol').item(i-1).offsetTop;
            //$('#page'+i).parallax("50%",parseInt(yy)+1500,-0.3, true,11111,false);
        }
        //arr[7]=yy=$('#cook_page').offset().top-hei+100;
        arr[8] = $('#cook_page').offset().top;

        arr[9] = $('#contact_page').offset().top - 100;

        $('.gol td:nth-child(1),.gol td:nth-child(3)').css('width', (wid - 844) / 2);
        $('.gol').css('width', '100%');
        //$('.gol td:nth-child(2)').css('width','844px!important');
        var str = 'pbg' + (parseInt((Math.random()) * 1000) % 5 + 1);

        $('#page1').addClass(str);
        $('#r1').css('height', (hei / 2) + 130);

        $('#bgs').css('left', bgleft);
        /*$('#page1').css('background-position',bgleft);
         $('#page2').css('background-position',bgleft);
         $('#page3').css('background-position',bgleft);
         $('#page4').css('background-position',bgleft);
         $('#page5').css('background-position',bgleft);
         $('#page6').css('background-position',bgleft);
         $('#page7').css('background-position',bgleft);
         $('#page8').css('background-position',bgleft);
         $('#page9').css('background-position',bgleft);*/


    }
    $.fn.chadorIn = function(url) {
        //$('#chador').css('display','');
        //$('#chador').fadeTo(1000,1,'easeOutExpo',function(){
        window.location = url;
        //$('#chador').fadeTo(1000,1);
        //});
    }

    $.fn.chadorOut = function() {

        $('#chador').fadeTo(500, .99, function() {
            $('#chador').fadeTo(1500, 0, 'easeInExpo', function() {
                $('#chador').css('display', 'none');
            });
        });
    }
    $.fn.chadorOut();
    $.fn.initial();

    $(window).resize(function() {
        $.fn.initial();
    });
    $(document).ready(function() {
        $.fn.initial();
        $('body,html').animate({scrollTop: 1}, 100, function() {
            $('body,html').animate({scrollTop: 0}, 1);
        });
    });


    $('#close_table,#prtable_out').click(function() {
        $('#prtable').fadeOut(500);
    });
    $('#pr_table').click(function() {
        $('#prtable').fadeIn(500);
    });
    $('#ab_catal,#ab_catal_txt').hover(function() {
        $('#catal_con').stop().fadeTo(300, 1);
    }, function() {

        $('#catal_con').stop().fadeTo(300, 0);
    });

    /**/
    $('#ab_cook,#ab_cook_txt').hover(function() {
        $('#cook_con').stop().fadeTo(300, 1);
    }, function() {

        $('#cook_con').stop().fadeTo(300, 0);
    });

    $.fn.goto = function(page) {
        last = cur_page;
        cur_page = page;
        //alert(cur_page);
        $('#cur').html(cur_page);
        dur = 700;
        //
        $('.menu_pic:eq(' + last + ')').stop().fadeTo(dur, 0, function() {
        });
        if ($('.menu_pic:eq(' + page + ')').hasClass('loaded'))
        {
            $('.menu_pic').stop().fadeTo(dur, 0, function() {
            });
            $('.menu_pic:eq(' + page + ')').stop().fadeTo(dur, 1);
        }
        else
        {
            if ($('#bgrand').html() == "0")
            {
                $('#bgrand').html((parseInt((Math.random()) * 1000) % 5 + 1));
            }
            var str = (pre + "products\/load_menu\/" + (page + 1) + "\/" + $('#bgrand').html())
            $.ajax({beforeSend: function(XMLHttpRequest) {
                    /*----start beforeSend-----*/
                    $('#ml' + (page + 1)).fadeIn(500);
                    $('.menu_pic').stop().fadeTo(dur, 0, function() {
                    });

                    /*----end beforeSend-----var spinner = new Spinner().spin();*/
                },
                data: $("#element").closest("form").serialize(),
                dataType: "html",
                success: function(data, textStatus) {
                    /*----start success-----*/
                    $('.menu_pic:eq(' + page + ')').html(data);
                    $('.menu_pic').stop().fadeTo(dur, 0, function() {
                    });

                    var htm = '<script>$(\'img.imgmenu\').load(function(){$(\'.menu_pic\').stop().fadeTo(100,0,function(){});' +
                            '$(\'#ml' + (page + 1) + '\').fadeOut(300,function(){ $(\'.menu_pic:eq(\'+parseInt($(\'#cur\').html())+\')\').stop().fadeTo(700,1);}); ' +
                            '}); </script>';
                    //alert(htm);
                    $('#temp1').append(htm);
                    /*----end success-----*/

                    $('.menu_pic:eq(' + page + ')').addClass('loaded');
                },
                type: "post",
                url: str
            });
        }


        $('#me').stop().animate({top: cur_page * (-390)}, dur, "easeInOutExpo");
        $('#menu_item_title').stop().animate({top: 160, opacity: 0}, dur / 3, "", function() {
            $('#menu_item_title').css('top', 120);
            $('#menu_item_title').html($('.title_data:eq(' + cur_page + ')').html());
            $('#menu_item_title').animate({top: 140, opacity: 1}, dur / 3);
        });
        $('#menu_item_desc').stop().animate({top: 190, opacity: 0}, dur / 3, "", function() {
            $('#menu_item_desc').css('top', 150);
            $('#menu_item_desc').html($('.desc_data:eq(' + cur_page + ')').html());
            $('#menu_item_desc').animate({top: 170, opacity: 1}, dur / 3);
        });
        $('#num').stop().animate({top: -20, opacity: 0}, dur / 3, "", function() {
            $('#num').css('top', 20);
            $('#num').html(cur_page + 1);
            $('#num').animate({top: 0, opacity: 1}, dur / 3, "");
        });
    }
    $.fn.goto_none = function(page) {
        $('#cur').html(cur_page);
        last = cur_page;
        cur_page = page;
        dur = 1;

        $('.menu_pic').stop().fadeTo(dur, 0);
        if ($('.menu_pic:eq(' + page + ')').hasClass('loaded'))
        {
            $('.menu_pic:eq(' + page + ')').stop().fadeTo(dur, 1);
        }
        else
        {
            if ($('#bgrand').html() == "0")
            {
                $('#bgrand').html((parseInt((Math.random()) * 1000) % 5 + 1));
            }
            var str = (pre + "products\/load_menu\/" + (page + 1) + "\/" + $('#bgrand').html())
            $.ajax({beforeSend: function(XMLHttpRequest) {
                    /*----start beforeSend-----*/
                    $('#ml' + (page + 1)).fadeIn(500);
                    $('.menu_pic:eq(' + last + ')').stop().fadeTo(0, 0, function() {
                    });
                    /*----end beforeSend-----var spinner = new Spinner().spin();*/
                },
                data: $("#element").closest("form").serialize(),
                dataType: "html",
                success: function(data, textStatus) {
                    /*----start success-----*/
                    $('.menu_pic:eq(' + page + ')').html(data);
                    var htm = '<script>$(\'img.imgmenu\').load(function(){' +
                            '$(\'#ml' + (page + 1) + '\').fadeOut(500,function(){$(\'.menu_pic:eq(' + page + ')\').stop().fadeTo(dur,1); });' +
                            '}); </script>';
                    //alert(htm);
                    $('#temp1').append(htm);
                    //$('.menu_pic:eq('+page+')').stop().fadeTo(dur,1); 
                    /*----end success-----*/

                    $('.menu_pic:eq(' + page + ')').addClass('loaded');
                },
                type: "post",
                url: str
            });
        }


        $('#me').stop().animate({top: cur_page * (-390)}, dur, "easeInOutExpo");
        $('#menu_item_title').stop().animate({top: 160, opacity: 0}, dur / 3, "", function() {
            $('#menu_item_title').css('top', 120);
            $('#menu_item_title').html($('.title_data:eq(' + cur_page + ')').html());
            $('#menu_item_title').animate({top: 140, opacity: 1}, dur / 3);
        });
        $('#menu_item_desc').stop().animate({top: 190, opacity: 0}, dur / 3, "", function() {
            $('#menu_item_desc').css('top', 150);
            $('#menu_item_desc').html($('.desc_data:eq(' + cur_page + ')').html());
            $('#menu_item_desc').animate({top: 170, opacity: 1}, dur / 3);
        });
        $('#num').stop().animate({top: -20, opacity: 0}, dur / 3, "", function() {
            $('#num').css('top', 20);
            $('#num').html(cur_page + 1);
            $('#num').animate({top: 0, opacity: 1}, dur / 3, "");
        });
    }

    $.fn.moveprslider2 = function(which, where) {
        //alert(where);

        if (pfl == 1)
        {
            $('#pr_slider_' + which).css({top: (where * 20)});
            $('#pr_slider_' + which).stop().animate({opacity: 0.5}, 300);
        }
        else
        {
            $('#pr_slider_' + which).stop().animate({top: (where * 20), opacity: 0.5}, 300);
        }


    };
    $.fn.moveprslider = function(which, where) {
        $('#pr_slider_100').stop().animate({top: (where * 20)}, 300, function() {
        });

    };


    $.fn.moveprslider_none = function(which, where) {
        $('#pr_slider_100').stop().animate({top: (where * 20)}, 0);

    };
//	alert($('#sp').attr('yoo'));
    sarr = new Array();
    sarr[0] = parseInt($('#a1').height());
    sarr[1] = parseInt($('#a2').height() - 1);
    sarr[2] = parseInt($('#a10').height() - 1);
    sarr[3] = parseInt($('#a11').height());



    $.fn.slider = function(page) {

        durr = 300;
        ease = "";
        switch (page) {
            case 1:
                $('#slider').stop().animate({top: 1, height: sarr[0] - 1}, durr, ease);
                break;
            case 2:
                $('#slider').stop().animate({top: sarr[0] + 1, height: sarr[1]}, durr, ease);
                break;
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
                $('#slider').stop().animate({top: (sarr[0] + sarr[1] + 2 + (page - 3) * 18), height: 17}, durr, ease);
                break;
            case 10:
                $('#slider').stop().animate({top: (18 * 7 + sarr[0] + sarr[1] + 2), height: sarr[2]}, durr, ease);
                break;
            case 11:
                $('#slider').stop().animate({top: (18 * 7 + sarr[0] + sarr[1] + 3 + sarr[2]), height: sarr[3]}, durr, ease);
                break;
            default:
                return;
        }
        $.fn.goto(page - 1);
    }
    $.fn.slider_none = function(page) {

        durr = 0;
        ease = "";
        switch (page) {
            case 1:
                $('#slider').stop().animate({top: 1, height: sarr[0] - 1}, durr, ease);
                break;
            case 2:
                $('#slider').stop().animate({top: sarr[0] + 1, height: sarr[1]}, durr, ease);
                break;
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
                $('#slider').stop().animate({top: (sarr[0] + sarr[1] + 2 + (page - 3) * 18), height: 17}, durr, ease);
                break;
            case 10:
                $('#slider').stop().animate({top: (18 * 7 + sarr[0] + sarr[1] + 2), height: sarr[2]}, durr, ease);
                break;
            case 11:
                $('#slider').stop().animate({top: (18 * 7 + sarr[0] + sarr[1] + 3 + sarr[2]), height: sarr[3]}, durr, ease);
                break;
            default:
                return;
        }
        $.fn.goto_none(page - 1);
    }
    $.fn.slider2 = function(page) {

        durr = 300;
        ease = "";
        switch (page) {
            case 1:
                if (fl == 0)
                {
                    $('#slider2').stop().animate({top: 1, height: sarr[0] - 1, opacity: 0.7}, durr, ease);
                }
                else
                {
                    $('#slider2').css({top: 1, height: sarr[0] - 1});
                    $('#slider2').stop().animate({opacity: 0.7}, durr, ease);
                }
                break;
            case 2:
                if (fl == 0)
                {
                    $('#slider2').stop().animate({top: sarr[0] + 1, height: sarr[1], opacity: 0.7}, durr, ease);
                }
                else
                {
                    $('#slider2').css({top: sarr[0] + 1, height: sarr[1]});
                    $('#slider2').stop().animate({opacity: 0.7}, durr, ease);
                }
                break;
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
                if (fl == 0)
                {
                    $('#slider2').stop().animate({top: (sarr[0] + sarr[1] + 2 + (page - 3) * 18), height: 17, opacity: 0.5}, durr, ease);
                }
                else
                {

                    $('#slider2').css({top: (sarr[0] + sarr[1] + 2 + (page - 3) * 18), height: 17});
                    $('#slider2').stop().animate({opacity: 0.5}, durr, ease);
                }
                break;
            case 10:
                if (fl == 0)
                {
                    $('#slider2').stop().animate({top: (18 * 7 + sarr[0] + sarr[1] + 2), height: sarr[2], opacity: 0.7}, durr, ease);
                }
                else
                {
                    $('#slider2').css({top: (18 * 7 + sarr[0] + sarr[1] + 2), height: sarr[2]});
                    $('#slider2').stop().animate({opacity: 0.7}, durr, ease);
                }
                break;
            case 11:
                if (fl == 0)
                {
                    $('#slider2').stop().animate({top: (18 * 7 + sarr[0] + sarr[1] + 3 + sarr[2]), height: sarr[3], opacity: 0.7}, durr, ease);
                }
                else
                {
                    $('#slider2').css({top: (18 * 7 + sarr[0] + sarr[1] + 3 + sarr[2]), height: sarr[3]});
                    $('#slider2').stop().animate({opacity: 0.7}, durr, ease);
                }
                break;
            default:
                return;
        }
        fl = 0;

    }
    $.fn.change = function(pr) {

        if (pr < 1 || pr > cur_prnum)
        {
            ff = 0;
            return;
        }
        $.fn.moveprslider(100, pr - 1);
        dur = 720;
        $('#pr_num').stop().animate({top: -20, opacity: 0}, dur / 3, "", function() {
            $('#pr_num').css('top', 20);

        });
        //alert('sf');
        $('#pr_pic_box img').stop().animate({right: 200, opacity: 0}, dur);

        $('#pr_item_info_box').stop().animate({top: 160, opacity: 0}, dur / 3, "", function() {
            $('#pr_item_info_box').css('top', 120);
            if ($.fn.set(cur_gr + 1, pr))
            {
                $('#sjd').stop().animate({bottom: 0, opacity: 1}, dur);
                $('#pr_item_info_box').stop().animate({top: 140, opacity: 1}, dur / 3);
                $('#pr_num').stop().animate({top: 0, opacity: 1}, dur / 3);

                $('#pr_pic_box img').stop().animate({right: 0, opacity: 1}, dur);
            }
            //$.fn.moveprslider(100,pr-1);
        });
    }
    $.fn.change2 = function(pr) {
        if (pr < 1 || pr > cur_prnum)
        {
            ff = 0;
            return;
        }
        dur = 700;
        $('#pr_num').stop().animate({top: -20, opacity: 0}, 0, "", function() {
            $('#pr_num').css('top', 20);

        });
        $('#pr_pic_box img').stop().animate({right: 200, opacity: 0}, 0);

        $('#pr_item_info_box').stop().animate({top: 160, opacity: 0}, 0, "", function() {
            $('#pr_item_info_box').css('top', 120);
            if ($.fn.set(cur_gr + 1, pr))
            {
                $('#pr_num').animate({top: 0, opacity: 1}, 230, "");
                $('#pr_item_info_box').stop().animate({top: 140, opacity: 1}, dur / 3);
                $('#pr_pic_box img').stop().animate({right: 0, opacity: 1}, dur);

            }
        });
        $.fn.moveprslider_none(100, pr - 1);

    }
    $.fn.set = function(gr, pr) {
        pr--;
        gr--;
        cur_gr = gr;
        cur_pr = pr;
        var $el = $('.gr:eq(' + gr + ') .pr:eq(' + pr + ') ');
        if (!$el.hasClass('loaded')) {

            var str = (pre + "products\/load_big\/" + (gr + 1) + "\/" + (pr + 1));


            $.ajax({
                beforeSend: function(XMLHttpRequest) {
                    /*----start beforeSend-----*/
                    $('#bigloader').fadeIn(500);
                    //$('#bord').append('start:'+n);
                    //alert('2');
                },
                data: $("#element").closest("form").serialize(),
                dataType: "html",
                success: function(data, textStatus) {

                    /*----start success-----*/ //alert(data);
                    $("#temp").html(data);
                    //$('#bigloader').fadeOut(500);
                    //$('#bord').append('end:'+n/*+'<br/>'+$('#temp .tiny').size()+data*/);


                    var htm = '<script>$(\'img.imgbig\').load(function(){' +
                            '$(\'#bigloader\').fadeOut(500);' +
                            '}); </script>';
                    //alert(htm);
                    $('#temp1').append(htm);
                    //alert(htm);
                    $('#pr_num').html(pr + 1);
                    $('.pr_group_data', $el).html($('#temp #big_group').html());
                    $('.pr_title_data', $el).html($('#temp #big_title').html());
                    $('.pr_weight_data', $el).html($('#temp #big_weight').html());
                    $('.pr_t1_data', $el).html($('#temp #big_t7').html());
                    $('.pr_t2_data', $el).html($('#temp #big_t1').html());
                    $('.pr_t3_data', $el).html($('#temp #big_t2').html());
                    $('.pr_t4_data', $el).html($('#temp #big_t3').html());
                    $('.pr_t5_data', $el).html($('#temp #big_t4').html());
                    $('.pr_t6_data', $el).html($('#temp #big_t5').html());
                    $('.pr_t7_data', $el).html($('#temp #big_t6').html());
                    $('.pr_bc_data', $el).html($('#temp #big_bc').html());



                    $('.pr_subtitle_data', $el).html($('#temp #big_subtitle').html());
                    $('.pr_img_data', $el).html($('#temp #big_img').html());
                    $('#pr_item_title').html($('.pr_group_data', $el).html());
                    $('#pr_item_weight').html($('.pr_weight_data', $el).html());

                    if (lang == 0)
                    {
                        $('#table_t1').html('Ingredients : ' + $('.pr_t1_data', $el).html());
                        $('#table_t2').html('Carton Gross weight : ' + $('.pr_t2_data', $el).html());
                        $('#table_t3').html('Carton Net Weight : ' + $('.pr_t3_data', $el).html());
                        $('#table_t4').html('Unit Per Carton : ' + $('.pr_t4_data', $el).html());
                        $('#table_t5').html('Product ' + $('.pr_t5_data', $el).html());
                        $('#table_t6').html('Drain Weight : ' + $('.pr_t6_data', $el).html());
                        $('#table_t7').html('Shelf Life : ' + $('.pr_t7_data', $el).html());
                        $('#table_barcode').html('(barcode : ' + $('.pr_bc_data', $el).html() + ' )');
                        $('#table_grtitle').html($('.pr_group_data', $el).html());
                        $('#table_prtitle').html($('.pr_title_data', $el).html());
                        $('#table_prsubtitle').html($('.pr_subtitle_data', $el).html());
                    }
                    else
                    {
                        $('#table_t1').html('Ù…Ø­ØªÙˆÙŠØ§Øª : ' + $('.pr_t1_data', $el).html());
                        $('#table_t2').html('ÙˆØ²Ù† Ù†Ø§ Ø®Ø§Ù„Øµ Ù‡Ø± Ø´Ø±ÙŠÙ†Ú¯ : ' + $('.pr_t2_data', $el).html());
                        $('#table_t3').html('ÙˆØ²Ù† Ø®Ø§Ù„Øµ Ù‡Ø± Ø´Ø±ÙŠÙ†Ú¯ : ' + $('.pr_t3_data', $el).html());
                        $('#table_t4').html('ØªØ¹Ø¯Ø§Ø¯ Ø¯Ø± Ù‡Ø± Ø´Ø±ÙŠÙ†Ú¯ : ' + $('.pr_t4_data', $el).html());
                        $('#table_t5').html(' ' + $('.pr_t5_data', $el).html());
                        $('#table_t6').html('ÙˆØ²Ù† Ø¢Ø¨Ú©Ø´ : ' + $('.pr_6_data', $el).html());
                        $('#table_t7').html('Ø²Ù…Ø§Ù† Ù…Ø§Ù†Ø¯Ú¯Ø§Ø±ÙŠ : ' + $('.pr_t7_data', $el).html());
                        $('#table_barcode').html('( Ø¨Ø§Ø±Ú©Ø¯ : ' + $('.pr_bc_data', $el).html() + ' )');
                        $('#table_grtitle').html($('.pr_group_data', $el).html());
                        $('#table_prtitle').html($('.pr_title_data', $el).html());
                        $('#table_prsubtitle').html($('.pr_subtitle_data', $el).html());
                    }


                    $('#pr_item_sub').html($('.pr_subtitle_data', $el).html());

                    $('#pr_item_desc').html($('.pr_title_data', $el).html());
                    $('#pr_pic_box').html($('.pr_img_data', $el).html());
                    $('#pr_item_info_box').stop().animate({top: 140, opacity: 1}, dur / 3);
                    $('#pr_num').animate({top: 0, opacity: 1}, dur / 3, "");
                    /*
                     $('#pr_item_desc').animate({top:170,opacity:1},dur/3);
                     $('#pr_item_title').animate({top:140,opacity:1},dur/3);		
                     */
                    $('#pr_pic_box img').stop().animate({right: 0, opacity: 1}, dur);
                    /*----end success-----$("#load_animate").hide();
                     $("#to_load").fadeTo(500,1);*/
                },
                type: "post",
                url: str
            });
            $el.addClass('loaded');
            return false;



        }
        else
        {
            $('#pr_num').html(pr + 1);

            $('#pr_item_title').html($('.pr_group_data', $el).html());
            $('#pr_item_weight').html($('.pr_weight_data', $el).html());
            if (lang == 0)
            {
                $('#table_t1').html('Ingradiants : ' + $('.pr_t1_data', $el).html());
                $('#table_t2').html('Carton Gross weight : ' + $('.pr_t2_data', $el).html());
                $('#table_t3').html('Carton Net Weight : ' + $('.pr_t3_data', $el).html());
                $('#table_t4').html('Unit Per Carton : ' + $('.pr_t4_data', $el).html());
                $('#table_t5').html('Unit Net Weight : ' + $('.pr_t5_data', $el).html());
                $('#table_t6').html('Time until expire date : ' + $('.pr_t6_data', $el).html());
                $('#table_barcode').html('(barcode : ' + $('.pr_bc_data', $el).html() + ' )');
                $('#table_grtitle').html($('.pr_group_data', $el).html());
                $('#table_prtitle').html($('.pr_title_data', $el).html());
                $('#table_prsubtitle').html($('.pr_subtitle_data', $el).html());
            }
            else
            {
                $('#table_t1').html('Ù…Ø­ØªÙˆÙŠØ§Øª : ' + $('.pr_t1_data', $el).html());
                $('#table_t2').html('ÙˆØ²Ù† Ù†Ø§ Ø®Ø§Ù„Øµ Ù‡Ø± Ø´Ø±ÙŠÙ†Ú¯ : ' + $('.pr_t2_data', $el).html());
                $('#table_t3').html('ÙˆØ²Ù† Ø®Ø§Ù„Øµ Ù‡Ø± Ø´Ø±ÙŠÙ†Ú¯ : ' + $('.pr_t3_data', $el).html());
                $('#table_t4').html('ØªØ¹Ø¯Ø§Ø¯ Ø¯Ø± Ù‡Ø± Ø´Ø±ÙŠÙ†Ú¯ : ' + $('.pr_t4_data', $el).html());
                $('#table_t5').html('Ù†ÙˆØ¹ Ø¸Ø±Ù : ' + $('.pr_t5_data', $el).html());
                $('#table_t6').html('Ø²Ù…Ø§Ù† Ù…Ø§Ù†Ø¯Ú¯Ø§Ø±ÙŠ : ' + $('.pr_t6_data', $el).html());
                $('#table_barcode').html('( Ø¨Ø§Ø±Ú©Ø¯ : ' + $('.pr_bc_data', $el).html() + ' )');
                $('#table_grtitle').html($('.pr_group_data', $el).html());
                $('#table_prtitle').html($('.pr_title_data', $el).html());
                $('#table_prsubtitle').html($('.pr_subtitle_data', $el).html());
            }


            $('#pr_item_sub').html($('.pr_subtitle_data', $el).html());

            $('#pr_item_desc').html($('.pr_title_data', $el).html());
            $('#pr_pic_box').html($('.pr_img_data', $el).html());


            $('#pr_item_title').html($('.pr_group_data', $el).html());
            $('#pr_item_desc').html($('.pr_title_data', $el).html());
            $('#pr_item_sub').html($('.pr_subtitle_data', $el).html());


            return true;
        }

    }

    $('#logo_footer').click(function() {
        $.fn.chadorIn('/home');
    });
    $('.btn').each(function(index, element) {
        $(this).hover(function() {
            $('.btnn:eq(' + index + ')').stop().fadeTo(200, 0);
        }, function() {
            $('.btnn:eq(' + index + ')').stop().fadeTo(200, 1);
        });
    });
    $('#pr_up').click(function() {
        $.fn.change(cur_pr);
    });
    $('#pr_down').click(function() {
        $.fn.change(cur_pr + 2);
    });
    $('.button').each(function(index, element) {
        $(this).hover(function() {
            $(this).stop().animate({opacity: 1}, 300);
        }, function() {
            $(this).stop().animate({opacity: 0.5}, 300);
        });
    });
    $('.button2').each(function(index, element) {
        $(this).hover(function() {
            $(this).stop().animate({opacity: 0.2}, 300);
        }, function() {
            $(this).stop().animate({opacity: 0.15}, 300);
        });
    });
    var limitl = -750;
    var limitr = 50;

    /*$('#left_arrow').mousehold(function(){
     temp=parseInt($('#pickled_bord').css('left'))+50;
     if(temp<limitr)
     $('#pickled_bord').stop().animate({left:temp},400);	
     });
     $('#right_arrow').mousehold(function(){
     
     temp=parseInt($('#pickled_bord').css('left'))-50;
     if(temp>limitl)
     $('#pickled_bord').stop().animate({left:temp},400);	
     
     });*/
    pick_page = 0;
    $('#left_arrow').mouseup(function() {
        //temp=parseInt($('#pickled_bord').css('left'))+50;

        if (pick_page >= 0)
            return;
        temp = -840;
        pick_page = pick_page + 1;
        $('#pickled_bord').stop().animate({left: pick_page * (880) + 25}, 1500, "easeInOutExpo");
    });
    $('#right_arrow').mouseup(function() {
        temp = -840;
        if (pick_page <= -2)
            return;
        pick_page = pick_page - 1;
        $('#pickled_bord').stop().animate({left: pick_page * (880) + 25}, 1500, "easeInOutExpo");
    });

    $('#a1').click(function() {
        $.fn.slider(1);
    });
    $('#a2').click(function() {
        $.fn.slider(2);
    });
    $('.std').each(function(index, element) {
        $(this).click(function() {
            $.fn.slider(index + 3);
        });
    });
    $('.viewslide').each(function(index, element) {
        $(this).click(function() {
            pf = 1;
            $('.prs:eq(' + cur_gr + ')').hide();

            var pro = 1;
            cur_gr = index;
            //var $el=$('.gr:eq('+gr+') .pr:eq('+pr+') ');style="display:block!important"
            cur_prnum = $('.gr:eq(' + cur_gr + ') .pr').size();


            var colors = new Array();
            colors[0] = '#aa9f22';
            colors[1] = '#f37b01';
            colors[2] = '#8dc124';
            colors[3] = '#f06743';
            colors[4] = '#bed400';
            colors[5] = '#f89c00';
            colors[6] = '#f1747a';

            var opa = new Array();
            opa[0] = '.05';
            opa[1] = '.07';
            opa[2] = '.08';
            opa[3] = '.05';
            opa[4] = '.15';
            opa[5] = '.07';
            opa[6] = '.05';
            $('#pr_detail_page').css('background-color', colors[cur_gr]);
            //alert(opa[cur_gr]);
            $('#opbg').css('opacity', opa[cur_gr]);
            $('#pr_detail_page').fadeIn(500);

            $.fn.change2(pro);
            $('.prs:eq(' + cur_gr + ')').show();
        });
    });
    $('.slideshowbtn').each(function(index, element) {
        $(this).click(function() {
            pf = 1;
            $('.prs:eq(' + cur_gr + ')').hide();

            var pro = 1;
            cur_gr = index;
            //var $el=$('.gr:eq('+gr+') .pr:eq('+pr+') ');style="display:block!important"
            cur_prnum = $('.gr:eq(' + cur_gr + ') .pr').size();


            var colors = new Array();
            colors[0] = '#aa9f22';
            colors[1] = '#f37b01';
            colors[2] = '#8dc124';
            colors[3] = '#f06743';
            colors[4] = '#bed400';
            colors[5] = '#f89c00';
            colors[6] = '#f1747a';

            var opa = new Array();
            opa[0] = '.05';
            opa[1] = '.07';
            opa[2] = '.08';
            opa[3] = '.05';
            opa[4] = '.15';
            opa[5] = '.07';
            opa[6] = '.05';
            $('#pr_detail_page').css('background-color', colors[cur_gr]);
            //alert(opa[cur_gr]);
            $('#opbg').css('opacity', opa[cur_gr]);
            $('#pr_detail_page').fadeIn(500);

            $.fn.change2(pro);
            $('.prs:eq(' + cur_gr + ')').show();
        });
    });
    $('.pro_btn').live('click', function(index, element) {

        pf = 1;
        $('.prs:eq(' + cur_gr + ')').hide();
        var gro = $(this).attr('gr');
        var pro = $(this).attr('dt');
        cur_gr = gro - 1;
        //var $el=$('.gr:eq('+gr+') .pr:eq('+pr+') ');style="display:block!important"
        cur_prnum = $('.gr:eq(' + cur_gr + ') .pr').size();


        var colors = new Array();
        colors[0] = '#aa9f22';
        colors[1] = '#f37b01';
        colors[2] = '#8dc124';
        colors[3] = '#f06743';
        colors[4] = '#bed400';
        colors[5] = '#f89c00';
        colors[6] = '#f1747a';
        $('#pr_detail_page').css('background-color', colors[cur_gr]);
        $('#pr_detail_page').fadeIn(500);
        var opa = new Array();
        opa[0] = '.05';
        opa[1] = '.07';
        opa[2] = '.08';
        opa[3] = '.05';
        opa[4] = '.15';
        opa[5] = '.07';
        opa[6] = '.05';
        $('#pr_detail_page').css('background-color', colors[cur_gr]);
        //alert(opa[cur_gr]);
        $('#opbg').css('opacity', opa[cur_gr]);
        $.fn.change2(pro);
        $('.prs:eq(' + cur_gr + ')').show();

    });
    $('#swan').click(function() {
        window.open('http://www.swandesign.ir');
    });
    $('#gmap').click(function() {
        window.open('https://maps.google.com/?q=35.719196,51.404149');
    });

    $('#ab_catal').click(function() {
        window.open('http://www.mbforoughi.com/Download/catalogue.pdf');
    });

    $('#cookbtn,#ab_cook,#ab_cook_txt').click(function() {

        $.fn.chadorIn('/cooking');
    });
    $('.sbtn', '.prs_sbtn').each(function(index, element) {
        $(this).hover(function() {

            //alert(pfl);
            //alert($(this).parent().html());
            var a = $(this).offset().top;
            var b = $(this).parent().offset().top;
            var c = a - b - 1;
            c = parseInt(c / 20);
            //alert(c);
            $.fn.moveprslider2(50, c);
            pfl = 0;
            //$('#pr_slider_50').animate({opacity:.5},300);
        }, function() {
            $('#pr_slider_50').stop().animate({opacity: 0}, 300);
        });
        $(this).click(function() {
            var a = $(this).offset().top;
            var b = $(this).parent().offset().top;
            var c = a - b - 1;
            c = parseInt(c / 20);

            $.fn.change(c + 1);
        });
    });
    $('#close_detail').click(function() {
        $('#pr_detail_page').fadeOut(500);
        pf = 0;
    });
    $('#a10').click(function() {
        $.fn.slider(10);
    });
    $('#a11').click(function() {
        $.fn.slider(11);
    });
    $('#outarea').hover(function() {
        fl = 1;
    }, function() {
    });
    $('#pr_out').hover(function() {
        pfl = 1;
        //alert(pfl);
    }, function() {
    });



    $('#a1').hover(function() {

        $.fn.slider2(1);

    }, function() {

        $('#slider2').stop().animate({opacity: 0}, dura);
    });
    $('#a2').hover(function() {

        $.fn.slider2(2);

    }, function() {

        $('#slider2').stop().animate({opacity: 0}, dura);
    });

    $('.std').each(function(index, element) {
        $(this).hover(function() {

            $.fn.slider2(index + 3);

        }, function() {

            $('#slider2').stop().animate({opacity: 0}, dura);
        });
    });
    $('#a10').hover(function() {

        $.fn.slider2(10);
    }, function() {

        $('#slider2').stop().animate({opacity: 0}, dura);
    });
    $('#a11').hover(function() {

        $.fn.slider2(11);
    }, function() {

        $('#slider2').stop().animate({opacity: 0}, dura);
    });


    $('#menu_btn').click(function() {
        $('#menu_thumpline').fadeIn(300, "");
        $.fn.slider_none(cur_page);
        f = 1;
    });

    $.fn.scrollToPage = function() {
        if (cur_page < 9)
        {
            if (cur_page == 0)
            {
                xx = 0;
                d = 0;
            }
            else
            {
                var xx = document.getElementsByClassName('gol').item((cur_page - 1)).offsetTop;
                var d = 905 - ((hei / 2) - 23);
            }
        }
        else if (cur_page == 9)
        {
            var xx = $('#cook_page').offset().top;//document.getElementsByClassName('gol').item((cur_page-1)).offsetTop;
            var d = 0;//905-((hei/2)-23);//844-(hei/2)+100;

        }
        else if (cur_page == 10) {
            var xx = $('#contact_page').offset().top;//document.getElementsByClassName('gol').item((cur_page-1)).offsetTop;
            var d = 0;//905-((hei/2)-23);//844-(hei/2)+100;

        }
        $('body,html').stop().animate({scrollTop: (xx + d)}, 1500, "easeInOutExpo");
    }
    $('#down_btn').click(function() {
        if (cur_page == 11)
        {
            $('body,html').stop().animate({scrollTop: (0)}, 6000, "easeInOutExpo");
        }
        else
        {
            $.fn.scrollToPage();
        }
    });
    $.fn.closeMenu = function() {
        if (cur_page == 0)
        {
            $('body,html').scrollTop(0);
        }
        else if (cur_page == 9)
        {
            var xx = $('#cook_page').offset().top;//document.getElementsByClassName('gol').item((cur_page-1)).offsetTop;
            var d = 0;//905-((hei/2)-23);//844-(hei/2)+100;
            $('body,html').scrollTop(xx + d);
        }
        else if (cur_page == 10)
        {
            var xx = $('#contact_page').offset().top;//document.getElementsByClassName('gol').item((cur_page-1)).offsetTop;
            var d = 0;//905-((hei/2)-23);//844-(hei/2)+100;
            $('body,html').scrollTop(xx + d);
        }
        else {
            var xx = document.getElementsByClassName('gol').item((cur_page - 1)).offsetTop;
            var d = 905 - ((hei / 2) - 23);
            $('body,html').scrollTop(xx + d);
        }
        $('#menu_thumpline').fadeOut(300);
        f = 0;
        cur_page++;
    }
    $('#close_menu,#lensb').click(function() {
        $.fn.closeMenu();
    });
    $('.menu_pic').each(function(index, element) {
        $(this).click(function() {
            if (index == cur_page)
            {

                $.fn.closeMenu();


            }
            else
            {
                $.fn.slider(index + 1);
            }


        });
    });
    $('.pro_item').each(function(index, element) {
        $(this).hover(function() {
            //$(this).addClass('pro_hover');
            var ss = parseInt($(this).css('width')) - 2;
            $(this).css('width', ss + "px");
            $(this).css('background-size', '100%');


        }, function() {
            var ss = parseInt($(this).css('width')) + 2;
            $(this).css('width', ss + "px");
        });
    });
    $('.r1').each(function(index, element) {
        $(this).click(function() {
            //alert("hei:"+$(this).height()+" , wid:"+$(this).width());
        });
    });
    $.fn.arrow = function() {

        if ($('#down_btn').hasClass('up_btn'))
        {
            $('#down_btn').removeClass('f2');
            $('#down_btn').fadeOut(250, function() {
                $('#down_btn').removeClass('up_btn');
                $('#down_btn').fadeIn(250);
            });
        }
    }
    $(window).scroll(function() {

        $('#pagef1').hide();
        arr[8] = $('#cook_page').offset().top - hei / 2;
        var topp = $(window).scrollTop();
        if (topp == 1)
        {
            $.fn.initial();
        }
        $('#bord2').html(cur_page + ',' + topp);
        if (topp > tophei + 140)
        {
            $('#logo_footer').fadeIn(400);
        }
        else
        {
            $('#logo_footer').fadeOut(400);
        }
        if (topp < arr[0])
        {
            cur_page = 1;
            $.fn.arrow();
        }
        else if (topp < arr[1])
        {
            cur_page = 2;
            $.fn.arrow();
        }
        else if (topp < arr[2])
        {
            cur_page = 3;
            $.fn.arrow();
        }
        else if (topp < arr[3])
        {
            cur_page = 4;
            $.fn.arrow();
        }
        else if (topp < arr[4])
        {
            cur_page = 5;
            $.fn.arrow();
        }
        else if (topp < arr[5])
        {
            cur_page = 6;
            $.fn.arrow();
        }
        else if (topp < arr[6])
        {
            cur_page = 7;
            $.fn.arrow();
        }
        else if (topp < arr[7])
        {
            cur_page = 8;
            $.fn.arrow();
        }
        else if (topp < arr[8])
        {
            cur_page = 9;
            $.fn.arrow();
        }
        else if (topp < arr[9])
        {
            cur_page = 10;
            $.fn.arrow();
        }
        else
        {
            if (!$('#down_btn').hasClass('f2'))
            {
                $('#down_btn').addClass('f2');
                $('#down_btn').fadeOut(250, function() {
                    $('#down_btn').addClass('up_btn');
                    $('#down_btn').fadeIn(250);
                });
            }
            cur_page = 11;

        }

        //$.fn.slider(cur_page);cur_page--;

    });
    $.fn.loadtiny = function(n) {
        if (n > 7)
        {
            $.fn.loadpara(1);
            return;
        }
        var str = (pre + "products\/load_tiny\/" + n)
        //alert(str);
        $.ajax({
            beforeSend: function(XMLHttpRequest) {
                /*----start beforeSend-----*/
                $('#bord').append('start:' + n/*+'<br/>'+$('#temp .tiny').size()+data*/);
                // Hidden by default
                /*----end beforeSend-----var spinner = new Spinner().spin();
                 $("#to_load").hide();
                 $("#load_animate").html( spinner.el );
                 $("#load_animate").show();*/
            },
            data: $("#element").closest("form").serialize(),
            dataType: "html",
            success: function(data, textStatus) {
                /*----start success-----*/
                $("#temp").html(data);

                $('#bord').append('end:' + n/*+'<br/>'+$('#temp .tiny').size()+data*/);
                for (i = 0; i < $('#temp .tiny').size(); i++)
                {

                    //alert($('#temp .tiny:eq(3)').html());
                    $("#to_load" + n + "  .pro_btn:eq(" + i + ")").html($('#temp .tiny:eq(' + i + ')').html());
                    //$('#bord').append(i+","+$(" .pro_btn:eq("+i+")").html());
                }
                //clarr[n].kill();
                var htm = '<script>var ale' + n + '=0; $(\'img.imgload' + n + '\').load(function(){ale' + n + '++;if(ale' + n + '==' +
                        $('#temp .tiny').size()
                        + '){/*$(\'#bord2\').append("do' + n + 'ne!' + $('#temp .tiny').size() + '<br/>"+ale' + n + ');*/' +
                        '$("#tl' + n + '").fadeOut(300,function(){$("#grgr' + n + '").fadeIn(500);});}}); </script>';
                //alert(htm);
                $('#temp1').append(htm);
                $.fn.loadtiny(n + 1);
                /*----end success-----$("#load_animate").hide();
                 $("#to_load").fadeTo(500,1);*/
            },
            type: "post",
            url: str
        });
        //alert('sd');
        return false;
    }
    $.fn.loadpara = function(n) {
        if (n > 8)
        {

            return;
        }
        if ($('#bgrand').html() == "0")
        {
            $('#bgrand').html((parseInt((Math.random()) * 1000) % 5 + 1));
        }
        var str = (pre + "products\/load_para\/" + n + "\/" + $('#bgrand').html())
        //alert(str);
        $.ajax({
            beforeSend: function(XMLHttpRequest) {
                /*----start beforeSend-----*/
                $('#bord').append(',startp:' + n);
                /*----end beforeSend-----var spinner = new Spinner().spin();
                 $("#to_load").hide();
                 $("#load_animate").html( spinner.el );
                 $("#load_animate").show();*/
            },
            data: $("#element").closest("form").serialize(),
            dataType: "html",
            success: function(data, textStatus) {
                /*----start success-----*/
                $(".si:eq(" + (n - 1) + ")").append(data);

                $.fn.loadpara(n + 1);
                /*----end success-----$("#load_animate").hide();
                 $("#to_load").fadeTo(500,1);*/
            },
            type: "post",
            url: str
        });
        //alert('sd');
        return false;
    }
    $(window).load(function() {

        $.fn.loadtiny(1);
        /*$.fn.loadtiny(2);
         $.fn.loadtiny(3);
         $.fn.loadtiny(4);
         $.fn.loadtiny(5);
         $.fn.loadtiny(6);
         $.fn.loadtiny(7);*/

    });
    $(window).keydown(function(e) {

        if (e.keyCode == 49)//1
        {
//$.fn.loadpara(1);
            //var cl = new CanvasLoader('bord');

        }
        else if (e.keyCode == 81)//q
        {
            //alert(cur_page);//
            //alert(window.innerHeight+","+window.innerWidth);
        }
        else if (e.keyCode == 13)//enter
        {
            if (f == 1)
            {
                $.fn.closeMenu();
                e.preventDefault();
                return;
            }
        }
        else if (e.keyCode == 38 || e.keyCode == 33)//up
        {
            if (f == 1)
            {
                $.fn.slider(cur_page);
                e.preventDefault();
                return;
            }
            if (pf == 1)
            {
                $.fn.change(cur_pr);
                e.preventDefault();
                return;
            }

            if (cur_page > 2)
            {
                cur_page -= 2;
                $.fn.scrollToPage();
                e.preventDefault();
            }
            else if (cur_page == 1)
            {
                cur_page = 1;
                e.preventDefault();
            }
            else
            {
                cur_page = 0;
                $.fn.scrollToPage();
                e.preventDefault();
            }
            //alert(cur_page);			

        }
        else if (e.keyCode == 40 || e.keyCode == 34)//down
        {
            if (f == 1)
            {
                $.fn.slider(cur_page + 2);
                e.preventDefault();
                return;
            }
            if (pf == 1)
            {
                $.fn.change(cur_pr + 2);
                e.preventDefault();
                return;
            }
            if (cur_page != 11)
                $.fn.scrollToPage();
            e.preventDefault();
        }
        else if (e.keyCode == 36)//home
        {
            $('body,html').stop().animate({scrollTop: (0)}, 6000, "easeInOutExpo");
            e.preventDefault();
        }
        else if (e.keyCode == 35)//end
        {
            xx = $('#contact_page').offset().top;
            $('body,html').stop().animate({scrollTop: parseInt(xx)}, 6000, "easeInOutExpo");
            e.preventDefault();
        }
        else if (e.keyCode == 27)//Esc
        {
            if (f == 1)
            {
                if (cur_page == 0)
                {
                    $('body,html').scrollTop(0);
                }
                else if (cur_page == 9)
                {
                    var xx = $('#cook_page').offset().top;
                    var d = 0;
                    $('body,html').scrollTop(xx + d);
                }
                else if (cur_page == 10)
                {
                    var xx = $('#contact_page').offset().top;
                    var d = 0;
                    $('body,html').scrollTop(xx + d);
                }
                else {
                    var xx = document.getElementsByClassName('gol').item((cur_page - 1)).offsetTop;
                    var d = 905 - ((hei / 2) - 23);
                    $('body,html').scrollTop(xx + d);
                }
                $('#menu_thumpline').fadeOut(300);
                f = 0;
                e.preventDefault();
                return;
            }
            if (pf == 1)
            {
                $('#pr_detail_page').fadeOut(500);
                pf = 0;
                e.preventDefault();
                return;
            }
        }

    });


    $(window).mousewheel(function(e, delta) {

        if (delta > 0)//up
        {
            if (f == 1)
            {
                $.fn.slider(cur_page);
                e.preventDefault();
                return;
            }
            if (pf == 1)
            {
                ff = 1;
                $.fn.change(cur_pr);
                e.preventDefault();
                return;
            }

        }
        else//down
        {
            if (f == 1)
            {
                $.fn.slider(cur_page + 2);
                e.preventDefault();
                return;
            }
            if (pf == 1)
            {
                ff = 1;
                $.fn.change(cur_pr + 2);
                e.preventDefault();
                return;
            }
        }

    });
    /*var ii=0;
     $('#tinyitems2  img').livequery('click', function()
     {
     ii++;   
     $('#bord2').append(','+ii);
     
     });*/
})