// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const dropdowns = document.querySelectorAll('.dropdown');
    
    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Handle dropdowns on mobile
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            }
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('nav') && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
    
    // Chat Bot Functionality
    const chatIcon = document.querySelector('.chat-icon');
    const chatWindow = document.querySelector('.chat-window');
    const closeChat = document.querySelector('.close-chat');
    const sendBtn = document.querySelector('.send-btn');
    const chatInput = document.querySelector('.chat-input input');
    const chatMessages = document.querySelector('.chat-messages');
    const whatsappLinks = document.querySelectorAll('.whatsapp-link');
    
    // Toggle chat window
    chatIcon.addEventListener('click', function() {
        chatWindow.classList.toggle('active');
    });
    
    closeChat.addEventListener('click', function() {
        chatWindow.classList.remove('active');
    });
    
    // Send message function
    function sendMessage() {
        const message = chatInput.value.trim();
        if (message === '') return;
        
        // Add user message
        const userMessage = document.createElement('div');
        userMessage.classList.add('message', 'user-message');
        userMessage.innerHTML = `<p>${message}</p>`;
        chatMessages.appendChild(userMessage);
        
        // Clear input
        chatInput.value = '';
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Simulate bot response after a delay
        setTimeout(() => {
            const botResponse = getBotResponse(message);
            const botMessage = document.createElement('div');
            botMessage.classList.add('message', 'bot-message');
            botMessage.innerHTML = `<p>${botResponse}</p>`;
            chatMessages.appendChild(botMessage);
            
            // Scroll to bottom
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1000);
    }
    
    // Send message on button click
    sendBtn.addEventListener('click', sendMessage);
    
    // Send message on Enter key
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Simple bot response logic
    function getBotResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
            return "Hello! How can I assist you today?";
        } else if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
            return "Our prices vary depending on the product and quantity. Would you like information about a specific product?";
        } else if (lowerMessage.includes('delivery') || lowerMessage.includes('ship')) {
            return "We offer delivery services for wholesale orders. Please contact us for delivery details and pricing.";
        } else if (lowerMessage.includes('wholesale') || lowerMessage.includes('bulk')) {
            return "We offer special wholesale pricing for bulk purchases. Please let us know which products you're interested in.";
        } else if (lowerMessage.includes('location') || lowerMessage.includes('where')) {
            return "We're located in Kyebando-Central, Kampala. You can find our exact address on the contact page.";
        } else if (lowerMessage.includes('hour') || lowerMessage.includes('open') || lowerMessage.includes('close')) {
            return "Our business hours are: Mon-Fri: 8AM-7PM, Sat: 9AM-6PM, Sun: 10AM-4PM";
        } else if (lowerMessage.includes('rice')) {
            return "We have various types of rice including basmati, jasmine, and brown rice. Check our store page for details.";
        } else if (lowerMessage.includes('flour') || lowerMessage.includes('cassava')) {
            return "We offer cassava flour, wheat flour, and maize flour. All are available in retail and wholesale quantities.";
        } else if (lowerMessage.includes('oil') || lowerMessage.includes('cooking')) {
            return "We have sunflower oil, olive oil, and vegetable oil available in different sizes.";
        } else {
            return "Thank you for your message. For more specific inquiries, please contact us directly via WhatsApp or phone.";
        }
    }
    
    // WhatsApp link functionality
    whatsappLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const phoneNumber = "+256XXXXXXXXX"; // Replace with actual number
            const message = "Hello, I'm interested in your products. Can you provide more information?";
            const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
            window.open(whatsappURL, '_blank');
        });
    });
    
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // In a real application, you would send this data to a server
            // For this example, we'll just show an alert
            alert(`Thank you, ${name}! Your message has been sent. We'll get back to you soon.`);
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add active class to store navigation links when scrolling
    if (window.location.pathname.includes('store.html')) {
        const categorySections = document.querySelectorAll('.category-section');
        const categoryLinks = document.querySelectorAll('.category-link');
        
        function updateActiveCategory() {
            let currentSection = '';
            
            categorySections.forEach(section => {
                const sectionTop = section.offsetTop - 150;
                const sectionHeight = section.clientHeight;
                
                if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                    currentSection = section.getAttribute('id');
                }
            });
            
            categoryLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSection}`) {
                    link.classList.add('active');
                }
            });
        }
        
        window.addEventListener('scroll', updateActiveCategory);
    }
});

// WhatsApp link functionality - Updated for CEO section
whatsappLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const phoneNumber = "+256XXXXXXXXX"; // Replace with actual number
        const message = "Hello, I'm interested in your products/services. Can you provide more information?";
        const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappURL, '_blank');
    });
});

// Additional WhatsApp functionality for CEO specific links
document.querySelectorAll('.ceo-contact-links .whatsapp-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const phoneNumber = "+256XXXXXXXXX"; // Replace with Kansiime's WhatsApp number
        const message = "Hello Kansiime, I saw your profile on MKT Retail & Wholesalers website and would like to connect with you.";
        const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappURL, '_blank');
    });
});