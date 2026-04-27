document.addEventListener('DOMContentLoaded', () => {
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

    // --- LÓGICA DE PESTAÑAS ---
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

            // Cambiar textos
            if (sectionData[tabId]) {
                pageTitle.textContent = sectionData[tabId].title;
                pageSubtitle.textContent = sectionData[tabId].subtitle;
            }
        });
    });

    // --- LÓGICA DEL CARRUSEL (Misión/Visión/Valores) ---
    const track = document.getElementById('carouselTrack');
    const slides = document.querySelectorAll('.carousel-slide');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    
    let index = 0;

    function moveCarousel() {
        if (index >= slides.length) index = 0;
        if (index < 0) index = slides.length - 1;
        track.style.transform = `translateX(-${index * 100}%)`;
    }

    nextBtn.addEventListener('click', () => {
        index++;
        moveCarousel();
    });

    prevBtn.addEventListener('click', () => {
        index--;
        moveCarousel();
    });

    // --- FECHA ACTUAL ---
    function updateDate() {
        const dateElement = document.getElementById('currentDate');
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        dateElement.textContent = new Date().toLocaleDateString('es-ES', options);
    }
    updateDate();

    const btnMenu = document.getElementById('btn-menu');
    const sidebar = document.querySelector('.sidebar');

    btnMenu.addEventListener('click', () => {
        sidebar.classList.toggle('active'); // Esto "prende y apaga" la visibilidad
    });


});

/* ==========================================
   LÓGICA DE CONFIGURACIÓN Y TEMAS
   ========================================== */

const themeSelector = document.getElementById('themeSelector');
        const body = document.body;

        // Función para cambiar el tema
        themeSelector.addEventListener('change', function() {
            const selectedTheme = this.value;
            
            // Limpiar clases previas
            body.classList.remove('dark-mode', 'high-contrast');

            if (selectedTheme === 'dark') {
                body.classList.add('dark-mode');
            } else if (selectedTheme === 'high-contrast') {
                body.classList.add('high-contrast');
            }
        });

        // Función para simular guardado y persistencia
        function saveConfig() {
            const currentTheme = themeSelector.value;
            localStorage.setItem('amiztli-theme', currentTheme);
            alert('Configuración guardada 🐾 - El tema se aplicará en tu próxima sesión.');
        }

        function logout() {
              window.location.href = "log_in.html";
          }


        // Cargar tema guardado al iniciar
        window.onload = () => {
            const savedTheme = localStorage.getItem('amiztli-theme');
            if (savedTheme) {
                themeSelector.value = savedTheme;
                themeSelector.dispatchEvent(new Event('change'));
            }
        };

/* ==========================================
   LÓGICA DE SUBIR IMAGEN DE PERFIL
   ========================================== */


         const fileInput = document.getElementById('fileInput');
        const profileImage = document.getElementById('profileImage');

        fileInput.addEventListener('change', function() {
            const file = this.files[0];
            if (file) {
                // Crea una URL temporal para la imagen seleccionada
                const reader = new FileReader();
                reader.onload = function(e) {
                    profileImage.setAttribute('src', e.target.result);
                }
                reader.readAsDataURL(file);
            }
        });

/* ==========================================
   LÓGICA DE DIRECTORIO Y BUSCADOR
   ========================================== */


       document.addEventListener('DOMContentLoaded', () => {
    // 1. PESTAÑAS PRINCIPALES (Sidebar)
    const navItems = document.querySelectorAll('.nav-item');
    const tabContents = document.querySelectorAll('.tab-content');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const tabId = item.getAttribute('data-tab');
            navItems.forEach(nav => nav.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            item.classList.add('active');
            const target = document.getElementById(`${tabId}-content`);
            if (target) target.classList.add('active');
        });
    });

    // 2. SUB-PESTAÑAS DEL DIRECTORIO (Especialistas / Escuelas)
    const subTabs = document.querySelectorAll('.tab-btn');
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

    // 3. BUSCADOR FILTRADO
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
});

// Función de Ordenar (Fuera del DOMContentLoaded para que sea global)
function sortAlphabetically(gridId) {
    const grid = document.getElementById(gridId);
    if (!grid) return;
    const cards = Array.from(grid.getElementsByClassName('card'));
    cards.sort((a, b) => {
        const titleA = a.querySelector('.card-title').innerText;
        const titleB = b.querySelector('.card-title').innerText;
        return titleA.localeCompare(titleB);
    });
    cards.forEach(card => grid.appendChild(card));
}

