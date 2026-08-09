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

/* Background code below */

// Background canvas initialization
function initializeBackground() {
    const canvas = document.createElement("canvas");
    canvas.id = "background-canvas";

    document.body.prepend(canvas);

    const ctx = canvas.getContext("2d");

    const spacing = 60;
    const hoverRadius = 150;

    let dots = [];

    let mouse = {
        x: null,
        y: null
    };

    // Resize canvas and recreate grid
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        createDots();
    }

    // Create dots at grid intersections
    function createDots() {
        dots = [];
        for (let x = 0; x < canvas.width; x += spacing) {
            for (let y = 0; y < canvas.height; y += spacing) {
                dots.push({
                    x: x,
                    y: y,
                    brightness: 0
                });

            }
        }
    }

    // Draw dots with mouse interaction
    function drawDots() {
        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        dots.forEach(function(dot) {
            // Calculate distance from mouse to dot
            const distance = Math.sqrt(
                (mouse.x - dot.x) ** 2 +
                (mouse.y - dot.y) ** 2
            );

            // Increase brightness when mouse is nearby
            if (distance < hoverRadius) {

                dot.brightness =
                    1 - (distance / hoverRadius);

            } else {

                // Smoothly fade back to normal
                dot.brightness *= 0.9;

            }

            ctx.beginPath();

            ctx.arc(
                dot.x,
                dot.y,
                1.5,
                0,
                Math.PI * 2
            );

            const opacity =
                0.30 + dot.brightness * 0.70;

            ctx.fillStyle =
                `rgba(255,255,255,${opacity})`;

            // Add glow near cursor
            if (dot.brightness > 0.1) {
                ctx.shadowBlur = 15;
                ctx.shadowColor = "#7dbeff";

            } else {
                ctx.shadowBlur = 0;

            }

            ctx.fill();

        });

        requestAnimationFrame(drawDots);

    }

    // Track mouse position
    window.addEventListener("mousemove", function(event) {

        mouse.x = event.clientX;
        mouse.y = event.clientY;

    });

    window.addEventListener("resize", function() {

        resizeCanvas();

    });

    resizeCanvas();
    drawDots();

}


initializeBackground();