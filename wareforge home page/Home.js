// Data Analyst Projects Database
const projects = [{
        id: 1,
        number: "01",
        title: "Dynamic Warehouses",
        category: "Warehouse Management",
        description: "Create multiple warehouses and define their length and breadth to match the actual physical space you use.",
        tech: ["Warehouse Management", "Dynamic Layout", "Custom Dimensions"],
        color: "#2dd9f0", // app cyan
        metrics: {
            warehouses: "Multiple",
            dimensions: "Custom",
            layout: "Dynamic"
        },
        details: {
            challenge: "Traditional warehouse systems often rely on fixed layouts that do not adapt easily to different warehouse sizes and physical spaces.",
            solution: "WareForge allows users to create warehouses with custom length and breadth dimensions, giving them complete control over their warehouse layout.",
            results: [
                "Create multiple warehouses",
                "Define custom warehouse dimensions",
                "Match digital layouts with physical warehouse spaces",
                "Manage every warehouse from one application"
            ]
        }
    },

    {
        id: 2,
        number: "02",
        title: "Custom Zones",
        category: "Warehouse Organization",
        description: "Divide each warehouse into custom zones and manage their size, position, and information as the warehouse layout changes.",
        tech: ["Dynamic Zones", "Layout Management", "Warehouse Mapping"],
        color: "#ffb020", // app amber
        metrics: {
            zones: "Unlimited",
            editing: "Flexible",
            layout: "Custom"
        },
        details: {
            challenge: "Warehouse layouts change over time, making fixed zone structures difficult to maintain and update.",
            solution: "WareForge lets users create, rename, edit, resize, reposition, and remove zones according to their operational requirements.",
            results: [
                "Create custom zones inside warehouses",
                "Rename zones whenever required",
                "Resize and reposition zones",
                "Edit or remove existing zones",
                "Maintain a flexible warehouse layout"
            ]
        }
    },

    {
        id: 3,
        number: "03",
        title: "Inventory Management",
        category: "Inventory Management",
        description: "Track inventory items inside warehouse zones along with their quantities and minimum stock thresholds.",
        tech: ["Inventory Tracking", "Stock Monitoring", "Threshold Management"],
        color: "#34e0a1", // app emerald
        metrics: {
            items: "Trackable",
            stock: "Real-time",
            threshold: "Custom"
        },
        details: {
            challenge: "Managing inventory across multiple warehouse zones can make it difficult to know what is available and which items need replenishment.",
            solution: "WareForge connects inventory with warehouse zones and allows users to maintain item quantities and minimum stock thresholds.",
            results: [
                "Track items by warehouse and zone",
                "Maintain item quantities",
                "Set minimum stock thresholds",
                "Identify low-stock items easily",
                "Keep inventory organized by location"
            ]
        }
    },

    {
        id: 4,
        number: "04",
        title: "Search & Table Views",
        category: "Data Management",
        description: "Quickly search for any item and view warehouse, zone, quantity, and stock information through structured tables.",
        tech: ["Global Search", "Data Tables", "Inventory Analytics"],
        color: "#b48cff", // app violet
        metrics: {
            search: "Global",
            views: "Table",
            access: "Fast"
        },
        details: {
            challenge: "Finding specific inventory across multiple warehouses and zones can become time-consuming when information is spread across different locations.",
            solution: "WareForge provides centralized search and structured table views so users can quickly locate and review inventory information.",
            results: [
                "Search for any inventory item",
                "View warehouse and zone information",
                "Review quantities and minimum thresholds",
                "Identify stock status quickly",
                "Access organized inventory data"
            ]
        }
    },

    {
        id: 5,
        number: "05",
        title: "Excel Data Support",
        category: "Data Import & Export",
        description: "Import and export warehouse and inventory information through Excel to make large-scale data management easier.",
        tech: ["Excel", "Data Import", "Data Export"],
        color: "#12b886", // app emerald-2
        metrics: {
            format: "Excel",
            workflow: "Import / Export",
            data: "Scalable"
        },
        details: {
            challenge: "Manually entering large amounts of warehouse and inventory data can be inefficient and time-consuming.",
            solution: "WareForge supports Excel-based data workflows, allowing users to extend, update, import, and export application data.",
            results: [
                "Import warehouse and inventory data",
                "Export application data",
                "Handle large datasets more efficiently",
                "Update existing information through Excel",
                "Reduce manual data entry"
            ]
        }
    },

    {
        id: 6,
        number: "06",
        title: "Controlled Access",
        category: "User Access Management",
        description: "Access is granted directly, not self-signup — the admin hands out a link, then assigns each teammate an Editor or Viewer role.",
        tech: ["Role-Based Access", "Admin-Granted Links", "Permissions"],
        color: "#ff7a3d", // app amber-2
        metrics: {
            roles: "3",
            control: "Admin",
            access: "Invite-Only"
        },
        details: {
            challenge: "Warehouse information may need to be shared with different users while preventing unauthorized changes to important data.",
            solution: "WareForge has no public sign-up — the admin creates each access link directly and assigns it an Admin, Editor, or Viewer role.",
            results: [
                "Admin has full control and grants every link personally",
                "Editors can update zones, items, and quantities",
                "Viewers can see everything without being able to change it",
                "Access can be deactivated at any time without deleting data",
                "Protect warehouse information from unauthorized changes"
            ]
        }
    }
];

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    renderProjects();
    animateStats();
    initSmoothScroll();
    initSkillBars();
    init3DEffects();
    loadHeroVisual();
    initNavScrollSpy();
    initLiveAnalysis();
});

