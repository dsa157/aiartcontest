document.addEventListener('DOMContentLoaded', () => {
    const imageSrc = localStorage.getItem('imageSrc');
    const imageTitle = localStorage.getItem('imageTitle');
    const imageHashtags = localStorage.getItem('imageHashtags');
    const imageTools = localStorage.getItem('imageTools');
    const imageOwner = localStorage.getItem('imageOwner');
    const ownerProfile = localStorage.getItem('ownerProfile');

    document.getElementById('displayed-image').src = imageSrc;
    document.getElementById('image-title').textContent = imageTitle;
    document.getElementById('image-hashtags').textContent = imageHashtags;
    document.getElementById('image-tools').textContent = imageTools;
    document.getElementById('image-owner').textContent = imageOwner;
    document.getElementById('image-owner').href = ownerProfile;
});

function goBack() {
    window.history.back();
}
