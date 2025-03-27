<?php

header("Content-Type: application/json", true);
header('Access-Control-Allow-Origin: *');

$arr = array(
    "categoria" => array(
        "id" => 123,
        "url" => "galeria.html",
        "img" => "assets/images/cat_prev.jpg",
        "title" => "Nombre de la categoía"
    ),
    "productos" => array(
        array(
            "id" => 1, "url" => "descripcion.html", "title" => "Nombre á del producto con más texto.", "img" => "assets/images/subcat_1.jpg", "price" => "10.00"
        ), array(
            "id" => 2, "url" => "descripcion.html", "title" => "Nombre del producto", "img" => "assets/images/subcat_2.jpg", "price" => "12000.00"
        ), array(
            "id" => 3, "url" => "descripcion.html", "title" => "Nombre del producto", "img" => "assets/images/subcat_3.jpg", "price" => "12000.00"
        ), array(
            "id" => 4, "url" => "descripcion.html", "title" => "Nombre del producto", "img" => "assets/images/subcat_4.jpg", "price" => "12000.00"
        ), array(
            "id" => 5, "url" => "descripcion.html", "title" => "Nombre del producto", "img" => "assets/images/subcat_5.jpg", "price" => "12000.00"
        ), array(
            "id" => 6, "url" => "descripcion.html", "title" => "Nombre del producto", "img" => "assets/images/subcat_1.jpg", "price" => "12000.00"
        ), array(
            "id" => 7, "url" => "descripcion.html", "title" => "Nombre del producto", "img" => "assets/images/subcat_2.jpg", "price" => "12000.00"
        ), array(
            "id" => 8, "url" => "descripcion.html", "title" => "Nombre del producto", "img" => "assets/images/subcat_3.jpg", "price" => "12000.00"
        ), array(
            "id" => 9, "url" => "descripcion.html", "title" => "Nombre del producto", "img" => "assets/images/subcat_4.jpg", "price" => "12000.00"
        ), array(
            "id" => 10, "url" => "descripcion.html", "title" => "Nombre del producto", "img" => "assets/images/subcat_5.jpg", "price" => "12000.00"
        ), array(
            "id" => 11, "url" => "descripcion.html", "title" => "Nombre del producto", "img" => "assets/images/subcat_1.jpg", "price" => "12000.00"
        ), array(
            "id" => 12, "url" => "descripcion.html", "title" => "Nombre del producto", "img" => "assets/images/subcat_2.jpg", "price" => "12000.00"
        ), array(
            "id" => 13, "url" => "descripcion.html", "title" => "Nombre del producto", "img" => "assets/images/subcat_3.jpg", "price" => "12000.00"
        ), array(
            "id" => 14, "url" => "descripcion.html", "title" => "Nombre del producto", "img" => "assets/images/subcat_4.jpg", "price" => "12000.00"
        )
    )
);

echo (json_encode($arr));