// Función Logout
function logout() {
    window.location.href = "log_in.html";
}

/* ==========================================
   LÓGICA DE BUSQUEDA EN MATERIALES
   ========================================== */

document.getElementById('searchInput').addEventListener('keyup', function() {
            const searchTerm = this.value.toLowerCase();
            const cards = document.querySelectorAll('.material-card');
            const noResults = document.getElementById('noResults');
            let hasVisibleCards = false;

            cards.forEach(card => {
                const title = card.getAttribute('data-title');
                const tag = card.getAttribute('data-tag');

                if (title.includes(searchTerm) || tag.includes(searchTerm)) {
                    card.style.display = 'flex';
                    hasVisibleCards = true;
                } else {
                    card.style.display = 'none';
                }
            });

            noResults.style.display = hasVisibleCards ? 'none' : 'block';
        });

/* ==========================================
   LÓGICA DE CHAT SIMULADO
   ========================================== */

 const chatForm = document.getElementById('chatForm');
        const chatBox = document.getElementById('chatBox');
        const msgInput = document.getElementById('msgInput');

        chatForm.onsubmit = (e) => {
            e.preventDefault();
            if(msgInput.value.trim() === "") return;

            // Crear burbuja de enviado
            const bubble = document.createElement('div');
            bubble.className = 'bubble sent';
            bubble.innerText = msgInput.value;
            
            chatBox.appendChild(bubble);
            
            // Scroll automático al final
            chatBox.scrollTop = chatBox.scrollHeight;
            
            msgInput.value = "";
        };

/* ==========================================
   LÓGICA DE PUBLICACIÓN EN FORO
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal-post');
    const btnOpen = document.querySelector('.btn-post');
    const btnClose = document.querySelector('.close-modal');
    const btnPublish = document.getElementById('btn-publish-final');
    const forumContainer = document.querySelector('.forum-container');
    
    // --- NUEVO: Selección del input de búsqueda ---
    const searchInput = document.querySelector('.search-forum');

    // Abrir modal
    btnOpen.onclick = () => modal.style.display = "block";

    // Cerrar modal
    btnClose.onclick = () => modal.style.display = "none";
    window.onclick = (event) => { if (event.target == modal) modal.style.display = "none"; }

    // Función para publicar
    btnPublish.onclick = () => {
        const title = document.getElementById('post-title-input').value;
        const content = document.getElementById('post-content-input').value;

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

            document.querySelector('.forum-header').after(newCard);

            document.getElementById('post-title-input').value = "";
            document.getElementById('post-content-input').value = "";
            modal.style.display = "none";
        } else {
            alert("¡Escribe algo primero, Karla! ");
        }
    };

    // --- NUEVO: Lógica del Buscador ---
    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase(); // Lo que el usuario escribe
        const allPosts = document.querySelectorAll('.post-card'); // Todas las publicaciones

        allPosts.forEach(post => {
            // Obtenemos el texto del título y el contenido de esta card específica
            const titleText = post.querySelector('.post-title').innerText.toLowerCase();
            const contentText = post.querySelector('.post-content').innerText.toLowerCase();

            // Si el término de búsqueda está en el título o en el contenido...
            if (titleText.includes(term) || contentText.includes(term)) {
                post.style.display = "block"; // Se muestra
                post.style.animation = "fadeIn 0.3s"; // Opcional: un efecto suave
            } else {
                post.style.display = "none"; // Se oculta
            }
        });
    });
});

/* ==========================================
   LÓGICA AVANZADA DE NOTAS AMIZTLI 🐾
   ========================================== */

