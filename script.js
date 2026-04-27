document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initNavbar();
    initTypingEffect();
    // initMatrixRain();
    initScrollAnimations();
    initSmoothScroll();
    initActiveNavLink();
    initThemeToggle();
    initBackToTop();
    initStatsCounter();
    initProjectFilters();
});

/* ========================================
   NAVBAR FUNCTIONALITY
   ======================================== */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile toggle
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close menu on link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
}

/* ========================================
   TYPING EFFECT
   ======================================== */
function initTypingEffect() {
    const typedText = document.getElementById('typedText');
    const roles = [
        'Cybersecurity Specialist',
        'Security Researcher',
        'Offensive Security Tooler',
        'Vulnerability Analyst',
        'Pentester'
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            typedText.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typedText.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500;
        }

        setTimeout(type, typingSpeed);
    }

    type();
}

/* ========================================
   MATRIX RAIN EFFECT
   ======================================== */
function initMatrixRain() {
    const container = document.getElementById('matrixRain');
    if (!container) return;
    const characters = '01アイウエオカキクケコサシスセソ<>/{}[]';
    const columnCount = Math.floor(window.innerWidth / 25);

    for (let i = 0; i < columnCount; i++) {
        createMatrixColumn(container, characters, i);
    }
}

function createMatrixColumn(container, characters, index) {
    const column = document.createElement('span');
    column.className = 'matrix-char';
    column.textContent = characters[Math.floor(Math.random() * characters.length)];
    column.style.left = (index * 25) + 'px';
    column.style.animationDuration = (Math.random() * 5 + 5) + 's';
    column.style.animationDelay = (Math.random() * 5) + 's';
    column.style.fontSize = (Math.random() * 8 + 10) + 'px';
    container.appendChild(column);
}

/* ========================================
   SCROLL ANIMATIONS
   ======================================== */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay for grid children
                const parent = entry.target.parentElement;
                if (parent && (parent.classList.contains('projects-grid') ||
                    parent.classList.contains('skills-grid') ||
                    parent.classList.contains('services-grid') ||
                    parent.classList.contains('certs-grid') ||
                    parent.classList.contains('achievements-grid') ||
                    parent.classList.contains('hobbies-grid'))) {
                    const siblings = Array.from(parent.children);
                    const i = siblings.indexOf(entry.target);
                    entry.target.style.transitionDelay = `${i * 0.08}s`;
                }
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements
    const animateElements = document.querySelectorAll(
        '.project-card, .skill-category, .timeline-item, .service-card, ' +
        '.cert-card, .achievement-card, .hobby-item, .about-content, ' +
        '.contact-content, .hero-content, .section-title'
    );

    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

/* ========================================
   SMOOTH SCROLL
   ======================================== */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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

/* ========================================
   ACTIVE NAV LINK ON SCROLL
   ======================================== */
function initActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

/* ========================================
   THEME TOGGLE
   ======================================== */
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const icon = themeToggle.querySelector('i');

    // Check saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        icon.className = 'fas fa-sun';
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        const isLight = document.body.classList.contains('light-theme');
        icon.className = isLight ? 'fas fa-sun' : 'fas fa-moon';
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });
}

/* ========================================
   BACK TO TOP BUTTON
   ======================================== */
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* ========================================
   ANIMATED STATS COUNTER
   ======================================== */
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const text = target.textContent;
                const number = parseInt(text);
                const suffix = text.replace(/[0-9]/g, '');

                if (!isNaN(number)) {
                    animateCounter(target, number, suffix);
                }
                observer.unobserve(target);
            }
        });
    }, observerOptions);

    statNumbers.forEach(stat => observer.observe(stat));
}

function animateCounter(element, target, suffix) {
    let current = 0;
    const increment = target / 40;
    const duration = 1500;
    const stepTime = duration / 40;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, stepTime);
}

/* ========================================
   PROJECT FILTERS
   ======================================== */
function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            projectCards.forEach((card, index) => {
                const category = card.dataset.category;

                if (filter === 'all' || category === filter) {
                    card.style.transitionDelay = `${index * 0.05}s`;
                    card.classList.remove('hidden');
                    card.classList.add('animate-in');
                } else {
                    card.style.transitionDelay = '0s';
                    card.classList.add('hidden');
                    card.classList.remove('animate-in');
                }
            });
        });
    });
}

/* ========================================
   ADDITIONAL EFFECTS
   ======================================== */

// Parallax effect for hero badge
document.addEventListener('mousemove', (e) => {
    const badge = document.querySelector('.hero-badge');
    if (badge) {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        badge.style.transform = `translate(${x}px, ${y}px)`;
    }
});

// Tilt effect on project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// Skill tags hover ripple
document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-2px) scale(1.05)';
    });
    tag.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Console easter egg
console.log('%c🛡️ Jay Thakkar Portfolio', 'font-size: 20px; font-weight: bold; color: #00d4ff;');
console.log('%cInterested in cybersecurity? Let\'s connect!', 'font-size: 14px; color: #7c3aed;');
console.log('%c📧 coderjt25@gmail.com', 'font-size: 12px; color: #a1a1aa;');
