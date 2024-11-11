/* Variables globales */
const MESSAGELISTDIV = document.getElementById('messageList'); // HTML Contenant les messages
var messages = []; // Liste des messages


/* Fonctions */
function addOneMessage(message) {
    // div message
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    // Infos du message (username, date)
    const messageInfosDiv = document.createElement('div');
    messageInfosDiv.classList.add('messageInfos');
    const usernameDiv = document.createElement('div');
    usernameDiv.classList.add('username');
    // Annonce si admin
    if (message.admin) {
        messageDiv.classList.add('messageAdmin');
        usernameDiv.innerHTML = "Annonce de <div class='sender'>" + ADMINNAME + "</div>";
        usernameDiv.style.fontWeight = 'bold';
        messageDiv.style.backgroundColor = 'var(--blue)';
        messageDiv.style.color = 'white';
    } else {
        //usernameDiv.innerHTML = "Message de <div class='sender'>" + message.username + "</div> à <div class='dest'>" + message.dest + "</div>";
        if (message.username === '') {
            usernameDiv.innerHTML = "Message <div class='sender'> anonyme </div> à ";
        } else {
            usernameDiv.innerHTML = "Message de <div class='sender'>" + message.username + "</div> à";
        }
        if (message.dest === '') {
            usernameDiv.innerHTML += " <div class='dest'>tout le monde</div>";
        } else {
            usernameDiv.innerHTML += " <div class='dest'>" + message.dest + "</div>";
        }
    }


    // Contenu du message
    const messageContentDiv = document.createElement('div');
    messageContentDiv.classList.add('messageContent');
    messageContentDiv.innerText = message.message;

    // add data-time and data-id to messageDiv
    messageDiv.setAttribute('data-time', message.date);
    messageDiv.setAttribute('data-id', message.id);

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
    messageDiv.appendChild(messageInfosDiv);
    messageDiv.appendChild(messageContentDiv);
    MESSAGELISTDIV.insertBefore(messageDiv, messageList.firstChild);
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
setInterval(loopThroughMessages, TIMEINTERVALDEFILEMENT);
