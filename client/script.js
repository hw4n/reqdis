let messageData = [];

function randomColor() {
    let r = Math.floor(Math.random() * 71);
    let g = Math.floor(Math.random() * 71);
    let b = Math.floor(Math.random() * 71);
    return `rgb(${r}, ${g}, ${b})`;
}

function createElements(message) {
    return message.map(m => `<div class="message" style="background-color: ${randomColor()}">${m.author} : ${m.message}</div>`).join('');
}

setInterval(() => {
    fetch('https://yapi.hwan.me/msg')
        .then(response => response.json())
        .then(data => {
            if (messageData.length === 0) {
                document.getElementById('container').innerHTML = createElements(data);
                messageData = data.slice();
            }

            if (messageData.length !== data.length) {
                console.log(messageData);
                console.log(data);
                console.log('----------')
                let newEntries = data.slice(messageData.length);
                document.getElementById('container').innerHTML += createElements(newEntries);
                messageData.push(...newEntries);
            }
        });
}, 1000);
