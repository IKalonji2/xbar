// Routes configuration
const routes = {
    '/': '../xbarPage/src/views/home.html',
    '/about': 'about.html',
    '/contact': 'src/views/contact.html'
};

// Function to load HTML content
function loadView(view) {
    fetch(view)
        .then(response => response.text())
        .then(html => {
            document.getElementById('app').innerHTML = html;
        })
        .catch(error => {
            console.error('Error loading the view:', error);
            document.getElementById('app').innerHTML = '<p>Error loading the page.</p>';
        });
}

// Function to handle routing
function navigateTo(path) {
    const view = routes[path] || routes['/'];
    loadView(view);
    window.history.pushState({}, '', path);
}

// Event listeners for navigation
document.querySelectorAll('a[data-route]').forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const path = event.target.getAttribute('data-route');
        navigateTo(path);
    });
});

// Handle back/forward browser buttons
window.onpopstate = () => {
    const path = window.location.pathname;
    navigateTo(path);
};

// Load initial content
navigateTo(window.location.pathname);

