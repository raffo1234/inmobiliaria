<?php

header("Content-Type: application/json", true);
header('Access-Control-Allow-Origin: *');

$arr = array(
    "populares" => array(
        array(
            "id" => 1, "url" => "descripcion.html", "title" => "Nombre á del producto", "img" => "assets/images/resultado_ico.png", "price" => "10.00"
        ), array(
            "id" => 2, "url" => "descripcion.html", "title" => "Nombre del producto", "img" => "assets/images/resultado_ico.png", "price" => "12000.00"
        )
    ),
    "vistos" => array(
        array(
            "id" => 3, "url" => "descripcion.html", "title" => "Nombre del producto", "img" => "assets/images/resultado_ico.png", "price" => "130.00"
        ), array(
            "id" => 4, "url" => "descripcion.html", "title" => "Nombre del producto", "img" => "assets/images/resultado_ico.png", "price" => "140.00"
        )
    ),
    "comprados" => array(
        array(
            "id" => 5,"url" => "descripcion.html", "title" => "Nombre del producto, con más texto .. lorem ipsum.", "img" => "assets/images/resultado_ico.png", "price" => "150.00"
        ), array(
            "id" => 6,"url" => "descripcion.html", "title" => "Nombre del producto", "img" => "assets/images/resultado_ico.png", "price" => "160.00"
        ),
        array(
            "id" => 7,"url" => "descripcion.html", "title" => "Nombre del producto", "img" => "assets/images/resultado_ico.png", "price" => "170.00"
        ), array(
            "id" => 8,"url" => "descripcion.html", "title" => "Nombre del producto", "img" => "assets/images/resultado_ico.png", "price" => "180.00"
        )
    )
);

echo (json_encode($arr));
