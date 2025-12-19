// ==========================================================
// UZURI CARE SERVICES - JAVASCRIPT FOR SERVICE PAGES
// ==========================================================

// Configuration for Uzuri Care LLC
const CONFIG = {
    company: {
        name: "Uzuri Care LLC",
        phone: "+1 (470) 529-9891",
        whatsapp: "+14705299891",
        email: "nzurillc04@gmail.com",
        address: "3078 Clairmount RD NE"
    }
};

// Global State
let isChatOpen = false;
let isMobileMenuOpen = false;

// ============================================
// 1. MAIN INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('Uzuri Care Services - Page Loading...');
    
    // Initialize all components
    initializeNavigation();
    initializeHamburgerMenu();
    initializeModals();
    createCommunicationButtons();
    setupPhoneCalls();
    setupWhatsAppLinks();
    setupServiceCards();
    setupFooterLinks();
    setupEmailLinks();
    
    // Apply orange background to service icons
    styleServiceIcons();
    
    console.log('Service page initialized successfully!');
});

// ============================================
// 2. HAMBURGER MENU FUNCTIONALITY
// ============================================

function initializeHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!hamburger || !navMenu) return;
    
    // Toggle menu on hamburger click
    hamburger.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMobileMenu();
    });
    
    // Close menu when clicking on a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (isMobileMenuOpen) {
                toggleMobileMenu();
            }
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (isMobileMenuOpen && 
            !navMenu.contains(e.target) && 
            !hamburger.contains(e.target)) {
            toggleMobileMenu();
        }
    });
    
    // Handle dropdowns on mobile
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
    
    // Close dropdowns when clicking elsewhere
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
    
    // Toggle body scroll
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'auto';
    
    // Close all dropdowns when closing menu
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
    // Set active navigation link
    setActiveNavLink();
    
    // Handle dropdown hover on desktop
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
    
    // Update on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            // Reset mobile menu state
            isMobileMenuOpen = false;
            document.querySelector('.hamburger')?.classList.remove('active');
            document.querySelector('.nav-menu')?.classList.remove('active');
            document.body.style.overflow = 'auto';
            
            // Reset dropdowns
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
        // Check for service pages
        if (linkHref === currentPage || 
            linkHref.includes(currentPage) ||
            (currentPage.includes('care.html') && linkHref.includes('services.html'))) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // Highlight current service in dropdown
    const dropdownLinks = document.querySelectorAll('.dropdown-menu a');
    dropdownLinks.forEach(link => {
        if (link.getAttribute('href').includes(currentPage)) {
            link.classList.add('active');
        }
    });
}

// ============================================
// 4. MODAL FUNCTIONALITY
// ============================================

function initializeModals() {
    const appointmentModal = document.getElementById('appointmentModal');
    const consultationBtn = document.getElementById('consultationBtn');
    
    if (consultationBtn) {
        consultationBtn.addEventListener('click', function() {
            if (appointmentModal) {
                openModal(appointmentModal);
            } else {
                // If no modal, redirect to contact page
                window.location.href = '../contact.html';
            }
        });
    }
    
    // Close buttons
    const closeButtons = document.querySelectorAll('.close-modal');
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal);
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            closeModal(e.target);
        }
    });
    
    // Close with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const openModal = document.querySelector('.modal[style*="display: flex"]');
            if (openModal) closeModal(openModal);
        }
    });
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
// 5. SERVICE ICONS - ORANGE BACKGROUND
// ============================================

