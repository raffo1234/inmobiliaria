<?php
session_start();

/* (1) DATOS RECIBIDOS */

/* GET */

if ($_GET['u'] && $_GET['u'] != "") {
    $u = $_GET['u'];
}
if ($_GET['service_tier'] && $_GET['service_tier'] != "") {
    $service_tier = $_GET['service_tier'];
}
if ($_GET['service'] && $_GET['service'] != "") {
    $service = $_GET['service'];
}
if ($_GET['portal_redirect'] && $_GET['portal_redirect'] != "") {
    $portal_redirect = $_GET['portal_redirect'];
}
if ($_GET['out_of_credit'] && $_GET['out_of_credit'] != "") {
    $out_of_credit = $_GET['out_of_credit'];
}
if ($_GET['url'] && $_GET['url'] != "") {
    $url = $_GET['url'];
}
if ($_GET['ms_ipaddress'] && $_GET['ms_ipaddress'] != "") {
    $ms_ipaddress = $_GET['ms_ipaddress'];
}
if ($_GET['url_timestamp'] && $_GET['url_timestamp'] != "") {
    $url_timestamp = $_GET['url_timestamp'];
}


/* POST */

if (isset($_POST['user_agent']) && $_POST['user_agent'] != "") {
    $user_agent = $_POST['user_agent'];
}


/* (2) CONSULTA AL SERVIDOR */

$ch = curl_init();
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_URL, 'http://10.10.162.54:9999/customer_service_data?phoneno=51975401942&servicename=Tarifa_Diaria_blacklist&username=web');
$content = curl_exec($ch);

if($content == false){
    echo "false";
}else{
    echo "true";
}
?>


