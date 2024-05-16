function viewImage(src, title, hashtags, tools, owner, ownerProfile) {
    localStorage.setItem('imageSrc', src);
    localStorage.setItem('imageTitle', title);
    localStorage.setItem('imageHashtags', hashtags);
    localStorage.setItem('imageTools', tools);
    localStorage.setItem('imageOwner', owner);
    localStorage.setItem('ownerProfile', ownerProfile);
    window.location.href = 'image-display.html';
}


