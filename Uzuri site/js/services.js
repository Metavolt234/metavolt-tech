// ==========================================================
// Nzuri CARE LLC - JAVASCRIPT FILE/FUNCTIONALITY ON BUTTONS
// ==========================================================

// Configuration for Nzuri Care LLC
const CONFIG = {
    company: {
        name: "Nzuri Care LLC",
        phone: "+1 (470) 529-9891",
        whatsapp: "+14705299891",
        sms: "+14705299891",
        email: "nzurillc40@gmail.com",
        address: "3078 Claimont Rd, Ne Atlanta"
    },
    services: {
        personal: "Personal Care",
        companion: "Companion Care", 
        dementia: "Dementia Care",
        respite: "Respite Care"
    },
    // Formspree Configuration
    formspree: {
        formId: "movggkbq" // Formspree form ID
    }
};

// Global State
let isChatOpen = false;
let isMobileMenuOpen = false;

// ============================================
// 1. MAIN INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('Nzuri Care LLC - Page Loading...');
    
    // Initialize all components
    initializeNavigation();
    initializeHamburgerMenu();
    initializeModals();
    initializeContactForms();
    createCommunicationButtons();
    setupPhoneCalls();
    setupWhatsAppLinks();
    setupSMSLinks();
    setupServiceCards();
    setupFooterLinks();
    setupEmailLinks();
    
    // Show welcome message on home page only
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        setTimeout(() => {
            showNotification('Welcome to Nzuri Care! We provide compassionate senior care services.', 'info');
        }, 1500);
    }
    
    console.log('Page initialized successfully!');
});

// ============================================
// 2. HAMBURGER MENU FUNCTIONALITY
// ============================================

function initializeHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!hamburger || !navMenu) return;
    
    hamburger.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMobileMenu();
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (isMobileMenuOpen) {
                toggleMobileMenu();
            }
        });
    });
    
    document.addEventListener('click', function(e) {
        if (isMobileMenuOpen && 
            !navMenu.contains(e.target) && 
            !hamburger.contains(e.target)) {
            toggleMobileMenu();
        }
    });
    
    const dropdowns = document.querySelectorAll('.dropdown > .nav-link');
    dropdowns.forEach(dropdownLink => {
        dropdownLink.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const dropdownMenu = this.nextElementSibling;
                if (dropdownMenu && dropdownMenu.classList.contains('dropdown-menu')) {
                    dropdownMenu.classList.toggle('show');
                }
            }
        });
    });
    
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
                if (!menu.contains(e.target) && !menu.previousElementSibling.contains(e.target)) {
                    menu.classList.remove('show');
                }
            });
        }
    });
}

function toggleMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!hamburger || !navMenu) return;
    
    isMobileMenuOpen = !isMobileMenuOpen;
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'auto';
    
    if (!isMobileMenuOpen) {
        document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
            menu.classList.remove('show');
        });
    }
}

// ============================================
// 3. NAVIGATION FUNCTIONALITY
// ============================================

function initializeNavigation() {
    setActiveNavLink();
    
    if (window.innerWidth > 768) {
        const dropdowns = document.querySelectorAll('.dropdown');
        dropdowns.forEach(dropdown => {
            dropdown.addEventListener('mouseenter', function() {
                const menu = this.querySelector('.dropdown-menu');
                if (menu) menu.style.display = 'block';
            });
            
            dropdown.addEventListener('mouseleave', function() {
                const menu = this.querySelector('.dropdown-menu');
                if (menu) menu.style.display = 'none';
            });
        });
    }
    
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            isMobileMenuOpen = false;
            document.querySelector('.hamburger')?.classList.remove('active');
            document.querySelector('.nav-menu')?.classList.remove('active');
            document.body.style.overflow = 'auto';
            
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                menu.style.display = '';
                menu.classList.remove('show');
            });
        }
    });
}

