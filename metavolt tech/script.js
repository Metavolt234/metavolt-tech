// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const dropdowns = document.querySelectorAll('.nav-links li');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.innerHTML = navLinks.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
}

// Dropdown toggle for mobile
if (dropdowns.length > 0) {
    dropdowns.forEach(item => {
        if (item.querySelector('.dropdown')) {
            item.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    const dropdown = item.querySelector('.dropdown');
                    dropdown.classList.toggle('active');
                }
            });
        }
    });
}

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (header && window.scrollY > 100) {
        header.classList.add('header-scrolled');
    } else if (header) {
        header.classList.remove('header-scrolled');
    }
});

// Chatbot functionality
const chatbotToggle = document.getElementById('chatbotToggle');
const chatbotWindow = document.getElementById('chatbotWindow');
const chatbotClose = document.getElementById('chatbotClose');
const chatbotMessages = document.getElementById('chatbotMessages');
const chatbotInput = document.getElementById('chatbotInput');
const chatbotSend = document.getElementById('chatbotSend');

if (chatbotToggle) {
    chatbotToggle.addEventListener('click', () => {
        chatbotWindow.style.display = 'flex';
    });
}

if (chatbotClose) {
    chatbotClose.addEventListener('click', () => {
        chatbotWindow.style.display = 'none';
    });
}

function addMessage(content, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
    
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    messageContent.textContent = content;
    
    messageDiv.appendChild(messageContent);
    chatbotMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function handleUserMessage() {
    const message = chatbotInput.value.trim();
    if (message === '') return;
    
    addMessage(message, true);
    chatbotInput.value = '';
    
    // Simulate bot response
    setTimeout(() => {
        let response;
        
        if (message.toLowerCase().includes('service') || message.toLowerCase().includes('what do you do')) {
            response = "We offer a range of technology services including web development, mobile apps, cloud solutions, and AI services. Would you like to know more about any specific service?";
        } else if (message.toLowerCase().includes('contact') || message.toLowerCase().includes('email') || message.toLowerCase().includes('phone')) {
            response = "You can reach us at info@metavolttech.com or call +1 (555) 123-4567. Our office is located at 123 Tech Avenue, Silicon Valley.";
        } else if (message.toLowerCase().includes('price') || message.toLowerCase().includes('cost')) {
            response = "Our pricing depends on the scope and complexity of your project. We offer custom quotes after understanding your specific requirements. Would you like to schedule a consultation?";
        } else if (message.toLowerCase().includes('hello') || message.toLowerCase().includes('hi')) {
            response = "Hello! How can I assist you today?";
        } else {
            response = "I understand you're interested in " + message + ". Let me connect you with one of our specialists who can provide more detailed information.";
            
            // After a delay, show the "connecting to human" message
            setTimeout(() => {
                addMessage("Connecting you to a live agent...");
                setTimeout(() => {
                    addMessage("You are now connected with Sarah, our solutions specialist. How can I help you?");
                }, 2000);
            }, 2000);
        }
        
        addMessage(response);
    }, 1000);
}

if (chatbotSend) {
    chatbotSend.addEventListener('click', handleUserMessage);
}

if (chatbotInput) {
    chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleUserMessage();
        }
    });
}

// Contact form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        e.target.reset();
    });
}

// Fade in elements on scroll
const fadeElements = document.querySelectorAll('.fade-in');

const fadeInOnScroll = () => {
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = "1";
            element.style.transform = "translateY(0)";
        }
    });
};

// Set initial state for fade elements
fadeElements.forEach(element => {
    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
    element.style.transition = "opacity 0.8s ease, transform 0.8s ease";
});

window.addEventListener('scroll', fadeInOnScroll);
// Trigger once on load
window.addEventListener('load', fadeInOnScroll);

// Set active navigation link based on current page
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === 'index.html' && href === '#home')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setActiveNavLink();
    fadeInOnScroll();
});

// Set page-specific background and styling
function setPageStyling() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const body = document.body;
    
    // Remove any existing page classes
    body.classList.remove('home-page', 'about-page', 'services-page', 'team-page', 
                         'testimonials-page', 'blog-page', 'contact-page');
    
    // Add current page class
    switch(currentPage) {
        case 'index.html':
        case '':
            body.classList.add('home-page');
            break;
        case 'about.html':
            body.classList.add('about-page');
            break;
        case 'services.html':
            body.classList.add('services-page');
            break;
        case 'team.html':
            body.classList.add('team-page');
            break;
        case 'testimonials.html':
            body.classList.add('testimonials-page');
            break;
        case 'blog.html':
            body.classList.add('blog-page');
            break;
        case 'contact.html':
            body.classList.add('contact-page');
            break;
    }
}

// Update the DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function() {
    setActiveNavLink();
    fadeInOnScroll();
    setPageStyling(); // Add this line
});


// Enhance heading visibility with dynamic background adjustment
function enhanceHeadingsVisibility() {
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5');
    
    headings.forEach(heading => {
        // Add a subtle background overlay for better contrast
        if (!heading.classList.contains('no-bg-overlay')) {
            const rect = heading.getBoundingClientRect();
            if (rect.width > 0 && rect.height > 0) {
                // Create a subtle background overlay
                const existingOverlay = heading.parentNode.querySelector('.heading-bg-overlay');
                if (!existingOverlay) {
                    const overlay = document.createElement('div');
                    overlay.className = 'heading-bg-overlay';
                    overlay.style.cssText = `
                        position: absolute;
                        top: -10px;
                        left: -20px;
                        right: -20px;
                        bottom: -10px;
                        background: rgba(0, 0, 0, 0.3);
                        border-radius: 10px;
                        z-index: -1;
                        pointer-events: none;
                    `;
                    heading.style.position = 'relative';
                    heading.style.zIndex = '1';
                    heading.parentNode.style.position = 'relative';
                    heading.parentNode.insertBefore(overlay, heading);
                }
            }
        }
    });
}

// Update DOMContentLoaded to include heading enhancement
document.addEventListener('DOMContentLoaded', function() {
    setActiveNavLink();
    fadeInOnScroll();
    setPageStyling();
    enhanceHeadingsVisibility(); // Add this line
});

// Also enhance headings when images load
window.addEventListener('load', function() {
    enhanceHeadingsVisibility();
});