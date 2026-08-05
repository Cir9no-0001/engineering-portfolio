const filterToggle = document.querySelector('#filter-toggle');
const filterPanel = document.querySelector('#filter-panel');

filterToggle.addEventListener('click', function () {
    filterPanel.classList.toggle('hidden');
});

const projectInfo = {
    "active-directory-home-lab": "This project involved building a full Windows Server domain environment from scratch, configuring Active Directory, DNS, and Group Policy, then using Kali Linux to test the network for common vulnerabilities. It deepened my understanding of enterprise IT infrastructure and basic penetration testing concepts.",
    "arduino-memory-game": "An embedded systems project where I built a memory matching game using an Arduino, LEDs, and push buttons. This involved writing C++ firmware to handle game logic, timing, and input debouncing.",
    "leetcode-sync": "A Python tool that automatically syncs completed Leetcode problems to a personal tracking spreadsheet, helping me monitor practice consistency and identify weak topic areas over time."
};

const projectModal = document.querySelector('#project-modal');
const projectModalContent = projectModal.querySelector('.modal-content');
const seeMoreButtons = document.querySelectorAll('.see-more-btn');

seeMoreButtons.forEach(function (button) {
    button.addEventListener('click', function () {
        const projectId = button.dataset.project;
        const description = projectInfo[projectId];
        const title = document.querySelector('#' + projectId).querySelector('h3').textContent;

        projectModalContent.innerHTML = `
            <h3>${title}</h3>
            <p>${description}</p>
        `;

        projectModal.classList.remove('hidden');
    });
});

projectModal.addEventListener('click', function (event) {
    if (event.target === projectModal) {
        projectModal.classList.add('hidden');
    }
});

const filterForm = document.querySelector('#filter-panel');
const projects = document.querySelectorAll('.project');

filterForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const checkedSkills = document.querySelectorAll('input[name="skill"]:checked');
    const selectedSkills = [];
    checkedSkills.forEach(function (checkbox) {
        selectedSkills.push(checkbox.value);
    });

    const difficultyRadio = document.querySelector('input[name="difficulty"]:checked');
    const minDifficulty = difficultyRadio ? Number(difficultyRadio.value) : 0;

    projects.forEach(function (project) {
        const projectTags = project.querySelectorAll('.project-tags li');
        const projectSkills = [];
        projectTags.forEach(function (tag) {
            projectSkills.push(tag.textContent.toLowerCase());
        });

        const matchesSkills = selectedSkills.length === 0 || selectedSkills.some(function (skill) {
            return projectSkills.includes(skill);
        });

        const matchesDifficulty = Number(project.dataset.difficulty) >= minDifficulty;

        if (matchesSkills && matchesDifficulty) {
            project.classList.remove('hidden');
        } else {
            project.classList.add('hidden');
        }
    });

    const recencyRadio = document.querySelector('input[name="recency"]:checked');
    if (recencyRadio) {
        const sortedProjects = Array.from(projects).sort(function (a, b) {
            const dateA = new Date(a.dataset.date);
            const dateB = new Date(b.dataset.date);
            return recencyRadio.value === 'newest' ? dateB - dateA : dateA - dateB;
        });

        sortedProjects.forEach(function (project) {
            project.parentElement.appendChild(project);
        });
    }
});

const urlParams = new URLSearchParams(window.location.search);
const skillFromUrl = urlParams.get('skill');

if (skillFromUrl) {
    const matchingCheckbox = document.querySelector('input[name="skill"][value="' + skillFromUrl + '"]');
    if (matchingCheckbox) {
        matchingCheckbox.checked = true;
        filterPanel.classList.remove('hidden');
        filterForm.dispatchEvent(new Event('submit'));
    }
}

const searchInput = document.querySelector('#project-search');

searchInput.addEventListener('input', function () {
    const searchText = searchInput.value.toLowerCase();

    projects.forEach(function (project) {
        const title = project.querySelector('h3').textContent.toLowerCase();

        if (title.includes(searchText)) {
            project.classList.remove('search-hidden');
        } else {
            project.classList.add('search-hidden');
        }
    });
});

const galleries = document.querySelectorAll('.project-gallery');

galleries.forEach(function (gallery) {
    const images = gallery.querySelectorAll('.gallery-item');
    let currentIndex = 0;

    if (images.length > 1) {
        setInterval(function () {
            images[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % images.length;
            images[currentIndex].classList.add('active');
        }, 3000);
    }
});