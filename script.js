document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const modal = document.getElementById('product-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const addToCartTriggers = document.querySelectorAll('.add-to-cart-trigger');
    const addToCartForm = document.getElementById('add-to-cart-form');
    const modalTitle = document.getElementById('modal-product-title');
    const modalPrice = document.getElementById('modal-product-price');
    const modalImg = document.getElementById('modal-product-img');
    const modalDesc = document.getElementById('modal-product-desc');
    
    const qtyInput = document.getElementById('qty-input');
    const qtyMinus = document.getElementById('qty-minus');
    const qtyPlus = document.getElementById('qty-plus');
    const buyNowBtn = document.getElementById('buy-now-btn');

    const cartCountEl = document.querySelector('.cart-count');
    const toast = document.getElementById('toast');

    let currentProduct = null;
    let currentPrice = 0;
    let cartTotalItems = 0;

    // Quantity selector logic
    qtyMinus.addEventListener('click', () => {
        let currentVal = parseInt(qtyInput.value);
        if (currentVal > 1) {
            qtyInput.value = currentVal - 1;
        }
    });

    qtyPlus.addEventListener('click', () => {
        let currentVal = parseInt(qtyInput.value);
        if (currentVal < 20) {
            qtyInput.value = currentVal + 1;
        }
    });

    // Open Modal
    addToCartTriggers.forEach(button => {
        button.addEventListener('click', (e) => {
            currentProduct = button.getAttribute('data-product');
            currentPrice = parseInt(button.getAttribute('data-price'));
            const imgSrc = button.getAttribute('data-img');
            const desc = button.getAttribute('data-desc');
            
            modalTitle.textContent = currentProduct;
            modalPrice.textContent = `$${currentPrice.toLocaleString('es-CO')} COP`;
            modalImg.src = imgSrc;
            modalDesc.textContent = desc;
            qtyInput.value = 1; // Reset qty
            
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    });

    // Close Modal Function
    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        addToCartForm.reset();
        qtyInput.value = 1;
    };

    closeModalBtn.addEventListener('click', closeModal);

    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Add to cart func
    const addToCart = () => {
        const qty = parseInt(qtyInput.value);

        console.log('Adding to cart:', {
            product: currentProduct,
            price: currentPrice,
            quantity: qty
        });

        // Update cart UI
        cartTotalItems += qty;
        cartCountEl.textContent = cartTotalItems;
        
        // Add animation to cart icon
        cartCountEl.style.transform = 'scale(1.3)';
        setTimeout(() => {
            cartCountEl.style.transform = 'scale(1)';
        }, 200);

        return true;
    };

    // Handle Form Submit (Add to cart)
    addToCartForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (addToCart()) {
            showToast(`¡${qtyInput.value}x ${currentProduct} añadido al carrito!`);
            closeModal();
        }
    });

    // Buy Now Button
    buyNowBtn.addEventListener('click', () => {
        if (addToCart()) {
            showToast(`Redirigiendo al checkout seguro...`);
            // In a real Shopify theme, this would redirect to /checkout
            setTimeout(() => {
                closeModal();
            }, 1000);
        }
    });

    // Toast functionality
    function showToast(message) {
        toast.textContent = message;
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
});
