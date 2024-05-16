function loadPartial(id, url) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById(id).innerHTML = data;
        })
        .catch(error => console.error('Error loading partial:', error));
}

// Load header and footer
/* 
document.addEventListener('DOMContentLoaded', () => {
    loadPartial('header', 'partials/header.html');
    loadPartial('footer', 'partials/footer.html');
});
*/


document.addEventListener("DOMContentLoaded", function() {
    fetch('/partials/header.html')
      .then(response => response.text())
      .then(data => document.getElementById('header').innerHTML = data);
  
    fetch('/partials/footer.html')
      .then(response => response.text())
      .then(data => document.getElementById('footer').innerHTML = data);
  });
  
