"use strict";

// url =>  https://ehbchatapp.herokuapp.com/

const chat = {
    author: "Joske",
    init() {
        document.getElementById('chatForm').addEventListener("submit", (event) => {
            event.preventDefault();
            this.sendMessage();
        });
    },
    sendMessage() {
    const userInput = document.getElementById('chatInput').value;
        fetch('https://ehbchatapp.herokuapp.com/message', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded’
            },
            body: JSON.stringify({ 
                author: this.author, 
                message: userInput
            })
        })
        .then((response) => {
            console.log(response);
            const empty = document.getElementById('messageContainer'); 
            empty.innerHTML = "";
            this.fetchMessages();
        });

    },
    fetchMessages() {
        const container = document.getElementById('messageContainer');
        container.innerHTML = "";
        fetch('https://ehbchatapp.herokuapp.com/messages')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            console.log(data);
            data.forEach(message => {
                this.renderMessage(message, container);
            });
        });
    },
    renderMessage(message, container) {
        console.log(message);
        let ownMessageClass = "";
        if(message.author == this.author) {
            ownMessageClass = "own";
        }
        const messages =`
            <div class="messageItem">
             <div class="header">
                <span class="author">${message.author}</span>
                 <span class="time">${new Date (message.created_at).getHours()}:${new Date (message.created_at).getMinutes()}</span>
             </div>
             <p>
                ${message.message}
            </p>
          </div>
          `;
          container.insertAdjacentHTML("beforeend", messages);
    }
};
chat.init();
chat.fetchMessages();
chat.renderMessage();
chat.sendMessage();