// Fetches the standalone hero floor-plan SVG (assets/hero-floor-plan.svg)
// and injects it into the page, then wires it up with initHeroVisual().
// Injecting the markup (rather than using <img> or <object>) keeps the
// SVG in the same document, so styles.css classes like .wf-zone still
// apply and script.js can still reach #wfScene / #wfStatusText directly.
function loadHeroVisual() {
    var container = document.getElementById('heroVisual');
    if (!container) return;

    fetch('assets/hero-floor-plan.svg')
        .then(function(response) {
            if (!response.ok) throw new Error('Failed to load hero-floor-plan.svg');
            return response.text();
        })
        .then(function(svgMarkup) {
            container.innerHTML = svgMarkup;
            initHeroVisual();
        })
        .catch(function(err) {
            // If the SVG can't be fetched (e.g. opened via file:// without a
            // local server), fail quietly rather than leaving a broken layout.
            console.warn('Hero visual could not be loaded:', err);
        });
}

// Hero floor-plan SVG: cycling status readout + mouse-parallax tilt
function initHeroVisual() {
    // Cycle the status readout so the panel feels alive
    var states = ['DYNAMIC', 'SYNCED', 'LIVE'];
    var i = 0;
    var statusText = document.getElementById('wfStatusText');
    if (statusText) {
        setInterval(function() {
            i = (i + 1) % states.length;
            statusText.textContent = '● ' + states[i];
        }, 2200);
    }

    // Subtle mouse-parallax tilt on the whole floor plan
    var container = document.querySelector('.hero-visual');
    var scene = document.getElementById('wfScene');
    if (container && scene) {
        container.addEventListener('mousemove', function(e) {
            var rect = container.getBoundingClientRect();
            var x = (e.clientX - rect.left) / rect.width - 0.5;
            var y = (e.clientY - rect.top) / rect.height - 0.5;
            scene.style.transform = 'translate(' + (x * 8) + 'px,' + (y * 8) + 'px)';
        });
        container.addEventListener('mouseleave', function() {
            scene.style.transform = 'translate(0,0)';
        });
    }
}

// Render projects to the grid
function renderProjects() {
    const projectsGrid = document.getElementById('projectsGrid');

    projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.style.setProperty('--project-color', project.color);
        card.onclick = () => openProjectModal(project);

        card.innerHTML = `
            <div class="project-header">
                <span class="project-number">${project.number}</span>
                <span class="project-category">${project.category}</span>
            </div>
            <div class="project-body">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tech">
                    ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                <div class="project-metrics">
                    ${Object.entries(project.metrics).map(([key, value]) => `
                        <div class="metric">
                            <span class="metric-value">${value}</span>
                            <span class="metric-label">${key}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        projectsGrid.appendChild(card);
    });

    // Add 3D tilt effect to cards after they're rendered
    add3DTiltToCards();
}

// 3D Tilt Effect on Project Cards
function add3DTiltToCards() {
    const cards = document.querySelectorAll('.project-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', handleCardTilt);
        card.addEventListener('mouseleave', resetCardTilt);
    });
}

function handleCardTilt(e) {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 15;
    const rotateY = (centerX - x) / 15;

    card.style.transform = `
        perspective(1000px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        translateY(-15px)
        scale(1.02)
    `;
}

