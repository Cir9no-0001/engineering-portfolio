/* Advanced filter code below */

// Select filter button and hidden filter panel
const filterToggle = document.querySelector('#filter-toggle');
const filterPanel = document.querySelector('#filter-panel');

// Toggle visibility of filter panel on click
filterToggle.addEventListener('click', function () {
    filterPanel.classList.toggle('hidden');
});

// Select filter form and project elements
const filterForm = document.querySelector('#filter-panel');
const projects = document.querySelectorAll('.project');

// Filter form logic for skills, status, difficulty, and recency
filterForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const checkedSkills = document.querySelectorAll('input[name="skill"]:checked');
    const selectedSkills = [];
    checkedSkills.forEach(function (checkbox) {
        selectedSkills.push(checkbox.value);
    });

    const checkedStatuses = document.querySelectorAll('input[name="status"]:checked');
    const selectedStatuses = [];
    checkedStatuses.forEach(function (checkbox) {
        selectedStatuses.push(checkbox.value);
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

        const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(project.dataset.status);

        const matchesDifficulty = Number(project.dataset.difficulty) >= minDifficulty;

        if (matchesSkills && matchesStatus && matchesDifficulty) {
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


// URL skill filtering for skill table
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

// Search bar code
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


/* Full project info code below */

// Full project data
const projectInfo = {
    "active-directory-home-lab": {
        media: [
            {
                type: "image",
                src: "images/ad-lab-1.png"
            },
            {
                type: "image",
                src: "images/ad-lab-2.png"
            },
            {
                type: "image",
                src: "images/ad-lab-3.png"
            },
            {
                type: "image",
                src: "images/ad-lab-4.png"
            }
        ],
        tags: ["Windows", "Linux", "VirtualBox", "AD DS", "DNS", "Group Policy", "Authentication Security", "Powershell", "Event Viewer", "Network Traffic Analysis", "Password Spraying"],
        descriptionFile: "markdown/ad-lab.md",
        links: [
            { label: "GitHub Repo", url: "https://github.com/yourusername/ad-home-lab" }
        ]
    },
    "simon-says-v2": {
        media: [
            {
                type: "video",
                src: "videos/simon-says-v2-1.mp4"
            },
            {
                type: "image",
                src: "images/simon-says-v2-2.png"
            },
            {
                type: "image",
                src: "images/simon-says-v2-3.png"
            }
        ],
        tags: ["Arduino", "C++", "Tinkercad", "Embedded Systems", "Circuit Design", "3D Printing"],
        descriptionFile: "markdown/simon-says-v2.md",
        links: [
            { label: "GitHub Repo", url: "#https://github.com/Cir9no-0001/TEJ3M1-CPP-Code-Vault/tree/main" }
        ]
    },
    "code-atlas": {
        media: [
            {
                type: "image",
                src: "images/CodeAtlas-1.png"
            },
            {
                type: "image",
                src: "images/CodeAtlas-2.png"
            },
            {
                type: "image",
                src: "images/CodeAtlas-3.png"
            }
        ],
        tags: ["Python", "MySQL", "GitHub Actions", "Git", "GitHub", "VS Code"],
        descriptionFile: "markdown/code-atlas.md",
        links: [
            { label: "GitHub Repo", url: "https://github.com/Cir9no-0001/CodeAtlas" }
        ]
    }, 
    
    "engineering-portfolio": {
        media: [
            {
                type: "image",
                src: "images/eng-2.png"
            },
            {
                type: "image",
                src: "images/eng-3.png"
            },
            {
                type: "image",
                src: "images/eng-4.png"
            },
            {
                type: "image",
                src: "images/eng-5.png"
            },
            {
                type: "image",
                src: "images/eng-6.png"
            }
        ],
        tags: ["HTML", "CSS", "JavaScript", "Git", "GitHub", "VS Code"],
        descriptionFile: "markdown/eng.md",
        links: [
            { label: "GitHub Repo", url: "https://github.com/Cir9no-0001/engineering-portfolio" },
            { label: "Visit Site", url: "https://cir9no-0001.github.io/engineering-portfolio/" }
        ]
    }
};

// Select project modal and content elements
const projectModal = document.querySelector('#project-modal');
const projectModalContent = projectModal.querySelector('.modal-content');
const seeMoreButtons = document.querySelectorAll('.see-more-btn');

// Select lightbox elements
const lightbox = document.querySelector('#image-lightbox');
const lightboxImage = document.querySelector('#lightbox-image');
const lightboxVideo = document.querySelector('#lightbox-video');
const lightboxClose = document.querySelector('.lightbox-close');

let currentDetailIndex = 0;
let currentDetailImages = [];

// See more button and project modal code
seeMoreButtons.forEach(function (button) {
    button.addEventListener('click', async function () {

        // Select project info for see more panel
        const projectId = button.dataset.project;
        const data = projectInfo[projectId];

        const markdown = await fetch(data.descriptionFile)
            .then(function(response) {
                return response.text();
            });

        const article = document.querySelector('#' + projectId);
        const title = article.querySelector('h3').textContent;
        const date = article.querySelector('.project-date').textContent;

        // Store current media and reset index for gallery navigation
        currentDetailImages = data.media;
        currentDetailIndex = 0;

        // Insert project tags and links into panel
        const tagsHtml = data.tags.map(function (tag) {
            return '<li>' + tag + '</li>';
        }).join('');
        const linksHtml = data.links.map(function (link) {
            return '<a href="' + link.url + '" target="_blank" rel="noopener noreferrer">' + link.label + '</a>';
        }).join('');

        // Generate gallery HTML from project media (images/videos)
        const galleryHtml = data.media.map(function (item, index) {
            if (item.type === "image") {
                return `
                    <img 
                        class="${index === 0 ? 'active' : ''}" 
                        src="${item.src}" 
                        alt="${title} image ${index + 1}">
                `;
            }
            if (item.type === "video") {
                return `
                    <video 
                        class="${index === 0 ? 'active' : ''}"
                        controls
                        muted
                        loop
                        playsinline>

                        <source src="${item.src}" type="video/mp4">
                    </video>
                `;
            }
        }).join('');

        // Build project see more modal HTML using generated gallery, tags, description, and links
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

            <div class="description-container">
                <div class="detail-description collapsed">
                    ${DOMPurify.sanitize(marked.parse(markdown))}
                </div>
            
                <button type="button" class="description-toggle">
                    Expand
                </button>
            </div>

            <div class="detail-links">${linksHtml}</div>
        `;

        // Mermaid diagram rendering for any diagrams in the project description
        mermaid.initialize({
            startOnLoad: false,
            theme: "dark"
        });
        setTimeout(() => {
            mermaid.run({
                querySelector: ".language-mermaid"
            });
        }, 100);

        projectModal.classList.remove('hidden');
        hideNavbar();

        const galleryImages = projectModalContent.querySelectorAll(
            '.detail-gallery img'
        );

        // Lightbox logic for clicking on gallery images
        galleryImages.forEach(function (image) {

            image.addEventListener('click', function () {

                lightboxImage.src = image.getAttribute('src');

                lightboxImage.classList.remove('hidden');
                lightboxVideo.classList.add('hidden');

                lightbox.classList.remove('hidden');

            });

        });

        // Description cutoff logic for expanding and collapsing
        const description = projectModalContent.querySelector('.detail-description');
        const toggleButton = projectModalContent.querySelector('.description-toggle');
        setTimeout(function () {
            if (description.scrollHeight <= 200) {
                toggleButton.style.display = "none";
            }
        }, 0);
        toggleButton.addEventListener('click', function () {
            description.classList.toggle('expanded');
            description.classList.toggle('collapsed');

            if (description.classList.contains('expanded')) {
                toggleButton.textContent = "Collapse";
            } else {
                toggleButton.textContent = "Expand";
            }
        });
        const closeBtn = projectModalContent.querySelector('.modal-close');
        closeBtn.addEventListener('click', function () {
            projectModal.classList.add('hidden');
            showNavbar();
        });

        // Gallery navigation logic for previous and next buttons
        const prevBtn = projectModalContent.querySelector('.gallery-arrow.prev');
        const nextBtn = projectModalContent.querySelector('.gallery-arrow.next');
        prevBtn.addEventListener('click', function () {
            showDetailMedia(currentDetailIndex - 1);
        });
        nextBtn.addEventListener('click', function () {
            showDetailMedia(currentDetailIndex + 1);
        });
    });
});

// Changes currently displayed project modal image
function showDetailMedia(newIndex) {

    const galleryItems = projectModalContent.querySelectorAll(
        '.detail-gallery img, .detail-gallery video'
    );

    const currentItem = galleryItems[currentDetailIndex];

    if (currentItem.tagName === "VIDEO") {
        currentItem.pause();
        currentItem.currentTime = 0;
    }

    currentItem.classList.remove('active');

    currentDetailIndex =
        (newIndex + galleryItems.length) % galleryItems.length;

    const nextItem = galleryItems[currentDetailIndex];

    nextItem.classList.add('active');

    if (nextItem.tagName === "VIDEO") {
        nextItem.play();
    }
}

// Close modal when user clicks outside the content area
projectModal.addEventListener('click', function (event) {
    if (event.target === projectModal) {
        projectModal.classList.add('hidden');
        showNavbar();
    }
});

// Gallery auto-rotation code
const galleries = document.querySelectorAll('.project-gallery');

// Auto-rotate gallery items in each gallery every 5 seconds
galleries.forEach(function (gallery) {
    const galleryItems = gallery.querySelectorAll('.gallery-item');
    let currentIndex = 0;

    if (galleryItems.length > 1) {
        setInterval(function () {
            galleryItems[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % galleryItems.length;
            galleryItems[currentIndex].classList.add('active');
        }, 5000);
    }
});

// Close lightbox logic
if (lightboxClose && lightbox) {

    lightboxClose.addEventListener('click', function () {

        lightbox.classList.add('hidden');

        lightboxVideo.pause();
        lightboxVideo.currentTime = 0;

    });

    lightbox.addEventListener('click', function (event) {
        if (event.target === lightbox) {
            lightbox.classList.add('hidden');

            lightboxVideo.pause();
            lightboxVideo.currentTime = 0;
        }
    });

}