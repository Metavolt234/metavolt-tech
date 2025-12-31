// ==========================================================
// NZURI CARE LLC - JAVASCRIPT FOR ABOUT PAGE
// ==========================================================

// Configuration for Nzuri Care LLC
const CONFIG = {
    company: {
        name: "Nzuri Care LLC",
        phone: "+1 (470) 529-9891",
        phone2: "+1 (208) 664-1507", // From call button
        whatsapp: "+14705299891",
        email: "nzurillc40@gmail.com",
        email2: "nelsonsabastian94@gmail.com", // From footer
        address: "3078 Clairmount RD NE, Atlanta",
        hours: "Available 24/7"
    },
    social: {
        facebook: "#",
        twitter: "#",
        instagram: "#",
        linkedin: "#"
    }
};

// Global State
let isMobileMenuOpen = false;

// ============================================
// 1. MAIN INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('Nzuri Care About Page - Initializing...');
    
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
    setupAllIcons(); // Setup all icon interactions
    
    console.log('About page initialized successfully!');
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
        if (link.getAttribute('href') === currentPage) {
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
    const consultationBtn = document.getElementById('consultationBtn');
    
    if (consultationBtn) {
        consultationBtn.addEventListener('click', function() {
            if (appointmentModal) {
                openModal(appointmentModal);
            } else {
                // If no modal, redirect to contact page
                window.location.href = 'contact.html';
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
// 5. ALL ICONS FUNCTIONALITY
// ============================================

function setupAllIcons() {
    console.log('Setting up all icon interactions...');
    
    // 1. LOGO ICON (Heartbeat)
    const logoIcon = document.querySelector('.logo i.fa-heartbeat');
    if (logoIcon) {
        logoIcon.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'index.html';
        });
        
        // Add hover effect
        logoIcon.style.transition = 'all 0.3s ease';
        logoIcon.addEventListener('mouseenter', () => {
            logoIcon.style.transform = 'scale(1.2)';
            logoIcon.style.color = '#e74c3c';
        });
        logoIcon.addEventListener('mouseleave', () => {
            logoIcon.style.transform = 'scale(1)';
            logoIcon.style.color = '';
        });
    }
    
    // 2. SERVICE ICONS (Compassion, Excellence, Family Focus)
    const serviceIcons = document.querySelectorAll('.service-icon');
    serviceIcons.forEach((icon, index) => {
        // Apply orange background and white text
        icon.style.backgroundColor = '#FF9800';
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
        
        // Add click effect
        icon.addEventListener('click', function() {
            const title = this.parentElement.querySelector('h3').textContent;
            showNotification(`Learn more about our ${title} value`, 'info');
        });
        
        // Hover effects
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
            this.style.boxShadow = '0 8px 25px rgba(255, 152, 0, 0.4)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
            this.style.boxShadow = 'none';
        });
    });
    
    // 3. PHONE ICONS
    const phoneIcons = document.querySelectorAll('i.fa-phone');
    phoneIcons.forEach(icon => {
        icon.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            makePhoneCall(CONFIG.company.phone);
        });
        
        // Add hover effect
        icon.style.cursor = 'pointer';
        icon.style.transition = 'all 0.3s ease';
        icon.addEventListener('mouseenter', () => {
            icon.style.color = '#3498db';
            icon.style.transform = 'scale(1.2)';
        });
        icon.addEventListener('mouseleave', () => {
            icon.style.color = '';
            icon.style.transform = 'scale(1)';
        });
    });
    
    // 4. EMAIL ICONS
    const emailIcons = document.querySelectorAll('i.fa-envelope');
    emailIcons.forEach(icon => {
        icon.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            sendDirectEmail(CONFIG.company.email);
        });
        
        // Add hover effect
        icon.style.cursor = 'pointer';
        icon.style.transition = 'all 0.3s ease';
        icon.addEventListener('mouseenter', () => {
            icon.style.color = '#EA4335';
            icon.style.transform = 'scale(1.2)';
        });
        icon.addEventListener('mouseleave', () => {
            icon.style.color = '';
            icon.style.transform = 'scale(1)';
        });
    });
    
    // 5. LOCATION ICONS
    const locationIcons = document.querySelectorAll('i.fa-map-marker-alt');
    locationIcons.forEach(icon => {
        icon.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            openGoogleMaps(CONFIG.company.address);
        });
        
        // Add hover effect
        icon.style.cursor = 'pointer';
        icon.style.transition = 'all 0.3s ease';
        icon.addEventListener('mouseenter', () => {
            icon.style.color = '#e74c3c';
            icon.style.transform = 'scale(1.2)';
        });
        icon.addEventListener('mouseleave', () => {
            icon.style.color = '';
            icon.style.transform = 'scale(1)';
        });
    });
    
    // 6. CLOCK ICONS
    const clockIcons = document.querySelectorAll('i.fa-clock');
    clockIcons.forEach(icon => {
        icon.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            showNotification(`We're ${CONFIG.company.hours}! Call us anytime.`, 'info');
        });
        
        // Add hover effect
        icon.style.cursor = 'pointer';
        icon.style.transition = 'all 0.3s ease';
        icon.addEventListener('mouseenter', () => {
            icon.style.color = '#f39c12';
            icon.style.transform = 'scale(1.2)';
        });
        icon.addEventListener('mouseleave', () => {
            icon.style.color = '';
            icon.style.transform = 'scale(1)';
        });
    });
    
    // 7. SOCIAL MEDIA ICONS
    const socialIcons = document.querySelectorAll('.social-links i');
    socialIcons.forEach(icon => {
        const platform = icon.classList[1].replace('fa-', '');
        const parentLink = icon.closest('a');
        
        if (parentLink && parentLink.getAttribute('href') === '#') {
            parentLink.addEventListener('click', function(e) {
                e.preventDefault();
                showNotification(`Follow us on ${capitalizeFirstLetter(platform)}`, 'info');
            });
        }
        
        // Add hover effects
        icon.style.transition = 'all 0.3s ease';
        icon.addEventListener('mouseenter', () => {
            const colors = {
                facebook: '#4267B2',
                twitter: '#1DA1F2',
                instagram: '#E1306C',
                linkedin: '#0077B5'
            };
            icon.style.color = colors[platform] || '#333';
            icon.style.transform = 'scale(1.2)';
        });
        icon.addEventListener('mouseleave', () => {
            icon.style.color = '';
            icon.style.transform = 'scale(1)';
        });
    });
    
    // 8. CHEVRON DOWN ICONS (in dropdowns)
    const chevronIcons = document.querySelectorAll('.fa-chevron-down');
    chevronIcons.forEach(icon => {
        // Add animation on click
        icon.parentElement.addEventListener('click', function() {
            icon.style.transition = 'transform 0.3s ease';
            icon.style.transform = icon.style.transform === 'rotate(180deg)' ? 'rotate(0deg)' : 'rotate(180deg)';
        });
    });
    
    console.log(`Setup complete: ${serviceIcons.length} service icons, ${phoneIcons.length} phone icons, ${emailIcons.length} email icons`);
}

