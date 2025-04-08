// Mobile menu toggle
function openNav() {
    document.getElementById("overlay-nav").style.height = "100%";
}

function closeNav() {
    document.getElementById("overlay-nav").style.height = "0%";
}

// Search modal açma fonksiyonu (inline onclick için)
function openSearchModal() {
    const searchModal = document.getElementById('searchModal');
    if (searchModal) {
        searchModal.classList.add('show');
    } else {
        console.error("Search modal bulunamadı!");
    }
}

// Adding shadow to header on scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.background = 'rgba(11, 11, 25, 0.95)';
        header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.2)';
    } else {
        header.style.background = 'rgba(11, 11, 25, 0.8)';
        header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
    }
});

// Ana site fonksiyonları
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM yüklendi - site fonksiyonları başlatılıyor");
    
    // Hero butonları işlevselliği
    document.querySelectorAll('.hero-buttons .btn').forEach(button => {
        console.log("Hero butonu bulundu:", button.textContent);
        button.onclick = function(e) {
            console.log("Hero butonuna tıklandı:", this.textContent);
            const href = this.getAttribute('href');
            if (href) {
                console.log("Yönlendiriliyor:", href);
                window.location.href = href;
                return false;
            }
        };
    });
    
    // Initialize cart from localStorage
    let cart = JSON.parse(localStorage.getItem('techMarketCart')) || [];
    updateCartCount();
    
    function updateCartCount() {
        const cartCountElements = document.querySelectorAll('.cart-count');
        const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
        cartCountElements.forEach(element => {
            element.textContent = totalQuantity;
        });
    }
    
    // Search modal işlevselliği (main.js dosyasında bunu güncelleyin)
    setTimeout(function() {
        const searchModal = document.getElementById('searchModal');
        if (searchModal) {
            // Kapatma butonu için yeni listener
            const closeBtn = searchModal.querySelector('.close-search');
            if (closeBtn) {
                closeBtn.addEventListener('click', function() {
                    searchModal.classList.remove('show');
                });
            }
            
            // Arama butonu için yeni listener
            const searchButton = searchModal.querySelector('#searchButton');
            const searchInput = searchModal.querySelector('#searchInput');
            if (searchButton && searchInput) {
                searchButton.addEventListener('click', function() {
                    performSearch(searchInput, searchModal.querySelector('.search-results'));
                });
                
                searchInput.addEventListener('keypress', function(e) {
                    if (e.key === 'Enter') {
                        performSearch(searchInput, searchModal.querySelector('.search-results'));
                    }
                });
            }
        }
    }, 500);
    
    // Arama fonksiyonu
    window.performSearch = function(input, resultsContainer) {
        const query = input.value.trim();
        if (query.length < 2) {
            resultsContainer.innerHTML = '<p>Please enter at least 2 characters</p>';
            return;
        }
        
        // Örnek ürünler
        const products = [
            { id: 1, name: 'Ultra HD 4K Smartphone', price: '$799.99', image: 'images/product1.jpg' },
            { id: 2, name: 'Wireless Headphones Pro', price: '$249.99', image: 'images/product2.jpg' },
            { id: 3, name: 'Ultra Thin Gaming Laptop', price: '$1,299.99', image: 'images/product3.jpg' },
            { id: 4, name: 'Smart Watch Pro Series', price: '$349.99', image: 'images/product4.jpg' }
        ];
        
        const results = products.filter(product => 
            product.name.toLowerCase().includes(query.toLowerCase())
        );
        
        if (results.length === 0) {
            resultsContainer.innerHTML = '<p>No products found</p>';
        } else {
            let html = '';
            results.forEach(product => {
                html += `
                <div class="search-result-item">
                    <img src="${product.image}" alt="${product.name}" onerror="this.src='images/placeholder.jpg'">
                    <div class="search-result-details">
                        <h4>${product.name}</h4>
                        <p>${product.price}</p>
                    </div>
                </div>`;
            });
            resultsContainer.innerHTML = html;
            
            const items = resultsContainer.querySelectorAll('.search-result-item');
            items.forEach((item, index) => {
                item.addEventListener('click', function() {
                    window.location.href = `product-detail.html?id=${results[index].id}`;
                });
            });
        }
    };
    
    // Search icon için event listener
    const searchIcons = document.querySelectorAll('.search-icon, .fa-search');
    searchIcons.forEach(icon => {
        icon.addEventListener('click', function(e) {
            e.preventDefault();
            openSearchModal();
        });
    });
    
    // Kullanıcı modalı
    if (!document.getElementById('userModal')) {
        const userIcon = document.querySelector('.fa-user').closest('a, div');
        const userModal = document.createElement('div');
        userModal.id = 'userModal';
        userModal.className = 'user-modal';
        userModal.innerHTML = `
            <div class="user-modal-content">
                <span class="close-user-modal">&times;</span>
                
                <div class="user-modal-tabs">
                    <button class="tab-btn active" data-tab="login">Login</button>
                    <button class="tab-btn" data-tab="register">Register</button>
                </div>
                
                <div class="tab-content" id="login-tab">
                    <h3>Login to Your Account</h3>
                    <form id="loginForm">
                        <div class="form-group">
                            <label for="loginEmail">Email</label>
                            <input type="email" id="loginEmail" required>
                        </div>
                        <div class="form-group">
                            <label for="loginPassword">Password</label>
                            <input type="password" id="loginPassword" required>
                        </div>
                        <div class="form-group remember-me">
                            <input type="checkbox" id="rememberMe">
                            <label for="rememberMe">Remember me</label>
                        </div>
                        <button type="submit" class="btn-primary">Login</button>
                        <p class="forgot-password">Forgot password?</p>
                    </form>
                </div>
                
                <div class="tab-content" id="register-tab" style="display: none;">
                    <h3>Create an Account</h3>
                    <form id="registerForm">
                        <div class="form-group">
                            <label for="registerName">Full Name</label>
                            <input type="text" id="registerName" required>
                        </div>
                        <div class="form-group">
                            <label for="registerEmail">Email</label>
                            <input type="email" id="registerEmail" required>
                        </div>
                        <div class="form-group">
                            <label for="registerPassword">Password</label>
                            <input type="password" id="registerPassword" required>
                        </div>
                        <div class="form-group">
                            <label for="confirmPassword">Confirm Password</label>
                            <input type="password" id="confirmPassword" required>
                        </div>
                        <div class="form-group terms">
                            <input type="checkbox" id="agreeTerms" required>
                            <label for="agreeTerms">I agree to the Terms and Conditions</label>
                        </div>
                        <button type="submit" class="btn-primary">Register</button>
                    </form>
                </div>
            </div>
        `;
        document.body.appendChild(userModal);
        
        // Kullanıcı ikonuna tıklama
        if (userIcon) {
            userIcon.addEventListener('click', function(e) {
                e.preventDefault();
                userModal.classList.add('show');
            });
        }
        
        // Modal kapatma
        const closeUserModal = document.querySelector('.close-user-modal');
        if (closeUserModal) {
            closeUserModal.addEventListener('click', function() {
                userModal.classList.remove('show');
            });
        }
        
        // Dışarı tıklama ile kapatma
        userModal.addEventListener('click', function(e) {
            if (e.target === userModal) {
                userModal.classList.remove('show');
            }
        });
        
        // Tab değiştirme
        const tabBtns = document.querySelectorAll('.tab-btn');
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const tabName = this.getAttribute('data-tab');
                
                tabBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                document.querySelectorAll('.tab-content').forEach(tab => {
                    tab.style.display = 'none';
                });
                document.getElementById(tabName + '-tab').style.display = 'block';
            });
        });
    }
    
    // Add to Cart from product detail page
    const addToCartBtn = document.querySelector('.add-to-cart');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function() {
            const productName = document.querySelector('.product-title')?.textContent || 'Product';
            const productPrice = document.querySelector('.current-price')?.textContent.replace('$', '') || '0';
            const productImage = document.querySelector('#mainImage')?.src || '';
            const quantity = parseInt(document.querySelector('#quantity')?.value || 1);
            
            // Ürün nesnesi oluştur
            const product = {
                id: Date.now().toString(),
                name: productName,
                price: parseFloat(productPrice),
                image: productImage,
                quantity: quantity
            };
            
            // Sepete ekle
            let cart = JSON.parse(localStorage.getItem('techMarketCart')) || [];
            cart.push(product);
            localStorage.setItem('techMarketCart', JSON.stringify(cart));
            
            // Sepet sayısını güncelle
            updateCartCount();
            
            // Bildirim göster
            alert('Product added to cart!');
        });
    }
    
    console.log("Ana site fonksiyonları yüklendi");
});

// Butonları yüklendikten sonra tekrar bağla
window.addEventListener('load', function() {
    // İlk tıklama olaylarını temizle
    document.querySelectorAll('.hero-buttons a').forEach(function(btn) {
        const oldBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(oldBtn, btn);
    });
    
    // Shop Now butonu
    document.getElementById('shopNowButton').addEventListener('click', function(e) {
        e.preventDefault();
        console.log("main.js: Shop Now butonuna tıklandı");
        window.location.href = 'products.html';
    });
    
    // Featured Items butonu
    document.getElementById('featuredButton').addEventListener('click', function(e) {
        e.preventDefault();
        console.log("main.js: Featured Items butonuna tıklandı");
        window.location.href = 'products.html#featured';
    });
});
