// Routes configuration
const routes = {
    '/': 'index.html',
};

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

function navigateTo(path) {
    const view = routes[path] || routes['/'];
    loadView(view);
    window.history.pushState({}, '', path);
}

document.querySelectorAll('a[data-route]').forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const path = event.target.getAttribute('data-route');
        navigateTo(path);
    });
});

window.onpopstate = () => {
    const path = window.location.pathname;
    navigateTo(path);
};

navigateTo(window.location.pathname);

