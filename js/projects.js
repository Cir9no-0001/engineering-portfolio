const filterToggle = document.querySelector('#filter-toggle');
const filterPanel = document.querySelector('#filter-panel');

filterToggle.addEventListener('click', function () {
    filterPanel.classList.toggle('hidden');
});

const projectInfo = {
    "active-directory-home-lab": {
        images: ["images/ad-lab-1.jpg", "images/ad-lab-2.jpg"],
        tags: ["Windows", "Linux", "VirtualBox"],
        description: `## Overview
This project involved building a full **Windows Server** domain environment from scratch, configuring Active Directory, DNS, and Group Policy.

## Testing
I then used Kali Linux to test the network for common vulnerabilities, simulating real-world attack scenarios against the domain.

- Practiced enterprise IT infrastructure setup
- Explored basic penetration testing concepts`,
        links: [
            { label: "GitHub Repo", url: "https://github.com/yourusername/ad-home-lab" }
        ]
    },
    "arduino-memory-game": {
        images: ["images/arduino-game-1.jpg", "images/arduino-game-2.jpg"],
        tags: ["Arduino", "C++"],
        description: `## Overview
This project involved building a full **Windows Server** domain environment from scratch, configuring Active Directory, DNS, and Group Policy.

## Testing
I then used Kali Linux to test the network for common vulnerabilities, simulating real-world attack scenarios against the domain.

- Practiced enterprise IT infrastructure setup
- Explored basic penetration testing concepts`,
        links: [
            { label: "GitHub Repo", url: "#" }
        ]
    },
    "code-atlas": {
        images: ["images/CodeAtlas-1.jpg", "images/CodeAtlas-2.jpg"],
        tags: ["Python"],
        description: `## Overview
This project is a Python script that synchronizes my solved LeetCode problems with a local database.

## Implementation
It uses the LeetCode API to fetch problem data and stores it in a SQLite database for offline access.

## Learning Outcomes
This project helped me practice working with APIs and databases in Python.`,
        links: [
            { label: "GitHub Repo", url: "https://github.com/Cir9no-0001/CodeAtlas" }
        ]
    }
};

const projectModal = document.querySelector('#project-modal');
const projectModalContent = projectModal.querySelector('.modal-content');
const seeMoreButtons = document.querySelectorAll('.see-more-btn');
let currentDetailIndex = 0;
let currentDetailImages = [];

seeMoreButtons.forEach(function (button) {
    button.addEventListener('click', function () {
        const projectId = button.dataset.project;
        const data = projectInfo[projectId];
        const article = document.querySelector('#' + projectId);
        const title = article.querySelector('h3').textContent;
        const date = article.querySelector('.project-date').textContent;

        currentDetailImages = data.images;
        currentDetailIndex = 0;

        const tagsHtml = data.tags.map(function (tag) {
            return '<li>' + tag + '</li>';
        }).join('');

        const linksHtml = data.links.map(function (link) {
            return '<a href="' + link.url + '" target="_blank" rel="noopener noreferrer">' + link.label + '</a>';
        }).join('');

        const galleryHtml = data.images.map(function (src, index) {
            return '<img class="' + (index === 0 ? 'active' : '') + '" src="' + src + '" alt="' + title + ' image ' + (index + 1) + '">';
        }).join('');

        projectModalContent.innerHTML = `
            <button type="button" class="modal-close">&times;</button>

            <div class="detail-header">
                <h1>${title}</h1>
                <h1 class="project-date">${date}</h1>
            </div>

            <hr class="detail-separator">

            <div class="detail-gallery">
                <button type="button" class="gallery-arrow prev">&#10094;</button>
                ${galleryHtml}
                <button type="button" class="gallery-arrow next">&#10095;</button>
            </div>

            <hr class="detail-separator">

            <ul class="detail-tags">${tagsHtml}</ul>

            <div class="detail-description">${marked.parse(data.description)}</div>

            <div class="detail-links">${linksHtml}</div>
        `;

        projectModal.classList.remove('hidden');

        const closeBtn = projectModalContent.querySelector('.modal-close');
        closeBtn.addEventListener('click', function () {
            projectModal.classList.add('hidden');
        });

        const prevBtn = projectModalContent.querySelector('.gallery-arrow.prev');
        const nextBtn = projectModalContent.querySelector('.gallery-arrow.next');

        prevBtn.addEventListener('click', function () {
            showDetailImage(currentDetailIndex - 1);
        });

        nextBtn.addEventListener('click', function () {
            showDetailImage(currentDetailIndex + 1);
        });
    });
});

function showDetailImage(newIndex) {
    const images = projectModalContent.querySelectorAll('.detail-gallery img');
    images[currentDetailIndex].classList.remove('active');
    currentDetailIndex = (newIndex + images.length) % images.length;
    images[currentDetailIndex].classList.add('active');
}

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