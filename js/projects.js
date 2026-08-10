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
        description: `
# Project Overview

## What is this?

An Active Directory security and networking lab built using VirtualBox to simulate a small enterprise environment.

The lab was designed to explore system administration, identity management, networking fundamentals, and introductory 
security concepts by building a Windows Server domain environment with connected client and attacker machines.

The environment included:

- A Windows Server 2019 Domain Controller
- A Windows 10 domain workstation
- A Kali Linux security testing machine

The goal was to understand how enterprise networks are structured, how users and policies are managed, and how 
security events can be monitored and investigated.

---

## Enterprise Network Setup

### Domain Controller Configuration

A Windows Server 2019 machine was configured as the Domain Controller by installing Active Directory Domain 
Services and creating a local enterprise-style domain environment.

DNS configuration and network troubleshooting were required to establish proper communication between the Domain 
Controller and workstation, providing practical experience with how domain environments rely on networking infrastructure.

### Workstation Integration

A Windows 10 workstation was joined to the Active Directory domain and configured to communicate with the Domain Controller.

This process involved troubleshooting IP addressing, DNS resolution, and connectivity issues to ensure successful domain authentication.

### Identity and Access Management

User management was implemented by creating:

- An administrative account for system management
- Employee accounts representing standard users

Users were organized into Organizational Units (OUs) to simulate how businesses separate departments and manage permissions.

### Group Policy Configuration

Basic Group Policy settings were configured to apply centralized security and management controls, including:

- Account password requirements
- Account lockout policies
- Windows update settings

---

# Security Scenarios

## Simulated Credential Attack and Detection

A Kali Linux machine was added to the network to simulate an external security testing environment.

Authentication attacks were performed against the domain environment to explore how weak credential practices 
can be exploited. Failed authentication attempts were then investigated using Windows Event Viewer on the Domain 
Controller to understand how security events are recorded and monitored.

This demonstrated the relationship between offensive security techniques and defensive monitoring practices.

## Network Traffic Analysis

Wireshark was used to inspect network traffic and explore how unencrypted HTTP communication can expose information transferred across a network.

This provided practical insight into why modern applications rely on encryption protocols such as HTTPS.

---

## Lessons Learned

This project provided hands-on experience with:

- Active Directory administration
- DNS and network troubleshooting
- User and organizational management
- Group Policy configuration
- Security event monitoring
- Basic network traffic analysis

The lab helped bridge the gap between theoretical cybersecurity concepts and practical enterprise IT infrastructure by demonstrating how systems are built, attacked, and monitored.
        `,
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
        description: `
# Project Overview

## What is this?

Simon Says V2 is an Arduino-based memory game inspired by Simon Says, built using an Ardunio UNO, a breadboard, 
four different colored LEDs, an IR remote, an LCD display, and a piezo. The game works by generating increasingly 
complex sequences of colored LED flashes that the user must memorize and reproduce using an IR remote controller.

The project combines embedded programming, circuit design, CAD design, and user interaction by integrating 
multiple electronic components into a functional electronic toy.

## Why I Made This

I created this project to explore embedded systems and gain practical experience working with microcontrollers, 
electronic components, and real-time user input processing.

The project allowed me to apply programming concepts such as arrays, random sequence generation, state management, 
and input validation while learning how hardware and software interact in a physical system.

# Tech Stack

- **Microcontroller:** Arduino Uno R3
- **Programming Language:** Arduino C/C++
- **Circuit Design & Simulation:** Tinkercad Circuits
- **Hardware Design & Build:** Tinkercad 3D Design + 3D Printing
- **Components:**
  - 16x2 I2C LCD Display
  - IR Receiver Module
  - IR Remote Controller
  - RGB LEDs (Red, Green, Blue, Yellow)
  - Piezo Buzzer
  - 1kΩ Current-Limiting Resistors
  - Breadboard and Jumper Wires

# Key Features

## Interactive Gameplay System

The game generates a random sequence of LED colors that increases in length as the player progresses. 
Each LED corresponds to a specific input from the IR remote, allowing the user to recreate the displayed pattern.

The Arduino continuously tracks user input, compares it against the generated sequence, and determines whether the player successfully completed the round.

Key gameplay features include:

- Randomized LED sequence generation
- Real-time IR remote input detection
- Sequence validation and error checking
- Increasing difficulty as rounds progress
- Audio and visual feedback during gameplay

## Difficulty and Progression System

Game difficulty from 1-5 can be set at the start of each new game playthrough which controls how fast the LED sequence flashes. 
Additionally, the difficulty gradually increases by extending the sequence length by one after every three successful rounds. This 
challenges the player’s memory and creates a progressive gameplay experience. 

The Arduino manages game states including:

- Starting a new game
- Displaying the current sequence
- Waiting for player input
- Checking answers
- Handling success and failure conditions
- Keeping track of current and high score

## User Interface and Feedback System

A 16x2 I2C LCD display provides players with real-time information throughout the game.

The display communicates important game states such as:

- Welcome/start messages
- Player instructions
- Difficulty increases
- Success messages
- Failure notifications
- Scorekeeping

Additional feedback is provided through:

- LED animations to display sequences
- Custom piezo buzzer tones for different LEDs and thier corresponding IR input

# Development Process

## Tinkercraft Circuits Prototyping

Before assembling the physical circuit, I designed and tested the system in Tinkercad Circuits 
to verify component connections and Arduino logic.

The simulation allowed me to validate:
- LED control and sequence behavior
- IR remote input handling
- LCD communication through the I2C interface
- Buzzer feedback functionality
- Overall gameplay logic before physical assembly

This reduced hardware debugging time and allowed me to iterate on the design more efficiently.

## CAD Design and 3D Printing

To transform the breadboard prototype into a more polished standalone device, I designed a 
custom enclosure using Tinkercad 3D Design. The enclosure was designed around the dimensions 
and placement of the Arduino, breadboard, LCD display, LEDs, buzzer, and IR receiver. The 
design required multiple iterations to account for real-world manufacturing limitations.

During refinement, I adjusted:
- Sliding-piece connections to improve fit while accounting for 3D printing tolerances (enclosure twist lock)
- Component spacing to prevent interference inside the enclosure
- Openings for the IR receiver to ensure reliable remote communication
- Mounting areas to securely position internal electronics

After finalizing the design, I 3D printed the enclosure and integrated the electronics into 
the final assembly. This process provided hands-on experience with CAD iteration, tolerance design
, and 3D printing.

## Assembly and Debugging

After completing the enclosure and circuit design, I assembled the electronics inside the 3D printed housing 
and tested the complete system.

Debugging involved both electrical and mechanical challenges, including:
- Resolving wiring and component connection issues
- Adjusting Arduino code and enclosure design for reliable user input detection
- Troubleshooting LCD and IR communication
- Modifying enclosure dimensions to improve component fit and accessibility
- Changing material and design choices (infill, hole types, snap lock tolerances)

# Final Product

The final product is a fully functional Arduino-based memory game enclosed inside a custom-designed 3D printed housing. The completed device integrates 
embedded programming, electronic hardware, and mechanical design into a standalone interactive system rather than a simple exposed breadboard prototype.

Players interact with the game through an IR remote controller, where their inputs are processed by the Arduino and compared against the generated 
LED sequence. The Arduino manages the entire gameplay system by controlling the LED patterns, tracking player progress, updating the LCD display, 
generating custom buzzer feedback, and managing difficulty progression and scoring.

The 3D printed enclosure was a critical component of the final design, requiring multiple iterations to achieve proper functionality and usability. 
The final enclosure securely houses the Arduino, breadboard, LCD display, LEDs, piezo buzzer, and IR receiver while maintaining accessibility for 
user interaction. Design challenges such as sliding-piece tolerances, snap-lock mechanisms, component clearance, and IR receiver placement required 
iterative adjustments between CAD design and physical testing.

Through the complete development process, I gained experience with the full engineering design cycle: designing and simulating circuits, developing 
embedded software, creating mechanical CAD models, manufacturing physical components, and refining prototypes based on testing results. The final device 
demonstrates the integration of software, electronics, and mechanical systems to create a functional and user-focused product.
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

---

## Repository Structure
    .
    ├── sync.py
    ├── leetcode_meta.json
    ├── leetcode_notes.json
    ├── leetcode_stats.json
    ├── README.md
    │
    └── leetcode/
        ├── easy/
        │   └── *.sql
        │
        ├── medium/
        │   └── *.sql
        │
        └── hard/
            └── *.sql

---

## Design Decisions

### Why Separate Notes From Solutions?

**Decision:** Solution code and personal documentation are stored in separate layers rather than as comments inside the submission itself.

- \`*.sql\` files - the submitted solution code and generated metadata (title, difficulty, timestamps, runtime)
- \`leetcode_notes.json\` - personal hints, explanations, and complexity notes
- \`leetcode_meta.json\` - generated repository metadata

**Why:** A common approach is writing notes directly into the LeetCode submission before solving. This project deliberately avoids that, so documentation can keep improving after a problem is solved without ever touching the original, already-submitted code - and so future automated analysis (complexity detection, pattern tagging, AI-assisted explanations - see [Incoming Features](#incoming-features)) has a clean layer to build on rather than parsing free-text comments out of code.

**Trade-off:** This adds a synchronization step where notes have to be correctly matched back to their solution file on every run, rather than using the simpler but less durable approach of directly editing the submission comment.

### Repository as the Source of Truth

**Decision:** The repository's own files are treated as ground truth, not the LeetCode API.

**Why:** Statistics are computed by counting existing \`.sql\` files on disk rather than trusting a running counter or re-querying the API. If LeetCode's API changes or synchronization temporarily breaks, the repository stays accurate and functional on its own.

**Trade-off:** Solution filenames are derived from the problem title, while metadata/notes are keyed by LeetCode's slug. These are expected to match but aren't strictly guaranteed to, a known constraint to keep in mind if problem titles ever contain unusual formatting.

### Credential Security

**Decision:** Authentication is handled entirely through GitHub Actions Secrets, never committed to source control.

**Why:** \`LEETCODE_SESSION\` and \`LEETCODE_USERNAME\` are injected as environment variables at runtime. Keeping credentials out of the repository entirely removes an entire class of accidental-exposure risk (no history to scrub, nothing to \`.gitignore\` correctly, nothing to accidentally push).

### Minimizing Unnecessary Repository Changes

**Decision:** Files are only written when their content actually changes.

**Why:** Generated output is diffed against the existing file before any write. This keeps the commit history meaningful (a commit means something actually changed), avoids triggering unnecessary downstream GitHub Actions runs, and reduces disk I/O on every sync.

---

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
        description: `