// ============================================
// 6. PHONE CALL FUNCTIONALITY
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

// ============================================
// 7. EMAIL FUNCTIONALITY
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
    const serviceName = "About Nzuri-Care Services";
    const subject = encodeURIComponent(`Inquiry about ${serviceName}`);
    const body = encodeURIComponent(`Dear Nzuri Care Team,\n\nI visited your About page and would like to learn more about your services.\n\nCould you please send me more information?\n\nBest regards,\n[Your Name]`);
    const mailtoLink = `mailto:${email}?subject=${subject}&body=${body}`;
    
    // Open directly without asking for confirmation
    window.location.href = mailtoLink;
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
    const message = encodeURIComponent(`Hello Nzuri Care! I visited your About page and would like to learn more about your services. Can you help me?`);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    
    window.open(whatsappUrl, '_blank');
}

// ============================================
// 9. SMS FUNCTIONALITY
// ============================================

function sendSMS() {
    const phoneNumber = CONFIG.company.phone.replace(/\D/g, '');
    const message = encodeURIComponent(`Hello Nzuri Care! I visited your About page and would like to learn more about your services.`);
    
    if (isMobileDevice()) {
        const smsLink = `sms:${phoneNumber}?body=${message}`;
        window.location.href = smsLink;
    } else {
        // For desktop
        const textArea = document.createElement('textarea');
        textArea.value = `Send this SMS to ${formatPhoneNumber(phoneNumber)}:\n\n${decodeURIComponent(message)}`;
        textArea.style.position = 'fixed';
        textArea.style.top = '0';
        textArea.style.left = '0';
        textArea.style.width = '100%';
        textArea.style.height = '100%';
        textArea.style.background = 'white';
        textArea.style.zIndex = '10000';
        textArea.style.fontSize = '16px';
        textArea.style.padding = '20px';
        textArea.style.boxSizing = 'border-box';
        
        const closeBtn = document.createElement('button');
        closeBtn.textContent = 'Close';
        closeBtn.style.position = 'fixed';
        closeBtn.style.top = '10px';
        closeBtn.style.right = '10px';
        closeBtn.style.zIndex = '10001';
        closeBtn.style.padding = '10px 20px';
        closeBtn.style.background = '#3498db';
        closeBtn.style.color = 'white';
        closeBtn.style.border = 'none';
        closeBtn.style.borderRadius = '5px';
        closeBtn.style.cursor = 'pointer';
        
        closeBtn.addEventListener('click', function() {
            document.body.removeChild(textArea);
            document.body.removeChild(closeBtn);
        });
        
        document.body.appendChild(textArea);
        document.body.appendChild(closeBtn);
        textArea.focus();
        textArea.select();
    }
}

