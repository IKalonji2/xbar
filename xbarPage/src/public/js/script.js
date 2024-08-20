document.getElementById('show-form-button').addEventListener('click', function() {
    const formContainer = document.getElementById('form-container');
    const hideText = document.getElementById('reg-text-hide');

    if (hideText.style.display == 'block') {
        hideText.style.display = 'none';
        formContainer.classList.toggle('reg-form');
    }
});

document.addEventListener('click', function(event) {
    const formContainer = document.getElementById('form-container');
    const showFormButton = document.getElementById('show-form-button');
    
    if (!formContainer.contains(event.target) && !showFormButton.contains(event.target)) {
        formContainer.classList.add('reg-form');
    }
});

document.getElementById('registration-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);

    fetch('/register', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(message => {
        document.getElementById('message').textContent = message;
        document.getElementById('form-container').classList.add('reg-form');
    })
    .catch(error => {
        document.getElementById('message').textContent = 'An error occurred during registration.';
    });
});