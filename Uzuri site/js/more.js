// ==========================================================
// NZURI CARE LLC - JAVASCRIPT FOR LEARN MORE PAGE
// ==========================================================

// Configuration for Nzuri Care LLC
const CONFIG = {
    company: {
        name: "Nzuri Care LLC",
        phone: "+1 (470) 529-9891",
        phone2: "+1 (208) 664-1507",
        whatsapp: "+14705299891",
        email: "nzurillc04@gmail.com",
        email2: "nelsonsabastian94@gmail.com",
        address: "3078 Clairmount Rd Ne Atlanta",
        hours: "Available 24/7"
    }
};

// Global State
let isMobileMenuOpen = false;
let currentVideo = null;

// ============================================
// 1. MAIN INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('Nzuri Care Learn More Page - Initializing...');
    
    // Initialize all components
    initializeNavigation();
    initializeHamburgerMenu();
    initializeModals();
    initializeVideoPlayer();
    createCommunicationButtons();
    setupPhoneCalls();
    setupWhatsAppLinks();
    setupServiceCards();
    setupFooterLinks();
    setupEmailLinks();
    setupAllIcons(); // Setup all icon interactions
    
    console.log('Learn More page initialized successfully!');
});

// ============================================
// 2. VIDEO PLAYER FUNCTIONALITY
// ============================================

function initializeVideoPlayer() {
    const playBtn = document.getElementById('playVideoBtn');
    const closeBtn = document.getElementById('closeVideoBtn');
    const videoPlaceholder = document.getElementById('videoPlaceholder');
    const videoPlayer = document.getElementById('videoPlayer');
    const videoElement = document.getElementById('companyVideo');
    
    if (!playBtn || !videoElement) return;
    
    // Store reference to video
    currentVideo = videoElement;
    
    // Play video when clicking play button
    playBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        
        // Hide placeholder, show video player
        videoPlaceholder.style.display = 'none';
        videoPlayer.style.display = 'block';
        
        // Start playing video
        videoElement.play().catch(function(error) {
            console.log('Video autoplay failed:', error);
            // If autoplay fails, show notification and ensure controls are visible
            videoElement.controls = true;
            showNotification('Click the play button to start the video', 'info');
        });
    });
    
    // Close video when clicking close button
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            closeVideoPlayer();
        });
    }
    
    // Close video with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && videoPlayer.style.display === 'block') {
            closeVideoPlayer();
        }
    });
    
    // Close video when clicking outside (on video wrapper only)
    videoPlayer.addEventListener('click', function(e) {
        if (e.target === videoPlayer) {
            closeVideoPlayer();
        }
    });
    
    // Reset video when it ends
    videoElement.addEventListener('ended', function() {
        // Show replay option
        const replayBtn = document.createElement('button');
        replayBtn.className = 'btn btn-primary replay-btn';
        replayBtn.innerHTML = '<i class="fas fa-redo"></i> Watch Again';
        replayBtn.style.marginTop = '1rem';
        
        replayBtn.addEventListener('click', function() {
            videoElement.currentTime = 0;
            videoElement.play();
            replayBtn.remove();
        });
        
        const caption = document.querySelector('.video-caption');
        if (caption && !caption.querySelector('.replay-btn')) {
            caption.appendChild(replayBtn);
        }
    });
}

function closeVideoPlayer() {
    const videoPlaceholder = document.getElementById('videoPlaceholder');
    const videoPlayer = document.getElementById('videoPlayer');
    const videoElement = document.getElementById('companyVideo');
    
    if (videoElement) {
        videoElement.pause();
        videoElement.currentTime = 0;
    }
    
    if (videoPlayer && videoPlaceholder) {
        videoPlayer.style.display = 'none';
        videoPlaceholder.style.display = 'block';
        
        // Remove any replay buttons
        const replayBtn = document.querySelector('.replay-btn');
        if (replayBtn) replayBtn.remove();
    }
}

