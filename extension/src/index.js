let userAcc = '0x1d675kdasdfhx91234x';
let prvKey = 'privatekey1';
let totalBal = '1.2345 XBC';

function storeUserData(account,privateKey) {
    const encryptedKey = btoa(privateKey);
    localStorage.setItem('userAccount',account);
    localStorage.setItem('userPrivateKey', encryptedKey);
}

function getUserData() {
    const acc = localStorage.getItem('userAccount')
    const encryptedKey = localStorage.getItem('userPrivateKey');
    const privateKey = encryptedKey ? atob(encryptedKey) : null;



    if(acc === null && encryptedKey === null) {
        storeUserData(userAcc,prvKey);
    } 

    return { acc, privateKey};
}

const userData = getUserData();

document.getElementById('user-acc').innerText = userData.acc;

document.getElementById('total-bal').innerText = totalBal;

// document.getElementById('owned-tokens').innerText = 

// document.addEventListener('DOMContentLoaded', getUserData);


//to be edited for the interaction with the api
// function getDataFromAPI() {
//     const apiUrl = 'https://api.xbar.com/data';

//     fetch(apiUrl)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok ' + response.statusText);
//             }
//             return response.json();
//         })
//         .then(data => {
//             console.log('Data received:', data);
//             userAcc = data.wallet_add || '0x1d675kdasdfhx91234x';
//         })
//         .catch(error => {
//             console.error('There has been a problem with your fetch operation:', error);
//         });
// }

// getDataFromAPI();

// function sendDataToAPI() {
//     const apiUrl = 'https://api.xbar.com/submit';
//     const dataToSend = {
//         key1: 'value1',
//         key2: 'value2',
//     };

//     fetch(apiUrl, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(dataToSend)
//     })
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Network response was not ok ' + response.statusText);
//         }
//         return response.json();
//     })
//     .then(data => {
//         console.log('Data successfully sent:', data);
//     })
//     .catch(error => {
//         console.error('There has been a problem with your fetch operation:', error);
//     });
// }

// sendDataToAPI();