// ======================
// EMAILJS CONFIGURATION (REAL CONTACT FORM)
// ======================
const EMAILJS_PUBLIC_KEY = "MrXLGgk4CNPp4h0oC";
const EMAILJS_SERVICE_ID = "service_vqe1ue7";
const EMAILJS_TEMPLATE_ID = "template_pb71hwa";

// Initialize EmailJS
(function() {
    emailjs.init(EMAILJS_PUBLIC_KEY);
})();

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
    
    // Handle real form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
});

// Handle real email sending
function handleFormSubmit(e) {
    e.preventDefault();
    
    const name = e.target.querySelector('input[type="text"]').value;
    const email = e.target.querySelector('input[type="email"]').value;
    const message = e.target.querySelector('textarea').value;
    
    // Basic validation
    if (!name.trim() || !email.trim() || !message.trim()) {
        alert("Please fill in all fields.");
        return;
    }
    
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }
    
    // Update button state
    const submitBtn = e.target.querySelector('.btn.primary');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;
    
    // Send email via EmailJS
    emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
            from_name: name,
            from_email: email,
            message: message
        }
    )
    .then(function(response) {
        console.log("SUCCESS!", response.status, response.text);
        alert("✅ Your message has been sent successfully! I'll get back to you soon.");
        e.target.reset();
    })
    .catch(function(error) {
        console.error("FAILED...", error);
        alert("❌ Failed to send your message. Please try again or contact me directly at alex.morgan@cybersec.expert");
    })
    .finally(() => {
        // Restore button state
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    });
}

// ======================
// EXISTING ANIMATION FUNCTIONS (UNCHANGED)
// ======================

// Initialize animations
function initAnimations() {
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
}

// Create background particles
function createParticles() {
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        const size = Math.random() * 10 + 2;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const animationDuration = Math.random() * 20 + 10;
        const animationDelay = Math.random() * 5;
        const hue = Math.random() * 60;
        
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
    document.addEventListener('mousemove', (e) => {
        cursorFollower.style.left = `${e.clientX}px`;
        cursorFollower.style.top = `${e.clientY}px`;
    });
    
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
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(0)';
        });
        
        card.addEventListener('mouseleave', () => {
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
}

// Animation on scroll functionality
function animateOnScroll() {
    skillProgressBars.forEach(bar => {
        const value = bar.getAttribute('data-value');
        const position = bar.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (position < screenPosition) {
            bar.style.width = `${value}%`;
        }
    });
    
    fadeElements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.classList.add('appear');
        }
    });
    
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
