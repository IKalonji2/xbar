//to be edited for the interaction with the api
function getDataFromAPI() {
    const apiUrl = 'https://api.xbar.com/data';

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Data received:', data);
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}

getDataFromAPI();

function sendDataToAPI() {
    const apiUrl = 'https://api.xbar.com/submit';
    const dataToSend = {
        key1: 'value1',
        key2: 'value2',
    };

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log('Data successfully sent:', data);
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });
}

sendDataToAPI();