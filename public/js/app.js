const weatherform = document.querySelector('form');
const search = document.querySelector('input');
let messageone = document.querySelector('#message-1');
let messagetwo = document.querySelector('#message-2');
let messagethree = document.querySelector('#message-3');

weatherform.addEventListener('submit', (e) => {
    e.preventDefault();

    let value = search.value;
    //console.log(value);
    messageone.textContent = 'Loading...';
    messagetwo.textContent = '';
    messagethree.textContent = '';
    fetch('http://localhost:3000/weather?address=' + value).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                //console.log(data.error)
                messageone.textContent = data.error
            }
            else {
                /// console.log(data.location);
                messageone.textContent = data.location;
                //console.log(data.foreCast);
                messagetwo.textContent = data.foreCast;
                messagethree.textContent = "Current Temperature : " + data.temperature;
            }
        })
    })
})