<?php

if (!empty($_POST)) {

    $name = trim($_POST['nombre']);
    $email = $_POST['correo'];
    $phone = $_POST['telefono'];
    $message = "";
    
    /* MENSAJE PARA EL ADMIN */
    $message .= "<table>";
    $message .= "<tr><td colspan='2'>Si Ud. no es administrador de Elix, ingone los siguientes datos: <br /></td></tr>";
    $message .= "<tr><td>Nombre: </td><td>" . $name . "</td></tr>";
    $message .= "<tr><td>Email: </td><td>" . $email . "</td></tr>";
    $message .= "<tr><td>Teléfono: </td><td>" . $phone . "</td></tr>";
    $message .= "<tr><td>Mensaje: </td><td>" . $_POST['mensaje'] . "</td></tr>";
    $message .= "</table>";
    
    /* MENSAJE PARA EL CLIENTE */
    $message_c .= "<table>";
    $message_c .= "<tr><td colspan='2'>Hola: " . $name . " <br /><br />Estos son los datos enviados: </td></tr>";
    $message_c .= "<tr><td>Nombre: </td><td>" . $name . "</td></tr>";
    $message_c .= "<tr><td>Email: </td><td>" . $email . "</td></tr>";
    $message_c .= "<tr><td>Teléfono: </td><td>" . $phone . "</td></tr>";
    $message_c .= "<tr><td>Mensaje: </td><td>" . $_POST['mensaje'] . "</td></tr>";
    $message_c .= "<tr><td colspan='2'><br /><br /><br /> Nos pondremos en contacto con Ud.<br /></td></tr>";
    $message_c .= "<tr><td colspan='2'><br /><br />Atte. Elix</td></tr>";
    $message_c .= "</table>";

    $site_owners_email = 'rhmcord@gmail.com'; // Replace this with your own email address
    $site_owners_name = 'ELIX'; // Replace with your name

    try {
        require_once('inc/PHPMailer/class.phpmailer.php');
        
        /* MAIL PARA EL ADMIN */
        $mail = new PHPMailer();
        $mail->CharSet = 'UTF-8';
        $mail->From = $email;
        $mail->FromName = $name;
        $mail->Subject = "[ELIX] - Formuario de contacto";
        $mail->AddAddress($site_owners_email, $site_owners_name); //DATOS DEL PROPIETARIO
        $mail->Body = $message;
        $mail->IsHTML(true);
        $mail->SMTPAuth = false;
        if ($mail->Send()) {
            echo "true";
        } else {
            echo "Error enviando: " . $mail->ErrorInfo;
        }
        
        /* EMAIL PARA EL CLIENTE */
        $mail_c = new PHPMailer();
        $mail_c->CharSet = 'UTF-8';
        $mail_c->From = $site_owners_email;
        $mail_c->FromName = $site_owners_name;
        $mail_c->Subject = "[ELIX] - Formuario de contacto";
        $mail_c->AddAddress($email, $name); //DATOS DEL CLIENTE
        $mail_c->Body = $message_c;
        $mail_c->IsHTML(true);
        $mail_c->SMTPAuth = false;
        if ($mail_c->Send()) {
            echo "true";
        } else {
            echo "Error enviando: " . $mail_c->ErrorInfo;
        }
        
    } catch (Exception $e) {
        echo $e;
    }
} else {
    echo "false";
}