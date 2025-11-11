// Checkout Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    loadOrderSummary();
    setupCheckoutForm();
});

function loadOrderSummary() {
    const orderItemsContainer = document.getElementById('order-items');
    const orderSubtotal = document.getElementById('order-subtotal');
    const orderTax = document.getElementById('order-tax');
    const orderTotal = document.getElementById('order-total');
    
    if (cart.length === 0) {
        window.location.href = 'cart.html';
        return;
    }
    
    if (orderItemsContainer) {
        orderItemsContainer.innerHTML = '';
        let subtotal = 0;
        
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;
            
            const orderItem = document.createElement('div');
            orderItem.className = 'order-item';
            orderItem.innerHTML = `
                <div class="item-info">
                    <h4>${item.title}</h4>
                    <p>by ${item.author}</p>
                    <p>Qty: ${item.quantity}</p>
                </div>
                <div class="item-total">$${itemTotal.toFixed(2)}</div>
            `;
            
            orderItemsContainer.appendChild(orderItem);
        });
        
        const shipping = 5.99;
        const tax = subtotal * 0.08; // 8% tax
        const total = subtotal + shipping + tax;
        
        if (orderSubtotal) orderSubtotal.textContent = `$${subtotal.toFixed(2)}`;
        if (orderTax) orderTax.textContent = `$${tax.toFixed(2)}`;
        if (orderTotal) orderTotal.textContent = `$${total.toFixed(2)}`;
    }
}

function setupCheckoutForm() {
    const checkoutForm = document.getElementById('checkout-form');
    const placeOrderBtn = document.getElementById('place-order-btn');
    
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function(e) {
            e.preventDefault();
            processOrder();
        });
    }
    
    if (placeOrderBtn) {
        placeOrderBtn.addEventListener('click', function(e) {
            e.preventDefault();
            processOrder();
        });
    }
}

function processOrder() {
    // Validate form
    const form = document.getElementById('checkout-form');
    const formData = new FormData(form);
    
    // Simple validation
    const requiredFields = ['first-name', 'last-name', 'email', 'phone', 'address', 'city', 'state', 'zip', 'card-number', 'expiry', 'cvv', 'card-name'];
    let isValid = true;
    
    requiredFields.forEach(field => {
        const input = document.getElementById(field);
        if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = 'var(--secondary-color)';
        } else {
            input.style.borderColor = 'var(--border-color)';
        }
    });
    
    if (!isValid) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }
    
    // Show loading state
    const placeOrderBtn = document.getElementById('place-order-btn');
    placeOrderBtn.textContent = 'Processing...';
    placeOrderBtn.disabled = true;
    
    // Simulate order processing
    setTimeout(() => {
        // In a real application, you would send the order to your backend
        const orderNumber = Math.floor(Math.random() * 1000000);
        
        // Clear cart
        cart = [];
        saveCartToStorage();
        updateCartCount();
        
        // Show success message
        showNotification(`Order #${orderNumber} placed successfully!`, 'success');
        
        // Redirect to confirmation page (you can create order-confirmation.html)
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
        
    }, 2000);
}

// Enhanced notification function
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
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 5000);
}