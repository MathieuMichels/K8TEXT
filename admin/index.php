<?php
session_start();

require_once '../assets/php/config.php';

$CONNECTED = $_SESSION['CONNECTED'];


if ($CONNECTED !== true) {
    if (!(isset($_POST['username']) && $_POST['username'] === ADMIN_USERNAME && isset($_POST['password']) && $_POST['password'] === ADMIN_PASSWORD)) {
        echo '<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
<link rel="icon" href="https://k8strax.be/wp-content/uploads/2024/08/cropped-Favicon-k8-1-32x32.png" sizes="32x32" />
<link rel="icon" href="https://k8strax.be/wp-content/uploads/2024/08/cropped-Favicon-k8-1-192x192.png" sizes="192x192" />
<link rel="apple-touch-icon" href="https://k8strax.be/wp-content/uploads/2024/08/cropped-Favicon-k8-1-180x180.png" />
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Admin pannel - Login - K8TEXT</title>
    <link href="../assets/css/style.css" rel="stylesheet">
</head>
<body>
<link href="../assets/css/style.css" rel="stylesheet">
<header>
    <img src="https://k8strax.be/wp-content/uploads/2024/08/k8.svg">
</header>
<form method="post" action="index.php" style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh;">
                    <input type="text" name="username" placeholder="username">
                    <input type="password" name="password" placeholder="password">
                    <button type="submit">Login</button>
                </form>
                </body>
                ';
        $_SESSION['CONNECTED'] = false;
        exit();
    } else {
        $_SESSION['CONNECTED'] = true;
    }
}


?>


<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Admin pannel - K8TEXT</title>
    <link href="../assets/css/style.css" rel="stylesheet">
    <link rel="icon" href="https://k8strax.be/wp-content/uploads/2024/08/cropped-Favicon-k8-1-32x32.png" sizes="32x32" />
    <link rel="icon" href="https://k8strax.be/wp-content/uploads/2024/08/cropped-Favicon-k8-1-192x192.png" sizes="192x192" />
    <link rel="apple-touch-icon" href="https://k8strax.be/wp-content/uploads/2024/08/cropped-Favicon-k8-1-180x180.png" />

</head>
<body>
<header>
    <img src="https://k8strax.be/wp-content/uploads/2024/08/k8.svg">
    <h1>Admin page</h1>
</header>
<div class="sendAnnonce">
<div class="adminLabel">Poster une annonce</div>
    <textarea name="message" id="textarea" placeholder="Message" style="width: 100%;height: 150px; margin: 0"></textarea>
    <button type="submit" id="sendAnnonce"class="adminLabel">Envoyer l'annonce !</button>
    <div class="response"></div>
</div>

<div class="popup">
    <div class="messageInfo">Voilà à quoi va ressembler ton message: </div>
    <div class="message"></div>
    <div class="action">
        <button class="send">Envoyer le message à tout le monde !</button>
        <button class="cancel">Annuler</button>
    </div>
</div>


<div id="messageList">

</div>

<div class="lastUpdated"></div>


</body>
</html>
<script src="../assets/js/settings.js"></script>
<script><?php require_once '../assets/php/config.php'; echo 'const MESSAGES_FILE = "../assets/messages/' . MESSAGES_FILE . '"'; ?></script>
<script src="../assets/js/admin.js"></script>




