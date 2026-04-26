// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.innerHTML = navLinks.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
}

// Dropdown toggle for mobile
const dropdownParents = document.querySelectorAll('.nav-links li');
dropdownParents.forEach(item => {
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

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (header && window.scrollY > 100) {
        header.classList.add('header-scrolled');
    } else if (header) {
        header.classList.remove('header-scrolled');
    }
});

// ==================== DARK / LIGHT MODE TOGGLE ====================
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
}

// ==================== AI CHATBOT ====================
const chatbotToggle = document.getElementById('chatbotToggle');
const chatbotWindow = document.getElementById('chatbotWindow');
const chatbotMessages = document.getElementById('chatbotMessages');
const chatbotInput = document.getElementById('chatbotInput');
const chatbotSendBtn = document.getElementById('chatbotSendBtn');
const closeChat = document.getElementById('closeChat');

if (chatbotToggle) {
    chatbotToggle.addEventListener('click', () => {
        chatbotWindow.style.display = 'flex';
    });
}

if (closeChat) {
    closeChat.addEventListener('click', () => {
        chatbotWindow.style.display = 'none';
    });
}

function addChatMessage(content, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    messageContent.textContent = content;
    messageDiv.appendChild(messageContent);
    chatbotMessages.appendChild(messageDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

async function getAIResponse(userMessage) {
    const lowerMsg = userMessage.toLowerCase();
    
    const responses = {
        'service': "We offer Web Development, Mobile Apps, Electrical Installation, Cloud Solutions, and AI & Machine Learning. Which interests you?",
        'electrical': "Our electrical services include residential wiring, commercial installations, industrial electrical work, repairs, lighting, and safety inspections. Need a quote?",
        'price': "Pricing depends on project scope. Please WhatsApp +256 775 781560 or email nelsonbastian94@gmail.com for a free quote!",
        'contact': "Reach us via WhatsApp at +256 775 781560, email at nelsonbastian94@gmail.com, or call the same number.",
        'whatsapp': "Click the green WhatsApp icon on the bottom right of your screen to chat with us directly!",
        'email': "Our email is nelsonbastian94@gmail.com. Send us a message anytime!",
        'call': "Call us at +256 775 781560, Monday-Friday, 9am-6pm.",
        'hello': "Hello! 👋 Welcome to MetaVolt Tech. How can I assist you with tech or electrical services today?",
        'team': "MetaVolt Tech was founded in 2015. We have 50+ expert team members and 500+ successful projects!",
        'default': "Thanks for your message! For immediate assistance, please WhatsApp +256 775 781560 or email nelsonbastian94@gmail.com."
    };
    
    for (const [key, response] of Object.entries(responses)) {
        if (lowerMsg.includes(key)) return response;
    }
    return responses.default;
}

async function handleChatSend() {
    const message = chatbotInput.value.trim();
    if (message === '') return;
    
    addChatMessage(message, true);
    chatbotInput.value = '';
    
    // Show typing indicator
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot-message';
    typingDiv.innerHTML = '<div class="message-content"><i class="fas fa-spinner fa-pulse"></i> Thinking...</div>';
    chatbotMessages.appendChild(typingDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    
    setTimeout(async () => {
        chatbotMessages.removeChild(typingDiv);
        const response = await getAIResponse(message);
        addChatMessage(response, false);
    }, 800);
}

if (chatbotSendBtn) {
    chatbotSendBtn.addEventListener('click', handleChatSend);
}

if (chatbotInput) {
    chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleChatSend();
    });
}

// ==================== CONTACT FORM ====================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you within 24 hours.');
        e.target.reset();
    });
}

// ==================== FADE IN ON SCROLL ====================
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

fadeElements.forEach(element => {
    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
    element.style.transition = "opacity 0.8s ease, transform 0.8s ease";
});

window.addEventListener('scroll', fadeInOnScroll);
window.addEventListener('load', fadeInOnScroll);

// ==================== ACTIVE NAV LINK ====================
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === 'index.html' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === "#" || href === "") return;
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    setActiveNavLink();
    fadeInOnScroll();
});