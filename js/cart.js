document.addEventListener('DOMContentLoaded', function() {
    // Quantity selectors
    const quantityInputs = document.querySelectorAll('.quantity-input');
    const minusButtons = document.querySelectorAll('.quantity-btn.minus');
    const plusButtons = document.querySelectorAll('.quantity-btn.plus');
    
    // Add click event to minus buttons
    minusButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            const input = quantityInputs[index];
            let value = parseInt(input.value);
            if (value > 1) {
                value--;
                input.value = value;
                updateSubtotal(index, value);
                updateCartTotal();
            }
        });
    });
    
    // Add click event to plus buttons
    plusButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            const input = quantityInputs[index];
            let value = parseInt(input.value);
            if (value < 10) {
                value++;
                input.value = value;
                updateSubtotal(index, value);
                updateCartTotal();
            }
        });
    });
    
    // Update quantity when input changes
    quantityInputs.forEach((input, index) => {
        input.addEventListener('change', function() {
            let value = parseInt(this.value);
            if (isNaN(value) || value < 1) {
                value = 1;
                this.value = value;
            } else if (value > 10) {
                value = 10;
                this.value = value;
            }
            updateSubtotal(index, value);
            updateCartTotal();
        });
    });
    
    // Remove item buttons
    const removeButtons = document.querySelectorAll('.remove-btn');
    removeButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            const cartItem = this.closest('.cart-item');
            cartItem.style.opacity = '0';
            setTimeout(() => {
                cartItem.style.display = 'none';
                updateCartTotal();
            }, 300);
        });
    });
    
    // Update individual item subtotal
    function updateSubtotal(index, quantity) {
        const cartItems = document.querySelectorAll('.cart-item');
        const priceElement = cartItems[index].querySelector('.item-price');
        const subtotalElement = cartItems[index].querySelector('.item-subtotal');
        
        const price = parseFloat(priceElement.textContent.replace('$', ''));
        const subtotal = price * quantity;
        
        subtotalElement.textContent = '$' + subtotal.toFixed(2);
    }
    
    // Update cart total
    function updateCartTotal() {
        const cartItems = document.querySelectorAll('.cart-item');
        let subtotal = 0;
        
        cartItems.forEach(item => {
            if (item.style.display !== 'none') {
                const subtotalText = item.querySelector('.item-subtotal').textContent;
                subtotal += parseFloat(subtotalText.replace('$', ''));
            }
        });
        
        const tax = subtotal * 0.1; // 10% tax
        const total = subtotal + tax;
        
        document.querySelector('.summary-row:nth-child(1) span:last-child').textContent = '$' + subtotal.toFixed(2);
        document.querySelector('.summary-row:nth-child(3) span:last-child').textContent = '$' + tax.toFixed(2);
        document.querySelector('.summary-row.total span:last-child').textContent = '$' + total.toFixed(2);
        
        // Update cart count in header
        const visibleItems = Array.from(cartItems).filter(item => item.style.display !== 'none');
        document.querySelector('.cart-count').textContent = visibleItems.length;
    }
    
    // Update Cart button
    const updateCartBtn = document.querySelector('.update-cart');
    if (updateCartBtn) {
        updateCartBtn.addEventListener('click', function() {
            updateCartTotal();
            
            // Show update message
            const message = document.createElement('div');
            message.className = 'update-message';
            message.textContent = 'Cart updated successfully!';
            message.style.position = 'fixed';
            message.style.top = '80px';
            message.style.left = '50%';
            message.style.transform = 'translateX(-50%)';
            message.style.padding = '10px 20px';
            message.style.background = 'var(--primary-color)';
            message.style.color = 'white';
            message.style.borderRadius = 'var(--border-radius)';
            message.style.zIndex = '1000';
            
            document.body.appendChild(message);
            
            setTimeout(() => {
                message.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(message);
                }, 300);
            }, 2000);
        });
    }
});
