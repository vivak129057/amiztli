document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. Pestañas Principales (Sidebar)
    // ==========================================
    const navItems = document.querySelectorAll('.nav-item');
    const tabContents = document.querySelectorAll('.tab-content');
    const pageTitle = document.getElementById('pageTitle');
    const pageSubtitle = document.getElementById('pageSubtitle');

    const sectionData = {
        inicio: { 
            title: '¿QUIÉNES SOMOS?', 
            subtitle: 'AMIZTLI: APOYO INTEGRAL HECHO CON AMOR Y PATITAS' 
        },
        chats: { 
            title: 'CHATS', 
            subtitle: 'Conéctate con otros padres y especialistas de la comunidad' 
        },
        foro: { 
            title: 'FORO COMUNITARIO', 
            subtitle: 'Comparte experiencias, consejos y redes de apoyo' 
        },
        notas: { 
            title: 'NOTAS / DIARIO', 
            subtitle: 'Lleva el registro del progreso y actividades diarias' 
        },
        materiales: { 
            title: 'MATERIALES', 
            subtitle: 'Recursos educativos y herramientas para el desarrollo' 
        },
        directorio: { 
            title: 'DIRECTORIO', 
            subtitle: 'Encuentra especialistas, escuelas y asociaciones cercanas' 
        },
        perfil: { 
            title: 'MI PERFIL', 
            subtitle: 'Gestiona tu información personal y preferencias de la cuenta' 
        },
        configuracion: { 
            title: 'CONFIGURACIÓN', 
            subtitle: 'Ajustes de accesibilidad y del sistema' 
        }
    };

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const tabId = item.getAttribute('data-tab');

            // Quitar clases previas
            navItems.forEach(nav => nav.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Activar nueva pestaña
            item.classList.add('active');
            const target = document.getElementById(`${tabId}-content`);
            if (target) target.classList.add('active');

            // Cambiar encabezados
            if (sectionData[tabId]) {
                pageTitle.textContent = sectionData[tabId].title;
                pageSubtitle.textContent = sectionData[tabId].subtitle;
            }
        });
    });

    // ==========================================
    // 2. Carrusel de Inicio
    // ==========================================
    const track = document.getElementById('carouselTrack');
    const slides = document.querySelectorAll('.carousel-slide');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    let index = 0;

    function moveCarousel() {
        if (!track || slides.length === 0) return;
        if (index >= slides.length) index = 0;
        if (index < 0) index = slides.length - 1;
        track.style.transform = `translateX(-${index * 100}%)`;
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            index++;
            moveCarousel();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            index--;
            moveCarousel();
        });
    }

    // ==========================================
    // 3. Fecha Actual
    // ==========================================
    function updateDate() {
        const dateElement = document.getElementById('currentDate');
        if (dateElement) {
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            dateElement.textContent = new Date().toLocaleDateString('es-ES', options);
        }
    }
    updateDate();

    // ==========================================
    // 4. Sidebar Toggle
    // ==========================================
    const btnMenu = document.getElementById('btn-menu');
    const sidebar = document.querySelector('.sidebar');
    if (btnMenu && sidebar) {
        btnMenu.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });
    }

    // ==========================================
    // 5. Configuración y Temas
    // ==========================================
    const themeSelector = document.getElementById('themeSelector');
    const body = document.body;

    if (themeSelector) {
        themeSelector.addEventListener('change', function() {
            const selectedTheme = this.value;
            body.classList.remove('dark-mode', 'high-contrast');

            if (selectedTheme === 'dark') {
                body.classList.add('dark-mode');
            } else if (selectedTheme === 'high-contrast') {
                body.classList.add('high-contrast');
            }
        });

        const savedTheme = localStorage.getItem('amiztli-theme');
        if (savedTheme) {
            themeSelector.value = savedTheme;
            themeSelector.dispatchEvent(new Event('change'));
        }
    }

    // ==========================================
    // 6. Subir / Seleccionar Imagen de Perfil
    // ==========================================
    const avatarSelect = document.getElementById('avatarSelect');
    const profileImage = document.getElementById('profileImage');
    const fileInput = document.getElementById('fileInput');

    if (avatarSelect && profileImage) {
        avatarSelect.addEventListener('change', function() {
            profileImage.setAttribute('src', this.value);
        });
    }

    if (fileInput && profileImage) {
        fileInput.addEventListener('change', function() {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    profileImage.setAttribute('src', e.target.result);
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // ==========================================
    // 7. Directorio (Pestañas y Buscador)
    // ==========================================
    const subTabs = document.querySelectorAll('.directory-tabs .tab-btn, .tabs-container .tab-btn');
    const subContents = document.querySelectorAll('.directory-tab');

    subTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            subTabs.forEach(t => t.classList.remove('active'));
            subContents.forEach(c => c.classList.remove('active'));

            tab.classList.add('active');
            const targetId = tab.getAttribute('data-tab');
            const targetContent = document.getElementById(targetId);
            
            if (targetContent) {
                targetContent.classList.add('active');
                sortAlphabetically(`grid-${targetId}`);
            }
        });
    });

    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keyup', () => {
            const filter = searchInput.value.toLowerCase();
            const activeSubTab = document.querySelector('.directory-tab.active');
            if (activeSubTab) {
                const cards = activeSubTab.getElementsByClassName('card');
                Array.from(cards).forEach(card => {
                    const text = card.innerText.toLowerCase();
                    card.style.display = text.includes(filter) ? "" : "none";
                });
            }
        });
    }

    // ==========================================
    // 8. Modales de Materiales y Directorio
    // ==========================================
    const modalMaterials = document.getElementById('modalContainer');
    const btnOpenMaterials = document.getElementById('btnOpen');
    const closeMaterialsBtn = modalMaterials?.querySelector('.close-modal');

    if (btnOpenMaterials && modalMaterials) {
        btnOpenMaterials.onclick = () => modalMaterials.style.display = "block";
    }

    if (closeMaterialsBtn && modalMaterials) {
        closeMaterialsBtn.onclick = () => modalMaterials.style.display = "none";
    }

    // Modal del Directorio
    const modalDirectory = document.getElementById('contactModal');
    const btnOpenDirectory = document.getElementById('btnAbrirDirectorio');
    const closeDirectoryBtn = modalDirectory?.querySelector('.close-btn');

    if (btnOpenDirectory && modalDirectory) {
        btnOpenDirectory.onclick = () => modalDirectory.style.display = "flex";
    }

    if (closeDirectoryBtn && modalDirectory) {
        closeDirectoryBtn.onclick = () => modalDirectory.style.display = "none";
    }

    window.onclick = (event) => {
        if (event.target === modalMaterials) {
            modalMaterials.style.display = "none";
        }
        if (event.target === modalDirectory) {
            modalDirectory.style.display = "none";
        }
        const postModal = document.getElementById('modal-post');
        if (event.target === postModal) {
            postModal.style.display = "none";
        }
    };

    // ==========================================
    // 9. Integración del Formulario de Materiales (Lógica de subida)
    // ==========================================
    const materialForm = document.getElementById('materialForm');
    if (materialForm) {
        materialForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const formData = new FormData();
            formData.append('titulo', document.getElementById('titulo').value);
            formData.append('descripcion', document.getElementById('descripcion').value);
            formData.append('condicion', document.getElementById('condicion').value);

            const archivoInput = document.getElementById('archivo');
            if (archivoInput && archivoInput.files.length > 0) {
                formData.append('archivo', archivoInput.files[0]);
            } else {
                alert('Por favor, selecciona un archivo o PDF.');
                return;
            }

            try {
                const response = await fetch('https://amiztlibackend.onrender.com/api/materiales_educativos', {
                    method: 'POST',
                    body: formData // Los headers son asignados automáticamente por el navegador
                });

                const data = await response.json();

                if (response.ok) {
                    alert('¡Material guardado exitosamente en el equipo!');
                    if (typeof window.cargarMateriales === 'function') {
                        cargarMateriales();
                    }
                    if (modalMaterials) modalMaterials.style.display = "none";
                    materialForm.reset(); // Limpiar el formulario
                } else {
                    alert('Error: ' + (data.error || 'Ocurrió un error.'));
                }
            } catch (error) {
                console.error('Error de conexión:', error);
                alert('No se pudo conectar con la base de datos o el servidor local.');
            }
        });
    }

    // ==========================================
    // 10. Chat
    // ==========================================
    const chatForm = document.getElementById('chatForm');
    const chatBox = document.getElementById('chatBox');
    const msgInput = document.getElementById('msgInput');

    if (chatForm && chatBox && msgInput) {
        chatForm.onsubmit = (e) => {
            e.preventDefault();
            if (msgInput.value.trim() === "") return;

            const bubble = document.createElement('div');
            bubble.className = 'bubble sent';
            bubble.innerText = msgInput.value;
            
            chatBox.appendChild(bubble);
            chatBox.scrollTop = chatBox.scrollHeight;
            msgInput.value = "";
        };
    }

    // ==========================================
    // 11. Foro y Publicaciones
    // ==========================================
    const forumModal = document.getElementById('modal-post');
    const btnOpenForum = document.querySelector('.btn-post');
    const btnCloseForum = forumModal?.querySelector('.close-modal');
    const btnPublish = document.getElementById('btn-publish-final');
    const searchInputForum = document.querySelector('.search-forum');

    if (btnOpenForum && forumModal) {
        btnOpenForum.onclick = () => forumModal.style.display = "block";
    }

    if (btnCloseForum && forumModal) {
        btnCloseForum.onclick = () => forumModal.style.display = "none";
    }

    if (btnPublish) {
        btnPublish.onclick = () => {
            const titleElement = document.getElementById('post-title-input');
            const contentElement = document.getElementById('post-content-input');
            
            if (!titleElement || !contentElement) return;

            const title = titleElement.value;
            const content = contentElement.value;

            if (title && content) {
                const newCard = document.createElement('article');
                newCard.classList.add('post-card');
                
                newCard.innerHTML = `
                    <div class="post-user-info">
                        <div class="user-avatar">KV</div>
                        <div>
                            <span class="post-user-name">Karla Villa</span>
                            <div class="post-meta">Publicado ahora mismo</div>
                        </div>
                    </div>
                    <h2 class="post-title">${title}</h2>
                    <p class="post-content">${content}</p>
                    <div class="post-actions">
                        <button class="action-btn like">❤️ 0</button>
                        <button class="action-btn">💬 0 Comentarios</button>
                        <button class="action-btn">🔗 Compartir</button>
                    </div>
                `;

                const forumHeader = document.querySelector('.forum-header');
                if (forumHeader) {
                    forumHeader.after(newCard);
                }

                titleElement.value = "";
                contentElement.value = "";
                if (forumModal) forumModal.style.display = "none";
            } else {
                alert("¡Escribe algo primero, Karla! ");
            }
        };
    }

    if (searchInputForum) {
        searchInputForum.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            const allPosts = document.querySelectorAll('.post-card');

            allPosts.forEach(post => {
                const titleText = post.querySelector('.post-title')?.innerText.toLowerCase() || '';
                const contentText = post.querySelector('.post-content')?.innerText.toLowerCase() || '';

                if (titleText.includes(term) || contentText.includes(term)) {
                    post.style.display = "block";
                    post.style.animation = "fadeIn 0.3s";
                } else {
                    post.style.display = "none";
                }
            });
        });
    }

    cargarMateriales(); // Cargar materiales al iniciar la página
});

