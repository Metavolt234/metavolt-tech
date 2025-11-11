// Book Detail Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    loadBookDetails();
});

function loadBookDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const bookId = parseInt(urlParams.get('id'));
    
    if (!bookId) {
        window.location.href = 'books.html';
        return;
    }
    
    const book = books.find(b => b.id === bookId);
    
    if (!book) {
        window.location.href = 'books.html';
        return;
    }
    
    displayBookDetails(book);
    loadRelatedBooks(book);
}

function displayBookDetails(book) {
    // Update page title
    document.title = `${book.title} - BookHaven`;
    
    // Update book details
    document.getElementById('book-title').textContent = book.title;
    document.getElementById('book-author').textContent = `by ${book.author}`;
    document.getElementById('book-price').textContent = `$${book.price.toFixed(2)}`;
    document.getElementById('book-description-text').textContent = book.description;
    document.getElementById('book-category').textContent = book.category.charAt(0).toUpperCase() + book.category.slice(1);
    
    // Update book cover
    const bookCover = document.getElementById('book-cover-img');
    if (book.image) {
        bookCover.src = book.image;
        bookCover.alt = book.title;
    }
    
    // Update rating
    const ratingElement = document.getElementById('book-rating');
    ratingElement.innerHTML = generateStarRating(book.rating);
    
    // Add to cart button
    document.getElementById('add-to-cart-btn').addEventListener('click', function() {
        addToCart(book.id);
    });
    
    // Wishlist button
    document.getElementById('wishlist-btn').addEventListener('click', function() {
        showNotification('Added to wishlist!');
    });
}

function loadRelatedBooks(currentBook) {
    const relatedBooksContainer = document.getElementById('related-books');
    const relatedBooks = books
        .filter(book => book.id !== currentBook.id && book.category === currentBook.category)
        .slice(0, 4);
    
    if (relatedBooks.length === 0) {
        relatedBooksContainer.innerHTML = '<p>No related books found.</p>';
        return;
    }
    
    displayBooks(relatedBooks, relatedBooksContainer);
}

// Update the books data to include additional details for book-detail page
const detailedBooks = books.map(book => ({
    ...book,
    pages: Math.floor(Math.random() * 400) + 100,
    publisher: "Literary Press",
    isbn: `978-${Math.floor(Math.random() * 10000000000)}`
}));