// 1. Simulación de Base de Datos por hijo
const notasPorHijo = {
    "1": [ // Notas de Juanito
        { fecha: "18 DE ABRIL, 2026", titulo: "Logros en casa hoy", contenido: "Juanito logró vestirse solo.", modo: "compartido" },
        { fecha: "16 DE ABRIL, 2026", titulo: "Sentimientos sobre terapia", contenido: "Se sintió un poco cansado.", modo: "personal" }
    ],
    "2": [ // Notas de María
        { fecha: "20 DE ABRIL, 2026", titulo: "Primera palabra", contenido: "María dijo 'Amiztli' hoy.", modo: "personal" }
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    const childSelector = document.getElementById('childSelector');
    const notesList = document.getElementById('notesList');
    const editorTitle = document.querySelector('.editor-title');
    const editorBody = document.getElementById('editorBody');
    const btnNewNote = document.querySelector('.btn-new-note');

    // --- FUNCIÓN: Renderizar lista de notas según el hijo ---
    function renderNotes(childId) {
        notesList.innerHTML = ""; // Limpiamos la lateral
        const notas = notasPorHijo[childId] || [];

        notas.forEach((nota, index) => {
            const div = document.createElement('div');
            div.className = 'note-item';
            div.innerHTML = `
                <p class="date">${nota.fecha}</p>
                <p class="title">${nota.titulo}</p>
            `;
            div.onclick = () => loadNote(nota);
            notesList.appendChild(div);
        });
        
        // Limpiar editor al cambiar de hijo
        editorTitle.value = "";
        editorBody.value = "";
        editorBody.readOnly = false;
    }

    // --- FUNCIÓN: Cargar nota en el editor y bloquear si es compartida ---
    function loadNote(nota) {
        editorTitle.value = nota.titulo;
        editorBody.value = nota.contenido;
        
        const badge = document.getElementById('badge');

        if (nota.modo === 'compartido') {
            editorBody.readOnly = true; // BLOQUEO DE EDICIÓN
            editorBody.style.opacity = "0.7";
            badge.innerText = "👥 Observación del Especialista (Solo lectura)";
            badge.style.background = "#fff8e7";
            document.querySelector('.btn-save').style.display = "none"; // Escondemos guardar
        } else {
            editorBody.readOnly = false; // PERMITIR EDICIÓN
            editorBody.style.opacity = "1";
            badge.innerText = "🔒 Solo para mí (Privado)";
            badge.style.background = "#e2e8f0";
            document.querySelector('.btn-save').style.display = "block";
        }
    }

    // --- EVENTO: Cambiar de hijo ---
    childSelector.addEventListener('change', (e) => {
        renderNotes(e.target.value);
    });

    // --- EVENTO: Nueva Nota ---
    btnNewNote.onclick = () => {
        const selectedChild = childSelector.value;
        const nuevaNota = {
            fecha: "HOY",
            titulo: "Nueva Nota",
            contenido: "",
            modo: "personal"
        };
        
        // Agregar a nuestra "DB"
        notasPorHijo[selectedChild].unshift(nuevaNota);
        renderNotes(selectedChild); // Refrescar lateral
        loadNote(nuevaNota); // Cargar en editor
        editorTitle.focus();
    };

    // Inicializar con el primer hijo
    renderNotes("1");
});

/* ==========================================
   LÓGICA UNIFICADA DE NOTAS AMIZTLI 🐾
   ========================================== */

const notasPorHijo = {
    "1": [ // Juanito
        { fecha: "18 ABR", titulo: "Logros en casa hoy", contenido: "Juanito logró vestirse solo.", modo: "compartido" },
        { fecha: "16 ABR", titulo: "Sentimientos sobre terapia", contenido: "Se sintió un poco cansado.", modo: "personal" }
    ],
    "2": [ // María
        { fecha: "20 ABR", titulo: "Primera palabra", contenido: "María dijo 'Amiztli' hoy.", modo: "personal" }
    ]
};

// Variable para saber qué filtro está activo (personal o compartido)
let filtroActual = 'personal'; 

