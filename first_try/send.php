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
$name = $_POST['name'];
$email = $_POST['email'];
$url = $_POST['url']; 

$name = htmlspecialchars($name);
$email = htmlspecialchars($email);
$url = htmlspecialchars($url);

$name = urldecode($name);
$email = urldecode($email);
$url = urldecode($url);

$name = trim($name);
$email = trim($email);
$url = trim($url);
//echo $name;
//echo "<br>";
//echo $email;
mail("klavdiy.tracevsky@gmail.com", "Заявка с сайта", "ФИО:".$name.". E-mail: ".$email ,"From: cy37165@rudfield.ru \r\n");
?>
    <div class="link_container">
        <h1 class="link_title">Ваша заявка отправлена</h1>
        <a class="link" href="<?php echo($url) ?>">
            Вернуться назад
        </a>
    </div>
</body>
</html>