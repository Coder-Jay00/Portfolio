document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initNavbar();
    initTypingEffect();
    initMatrixRain();
    initScrollAnimations();
    initSmoothScroll();
    initActiveNavLink();
    initThemeToggle();
    initBackToTop();
    initStatsCounter();
});

/* ========================================
   NAVBAR FUNCTIONALITY
   ======================================== */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    // Scroll effect for navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

/* ========================================
   TYPING EFFECT
   ======================================== */
function initTypingEffect() {
    const typedText = document.getElementById('typedText');
    const phrases = [
        'Cybersecurity Enthusiast',
        'Web Developer',
        'CSE Student',
        'Security Analyst',
        'Python Developer',
        'Problem Solver'
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typedText.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typedText.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500;
        }

        setTimeout(type, typingSpeed);
    }

    setTimeout(type, 1000);
}

/* ========================================
   MATRIX RAIN EFFECT
   ======================================== */
function initMatrixRain() {
    const matrixRain = document.getElementById('matrixRain');
    const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const columns = Math.floor(window.innerWidth / 20);

    for (let i = 0; i < columns; i++) {
        createMatrixColumn(matrixRain, characters, i);
    }
}

function createMatrixColumn(container, characters, index) {
    const span = document.createElement('span');
    span.className = 'matrix-char';
    span.style.left = `${index * 20}px`;
    span.style.animationDuration = `${5 + Math.random() * 10}s`;
    span.style.animationDelay = `${Math.random() * 5}s`;
    span.textContent = characters[Math.floor(Math.random() * characters.length)];
    container.appendChild(span);

    setInterval(() => {
        span.textContent = characters[Math.floor(Math.random() * characters.length)];
    }, 100 + Math.random() * 500);
}

/* ========================================
   SCROLL ANIMATIONS
   ======================================== */
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section, .project-card, .skill-category, .service-card, .cert-card, .achievement-card, .timeline-item, .hobby-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
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
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 200) {
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

    // Check saved preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');

        if (document.body.classList.contains('light-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            localStorage.setItem('theme', 'light');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            localStorage.setItem('theme', 'dark');
        }
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
    const stats = document.querySelectorAll('.stat-number');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stat = entry.target;
                const text = stat.textContent;
                const match = text.match(/(\d+)/);

                if (match) {
                    const target = parseInt(match[1]);
                    const suffix = text.replace(match[1], '');
                    animateCounter(stat, target, suffix);
                }

                observer.unobserve(stat);
            }
        });
    }, observerOptions);

    stats.forEach(stat => observer.observe(stat));
}

function animateCounter(element, target, suffix) {
    let current = 0;
    const increment = target / 30;
    const duration = 1500;
    const stepTime = duration / 30;

    element.classList.add('counting');

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
            element.classList.remove('counting');
        }
        element.textContent = Math.floor(current) + suffix;
    }, stepTime);
}

/* ========================================
   ADDITIONAL EFFECTS
   ======================================== */

// Parallax effect for hero badge
document.addEventListener('mousemove', (e) => {
    const badge = document.querySelector('.hero-badge');
    if (badge) {
        const x = (window.innerWidth / 2 - e.clientX) / 50;
        const y = (window.innerHeight / 2 - e.clientY) / 50;
        badge.style.transform = `translate(${x}px, ${y}px)`;
    }
});

// Hover effects
document.querySelectorAll('.btn, .project-card, .nav-link').forEach(el => {
    el.addEventListener('mouseenter', () => {
        el.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
});

// Console Easter Egg
console.log('%c🛡️ Jay Thakkar - Portfolio', 'font-size: 24px; font-weight: bold; color: #00d4ff;');
console.log('%cInterested in cybersecurity? Let\'s connect!', 'font-size: 14px; color: #7c3aed;');
console.log('%c📧 coderjt25@gmail.com', 'font-size: 12px; color: #a1a1aa;');