<!doctype html>
<html lang="es">
    <head>
        <title>Movistar</title>

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

        <link rel="stylesheet" href="assets/css/styles.css">

        <link rel="shortcut icon" href="assets/icons/favicon.ico" type="image/x-icon">
        <link rel="icon" href="assets/icons/favicon.ico" type="image/x-icon">

        <!--[if lt IE 9]>
                <script src="assecontainer ciudadests/js/html5shiv.js"></script>
                <script src="assets/js/respond.min.js"></script>
        <![endif]-->	
    </head>

    <body>
        <div class="wrapper wrapper_js">
            <div class="top top_js align_left">
                <div class="container">
                    <img src="assets/images/logo.png" width="177" alt="Movistar" />    
                </div>
            </div>
            <div class="content content_js align_center">
                <div class="helper"></div>
                <div class="content_inner display-inline">
                    <img src="assets/images/image_1.png" class="image_1" width="140" alt="" />
                    <p class="color_azul"><strong>Ya no cuentas con MB  <br />
                            para navegar en Internet</strong></p>
                    <div class="mensaje">
                        <div class="mensaje_inner">
                            <p>Compra una promoción y continúa disfrutando de WhatsApp, Facebook, Google y mucho más!</p>
                        </div>
                        <div class="mensaje_shadow">
                            <img src="assets/icons/mensaje_shadow.png" alt="" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="botones botones_js">
                <div class="container container_tarifas_js">
                    <div class="row">

                        <div class="datos">
                            <div class="megas">
                                <div class="helper"></div>
                                <div class="display-inline">
                                    <p>10<br /> <span>MB</span></p>
                                </div>
                            </div>
                            <div class="display-inline tarifa_precio">
                                <div class="display-table ">
                                    <div class="display-table-cell">
                                        <div class="tarifa display-inline align_left">
                                            <p>Tarifa <br /><span>Diaria</span></p>
                                        </div>
                                    </div>
                                    <div class="display-table-cell align_right">
                                        <div class="precio display-inline">
                                            <p>s/.<span>1</span> </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="check check_js">
                            <div class="ico">
                                <div class="helper"></div>
                                <img src="assets/icons/check.png" alt="" class="display-inline" />
                            </div>
                            <div class="txt">
                                <div class="helper"></div>
                                <div class="display-inline">
                                    <p>COMPRAR</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="datos">
                            <div class="megas">
                                <div class="helper"></div>
                                <div class="display-inline">
                                    <p>25<br /> <span>MB</span></p>
                                </div>
                            </div>
                            <div class="display-inline tarifa_precio">
                                <div class="display-table ">
                                    <div class="display-table-cell">
                                        <div class="tarifa display-inline align_left">
                                            <p>Internet <br /><span>1 semana</span></p>
                                        </div>
                                    </div>
                                    <div class="display-table-cell align_right">
                                        <div class="precio display-inline">
                                            <p>s/.<span>3</span> </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div class="check check_js">
                            <div class="ico">
                                <div class="helper"></div>
                                <img src="assets/icons/check.png" alt="" class="display-inline" />
                            </div>
                            <div class="txt">
                                <div class="helper"></div>
                                <div class="display-inline">
                                    <p>COMPRAR</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="datos">
                            <div class="megas">
                                <div class="helper"></div>
                                <div class="display-inline">
                                    <p>75<br /> <span>MB</span></p>
                                </div>
                            </div>
                            <div class="display-inline tarifa_precio">
                                <div class="display-table ">
                                    <div class="display-table-cell">
                                        <div class="tarifa display-inline align_left">
                                            <p>Internet <br /><span>1 semana</span></p>
                                        </div>
                                    </div>
                                    <div class="display-table-cell align_right">
                                        <div class="precio display-inline">
                                            <p>s/.<span>5</span> </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div class="check check_js">
                            <div class="ico">
                                <div class="helper"></div>
                                <img src="assets/icons/check.png" alt="" class="display-inline" />
                            </div>
                            <div class="txt">
                                <div class="helper"></div>
                                <div class="display-inline">
                                    <p>COMPRAR</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="ocultos ocultos_js">
                        <div class="row">
                            <div class="datos">
                                <div class="megas">
                                    <div class="helper"></div>
                                    <div class="display-inline">
                                        <p>75<br /> <span>MB</span></p>
                                    </div>
                                </div>
                                <div class="display-inline tarifa_precio">
                                    <div class="display-table ">
                                        <div class="display-table-cell">
                                            <div class="tarifa display-inline align_left">
                                                <p>Internet <br /><span>1 semana</span></p>
                                            </div>
                                        </div>
                                        <div class="display-table-cell align_right">
                                            <div class="precio display-inline">
                                                <p>s/.<span>5</span> </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div class="check check_js">
                                <div class="ico">
                                    <div class="helper"></div>
                                    <img src="assets/icons/check.png" alt="" class="display-inline" />
                                </div>
                                <div class="txt">
                                    <div class="helper"></div>
                                    <div class="display-inline">
                                        <p>COMPRAR</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="datos">
                                <div class="megas">
                                    <div class="helper"></div>
                                    <div class="display-inline">
                                        <p>75<br /> <span>MB</span></p>
                                    </div>
                                </div>
                                <div class="display-inline tarifa_precio">
                                    <div class="display-table ">
                                        <div class="display-table-cell">
                                            <div class="tarifa display-inline align_left">
                                                <p>Internet <br /><span>1 semana</span></p>
                                            </div>
                                        </div>
                                        <div class="display-table-cell align_right">
                                            <div class="precio display-inline">
                                                <p>s/.<span>5</span> </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div class="check check_js">
                                <div class="ico">
                                    <div class="helper"></div>
                                    <img src="assets/icons/check.png" alt="" class="display-inline" />
                                </div>
                                <div class="txt">
                                    <div class="helper"></div>
                                    <div class="display-inline">
                                        <p>COMPRAR</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="datos">
                                <div class="megas">
                                    <div class="helper"></div>
                                    <div class="display-inline">
                                        <p>75<br /> <span>MB</span></p>
                                    </div>
                                </div>
                                <div class="display-inline tarifa_precio">
                                    <div class="display-table ">
                                        <div class="display-table-cell">
                                            <div class="tarifa display-inline align_left">
                                                <p>Internet <br /><span>1 semana</span></p>
                                            </div>
                                        </div>
                                        <div class="display-table-cell align_right">
                                            <div class="precio display-inline">
                                                <p>s/.<span>5</span> </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div class="check check_js">
                                <div class="ico">
                                    <div class="helper"></div>
                                    <img src="assets/icons/check.png" alt="" class="display-inline" />
                                </div>
                                <div class="txt">
                                    <div class="helper"></div>
                                    <div class="display-inline">
                                        <p>COMPRAR</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row datos">
                        <a href="#" class="mas mas_js transition">Ver más&nbsp;&nbsp;<img src="assets/icons/arrow_down.png" class="display-inline" alt="" /></a>
                    </div>
                </div>

            </div>
        </div>

        <!-- PLUGINS JQUERY -->

        <script src="assets/js/jquery-1.11.0.min.js"></script>
        <script src="assets/js/TweenMax.min.js"></script>
        <script src="assets/js/jquery.gsap.min.js"></script>

        <!-- FUNCTIONS -->
        <script src="assets/js/scripts.js"></script>

    </body>

</html>