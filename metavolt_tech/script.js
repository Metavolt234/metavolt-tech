// Theme toggle function - works on all pages
function toggleTheme() {
    const body = document.body;
    const themeBtn = document.getElementById('themeToggle');
    if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
        if (themeBtn) themeBtn.innerHTML = '🌞';
    } else {
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
        if (themeBtn) themeBtn.innerHTML = '🌙';
    }
}

function loadTheme() {
    const body = document.body;
    const themeBtn = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        if (themeBtn) themeBtn.innerHTML = '🌙';
    } else if (savedTheme === 'light') {
        body.classList.remove('dark-mode');
        if (themeBtn) themeBtn.innerHTML = '🌞';
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        body.classList.add('dark-mode');
        if (themeBtn) themeBtn.innerHTML = '🌙';
    } else {
        if (themeBtn) themeBtn.innerHTML = '🌞';
    }
}

loadTheme();

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.innerHTML = navLinks.classList.contains('active') ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
}

// Mobile dropdown fix
const dropdownParents = document.querySelectorAll('.nav-links > li');
dropdownParents.forEach(item => {
    const dropdown = item.querySelector('.dropdown');
    if (dropdown) {
        const parentLink = item.querySelector('> a');
        if (parentLink) {
            parentLink.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    dropdownParents.forEach(other => {
                        const otherDropdown = other.querySelector('.dropdown');
                        if (otherDropdown && otherDropdown !== dropdown) {
                            otherDropdown.classList.remove('active');
                        }
                    });
                    dropdown.classList.toggle('active');
                }
            });
        }
    }
});

// Close dropdown when clicking outside
document.addEventListener('click', function(e) {
    if (window.innerWidth <= 768) {
        let isClickInside = false;
        dropdownParents.forEach(item => {
            if (item.contains(e.target)) {
                isClickInside = true;
            }
        });
        if (!isClickInside) {
            document.querySelectorAll('.dropdown.active').forEach(drop => {
                drop.classList.remove('active');
            });
        }
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

// Chatbot functionality
const chatbotToggle = document.getElementById('chatbotToggle');
const chatbotWindow = document.getElementById('chatbotWindow');
const chatbotMessages = document.getElementById('chatbotMessages');
const chatbotInput = document.getElementById('chatbotInput');
const chatbotSendBtn = document.getElementById('chatbotSendBtn');
const closeChat = document.getElementById('closeChat');

if (chatbotToggle && chatbotWindow) {
    chatbotToggle.addEventListener('click', () => {
        chatbotWindow.style.display = 'flex';
    });
}

if (closeChat && chatbotWindow) {
    closeChat.addEventListener('click', () => {
        chatbotWindow.style.display = 'none';
    });
}

function addChatMessage(content, isUser = false) {
    if (!chatbotMessages) return;
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
    if (lowerMsg.includes('service')) return "We offer Web Development, Mobile Apps, Electrical Installation, Cloud Solutions, and AI & Machine Learning.";
    if (lowerMsg.includes('electrical')) return "Our electrical services include residential wiring, commercial installations, industrial electrical work, repairs, lighting, and safety inspections.";
    if (lowerMsg.includes('price') || lowerMsg.includes('cost')) return "Pricing depends on project scope. Please WhatsApp +256 775 781560 for a free quote!";
    if (lowerMsg.includes('contact') || lowerMsg.includes('whatsapp')) return "Reach us via WhatsApp at +256 775 781560 or email nelsonbastian94@gmail.com";
    if (lowerMsg.includes('hello') || lowerMsg.includes('hi')) return "Hello! 👋 Welcome to MetaVolt Tech. How can I assist you today?";
    if (lowerMsg.includes('team')) return "MetaVolt Tech was founded in 2015. We have 50+ expert team members and 500+ successful projects!";
    return "Thanks for your message! For immediate assistance, please WhatsApp +256 775 781560 or email nelsonbastian94@gmail.com.";
}

async function handleChatSend() {
    const message = chatbotInput?.value.trim();
    if (!message) return;
    addChatMessage(message, true);
    if (chatbotInput) chatbotInput.value = '';
    const response = await getAIResponse(message);
    setTimeout(() => addChatMessage(response, false), 500);
}

if (chatbotSendBtn) chatbotSendBtn.addEventListener('click', handleChatSend);
if (chatbotInput) chatbotInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleChatSend(); });

// Contact form WhatsApp submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('contactName')?.value.trim();
        const email = document.getElementById('contactEmail')?.value.trim();
        const company = document.getElementById('contactCompany')?.value.trim();
        const service = document.getElementById('contactService')?.value;
        const message = document.getElementById('contactMessage')?.value.trim();
        if (!name || !email || !service || !message) {
            alert('Please fill in all required fields');
            return;
        }
        let whatsappMessage = `*New Contact Form Submission*%0A%0A`;
        whatsappMessage += `*Name:* ${encodeURIComponent(name)}%0A`;
        whatsappMessage += `*Email:* ${encodeURIComponent(email)}%0A`;
        if (company) whatsappMessage += `*Company:* ${encodeURIComponent(company)}%0A`;
        whatsappMessage += `*Service:* ${encodeURIComponent(service)}%0A`;
        whatsappMessage += `*Message:* ${encodeURIComponent(message)}%0A%0A`;
        whatsappMessage += `*Sent from MetaVolt Tech Website*`;
        window.open(`https://wa.me/256775781560?text=${whatsappMessage}`, '_blank');
        alert('Thank you! You will be redirected to WhatsApp to send your message.');
    });
}

// Active nav link
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === 'index.html' && href === 'index.html')) {
        link.classList.add('active');
    }
});

// Fade in on scroll
const fadeElements = document.querySelectorAll('.fade-in');
const fadeInOnScroll = () => {
    fadeElements.forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight - 150) {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
        }
    });
};
fadeElements.forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.8s ease, transform 0.8s ease";
});
window.addEventListener('scroll', fadeInOnScroll);
window.addEventListener('load', fadeInOnScroll);