// ==========================================
// 12. Funciones Globales
// ==========================================
function sortAlphabetically(gridId) {
    const grid = document.getElementById(gridId);
    if (!grid) return;
    const cards = Array.from(grid.getElementsByClassName('card'));
    
    cards.sort((a, b) => {
        const titleA = a.querySelector('.card-title')?.innerText || '';
        const titleB = b.querySelector('.card-title')?.innerText || '';
        return titleA.localeCompare(titleB);
    });
    
    cards.forEach(card => grid.appendChild(card));
}

function logout() {
    window.location.href = "log_in.html";
}

function saveConfig() {
    const themeSelector = document.getElementById('themeSelector');
    if (themeSelector) {
        localStorage.setItem('amiztli-theme', themeSelector.value);
        alert('Configuración guardada 🐾 - El tema se aplicará en tu próxima sesión.');
    }
}

function setMode(mode) {
    const btnPersonal = document.getElementById('btnPersonal');
    const btnCompartido = document.getElementById('btnCompartido');
    const badge = document.getElementById('badge');

    if (mode === 'personal') {
        btnPersonal?.classList.add('active');
        btnCompartido?.classList.remove('active');
        if (badge) badge.textContent = '🔒 Solo para mí';
    } else {
        btnCompartido?.classList.add('active');
        btnPersonal?.classList.remove('active');
        if (badge) badge.textContent = '👥 Compartido';
    }
}

