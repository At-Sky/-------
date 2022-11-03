<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/Styles/back.css">
    <title>Document</title>
</head>
<body>
<?php
$name = $_POST['Имя'];
$email = $_POST['Email'];
$phone = $_POST['Телефон'];
$url = $_POST['url1'];

$jsonText = $_POST['Товары'];
$myArray = json_decode($jsonText, true);

$prod = '';

foreach ($myArray as $key => $value) {
	    $title = $value["item"]["name"];
	    $price = $value["item"]["price"];
		$id = $value["item"]["id"];
		$amount = $value["amount"];
	    $prod .= "
				Название: $title
				Цена: $price
				Артикул: $id
				Кол-во: $amount
				\r\n
			";
    }


$name = htmlspecialchars($name);
$email = htmlspecialchars($email);
$phone = htmlspecialchars($phone);
$url = htmlspecialchars($url);


$name = urldecode($name);
$email = urldecode($email);
$phone = urldecode($phone);
$url = htmlspecialchars($url);


$name = trim($name);
$email = trim($email);
$phone = trim($phone);
$url = htmlspecialchars($url);

$message = "Имя: $name" . '   ' . "Почта: $email" . '   ' . "Телефон: $phone" . ' ' . "\r\nЗаказ: $prod";


mail("klavdiy.tracevsky@gmail.com", "Заявка с сайта", $message, "From: cy37165@rudfield.ru \r\n");
?>
    <div class="link_container">
        <h1 class="link_title">Спасибо за заказ</h1>
        <a class="link" href="<?php echo($url) ?>">
            Вернуться назад
        </a>
    </div>
</body>
</html>