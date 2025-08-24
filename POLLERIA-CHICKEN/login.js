document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('.login-form');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Evita que el formulario se envíe de forma predeterminada

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Validaciones básicas del formulario
        if (email === '' || password === '') {
            alert('Por favor, completa todos los campos.');
            return;
        }

        // Aquí puedes agregar la lógica de autenticación real
        // Por ejemplo, enviar los datos a un servidor
        console.log('Intentando iniciar sesión con:');
        console.log('Email:', email);
        console.log('Contraseña:', password);

        // Simulación de una respuesta del servidor
        setTimeout(() => {
            alert('Inicio de sesión exitoso. ¡Bienvenido!');
            // Redirigir al usuario a su perfil o a la página principal
            // window.location.href = 'index.html'; 
        }, 1000);
    });
});