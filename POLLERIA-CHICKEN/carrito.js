document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartSummaryTotal = document.getElementById('cart-summary-total');
    const checkoutBtn = document.getElementById('checkout-btn');

    // Suponemos que el carrito se guarda en el Local Storage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Función para renderizar los productos en la página del carrito
    const renderCartItems = () => {
        cartItemsContainer.innerHTML = '';
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart-message">Tu carrito está vacío.</p>';
            cartSummaryTotal.textContent = 'S/ 0.00';
            checkoutBtn.disabled = true;
            return;
        }

        let total = 0;
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            const cartItemHTML = `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="item-details">
                        <h4>${item.name}</h4>
                        <p class="price">S/ ${item.price.toFixed(2)}</p>
                    </div>
                    <div class="item-controls">
                        <input type="number" min="1" value="${item.quantity}" data-id="${item.id}" class="quantity-input">
                        <button class="remove-btn" data-id="${item.id}">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </div>
                    <div class="item-subtotal">S/ ${itemTotal.toFixed(2)}</div>
                </div>
            `;
            cartItemsContainer.insertAdjacentHTML('beforeend', cartItemHTML);
        });

        cartSummaryTotal.textContent = `S/ ${total.toFixed(2)}`;
        checkoutBtn.disabled = false;
    };

    // Manejar cambios en la cantidad de productos
    cartItemsContainer.addEventListener('change', (e) => {
        if (e.target.classList.contains('quantity-input')) {
            const id = e.target.dataset.id;
            const newQuantity = parseInt(e.target.value);
            if (newQuantity > 0) {
                const item = cart.find(i => i.id === id);
                if (item) {
                    item.quantity = newQuantity;
                    localStorage.setItem('cart', JSON.stringify(cart));
                    renderCartItems();
                }
            }
        }
    });

    // Manejar la eliminación de un producto
    cartItemsContainer.addEventListener('click', (e) => {
        if (e.target.closest('.remove-btn')) {
            const id = e.target.closest('.remove-btn').dataset.id;
            cart = cart.filter(item => item.id !== id);
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCartItems();
        }
    });

    // Evento para el botón de finalizar compra
    checkoutBtn.addEventListener('click', () => {
        if (cart.length > 0) {
            alert('¡Gracias por tu compra! Serás redirigido a la página de pago.');
            // Aquí puedes redirigir a una página de pago real o mostrar un modal
        }
    });

    renderCartItems();
});