# Project Overview

## What is this?

My Engineering Portfolio is a custom-built website designed to showcase my engineering projects, technical skills, 
and experience through an interactive web interface rather than relying on a static resume or template. The website 
was built from scratch to provide a centralized and structured way to explore my work where my engineering projects 
can be searched, filtered, and opened into detailed views containing documentation, images, videos, technical information, 
and project-specific resources/links. This portfolio is designed to evolve alongside my engineering work, allowing new 
projects and technical experience to be added without restructuring the entire website. Additionally, it serves as a direct
method of communication to others who want to know more about me and get in contact with me through various socials in one place.

## Tech Stack

- **Frontend:** HTML5, CSS3, JavaScript
- **Markdown Rendering:** Marked.js
- **Diagrams:** Mermaid.js
- **HTML Sanitization:** DOMPurify
- **Version Control:** Git & GitHub
- **Development Environment:** Visual Studio Code
- **Deployment:** GitHub Pages

## Key Features

### Project Search and Filtering System

The projects page includes a JavaScript-powered filtering system designed to help users navigate the growing project archive.

Implemented functionality includes:

- Keyword searching across project titles and descriptions
- Filtering projects by technology tags
- Filtering by completion status
- Filtering by project difficulty
- Sorting projects by creation date
- Dynamic updating of visible project cards without refreshing the page

