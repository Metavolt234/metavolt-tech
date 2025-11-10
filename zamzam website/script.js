// DOM Elements
const header = document.querySelector('.header');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const consultationBtn = document.getElementById('consultationBtn');
const heroConsultation = document.getElementById('heroConsultation');
const appointmentModal = document.getElementById('appointmentModal');
const successModal = document.getElementById('successModal');
const closeModal = document.querySelector('.close-modal');
const closeSuccess = document.getElementById('closeSuccess');
const appointmentForm = document.getElementById('appointmentForm');
const contactForm = document.getElementById('contactForm');

// Particle System for Hero Background
class ParticleSystem {
    constructor(container) {
        this.container = container;
        this.particles = [];
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.container.appendChild(this.canvas);
        
        this.resize();
        this.initParticles();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
    }
    
    resize() {
        this.width = this.container.clientWidth;
        this.height = this.container.clientHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }
    
    initParticles() {
        const particleCount = Math.min(50, Math.floor(this.width * this.height / 5000));
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                size: Math.random() * 2 + 1,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        this.particles.forEach(particle => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            if (particle.x < 0 || particle.x > this.width) particle.speedX *= -1;
            if (particle.y < 0 || particle.y > this.height) particle.speedY *= -1;
            
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
            this.ctx.fill();
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize Particle System
const particleContainer = document.getElementById('particles');
if (particleContainer) {
    new ParticleSystem(particleContainer);
}

// Header Scroll Effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile Navigation
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
});

// Close mobile menu when clicking on links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Modal Functions
function openModal(modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModalFunc(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Event Listeners for Modals
if (consultationBtn) {
    consultationBtn.addEventListener('click', () => openModal(appointmentModal));
}

if (heroConsultation) {
    heroConsultation.addEventListener('click', () => openModal(appointmentModal));
}

if (closeModal) {
    closeModal.addEventListener('click', () => closeModalFunc(appointmentModal));
}

if (closeSuccess) {
    closeSuccess.addEventListener('click', () => closeModalFunc(successModal));
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === appointmentModal) {
        closeModalFunc(appointmentModal);
    }
    if (e.target === successModal) {
        closeModalFunc(successModal);
    }
});

// Form Submission
if (appointmentForm) {
    appointmentForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(appointmentForm);
        const data = Object.fromEntries(formData);
        
        // Show loading state
        const submitBtn = appointmentForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Scheduling...';
        submitBtn.disabled = true;
        
        try {
            // Simulate API call to send email
            await sendAppointmentEmail(data);
            
            // Show success modal
            closeModalFunc(appointmentModal);
            setTimeout(() => {
                openModal(successModal);
                appointmentForm.reset();
            }, 300);
            
        } catch (error) {
            alert('There was an error submitting your request. Please try again or call us directly.');
            console.error('Form submission error:', error);
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Contact Form Submission
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        try {
            // Simulate API call to send email
            await sendContactEmail(data);
            
            // Show success message
            alert('Thank you for your message! We will get back to you within 24 hours.');
            contactForm.reset();
            
        } catch (error) {
            alert('There was an error sending your message. Please try again or call us directly.');
            console.error('Form submission error:', error);
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Simulate email sending function
async function sendAppointmentEmail(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // In a real implementation, this would connect to your backend
            console.log('Appointment request received:', data);
            
            // Simulate successful email sending
            if (Math.random() > 0.1) { // 90% success rate
                resolve();
            } else {
                reject(new Error('Email service temporarily unavailable'));
            }
        }, 2000);
    });
}

// Simulate contact email sending
async function sendContactEmail(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // In a real implementation, this would connect to your backend
            console.log('Contact form submission received:', data);
            
            // Simulate successful email sending
            if (Math.random() > 0.1) { // 90% success rate for demo
                resolve();
            } else {
                reject(new Error('Email service temporarily unavailable'));
            }
        }, 2000);
    });
}

// Animated Counter for Stats
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (element.dataset.count === '98' ? '%' : '+');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (element.dataset.count === '98' ? '%' : '+');
        }
    }, 16);
}

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('stat-number')) {
                const target = parseInt(entry.target.dataset.count);
                animateCounter(entry.target, target);
            } else {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.stat-number').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

document.querySelectorAll('.service-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

document.querySelectorAll('.testimonial-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Mobile dropdown handling
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('.nav-link');
        link.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            }
        });
    });
});