// Custom cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 100);
});

// Add hover effect to all clickable elements
document.querySelectorAll('a, button, .tech-icon, .project-card').forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
        cursorFollower.style.transform = 'scale(2)';
        element.style.cursor = 'none';
    });
    
    element.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursorFollower.style.transform = 'scale(1)';
    });
});

// Loading animation
window.addEventListener('load', () => {
    const loadingScreen = document.querySelector('.loading-screen');
    
    gsap.to(loadingScreen, {
        opacity: 0,
        duration: 1,
        delay: 0.5,
        onComplete: () => {
            loadingScreen.style.display = 'none';
            animateHeroContent();
        }
    });
});

// Typed text animation
function initTypedText() {
    const texts = [
        "Building Desktop Applications",
        "Creating Web Solutions",
        "Developing Mobile Apps",
        "Implementing AI Solutions"
    ];
    let currentText = 0;
    let currentChar = 0;
    const typedText = document.querySelector('.typed-text');
    
    function type() {
        if (currentChar < texts[currentText].length) {
            typedText.textContent += texts[currentText][currentChar];
            currentChar++;
            setTimeout(type, 100);
        } else {
            setTimeout(erase, 2000);
        }
    }
    
    function erase() {
        if (currentChar > 0) {
            typedText.textContent = texts[currentText].substring(0, currentChar - 1);
            currentChar--;
            setTimeout(erase, 50);
        } else {
            currentText = (currentText + 1) % texts.length;
            setTimeout(type, 500);
        }
    }
    
    setTimeout(type, 1000);
}

// Hero content animation
function animateHeroContent() {
    const heroContent = document.querySelector('.hero-content');
    const socialLinks = document.querySelectorAll('.social-link');
    
    gsap.from(heroContent, {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power4.out"
    });
    
    gsap.from(socialLinks, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        delay: 0.5,
        ease: "power4.out"
    });

    initTypedText();
}

// Initialize vanilla-tilt
function initTilt() {
    VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
        max: 15,
        speed: 400,
        glare: true,
        "max-glare": 0.2,
    });
}

// Scroll animations
function initScrollAnimations() {
    // About section
    gsap.from('.about-card', {
        scrollTrigger: {
            trigger: '.about-card',
            start: 'top 80%',
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power4.out"
    });

    // Tech stack icons
    gsap.from('.tech-icon', {
        scrollTrigger: {
            trigger: '.tech-stack',
            start: 'top 80%',
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power4.out"
    });

    // Skills categories
    gsap.utils.toArray('.skill-category').forEach((category, i) => {
        gsap.from(category, {
            scrollTrigger: {
                trigger: category,
                start: 'top 80%',
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            delay: i * 0.2,
            ease: "power4.out"
        });
    });

    // Animate skill progress bars
    gsap.utils.toArray('.skill-item').forEach(item => {
        const progress = item.querySelector('.skill-progress');
        const skillValue = item.getAttribute('data-skill');
        
        gsap.to(progress, {
            scrollTrigger: {
                trigger: item,
                start: 'top 80%',
            },
            width: skillValue + '%',
            duration: 1.5,
            ease: "power4.out"
        });
    });

    // Timeline items
    gsap.utils.toArray('.timeline-item').forEach((item, i) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 80%',
            },
            x: i % 2 === 0 ? -100 : 100,
            opacity: 0,
            duration: 1,
            ease: "power4.out"
        });
    });

    // Contact items
    gsap.from('.contact-item', {
        scrollTrigger: {
            trigger: '.contact-info',
            start: 'top 80%',
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power4.out"
    });

    // Section titles
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: 'top 80%',
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power4.out"
        });
    });
}

// Mobile menu
function initMobileMenu() {
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    let menuOpen = false;
    
    menuBtn.addEventListener('click', () => {
        if(!menuOpen) {
            menuBtn.classList.add('open');
            navLinks.style.display = 'flex';
            gsap.from(navLinks, {
                y: -20,
                opacity: 0,
                duration: 0.3,
                ease: "power2.out"
            });
        } else {
            menuBtn.classList.remove('open');
            gsap.to(navLinks, {
                y: -20,
                opacity: 0,
                duration: 0.3,
                ease: "power2.in",
                onComplete: () => {
                    navLinks.style.display = 'none';
                }
            });
        }
        menuOpen = !menuOpen;
    });
}

// Active nav link on scroll
function initActiveNavOnScroll() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if(scrollY >= (sectionTop - sectionHeight/3)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if(link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// Initialize everything when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    initTilt();
    initScrollAnimations();
    initMobileMenu();
    initActiveNavOnScroll();
    
    // Smooth scroll for navigation links
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            
            gsap.to(window, {
                duration: 1,
                scrollTo: {
                    y: target,
                    offsetY: 70
                },
                ease: "power2.inOut"
            });
        });
    });
});
