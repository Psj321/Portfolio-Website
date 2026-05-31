/* ==========================================================================
   INTERACTIVE SCRIPT ENGINE - PRANAY JOSHI'S PORTFOLIO
   Features:
   - Dynamic Canvas Node Network (Data structure visualization)
   - Interactive Terminal Diagnostics Stream
   - Intersection Observer scroll reveal triggers
   - Dynamic Statistics count-up engine
   - Mobile Navigation drawer handler
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize elements
    initMobileNav();
    initHeaderScroll();
    initCanvasNodes();
    initTerminalLogs();
    initScrollReveal();
});

/* ==========================================================================
   1. MOBILE NAVIGATION DRAWER
   ========================================================================== */
function initMobileNav() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link, .nav-cta');

    if (!menuToggle || !navMenu) return;

    // Toggle menu active state
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });

    // Close menu when clicking links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });
}

/* ==========================================================================
   2. SCROLLED HEADER EFFECT
   ========================================================================== */
function initHeaderScroll() {
    const header = document.querySelector('.main-header');
    if (!header) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

/* ==========================================================================
   3. DYNAMIC CANVAS NODE NETWORK (Systems Background)
   ========================================================================== */
function initCanvasNodes() {
    const canvas = document.getElementById('canvas-bg');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    let particles = [];
    const maxParticles = width < 768 ? 40 : 90; // Density throttle for mobile performance
    const connectionDist = 120;
    const mouse = { x: null, y: null, radius: 150 };

    // Resize event
    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    // Mouse movement tracker
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    window.addEventListener('mouseout', () => {
        mouse.x = null;
        mouse.y = null;
    });

    // Particle Class
    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.35; // Slow deliberate drifting
            this.vy = (Math.random() - 0.5) * 0.35;
            this.size = Math.random() * 2 + 1;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Bounce boundary checks
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;

            // Mouse proximity interaction (push away slightly to feel reactive)
            if (mouse.x !== null && mouse.y !== null) {
                const dx = this.x - mouse.x;
                const dy = this.y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < mouse.radius) {
                    const force = (mouse.radius - dist) / mouse.radius;
                    const angle = Math.atan2(dy, dx);
                    this.x += Math.cos(angle) * force * 1.2;
                    this.y += Math.sin(angle) * force * 1.2;
                }
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(6, 182, 212, 0.45)'; // Soft cyan particle color
            ctx.fill();
        }
    }

    // Populate particles
    for (let i = 0; i < maxParticles; i++) {
        particles.push(new Particle());
    }

    // Frame loops
    function animate() {
        ctx.clearRect(0, 0, width, height);

        // Update and draw particles
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
        }

        // Draw node connections
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const p1 = particles[i];
                const p2 = particles[j];

                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < connectionDist) {
                    // Fade connections based on distance
                    const alpha = (1 - (dist / connectionDist)) * 0.12;
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    
                    // Gradient lines between cyan and violet accent
                    ctx.strokeStyle = `rgba(168, 85, 247, ${alpha})`;
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(animate);
    }

    animate();
}

/* ==========================================================================
   4. INTERACTIVE TERMINAL LOG STREAM
   ========================================================================== */