function actualizarNombre() {
    const input = document.getElementById('archivo');
    const display = document.getElementById('fileNameDisplay');
    
    if (display) {
        if (input && input.files.length > 0) {
            display.innerText = "Archivo: " + input.files[0].name;
            display.style.color = "#34495E"; 
            display.style.fontWeight = "bold";
        } else {
            display.innerText = "Seleccionar archivo o PDF 📎";
        }
    }
}

let materialesGlobales = [];

async function cargarMateriales() {
    try {
        const response = await fetch('https://amiztlibackend.onrender.com/api/materiales_educativos');
        
        if (!response.ok) {
            throw new Error('Error al obtener los materiales');
        }

        materialesGlobales = await response.json(); // Guardamos los materiales en la variable global
        
        // Renderizamos todos los materiales al cargar
        renderizarMateriales(materialesGlobales);

    } catch (error) {
        console.error("Error al cargar los materiales:", error);
    }
}

// Función que dibuja las tarjetas en el HTML
function renderizarMateriales(materiales) {
    const contenedor = document.querySelector('.materials-list');
    contenedor.innerHTML = ''; // Limpiamos el contenedor

    if (materiales.length === 0) {
        contenedor.innerHTML = `<p class="no-results" style="display: block;">No hay materiales disponibles.</p>`;
        return;
    }

    materiales.forEach(mat => {
        const card = document.createElement('div');
        card.classList.add('material-card');

        let archivoUrl = mat.enlace_descarga || mat.tipo_archivo;
        let urlDescarga = archivoUrl;
        
        if (urlDescarga && urlDescarga.includes('cloudinary.com')) {
            urlDescarga = urlDescarga.replace('/upload/', '/upload/fl_attachment/');
        }

        let categoriaTexto = (mat.categoria && mat.categoria.trim() !== '') ? mat.categoria : 'General';

        card.innerHTML = `
            <div class="material-info">
                <h4>${mat.titulo_recurso || 'Sin título'}</h4>
                <p>${mat.descripcion || 'Sin descripción'}</p>
                <span class="condition-tag">${categoriaTexto}</span>
            </div>
            <div style="display: flex; gap: 10px;">
                <a href="${archivoUrl}" target="_blank" class="btn-download">Visualizar 👁️</a>
                <a href="${urlDescarga}" download class="btn-download">Descargar 📥</a>
            </div>
        `;
        contenedor.appendChild(card);
    });
}