Project metadata is stored alongside each project element, allowing JavaScript to efficiently determine which projects match the 
selected filters.

### Project Documentation

Project documentation is separated from the website layout by storing each project's content as structured
data inside the JavaScript project information object. When a project is opened, JavaScript retrieves the
corresponding project data, generates the media gallery, tags, links, and metadata, converts the Markdown
description into HTML using Marked.js, sanitizes the output using DOMPurify, and renders the final content
inside the reusable project modal.

This approach allows every project to follow the same display structure while maintaining unique
documentation, media, technical details, and resources without creating separate HTML pages.

Each expanded project panel contains:

- A project header with title and date
- An interactive project media gallery system with videos and images
- A full list of major and minor skill tags used in the project
- An expandable and collapsible project description
- Links to project resources

### Skills Showcase

- Skills organized by category
- Interactive skill cards with icons
- Detailed skill descriptions of how skills have been used through modal windows
- Redirect button to projects associated with individual technologies for direct proof

### User Interface

- Responsive layouts using flexible CSS layouts and adaptive sizing
- Sticky navigation bar shared across pages for consistent site navigation
- Hero landing page with animated background movement based on user interaction
- Animated hover states and transitions for cards, buttons, and interactive elements
- Modal-based interfaces for displaying detailed project and skill information
- Image lightbox system for expanding project images in project panel gallery
- Persistent music toggle for background audio controls
- Custom 404 page with embedded fallback content

## Why was this built?

Traditional resumes and static portfolios provide limited space to demonstrate the technical 
work behind a project. A list of technologies and project titles can show what was built, but 
not how the projects were developed or what they contain. This portfolio was built to provide 
a more interactive and detailed way to present engineering work. Each project can have its own 
documentation, media, technical details, and external resources while remaining accessible through 
a single centralized interface. The website itself also serves as a software project, providing 
an opportunity to apply frontend development, UI/UX design, JavaScript programming, content 
organization, and version control to a practical application.

---

# Architecture

