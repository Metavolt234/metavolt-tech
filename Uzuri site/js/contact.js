// contact.js - WhatsApp Integration with Auto-Reply for Nzuri Care LLC

document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile menu
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
        });
    }
    
    // Close mobile menu when clicking on links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
    
    // Form character counter
    const messageTextarea = document.getElementById('contactMessage');
    const charCount = document.getElementById('charCount');
    
    if (messageTextarea && charCount) {
        messageTextarea.addEventListener('input', function() {
            charCount.textContent = this.value.length;
            if (this.value.length > 450) {
                charCount.style.color = '#e74c3c';
            } else if (this.value.length > 300) {
                charCount.style.color = '#f39c12';
            } else {
                charCount.style.color = '#95a5a6';
            }
        });
    }
    
    // Modal character counter
    const modalTextarea = document.getElementById('message');
    const modalCharCount = document.getElementById('modalCharCount');
    
    if (modalTextarea && modalCharCount) {
        modalTextarea.addEventListener('input', function() {
            modalCharCount.textContent = this.value.length;
            if (this.value.length > 250) {
                modalCharCount.style.color = '#e74c3c';
            } else if (this.value.length > 150) {
                modalCharCount.style.color = '#f39c12';
            } else {
                modalCharCount.style.color = '#95a5a6';
            }
        });
    }
    
    // Phone number formatting
    document.querySelectorAll('input[type="tel"]').forEach(input => {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 10) value = value.substring(0, 10);
            
            if (value.length > 6) {
                value = `(${value.substring(0,3)}) ${value.substring(3,6)}-${value.substring(6)}`;
            } else if (value.length > 3) {
                value = `(${value.substring(0,3)}) ${value.substring(3)}`;
            } else if (value.length > 0) {
                value = `(${value}`;
            }
            
            e.target.value = value;
        });
    });
    
    // WhatsApp configuration - Using "+1 4705299891"
    const WHATSAPP_NUMBER = '14705299891'; 
    
    // Service name mapping
    const serviceMap = {
        'personal': 'Personal Care',
        'companion': 'Companion Care',
        'dementia': 'Dementia Care',
        'respite': 'Respite Care',
        'not-sure': 'Not Sure / Need Guidance',
        '': 'Not specified'
    };
    
    // Function to create business card style WhatsApp message for contact form
    function createBusinessCardContactMessage(formData) {
        const timestamp = new Date().toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
        
        let message = `┌────────────────────────────┐\n`;
        message += `│    NZURI CARE LLC           │\n`;
        message += `│    Senior Services     │\n`;
        message += `├────────────────────────────┤\n`;
        message += `│ 💬 CONTACT REQUEST          │\n`;
        message += `│ 📅 ${timestamp.padEnd(24)}│\n`;
        message += `├────────────────────────────┤\n\n`;
        
        // Client Section
        message += `** CLIENT INFORMATION **\n`;
        message += `▸ ${formData.name}\n`;
        message += `▸ ${formData.email}\n`;
        message += `▸ ${formData.phone}\n\n`;
        
        // Service Section
        message += `** SERVICE INTEREST **\n`;
        message += `▸ ${serviceMap[formData.service] || formData.service}\n\n`;
        
        // Message Section
        message += `** MESSAGE **\n`;
        const shortMessage = formData.message.length > 100 
            ? formData.message.substring(0, 100) + '...' 
            : formData.message;
        message += `"${shortMessage}"\n\n`;
        
        // Updates Preference
        message += `** UPDATES PREFERENCE **\n`;
        message += `▸ ${formData.updates ? 'Yes, send me updates' : 'No, do not send updates'}\n\n`;
        
        // Footer
        message += `└────────────────────────────┘\n`;
        message += `Need immediate assistance?\n`;
        message += `📞 +1 (470) 529-9891 (24/7)\n`;
        message += `📍 3078 Claimont Rd, Ne Atlanta.\n`;
        message += `📧 nzurillc40@gmail.com\n`;
        message += `⏰ Response time: 2-4 hours\n`;
        
        return encodeURIComponent(message);
    }
    
    // Function to create business card style WhatsApp message for consultation form
    function createBusinessCardConsultationMessage(formData) {
        const timestamp = new Date().toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
        
        let message = `┌────────────────────────────┐\n`;
        message += `│    NZURI CARE LLC           │\n`;
        message += `│    Senior  Services     │\n`;
        message += `├────────────────────────────┤\n`;
        message += `│ 🗓️ CONSULTATION REQUEST     │\n`;
        message += `│ 📅 ${timestamp.padEnd(24)}│\n`;
        message += `├────────────────────────────┤\n\n`;
        
        // Client Section
        message += `** CLIENT INFORMATION **\n`;
        message += `▸ ${formData.name}\n`;
        message += `▸ ${formData.email}\n`;
        message += `▸ ${formData.phone}\n\n`;
        
        // Service Section
        message += `** SERVICE REQUESTED **\n`;
        message += `▸ ${serviceMap[formData.service] || formData.service}\n\n`;
        
        // Schedule Section
        if (formData.date) {
            message += `** PREFERRED SCHEDULE **\n`;
            const dateObj = new Date(formData.date);
            const formattedDate = dateObj.toLocaleDateString('en-US', { 
                weekday: 'short', 
                month: 'short', 
                day: 'numeric' 
            });
            message += `▸ Date: ${formattedDate}\n`;
            if (formData.time) {
                message += `▸ Time: ${formData.time}\n`;
            }
            message += `\n`;
        }
        
        // Message Section
        if (formData.message && formData.message.trim() !== '') {
            message += `** ADDITIONAL INFORMATION **\n`;
            const shortMessage = formData.message.length > 80 
                ? formData.message.substring(0, 80) + '...' 
                : formData.message;
            message += `"${shortMessage}"\n\n`;
        }
        
        // Footer
        message += `└────────────────────────────┘\n`;
        message += `⭐ ==== FREE CONSULTATION ==== ⭐\n`;
        message += `📞 +1 (470) 529-9891 (24/7)\n`;
        message += `📍 3078 Claimont Rd, Ne Atlanta.\n`;
        message += `📧 nzurillc40@gmail.com\n`;
        message += `⏰ We'll schedule within 24 hours\n`;
        
        return encodeURIComponent(message);
    }
    
    // Function to create automated reply message
    function createAutoReplyMessage(formData, isConsultation = false) {
        const time = new Date().toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
        
        let message = `🤖 *- NZURI CARE LLC*\n\n`;
        
        message += `Dear ${formData.name},\n\n`;
        
        if (isConsultation) {
            message += `Thank you for requesting a free consultation with Nzuri Care LLC! ✨\n\n`;
            message += `✅ *We have received your consultation request for ${serviceMap[formData.service] || 'our services'}.*\n\n`;
            message += `📋 *What happens next:*\n`;
            message += `1. Our care coordinator will review your request\n`;
            message += `2. We'll contact you within 24 hours to schedule\n`;
            message += `3. We'll discuss your specific care needs\n`;
            message += `4. Arrange a convenient time for assessment\n\n`;
        } else {
            message += `Thank you for contacting Nzuri Care LLC! ✨\n\n`;
            message += `✅ *We have received your message about ${serviceMap[formData.service] || 'our services'}.*\n\n`;
            message += `📋 *What happens next:*\n`;
            message += `1. Our team will review your inquiry\n`;
            message += `2. We'll respond within 1-2 hours\n`;
            message += `3. We'll provide detailed information\n`;
            message += `4. Answer any questions you may have\n\n`;
        }
        
        message += `⏰ *Response Time:*> 2-4 hours (Mon-Fri, 8am-6pm)\n`;
        message += `📞 *Emergency Line:*> +1 (470) 529-9891 (24/7)\n`;
        message += `📍 *Location:*> 3078 Claimont Rd, Ne Atlanta\n\n`;
        
        message += `We look forward to assisting you with care. 💙\n\n`;
        message += `_Please do not reply to this message._\n`;
        message += `_Received at ${time}_`;
        
        return encodeURIComponent(message);
    }
    
    // Function to open WhatsApp with TWO messages
    function openWhatsAppWithMessages(userMessage, autoReplyMessage) {
        // Create URLs for both messages
        const userMessageUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${userMessage}`;
        
        // For auto-reply, we need to create a message that would come FROM your number TO the user
        // Note: WhatsApp Web API doesn't support sending messages from business to user directly
        // So we'll show the auto-reply in a notification instead
        
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        if (isMobile) {
            // On mobile, open WhatsApp with user's message
            window.location.href = userMessageUrl;
            
            // Show auto-reply as notification
            setTimeout(() => {
                showAutoReplyNotification(autoReplyMessage);
            }, 1500);
        } else {
            // On desktop, open WhatsApp Web
            window.open(userMessageUrl, '_blank', 'noopener,noreferrer');
            
            // Show auto-reply as notification
            setTimeout(() => {
                showAutoReplyNotification(autoReplyMessage);
            }, 1000);
        }
    }
    
    // Function to show auto-reply as a notification
    function showAutoReplyNotification(autoReplyMessage) {
        const decodedMessage = decodeURIComponent(autoReplyMessage);
        
        // Create notification div
        const notification = document.createElement('div');
        notification.className = 'auto-reply-notification';
        notification.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #25D366, #128C7E);
            color: white;
            padding: 25px;
            border-radius: 15px;
            box-shadow: 0 15px 40px rgba(37, 211, 102, 0.3);
            z-index: 1003;
            max-width: 400px;
            max-height: 70vh;
            overflow: auto;
            font-family: 'Inter', sans-serif;
            white-space: pre-wrap;
            font-size: 14px;
            line-height: 1.6;
            text-align: left;
        `;
        
        // Add WhatsApp branding
        const header = document.createElement('div');
        header.style.cssText = `
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 15px;
            padding-bottom: 10px;
            border-bottom: 1px solid rgba(255,255,255,0.3);
        `;
        header.innerHTML = `
            <div style="font-size: 24px;">🤖</div>
            <div>
                <div style="font-weight: bold; font-size: 16px;">Nzuri Care Auto-Reply</div>
                <div style="font-size: 12px; opacity: 0.9;">Just now</div>
            </div>
        `;
        
        // Add message content
        const content = document.createElement('div');
        content.style.cssText = `
            margin-bottom: 20px;
            background: rgba(255,255,255,0.1);
            padding: 15px;
            border-radius: 10px;
        `;
        content.textContent = decodedMessage.replace(/\*([^*]+)\*/g, '$1'); // Remove markdown
        
        // Add close button
        const closeBtn = document.createElement('button');
        closeBtn.textContent = 'Got it!';
        closeBtn.style.cssText = `
            display: block;
            width: 100%;
            padding: 12px;
            background: white;
            color: #25D366;
            border: none;
            border-radius: 8px;
            font-weight: bold;
            cursor: pointer;
            font-size: 16px;
            transition: all 0.3s;
        `;
        closeBtn.onmouseover = function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
        };
        closeBtn.onmouseout = function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        };
        closeBtn.onclick = function() {
            notification.remove();
            if (overlay) overlay.remove();
        };
        
        // Assemble notification
        notification.appendChild(header);
        notification.appendChild(content);
        notification.appendChild(closeBtn);
        
        // Add overlay
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.7);
            z-index: 1002;
        `;
        overlay.onclick = function() {
            notification.remove();
            overlay.remove();
        };
        
        document.body.appendChild(overlay);
        document.body.appendChild(notification);
        
        // Auto-close after 10 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
                overlay.remove();
            }
        }, 10000);
    }
    
    // Function to validate form data
    function validateFormData(formData, isConsultation = false) {
        const errors = [];
        
        if (!formData.name || formData.name.trim().length < 2) {
            errors.push('Please enter your full name');
        }
        
        if (!formData.email || !isValidEmail(formData.email)) {
            errors.push('Please enter a valid email address');
        }
        
        if (!formData.phone || formData.phone.replace(/\D/g, '').length < 10) {
            errors.push('Please enter a valid phone number');
        }
        
        if (!isConsultation && (!formData.message || formData.message.trim().length < 10)) {
            errors.push('Please enter a message (minimum 10 characters)');
        }
        
        return errors;
    }
    
    // Function to validate email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Contact Form submission - Send to WhatsApp with auto-reply
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('contactName').value.trim(),
                email: document.getElementById('contactEmail').value.trim(),
                phone: document.getElementById('contactPhone').value.trim(),
                service: document.getElementById('contactService').value,
                message: document.getElementById('contactMessage').value.trim(),
                updates: document.getElementById('contactUpdates').checked
            };
            
            // Validate form data
            const errors = validateFormData(formData, false);
            
            if (errors.length > 0) {
                showNotification(errors[0], 'error');
                return;
            }
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const submitText = submitBtn.querySelector('.submit-text');
            const loader = submitBtn.querySelector('.btn-loader');
            
            // Show loading state
            submitBtn.disabled = true;
            if (submitText) submitText.style.display = 'none';
            if (loader) loader.style.display = 'inline-block';
            
            // Create both messages
            const userMessage = createBusinessCardContactMessage(formData);
            const autoReplyMessage = createAutoReplyMessage(formData, false);
            
            // Short delay for better UX
            setTimeout(() => {
                // Open WhatsApp with user's message and show auto-reply
                openWhatsAppWithMessages(userMessage, autoReplyMessage);
                
                // Reset form
                this.reset();
                
                // Reset button
                submitBtn.disabled = false;
                if (submitText) submitText.style.display = 'inline-block';
                if (loader) loader.style.display = 'none';
                
                // Reset character count
                if (charCount) charCount.textContent = '0';
                
                // Track submission
                trackFormSubmission('contact_form');
            }, 800);
        });
    }
    
    // Appointment Form submission - Send to WhatsApp with auto-reply
    const appointmentForm = document.getElementById('appointmentForm');
    
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value.trim(),
                email: document.getElementById('email').value.trim(),
                phone: document.getElementById('phone').value.trim(),
                service: document.getElementById('service').value,
                date: document.getElementById('date').value,
                time: document.getElementById('time').value,
                message: document.getElementById('message').value.trim()
            };
            
            // Validate form data
            const errors = validateFormData(formData, true);
            
            if (errors.length > 0) {
                showNotification(errors[0], 'error');
                return;
            }
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const submitText = submitBtn.querySelector('span:first-child');
            const loader = submitBtn.querySelector('.btn-loader');
            
            // Show loading state
            submitBtn.disabled = true;
            if (submitText) submitText.style.display = 'none';
            if (loader) loader.style.display = 'inline-block';
            
            // Create both messages
            const userMessage = createBusinessCardConsultationMessage(formData);
            const autoReplyMessage = createAutoReplyMessage(formData, true);
            
            // Short delay for better UX
            setTimeout(() => {
                // Close modal
                closeModal(document.getElementById('appointmentModal'));
                
                // Open WhatsApp with user's message and show auto-reply
                openWhatsAppWithMessages(userMessage, autoReplyMessage);
                
                // Reset form
                this.reset();
                
                // Reset button
                submitBtn.disabled = false;
                if (submitText) submitText.style.display = 'inline-block';
                if (loader) loader.style.display = 'none';
                
                // Show success modal
                openModal(document.getElementById('successModal'));
                
                // Track submission
                trackFormSubmission('consultation_form');
            }, 800);
        });
    }
    
    // Modal functionality
    const consultationBtn = document.getElementById('consultationBtn');
    const contactConsultation = document.getElementById('contactConsultation');
    const closeSuccessBtn = document.getElementById('closeSuccess');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    
    if (consultationBtn) {
        consultationBtn.addEventListener('click', () => {
            openModal(document.getElementById('appointmentModal'));
        });
    }
    
    if (contactConsultation) {
        contactConsultation.addEventListener('click', () => {
            openModal(document.getElementById('appointmentModal'));
        });
    }
    
    if (closeSuccessBtn) {
        closeSuccessBtn.addEventListener('click', () => {
            closeModal(document.getElementById('successModal'));
        });
    }
    
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal);
        });
    });
    
    // Get Directions button
    const directionsBtn = document.querySelector('.btn-directions');
    if (directionsBtn) {
        directionsBtn.addEventListener('click', function() {
            const address = this.dataset.address;
            openGoogleMaps(address);
        });
    }
    
    // Open Maps button
    const openMapsBtn = document.getElementById('openMaps');
    if (openMapsBtn) {
        openMapsBtn.addEventListener('click', () => {
            openGoogleMaps("3078 Claimont Rd, Ne Atlanta");
        });
    }
    
    // Phone links
    document.querySelectorAll('.phone-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const phoneNumber = this.getAttribute('href').replace('tel:', '');
            makePhoneCall(phoneNumber);
        });
    });
    
    // Email links
    document.querySelectorAll('.email-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const email = this.getAttribute('href').replace('mailto:', '');
            sendDirectEmail(email);
        });
    });
    
    // Floating WhatsApp button
    const floatingWhatsApp = document.getElementById('floatingWhatsApp');
    if (floatingWhatsApp) {
        floatingWhatsApp.addEventListener('click', openGeneralWhatsApp);
    }
    
    // Add animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.contact-item, .form-group').forEach(el => {
        observer.observe(el);
    });
});

// Utility functions
function openModal(modal) {
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modal) {
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function makePhoneCall(phoneNumber) {
    const formattedNumber = phoneNumber.replace(/\D/g, '');
    if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        if (confirm(`Call ${formatPhoneNumber(phoneNumber)}?`)) {
            window.location.href = `tel:${formattedNumber}`;
        }
    } else {
        window.location.href = `tel:${formattedNumber}`;
    }
}

function sendDirectEmail(email) {
    const subject = encodeURIComponent('Inquiry about Nzuri Care Services');
    const body = encodeURIComponent(`Dear Nzuri Care Team,\n\nI visited your website and would like to learn more about your senior care services.\n\nCould you please send me more information?\n\nBest regards,\n[Your Name]`);
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
}

function openGeneralWhatsApp() {
    const phoneNumber = '14705299891';
    
    // Simple message for floating button
    const message = encodeURIComponent(`Hello Nzuri Care! I visited your website and would like to learn more about your senior care services.`);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        window.location.href = whatsappUrl;
    } else {
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    }
}

function openGoogleMaps(address) {
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
}

function formatPhoneNumber(phone) {
    const cleaned = ('' + phone).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    return match ? `(${match[1]}) ${match[2]}-${match[3]}` : phone;
}

function showNotification(message, type = 'info') {
    // Remove any existing notifications
    document.querySelectorAll('.notification').forEach(n => n.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    let bgColor = '#3498db';
    
    if (type === 'success') {
        bgColor = '#2ecc71';
    } else if (type === 'error') {
        bgColor = '#e74c3c';
    }
    
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close">×</button>
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
        justify-content: space-between;
        gap: 15px;
        z-index: 1002;
        max-width: 350px;
        animation: slideIn 0.3s ease;
        border-left: 4px solid ${bgColor};
        font-family: 'Inter', sans-serif;
        font-size: 0.9rem;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
    
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
}

// Optional: Track form submissions
function trackFormSubmission(formType) {
    console.log(`${formType} submitted at ${new Date().toISOString()}`);
}

// Add CSS for notifications and floating buttons
if (!document.querySelector('#dynamic-styles')) {
    const style = document.createElement('style');
    style.id = 'dynamic-styles';
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(400px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(400px); opacity: 0; }
        }
        
        .notification-close {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #666;
            padding: 0;
            margin: 0;
            line-height: 1;
        }
        
        .floating-contact-buttons {
            position: fixed;
            bottom: 80px;
            right: 20px;
            display: flex;
            flex-direction: column;
            gap: 10px;
            z-index: 999;
        }
        
        .floating-btn {
            width: 56px;
            height: 56px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 0.8rem;
            text-decoration: none;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            transition: all 0.3s ease;
            font-weight: 500;
        }
        
        .floating-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 6px 20px rgba(0,0,0,0.3);
        }
        
        .phone-btn { background: #3498db; }
        .email-btn { background: #EA4335; }
        .whatsapp-btn { 
            background: #25D366; 
            border: none;
            cursor: pointer;
        }
        
        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            z-index: 1000;
            align-items: center;
            justify-content: center;
            padding: 1rem;
        }
        
        .success .modal-content {
            text-align: center;
        }
        
        .success-icon {
            font-size: 4rem;
            color: #2ecc71;
            margin-bottom: 1rem;
        }
        
        /* Auto-reply notification animation */
        @keyframes fadeInScale {
            from { 
                opacity: 0; 
                transform: translate(-50%, -50%) scale(0.9); 
            }
            to { 
                opacity: 1; 
                transform: translate(-50%, -50%) scale(1); 
            }
        }
        
        .auto-reply-notification {
            animation: fadeInScale 0.3s ease;
        } 
        
        @media (min-width: 768px) {
            .floating-contact-buttons {
                display: none;
            }
        }
    `;
    document.head.appendChild(style);
}