function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || 
            (currentPage === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// ============================================
// 4. MODAL FUNCTIONALITY
// ============================================

function initializeModals() {
    const appointmentModal = document.getElementById('appointmentModal');
    const successModal = document.getElementById('successModal');
    
    if (!appointmentModal || !successModal) return;
    
    const consultationButtons = [
        document.getElementById('consultationBtn'),
        document.getElementById('heroConsultation')
    ];
    
    consultationButtons.forEach(button => {
        if (button) {
            button.addEventListener('click', function() {
                openModal(appointmentModal);
                logInteraction('consultation_modal_opened');
            });
        }
    });
    
    const closeButtons = document.querySelectorAll('.close-modal, #closeSuccess');
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal);
        });
    });
    
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            closeModal(e.target);
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const openModal = document.querySelector('.modal[style*="display: flex"]');
            if (openModal) closeModal(openModal);
        }
    });
    
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
    }
}

function openModal(modal) {
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        modal.scrollTop = 0;
    }
}

function closeModal(modal) {
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// ============================================
// 5. CONTACT FORM HANDLING
// ============================================

function initializeContactForms() {
    const appointmentForm = document.getElementById('appointmentForm');
    
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', handleFormSubmit);
    }
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    if (!validateForm(data)) {
        showNotification('Please fill in all required fields correctly.', 'error');
        return;
    }
    
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    fetch(`https://formspree.io/f/${CONFIG.formspree.formId}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: data.name,
            email: data.email,
            phone: data.phone,
            service: data.service || 'General Inquiry',
            date: data.date || 'Not specified',
            message: data.message || 'No additional message',
            _subject: `New Appointment Request: ${data.name} - Nzuri Care`
        })
    })
    .then(response => {
        if (response.ok) {
            showNotification('Appointment request sent successfully! We\'ll contact you soon.', 'success');
            closeModal(document.getElementById('appointmentModal'));
            openModal(document.getElementById('successModal'));
            form.reset();
            saveConsultationToStorage(data);
            logInteraction('consultation_submitted', { 
                service: data.service,
                email_status: 'sent'
            });
        } else {
            throw new Error('Form submission failed');
        }
    })
    .catch(error => {
        console.error('Form submission error:', error);
        showNotification('Failed to send appointment request. Please try again or call us directly.', 'error');
        setTimeout(() => {
            sendEmailViaMailto(data);
        }, 1000);
    })
    .finally(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    });
}

function saveConsultationToStorage(data) {
    const consultations = JSON.parse(localStorage.getItem('consultations') || '[]');
    consultations.push({
        ...data,
        id: Date.now(),
        timestamp: new Date().toISOString(),
        status: 'pending',
        source: 'formspree'
    });
    localStorage.setItem('consultations', JSON.stringify(consultations.slice(-50)));
}

function validateForm(data) {
    if (!data.name || !data.email || !data.phone) {
        showNotification('Please fill in Name, Email, and Phone fields.', 'error');
        return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showNotification('Please enter a valid email address.', 'error');
        return false;
    }
    
    const cleanedPhone = data.phone.replace(/\D/g, '');
    if (cleanedPhone.length < 10) {
        showNotification('Please enter a valid phone number (at least 10 digits).', 'error');
        return false;
    }
    
    return true;
}

function sendEmailViaMailto(data) {
    const subject = `New Consultation Request: ${data.name} - Nzuri Care`;
    const body = `
NEW CONSULTATION REQUEST - Nzuri CARE LLC

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Service: ${data.service || 'Not specified'}
Preferred Date: ${data.date || 'Not specified'}
Message: ${data.message || 'No additional message'}

Received: ${new Date().toLocaleString()}

Please contact this person within 24 hours.
    `.trim();
    
    const mailtoLink = `mailto:${CONFIG.company.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink, '_blank');
}

// ============================================
// 6. SMS FUNCTIONALITY
// ============================================

function setupSMSLinks() {
    document.addEventListener('click', function(e) {
        if (e.target.closest('#smsBtn') || 
            e.target.closest('[data-sms]') ||
            e.target.closest('.sms-link')) {
            e.preventDefault();
            sendSMS();
        }
    });
}

function sendSMS() {
    const phoneNumber = CONFIG.company.sms.replace(/\D/g, '');
    
    // SMS link with ONLY the phone number (no pre-filled message)
    const smsLink = `sms:${phoneNumber}`;
    
    if (isMobileDevice()) {
        window.location.href = smsLink;
    } else {
        const formattedNumber = formatPhoneNumber(phoneNumber);
        showNotification(`To send a text message, open your messaging app and send to: ${formattedNumber}`, 'info');
        
        if (navigator.clipboard && confirm(`Copy ${formattedNumber} to clipboard?`)) {
            navigator.clipboard.writeText(phoneNumber)
                .then(() => showNotification('Phone number copied to clipboard!', 'success'))
                .catch(() => showNotification('Failed to copy phone number', 'error'));
        }
    }
    
    logInteraction('sms_initiated', { number: phoneNumber });
}

// ============================================
// 7. PHONE CALL FUNCTIONALITY
// ============================================

function setupPhoneCalls() {
    document.querySelectorAll('a[href^="tel:"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const phoneNumber = this.getAttribute('href').replace('tel:', '');
            makePhoneCall(phoneNumber);
        });
    });
    
    const phoneRegex = /(\+?1?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4})/g;
    
    document.querySelectorAll('p, span, div, li').forEach(element => {
        if (element.textContent.match(phoneRegex) && 
            !element.closest('a') && 
            element.textContent.indexOf('tel:') === -1) {
            const newHTML = element.innerHTML.replace(phoneRegex, 
                '<a href="tel:$1" class="phone-link">$1</a>'
            );
            element.innerHTML = newHTML;
        }
    });
    
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('phone-link')) {
            e.preventDefault();
            const phoneNumber = e.target.textContent;
            makePhoneCall(phoneNumber);
        }
    });
}

