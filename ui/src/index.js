document.addEventListener('DOMContentLoaded', function() {
    const logo = document.getElementById('logo');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('main-content');

    logo.addEventListener('click', function() {
        sidebar.classList.toggle('closed');
        sidebar.classList.toggle('shrink');
        mainContent.classList.toggle('expanded');
    });
});
