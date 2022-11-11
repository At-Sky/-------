<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require '/task/PHPMailer-master/src/Exception.php';
    require '/task/PHPMailer-master/src/PHPMailer.php';

    $mail = new PHPMailer(true);
    $mail->CharSet = 'UTF-8';
    $mail->setLanguage('ru', 'PHPMailer-master/language');
    $mail->IsHTML(true);

    $mail->setFrom('klavdiy.tracevsky@gmail.com', 'Ваш заказ');

    $mail->addAddress('klavdiy.tracevsky@gmail.com');

    $mail->Subject = 'Ваш заказ'

    $name = $_POST['name'];
    $body = '<h1>Добрый день, скоро с вами свяжeтся наш менеджер</h1>';

    if (trim(!empty($_POST['name']))){
        $body.='<p><strong>Имя:</strong> '.$_POST['name'].'</p>';
    }

    if (trim(!empty($_POST['phone']))){
        $body.='<p><strong>Телефон:</strong> '.$_POST['phone'].'</p>';
    }

    if (trim(!empty($_POST['email']))){
        $body.='<p><strong>Почта:</strong> '.$_POST['email'].'</p>';
    }


    $mail->Body = $body;

    if (!$mail->send()) {
        $message = 'Ошибка';
    } else {
        $message = 'Данные отправлены';
    }

    $response = ['message' => $messages];

    header('Content-type: application/json');
    echo json_encode($response)
?>