// Función para filtrar los materiales según lo que escriba el usuario
function filtrarMateriales() {
    const query = document.getElementById('buscadorMateriales').value.toLowerCase();
    
    // Filtramos los materiales que coincidan con el título, la descripción o la categoría
    const materialesFiltrados = materialesGlobales.filter(mat => {
        const titulo = (mat.titulo_recurso || '').toLowerCase();
        const descripcion = (mat.descripcion || '').toLowerCase();
        const categoria = (mat.categoria || '').toLowerCase();
        
        return titulo.includes(query) || descripcion.includes(query) || categoria.includes(query);
    });
    
    // Dibujamos solo los filtrados
    renderizarMateriales(materialesFiltrados);
}

// Ejecutamos la carga inicial al abrir la página
document.addEventListener("DOMContentLoaded", cargarMateriales);

function mostrarNombreArchivo() {
    const inputArchivo = document.getElementById('archivo');
    const textoArchivo = document.getElementById('nombre-archivo');

    if (inputArchivo.files && inputArchivo.files.length > 0) {
        const nombre = inputArchivo.files[0].name;
        // Muestra el nombre del archivo y cambia el color a verde para que resalte
        textoArchivo.textContent = `Archivo seleccionado: ${nombre}`;
        textoArchivo.style.color = "#059669"; 
        textoArchivo.style.fontWeight = "bold";
    } else {
        textoArchivo.textContent = 'Ningún archivo seleccionado';
        textoArchivo.style.color = "#4b5563";
        textoArchivo.style.fontWeight = "normal";
    }
}