function styleServiceIcons() {
    const serviceIcons = document.querySelectorAll('.service-icon');
    
    // Different orange shades for different service pages
    const getOrangeShade = () => {
        const currentPage = window.location.pathname.split('/').pop();
        
        if (currentPage.includes('personal-care')) return '#FF9800'; // Bright orange
        if (currentPage.includes('companion-care')) return '#F57C00'; // Dark orange
        if (currentPage.includes('dementia-care')) return '#FFB74D'; // Light orange
        if (currentPage.includes('respite-care')) return '#FF5722'; // Deep orange
        
        return '#FF9800'; // Default orange
    };
    
    const orangeColor = getOrangeShade();
    
    serviceIcons.forEach(icon => {
        // Apply orange background and white text
        icon.style.backgroundColor = orangeColor;
        icon.style.color = 'white';
        
        // Make it circular
        icon.style.width = '80px';
        icon.style.height = '80px';
        icon.style.borderRadius = '50%';
        icon.style.display = 'flex';
        icon.style.alignItems = 'center';
        icon.style.justifyContent = 'center';
        icon.style.margin = '0 auto 20px auto';
        icon.style.fontSize = '32px';
        icon.style.transition = 'all 0.3s ease';
        
        // Add hover effect
        icon.addEventListener('mouseenter', () => {
            icon.style.transform = 'scale(1.1) rotate(5deg)';
            icon.style.boxShadow = '0 8px 25px rgba(255, 152, 0, 0.4)';
        });
        
        icon.addEventListener('mouseleave', () => {
            icon.style.transform = 'scale(1) rotate(0deg)';
            icon.style.boxShadow = 'none';
        });
    });
    
    console.log(`Styled ${serviceIcons.length} service icons with ${orangeColor} background`);
}

// ============================================
// 6. SERVICE CARDS FUNCTIONALITY
// ============================================

function setupServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        // Make entire card clickable if it has a link
        const link = card.querySelector('a.btn, a.btn-service, a.btn-large');
        if (link && !card.hasAttribute('data-no-click')) {
            card.style.cursor = 'pointer';
            
            card.addEventListener('click', function(e) {
                if (!e.target.closest('a') && !e.target.closest('button')) {
                    e.preventDefault();
                    window.location.href = link.href;
                }
            });
        }
        
        // Hover effects
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
// 7. PHONE CALL FUNCTIONALITY
// ============================================

function setupPhoneCalls() {
    // Make all phone links clickable
    document.querySelectorAll('a[href^="tel:"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const phoneNumber = this.getAttribute('href').replace('tel:', '');
            makePhoneCall(phoneNumber);
        });
    });
    
    // Make call button work
    const callButtons = document.querySelectorAll('.call-btn, .btn-secondary');
    callButtons.forEach(button => {
        if (button.textContent.includes('Call') || button.textContent.includes('Phone')) {
            button.addEventListener('click', function(e) {
                if (!this.getAttribute('href') || this.getAttribute('href') === '#') {
                    e.preventDefault();
                    makePhoneCall(CONFIG.company.phone);
                }
            });
        }
    });
}

function makePhoneCall(phoneNumber = CONFIG.company.phone) {
    const formattedNumber = formatPhoneNumber(phoneNumber);
    
    // Ask for confirmation on desktop
    if (!isMobileDevice()) {
        const confirmed = confirm(`Call ${formattedNumber}?`);
        if (!confirmed) return;
    }
    
    // Initiate the call
    window.location.href = `tel:${phoneNumber.replace(/\D/g, '')}`;
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
    // Create WhatsApp button event
    document.addEventListener('click', function(e) {
        if (e.target.closest('#whatsappBtn') || 
            e.target.closest('[data-whatsapp]')) {
            e.preventDefault();
            openWhatsApp();
        }
    });
}

function openWhatsApp() {
    const phoneNumber = CONFIG.company.whatsapp.replace(/\D/g, '');
    const serviceName = document.querySelector('h1')?.textContent || 'Uzuri Care Services';
    const message = encodeURIComponent(`Hello Uzuri Care! I'm interested in your ${serviceName}. Can you help me?`);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    
    window.open(whatsappUrl, '_blank');
}

// ============================================
// 9. EMAIL FUNCTIONALITY
// ============================================

function setupEmailLinks() {
    // Make email links functional
    document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const email = this.getAttribute('href').replace('mailto:', '');
            sendDirectEmail(email);
        });
    });
}