// ============================================
// 10. GOOGLE MAPS FUNCTIONALITY
// ============================================

function openGoogleMaps(address = CONFIG.company.address) {
    const encodedAddress = encodeURIComponent(address);
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
    
    window.open(mapsUrl, '_blank');
}

// ============================================
// 11. COMMUNICATION BUTTONS
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
            id: 'smsBtn',
            icon: 'fas fa-sms',
            text: 'SMS',
            color: '#9b59b6',
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
                    window.location.href = 'contact.html';
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
    button.addEventListener('click', function(e) {
        e.preventDefault();
        config.action();
    });
    
    return button;
}

// ============================================
// 12. SERVICE CARDS FUNCTIONALITY
// ============================================

function setupServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
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
// 13. FOOTER LINKS FUNCTIONALITY
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
        // Ensure proper relative paths for footer navigation
        if (href && !href.startsWith('#') && !href.startsWith('http') && 
            !href.startsWith('mailto:') && !href.startsWith('tel:')) {
            // Check if link needs ../ prefix
            if (!href.startsWith('../') && !href.startsWith('/')) {
                link.setAttribute('href', href);
            }
        }
    });
}

// ============================================
// 14. UTILITY FUNCTIONS
// ============================================

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

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

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
        #smsBtn { background: linear-gradient(135deg, #9b59b6, #8e44ad); }
        #whatsappBtn { background: linear-gradient(135deg, #25D366, #128C7E); }
        #emailBtn { background: linear-gradient(135deg, #EA4335, #D14836); }
        #consultBtn { background: linear-gradient(135deg, #2ecc71, #27ae60); }
        
        /* Icon Hover Effects */
        .service-icon, 
        .social-links i,
        .contact-info i,
        .logo i {
            transition: all 0.3s ease !important;
        }
        
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
            
            .service-icon {
                width: 70px !important;
                height: 70px !important;
                font-size: 28px !important;
            }
        }
    `;
    
    document.head.appendChild(style);
}

// ============================================
// 16. GLOBAL EXPORTS
// ============================================

// Make functions available globally
window.makePhoneCall = makePhoneCall;
window.openWhatsApp = openWhatsApp;
window.sendDirectEmail = sendDirectEmail;
window.sendSMS = sendSMS;
window.openGoogleMaps = openGoogleMaps;
window.openModal = openModal;
window.closeModal = closeModal;
window.showNotification = showNotification;

console.log('Nzuri Care About Page JavaScript fully loaded!');