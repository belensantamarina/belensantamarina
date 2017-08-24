<?php

  if ($_POST) {
    $to_email = 'amoritan@me.com';

    $name = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $message = filter_var($_POST['message'], FILTER_SANITIZE_STRING);

    if (strlen($name) < 3 || !filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($message) < 5) {
      $response_code = 403;
    } else {
      $headers = 'From: '.$name.'' . '\r\n' . 'Reply-To: '.$email.'' . '\r\n' . 'X-Mailer: PHP/' . phpversion();
      
      $send_mail = mail($to_email, 'Contacto a través del sitio web', $message, $headers);
        
      if ($send_mail) {
        $response_code = 201;
      } else {
        $response_code = 501;
      }
    }
  } else {
    $response_code = 405;
  }

  http_response_code($response_code);
  exit();

?>