// ============================================
// 3. HAMBURGER MENU FUNCTIONALITY
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
    
    // Close video if open
    if (isMobileMenuOpen) {
        closeVideoPlayer();
    }
}

// ============================================
// 4. NAVIGATION FUNCTIONALITY
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
// 5. ALL ICONS FUNCTIONALITY
// ============================================

function setupAllIcons() {
    console.log('Setting up all icon interactions...');
    
    // 1. SERVICE ICONS (User-check, Graduation-cap, Hand-holding-heart)
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
        
        // Add click effect - reveal more info
        icon.addEventListener('click', function() {
            const title = this.parentElement.querySelector('h3').textContent;
            const description = this.parentElement.querySelector('p').textContent;
            
            // Create a modal-like popup
            const infoPopup = document.createElement('div');
            infoPopup.className = 'icon-info-popup';
            infoPopup.innerHTML = `
                <div class="popup-content">
                    <h3>${title}</h3>
                    <p>${description}</p>
                    <button class="btn btn-small">Close</button>
                </div>
            `;
            
            // Style the popup
            infoPopup.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.7);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 2000;
            `;
            
            infoPopup.querySelector('.popup-content').style.cssText = `
                background: white;
                padding: 2rem;
                border-radius: 10px;
                max-width: 400px;
                text-align: center;
            `;
            
            // Close button functionality
            infoPopup.querySelector('button').addEventListener('click', function() {
                document.body.removeChild(infoPopup);
            });
            
            // Close when clicking outside
            infoPopup.addEventListener('click', function(e) {
                if (e.target === infoPopup) {
                    document.body.removeChild(infoPopup);
                }
            });
            
            document.body.appendChild(infoPopup);
        });
        
        // Hover effects
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
            this.style.boxShadow = '0 8px 25px rgba(255, 152, 0, 0.4)';
            this.style.cursor = 'pointer';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
            this.style.boxShadow = 'none';
        });
    });
    
    // 2. PHONE ICONS
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
    
    // 3. EMAIL ICONS
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
    
    // 4. LOCATION ICONS
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
    
    // 5. CLOCK ICONS
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
    
    // 6. SOCIAL MEDIA ICONS
    const socialIcons = document.querySelectorAll('.social-links i');
    socialIcons.forEach(icon => {
        const parentLink = icon.closest('a');
        
        if (parentLink && parentLink.getAttribute('href') === '#') {
            parentLink.addEventListener('click', function(e) {
                e.preventDefault();
                showNotification('Follow us on social media for updates and tips!', 'info');
            });
        }
        
        // Add hover effects
        icon.style.transition = 'all 0.3s ease';
        icon.addEventListener('mouseenter', () => {
            icon.style.transform = 'scale(1.2)';
        });
        icon.addEventListener('mouseleave', () => {
            icon.style.transform = 'scale(1)';
        });
    });
    
    // 7. VIDEO PLAY ICON
    const videoPlayIcon = document.querySelector('.video-placeholder i.fa-play-circle');
    if (videoPlayIcon) {
        videoPlayIcon.style.cursor = 'pointer';
        videoPlayIcon.addEventListener('click', function() {
            document.getElementById('playVideoBtn').click();
        });
    }
    
    // 8. PLAY BUTTON ICONS
    const playIcons = document.querySelectorAll('.fa-play');
    playIcons.forEach(icon => {
        icon.style.cursor = 'pointer';
        icon.addEventListener('mouseenter', () => {
            icon.style.transform = 'scale(1.2)';
        });
        icon.addEventListener('mouseleave', () => {
            icon.style.transform = 'scale(1)';
        });
    });
    
    console.log(`Setup complete: ${serviceIcons.length} service icons, ${phoneIcons.length} phone icons, ${emailIcons.length} email icons`);
}

// ============================================
// 6. COMMUNICATION FUNCTIONS
// ============================================

function makePhoneCall(phoneNumber = CONFIG.company.phone) {
    const formattedNumber = formatPhoneNumber(phoneNumber);
    
    if (!isMobileDevice()) {
        const confirmed = confirm(`Call ${formattedNumber}?`);
        if (!confirmed) return;
    }
    
    window.location.href = `tel:${phoneNumber.replace(/\D/g, '')}`;
}

// NEW SMS FUNCTION
function sendDirectSMS(phoneNumber = CONFIG.company.phone) {
    const formattedNumber = formatPhoneNumber(phoneNumber);
    const serviceName = "Nzuri Care Services";
    const message = `Hello Nzuri Care! I visited your Learn More page and would like to learn more about your ${serviceName}. Can you help me?`;
    
    // Clean the phone number for SMS link
    const cleanNumber = phoneNumber.replace(/\D/g, '');
    
    if (isMobileDevice()) {
        // For mobile devices - open native SMS app
        const smsLink = `sms:${cleanNumber}?body=${encodeURIComponent(message)}`;
        window.location.href = smsLink;
    } else {
        // For desktop - show a text area with the message and number
        const smsModal = document.createElement('div');
        smsModal.className = 'sms-modal';
        smsModal.innerHTML = `
            <div class="sms-modal-content">
                <h3>Send SMS to ${formattedNumber}</h3>
                <p>On mobile, this would open your messaging app. For desktop, copy the text below:</p>
                <div class="sms-preview">
                    <p><strong>To:</strong> ${formattedNumber}</p>
                    <textarea readonly class="sms-message">${message}</textarea>
                </div>
                <div class="sms-actions">
                    <button class="btn btn-secondary" id="copySMSBtn">
                        <i class="fas fa-copy"></i> Copy Text
                    </button>
                    <button class="btn btn-primary" id="closeSMSModal">
                        <i class="fas fa-times"></i> Close
                    </button>
                </div>
            </div>
        `;
        
        // Style the modal
        smsModal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2000;
        `;
        
        smsModal.querySelector('.sms-modal-content').style.cssText = `
            background: white;
            padding: 2rem;
            border-radius: 10px;
            max-width: 500px;
            width: 90%;
        `;
        
        smsModal.querySelector('.sms-message').style.cssText = `
            width: 100%;
            height: 100px;
            margin: 10px 0;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 5px;
            resize: vertical;
        `;
        
        smsModal.querySelector('.sms-actions').style.cssText = `
            display: flex;
            gap: 10px;
            margin-top: 15px;
        `;
        
        // Add functionality
        smsModal.querySelector('#copySMSBtn').addEventListener('click', function() {
            const textarea = smsModal.querySelector('.sms-message');
            textarea.select();
            document.execCommand('copy');
            showNotification('SMS text copied to clipboard!', 'success');
        });
        
        smsModal.querySelector('#closeSMSModal').addEventListener('click', function() {
            document.body.removeChild(smsModal);
        });
        
        // Close when clicking outside
        smsModal.addEventListener('click', function(e) {
            if (e.target === smsModal) {
                document.body.removeChild(smsModal);
            }
        });
        
        document.body.appendChild(smsModal);
        
        // Auto-select the text
        setTimeout(() => {
            smsModal.querySelector('.sms-message').select();
        }, 100);
    }
}

