// script.js

// DOM Elements
const loadingScreen = document.querySelector('.loading-screen');
const cursorFollower = document.querySelector('.cursor-follower');
const particlesContainer = document.querySelector('.particles-container');
const skillProgressBars = document.querySelectorAll('.skill-progress');
const fadeElements = document.querySelectorAll('.fade-in');
const projectCards = document.querySelectorAll('.project-card');
const timelineItems = document.querySelectorAll('.timeline-item');

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Hide loading screen after delay
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        loadingScreen.style.visibility = 'hidden';
        
        // Initialize animations after loading screen disappears
        setTimeout(initAnimations, 500);
    }, 2500);
    
    // Create background particles
    createParticles();
    
    // Set up event listeners
    setupEventListeners();
});

// Initialize animations
function initAnimations() {
    // Animate skill bars when in view
    animateOnScroll();
    
    // Initialize AOS-like functionality
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial check
}

// Create background particles
function createParticles() {
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random properties
        const size = Math.random() * 10 + 2;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const animationDuration = Math.random() * 20 + 10;
        const animationDelay = Math.random() * 5;
        const hue = Math.random() * 60; // Blue to cyan range
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.animationDuration = `${animationDuration}s`;
        particle.style.animationDelay = `${animationDelay}s`;
        particle.style.backgroundColor = `hsl(${hue}, 100%, 70%)`;
        
        particlesContainer.appendChild(particle);
    }
}

// Set up event listeners
function setupEventListeners() {
    // Custom cursor
    document.addEventListener('mousemove', (e) => {
        cursorFollower.style.left = `${e.clientX}px`;
        cursorFollower.style.top = `${e.clientY}px`;
    });
    
    // Button hover effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorFollower.style.borderColor = '#fff';
        });
        
        button.addEventListener('mouseleave', () => {
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorFollower.style.borderColor = 'var(--accent)';
        });
    });
    
    // Project card hover effects
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(0)';
        });
        
        card.addEventListener('mouseleave', () => {
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
    
    // Form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // In a real implementation, you would send the form data here
            alert('Thank you for your message! This is a demo form.');
            contactForm.reset();
        });
    }
}

// Animation on scroll functionality
function animateOnScroll() {
    // Skill bars animation
    skillProgressBars.forEach(bar => {
        const value = bar.getAttribute('data-value');
        const position = bar.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (position < screenPosition) {
            bar.style.width = `${value}%`;
        }
    });
    
    // Fade-in elements
    fadeElements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.classList.add('appear');
        }
    });
    
    // Timeline items animation
    timelineItems.forEach((item, index) => {
        const itemPosition = item.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (itemPosition < screenPosition) {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrollPosition = window.pageYOffset;
    const heroGlow = document.querySelector('.hero-glow');
    
    if (heroGlow) {
        const yPos = -(scrollPosition * 0.3);
        heroGlow.style.transform = `translate(-50%, ${yPos}px)`;
    }
});