function makePhoneCall(phoneNumber = CONFIG.company.phone) {
    const formattedNumber = formatPhoneNumber(phoneNumber);
    
    if (!isMobileDevice()) {
        const confirmed = confirm(`Call ${formattedNumber}?`);
        if (!confirmed) return;
    }
    
    logInteraction('phone_call_attempted', { number: phoneNumber });
    window.location.href = `tel:${phoneNumber.replace(/\D/g, '')}`;
    
    if (!isMobileDevice()) {
        showNotification(`Calling ${formattedNumber}...`, 'info');
    }
}

function formatPhoneNumber(phone) {
    const cleaned = ('' + phone).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return phone;
}

function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// ============================================
// 8. WHATSAPP FUNCTIONALITY
// ============================================

function setupWhatsAppLinks() {
    document.addEventListener('click', function(e) {
        if (e.target.closest('#whatsappBtn') || 
            e.target.closest('[data-whatsapp]') ||
            e.target.closest('.whatsapp-link')) {
            e.preventDefault();
            openWhatsApp();
        }
    });
}

function openWhatsApp() {
    const phoneNumber = CONFIG.company.whatsapp.replace(/\D/g, '');
    const message = encodeURIComponent("Hello Nzuri Care! I'm interested in your senior care services. Can you help me?");
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    
    window.open(whatsappUrl, '_blank');
    logInteraction('whatsapp_chat_opened');
}

// ============================================
// 9. EMAIL FUNCTIONALITY - UPDATED TO OPEN GMAIL DIRECTLY
// ============================================

function setupEmailLinks() {
    document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const email = this.getAttribute('href').replace('mailto:', '');
            openGmailCompose(email);
        });
    });
}

function openGmailCompose(email = CONFIG.company.email) {
    const subject = encodeURIComponent("Inquiry about Nzuri Care Senior Care Services");
    const body = encodeURIComponent(`Dear Nzuri Care Team,\n\nI would like to learn more about your senior care services.\n\nPlease send me information about:\n- Available services and pricing\n- Consultation availability\n- Insurance coverage\n- Service areas\n\nBest regards,\n[Your Name]\n[Your Phone Number]`);
    
    // Check if user is on mobile or desktop
    const isMobile = isMobileDevice();
    
    if (isMobile) {
        // For mobile, try to open Gmail app directly
        const gmailAppUrl = `googlechrome://compose?to=${email}&subject=${subject}&body=${body}`;
        const gmailWebUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`;
        
        // Try to open Gmail app, fallback to web
        window.location.href = gmailAppUrl;
        setTimeout(() => {
            window.open(gmailWebUrl, '_blank');
        }, 500);
    } else {
        // For desktop, open Gmail in new tab
        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`;
        window.open(gmailUrl, '_blank');
    }
    
    logInteraction('gmail_opened', { platform: isMobile ? 'mobile' : 'desktop' });
}

