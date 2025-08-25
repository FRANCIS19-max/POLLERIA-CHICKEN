document.addEventListener('DOMContentLoaded', () => {
    const cartItemsList = document.getElementById('lista-carrito');
    const subtotalElement = document.getElementById('subtotal-carrito');
    const totalElement = document.getElementById('total-carrito');
    const emptyCartMessage = document.querySelector('.empty-cart-message');
    const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
    const comprarCarritoBtn = document.getElementById('comprar-carrito');

    const costoEnvio = 5.00;

    function loadCart() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        renderCart(cart);
    }

    function renderCart(cart) {
        cartItemsList.innerHTML = '';
        if (cart.length === 0) {
            emptyCartMessage.style.display = 'block';
            subtotalElement.textContent = `S/ 0.00`;
            totalElement.textContent = `S/ ${costoEnvio.toFixed(2)}`;
            comprarCarritoBtn.disabled = true;
            vaciarCarritoBtn.disabled = true;
        } else {
            emptyCartMessage.style.display = 'none';
            let subtotal = 0;

            cart.forEach(item => {
                const itemTotal = item.price * item.quantity;
                subtotal += itemTotal;

                const cartItem = document.createElement('div');
                cartItem.classList.add('cart-item');
                cartItem.innerHTML = `
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <p>Precio: S/ ${item.price.toFixed(2)}</p>
                        <p>Cantidad: ${item.quantity}</p>
                        <p>Total: S/ ${itemTotal.toFixed(2)}</p>
                    </div>
                `;
                cartItemsList.appendChild(cartItem);
            });

            subtotalElement.textContent = `S/ ${subtotal.toFixed(2)}`;
            totalElement.textContent = `S/ ${(subtotal + costoEnvio).toFixed(2)}`;
            comprarCarritoBtn.disabled = false;
            vaciarCarritoBtn.disabled = false;
        }
    }

    vaciarCarritoBtn.addEventListener('click', () => {
        if (confirm('¿Estás seguro que deseas vaciar el carrito?')) {
            localStorage.removeItem('cart');
            loadCart();
        }
    });

    comprarCarritoBtn.addEventListener('click', () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (cart.length > 0) {
            let message = "Hola, me gustaría hacer un pedido con los siguientes productos:\n\n";
            let subtotal = 0;
            
            cart.forEach(item => {
                const itemTotal = item.price * item.quantity;
                subtotal += itemTotal;
                message += `- ${item.name} (x${item.quantity}): S/ ${itemTotal.toFixed(2)}\n`;
            });

            message += `\nSubtotal: S/ ${subtotal.toFixed(2)}`;
            message += `\nCosto de envío: S/ ${costoEnvio.toFixed(2)}`;
            message += `\nTotal: S/ ${(subtotal + costoEnvio).toFixed(2)}`;
            message += `\n\nPor favor, confirma mi pedido y coordina el envío. ¡Gracias!`;

            const encodedMessage = encodeURIComponent(message);
            const whatsappUrl = `https://wa.me/51945819908?text=${encodedMessage}`;

            window.open(whatsappUrl, '_blank');
        } else {
            alert('Tu carrito está vacío. ¡Agrega productos para comprar!');
        }
    });

    // Cargar el carrito al iniciar la página
    loadCart();
});