// Referencias a los botones y modales
document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // 1. Intercambio de Pestañas (Tabs)
    // ==========================================
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabs = document.querySelectorAll('.directory-tab');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabs.forEach(t => t.classList.remove('active'));

            btn.classList.add('active');
            const tabName = btn.getAttribute('data-tab');
            document.getElementById(tabName).classList.add('active');
        });
    });

    // ==========================================
    // 2. Control de Modales
    // ==========================================
    const espModal = document.getElementById('especialistaModal');
    const escModal = document.getElementById('escuelaModal');

    document.getElementById('btnAbrirEspecialista').addEventListener('click', () => {
        espModal.style.display = 'block';
    });

    document.getElementById('btnAbrirEscuela').addEventListener('click', () => {
        escModal.style.display = 'block';
    });

    document.getElementById('closeEsp').addEventListener('click', () => {
        espModal.style.display = 'none';
    });

    document.getElementById('closeEsc').addEventListener('click', () => {
        escModal.style.display = 'none';
    });

    // Cierra el modal si se hace clic fuera del contenido
    window.addEventListener('click', (event) => {
        if (event.target === espModal) espModal.style.display = 'none';
        if (event.target === escModal) escModal.style.display = 'none';
    });

    // ==========================================
    // 3. Envío del Formulario de Especialistas
    // ==========================================
    const formEspecialista = document.getElementById('formEspecialista');
    formEspecialista.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Obtenemos el nombre completo
        const nombreCompleto = document.getElementById('esp_nombre').value.trim();
        // Separamos el nombre (primera palabra) y los apellidos (siguientes)
        const partesNombre = nombreCompleto.split(' ');
        const nombre = partesNombre[0];
        const apellido_paterno = partesNombre[1] || '';
        const apellido_materno = partesNombre[2] || null;

        const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('apellido_paterno', apellido_paterno);
        formData.append('apellido_materno', apellido_materno);
        formData.append('especialidad', document.getElementById('esp_especialidad').value);
        formData.append('trastornos_experiencia', document.getElementById('esp_trastornos').value);
        formData.append('ubicacion_consultorio', document.getElementById('esp_ubicacion').value);
        formData.append('telefono', document.getElementById('esp_telefono').value);
        formData.append('correo_electronico', document.getElementById('esp_correo').value);
        formData.append('Descripcion', document.getElementById('esp_descripcion').value);

        try {
            // Cambiar el puerto o la URL según donde esté corriendo el backend de Python
            const response = await fetch('https://amiztlibackend.onrender.com/api/especialistas', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            if (response.ok) {
                alert('¡Especialista registrado con éxito!');
                formEspecialista.reset();
                espModal.style.display = 'none';
                // Opcional: Actualiza la lista en la página web llamando a obtener_especialistas()
            } else {
                alert('Error al registrar especialista: ' + (data.error || ''));
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error de conexión con el servidor.');
        }
    });

    // ==========================================
    // 4. Envío del Formulario de Instituciones
    // ==========================================
    const formEscuela = document.getElementById('formEscuela');
    formEscuela.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData();
        // En "direccion" unimos el Tipo de institución y la ubicación ingresada
        
        
        formData.append('nombre', document.getElementById('esc_nombre').value);
        formData.append('tipo', document.getElementById('esc_tipo').value);
        formData.append('trastornos_que_trata', document.getElementById('esc_servicios').value);
        formData.append('ubicacion', document.getElementById('esc_ubicacion').value);
        formData.append('telefono', document.getElementById('esc_telefono').value);
        formData.append('correo_electronico', document.getElementById('esc_correo').value);
        formData.append('Descripcion', document.getElementById('esc_descripcion').value);

        try {
            const response = await fetch('https://amiztlibackend.onrender.com/api/instituciones', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            if (response.ok) {
                alert('¡Institución registrada con éxito!');
                formEscuela.reset();
                escModal.style.display = 'none';
                // Opcional: Actualiza la lista de instituciones
            } else {
                alert('Error al registrar institución: ' + (data.error || ''));
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error de conexión con el servidor.');
        }
    });
});

