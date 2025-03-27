<?php

header("Content-Type: application/json", true);
header('Access-Control-Allow-Origin: *');

$arr = array(
    "compra" => array(
        "id" => 123,
        "title" => "Nombre de la categoía",
        "price" => "23.00",
        "date" => "10/05/05",
        "status" => "Entregado",
        "type" => "Paypal",
        "total" => "600.00"
    ),
    "productos" => array(
        array(
            "id" => 1, "url" => "descripcion.html", "title" => "Nombre á del producto", "img" => "assets/images/compra.jpg", "price" => "10.00"
        ), array(
            "id" => 2, "url" => "descripcion.html", "title" => "Nombre del producto", "img" => "assets/images/compra.jpg", "price" => "12000.00"
        ), array(
            "id" => 3, "url" => "descripcion.html", "title" => "Nombre del producto", "img" => "assets/images/compra.jpg", "price" => "12000.00"
        ), array(
            "id" => 4, "url" => "descripcion.html", "title" => "Nombre del producto", "img" => "assets/images/compra.jpg", "price" => "12000.00"
        ), array(
            "id" => 5, "url" => "descripcion.html", "title" => "Nombre del producto", "img" => "assets/images/compra.jpg", "price" => "12000.00"
        )
    )
);

echo (json_encode($arr));
