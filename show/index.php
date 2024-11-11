<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>K8TEXT</title>
    <link href="../assets/css/style.css" rel="stylesheet">
    <link rel="icon" href="https://k8strax.be/wp-content/uploads/2024/08/cropped-Favicon-k8-1-32x32.png" sizes="32x32" />
    <link rel="icon" href="https://k8strax.be/wp-content/uploads/2024/08/cropped-Favicon-k8-1-192x192.png" sizes="192x192" />
    <link rel="apple-touch-icon" href="https://k8strax.be/wp-content/uploads/2024/08/cropped-Favicon-k8-1-180x180.png" />

</head>
<body>
<header>
    <img src="https://k8strax.be/wp-content/uploads/2024/08/k8.svg">
    <h1>K8TEXT</h1>
</header>
<!-- Modifier ci-dessous si on veut afficher quelque chose en particulier -->
<!--
<div class="link">Envoie ton message sur <a href="index.php">K8strax.be/message</a> !</div>
-->
    <div id="messageList"></div>
</body>
</html>
<script src="../assets/js/settings.js"></script>
<script><?php require_once '../assets/php/config.php'; echo 'const MESSAGES_FILE = "../assets/messages/' . MESSAGES_FILE . '"'; ?></script>
<script src="../assets/js/show.js"></script>

