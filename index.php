<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>K8TEXT</title>
    <link href="assets/css/style.css" rel="stylesheet">
    <link rel="icon" href="https://k8strax.be/wp-content/uploads/2024/08/cropped-Favicon-k8-1-32x32.png" sizes="32x32" />
    <link rel="icon" href="https://k8strax.be/wp-content/uploads/2024/08/cropped-Favicon-k8-1-192x192.png" sizes="192x192" />
    <link rel="apple-touch-icon" href="https://k8strax.be/wp-content/uploads/2024/08/cropped-Favicon-k8-1-180x180.png" />

</head>
<body>
<header>
    <img src="https://k8strax.be/wp-content/uploads/2024/08/k8.svg">
    <h1>K8TEXT</h1>

</header>

<main>
    <form action="assets/php/store.php" method="post">
        <input type="text" name="username" placeholder="Totem" maxlength="30">
        <input type="text" name="dest" placeholder="Vers qui?" maxlength="30">
        <textarea name="message" id="textarea" placeholder="Message" minlength="2" maxlength="500"></textarea>
        <button type="submit">Partager ton message !</button>
        <div class="response"></div>
    </form>
    <div class="emoji-container">
        <div id="emoji-list">
        </div>
    </div>
</main>



<div class="popup">
    <div class="messageInfo">Voilà à quoi va ressembler ton message: </div>
    <div class="message"></div>
    <div class="action">
        <button class="send">Envoyer le message à tout le monde !</button>
        <button class="cancel">Annuler</button>
    </div>
</div>
</body>
</html>
<script src="assets/js/settings.js"></script>
<script src="assets/js/index.js"></script>