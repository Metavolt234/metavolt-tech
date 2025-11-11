// Main JavaScript for BookHaven Website
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    const body = document.body;

    function initMobileMenu() {
        if (mobileMenuBtn && mainNav) {
            // Create backdrop element
            const backdrop = document.createElement('div');
            backdrop.className = 'mobile-menu-backdrop';
            document.body.appendChild(backdrop);

            function toggleMenu() {
                mobileMenuBtn.classList.toggle('active');
                mainNav.classList.toggle('active');
                backdrop.classList.toggle('active');
                body.classList.toggle('menu-open');
            }

            function closeMenu() {
                mobileMenuBtn.classList.remove('active');
                mainNav.classList.remove('active');
                backdrop.classList.remove('active');
                body.classList.remove('menu-open');
            }

            // Toggle menu on button click
            mobileMenuBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                toggleMenu();
            });

            // Close menu on backdrop click
            backdrop.addEventListener('click', closeMenu);

            // Close menu on navigation link click
            const navLinks = document.querySelectorAll('.main-nav a');
            navLinks.forEach(link => {
                link.addEventListener('click', closeMenu);
            });

            // Close menu on Escape key
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && mainNav.classList.contains('active')) {
                    closeMenu();
                }
            });

            // Close menu when clicking outside
            document.addEventListener('click', function(e) {
                if (mainNav.classList.contains('active') && 
                    !mainNav.contains(e.target) && 
                    !mobileMenuBtn.contains(e.target)) {
                    closeMenu();
                }
            });

            // Handle window resize
            window.addEventListener('resize', function() {
                if (window.innerWidth > 768) {
                    closeMenu();
                }
            });
        }
    }

    // Cart functionality
    let cartCount = 0;
    const cartCountElement = document.getElementById('cart-count');
    
    function initializeCart() {
        const savedCart = localStorage.getItem('bookhavenCart');
        if (savedCart) {
            const cart = JSON.parse(savedCart);
            cartCount = cart.reduce((total, item) => total + item.quantity, 0);
        }
        updateCartDisplay();
    }

    function updateCartDisplay() {
        if (cartCountElement) {
            cartCountElement.textContent = cartCount;
        }
    }

    function addToCart(bookId, bookTitle, price) {
        let cart = JSON.parse(localStorage.getItem('bookhavenCart')) || [];
        
        const existingItem = cart.find(item => item.id === bookId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: bookId,
                title: bookTitle,
                price: price,
                quantity: 1
            });
        }
        
        localStorage.setItem('bookhavenCart', JSON.stringify(cart));
        cartCount = cart.reduce((total, item) => total + item.quantity, 0);
        updateCartDisplay();
        
        showNotification(`"${bookTitle}" added to cart!`);
    }

    function showNotification(message) {
        const existingNotification = document.querySelector('.cart-notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.textContent = message;
        
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: #27ae60;
            color: white;
            padding: 1rem 2rem;
            border-radius: 5px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            z-index: 1001;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // Scroll animations
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll('.mission-card, .team-member, .value-item, .contact-detail, .faq-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1
        });

        animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(element);
        });
    }

    // Smooth scrolling for anchor links
    function initSmoothScrolling() {
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        
        anchorLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerHeight = document.querySelector('.main-header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Initialize all functionality
    initMobileMenu();
    initializeCart();
    initScrollAnimations();
    initSmoothScrolling();

    console.log('BookHaven website initialized successfully!');
});

// Utility function for adding books to cart
function addBookToCart(bookId, bookTitle, price) {
    const event = new CustomEvent('addToCart', {
        detail: { bookId, bookTitle, price }
    });
    document.dispatchEvent(event);
}

// Listen for addToCart events
document.addEventListener('addToCart', function(e) {
    const { bookId, bookTitle, price } = e.detail;
    // You'll need to define addToCart in the global scope or import it
    if (typeof addToCart === 'function') {
        addToCart(bookId, bookTitle, price);
    }
});