function resetCardTilt(e) {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
}

// Animate hero stats counter
function animateStats() {
    const stats = document.querySelectorAll('.stat-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.count);
                const numberEl = entry.target.querySelector('.stat-number');
                animateCounter(numberEl, 0, target, 2000);
                observer.unobserve(entry.target);
            }
        });
    });

    stats.forEach(stat => observer.observe(stat));
}

function animateCounter(element, start, end, duration) {
    const startTime = performance.now();
    const isLarge = end > 10000;

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function
        const easeOutQuad = progress * (2 - progress);
        const current = Math.floor(start + (end - start) * easeOutQuad);

        if (isLarge) {
            element.textContent = (current / 1000000).toFixed(1) + 'M+';
        } else {
            element.textContent = current + '+';
        }

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

// Smooth scroll navigation
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function scrollToSection(id) {
    const section = document.getElementById(id);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth'
        });
    }
}

// Initialize skill bars animation
function initSkillBars() {
    const skillCards = document.querySelectorAll('.skill-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target.querySelector('.skill-bar');
                const level = entry.target.dataset.skill + '%';
                setTimeout(() => {
                    skillBar.style.width = level;
                }, 200);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    skillCards.forEach(card => observer.observe(card));
}

// Open project modal
function openProjectModal(project) {
    const modal = document.getElementById('projectModal');
    const modalBody = document.getElementById('modalBody');

    modalBody.innerHTML = `
        <div class="project-modal-content" style="--project-color: ${project.color}">
            <div class="modal-header-section">
                <span class="modal-project-number" style="color: ${project.color}">${project.number}</span>
                <h2 class="modal-project-title">${project.title}</h2>
                <span class="modal-project-category" style="border-color: ${project.color}; color: ${project.color}">
                    ${project.category}
                </span>
            </div>
            
            <div class="modal-section">
                <h3 class="modal-section-title" style="color: ${project.color}">Challenge</h3>
                <p class="modal-text">${project.details.challenge}</p>
            </div>
            
            <div class="modal-section">
                <h3 class="modal-section-title" style="color: ${project.color}">Solution</h3>
                <p class="modal-text">${project.details.solution}</p>
            </div>
            
            <div class="modal-section">
                <h3 class="modal-section-title" style="color: ${project.color}">Key Results</h3>
                <ul class="modal-results-list">
                    ${project.details.results.map(result => `
                        <li class="modal-result-item">
                            <span class="result-bullet" style="background: ${project.color}"></span>
                            ${result}
                        </li>
                    `).join('')}
                </ul>
            </div>
            
            <div class="modal-section">
                <h3 class="modal-section-title" style="color: ${project.color}">Technologies Used</h3>
                <div class="modal-tech-grid">
                    ${project.tech.map(tech => `
                        <span class="modal-tech-tag" style="border-color: ${project.color}">
                            ${tech}
                        </span>
                    `).join('')}
                </div>
            </div>
            
            <div class="modal-metrics-grid">
                ${Object.entries(project.metrics).map(([key, value]) => `
                    <div class="modal-metric">
                        <div class="modal-metric-value" style="color: ${project.color}">${value}</div>
                        <div class="modal-metric-label">${key.toUpperCase()}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    // Add modal-specific styles
    addModalStyles();

    modal.classList.add('active');
    lockBodyScroll();
}

// Close project modal
function closeModal() {
    const modal = document.getElementById('projectModal');
    modal.classList.remove('active');
    unlockBodyScroll();
}

// Locks background scroll behind the modal in a way that also works
// reliably on iOS Safari, where `overflow: hidden` on <body> alone does
// not prevent the page from scrolling underneath a fixed-position modal
// (this is what made the close button feel "broken" on mobile - the
// modal would drift out of the visible viewport as the page scrolled
// behind it). Pinning the body at its current scroll offset avoids that.
let scrollLockOffset = 0;

function lockBodyScroll() {
    scrollLockOffset = window.pageYOffset || document.documentElement.scrollTop || 0;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollLockOffset}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';
}

function unlockBodyScroll() {
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    document.body.style.width = '';
    window.scrollTo(0, scrollLockOffset);
}

// Close modal on escape key
document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;

    const lightbox = document.getElementById('imageLightbox');
    if (lightbox && lightbox.classList.contains('active')) {
        closeLightbox();
        return;
    }

    closeModal();
});