function sendDirectEmail(email = CONFIG.company.email) {
    const subject = encodeURIComponent('Inquiry about Nzuri Care Services');
    const body = encodeURIComponent(`Dear Nzuri Care Team,\n\nI visited your Learn More page and would like to learn more about your services.\n\nCould you please send me more information?\n\nBest regards,\n[Your Name]`);
    const mailtoLink = `mailto:${email}?subject=${subject}&body=${body}`;
    
    window.location.href = mailtoLink;
}

function openWhatsApp() {
    const phoneNumber = CONFIG.company.whatsapp.replace(/\D/g, '');
    const message = encodeURIComponent(`Hello Nzuri Care! I visited your Learn More page and would like to learn more about your services. Can you help me?`);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    
    window.open(whatsappUrl, '_blank');
}

function openGoogleMaps(address = CONFIG.company.address) {
    const encodedAddress = encodeURIComponent(address);
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
    window.open(mapsUrl, '_blank');
}

// ============================================
// 7. SERVICE CARDS FUNCTIONALITY
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
        
        // Click to expand FAQ cards
        if (card.querySelector('h3[style*="color: var(--primary)"]')) {
            card.style.cursor = 'pointer';
            card.addEventListener('click', function() {
                this.classList.toggle('expanded');
                const content = this.querySelector('p');
                if (this.classList.contains('expanded')) {
                    content.style.maxHeight = content.scrollHeight + 'px';
                    content.style.opacity = '1';
                } else {
                    content.style.maxHeight = '150px';
                    content.style.opacity = '0.9';
                }
            });
        }
    });
}

