function loadPartial(id, url) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById(id).innerHTML = data;
        })
        .catch(error => console.error('Error loading partial:', error));
}

// Load header and footer
document.addEventListener('DOMContentLoaded', () => {
    loadPartial('header', 'partials/header.html');
    loadPartial('footer', 'partials/footer.html');
});