// Image lightbox for the "See WareForge in Action" tour screenshots.
// Reuses the same lockBodyScroll()/unlockBodyScroll() helpers as the
// feature modal, so scroll gets locked/restored the same reliable way.
function openLightbox(imgEl) {
    const lightbox = document.getElementById('imageLightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    if (!lightbox || !lightboxImage) return;

    lightboxImage.src = imgEl.src;
    lightboxImage.alt = imgEl.alt || '';
    lightbox.classList.add('active');
    lockBodyScroll();
}

function closeLightbox() {
    const lightbox = document.getElementById('imageLightbox');
    if (!lightbox) return;

    lightbox.classList.remove('active');
    unlockBodyScroll();
}

// Add modal styles dynamically
function addModalStyles() {
    if (document.getElementById('modal-dynamic-styles')) return;

    const style = document.createElement('style');
    style.id = 'modal-dynamic-styles';
    style.textContent = `
        .project-modal-content {
            animation: fadeIn 0.5s ease;
        }
        
        .modal-header-section {
            margin-bottom: 3rem;
            text-align: center;
        }
        
        .modal-project-number {
            font-family: 'JetBrains Mono', monospace;
            font-size: 4rem;
            font-weight: 700;
            opacity: 0.2;
            display: block;
            line-height: 1;
        }
        
        .modal-project-title {
            font-family: 'Oswald', 'Inter', sans-serif;
            font-size: 2.5rem;
            font-weight: 600;
            margin: 1rem 0;
            color: var(--text-primary);
        }
        
        .modal-project-category {
            display: inline-block;
            padding: 0.5rem 1.5rem;
            border: 2px solid;
            border-radius: 25px;
            font-size: 0.9rem;
            text-transform: uppercase;
            letter-spacing: 2px;
            font-weight: 600;
        }
        
        .modal-section {
            margin-bottom: 2.5rem;
        }
        
        .modal-section-title {
            font-family: 'Oswald', 'Inter', sans-serif;
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 1rem;
            display: flex;
            align-items: center;
            gap: 1rem;
        }
        
        .modal-section-title::before {
            content: '';
            width: 4px;
            height: 24px;
            background: currentColor;
        }
        
        .modal-text {
            color: var(--text-secondary);
            line-height: 1.8;
            font-size: 1.1rem;
        }
        
        .modal-results-list {
            list-style: none;
            padding: 0;
        }
        
        .modal-result-item {
            display: flex;
            align-items: flex-start;
            gap: 1rem;
            margin-bottom: 1rem;
            color: var(--text-secondary);
            line-height: 1.7;
            font-size: 1.05rem;
        }
        
        .result-bullet {
            min-width: 8px;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            margin-top: 0.5rem;
        }
        
        .modal-tech-grid {
            display: flex;
            flex-wrap: wrap;
            gap: 1rem;
        }
        
        .modal-tech-tag {
            padding: 0.7rem 1.5rem;
            border: 2px solid;
            border-radius: 8px;
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.95rem;
            font-weight: 600;
            background: rgba(255, 255, 255, 0.02);
            transition: all 0.3s ease;
        }
        
        .modal-tech-tag:hover {
            background: rgba(255, 255, 255, 0.05);
            transform: translateY(-2px);
        }
        
        .modal-metrics-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 1.5rem;
            margin-top: 3rem;
            padding-top: 2rem;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .modal-metric {
            text-align: center;
            padding: 1.5rem;
            background: rgba(255, 255, 255, 0.02);
            border-radius: 8px;
            border: 1px solid rgba(255, 255, 255, 0.05);
        }
        
        .modal-metric-value {
            font-family: 'JetBrains Mono', monospace;
            font-size: 2rem;
            font-weight: 700;
            display: block;
            margin-bottom: 0.5rem;
        }
        
        .modal-metric-label {
            font-size: 0.85rem;
            color: var(--text-secondary);
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        @media (max-width: 768px) {
            .modal-project-title {
                font-size: 1.8rem;
            }
            
            .modal-metrics-grid {
                grid-template-columns: 1fr;
            }
        }
    `;

    document.head.appendChild(style);
}

// 3D Effects initialization
function init3DEffects() {
    // Add parallax effect to expertise items
    const expertiseItems = document.querySelectorAll('.expertise-item');

    expertiseItems.forEach(item => {
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateY = (x - centerX) / 10;
            const rotateX = (centerY - y) / 10;

            item.style.transform = `
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translateZ(20px)
                translateY(-10px)
            `;
        });

        item.addEventListener('mouseleave', () => {
            item.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0) translateY(0)';
        });
    });

    // Add 3D effect to contact cards
    const contactCards = document.querySelectorAll('.contact-card');

    contactCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateY = (x - centerX) / 20;
            const rotateX = (centerY - y) / 20;

            card.style.transform = `
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translateY(-10px)
                translateZ(20px)
            `;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) translateZ(0)';
        });
    });

    // Gentle tilt + cycling status readout on the "Get Access" card
    const accessCard = document.getElementById('accessCard');

    if (accessCard) {
        accessCard.addEventListener('mousemove', (e) => {
            const rect = accessCard.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateY = (x - centerX) / 60;
            const rotateX = (centerY - y) / 60;

            accessCard.style.transform = `
                perspective(1400px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translateY(-4px)
            `;
        });

        accessCard.addEventListener('mouseleave', () => {
            accessCard.style.transform = 'perspective(1400px) rotateX(0) rotateY(0) translateY(0)';
        });

        const states = ['ONLINE', 'AVAILABLE', 'READY'];
        let stateIndex = 0;
        const statusText = document.getElementById('accessStatusText');

        if (statusText) {
            setInterval(() => {
                stateIndex = (stateIndex + 1) % states.length;
                statusText.textContent = '● ' + states[stateIndex];
            }, 2400);
        }
    }
}

