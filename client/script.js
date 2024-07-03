let messageData = [];

function createElements(message) {
    return message.map(m => `<div class="message">${m.author} : ${m.message}</div>`).join('');
}

setInterval(() => {
    fetch('http://localhost:3000/msg')
        .then(response => response.json())
        .then(data => {
            if (messageData.length !== data.length) {
                messageData = [...data];
                document.getElementById('container').innerHTML = createElements(data);
            }
        });
}, 1000);
