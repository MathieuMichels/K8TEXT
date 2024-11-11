<?php
require_once 'config.php';

date_default_timezone_set(TIMEZONE);

session_start();
$CONNECTED = $_SESSION['CONNECTED'];
if($CONNECTED){
    if(isset($_POST['admin']) && $_POST['admin'] === 'true'){
        $ISADMIN = true;
    }else{
        $ISADMIN = false;
    }

}else {
    $ISADMIN = false;
}

$username = $_POST['username'];
$message = $_POST['message'];
$dest = $_POST['dest'];


function toxicity($content) {

    $data = [
        "comment" => ["text" => $content],
        "languages" => [LANGUAGES],
        "requestedAttributes" => ["TOXICITY" => new stdClass()]
    ];


    $ch = curl_init(API_URL);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));

    $response = curl_exec($ch);

    if (curl_errno($ch)) {
        echo 'Erreur cURL: ' . curl_error($ch);
    } else {
        $result = json_decode($response, true);
        if (isset($result['attributeScores']['TOXICITY']['summaryScore']['value'])) {
            $toxicityScore = $result['attributeScores']['TOXICITY']['summaryScore']['value'];
            return $toxicityScore;
        } else {
            echo "Erreur dans la réponse de l'API.";
            return 0;
        }
    }

    curl_close($ch);

    return 0;
}
if (AUTOMOD) {
    $toxicityScoreMessage = toxicity($message);
    $toxicityScoreUsername = toxicity($username);
    $toxicityScoreDest = toxicity($dest);
}
else {
    $toxicityScoreMessage = 0;
    $toxicityScoreUsername = 0;
    $toxicityScoreDest = 0;
}

if ($toxicityScoreMessage > TOXICITY_LEVEL || $toxicityScoreUsername > TOXICITY_LEVEL || $toxicityScoreDest > TOXICITY_LEVEL) {
    $rejected_messages = json_decode(file_get_contents('../messages/' . REJECTED_MESSAGES_FILE), true);
    $rejected_messages[] = [
        'username' => $username,
        'message' => $message,
        'dest' => $dest,
        'admin' => $ISADMIN,
        'date' => date('Y-m-d H:i:s'),
        'id' => uniqid()
    ];
    file_put_contents('../messages/' . REJECTED_MESSAGES_FILE, json_encode($rejected_messages));
}
else {

    $messages = json_decode(file_get_contents('../messages/' . MESSAGES_FILE), true);
    $messages_backup = json_decode(file_get_contents('../messages/' . MESSAGES_BACKUP_FILE), true);

    $messages[] = [
        'username' => $username,
        'message' => $message,
        'dest' => $dest,
        'admin' => $ISADMIN,
        'date' => date('Y-m-d H:i:s'),
        'id' => uniqid()
    ];

    $messages_backup[] = $messages[count($messages) - 1];


    if (count($messages) > MAXMESSAGES) {
        array_shift($messages);
    }

    file_put_contents('../messages/' . MESSAGES_FILE, json_encode($messages));
    file_put_contents('../messages/' . MESSAGES_BACKUP_FILE, json_encode($messages_backup));

}
?>