function sendDirectEmail(email = CONFIG.company.email) {
    const serviceName = document.querySelector('h1')?.textContent || 'Uzuri Care Services';
    const subject = encodeURIComponent(`Inquiry about ${serviceName}`);
    const body = encodeURIComponent(`Dear Uzuri Care Team,\n\nI would like to learn more about your ${serviceName}.\n\nCould you please send me more information?\n\nBest regards,\n[Your Name]`);
    const mailtoLink = `mailto:${email}?subject=${subject}&body=${body}`;
    
    window.open(mailtoLink, '_blank');
}

// ============================================
// 10. COMMUNICATION BUTTONS
// ============================================

function createCommunicationButtons() {
    // Remove any existing buttons
    const existingContainer = document.querySelector('.com-buttons-container');
    if (existingContainer) existingContainer.remove();
    
    // Create container
    const container = document.createElement('div');
    container.className = 'com-buttons-container';
    
    // Define buttons
    const buttons = [
        {
            id: 'phoneBtn',
            icon: 'fas fa-phone',
            text: 'Call Us',
            color: '#3498db',
            action: () => makePhoneCall(CONFIG.company.phone)
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
            text: 'Email',
            color: '#EA4335',
            action: () => sendDirectEmail(CONFIG.company.email)
        },
        {
            id: 'consultBtn',
            icon: 'fas fa-calendar-check',
            text: 'Free Assessment',
            color: '#2ecc71',
            action: () => {
                const modal = document.getElementById('appointmentModal');
                if (modal) {
                    openModal(modal);
                } else {
                    window.location.href = '../contact.html';
                }
            }
        }
    ];
    
    // Create buttons
    buttons.forEach((btn, index) => {
        const button = createComButton(btn, index);
        container.appendChild(button);
    });
    
    // Add to page
    document.body.appendChild(container);
    
    // Add styles
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
    
    // Style
    button.style.backgroundColor = config.color;
    button.style.bottom = `${20 + (index * 70)}px`;
    
    // Hover effects for desktop
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
    
    // Click action
    button.addEventListener('click', config.action);
    
    return button;
}

// ============================================
// 11. FOOTER LINKS FUNCTIONALITY
// ============================================

function setupFooterLinks() {
    // Make footer phone numbers clickable
    document.querySelectorAll('footer a[href^="tel:"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const phoneNumber = this.getAttribute('href').replace('tel:', '');
            makePhoneCall(phoneNumber);
        });
    });
    
    // Make footer emails clickable
    document.querySelectorAll('footer a[href^="mailto:"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const email = this.getAttribute('href').replace('mailto:', '');
            sendDirectEmail(email);
        });
    });
    
    // Fix broken links in footer
    const footerLinks = document.querySelectorAll('footer a[href]');
    footerLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === 'index.html' || href === 'services.html' || 
            href === 'about.html' || href === 'contact.html' || 
            href === 'testimonials.html') {
            // Ensure proper relative path
            if (!href.startsWith('../') && !href.startsWith('/')) {
                link.setAttribute('href', '../' + href);
            }
        }
    });
}

// ============================================
// 12. UTILITY FUNCTIONS
// ============================================

function showNotification(message, type = 'info') {
    // Create notification element
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
        <button class="notification-close" aria-label="Close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    notification.style.cssText = `
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
        z-index: 1002;
        max-width: 350px;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
    
    // Close button
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
}

// ============================================
// 13. STYLE INJECTIONS
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
        #whatsappBtn { background: linear-gradient(135deg, #25D366, #128C7E); }
        #emailBtn { background: linear-gradient(135deg, #EA4335, #D14836); }
        #consultBtn { background: linear-gradient(135deg, #2ecc71, #27ae60); }
        
        /* Animations */
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
        
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

// ============================================
// 14. GLOBAL EXPORTS
// ============================================

// Make functions available globally
window.makePhoneCall = makePhoneCall;
window.openWhatsApp = openWhatsApp;
window.sendDirectEmail = sendDirectEmail;
window.openModal = openModal;
window.closeModal = closeModal;
window.showNotification = showNotification;

console.log('Uzuri Care Services JavaScript fully loaded!');