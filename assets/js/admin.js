/* Variables globales */
const MESSAGELISTDIV = document.getElementById('messageList'); // HTML Contenant les messages
var messages = []; // Liste des messages


/* Fonctions */
function addOneMessage(message, admin=false) {
    // div message
    messageDiv = document.createElement('div');
    if(admin){
        messageDiv = document.querySelector('.message');
        messageDiv.classList.add('messageAdmin');
    }else {
        messageDiv = document.createElement('div');
    }
    messageDiv.classList.add('message');
    // Infos du message (username, date)
    const messageInfosDiv = document.createElement('div');
    messageInfosDiv.classList.add('messageInfos');
    const usernameDiv = document.createElement('div');
    usernameDiv.classList.add('username');

    // add data-id to the message
    messageDiv.setAttribute('data-id', message.id);
    // add data-time to the message
    messageDiv.setAttribute('data-time', message.date);
    // Annonce si admin
    if (message.admin) {
        messageDiv.classList.add('messageAdmin');
        usernameDiv.innerHTML = "Annonce de <div class='sender'>" + ADMINNAME + "</div>";
        usernameDiv.style.fontWeight = 'bold';
        messageDiv.style.backgroundColor = 'var(--blue)';
        messageDiv.style.color = 'white';
    } else {
        usernameDiv.innerHTML = "Message de <div class='sender'>" + message.username + "</div> à <div class='dest'>" + message.dest + "</div>";
    }


    // Contenu du message
    const messageContentDiv = document.createElement('div');
    messageContentDiv.classList.add('messageContent');
    messageContentDiv.innerText = message.message;


    messageInfosDiv.appendChild(usernameDiv);
    // Date du message (optionnel)
    if (SHOWMESSAGEDATE) {
        const messageDate = document.createElement('div');
        messageDate.classList.add('messageDate');
        const diffTime = new Date().getTime() - new Date(message.date).getTime();
        messageDiv.setAttribute('data-time', message.date);
        messageDiv.setAttribute('data-id', message.id);
        messageDate.innerText = IlYa(message.date);
        messageInfosDiv.appendChild(messageDate);
    }
    const deleteButton = document.createElement('button');
    deleteButton.innerText = '🗑️';
    deleteButton.onclick = () => {
        fetch('../assets/php/delete.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'id=' + message.id
        })
            .then(response => response.text())
            .then(data => {
                console.log(data);
                getMessages();
            })

        const messageDiv = document.querySelector('.message[data-id="' + message.id + '"]');
        messageDiv.remove();
    };

    messageInfosDiv.appendChild(deleteButton);
    messageDiv.appendChild(messageInfosDiv);
    messageDiv.appendChild(messageContentDiv);
    if(!admin) {
        MESSAGELISTDIV.insertBefore(messageDiv, MESSAGELISTDIV.firstChild);
    }

}

// Afficher la date du message
function IlYa(date) {
    const diffTime = new Date().getTime() - new Date(date).getTime();
    if (diffTime < 60000) {
        if (diffTime < 1000) {
            return 'Il y a moins d\'une seconde';
        } else {
            return 'Il y a ' + Math.floor(diffTime / 1000) + ' secondes';
        }
    } else if (diffTime < 3600000) {
        if (diffTime < 120000) {
            return 'Il y a ' + Math.floor(diffTime / 60000) + ' minute';
        } else {
            return 'Il y a ' + Math.floor(diffTime / 60000) + ' minutes';
        }
    } else if (diffTime < 86400000) {
        if (diffTime < 7200000) {
            return 'Il y a ' + Math.floor(diffTime / 3600000) + ' heure';
        } else {
            return 'Il y a ' + Math.floor(diffTime / 3600000) + ' heures';
        }
    } else {
        if (diffTime < 172800000) {
            return 'Il y a ' + Math.floor(diffTime / 86400000) + ' jour';
        } else {
            return 'Il y a ' + Math.floor(diffTime / 86400000) + ' jours';
        }
    }
}

// Récupérer les messages depuis le fichier JSON
function getMessages() {
    fetch(MESSAGES_FILE)
        .then(response => response.json())
        .then(data => {
            MESSAGELISTDIV.scrollIntoView();
            if (JSON.stringify(messages) === JSON.stringify(data)) {
                return;
            }
            data.forEach(message => {
                if (!messages.find(m => m.id === message.id)) {
                    addOneMessage(message);
                }
            });
            messages.forEach(message => {
                if (!data.find(m => m.id === message.id)) {
                    removeDeletedMessage(message.id);
                }
            });
            messages = data;
        })
}


function removeDeletedMessage(id) {
    const messageDiv = document.querySelector('.message[data-id="' + id + '"]');
    messageDiv.remove();
    console.log('removing message with id: ' + id);
}


function loopThroughMessages() {
    // place the last message of the actual displayed list at the top
    const messages = document.querySelectorAll('.message');
    const lastMessage = messages[messages.length - 1];
    const firstMessage = messages[0];
    MESSAGELISTDIV.insertBefore(lastMessage, firstMessage);

}


/* Activer les fonctions et exécuter les fonctions de manière régulière */
getMessages();
setInterval(getMessages, TIMEINTERVALCHECKNEWMESSAGES);
if (DEFILEMENTAUTOSURADMIN) {
    setInterval(loopThroughMessages, TIMEINTERVALDEFILEMENT);
}


/* Envoyer une annonce */
lastTryToSend = new Date() - 10000;
// send a message (username, message) to the server store.php

document.querySelector('#sendAnnonce').addEventListener('click', function (e) {
    const responseDiv = document.querySelector('.response');
    const popup = document.querySelector('.popup');
    // show popup and prevent form submission. Wait for user to confirm
    popup.style.display = 'block';
    const sendButton = popup.querySelector('.send');
    const cancelButton = popup.querySelector('.cancel');


    const message = document.querySelector('textarea[name="message"]').value;
    addOneMessage({
        username: 'Admin',
        dest: 'ALL',
        message: message,
        admin: true,
        date: new Date().toISOString(),
        id: '123'
    }, true);

    e.preventDefault();

    sendButton.addEventListener('click', function () {
        popup.style.display = 'none';
        let message = document.querySelector('textarea[name="message"]').value;
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
        fetch('../assets/php/store.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'username=' + ADMINNAME + '&message=' + message + '&dest=ALL&admin=true'
        }).then(function (response) {
            const responseDiv = document.querySelector('.response');
            if (response.ok) {
                responseDiv.style.color = 'green';
                responseDiv.style.display = 'block';
                responseDiv.textContent = 'Message sent!';
                getMessages();
            } else {
                responseDiv.style.color = 'red';
                responseDiv.style.display = 'block';
                responseDiv.textContent = 'Error!';
            }
            return response.text();
        }).then(function (data) {
            console.log(data);
        });

    });
    cancelButton.addEventListener('click', function () {
        popup.style.display = 'none';
        e.preventDefault();
    });
});