document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const inputEmail = document.getElementById('email');
    const inputPass = document.getElementById('password');
    const mensajeError = document.getElementById('error-email');

    loginForm.addEventListener('submit', async function(e) { 
        e.preventDefault(); // Evita que la página se recargue

        const emailDigitado = inputEmail.value.trim(); 
        const passDigitada = inputPass.value.trim();

        // Creamos el FormData para enviarlo a tu backend
        const formData = new FormData();
        formData.append('email', emailDigitado);
        formData.append('password', passDigitada);

        try {
            // Petición al backend en Render
            const response = await fetch('https://amiztlibackend.onrender.com/api/login', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (response.ok) {
                console.log("Acceso concedido");
                
                // Guardamos el usuario y el rol en la sesión
                sessionStorage.setItem("usuarioLogueado", emailDigitado);
                sessionStorage.setItem("rol", data.rol); 
                
                // Redirección a la página principal
                window.location.href = "../Html/indexAdmin.html"; 
            } else {
                // Mostramos el mensaje de error que devuelve el backend
                mostrarError(data.error || "Acceso denegado. Correo o contraseña incorrectos.");
            }
        } catch (error) {
            console.error('Error de conexión:', error);
            mostrarError('Error al conectar con el servidor. Intenta de nuevo más tarde.');
        }
    });

    const mostrarError = (mensaje) => {
        mensajeError.innerText = mensaje;
        mensajeError.style.display = 'block';
        
        // Ponemos los bordes en rojo para indicar error
        inputEmail.style.borderColor = '#d93025';
        inputPass.style.borderColor = '#d93025';
        
        // Ponemos el foco en el email
        inputEmail.focus(); 
    }

    // 4. Limpiar los estilos de error cuando el usuario vuelva a escribir
    const limpiarError = () => {
        inputEmail.style.borderColor = '#ffecb3'; 
        inputPass.style.borderColor = '#ffecb3';
        mensajeError.style.display = 'none';
    };

    inputEmail.addEventListener('input', limpiarError);
    inputPass.addEventListener('input', limpiarError);
});