\`\`\`mermaid
flowchart TD
    A[HTML Pages] --> B[Shared Styling]
    A --> C[JavaScript Modules]

    B --> D[Responsive User Interface]

    C --> E[index.js]
    C --> F[projects.js]
    C --> G[contact.js]
    C --> H[common.js]

    F --> I[Project Search & Filtering]
    F --> J[Project Documentation System]
    F --> K[Project Modal Interface]
    F --> L[Gallery & Lightbox]

    J --> M[Markdown Strings in projectInfo]
    M --> N[Marked.js]
    M --> O[Mermaid.js]
    M --> P[DOMPurify]

    E --> Q[Hero & Skill Interactions]
    G --> R[Contact Features]

    I --> D
    K --> D
    L --> D
    Q --> D
    R --> D
\`\`\`

---

## Design Decisions

### Dynamic Project Documentation Rendering

**Decision:** Project descriptions are stored as structured Markdown strings inside the JavaScript 
project data object and dynamically rendered inside reusable project modals instead of creating 
separate HTML pages for each project.

**Why:** A traditional portfolio often requires manually creating individual pages or HTML sections 
for every project, which creates duplicated layouts and increases maintenance complexity. This portfolio 
separates project content from the interface structure by storing project information, media, tags, links, 
and documentation as reusable data objects.

When a user opens a project, the system:

- Retrieves the selected project's data from the JavaScript project information object
- Generates the project gallery, tags, links, and metadata dynamically
- Converts the Markdown description into HTML using Marked.js
- Sanitizes the generated HTML using DOMPurify
- Inserts the final content into the reusable project modal interface

This creates a scalable documentation system where new projects can be added by creating a structured 
project entry rather than manually developing new webpage layouts.

**Trade-off:** Storing documentation inside JavaScript increases the size of the project script and 
requires updating the source code when adding new projects, but it allows all project rendering logic 
and content management to remain centralized within the existing frontend architecture.

### Metadata-Driven Project Organization

**Decision:** Projects are organized using embedded metadata attributes rather than manually maintaining 
separate filtering lists.

**Why:** The project search and filtering system requires a reliable way to identify project properties 
such as technologies, difficulty, status, and creation date. Metadata stored alongside each project allows 
JavaScript to dynamically evaluate filtering conditions without requiring hardcoded logic for every individual project.

This enables:
- Technology-based filtering
- Difficulty filtering
- Completion status filtering
- Date-based sorting
- Keyword searching

As the project archive grows, new projects can be integrated into the existing filtering system by following the same metadata structure.

**Trade-off:** Maintaining accurate metadata becomes an additional responsibility when adding or updating projects.

---

### Skills as Evidence-Based Navigation

**Decision:** Skill cards do not only display technologies; they provide direct navigation to 
projects demonstrating practical usage of each skill.

**Why:** Listing technical skills without evidence provides limited context. The skill system was 
designed to connect claimed abilities with completed work by allowing users to select a technology 
and immediately view related projects.

The workflow is:

1. User selects a skill card from the skills section
2. A modal displays information about the skill and how it has been applied
3. The user can navigate directly to the projects page
4. The project filter automatically activates to display projects using that technology

This creates a direct connection between technical skills and supporting project evidence rather 
than presenting skills as isolated keywords.

**Trade-off:** Each skill requires accurate project tagging to ensure filtered results remain relevant.


### Secure Client-Side Content Rendering

**Decision:** Dynamically generated project documentation is sanitized before being inserted into the webpage.

**Why:** Project descriptions are stored as Markdown strings inside the JavaScript project data object 
and converted into HTML when a user opens a project modal. Since generated HTML is inserted into the DOM 
dynamically, directly rendering the output could introduce security risks if unsafe content is included.

The rendering pipeline is:

Markdown String → Marked.js HTML Conversion → DOMPurify Sanitization → Modal Rendering

DOMPurify acts as a security layer by filtering potentially unsafe HTML elements and attributes before 
the content is displayed to users. This allows project documentation to support rich formatting such as 
headings, lists, code blocks, and diagrams while reducing the risks associated with dynamic HTML injection.

**Trade-off:** Sanitization limits certain HTML features that may be useful for advanced customization, 
requiring documentation to follow the allowed formatting rules supported by the sanitizer.


### Modular JavaScript Architecture

**Decision:** JavaScript functionality is separated into page-specific modules instead of placing 
all logic inside a single script.

**Why:** Different pages require different functionality:

- \`common.js\` handles shared site-wide features
- \`index.js\` manages homepage interactions
- \`projects.js\` controls project loading, filtering, modals, and galleries
- \`contact.js\` manages contact page functionality

Separating responsibilities reduces code coupling, improves maintainability, and makes future feature development easier.

**Trade-off:** Multiple files require clearer organization and dependency management compared to a single script.        

        `,
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
                    ${DOMPurify.sanitize(marked.parse(data.description))}
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