document.addEventListener('DOMContentLoaded', () => {
    const childSelector = document.getElementById('childSelector');
    const notesList = document.getElementById('notesList');
    const editorTitle = document.querySelector('.editor-title');
    const editorBody = document.getElementById('editorBody');
    const btnNewNote = document.querySelector('.btn-new-note');
    const btnSave = document.querySelector('.btn-save');
    const btnDelete = document.querySelector('.btn-delete');
    const badge = document.getElementById('badge');

    // --- FUNCIÓN: RENDERIZAR (FILTRADO POR HIJO Y POR MODO) ---
    function renderNotes() {
        const childId = childSelector.value;
        notesList.innerHTML = ""; 
        
        // Obtenemos notas del hijo y filtramos por el modo activo (Personal/Compartido)
        const notasFiltradas = (notasPorHijo[childId] || []).filter(n => n.modo === filtroActual);

        notasFiltradas.forEach((nota) => {
            const div = document.createElement('div');
            div.className = 'note-item';
            div.innerHTML = `
                <p class="date">${nota.fecha}</p>
                <p class="title">${nota.titulo}</p>
            `;
            div.onclick = () => {
                // Quitar clase activa a otros y poner a este
                document.querySelectorAll('.note-item').forEach(i => i.classList.remove('active'));
                div.classList.add('active');
                loadNote(nota);
            };
            notesList.appendChild(div);
        });
    }

    // --- FUNCIÓN: CARGAR EN EDITOR ---
    function loadNote(nota) {
        editorTitle.value = nota.titulo;
        editorBody.value = nota.contenido;

        if (nota.modo === 'compartido') {
            editorBody.readOnly = true;
            editorBody.style.opacity = "0.7";
            badge.innerText = "👥 Observación del Especialista (Lectura)";
            btnSave.style.display = "none"; 
            btnDelete.style.display = "none"; // El padre no borra lo del maestro
        } else {
            editorBody.readOnly = false;
            editorBody.style.opacity = "1";
            badge.innerText = "🔒 Solo para mí (Privado)";
            btnSave.style.display = "block";
            btnDelete.style.display = "block";
        }
    }

    // --- CAMBIO DE HIJO ---
    childSelector.onchange = () => {
        limpiarEditor();
        renderNotes();
    };

    // --- CAMBIO DE MODO (PRIVADO / COMPARTIDO) ---
    window.setMode = (mode) => {
        filtroActual = mode;
        // Cambiar clases visuales de los botones
        document.getElementById('btnPersonal').classList.toggle('active', mode === 'personal');
        document.getElementById('btnCompartido').classList.toggle('active', mode === 'compartido');
        
        limpiarEditor();
        renderNotes();
    };

    // --- GUARDAR CAMBIOS ---
    btnSave.onclick = () => {
        const childId = childSelector.value;
        const activeNote = document.querySelector('.note-item.active');
        
        if (editorTitle.value.trim() === "") return alert("¡Ponle un título! 🐾");

        if (activeNote) {
            // Buscamos la nota en el array original para actualizarla
            const tituloViejo = activeNote.querySelector('.title').innerText;
            const notaOriginal = notasPorHijo[childId].find(n => n.titulo === tituloViejo);
            
            if (notaOriginal) {
                notaOriginal.titulo = editorTitle.value;
                notaOriginal.contenido = editorBody.value;
            }
        } else {
            // Es una nota nueva
            const nueva = {
                fecha: new Date().toLocaleDateString('es-MX', { day:'numeric', month:'short' }).toUpperCase(),
                titulo: editorTitle.value,
                contenido: editorBody.value,
                modo: 'personal'
            };
            notasPorHijo[childId].unshift(nueva);
        }

        alert("¡Guardado! ✨");
        renderNotes();
    };

    // --- ELIMINAR ---
    btnDelete.onclick = () => {
        const activeNote = document.querySelector('.note-item.active');
        if (!activeNote) return alert("Selecciona una nota");

        if (confirm("¿Borrar esta nota, Karla?")) {
            const childId = childSelector.value;
            const titulo = activeNote.querySelector('.title').innerText;
            
            // Filtramos el array para quitar esa nota
            notasPorHijo[childId] = notasPorHijo[childId].filter(n => n.titulo !== titulo);
            
            limpiarEditor();
            renderNotes();
        }
    };

    // --- NUEVA NOTA ---
    btnNewNote.onclick = () => {
        if (filtroActual === 'compartido') {
            alert("Las notas compartidas solo las genera el especialista. Cambia a 'Mío' para escribir. 🐾");
            return;
        }
        limpiarEditor();
        editorTitle.focus();
    };

    function limpiarEditor() {
        editorTitle.value = "";
        editorBody.value = "";
        editorBody.readOnly = false;
        editorBody.style.opacity = "1";
        document.querySelectorAll('.note-item').forEach(i => i.classList.remove('active'));
    }

    // Arrancar con Juanito
    renderNotes();
});