function initTerminalLogs() {
    const consoleBody = document.getElementById('console-logs');
    if (!consoleBody) return;

    // Rich tech stack diagnostics logs list
    const logData = [
        { text: "Initializing kernel boot protocols...", type: "dim" },
        { text: "System architecture resolved. Model: [Pranay Joshi]", type: "info" },
        { text: "Verifying PHP engine settings...", type: "info" },
        { text: "PHP 8.2 status check: [ACTIVE]", type: "green" },
        { text: "Establishing handshake with MySQL master pool...", type: "info" },
        { text: "MySQL connection status: [CONNECTED] (latency: 18ms)", type: "green" },
        { text: "Analyzing query structures (Normalised to 3NF standards)...", type: "dim" },
        { text: "Indexing verification checks: [PASSED]", type: "green" },
        { text: "Mapping remote API routes to active components...", type: "info" },
        { text: "Routing integration state: [SUCCESS]", type: "green" },
        { text: "Binding Gemini automation daemons...", type: "info" },
        { text: "SMTP automation mail server initialized on port 587...", type: "info" },
        { text: "Daemon queues: 0 messages pending.", type: "dim" },
        { text: "Checking Webcam AI computer vision segment array...", type: "info" },
        { text: "AI Skin segment model: [READY] (In dev-sandbox)", type: "yellow" },
        { text: "Python CLI Telephone Directory checking database configurations...", type: "info" },
        { text: "CLI safe serialization modules verified: [SECURE]", type: "green" },
        { text: "All services compiled. Portfolios dashboard: [ONLINE]", type: "green" }
    ];

    consoleBody.innerHTML = '';
    let logIndex = 0;

    function addLogLine() {
        if (logIndex >= logData.length) {
            // Keep adding subtle dynamic checks every few seconds once fully loaded
            setTimeout(() => {
                const dynamicChecks = [
                    "Cron worker heartbeat check: [OK]",
                    "Database optimization routine ran in 4.2ms: [OPTIMAL]",
                    "Memory management garbage collection: [COMPLETED]",
                    "No memory leaks detected. Stack depth: [NORMAL]",
                    "External API rate limits verified: [100% capacity]"
                ];
                const randIndex = Math.floor(Math.random() * dynamicChecks.length);
                const time = new Date().toLocaleTimeString();
                appendLine(`[${time}] ${dynamicChecks[randIndex]}`, "dim");
                
                // Keep total console log length compact
                if (consoleBody.children.length > 25) {
                    consoleBody.removeChild(consoleBody.firstChild);
                }
                
                initTerminalLogsLoop();
            }, Math.random() * 4000 + 3000);
            return;
        }

        const log = logData[logIndex];
        const time = new Date().toLocaleTimeString();
        appendLine(`[${time}] ${log.text}`, log.type);
        logIndex++;

        // Fast typing variation simulation
        setTimeout(addLogLine, Math.random() * 250 + 100);
    }

    function initTerminalLogsLoop() {
        // Wrapper for recursive loops
        addLogLine();
    }

    function appendLine(text, type) {
        const div = document.createElement('div');
        div.className = 'log-line';
        if (type === 'green') div.classList.add('text-green');
        if (type === 'yellow') div.classList.add('text-yellow');
        if (type === 'dim') div.classList.add('text-dim');
        
        div.textContent = text;
        consoleBody.appendChild(div);
        
        // Auto scroll to latest line
        consoleBody.scrollTop = consoleBody.scrollHeight;
    }

    // Fire off stream
    addLogLine();
}

/* ==========================================================================
   5. INTERSECTION OBSERVER SCROLL REVEALS & DYNAMIC TRIGGER RUNNERS
   ========================================================================== */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('[data-reveal]');
    
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px' // Offset triggers slightly
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                
                // Check if this has the stats element to trigger counting
                if (entry.target.classList.contains('about-stats')) {
                    triggerStatsCounter();
                }

                // Check if this has the skills grid to animate badges
                if (entry.target.classList.contains('skills-section')) {
                    triggerSkillsAnimate();
                }

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => {
        observer.observe(el);
    });
}

/* ==========================================================================
   6. DYNAMIC STATISTICS COUNTER
   ========================================================================== */
let statsAnimated = false;
function triggerStatsCounter() {
    if (statsAnimated) return;
    statsAnimated = true;

    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(numEl => {
        const target = parseInt(numEl.getAttribute('data-target'), 10);
        let current = 0;
        const duration = 2000; // 2 seconds total animation
        const steps = 60;
        const increment = target / steps;
        const stepTime = duration / steps;

        const counter = setInterval(() => {
            current += increment;
            if (current >= target) {
                numEl.textContent = formatStatNumber(target);
                clearInterval(counter);
            } else {
                numEl.textContent = formatStatNumber(Math.floor(current));
            }
        }, stepTime);
    });
}

function formatStatNumber(number) {
    if (number >= 10000) {
        return (number / 1000).toFixed(0) + 'k+';
    }
    if (number >= 100 && number < 1000) {
        return number + 'ms';
    }
    if (number === 99) {
        return number + '%';
    }
    return number + '+';
}

/* ==========================================================================
   7. SKILLS LOADING FILL INDICATOR
   ========================================================================== */
let skillsAnimated = false;
function triggerSkillsAnimate() {
    if (skillsAnimated) return;
    skillsAnimated = true;

    const skillFills = {
        'php-fill': '92%',
        'mysql-fill': '88%',
        'js-fill': '82%',
        'python-fill': '78%',
        'cpp-fill': '70%'
    };

    Object.keys(skillFills).forEach(className => {
        const fillEl = document.querySelector(`.${className}`);
        if (fillEl) {
            // Apply widths slowly via css classes
            setTimeout(() => {
                fillEl.style.width = skillFills[className];
            }, 300);
        }
    });
}
