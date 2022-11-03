<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/back.css">
    <title>Document</title>
</head>
<body>
<?php
$name = $_POST['name1'];
$email = $_POST['email1'];
$review = $_POST['review1'];
$url = $_POST['url1'];

$name = htmlspecialchars($name);
$email = htmlspecialchars($email);
$review = htmlspecialchars($review);
$url = htmlspecialchars($url);

$name = urldecode($name);
$email = urldecode($email);
$review = urldecode($review);
$url = urldecode($url);

$name = trim($name);
$email = trim($email);
$review = trim($review);
$url = trim($url);

$message = "Имя: $name" . ' ' . "Почта: $email" . ' ' . "Отзыв: $review";
//echo $name;
//echo "<br>";
//echo $email;
mail("klavdiy.tracevsky@gmail.com", "Заявка с сайта", $message, "From: cy37165@rudfield.ru \r\n");
?>
    <div class="link_container">
        <h1 class="link_title">Ваш отзыв отправлен</h1>
        <a class="link" href="<?php echo($url) ?>">
            Вернуться назад
        </a>
    </div>
</body>
</html>