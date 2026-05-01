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

        // Cargar tema guardado
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

    // Cierre de ventanas modales haciendo clic afuera
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

    // Formulario de materiales
    const materialForm = document.getElementById('materialForm');
    if (materialForm) {
        materialForm.onsubmit = (e) => {
            e.preventDefault();
            alert("¡Material enviado con éxito! (Aquí conectarás tu lógica de Flask)");
            if (modalMaterials) modalMaterials.style.display = "none";
        };
    }

    // ==========================================
    // 9. Chat
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
    // 10. Foro y Publicaciones
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
});

// ==========================================
// 11. Funciones Globales
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