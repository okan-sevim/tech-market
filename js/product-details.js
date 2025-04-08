document.addEventListener('DOMContentLoaded', function() {
    // Product image gallery
    const mainImage = document.getElementById('mainImage');
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            // Update main image
            const imageUrl = this.getAttribute('data-image');
            mainImage.src = imageUrl;
            
            // Update active state
            thumbnails.forEach(thumb => thumb.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Quantity selector
    const quantityInput = document.getElementById('quantity');
    const minusBtn = document.querySelector('.quantity-btn.minus');
    const plusBtn = document.querySelector('.quantity-btn.plus');
    
    if (minusBtn && plusBtn && quantityInput) {
        minusBtn.addEventListener('click', function() {
            const currentValue = parseInt(quantityInput.value);
            if (currentValue > 1) {
                quantityInput.value = currentValue - 1;
            }
        });
        
        plusBtn.addEventListener('click', function() {
            const currentValue = parseInt(quantityInput.value);
            if (currentValue < 10) {
                quantityInput.value = currentValue + 1;
            }
        });
    }
    
    // Color options
    const colorOptions = document.querySelectorAll('.color-option');
    
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            colorOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Storage options
    const storageOptions = document.querySelectorAll('.storage-option');
    
    storageOptions.forEach(option => {
        option.addEventListener('click', function() {
            storageOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Product tabs
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Update active tab button
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Show active tab panel
            tabPanels.forEach(panel => panel.classList.remove('active'));
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Review form rating
    const ratingStars = document.querySelectorAll('.rating-select i');
    
    ratingStars.forEach(star => {
        star.addEventListener('click', function() {
            const rating = this.getAttribute('data-rating');
            
            ratingStars.forEach(s => {
                s.classList.remove('fas', 'active');
                s.classList.add('far');
            });
            
            for (let i = 0; i < rating; i++) {
                ratingStars[i].classList.remove('far');
                ratingStars[i].classList.add('fas', 'active');
            }
        });
    });
    
    // Buy Now butonu
    const buyNowBtn = document.querySelector('.buy-now');
    if (buyNowBtn) {
        buyNowBtn.addEventListener('click', function() {
            // Önce sepete ekle
            const addToCartBtn = document.querySelector('.add-to-cart');
            if (addToCartBtn) {
                // Add to Cart butonuna tıklama olayını tetikle
                addToCartBtn.click();
            }
            
            // Doğrudan checkout sayfasına yönlendir
            setTimeout(() => {
                window.location.href = 'checkout.html';
            }, 500);
        });
    }
});
