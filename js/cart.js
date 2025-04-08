document.addEventListener('DOMContentLoaded', function() {
    // Sepeti ilk yükle
    loadCart();

    // Sepeti yükleme ve görüntüleme
    function loadCart() {
        const cart = JSON.parse(localStorage.getItem('techMarketCart')) || [];
        displayCart(cart); // Sepeti görüntüle
    }

    // Sepet sayısını güncelleme (Header'daki ikon için)
    function updateCartCount(cart) {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        document.querySelectorAll('.cart-count').forEach(el => {
            el.textContent = totalItems;
        });
    }

    // Sepet içeriğini ve toplamlarını görüntüleme
    function displayCart(cart) {
        const cartItemsContainer = document.getElementById('cart-items'); // tbody ID'si
        const emptyCartMessage = document.querySelector('.empty-cart-message');
        const cartTable = document.querySelector('.cart-table');
        const cartActions = document.querySelector('.cart-actions');
        const cartSection = document.querySelector('.cart-section');

        if (!cartSection || !emptyCartMessage || !cartTable || !cartActions || !cartItemsContainer) {
            console.error("Sepet için gerekli HTML elemanları bulunamadı!");
            return;
        }

        // 1. Sepet Durumuna Göre Göster/Gizle
        if (cart.length === 0) {
            cartSection.classList.add('is-empty');
            cartItemsContainer.innerHTML = ''; // Tablo içini temizle
            cartTable.style.display = 'none';
            cartActions.style.display = 'none';
            emptyCartMessage.style.display = 'block';
        } else {
            cartSection.classList.remove('is-empty');
            emptyCartMessage.style.display = 'none';
            cartTable.style.display = ''; // Varsayılan tablo görünümü
            cartActions.style.display = ''; // Varsayılan aksiyon görünümü

            // 2. Ürünleri Listele
            let html = '';
            cart.forEach((item, index) => {
                html += `
                <tr>
                    <td>
                        <div class="product-info">
                            <img src="${item.image || 'images/placeholder.png'}" alt="${item.name}">
                            <div>${item.name}</div>
                        </div>
                    </td>
                    <td>$${parseFloat(item.price).toFixed(2)}</td>
                    <td>
                        <div class="quantity-control">
                            <button class="quantity-btn minus" data-index="${index}">−</button>
                            <input type="text" value="${item.quantity}" class="quantity-input" data-index="${index}" readonly>
                            <button class="quantity-btn plus" data-index="${index}">+</button>
                        </div>
                    </td>
                    <td>$${(parseFloat(item.price) * item.quantity).toFixed(2)}</td>
                    <td><button class="remove-btn" data-index="${index}"><i class="fas fa-trash"></i></button></td>
                </tr>
                `;
            });
            cartItemsContainer.innerHTML = html;

            // 3. Event Listener'ları Ekle (ÖNEMLİ: HTML oluşturulduktan sonra eklenmeli)
            addCartEventListeners();
        }

        // 4. Sepet Toplamlarını ve Sayısını Her Zaman Güncelle
        updateCartTotals(cart);
        updateCartCount(cart);
    }

    // Event Listener'ları Ekleyen Yardımcı Fonksiyon
    function addCartEventListeners() {
        // Önceki listener'ları temizlemeye gerek yok, çünkü tbody içeriği her seferinde yeniden yazılıyor.
        document.querySelectorAll('.quantity-btn.plus').forEach(btn => {
            btn.addEventListener('click', increaseQuantity);
        });

        document.querySelectorAll('.quantity-btn.minus').forEach(btn => {
            btn.addEventListener('click', decreaseQuantity);
        });

        // Miktar inputuna doğrudan müdahale etmek istenirse (opsiyonel)
        /*
        document.querySelectorAll('.quantity-input').forEach(input => {
             input.addEventListener('change', updateQuantity);
        });
        */

        document.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', removeItem); // Silme butonu listener'ı
        });
    }

    // Sepet Toplamlarını Hesaplama ve Güncelleme
    function updateCartTotals(cart) {
        const subtotal = cart.reduce((total, item) => total + (parseFloat(item.price) * item.quantity), 0);
        const taxRate = 0.10; // %10 vergi oranı
        const tax = subtotal * taxRate;
        const total = subtotal + tax;

        const subtotalEl = document.getElementById('subtotal') || document.querySelector('.cart-summary .summary-item:nth-child(1) span:last-child');
        const taxEl = document.getElementById('tax') || document.querySelector('.cart-summary .summary-item:nth-child(3) span:last-child');
        const totalEl = document.getElementById('total') || document.querySelector('.cart-summary .summary-item.total span:last-child');

        if (subtotalEl) subtotalEl.textContent = '$' + subtotal.toFixed(2);
        if (taxEl) taxEl.textContent = '$' + tax.toFixed(2);
        if (totalEl) totalEl.textContent = '$' + total.toFixed(2);

        // Eğer ID yerine class veya yapısal seçiciler kullanıyorsanız, yukarıdaki querySelector'ları kendi HTML yapınıza göre güncelleyin.
        // Örnek: document.querySelector('.cart-summary div:nth-of-type(1) span:last-child') gibi.
    }


    // Miktar Artırma
    function increaseQuantity() {
        const index = parseInt(this.getAttribute('data-index'));
        const cart = JSON.parse(localStorage.getItem('techMarketCart')) || [];
        if (cart[index]) {
            cart[index].quantity++;
            saveCart(cart);
        }
    }

    // Miktar Azaltma
    function decreaseQuantity() {
        const index = parseInt(this.getAttribute('data-index'));
        const cart = JSON.parse(localStorage.getItem('techMarketCart')) || [];
        if (cart[index] && cart[index].quantity > 1) {
            cart[index].quantity--;
            saveCart(cart);
        } else if (cart[index] && cart[index].quantity === 1) {
            // Miktar 1 iken azaltılırsa ürünü silmeyi tercih edebilirsiniz
            // removeItem.call(this); // Bu şekilde de çağrılabilir
             cart.splice(index, 1);
             saveCart(cart);
        }
    }

    // Ürünü Sepetten Kaldırma
    function removeItem() {
        const index = parseInt(this.getAttribute('data-index'));
        let cart = JSON.parse(localStorage.getItem('techMarketCart')) || [];
         // index geçerliyse ürünü kaldır
        if (index >= 0 && index < cart.length) {
            cart.splice(index, 1); // Ürünü diziden çıkar
            saveCart(cart); // Değişiklikleri kaydet ve arayüzü güncelle
        } else {
            console.error("Geçersiz index:", index, "Sepet:", cart);
        }
    }

    // Sepeti Kaydetme ve Arayüzü Yenileme
    function saveCart(cart) {
        localStorage.setItem('techMarketCart', JSON.stringify(cart));
        displayCart(cart); // DOM'u yeni sepet verisiyle güncelle
    }

    // ------ Diğer Olay Dinleyicileri (Kupon, Sepeti Güncelle vb.) ------

    const updateCartBtn = document.getElementById('update-cart-btn') || document.querySelector('.update-cart-btn');
    if (updateCartBtn) {
        updateCartBtn.addEventListener('click', function() {
            // Bu buton genellikle miktarlar manuel girildiğinde kullanılır.
            // Eğer miktar +/- butonlarıyla anında güncelleniyorsa, bu butona gerek kalmayabilir.
            // Şimdilik sadece sepeti yeniden yüklesin:
            loadCart();
            alert('Cart updated!'); // Kullanıcıya geri bildirim
        });
    }

    const applyCouponBtn = document.getElementById('apply-coupon-btn') || document.querySelector('.apply-coupon-btn');
    if (applyCouponBtn) {
        applyCouponBtn.addEventListener('click', function() {
            const couponInput = document.getElementById('coupon-input') || document.querySelector('.coupon-input');
            const couponCode = couponInput ? couponInput.value.trim() : '';
            if (couponCode) {
                // Burada kupon kodu kontrolü ve indirim uygulama mantığı eklenecek.
                alert('Coupon "' + couponCode + '" applied (simulated).');
                // İndirim uygulandıktan sonra sepet toplamlarını tekrar hesaplamak gerekebilir.
                // updateCartTotals(cart, discountAmount); // Örneğin
            } else {
                alert('Please enter a coupon code.');
            }
        });
    }

}); // DOMContentLoaded Sonu
