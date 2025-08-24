document.addEventListener('DOMContentLoaded', () => {
    // Selecciona todos los botones "Agregar" del menú
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    const cartTotalElement = document.getElementById('cart-total');

    // Carga el carrito desde localStorage o inicializa un array vacío
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Función para actualizar el total en el encabezado
    const updateCartTotal = () => {
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotalElement.textContent = `S/ ${total.toFixed(2)}`;
    };

    // Llama a la función al cargar la página para mostrar el total inicial
    updateCartTotal();

    // Recorre todos los botones y añade un evento de clic
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            // Encuentra el elemento padre que contiene la información del producto
            const productCard = event.target.closest('.menu-item-card');

            // Extrae los datos del producto de los atributos 'data' del HTML
            const productId = productCard.dataset.id;
            const productName = productCard.dataset.name;
            const productPrice = parseFloat(productCard.dataset.price);
            const productImage = productCard.dataset.image;

            // Busca si el producto ya existe en el carrito
            const existingItem = cart.find(item => item.id === productId);

            if (existingItem) {
                // Si existe, incrementa su cantidad
                existingItem.quantity++;
            } else {
                // Si no existe, añade un nuevo producto al carrito
                cart.push({
                    id: productId,
                    name: productName,
                    price: productPrice,
                    image: productImage, // Se guarda la imagen para mostrarla en el carrito
                    quantity: 1
                });
            }

            // Guarda el carrito actualizado en localStorage
            localStorage.setItem('cart', JSON.stringify(cart));
            
            // Actualiza el total visible en el header
            updateCartTotal();

            // Muestra una notificación al usuario
            alert(`${productName} ha sido añadido al carrito. Cantidad: ${existingItem ? existingItem.quantity : 1}`);
        });
    });
});