// ============================================
// 10. COMMUNICATION BUTTONS - UPDATED WITH GMAIL
// ============================================

function createCommunicationButtons() {
    const existingContainer = document.querySelector('.com-buttons-container');
    if (existingContainer) existingContainer.remove();
    
    const container = document.createElement('div');
    container.className = 'com-buttons-container';
    
    // Define buttons - UPDATED WITH GMAIL ACTION
    const buttons = [
        {
            id: 'phoneBtn',
            icon: 'fas fa-phone',
            text: 'Call Us',
            color: '#3498db',
            action: () => makePhoneCall(CONFIG.company.phone)
        },
        {
            id: 'smsBtn',
            icon: 'fas fa-sms',
            text: 'Text Message',
            color: '#FF9800',
            action: sendSMS
        },
        {
            id: 'whatsappBtn',
            icon: 'fab fa-whatsapp',
            text: 'WhatsApp',
            color: '#25D366',
            action: openWhatsApp
        },
        {
            id: 'emailBtn',
            icon: 'fas fa-envelope',
            text: 'Gmail', // Changed from "Email" to "Gmail"
            color: '#EA4335',
            action: () => openGmailCompose(CONFIG.company.email) // Updated to use Gmail
        },
        {
            id: 'chatBtn',
            icon: 'fas fa-comments',
            text: 'Live Chat',
            color: '#9b59b6',
            action: () => {
                const chatWidget = document.getElementById('chatWidget');
                if (chatWidget) {
                    chatWidget.classList.toggle('active');
                    isChatOpen = !isChatOpen;
                } else {
                    createChatWidget();
                }
                logInteraction('chat_toggled', { isOpen: isChatOpen });
            }
        },
        {
            id: 'consultBtn',
            icon: 'fas fa-calendar-check',
            text: 'Free Consultation',
            color: '#2ecc71',
            action: () => {
                const modal = document.getElementById('appointmentModal');
                if (modal) {
                    openModal(modal);
                } else {
                    window.location.href = 'contact.html';
                }
            }
        }
    ];
    
    buttons.forEach((btn, index) => {
        const button = createComButton(btn, index);
        container.appendChild(button);
    });
    
    document.body.appendChild(container);
    addComButtonsStyles();
}

function createComButton(config, index) {
    const button = document.createElement('button');
    button.id = config.id;
    button.className = 'com-button';
    button.setAttribute('aria-label', config.text);
    button.innerHTML = `
        <i class="${config.icon}"></i>
        <span class="btn-text">${config.text}</span>
    `;
    
    button.style.backgroundColor = config.color;
    button.style.bottom = `${20 + (index * 70)}px`;
    
    if (window.innerWidth > 768) {
        button.addEventListener('mouseenter', () => {
            button.style.width = '140px';
            button.querySelector('.btn-text').style.opacity = '1';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.width = '60px';
            button.querySelector('.btn-text').style.opacity = '0';
        });
    }
    
    button.addEventListener('click', config.action);
    
    return button;
}

// ============================================
// 11. LIVE CHAT FUNCTIONALITY - UPDATED WITH GMAIL
// ============================================

function toggleChat() {
    const chatWidget = document.getElementById('chatWidget');
    
    if (!chatWidget) {
        createChatWidget();
    } else {
        isChatOpen = !isChatOpen;
        chatWidget.classList.toggle('active');
    }
    
    logInteraction('chat_toggled', { isOpen: isChatOpen });
}

