// Book Data
const books = [
    {
        id: 1,
        title: "The Silent Forest",
        author: "Sarah Johnson",
        price: 24.99,
        category: "fiction",
        image: "images/book1.jpg",
        description: "A gripping tale of mystery and redemption set in the ancient forests of the Pacific Northwest.",
        rating: 4.5,
        featured: true
    },
    {
        id: 2,
        title: "Echoes of Time",
        author: "Sarah Johnson",
        price: 22.99,
        category: "sci-fi",
        image: "images/book2.jpg",
        description: "A time-travel adventure that explores the consequences of altering the past.",
        rating: 4.2,
        featured: true
    },
    {
        id: 3,
        title: "The Art of Programming",
        author: "Dr. Alan Turing",
        price: 34.99,
        category: "non-fiction",
        image: "images/book3.jpg",
        description: "Comprehensive guide to modern programming practices and algorithms.",
        rating: 4.8,
        featured: false
    },
    {
        id: 4,
        title: "Ocean's Whisper",
        author: "Michael Roberts",
        price: 19.99,
        category: "romance",
        image: "images/book4.jpg",
        description: "A heartwarming romance set against the backdrop of the Mediterranean coast.",
        rating: 4.3,
        featured: true
    },
    {
        id: 5,
        title: "The Last Detective",
        author: "James Patterson",
        price: 21.99,
        category: "mystery",
        image: "images/book5.jpg",
        description: "A thrilling mystery that will keep you guessing until the very end.",
        rating: 4.6,
        featured: false
    },
    {
        id: 6,
        title: "Cosmic Frontiers",
        author: "Neil deGrasse Tyson",
        price: 28.99,
        category: "non-fiction",
        image: "images/book6.jpg",
        description: "Exploring the mysteries of the universe and our place within it.",
        rating: 4.7,
        featured: true
    }
];

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    updateCartCount();
    loadBooks();
    setupEventListeners();
    setupMobileMenu();
}

function loadBooks() {
    const featuredContainer = document.getElementById('featured-books');
    const allBooksContainer = document.getElementById('all-books');
    
    if (featuredContainer) {
        const featuredBooks = books.filter(book => book.featured);
        displayBooks(featuredBooks, featuredContainer);
    }
    
    if (allBooksContainer) {
        displayBooks(books, allBooksContainer);
        setupFilters();
    }
}

function displayBooks(booksArray, container) {
    container.innerHTML = '';
    
    booksArray.forEach(book => {
        const bookElement = createBookElement(book);
        container.appendChild(bookElement);
    });
}

function createBookElement(book) {
    const bookDiv = document.createElement('div');
    bookDiv.className = 'book-card fade-in';
    
    bookDiv.innerHTML = `
        <div class="book-cover">
            <img src="${book.image}" alt="${book.title}" onerror="this.style.display='none'">
            <span>${book.title}</span>
        </div>
        <div class="book-title">${book.title}</div>
        <div class="book-author">by ${book.author}</div>
        <div class="book-price">$${book.price.toFixed(2)}</div>
        <div class="book-rating">
            ${generateStarRating(book.rating)}
        </div>
        <div class="book-actions">
            <button class="btn btn-primary btn-small" onclick="addToCart(${book.id})">
                Add to Cart
            </button>
            <a href="book-detail.html?id=${book.id}" class="btn btn-secondary btn-small">
                Details
            </a>
        </div>
    `;
    
    return bookDiv;
}

function generateStarRating(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '★';
    }
    if (halfStar) {
        stars += '½';
    }
    for (let i = 0; i < emptyStars; i++) {
        stars += '☆';
    }
    
    return stars;
}

function setupFilters() {
    const categoryFilter = document.getElementById('category-filter');
    const priceFilter = document.getElementById('price-filter');
    const searchBox = document.getElementById('search-box');
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterBooks);
    }
    if (priceFilter) {
        priceFilter.addEventListener('change', filterBooks);
    }
    if (searchBox) {
        searchBox.addEventListener('input', filterBooks);
    }
}

function filterBooks() {
    const category = document.getElementById('category-filter').value;
    const price = document.getElementById('price-filter').value;
    const search = document.getElementById('search-box').value.toLowerCase();
    
    let filteredBooks = books.filter(book => {
        const matchesCategory = !category || book.category === category;
        const matchesSearch = !search || 
            book.title.toLowerCase().includes(search) || 
            book.author.toLowerCase().includes(search);
        
        let matchesPrice = true;
        if (price) {
            if (price === '0-20') matchesPrice = book.price < 20;
            else if (price === '20-30') matchesPrice = book.price >= 20 && book.price <= 30;
            else if (price === '30+') matchesPrice = book.price > 30;
        }
        
        return matchesCategory && matchesSearch && matchesPrice;
    });
    
    const container = document.getElementById('all-books');
    displayBooks(filteredBooks, container);
}

function addToCart(bookId) {
    const book = books.find(b => b.id === bookId);
    if (!book) return;
    
    const existingItem = cart.find(item => item.id === bookId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...book,
            quantity: 1
        });
    }
    
    updateCartCount();
    saveCartToStorage();
    showNotification(`${book.title} added to cart!`);
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

function saveCartToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #27ae60;
        color: white;
        padding: 1rem 2rem;
        border-radius: 5px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

function setupMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    
    if (menuBtn && mainNav) {
        menuBtn.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            menuBtn.classList.toggle('active');
        });
    }
}

// Newsletter form handling
document.addEventListener('DOMContentLoaded', function() {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            // In a real app, you would send this to your backend
            showNotification('Thank you for subscribing!');
            this.reset();
        });
    }

    // Enhanced mobile menu functionality
    // Enhanced mobile menu functionality
function setupMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    
    if (menuBtn && mainNav) {
        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            mainNav.classList.toggle('active');
            menuBtn.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mainNav.contains(e.target) && !menuBtn.contains(e.target)) {
                mainNav.classList.remove('active');
                menuBtn.classList.remove('active');
            }
        });

        // Close menu when clicking on a link
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('active');
                menuBtn.classList.remove('active');
            });
        });
    }
}

// Enhanced cart functionality with phone order option
function addToCart(bookId) {
    const book = books.find(b => b.id === bookId);
    if (!book) return;
    
    const existingItem = cart.find(item => item.id === bookId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...book,
            quantity: 1
        });
    }
    
    updateCartCount();
    saveCartToStorage();
    showNotification(`${book.title} added to cart! <a href="tel:5551234567" style="color: white; text-decoration: underline;">Call to order now!</a>`);
}

// Enhanced notification with HTML support
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    const backgroundColor = type === 'success' ? '#27ae60' : '#e74c3c';
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${backgroundColor};
        color: white;
        padding: 1rem 2rem;
        border-radius: 5px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        max-width: 300px;
    `;
    notification.innerHTML = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// Add CSS animation for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100%);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;
document.head.appendChild(style);
});