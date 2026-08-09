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
            }
        ],
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
        tags: ["Arduino", "C++", "Tinkercad"],
        description: `## Overview
An Arduino-based memory game inspired by the classic Simon Says toy, designed and simulated using 
Tinkercad Circuits before being built through custom circuitry and 3D-printed components. Simon Says 2 was created to explore embedded systems, hardware-software integration, and 
interactive design by combining LED patterns, audio feedback, and user controls into an engaging 
cognitive training experience. The project aimed to create a fun and progressively challenging game 
while applying principles of circuit design, programming, and physical prototyping.

## Testing
`,
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
        description: `
# Project Overview

## What is this?

CodeAtlas is an automated solution archive designed to synchronize accepted LeetCode submissions into a structured SQL repository.

Instead of manually copying solutions, organizing files, tracking metadata, and maintaining documentation, this project automates the process through GitHub Actions and the LeetCode GraphQL API.

Currently focused on SQL solutions, this project automatically:

- Retrieves accepted LeetCode submissions
- Creates and organizes SQL solution files
- Tracks solution metadata and timestamps
- Maintains separate personal notes and explanations
- Generates repository statistics
- Keeps documentation synchronized with the repository

The long-term goal is to transform a simple solution archive into a continuously improving platform for analyzing, organizing, and exploring programming solutions.

## Tech Stack

- **Language:** Python 3.12
- **API Integration:** LeetCode GraphQL API
- **CI/CD:** GitHub Actions (scheduled + manual workflow dispatch)
- **Data Persistence:** JSON (metadata, notes, statistics)
- **Dependencies:** \`requests\`
- **Standard Library:** \`zoneinfo\` (timezone-aware timestamps), \`re\` (filename normalization), \`json\`, \`os\`
- **Version Control Automation:** Git (automated commits via GitHub Actions bot identity)

## Key Features

### Automated Synchronization

- Automatically retrieves accepted LeetCode submissions
- Generates organized solution files
- Runs through GitHub Actions
- No manual copying required

### Documentation System

- Personal notes stored separately
- Notes automatically injected into solutions
- Preserves original submission code

### Repository Management

- Automatic statistics generation
- Metadata tracking
- Solution organization
- README auto-updates

## Why was this built?

Learning software engineering often creates a documentation problem.

Developers build projects, learn new technologies, and solve problems, but the evidence of that growth becomes scattered across repositories, notes, and forgotten experiments.

CodeAtlas was created to solve this problem by automatically capturing progress, organizing solutions, and preserving the reasoning behind the code.

This project started as a 3:00 AM SYDEquest from a Python API-handling tutorial hell on a scuffed idea to automatically save and organize my LeetCode SQL progress without having to maintain files manually.

Over time, it evolved into a larger system focused on separating:

- The original solution code
- Personal learning notes
- Generated metadata
- Future analysis features
    
This allows solutions to remain unchanged while documentation, complexity analysis, tagging, and other features can continue improving after the solution is created.

---

## Architecture

\`\`\`mermaid
flowchart TD
    A[GitHub Actions] -->|scheduled/manual trigger| B[sync.py]
    B --> C[LeetCode GraphQL API]
    B --> D[Local repository]
    C --> E[Submission processing]
    D --> E
    E --> F[Solution files .sql]
    E --> G[Metadata & notes JSON]
    F --> H[README generation]
    G --> H
\`\`\`

## Why Separate Notes From Solutions?

**Decision:** Solution code and personal documentation are stored in separate layers rather than as comments inside the submission itself.

- \`*.sql\` files - the submitted solution code and generated metadata (title, difficulty, timestamps, runtime)
- \`leetcode_notes.json\` - personal hints, explanations, and complexity notes
- \`leetcode_meta.json\` - generated repository metadata

**Why:** A common approach is writing notes directly into the LeetCode submission before solving. This project deliberately avoids that, so documentation can keep improving after a problem is solved without ever touching the original, already-submitted code - and so future automated analysis (complexity detection, pattern tagging, AI-assisted explanations - see [Incoming Features](#incoming-features)) has a clean layer to build on rather than parsing free-text comments out of code.

**Trade-off:** This adds a synchronization step where notes have to be correctly matched back to their solution file on every run, rather than using the simpler but less durable approach of directly editing the submission comment.

## Repository as the Source of Truth

**Decision:** The repository's own files are treated as ground truth, not the LeetCode API.

**Why:** Statistics are computed by counting existing \`.sql\` files on disk rather than trusting a running counter or re-querying the API. If LeetCode's API changes or synchronization temporarily breaks, the repository stays accurate and functional on its own.

**Trade-off:** Solution filenames are derived from the problem title, while metadata/notes are keyed by LeetCode's slug. These are expected to match but aren't strictly guaranteed to, a known constraint to keep in mind if problem titles ever contain unusual formatting.

## Credential Security

**Decision:** Authentication is handled entirely through GitHub Actions Secrets, never committed to source control.

**Why:** \`LEETCODE_SESSION\` and \`LEETCODE_USERNAME\` are injected as environment variables at runtime. Keeping credentials out of the repository entirely removes an entire class of accidental-exposure risk (no history to scrub, nothing to \`.gitignore\` correctly, nothing to accidentally push).

## Minimizing Unnecessary Repository Changes

**Decision:** Files are only written when their content actually changes.

**Why:** Generated output is diffed against the existing file before any write. This keeps the commit history meaningful (a commit means something actually changed), avoids triggering unnecessary downstream GitHub Actions runs, and reduces disk I/O on every sync.

## Example: Generated Solution File

\`leetcode/easy/find-users-with-valid-e-mails.sql\`

\`\`\`sql
-- Find Users With Valid E-Mails
-- https://leetcode.com/problems/find-users-with-valid-e-mails
-- difficulty: easy
-- first_seen: 2026-08-01 20:11:01 EDT
-- runtime: 744ms

/*
Notes:
Hint: use regexp_like to get case sensitivity for the suffix, or use an extra
like binary. Watch out for the period in the suffix, which is a wildcard, so
put it in square brackets. [TC: O(N), 1 pass]
*/

select *
from Users u
where regexp_like(u.mail, '^[a-zA-Z][a-zA-Z0-9._-]*@leetcode[.]com$', 'c')
\`\`\`

Every field above is generated automatically by \`sync.py\`: the header
(title, URL, difficulty, timestamp, runtime) and the code are written by
the sync engine on each run. The \`Notes\` block is the one exception as it's
independently maintained in \`leetcode_notes.json\` and re-injected into the
file without touching the surrounding code or header, so documentation can
keep improving without ever risking the submitted solution itself.

`,
        links: [
            { label: "GitHub Repo", url: "https://github.com/Cir9no-0001/CodeAtlas" }
        ]
    }, 
    
    "engineering-portfolio": {
        media: [
            {
                type: "image",
                src: "images/eng-1.png"
            },
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
        description: `## Overview`,
        links: [
            { label: "GitHub Repo", url: "https://github.com/Cir9no-0001/test-portfolio" }
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
    button.addEventListener('click', function () {

        // Select project info for see more panel
        const projectId = button.dataset.project;
        const data = projectInfo[projectId];
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
                    ${marked.parse(data.description)}
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

// Auto-rotate gallery items in each gallery every 3 seconds
galleries.forEach(function (gallery) {
    const galleryItems = gallery.querySelectorAll('.gallery-item');
    let currentIndex = 0;

    if (galleryItems.length > 1) {
        setInterval(function () {
            galleryItems[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % galleryItems.length;
            galleryItems[currentIndex].classList.add('active');
        }, 3000);
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