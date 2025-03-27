<?php
session_start();
?>

<!doctype html>
<html lang="es">
    <head>
        <title>SUNAT - Renta 2014</title>

        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <meta name="format-detection" content="telephone=no">
        <meta name="author" content="">
        <meta name="description" content="">
        <meta name="robots" content="all, index, follow">
        <meta name="googlebot" content="all, index, follow">
        <meta name="google-site-verification" content="" />
        <link rel="canonical" href="" />

        <link rel="icon" href="assets/icons/favicon.ico" type="image/x-icon" /> 
        <link rel="shortcut icon" href="assets/icons/favicon.ico" type="image/x-icon" />
        <link rel="stylesheet" href="assets/css/icomoon.css">
        <link rel="stylesheet" href="assets/css/styles.css">
        <link rel="stylesheet" href="assets/css/richtext.css">
        <link rel="stylesheet" href="assets/css/popup.css">

        <!--[if lt IE 9]>
                <script src="assets/js/html5shiv.js"></script>
                <script src="assets/js/respond.min.js"></script>
        <![endif]-->

        <!--[if !IE]><!--> <link rel="stylesheet" type="text/css" href="assets/css/no-ie-5-9.css" /> <!--<![endif]-->

        <script>
            

        </script>
    </head>
    <body>

        <div class="w_loading_init">
            <img src="assets/icons/ajax-loader.gif" alt="" class="gif_loading_init loading_init loading_init_js" />
            <img src="assets/icons/puff_dark.svg" alt="" class="svg_loading_init loading_init loading_init_js" />
        </div>
        <?php
        if (!isset($_SESSION['intro'])) {
            $_SESSION['intro'] = 0;
            ?>
            <div class="into active into_js align_center" >
                <div class="helper"></div><!--
                --><div class="display-inline">
                    <div class="intro_inner ">

                        <h2>¿Quieres saber quienes deben declarar de un solo click?</h2>

                        <div class="intro_des">
                            <a href="assets/pdf/guia_rapida_renta_2014.pdf" class="link" target="_blank"><span class="txt">Descarga ahora la Guía de Renta 2014</span><i class="icon-link"></i></a>
                        </div>
                        <a href="javascript:void(0);" class="btn_medium continuar_js">CONTINUAR</a>
                    </div>
                </div>
            </div>
            <?php
        }
        ?>


        <div class="top">
            <a href="inicio" class="logo btn_animate_js logo_js">
                <h1>
                    <img src="assets/icons/logo_renta2x.png" width="190" alt="Declara renta 2014" />
                </h1>
            </a>
            <div class="display-table">
                <div class="display-table-cell align_left">
                    <a href="inicio" class="display-inline logo_sunat btn_animate_js" title="SUNAT"> 
                        <img src="assets/icons/logo2x.png" class="display-inline logo_sunat_desktop" width="164" alt="SUNAT" />
                        <img src="assets/icons/logo_sunat_mobile2x.png" class="display-inline logo_sunat_mobile" width="40" alt="SUNAT" />
                    </a>
                </div>
                <div class="display-table-cell align_right">

                    <div class="nav_top right">
                        <ul>
                            <li>
                                <span class="phone btn_nav ">
                                    <span class="helper"></span><!--
                                    --><span class="display-inline w_txt">
                                        <span class="ico align_left"><i class="icon-phone2" style="color:#000"></i></span>
                                        <span class="txt" style="text-align:center;">
                                            <!--<span class="small">Ayuda telefónica</span>-->
                                            <span class="big">0-801-12-100</span>
                                            <span class="txt">Celular: 315-0730</span>
                                        </span>
                                    </span>
                                </span>
                            </li>
                            <li>
                                <a href="herramientas-y-simuladores" data-href="herramientas-y-simuladores" class="tools btn_nav btn_nav_a align_center btn_animate_js">
                                    <span class="helper"></span><!--
                                    --><span class="display-inline">
                                        <span class="ico"><i class="icon-tools2"></i></span><br />
                                        <span class="txt">Herramientas y simuladores</span>
                                    </span>
                                </a>
                            </li>
                            <li>
                                <a href="preguntas-y-normas" data-href="preguntas-y-normas" class="questions btn_nav btn_nav_a align_center btn_animate_js">
                                    <span class="helper"></span><!--
                                    --><span class="display-inline">
                                        <span class="icon"><i class="icon-preguntas"></i></span><br />
                                        <span class="txt">Preguntas y normas</span>
                                    </span>
                                </a>
                            </li>
                        </ul>     
                    </div>
                    <a href="javascript:void(0);" class="align_center btn_mobile btn_mobile_js">
                        <span class="helper"></span><!--
                        --><i class="icon-menu display-inline"></i><i class="icon-cross2 display-inline"></i>
                    </a>
                    <div class="clearfix"></div>
                </div>
            </div>
        </div>
        <div class="w_submenu w_submenu_js">
            <div class="container">
                <div class="submenu submenu_blue submenu_js right">
                    <div class="helper"></div><!--
                    --><div class="w_submenu_link display-inline">
                        <div class="helper"></div><!--
                        --><div class="w_submenu_link_inner w_submenu_link_inner_js display-inline">
                            <a href="javascript:void(0);" class="submenu_link submenu_link_js submenu_link_blue display-inline"><i class="icon-keyboard-arrow-up display-inline"></i><i class="icon-keyboard-arrow-down display-inline"></i><span class="display-inline txt"></span></a>
                            <ul class="submenu_opciones_js">

                            </ul>
                        </div>
                    </div><!--
                    --><p class="display-inline"><span class="display-inline div">/</span><span class="currentTitle current_title_js"></span></p>

                    <div class="w_loading_panel w_loading_panel_js">
                        <img src="assets/icons/puff_black.svg" alt="" class="svg_loading_init loading_init loading_panel_js" />
                    </div>
                </div>
                <div class="clearfix"></div>
            </div>
        </div>
        <div class="w_panel_lft w_panel_lft_js">
            <div class="panel_lft panel display-inline wrapper_panel_js wrapper_panel_left_js">
                <div class="panel_inner panel_animate panel_home panel_blue align_center panel_animate_js">
                    <div class="helper"></div><!--
                    --><div class="panel_content display-inline">
                        <img src="assets/icons/ico_naturales2x.png" class="img" width="347" alt="Guía para personal naturales" />
                        <h2>Guía para personas naturales</h2>
                        <div class="txt">
                            <p>Obtén información sobre cómo realizar, recopilar y declarar correctamente tus impuestos a la renta.</p>
                            <a href="guia-para-personas-naturales" class="btn btn_white btn_white_blue btn_animate btn_animate_js" >CONTINUAR</a>
                        </div>
                    </div>
                </div>   
            </div>
        </div>
        <div class="wrapper">
            <div class="content">
                <div class="panel_rgt panel display-inline align_center wrapper_panel_js wrapper_panel_right_js right">



                    <div class="panel_inner panel_animate panel_home panel_green panel_animate_js">
                        <div class="helper"></div><!--
                        --><div class="panel_content display-inline">
                            <img src="assets/icons/ico_empresas2x.png" class="img" width="347" alt="Guía para negocios y empresas" />
                            <h2>Guía para empresas y negocios</h2>
                            <div class="txt">
                                <p>Informate sobre las obligaciones para personas jurídicas y actividades empresariales de tercera categoría.</p>
                                <a href="guia-para-empresas-y-negocios" class="btn btn_white btn_white_green btn_animate btn_animate_js"  >CONTINUAR</a>
                            </div>
                        </div>
                    </div>   
                </div>
                <div class="clearfix"></div>
            </div>
        </div>
        <footer>
            <div class="helper"></div><!--
            --><div class="footer_bars display-inline">
                <p class="lft left desktop">Superintendencia Nacional de Aduanas y de Administración Tributaria</p>
                <p class="lft left movil">SUNAT</p>
                <div class="clearfix"></div>
                <div class="w_footer_blue display-inline left">
                    <div class="footer_blue">
                        <div class="tri"></div>
                        <div class="bar"></div>
                    </div>
                </div>
                <div class="w_footer_red display-inline right">
                    <div class="footer_red ">
                        <div class="bar"></div>
                        <div class="tri"></div>
                    </div>
                </div>
                <div class="clearfix"></div>
                <p class="lft right"><a href="http://www.sunat.gob.pe/" title="SUNAT" target="_blank">www.sunat.gob.pe</a></p>
                <div class="clearfix"></div>
            </div>
        </footer>
        <div class="redes_sociales">
            <ul>
                <li class="siguenos">Síguenos:</li>
                <li><a href="http://facebook.com" target="_blank" class="f"><i class="icon-facebook"></i></a></li>
                <!--<li><a href="http://twitter.com"  target="_blank" class="t"><i class="icon-twitter"></i></a></li>-->
                <li><a href="http://youtube.com" target="_blank" class="y"><i class="icon-youtube3"></i></a></li>
            </ul>
        </div>
        <div class="w_popup align_center">
            <div class="w_loading_init">
                <img src="assets/icons/ajax-loader-white.gif" alt="" class="gif_loading_init loading_popup loading_popup_js" />
                <img src="assets/icons/puff_white.svg" alt="" class="svg_loading_init loading_popup loading_popup_js " />
            </div>
            <a href="" class="btn_animate_js btn_close_popup btn_close_popup_js align_center">
                <div class="helper"></div><!--
                --><div class="display-inline">
                    <i class="icon-cross2 display-inline"></i> <br />
                    cerrar
                </div>       
            </a>
            <div class="helper"></div><!--
            --><div class="popup display-inline">
                <div class="popup_inner popup_inner_js">
                    <!--ajax popup-->
                </div>
            </div>
        </div>

        <script type="text/javascript" src="assets/js/modernizr.custom.79502.js"></script>
        <script src="assets/js/jquery-1.11.0.min.js"></script>
        <script type="text/javascript" src="assets/js/TweenMax.min.js"></script>
        <script type="text/javascript" src="assets/js/jquery.gsap.min.js"></script>

        <script type="text/javascript">
            var GET = "<?php echo (isset($_GET['p']) && $_GET['p'] != '') ? $_GET['p'] : "inicio"; ?>";
        </script>
        <script src="assets/js/pages.js"></script>
        <script src="assets/js/scripts.js"></script>

    </body>

</html>