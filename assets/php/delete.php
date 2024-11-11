<?php
require_once 'config.php';
// get all messages
$messages = json_decode(file_get_contents('../messages/' . MESSAGES_FILE), true);
// delete message
foreach ($messages as $key => $message) {
    if ($message['id'] == $_POST['id']) {
        unset($messages[$key]);
    }
}

$messages = array_values($messages);
// save all messages
file_put_contents('../messages/' . MESSAGES_FILE, json_encode($messages));
?>
