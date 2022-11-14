<?php

    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require "PHPMailer/src/Exception.php";
    require "PHPMailer/src/PHPMailer.php";

    $mail = new PHPMailer(true);
	
    $mail->CharSet = "UTF-8";
    $mail->IsHTML(true);

    $name = $_POST["name"];
    $email = $_POST["email"];
	$phone = $_POST["phone"];

    $jsonText = $_POST["cart"];
    $myArray = json_decode($jsonText, true);

    
    $prod = '';

    foreach ($myArray as $key => $value) {
            $title = $value["title"];
            $price = $value["price"];
            $image = $value["image"];
            $id = $value["id"];
            $amount = $value["amount"];
            $prod .= "
                    <br/>
                        <p><strong>Фото:</strong> $image</p>
                        <p><strong>Название:</strong> $title</p>
                        <p><strong>Цена:</strong> $$price</p>
                        <p><strong>Артикул:</strong> $id</p>
                        <p><strong>Кол-во:</strong> $amount</p>
                    <br/>
                ";
    }

    $body = "
        <h3>Данные с формы обратной связи</h3>
        <p>Имя: $name</p>
        <p>Email: $email</p>
        <p>Телефон: $phone</p>
        <h3>Ваш заказ:</h3>
    ";
    
    $body .= $prod;

    $mail->addAddress($email);
    $mail->addAddress("cy37165@rudfield.ru");
	$mail->setFrom("cy37165@rudfield.ru");
    $mail->Subject = "Подтверждение заказа";
    $mail->MsgHTML($body);

    if (!$mail->send()) {
        $message = "Ошибка отправки";
    } else {
        $message = "Данные отправлены!";
    }
	
	$response = ["message" => $message];

    header('Content-type: application/json');
    echo json_encode($response);
?>