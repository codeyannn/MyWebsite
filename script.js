// Navbar scrolled effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Hamburger menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when link is clicked
document.querySelectorAll('.nav-links li a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Typed.js & Anime.js integration
document.addEventListener("DOMContentLoaded", function() {
    // 1. Initialize Typed.js for typing effect
    if (document.querySelector('.typing')) {
        new Typed('.typing', {
            strings: ['Tech Enthusiast', 'AI Machine Learning Enthusiast', 'Data Scientist'],
            typeSpeed: 80,
            backSpeed: 50,
            loop: true,
            backDelay: 1500
        });
    }

    // 2. Initialize Scroll Animations using IntersectionObserver and Anime.js
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove visibility hidden before animating
                entry.target.style.visibility = 'visible';
                
                // Anime.js animation
                anime({
                    targets: entry.target,
                    translateY: [50, 0],
                    opacity: [0, 1],
                    easing: 'easeOutQuad',
                    duration: 800,
                    delay: entry.target.dataset.delay || 0
                });
                
                // Unobserve after animating once
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply observer to all elements with class 'reveal'
    document.querySelectorAll('.reveal').forEach((el, index) => {
        // Add staggered delay based on child index inside parents
        if(el.classList.contains('project-card') || el.classList.contains('timeline-item')) {
            el.dataset.delay = (index % 3) * 150; 
        }
        observer.observe(el);
    });
    
    // 3. Add custom hover effect for project images using Anime.js
    document.querySelectorAll('.project-card').forEach(card => {
        const icon = card.querySelector('.img-placeholder i');
        
        if(icon) {
            card.addEventListener('mouseenter', () => {
                anime({
                    targets: icon,
                    scale: 1.2,
                    rotate: '1turn',
                    duration: 800,
                    easing: 'easeOutElastic(1, .8)'
                });
            });
            
            card.addEventListener('mouseleave', () => {
                anime({
                    targets: icon,
                    scale: 1,
                    rotate: '0turn',
                    duration: 600,
                    easing: 'easeOutQuad'
                });
            });
        }
    });
});
