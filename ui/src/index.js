function storeUserData(account,privateKey) {
    const encryptedKey = btoa(privateKey);
    localStorage.setItem('userAccount',account);
    localStorage.setItem('userPrivateKey', encryptedKey);
}
storeUserData('0x1d675kdasdfhx91234x','privatekey1');

function getUserData() {
    const acc = localStorage.getItem('userAccount')
    const encryptedKey = localStorage.getItem('userPrivateKey');
    const privateKey = encryptedKey ? atob(encryptedKey) : null;

    return { acc, privateKey};
}

const userData = getUserData();
console.log(userData);

document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const apiEndpoint = "https://example.com/api/login";

    const payload = {
        username: username,
        password: password
    };

    fetch(apiEndpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            window.location.href = "/home";
        } else {
            document.getElementById("errorMessage").style.display = "block";
        }
    })
    .catch(error => {
        console.error("Error:", error);
        document.getElementById("errorMessage").textContent = "An error occurred. Please try again.";
        document.getElementById("errorMessage").style.display = "block";
    });
});

// //to be edited for the interaction with the api
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