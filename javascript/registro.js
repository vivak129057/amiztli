document.addEventListener('DOMContentLoaded', () => {
    // Escucha el formulario del especialista
    const formEspecialista = document.getElementById('formEspecialista'); // Asegúrate de darle este ID a tu formulario
    if (formEspecialista) {
        formEspecialista.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData();
            formData.append('nombre', document.getElementById('esp_nombre').value);
            formData.append('especialidad', document.getElementById('esp_especialidad').value);
            formData.append('cedula', document.getElementById('esp_cedula').value);
            formData.append('ciudad', document.getElementById('esp_ciudad').value);
            formData.append('telefono', document.getElementById('esp_telefono').value);
            formData.append('direccion', document.getElementById('esp_direccion').value);
            formData.append('descripcion', document.getElementById('esp_descripcion').value);
            formData.append('correo', document.getElementById('esp_correo').value);
            formData.append('password', document.getElementById('esp_password').value);

            await enviarRegistro('https://amiztlibackend.onrender.com/api/registro/especialista', formData);
        });
    }

    // Escucha el formulario de la institución
    const formEscuela = document.getElementById('formEscuela'); // Asegúrate de darle este ID a tu formulario
    if (formEscuela) {
        formEscuela.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData();
            formData.append('nombre', document.getElementById('esc_nombre').value);
            formData.append('cct', document.getElementById('esc_cct').value);
            formData.append('tipo', document.getElementById('esc_tipo').value);
            formData.append('telefono', document.getElementById('esc_telefono').value);
            formData.append('direccion', document.getElementById('esc_direccion').value);
            formData.append('servicios', document.getElementById('esc_servicios').value);
            formData.append('correo', document.getElementById('esc_correo').value);
            formData.append('password', document.getElementById('esc_password').value);

            await enviarRegistro('https://amiztlibackend.onrender.com/api/registro/institucion', formData);
        });
    }
});

async function enviarRegistro(url, formData) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: formData
        });
        
        const data = await response.json();
        
        if (response.ok) {
            alert('¡Registro completado exitosamente!');
            window.location.href = 'log_in.html';
        } else {
            alert('Error al registrar: ' + (data.error || ''));
        }
    } catch (error) {
        console.error('Error de red:', error);
        alert('Error al conectar con el servidor.');
    }
}