// Navbar: floating "scrolled" state + mobile hamburger menu
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const navOverlay = document.getElementById('navOverlay');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 40) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

function openMobileNav() {
    navLinks.classList.add('active');
    navOverlay.classList.add('active');
    navToggle.classList.add('active');
    navToggle.setAttribute('aria-expanded', 'true');
}

function closeMobileNav() {
    navLinks.classList.remove('active');
    navOverlay.classList.remove('active');
    navToggle.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
}

if (navToggle && navLinks && navOverlay) {
    navToggle.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            closeMobileNav();
        } else {
            openMobileNav();
        }
    });

    // Tapping a link, the overlay, or Escape closes the mobile menu
    navLinks.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', closeMobileNav);
    });

    navOverlay.addEventListener('click', closeMobileNav);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeMobileNav();
    });
}

// Scroll-spy: highlights the nav link for whichever section is
// currently in view as a filled "bubble", desktop capsule nav style.
function initNavScrollSpy() {
    const sections = Array.from(document.querySelectorAll('section[id]'));
    const links = Array.from(document.querySelectorAll('.nav-link'));
    if (!sections.length || !links.length) return;

    const linkFor = (id) => links.find(link => link.getAttribute('href') === `#${id}`);

    const setActive = (id) => {
        links.forEach(link => link.classList.remove('active'));
        const activeLink = linkFor(id);
        if (activeLink) activeLink.classList.add('active');
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setActive(entry.target.id);
            }
        });
    }, {
        // Treat a section as "current" once it's near the top of the
        // viewport, just below the floating navbar.
        rootMargin: '-45% 0px -50% 0px',
        threshold: 0
    });

    sections.forEach(section => observer.observe(section));
}

// Copy email address to clipboard from the "Connect with me" card
function copyEmail(button) {
    const email = 'gargmohit0104@gmail.com';
    const label = button.querySelector('span');
    const originalText = label.textContent;

    const restore = () => {
        setTimeout(() => {
            label.textContent = originalText;
            button.classList.remove('copied');
        }, 1800);
    };

    const showCopied = () => {
        label.textContent = 'Copied!';
        button.classList.add('copied');
        trackClick('copy_email');
        restore();
    };

    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(email).then(showCopied).catch(() => {
            label.textContent = 'Copy failed';
            restore();
        });
    } else {
        const tempInput = document.createElement('input');
        tempInput.value = email;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        showCopied();
    }
}

// ==========================================================
// LIVE ANALYSIS — real, server-tracked numbers.
//
// Reuses the exact same Supabase project as the main app
// (script.js) — same URL and anon key, both already public
// (the anon key is meant to be embedded in client code; every
// table it can touch is protected by RLS, and these two tables
// in particular have NO anon policies at all, see
// supabase-schema.sql). Writes go through the api/track-event.js
// serverless function (service role only); reads go straight through
// the site_public_stats() RPC, the same pattern script.js already
// uses for tenant_members_public().
// ==========================================================

