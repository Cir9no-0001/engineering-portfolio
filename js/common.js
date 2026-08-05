const musicButton = document.querySelector('#music-toggle');
const music = document.querySelector('#menu-music');

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