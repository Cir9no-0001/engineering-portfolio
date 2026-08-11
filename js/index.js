/* Hero landing page code below */

document.body.classList.add("hero-active");
history.scrollRestoration = "manual";

// Select hero page, main content, and down arrow elements
const hero = document.getElementById("hero");
const content = document.getElementById("content");
const arrow = document.querySelector(".down-arrow");

// Detect how the user entered the page
const navigation = performance.getEntriesByType("navigation")[0];

// Check if user arrived from another page within this website
const cameFromAnotherPage =
    document.referrer &&
    new URL(document.referrer).origin === window.location.origin &&
    !navigation.type.includes("reload");

// Remove hero page when navigating back from another page
if (cameFromAnotherPage) {
    hero.style.display = "none";
    document.body.classList.remove("hero-active");

    window.scrollTo({
        top: 0,
        behavior: "instant"
    });
}

// Listen for click on down arrow and scroll then hide hero page
arrow.addEventListener("click", function(event) {
    event.preventDefault();

    document.body.classList.remove("hero-active");

    content.scrollIntoView({
        behavior: "smooth"
    });

    setTimeout(() => {
        hero.style.display = "none";
    }, 650);
});

// Hero parallax effect
function initializeHeroParallax() {
    const hero = document.querySelector(".hero");

    hero.addEventListener("mousemove", function(event) {
        const x =
            event.clientX / window.innerWidth - 0.5;

        const y =
            event.clientY / window.innerHeight - 0.5;

        const intensity = 40;
        
        hero.style.setProperty(
            "--hero-x",
            `${x * -intensity}px`
        );

        hero.style.setProperty(
            "--hero-y",
            `${y * -intensity}px`
        );

    });

    hero.addEventListener("mouseleave", function() {

        hero.style.setProperty(
            "--hero-x",
            "0px"
        );

        hero.style.setProperty(
            "--hero-y",
            "0px"
        );

    });
}

initializeHeroParallax();

/* Technical skills chart code below */

// Stores descriptions for each skill displayed in the skill modal
const skillInfo = {
    python: "Used for scripting, automation, API integration, file manipulation, and processing structured data. I have used Python to automate repetitive tasks, interact with external APIs, manage generated files, and build tools that handle data without requiring manual intervention.",

    java: "Used throughout my ICS3U and ICS4U courses to develop my understanding of object-oriented programming, program structure, control flow, data structures, and application development. This gave me a strong foundation in structured programming and software design.",

    cpp: "Used for embedded and systems-oriented programming where software needs to interact directly with hardware. I have worked with C++ to implement program logic, handle user input, control hardware components, and manage the constraints of microcontroller-based systems.",

    css: "Used to design and control the visual presentation of web interfaces, including layouts, responsive elements, animations, navigation, modals, and interactive components. I have written CSS from scratch to create custom interfaces rather than relying on pre-built templates.",

    html: "Used to structure web pages and organize content into semantic, maintainable components. I have built pages from scratch using structured elements for navigation, project displays, forms, media, interactive sections, and reusable page layouts.",

    javascript: "Used to add dynamic behavior and interactivity to web interfaces, including event handling, DOM manipulation, filtering, search, media controls, modals, animations, and dynamically generated content. I have also used JavaScript to connect different parts of a frontend and manage client-side state.",

    mysql: "Used primarily to practice relational database querying through SQL problems and small database experiments. I have worked with joins, filtering, aggregation, subqueries, string manipulation, and other query operations while using hands-on examples to deepen my understanding of how relational databases work.",

    git: "Used for version control, tracking changes, managing project history, and maintaining organized development workflows. I regularly use commits and branches to keep changes manageable and preserve working versions while developing and debugging projects.",

    github: "Used to host and maintain source code, document development work, and manage repositories. I have also used GitHub Actions to automate tasks such as scheduled scripts, file synchronization, generated documentation, and repository updates.",

    vscode: "Used as my primary development environment for writing, debugging, organizing, and managing code across multiple languages. I use it for web development, scripting, SQL, configuration files, and general project development.",

    windows: "Used for software development, system administration, and configuring Windows-based infrastructure. I have worked with Windows Server administration, Active Directory, user and organizational unit management, Group Policy, DNS, and authentication within controlled environments.",

    linux: "Used for system administration, command-line work, scripting, networking, and security testing. I have worked with Linux environments to interact with systems, troubleshoot configurations, run security tools, and perform controlled testing against network infrastructure.",

    virtualbox: "Used to create and manage isolated virtual machines for development, testing, and systems experimentation. I have configured multiple operating systems within virtualized environments and used virtual networking to allow them to communicate as part of simulated infrastructure.",

    arduino: "Used to develop embedded systems that combine software with physical hardware. I have programmed microcontrollers to process user input, control LEDs and audio output, implement interactive logic, and interface with electronic components.",

    cad: "Used for digital mechanical design and physical prototyping, including creating parts intended to be fabricated and integrated with electronic hardware. I have used CAD to translate physical requirements into designed components while considering dimensions, fit, and practical assembly."
};

// Select modal and skill card elements
const skillModal = document.querySelector('#skill-modal');
const modalContent = skillModal.querySelector('.modal-content');
const skillCards = document.querySelectorAll('.skill-card');

// Add click event to each skill card for info
skillCards.forEach(function (card) {
    card.addEventListener('click', function () {
        const skill = card.dataset.skill;
        const description = skillInfo[skill];

        modalContent.innerHTML = `
            <h2>${card.querySelector('.skill-name').textContent}</h2>
            <hr class="skill-separator">
            <p class="skill-description">${description}</p>
            <a href="projects.html?skill=${skill}" class="modal-link">See projects using this skill →</a>
        `;

        skillModal.classList.remove('hidden');
        hideNavbar();
    });
});

// Close modal when user clicks outside the content area
skillModal.addEventListener('click', function (event) {
    if (event.target === skillModal) {
        skillModal.classList.add('hidden');
        showNavbar();
    }
});