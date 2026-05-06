// 1. Base de datos de usuarios (Simulada)
const usuariosAutorizados = [ 
    { email: "Astrid@gmail.com", password: "123" },
    { email: "maestro@gmail.com", password: "mtrspro" },
    { email: "especialista@gmail.com", password: "special" },
    { email: "juan@gmail.com", password: "tanamera" }
];

// 2. Esperamos a que el DOM cargue para evitar errores de "null"
document.addEventListener('DOMContentLoaded', () => {

    const loginForm = document.getElementById('login-form');
    const inputEmail = document.getElementById('email');
    const inputPass = document.getElementById('password');
    const mensajeError = document.getElementById('error-email');

    // 3. Evento cuando el usuario hace clic en "Entrar"
    loginForm.addEventListener('submit', function(e) { 
        e.preventDefault(); // Evita que la página se recargue

        const emailDigitado = inputEmail.value.trim(); 
        const passDigitada = inputPass.value.trim();

        // Buscamos si existe el usuario con esa combinación exacta
        const usuarioEncontrado = usuariosAutorizados.find(user => 
            user.email === emailDigitado && user.password === passDigitada
        );

        if (usuarioEncontrado) {
            console.log("Acceso concedido");
            // Guardamos el usuario en la sesión para usarlo en la página principal
            sessionStorage.setItem("usuarioLogueado", emailDigitado);
            
            // Redirección a la página principal
            window.location.href = "../HTML/indexAdmin.html"; 
        } else {
            console.log("Datos incorrectos");
            
            // Mostramos el mensaje de error
            mensajeError.innerText = "Acceso denegado. Correo o contraseña incorrectos.";
            mensajeError.style.display = 'block';
            
            // Ponemos los bordes en rojo para indicar error
            inputEmail.style.borderColor = '#d93025';
            inputPass.style.borderColor = '#d93025';
            
            // Ponemos el foco en el email para que el usuario pueda corregir rápido
            inputEmail.focus(); 
        }
    });

    // 4. Limpiar los estilos de error cuando el usuario vuelva a escribir
    const limpiarError = () => {
        inputEmail.style.borderColor = '#ffecb3'; // Color original de tu CSS
        inputPass.style.borderColor = '#ffecb3';
        mensajeError.style.display = 'none';
    };

    inputEmail.addEventListener('input', limpiarError);
    inputPass.addEventListener('input', limpiarError);
});