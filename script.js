// Theme Toggle Functionality
let isDarkMode = false;

function toggleTheme() {
    isDarkMode = !isDarkMode;
    const body = document.body;
    const themeToggle = document.querySelector('.theme-toggle');
    
    if (isDarkMode) {
        body.setAttribute('data-theme', 'dark');
        themeToggle.textContent = '☀️';
    } else {
        body.removeAttribute('data-theme');
        themeToggle.textContent = '🌙';
    }
}
// Slider Functionality
        const navBtns = document.querySelectorAll('.nav-btn');
        const slides = document.querySelectorAll('.slide');

        navBtns.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                // Remove active class from all nav buttons and slides
                navBtns.forEach(b => b.classList.remove('active'));
                slides.forEach(s => {
                    s.classList.remove('active');
                    s.classList.remove('prev');
                });

                // Add active class to clicked nav button
                btn.classList.add('active');
                
                // Add prev class to slides before active
                for (let i = 0; i < index; i++) {
                    slides[i].classList.add('prev');
                }
                
                // Add active class to corresponding slide
                slides[index].classList.add('active');
            });
        });
// Form Submission Handler
function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    const webhookURL = 'https://discord.com/api/webhooks/1376838863745581096/NsRAVSGetfTTxJ37X-JED0u1W99QwbqT1XYFWqWY9HYgRmVGnpUKEnp4WRzO9fjBmk4r';

    const payload = {
        content: `📥 **New Contact Form Submission**\n\n👤 **Name:** ${name}\n📧 **Email:** ${email}\n💬 **Message:**\n${message}`
    };

    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;

    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    fetch(webhookURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
    .then(response => {
        if (response.ok) {
            submitBtn.textContent = 'Message Sent! ✓';
            form.reset();
        } else {
            submitBtn.textContent = 'Failed to Send ✖';
        }
    })
    .catch(error => {
        console.error('Error sending to Discord:', error);
        submitBtn.textContent = 'Error ✖';
    })
    .finally(() => {
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}


// Smooth Scrolling Navigation
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });



    // Initialize theme based on user preference
    initializeTheme();
    
    // Add scroll animations
    initializeScrollAnimations();
});

// Initialize Theme
function initializeTheme() {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
        isDarkMode = true;
        document.body.setAttribute('data-theme', 'dark');
        document.querySelector('.theme-toggle').textContent = '☀️';
    }
}

// Save theme preference
function saveThemePreference() {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
}

// Update theme toggle to save preference
const originalToggleTheme = toggleTheme;
toggleTheme = function() {
    originalToggleTheme();
    saveThemePreference();
};

// Header Scroll Effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    const scrollY = window.scrollY;
    
    if (scrollY > 100) {
        header.style.background = isDarkMode ? 
            'rgba(30, 41, 59, 0.95)' : 
            'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(25px)';
    } else {
        header.style.background = isDarkMode ? 
            'rgba(30, 41, 59, 0.8)' : 
            'rgba(255, 255, 255, 0.8)';
        header.style.backdropFilter = 'blur(20px)';
    }
    
    // Update active navigation link
    updateActiveNavLink();
});

// Update Active Navigation Link
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Scroll Animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.skill-card, .project-card');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Add CSS for scroll animations
const style = document.createElement('style');
style.textContent = `
    .skill-card, .project-card {
        opacity: 0;
        transform: translateY(50px);
        transition: all 0.6s ease;
    }
    
    .skill-card.animate-in, .project-card.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .nav-links a.active {
        color: var(--text-primary);
        font-weight: 600;
    }
    
    .nav-links a.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// Typing Animation for Hero Text
function initializeTypingAnimation() {
    const heroTitle = document.querySelector('.hero-content h1');
    const heroSubtitle = document.querySelector('.hero-content p');
    
    if (heroTitle && heroSubtitle) {
        const titleText = heroTitle.textContent;
        const subtitleText = heroSubtitle.textContent;
        
        heroTitle.textContent = '';
        heroSubtitle.textContent = '';
        
        // Type title
        typeWriter(heroTitle, titleText, 100, () => {
            // Type subtitle after title is complete
            setTimeout(() => {
                typeWriter(heroSubtitle, subtitleText, 50);
            }, 500);
        });
    }
}

function typeWriter(element, text, speed, callback) {
    let i = 0;
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else if (callback) {
            callback();
        }
    }
    type();
}

// Mobile Menu Toggle (for smaller screens)
function initializeMobileMenu() {
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');
    
    // Create mobile menu button
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '☰';
    mobileMenuBtn.style.display = 'none';
    
    nav.appendChild(mobileMenuBtn);
    
    // Add mobile menu styles
    const mobileStyle = document.createElement('style');
    mobileStyle.textContent = `
        @media (max-width: 768px) {
            .mobile-menu-btn {
                display: block !important;
                background: var(--primary-gradient);
                border: none;
                color: white;
                font-size: 1.2rem;
                padding: 0.5rem;
                border-radius: 5px;
                cursor: pointer;
            }
            
            .nav-links {
                position: absolute;
                top: 100%;
                left: 0;
                width: 100%;
                background: var(--card-bg);
                backdrop-filter: blur(20px);
                flex-direction: column;
                padding: 1rem;
                transform: translateY(-100%);
                opacity: 0;
                pointer-events: none;
                transition: all 0.3s ease;
            }
            
            .nav-links.active {
                display: flex !important;
                transform: translateY(0);
                opacity: 1;
                pointer-events: all;
            }
        }
    `;
    document.head.appendChild(mobileStyle);
    
    // Mobile menu toggle functionality
    mobileMenuBtn.addEventListener('click', () => {
        const navLinks = document.querySelector('.nav-links');
        navLinks.classList.toggle('active');
        mobileMenuBtn.innerHTML = navLinks.classList.contains('active') ? '✕' : '☰';
    });
}

// Initialize all features when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeMobileMenu();
    // Uncomment the line below if you want typing animation
    // initializeTypingAnimation();
});

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll event
window.addEventListener('scroll', throttle(function() {
    const header = document.querySelector('header');
    const scrollY = window.scrollY;
    
    if (scrollY > 100) {
        header.style.background = isDarkMode ? 
            'rgba(30, 41, 59, 0.95)' : 
            'rgba(255, 255, 255, 0.95)';
    } else {
        header.style.background = isDarkMode ? 
            'rgba(30, 41, 59, 0.8)' : 
            'rgba(255, 255, 255, 0.8)';
    }
    
    updateActiveNavLink();
}, 16)); // ~60fps

function openLink(url) {
    window.open(url, '_blank');
}

        function copyToClipboard(text) {
            navigator.clipboard.writeText(text).then(() => {
                // Create temporary notification
                const notification = document.createElement('div');
                notification.textContent = 'Copied to clipboard!';
                notification.style.cssText = `
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: var(--success-gradient);
                    color: white;
                    padding: 0.75rem 1rem;
                    border-radius: 10px;
                    z-index: 10000;
                    font-size: 0.9rem;
                    animation: slideInRight 0.3s ease;
                `;
                
                document.body.appendChild(notification);
                
                setTimeout(() => {
                    notification.style.animation = 'slideInLeft 0.3s ease reverse';
                    setTimeout(() => notification.remove(), 300);
                }, 2000);
            });
        }
