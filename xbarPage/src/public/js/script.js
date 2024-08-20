// const images = [
//     'assets/swap-nobg.png',
//     'assets/launch-bg.png'
// ];

// let currentIndex = 0;

// const slideshow = document.getElementById('slideshow');

// function changeImage() {
//     currentIndex = (currentIndex + 1) % images.length;
//     slideshow.src = images[currentIndex];
// }


// setInterval(changeImage, 5000);

document.getElementById('show-form').addEventListener('click', function() {
    const formContainer = document.getElementById('form-container');
    formContainer.classList.remove('hidden');
    console.log('can you see me?')
});

document.addEventListener('click', function(event) {
    const formContainer = document.getElementById('form-container');
    const showFormButton = document.getElementById('show-form');

    if (!formContainer.contains(event.target) && !showFormButton.contains(event.target)) {
        formContainer.classList.add('hidden');
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