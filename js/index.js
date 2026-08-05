const skillInfo = {
    python: "Used for scripting, automation, and backend development across various projects.",
    java: "Applied in object-oriented programming coursework and application development.",
    cpp: "Used for systems-level programming and performance-focused projects.",
    css: "Used to style and layout this very portfolio website.",
    html: "Used to structure and build this portfolio website from scratch.",
    mysql: "Used for relational database design and queries in coursework and projects.",
    git: "Used for version control across personal and team projects.",
    github: "Used to host, track, and showcase project repositories.",
    vscode: "Primary code editor for development across most languages.",
    windows: "Primary operating system used for daily development work.",
    linux: "Used for server administration, scripting, and security testing.",
    virtualbox: "Used to run virtual machines for testing and lab environments.",
    arduino: "Used to build embedded hardware projects like the memory game.",
    cad: "Used for mechanical design and prototyping in engineering coursework."
};

const skillModal = document.querySelector('#skill-modal');
const modalContent = skillModal.querySelector('.modal-content');
const skillCards = document.querySelectorAll('.skill-card');

skillCards.forEach(function (card) {
    card.addEventListener('click', function () {
        const skill = card.dataset.skill;
        const description = skillInfo[skill];

        modalContent.innerHTML = `
            <h3>${card.querySelector('.skill-name').textContent}</h3>
            <p>${description}</p>
            <a href="projects.html?skill=${skill}" class="modal-link">See projects using this skill →</a>
        `;

        skillModal.classList.remove('hidden');
    });
});

skillModal.addEventListener('click', function (event) {
    if (event.target === skillModal) {
        skillModal.classList.add('hidden');
    }
});