document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.querySelector('.contact-form form');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Previene el envío por defecto

        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const mensaje = document.getElementById('mensaje').value;

        // Validaciones básicas
        if (nombre === '' || email === '' || mensaje === '') {
            alert('Por favor, completa todos los campos del formulario.');
            return;
        }

        // Simulación de envío de datos
        console.log('Datos del formulario de contacto:');
        console.log('Nombre:', nombre);
        console.log('Email:', email);
        console.log('Mensaje:', mensaje);

        // Muestra una alerta de éxito
        alert('¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.');

        // Opcional: Limpiar el formulario después del envío
        contactForm.reset();
    });
});