function createChatWidget() {
    const chatWidget = document.createElement('div');
    chatWidget.id = 'chatWidget';
    chatWidget.className = 'chat-widget';
    
    chatWidget.innerHTML = `
        <div class="chat-header">
            <div class="chat-header-content">
                <div class="chat-avatar">
                    <i class="fas fa-headset"></i>
                </div>
                <div>
                    <h4>Nzuri Care Support</h4>
                    <p class="chat-status">Online • Typically replies in minutes</p>
                </div>
            </div>
            <button class="close-chat" aria-label="Close chat">
                <i class="fas fa-times"></i>
            </button>
        </div>
        
        <div class="chat-messages">
            <div class="message bot">
                <div class="message-avatar">UC</div>
                <div class="message-content">
                    <div class="message-text">Hello! 👋 I'm here from Nzuri Care. How can I help you today?</div>
                    <div class="message-time">${getCurrentTime()}</div>
                </div>
            </div>
        </div>
        
        <div class="chat-quick-actions">
            <button class="quick-action" data-action="pricing">
                <i class="fas fa-dollar-sign"></i> Pricing Info
            </button>
            <button class="quick-action" data-action="hours">
                <i class="fas fa-clock"></i> Service Hours
            </button>
            <button class="quick-action" data-action="consultation">
                <i class="fas fa-calendar"></i> Free Consultation
            </button>
            <button class="quick-action" data-action="sms">
                <i class="fas fa-sms"></i> Text Message
            </button>
            <button class="quick-action" data-action="gmail">
                <i class="fas fa-envelope"></i> Gmail
            </button>
        </div>
        
        <div class="chat-input-container">
            <input type="text" 
                   class="chat-input" 
                   placeholder="Type your message here..." 
                   aria-label="Type your message">
            <button class="chat-send" aria-label="Send message">
                <i class="fas fa-paper-plane"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(chatWidget);
    isChatOpen = true;
    setupChatFunctionality();
    addChatWidgetStyles();
}

function setupChatFunctionality() {
    const chatWidget = document.getElementById('chatWidget');
    if (!chatWidget) return;
    
    const chatInput = chatWidget.querySelector('.chat-input');
    const sendButton = chatWidget.querySelector('.chat-send');
    const closeButton = chatWidget.querySelector('.close-chat');
    const quickActions = chatWidget.querySelectorAll('.quick-action');
    const chatMessages = chatWidget.querySelector('.chat-messages');
    
    const sendMessage = () => {
        const message = chatInput.value.trim();
        if (!message) return;
        
        addChatMessage(message, 'user');
        chatInput.value = '';
        setTimeout(() => generateChatResponse(message), 1000);
    };
    
    sendButton.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
    
    closeButton.addEventListener('click', () => {
        chatWidget.classList.remove('active');
        isChatOpen = false;
    });
    
    quickActions.forEach(action => {
        action.addEventListener('click', function() {
            const actionType = this.getAttribute('data-action');
            handleQuickAction(actionType);
        });
    });
    
    setTimeout(() => chatInput.focus(), 300);
}

function handleQuickAction(action) {
    let message = '';
    
    switch(action) {
        case 'pricing':
            message = "How much do your services cost?";
            break;
        case 'hours':
            message = "What are your hours of operation?";
            break;
        case 'consultation':
            message = "I'd like to schedule a free consultation";
            break;
        case 'sms':
            sendSMS();
            return;
        case 'gmail':
            openGmailCompose();
            return;
    }
    
    if (message) {
        addChatMessage(message, 'user');
        setTimeout(() => generateChatResponse(message), 800);
    }
}

function addChatMessage(text, sender) {
    const chatMessages = document.querySelector('.chat-messages');
    if (!chatMessages) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    
    if (sender === 'user') {
        messageDiv.innerHTML = `
            <div class="message-content user-message">
                <div class="message-text">${text}</div>
                <div class="message-time">${getCurrentTime()}</div>
            </div>
        `;
    } else {
        messageDiv.innerHTML = `
            <div class="message-avatar">UC</div>
            <div class="message-content">
                <div class="message-text">${text}</div>
                <div class="message-time">${getCurrentTime()}</div>
            </div>
        `;
    }
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function generateChatResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    let response = "Thank you for your message! Our care coordinator will respond shortly.";
    
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('rate')) {
        response = "Our pricing depends on the level of care needed. We offer competitive rates starting at $25/hour. Would you like a personalized quote?";
        
        setTimeout(() => {
            const chatMessages = document.querySelector('.chat-messages');
            const actionDiv = document.createElement('div');
            actionDiv.className = 'chat-action';
            actionDiv.innerHTML = `
                <button class="btn btn-small" onclick="window.location.href='contact.html'">
                    <i class="fas fa-calendar-check"></i> Get Free Quote
                </button>
                <button class="btn btn-small" onclick="sendSMS()" style="margin-left: 10px; background-color: #FF9800;">
                    <i class="fas fa-sms"></i> Text for Quote
                </button>
                <button class="btn btn-small" onclick="openGmailCompose()" style="margin-left: 10px; background-color: #EA4335;">
                    <i class="fas fa-envelope"></i> Email for Quote
                </button>
            `;
            chatMessages.appendChild(actionDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 500);
        
    } else if (lowerMessage.includes('hour') || lowerMessage.includes('time') || lowerMessage.includes('available')) {
        response = "We provide 24/7 care services! Our office hours are Monday-Friday, 8 AM to 8 PM for consultations. Emergency care is always available.";
        
    } else if (lowerMessage.includes('consultation') || lowerMessage.includes('schedule') || lowerMessage.includes('meeting')) {
        response = "I can help schedule a free consultation! Would you like to book one now?";
        
        setTimeout(() => {
            const chatMessages = document.querySelector('.chat-messages');
            const actionDiv = document.createElement('div');
            actionDiv.className = 'chat-action';
            actionDiv.innerHTML = `
                <button class="btn btn-small" onclick="window.location.href='contact.html'">
                    <i class="fas fa-calendar"></i> Schedule Now
                </button>
                <button class="btn btn-small" onclick="sendSMS()" style="margin-left: 10px; background-color: #FF9800;">
                    <i class="fas fa-sms"></i> Text to Schedule
                </button>
                <button class="btn btn-small" onclick="openGmailCompose()" style="margin-left: 10px; background-color: #EA4335;">
                    <i class="fas fa-envelope"></i> Email to Schedule
                </button>
            `;
            chatMessages.appendChild(actionDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 500);
        
    } else if (lowerMessage.includes('emergency') || lowerMessage.includes('urgent')) {
        response = `For immediate assistance, please call us at ${formatPhoneNumber(CONFIG.company.phone)} or send a text message to ${formatPhoneNumber(CONFIG.company.sms)}. Our emergency team is available 24/7.`;
        
    } else if (lowerMessage.includes('service') || lowerMessage.includes('care') || lowerMessage.includes('help')) {
        response = "We offer Personal Care, Companion Care, Dementia Care, and Respite Care. Each service is tailored to individual needs. Which service interests you most?";
    }
    
    addChatMessage(response, 'bot');
}

function getCurrentTime() {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// ============================================
// 12. SERVICE CARDS FUNCTIONALITY
// ============================================

function setupServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.style.cursor = 'pointer';
        
        card.addEventListener('click', function(e) {
            if (!e.target.closest('a') && !e.target.closest('button')) {
                const link = this.querySelector('a.btn-service');
                if (link) {
                    e.preventDefault();
                    window.location.href = link.href;
                }
            }
        });
        
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 30px rgba(0,0,0,0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 20px rgba(0,0,0,0.08)';
        });
    });
}

// ============================================
// 13. FOOTER LINKS FUNCTIONALITY
// ============================================

function setupFooterLinks() {
    document.querySelectorAll('footer a[href^="tel:"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const phoneNumber = this.getAttribute('href').replace('tel:', '');
            makePhoneCall(phoneNumber);
        });
    });
    
    document.querySelectorAll('footer a[href^="mailto:"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const email = this.getAttribute('href').replace('mailto:', '');
            openGmailCompose(email);
        });
    });
}

// ============================================
// 14. UTILITY FUNCTIONS
// ============================================

function showNotification(message, type = 'info') {
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    
    notification.innerHTML = `
        <i class="fas fa-${icons[type] || 'info-circle'}"></i>
        <span>${message}</span>
        <button class="notification-close" aria-label="Close notification">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => notification.classList.add('show'), 10);
    
    const timeout = setTimeout(() => {
        hideNotification(notification);
    }, 5000);
    
    notification.querySelector('.notification-close').addEventListener('click', () => {
        clearTimeout(timeout);
        hideNotification(notification);
    });
}