const STATS_SUPABASE_URL = "https://berahbwqlnntncgiterv.supabase.co";
const STATS_SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJlcmFoYndxbG5udG5jZ2l0ZXJ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg0MjEyNjAsImV4cCI6MjEwMzk5NzI2MH0.Vjs76cbSjafoNE8vHIG4D91v5XjplNyJeqY651dbsHk";
const STATS_CONFIGURED = typeof window !== 'undefined' && window.supabase && !STATS_SUPABASE_URL.startsWith("YOUR_");

let statsSupa = null;
if (STATS_CONFIGURED) {
    statsSupa = window.supabase.createClient(STATS_SUPABASE_URL, STATS_SUPABASE_ANON_KEY);
}

// Records one visit per browser session (sessionStorage guard), so
// refreshing the page or navigating between anchors doesn't inflate
// the count — closing the tab and coming back later counts as a new
// visit, which is the more honest read of "how many separate people
// clicked through to this site."
function trackVisit() {
    if (!STATS_CONFIGURED) return;
    try {
        if (sessionStorage.getItem('wf_visit_tracked')) return;
        sessionStorage.setItem('wf_visit_tracked', '1');
    } catch (e) {
        // sessionStorage unavailable (e.g. private browsing) — fine to
        // just track every load in that case, nothing to fall back to.
    }
    sendTrackingBeacon({ type: 'visit', path: location.pathname || '/' });
}

// Called from the three real CTAs (Explore Features, the mailto link,
// Copy email) — not wired to every click on the page, since an
// "engagement" count is only meaningful if it reflects people actually
// acting on something, not every stray tap.
function trackClick(target) {
    if (!STATS_CONFIGURED) return;
    sendTrackingBeacon({ type: 'click', target: target });
}

// Uses sendBeacon when available so the request survives the page
// unloading right after the click (e.g. the mailto link handing off to
// the OS mail client) — falls back to a fire-and-forget fetch with
// keepalive for browsers without sendBeacon support.
function sendTrackingBeacon(payload) {
    const url = '/api/track-event';
    const body = JSON.stringify(payload);
    try {
        if (navigator.sendBeacon) {
            const blob = new Blob([body], { type: 'application/json' });
            navigator.sendBeacon(url, blob);
            return;
        }
    } catch (e) {
        // fall through to fetch
    }
    fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: body, keepalive: true })
        .catch(function() {
            // Landing-page analytics failing silently is the right
            // behavior here — it should never surface an error to a
            // visitor just browsing the site.
        });
}

// Fetches the aggregated counts and animates each into its
// [data-stat-key] span. If the RPC isn't reachable yet (e.g. the
// supabase-schema.sql migration for site_public_stats() hasn't been
// run), the numbers stay as "–" and a small note explains why,
// instead of ever showing an invented number.
function initLiveAnalysis() {
    trackVisit();

    const noteEl = document.getElementById('liveStatsNote');
    if (!STATS_CONFIGURED) {
        if (noteEl) noteEl.textContent = 'Live stats are unavailable right now.';
        return;
    }

    statsSupa.rpc('site_public_stats').then(function(result) {
        const error = result.error;
        const data = result.data;
        if (error || !data || !data.length) throw error || new Error('No stats returned');
        const row = data[0];

        const statMap = {
            totalVisits: row.total_visits,
            totalClicks: row.total_clicks,
            authorizedUsers: row.authorized_users,
            activeWarehouses: row.active_warehouses,
            configuredZones: row.configured_zones,
            trackedItems: row.tracked_items
        };

        Object.keys(statMap).forEach(function(key) {
            const el = document.querySelector('[data-stat-key="' + key + '"]');
            if (el) animateCounter(el, 0, Number(statMap[key]) || 0, 1400);
        });
    }).catch(function(err) {
        console.warn('Live Analysis stats unavailable:', err);
        if (noteEl) noteEl.textContent = "Live stats couldn't be loaded — the analytics tables may not be set up yet.";
    });
}

// Console message
console.log('%c👋 Welcome to WareForge!', 'color: #2dd9f0; font-size: 20px; font-weight: bold;');
console.log('%c📦 Warehouse Management, Simplified', 'color: #34e0a1; font-size: 14px;');
console.log('%c✉️ Wanna access? gargmohit0104@gmail.com', 'color: #ffb020; font-size: 14px;');