function addOneMessage(message) {
    const messageDiv = document.querySelector('.message');
    const messageInfosDiv = document.createElement('div');
    messageInfosDiv.classList.add('messageInfos');
    const usernameDiv = document.createElement('div');
    usernameDiv.classList.add('username');
    usernameDiv.innerHTML = "Message de <div class='sender'>" + message.username + "</div> à <div class='dest'>" + message.dest + "</div>";
    const messageContentDiv = document.createElement('div');
    messageContentDiv.classList.add('messageContent');
    messageContentDiv.innerText = message.message;
    const messageDate = document.createElement('div');
    messageDate.classList.add('messageDate');
    const diffTime = new Date().getTime() - new Date(message.date).getTime();
    if (diffTime < 60000) {
        if (diffTime < 1000) {
            messageDate.innerText = 'Il y a moins d\'une seconde';
        } else {
            messageDate.innerText = 'Il y a ' + Math.floor(diffTime / 1000) + ' secondes';
        }
    } else if (diffTime < 3600000) {
        if (diffTime < 120000) {
            messageDate.innerText = 'Il y a ' + Math.floor(diffTime / 60000) + ' minute';
        } else {
            messageDate.innerText = 'Il y a ' + Math.floor(diffTime / 60000) + ' minutes';
        }
    } else if (diffTime < 86400000) {
        if (diffTime < 7200000) {
            messageDate.innerText = 'Il y a ' + Math.floor(diffTime / 3600000) + ' heure';
        } else {
            messageDate.innerText = 'Il y a ' + Math.floor(diffTime / 3600000) + ' heures';
        }
    } else {
        if (diffTime < 172800000) {
            messageDate.innerText = 'Il y a ' + Math.floor(diffTime / 86400000) + ' jour';
        } else {
            messageDate.innerText = 'Il y a ' + Math.floor(diffTime / 86400000) + ' jours';
        }
    }
    messageInfosDiv.appendChild(usernameDiv);
    messageInfosDiv.appendChild(messageDate);
    messageDiv.appendChild(messageInfosDiv);
    messageDiv.appendChild(messageContentDiv);
    // append before first child
}



function maxLenghtName(){
    var name = document.querySelector('input[name="username"]').value;
    if(name.length > 30){
        alert("Ton nom est trop long !");
        return false;
    }
    return true;
}

function maxLenghtMessage(){
    var message = document.querySelector('textarea[name="message"]').value;
    if(message.length > 500){
        alert("Ton message est trop long !");
        return false;
    }
    return true;
}

// date
lastTryToSend = new Date() - 10000;
// send a message (username, message) to the server store.php
document.querySelector('form').addEventListener('submit', function (e) {
    const responseDiv = document.querySelector('.response');
    const popup = document.querySelector('.popup');
    const message = document.querySelector('textarea[name="message"]').value;
    if (!message) {
        responseDiv.style.color = 'red';
        responseDiv.style.display = 'block';
        responseDiv.textContent = 'Entrez un message!';
        e.preventDefault();
        return;
    }
    // show popup and prevent form submission. Wait for user to confirm
    popup.style.display = 'block';
    const sendButton = popup.querySelector('.send');
    const cancelButton = popup.querySelector('.cancel');

    if(!maxLenghtName() || !maxLenghtMessage()){
        e.preventDefault();
        popup.style.display = 'none';
        return;
    }

    // prevent form submission
    e.preventDefault();
    // show aperçu du message


    const destinataire = document.querySelector('input[name="dest"]').value;
    const username = document.querySelector('input[name="username"]').value;
    addOneMessage({
        username: username,
        dest: destinataire,
        message: message,
        date: new Date().toISOString(),
        id: '123'
    });

    e.preventDefault();

    sendButton.addEventListener('click', function () {
        popup.style.display = 'none';
        popup.querySelector('.message').innerHTML = '';
        let username = document.querySelector('input[name="username"]').value;
        let message = document.querySelector('textarea[name="message"]').value;
        let destinataire = document.querySelector('input[name="dest"]').value;
        if (!message) {
            responseDiv.style.color = 'red';
            responseDiv.style.display = 'block';
            responseDiv.textContent = 'Entrez un message!';
            return;
        }
        if (new Date() - lastTryToSend < 10000) {
            responseDiv.style.color = 'red';
            responseDiv.style.display = 'block';
            responseDiv.textContent = 'Vous devez attendre 10 secondes avant d\'envoyer un autre message.';
            return;
        }
        lastTryToSend = new Date();
        fetch('assets/php/store.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'username=' + username + '&message=' + message + '&dest=' + destinataire
        }).then(function (response) {
            const responseDiv = document.querySelector('.response');
            if (response.ok) {
                responseDiv.style.color = 'green';
                responseDiv.style.display = 'block';
                responseDiv.textContent = 'Message sent!';
                // await 3 secondes and the hide the message and clear the textarea, username and dest
                setTimeout(function () {
                    responseDiv.style.display = 'none';
                    document.querySelector('input[name="username"]').value = '';
                    document.querySelector('input[name="dest"]').value = '';
                    document.querySelector('textarea[name="message"]').value = '';
                }, 3000);
            } else {
                responseDiv.style.color = 'red';
                responseDiv.style.display = 'block';
                responseDiv.textContent = 'Error!';
                responseDiv.textContent += response.text();
            }
            return response.text();
        }).then(function (data) {
            console.log(data);
        });

    });
    cancelButton.addEventListener('click', function () {
        popup.style.display = 'none';
        popup.querySelector('.message').innerHTML = '';
        e.preventDefault();
    });
});




const emojiList = ['😀', '😂', '😍', '😎', '😢', '😡', '🎉', '❤️', '🔥', '👍', '👏', '😜', '😇', '😱', '🤔', '🤩', '🥳', '🤯', '🤗', '🤭', '🤫', '🤥', '🤢', '🤮', '🤧', '🥵', '🥶', '🥴', '🥺', '🤠', '🤡', '🤥', '🤫', '🤭', '🧐', '🤓', '😈',  '💀', '👻', '👽', '🤖', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '😿', '😾', '🙈', '🙉', '🙊', '💋', '💌', '💘', '💝', '💖', '💗', '💓', '💞', '💕', '💟', '❣️', '💔', '❤️‍🔥', '❤️‍🩹', '💤', '💬', '👁️‍🗨️', '🗨️', '🗯️', '💭', '💫', '💨', '🕳️', '📢', '📣', '🔔', '🔕', '🎵', '🎶', '🎙️', '🎚️', '🎛️', '🎤', '🎧', '📯', '🔈', '🔉', '🔊', '📻', '📱', '📲'];
const emojiContainer = document.getElementById('emoji-list');
const textarea = document.getElementById('textarea');

// Fonction pour insérer du texte à la position du curseur dans le textarea
function insertAtCursor(emoji) {
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;

    // Insertion de l'emoji en respectant la position du curseur
    textarea.value = text.slice(0, start) + emoji + text.slice(end);

    // Mise à jour de la position du curseur après insertion
    textarea.selectionStart = textarea.selectionEnd = start + emoji.length;
    textarea.focus();
}

// Fonction pour afficher la liste d'emojis
emojiList.forEach(emoji => {
    const emojiItem = document.createElement('span');
    emojiItem.textContent = emoji;
    emojiItem.classList.add('emoji');
    emojiItem.addEventListener('click', () => {
        insertAtCursor(emoji);
    });
    emojiContainer.appendChild(emojiItem);
});