function hideNotification(notification) {
    notification.classList.remove('show');
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 300);
}

function logInteraction(type, data = {}) {
    const log = {
        type,
        data,
        timestamp: new Date().toISOString(),
        page: window.location.pathname
    };
    
    try {
        const logs = JSON.parse(localStorage.getItem('interaction_logs') || '[]');
        logs.push(log);
        localStorage.setItem('interaction_logs', JSON.stringify(logs.slice(-100)));
    } catch (error) {
        console.error('Failed to log interaction:', error);
    }
}

// ============================================
// 15. STYLE INJECTIONS
// ============================================

function addComButtonsStyles() {
    const style = document.createElement('style');
    style.textContent = `
        /* Communication Buttons */
        .com-buttons-container {
            position: fixed;
            right: 30px;
            bottom: 20px;
            z-index: 1000;
            display: flex;
            flex-direction: column;
            gap: 10px;
            align-items: flex-end;
            padding: 5px;
        }
        
        .com-button {
            width: 60px;
            height: 60px;
            border-radius: 30px;
            border: none;
            color: white;
            cursor: pointer;
            display: flex;
            align-items: center;
            overflow: hidden;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            padding: 0;
        }
        
        .com-button:hover {
            width: 140px;
            box-shadow: 0 6px 20px rgba(0,0,0,0.3);
        }
        
        .com-button i {
            font-size: 22px;
            min-width: 60px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .com-button .btn-text {
            font-size: 14px;
            font-weight: 500;
            white-space: nowrap;
            padding-right: 15px;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .com-button:hover .btn-text {
            opacity: 1;
        }
        
        /* Button Colors */
        #phoneBtn { background: linear-gradient(135deg, #3498db, #2980b9); }
        #smsBtn { background: linear-gradient(135deg, #FF9800, #F57C00); }
        #whatsappBtn { background: linear-gradient(135deg, #25D366, #128C7E); }
        #emailBtn { background: linear-gradient(135deg, #EA4335, #D14836); }
        #chatBtn { background: linear-gradient(135deg, #9b59b6, #8e44ad); }
        #consultBtn { background: linear-gradient(135deg, #2ecc71, #27ae60); }
        
        /* Mobile Responsive */
        @media (max-width: 768px) {
            .com-buttons-container {
                right: 10px;
                bottom: 10px;
            }
            
            .com-button {
                width: 50px;
                height: 50px;
            }
            
            .com-button i {
                min-width: 50px;
                font-size: 20px;
            }
            
            .com-button:hover {
                width: 50px;
            }
            
            .com-button .btn-text {
                display: none;
            }
        }
    `;
    
    document.head.appendChild(style);
}