// ==========================================
// 1. Obtener y mostrar Especialistas
// ==========================================
async function obtenerEspecialistas() {
    try {
        const response = await fetch('https://amiztlibackend.onrender.com/api/especialistas');
        if (!response.ok) throw new Error('Error al obtener los especialistas');

        const especialistas = await response.json();
        const grid = document.getElementById('grid-especialistas');
        
        // Limpiamos la cuadrícula antes de rellenarla
        grid.innerHTML = '';

        especialistas.forEach(esp => {
            const card = document.createElement('div');
            card.className = 'card';

            // Formateamos el nombre (Ej. Alonso, Beatriz)
            const nombreCompleto = `${esp.apellido_paterno || ''}, ${esp.nombre || ''}`;

            card.innerHTML = `
                <div class="card-icon">👨‍⚕️</div>
                <p class="card-title">${nombreCompleto}</p>
                <p class="card-sub">${esp.especialidad || 'Especialista'}</p>
                <span class="card-tag">${esp.trastornos_experiencia || 'Sin especificar'}</span>
                <p class="card-location">📍 ${esp.ubicacion_consultorio || 'Ubicación no disponible'}</p>
                <button class="btn-view" onclick="verDetallesEspecialista(${esp.id_directorio_especialistas})">Ver Detalles 🐾</button>
            `;
            
            grid.appendChild(card);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

// ==========================================
// 2. Obtener y mostrar Instituciones / Escuelas
// ==========================================
async function obtenerInstituciones() {
    try {
        const response = await fetch('https://amiztlibackend.onrender.com/api/instituciones');
        if (!response.ok) throw new Error('Error al obtener las instituciones');

        const instituciones = await response.json();
        const grid = document.getElementById('grid-escuelas');
        
        // Limpiamos la cuadrícula antes de rellenarla
        grid.innerHTML = '';

        instituciones.forEach(inst => {
            const card = document.createElement('div');
            card.className = 'card';

            card.innerHTML = `
                <div class="card-icon">🏫</div>
                <p class="card-title">${inst.nombre || 'Institución'}</p>
                <p class="card-sub">${inst.tipo || 'Sin especificacion'}</p>
                <span class="card-tag">${inst.telefono || 'Sin teléfono'}</span>
                <p class="card-location">📍 ${inst.ubicacion || 'Sin ubicación'}</p>
                <button class="btn-view" onclick="verDetallesInstitucion(${inst.id_institucion})">Más información 🐾</button>
            `;
            
            grid.appendChild(card);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

// ==========================================
// 3. Cargar datos al iniciar la página
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    obtenerEspecialistas();
    obtenerInstituciones();
});

// Funciones para los botones de "Ver Detalles" (puedes personalizarlas después)
function verDetallesEspecialista(id) {
    console.log('Ver detalles del especialista:', id);
    // Aquí puedes abrir un modal con la información completa o redirigir
}

function verDetallesInstitucion(id) {
    console.log('Ver detalles de la institución:', id);
    // Aquí puedes abrir un modal con la información completa o redirigir
}
