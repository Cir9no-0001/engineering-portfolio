/* Music player button code below */

// Select play button and music elements
const musicButton = document.querySelector('#music-toggle');
const music = document.querySelector('#menu-music');

// Listen for click if button exists and music is loaded
if (musicButton && music) {
    musicButton.addEventListener('click', function () {
        if (music.paused) {
            music.play().catch(function (error) {
                console.log('Play failed:', error);
            });
            musicButton.textContent = '⏸';
        } else {
            music.pause();
            musicButton.textContent = '▶';
        }
    });
}

/* Navbar hide/show code below */

function hideNavbar() {
    const navbar = document.querySelector('.navbar');

    if (navbar) {
        navbar.classList.add('modal-open');
    }
}

function showNavbar() {
    const navbar = document.querySelector('.navbar');

    if (navbar) {
        navbar.classList.remove('modal-open');
    }
}