function addChatWidgetStyles() {
    const style = document.createElement('style');
    style.textContent = `
        /* Chat Widget */
        .chat-widget {
            position: fixed;
            bottom: 100px;
            right: 20px;
            width: 350px;
            height: 500px;
            background: white;
            border-radius: 15px;
            box-shadow: 0 15px 50px rgba(0,0,0,0.2);
            display: none;
            flex-direction: column;
            z-index: 1001;
            overflow: hidden;
        }
        
        .chat-widget.active {
            display: flex;
            animation: slideUp 0.3s ease;
        }
        
        .chat-header {
            background: linear-gradient(135deg, #3498db 0%, #2c3e50 100%);
            color: white;
            padding: 15px 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .chat-header-content {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        
        .chat-avatar {
            width: 40px;
            height: 40px;
            background: rgba(255,255,255,0.2);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
        }
        
        .chat-header h4 {
            margin: 0;
            font-size: 16px;
            font-weight: 600;
        }
        
        .chat-status {
            margin: 2px 0 0 0;
            font-size: 12px;
            opacity: 0.8;
        }
        
        .close-chat {
            background: none;
            border: none;
            color: white;
            font-size: 20px;
            cursor: pointer;
            padding: 5px;
        }
        
        .chat-messages {
            flex: 1;
            padding: 20px;
            overflow-y: auto;
            background: #f8f9fa;
        }
        
        .message {
            display: flex;
            margin-bottom: 15px;
        }
        
        .message.bot {
            align-self: flex-start;
        }
        
        .message.user {
            align-self: flex-end;
            flex-direction: row-reverse;
        }
        
        .message-avatar {
            width: 35px;
            height: 35px;
            background: #3498db;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            font-size: 14px;
            flex-shrink: 0;
            margin-top: 5px;
        }
        
        .message-content {
            margin: 0 10px;
            max-width: 80%;
        }
        
        .user-message {
            background: #3498db;
            color: white;
            padding: 12px 15px;
            border-radius: 18px 18px 5px 18px;
        }
        
        .message.bot .message-content {
            background: white;
            padding: 12px 15px;
            border-radius: 18px 18px 18px 5px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        
        .message-text {
            font-size: 14px;
            line-height: 1.4;
            word-wrap: break-word;
        }
        
        .message-time {
            font-size: 11px;
            opacity: 0.7;
            margin-top: 4px;
            text-align: right;
        }
        
        .chat-quick-actions {
            padding: 12px 15px;
            background: white;
            border-top: 1px solid #eee;
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
        }
        
        .quick-action {
            padding: 8px 12px;
            background: #f8f9fa;
            border: 1px solid #ddd;
            border-radius: 15px;
            font-size: 12px;
            cursor: pointer;
            transition: all 0.2s;
            display: flex;
            align-items: center;
            gap: 5px;
        }
        
        .quick-action:hover {
            background: #3498db;
            color: white;
            border-color: #3498db;
        }
        
        .chat-input-container {
            padding: 15px;
            border-top: 1px solid #eee;
            display: flex;
            gap: 10px;
            background: white;
        }
        
        .chat-input {
            flex: 1;
            padding: 12px 15px;
            border: 2px solid #e0e0e0;
            border-radius: 25px;
            font-size: 14px;
            outline: none;
            transition: border-color 0.3s;
        }
        
        .chat-input:focus {
            border-color: #3498db;
        }
        
        .chat-send {
            width: 45px;
            height: 45px;
            border-radius: 50%;
            background: #3498db;
            color: white;
            border: none;
            cursor: pointer;
            transition: background 0.3s;
        }
        
        .chat-send:hover {
            background: #2980b9;
        }
        
        .chat-action {
            margin: 15px 0;
            text-align: center;
        }
        
        .chat-action .btn {
            padding: 8px 16px;
            font-size: 13px;
        }
        
        /* SMS Button in Chat Actions */
        .btn-small[style*="background-color: #FF9800"] {
            background: linear-gradient(135deg, #FF9800, #F57C00) !important;
            border: none;
            color: white;
        }
        
        .btn-small[style*="background-color: #FF9800"]:hover {
            background: linear-gradient(135deg, #F57C00, #E65100) !important;
        }
        
        /* Notification Styles */
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.15);
            display: flex;
            align-items: center;
            gap: 12px;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            z-index: 1002;
            max-width: 350px;
        }
        
        .notification.show {
            transform: translateX(0);
        }
        
        .notification i {
            font-size: 20px;
        }
        
        .notification.success i { color: #2ecc71; }
        .notification.error i { color: #e74c3c; }
        .notification.warning i { color: #f39c12; }
        .notification.info i { color: #3498db; }
        
        .notification span {
            flex: 1;
            font-size: 14px;
            line-height: 1.4;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: #888;
            cursor: pointer;
            font-size: 16px;
            padding: 0;
            margin-left: 10px;
        }
        
        @media (max-width: 768px) {
            .chat-widget {
                width: calc(100% - 20px);
                height: 70vh;
                right: 10px;
                bottom: 80px;
            }
            
            .notification {
                right: 10px;
                left: 10px;
                max-width: none;
            }
        }
        
        @keyframes slideUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    
    document.head.appendChild(style);
}

// ============================================
// 16. GLOBAL EXPORTS - UPDATED
// ============================================

window.makePhoneCall = makePhoneCall;
window.openWhatsApp = openWhatsApp;
window.openGmailCompose = openGmailCompose; // Updated export
window.sendSMS = sendSMS;
window.toggleChat = toggleChat;
window.openModal = openModal;
window.closeModal = closeModal;
window.showNotification = showNotification;

console.log('Nzuri Care JavaScript fully loaded with all buttons functionality!');