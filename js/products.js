document.addEventListener('DOMContentLoaded', function() {
    // Sample product data (in a real application, this would come from a database or API)
    const products = [
        {
            id: 1,
            name: "Ultra HD 4K Smartphone",
            price: 799.99,
            oldPrice: 899.99,
            category: "smartphones",
            brand: "samsung",
            rating: 4.5,
            image: "images/product1.jpg",
            badge: "new"
        },
        {
            id: 2,
            name: "Wireless Headphones Pro",
            price: 249.99,
            oldPrice: 319.99,
            category: "headphones",
            brand: "sony",
            rating: 5,
            image: "images/product2.jpg",
            badge: "hot"
        },
        {
            id: 3,
            name: "Ultra Thin Gaming Laptop",
            price: 1299.99,
            oldPrice: 1499.99,
            category: "laptops",
            brand: "dell",
            rating: 4,
            image: "images/product3.jpg",
            badge: "sale"
        },
        {
            id: 4,
            name: "Smart Watch Pro Series",
            price: 349.99,
            oldPrice: null,
            category: "accessories",
            brand: "apple",
            rating: 3.5,
            image: "images/product4.jpg",
            badge: null
        },
        {
            id: 5,
            name: "4K HDR Smart TV",
            price: 899.99,
            oldPrice: 999.99,
            category: "monitors",
            brand: "samsung",
            rating: 5,
            image: "images/product5.jpg",
            badge: null
        },
        {
            id: 6,
            name: "Wireless Earbuds",
            price: 129.99,
            oldPrice: null,
            category: "headphones",
            brand: "apple",
            rating: 4,
            image: "images/product6.jpg",
            badge: "new"
        },
        {
            id: 7,
            name: "Professional DSLR Camera",
            price: 1499.99,
            oldPrice: 1699.99,
            category: "accessories",
            brand: "sony",
            rating: 5,
            image: "images/product7.jpg",
            badge: null
        },
        {
            id: 8,
            name: "Smart Home Speaker",
            price: 99.99,
            oldPrice: 129.99,
            category: "accessories",
            brand: "google",
            rating: 3.5,
            image: "images/product8.jpg",
            badge: "sale"
        },
        {
            id: 9,
            name: "Premium Bluetooth Speaker",
            price: 179.99,
            oldPrice: null,
            category: "accessories",
            brand: "sony",
            rating: 5,
            image: "images/product9.jpg",
            badge: null
        }
    ];

    // State variables for filters
    let activeFilters = {
        categories: [],
        priceRange: { min: null, max: null },
        brands: [],
        rating: null
    };

    let sortOption = 'featured'; // Default sort option

    // Initialize event listeners
    initializeEventListeners();
    
    // Initial product display
    updateProductDisplay();

    function initializeEventListeners() {
        // Category filters
        const categoryCheckboxes = document.querySelectorAll('input[name="category"]');
        categoryCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                updateCategoryFilters();
                updateProductDisplay();
            });
        });

        // Brand filters
        const brandCheckboxes = document.querySelectorAll('input[name="brand"]');
        brandCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                updateBrandFilters();
                updateProductDisplay();
            });
        });

        // Rating filters
        const ratingRadios = document.querySelectorAll('input[name="rating"]');
        ratingRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                updateRatingFilter();
                updateProductDisplay();
            });
        });

        // Price filter
        const applyPriceBtn = document.getElementById('applyPriceFilter');
        if (applyPriceBtn) {
            applyPriceBtn.addEventListener('click', function() {
                updatePriceFilter();
                updateProductDisplay();
            });
        }

        // Sort options
        const sortSelect = document.getElementById('sortBy');
        if (sortSelect) {
            sortSelect.addEventListener('change', function() {
                sortOption = this.value;
                updateProductDisplay();
            });
        }

        // Clear all filters
        const clearFiltersBtn = document.getElementById('clearFilters');
        if (clearFiltersBtn) {
            clearFiltersBtn.addEventListener('click', function() {
                clearAllFilters();
                updateProductDisplay();
            });
        }
    }

    function updateCategoryFilters() {
        activeFilters.categories = [];
        document.querySelectorAll('input[name="category"]:checked').forEach(checkbox => {
            activeFilters.categories.push(checkbox.value);
        });
    }

    function updateBrandFilters() {
        activeFilters.brands = [];
        document.querySelectorAll('input[name="brand"]:checked').forEach(checkbox => {
            activeFilters.brands.push(checkbox.value);
        });
    }

    function updateRatingFilter() {
        const selectedRating = document.querySelector('input[name="rating"]:checked');
        activeFilters.rating = selectedRating ? parseInt(selectedRating.value) : null;
    }

    function updatePriceFilter() {
        const minInput = document.getElementById('priceMin');
        const maxInput = document.getElementById('priceMax');
        
        activeFilters.priceRange.min = minInput.value ? parseFloat(minInput.value) : null;
        activeFilters.priceRange.max = maxInput.value ? parseFloat(maxInput.value) : null;
    }

    function clearAllFilters() {
        // Uncheck all checkboxes
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = false;
        });
        
        // Uncheck all radio buttons
        document.querySelectorAll('input[type="radio"]').forEach(radio => {
            radio.checked = false;
        });
        
        // Clear price inputs
        document.getElementById('priceMin').value = '';
        document.getElementById('priceMax').value = '';
        
        // Reset filter state
        activeFilters = {
            categories: [],
            priceRange: { min: null, max: null },
            brands: [],
            rating: null
        };
        
        // Reset sort to default
        document.getElementById('sortBy').value = 'featured';
        sortOption = 'featured';
    }

    function updateProductDisplay() {
        // Apply filters
        let filteredProducts = filterProducts(products);
        
        // Apply sorting
        filteredProducts = sortProducts(filteredProducts);
        
        // Update product count
        const productCountElement = document.getElementById('productCount');
        if (productCountElement) {
            productCountElement.textContent = filteredProducts.length;
        }
        
        // Display products
        displayProducts(filteredProducts);
    }

    function filterProducts(products) {
        return products.filter(product => {
            // Category filter
            if (activeFilters.categories.length > 0 && !activeFilters.categories.includes(product.category)) {
                return false;
            }
            
            // Brand filter
            if (activeFilters.brands.length > 0 && !activeFilters.brands.includes(product.brand)) {
                return false;
            }
            
            // Price filter
            if (activeFilters.priceRange.min !== null && product.price < activeFilters.priceRange.min) {
                return false;
            }
            
            if (activeFilters.priceRange.max !== null && product.price > activeFilters.priceRange.max) {
                return false;
            }
            
            // Rating filter
            if (activeFilters.rating !== null && product.rating < activeFilters.rating) {
                return false;
            }
            
            return true;
        });
    }

    function sortProducts(products) {
        const sortedProducts = [...products];
        
        switch (sortOption) {
            case 'price-low':
                sortedProducts.sort((a, b) => a.price - b.price);
                break;
                
            case 'price-high':
                sortedProducts.sort((a, b) => b.price - a.price);
                break;
                
            case 'newest':
                // In a real application, you'd sort by date
                // For demo purposes, we'll sort by ID (assuming higher ID = newer)
                sortedProducts.sort((a, b) => b.id - a.id);
                break;
                
            case 'rating':
                sortedProducts.sort((a, b) => b.rating - a.rating);
                break;
                
            case 'featured':
            default:
                // Featured products logic (could be based on custom criteria)
                // For demo purposes, we'll keep the original order
                break;
        }
        
        return sortedProducts;
    }

    function displayProducts(products) {
        const productGrid = document.querySelector('.product-grid');
        if (!productGrid) return;
        
        // Clear the current display
        productGrid.innerHTML = '';
        
        // If no products match filters
        if (products.length === 0) {
            productGrid.innerHTML = `
                <div class="no-products">
                    <p>No products match your filter criteria.</p>
                    <button class="btn btn-outline" onclick="document.getElementById('clearFilters').click()">
                        Clear Filters
                    </button>
                </div>
            `;
            return;
        }
        
        // Add products to the grid
        products.forEach(product => {
            const badgeHtml = product.badge ? 
                `<div class="product-badge ${product.badge === 'hot' ? 'hot' : product.badge === 'sale' ? 'sale' : ''}">${product.badge}</div>` : '';
            
            const oldPriceHtml = product.oldPrice ? 
                `<span class="old-price">$${product.oldPrice.toFixed(2)}</span>` : '';
            
            const starsHtml = generateStarsHtml(product.rating);
            
            productGrid.innerHTML += `
                <div class="product-card">
                    <a href="product-detail.html" class="product-link">
                        ${badgeHtml}
                        <div class="product-image">
                            <img src="${product.image}" alt="${product.name}">
                            <div class="product-actions">
                                <button class="action-btn"><i class="fas fa-heart"></i></button>
                                <button class="action-btn"><i class="fas fa-shopping-cart"></i></button>
                                <button class="action-btn"><i class="fas fa-eye"></i></button>
                            </div>
                        </div>
                        <div class="product-info">
                            <h3 class="product-name">${product.name}</h3>
                            <div class="product-rating">
                                ${starsHtml}
                                <span>(${Math.floor(Math.random() * 50) + 5})</span>
                            </div>
                            <div class="product-price">
                                <span class="current-price">$${product.price.toFixed(2)}</span>
                                ${oldPriceHtml}
                            </div>
                        </div>
                    </a>
                </div>
            `;
        });
    }

    function generateStarsHtml(rating) {
        let starsHtml = '';
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        
        // Add full stars
        for (let i = 0; i < fullStars; i++) {
            starsHtml += '<i class="fas fa-star"></i>';
        }
        
        // Add half star if needed
        if (hasHalfStar) {
            starsHtml += '<i class="fas fa-star-half-alt"></i>';
        }
        
        // Add empty stars
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        for (let i = 0; i < emptyStars; i++) {
            starsHtml += '<i class="far fa-star"></i>';
        }
        
        return starsHtml;
    }
});
