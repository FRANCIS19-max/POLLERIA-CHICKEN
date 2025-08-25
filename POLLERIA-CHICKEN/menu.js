document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    const cartTotalSpan = document.getElementById('cart-total');

    function updateCartTotalDisplay(cart) {
        const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        cartTotalSpan.textContent = `S/ ${total.toFixed(2)}`;
    }

    // Inicializar el total del carrito al cargar la página
    const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCartTotalDisplay(currentCart);

    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const menuItem = e.target.closest('.menu-item-card');
            const itemData = {
                id: menuItem.dataset.id,
                name: menuItem.dataset.name,
                price: parseFloat(menuItem.dataset.price),
                image: menuItem.dataset.image,
                quantity: 1
            };

            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            const existingItemIndex = cart.findIndex(item => item.id === itemData.id);

            if (existingItemIndex > -1) {
                cart[existingItemIndex].quantity += 1;
            } else {
                cart.push(itemData);
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartTotalDisplay(cart);
            alert(`${itemData.name} ha sido agregado al carrito.`);
        });
    });
});