// ============================================
// 8. MODAL FUNCTIONALITY
// ============================================

function initializeModals() {
    const appointmentModal = document.getElementById('appointmentModal');
    const consultationBtn = document.getElementById('consultationBtn');
    
    if (consultationBtn) {
        consultationBtn.addEventListener('click', function() {
            if (appointmentModal) {
                openModal(appointmentModal);
            } else {
                window.location.href = 'contact.html';
            }
        });
    }
}

function openModal(modal) {
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        modal.scrollTop = 0;
    }
}

// ============================================
// 9. COMMUNICATION BUTTONS (UPDATED WITH SMS)
// ============================================

function createCommunicationButtons() {
    const existingContainer = document.querySelector('.com-buttons-container');
    if (existingContainer) existingContainer.remove();
    
    const container = document.createElement('div');
    container.className = 'com-buttons-container';
    
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
            text: 'Text Us',
            color: '#9b59b6', // Purple color for SMS
            action: () => sendDirectSMS(CONFIG.company.phone)
        },
        {
            id: 'whatsappBtn',
            icon: 'fab fa-whatsapp',
            text: 'WhatsApp',
            color: '#25D366',
            action: () => openWhatsApp()
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
    button.innerHTML = `<i class="${config.icon}"></i><span class="btn-text">${config.text}</span>`;
    
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
    
    button.addEventListener('click', function(e) {
        e.preventDefault();
        config.action();
    });
    
    return button;
}

// ============================================
// 10. UTILITY FUNCTIONS
// ============================================

function formatPhoneNumber(phone) {
    const cleaned = ('' + phone).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    return phone;
}

function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function showNotification(message, type = 'info') {
    // Remove existing notifications first
    document.querySelectorAll('.notification').forEach(n => n.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
        <button class="notification-close"><i class="fas fa-times"></i></button>
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
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
    
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    });
}

// ============================================
// 11. STYLE INJECTIONS (UPDATED)
// ============================================

function addComButtonsStyles() {
    const style = document.createElement('style');
    style.textContent = `
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
        
        #phoneBtn { background: linear-gradient(135deg, #3498db, #2980b9); }
        #smsBtn { background: linear-gradient(135deg, #9b59b6, #8e44ad); }
        #whatsappBtn { background: linear-gradient(135deg, #25D366, #128C7E); }
        #emailBtn { background: linear-gradient(135deg, #EA4335, #D14836); }
        #consultBtn { background: linear-gradient(135deg, #2ecc71, #27ae60); }
        
        /* SMS Modal Styles */
        .sms-modal-content h3 {
            color: #9b59b6;
            margin-bottom: 10px;
        }
        
        .sms-preview {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 5px;
            margin: 15px 0;
        }
        
        .sms-preview strong {
            color: #333;
        }
        
        .sms-message {
            font-family: inherit;
            font-size: 14px;
        }
        
        /* Notification animations */
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
// 12. GLOBAL EXPORTS (UPDATED)
// ============================================

window.makePhoneCall = makePhoneCall;
window.sendDirectSMS = sendDirectSMS;
window.sendDirectEmail = sendDirectEmail;
window.openWhatsApp = openWhatsApp;
window.showNotification = showNotification;
window.closeVideoPlayer = closeVideoPlayer;

console.log('Nzuri Care Learn More JavaScript fully loaded with SMS!');