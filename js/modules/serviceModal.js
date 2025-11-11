/**
 * Módulo Modal de Servicios
 * Maneja la apertura y cierre del modal con imágenes de servicios
 */

// Configuración de imágenes por servicio
const serviceImages = {
    'construccion-civil': [
        'img/servicios/construccion-civil-1.jpg',
        'img/servicios/construccion-civil-2.jpg',
        'img/servicios/construccion-civil-3.jpg',
        'img/servicios/construccion-civil-4.jpg'
    ],
    'infraestructura': [
        'img/servicios/infraestructura-1.jpg',
        'img/servicios/infraestructura-2.jpg',
        'img/servicios/infraestructura-3.jpg',
        'img/servicios/infraestructura-4.jpg'
    ],
    'remodelaciones': [
        'img/servicios/remodelaciones-1.jpg',
        'img/servicios/remodelaciones-2.jpg',
        'img/servicios/remodelaciones-3.jpg',
        'img/servicios/remodelaciones-4.jpg'
    ],
    'consultoria': [
        'img/servicios/consultoria-1.jpg',
        'img/servicios/consultoria-2.jpg',
        'img/servicios/consultoria-3.jpg',
        'img/servicios/consultoria-4.jpg'
    ]
};

// Títulos de servicios
const serviceTitles = {
    'construccion-civil': 'Construcción Civil',
    'infraestructura': 'Infraestructura',
    'remodelaciones': 'Remodelaciones',
    'consultoria': 'Consultoría'
};

export function initServiceModal() {
    const modal = document.getElementById('service-modal');
    const modalClose = document.getElementById('modal-close');
    const modalTitle = document.getElementById('modal-title');
    const modalGallery = document.getElementById('modal-gallery');
    const serviceCards = document.querySelectorAll('.service-card[data-service]');

    if (!modal || !serviceCards.length) return;

    let currentImageIndex = 0;
    let currentImages = [];

    /**
     * Abrir modal con imágenes del servicio
     */
    function openModal(serviceType) {
        const images = serviceImages[serviceType] || [];
        const title = serviceTitles[serviceType] || 'Servicio';

        currentImages = images;
        currentImageIndex = 0;

        // Establecer título
        modalTitle.textContent = title;

        // Limpiar y cargar imágenes
        modalGallery.innerHTML = '';

        if (images.length === 0) {
            modalGallery.innerHTML = `
                <div class="modal-carousel-container">
                    <div class="modal-gallery-placeholder">
                        <p>No hay imágenes disponibles para este servicio aún.</p>
                    </div>
                </div>
            `;
        } else {
            // Crear contenedor del carrusel
            const carouselContainer = document.createElement('div');
            carouselContainer.className = 'modal-carousel-container';
            
            const carouselTrack = document.createElement('div');
            carouselTrack.className = 'modal-carousel-track';
            carouselTrack.id = 'modal-carousel-track';

            // Crear items de imágenes
            images.forEach((imageSrc, index) => {
                const galleryItem = document.createElement('div');
                galleryItem.className = 'modal-gallery-item';
                
                const img = document.createElement('img');
                img.src = imageSrc;
                img.alt = `${title} - Imagen ${index + 1}`;
                img.loading = 'lazy';
                
                // Manejar error de carga
                img.onerror = function() {
                    this.parentElement.innerHTML = `
                        <div class="modal-gallery-placeholder">
                            <p>Imagen ${index + 1}</p>
                            <small>${title}</small>
                        </div>
                    `;
                };

                galleryItem.appendChild(img);
                carouselTrack.appendChild(galleryItem);
            });

            carouselContainer.appendChild(carouselTrack);

            // Botones de navegación
            if (images.length > 1) {
                const prevBtn = document.createElement('button');
                prevBtn.className = 'modal-carousel-nav modal-carousel-prev';
                prevBtn.id = 'modal-carousel-prev';
                prevBtn.innerHTML = `
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                `;
                prevBtn.addEventListener('click', () => prevImage());

                const nextBtn = document.createElement('button');
                nextBtn.className = 'modal-carousel-nav modal-carousel-next';
                nextBtn.id = 'modal-carousel-next';
                nextBtn.innerHTML = `
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                `;
                nextBtn.addEventListener('click', () => nextImage());

                carouselContainer.appendChild(prevBtn);
                carouselContainer.appendChild(nextBtn);

                // Indicadores
                const indicators = document.createElement('div');
                indicators.className = 'modal-carousel-indicators';
                indicators.id = 'modal-carousel-indicators';
                
                images.forEach((_, index) => {
                    const indicator = document.createElement('div');
                    indicator.className = 'modal-carousel-indicator';
                    if (index === 0) indicator.classList.add('active');
                    indicator.addEventListener('click', () => goToImage(index));
                    indicators.appendChild(indicator);
                });

                carouselContainer.appendChild(indicators);
            }

            modalGallery.appendChild(carouselContainer);
            updateCarousel();
        }

        // Mostrar modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    /**
     * Actualizar posición del carrusel
     */
    function updateCarousel() {
        const track = document.getElementById('modal-carousel-track');
        if (!track) return;

        const translateX = -currentImageIndex * 100;
        track.style.transform = `translateX(${translateX}%)`;
        
        updateModalButtons();
        updateModalIndicators();
    }

    /**
     * Actualizar estado de botones
     */
    function updateModalButtons() {
        const prevBtn = document.getElementById('modal-carousel-prev');
        const nextBtn = document.getElementById('modal-carousel-next');
        
        if (prevBtn) prevBtn.disabled = currentImageIndex === 0;
        if (nextBtn) nextBtn.disabled = currentImageIndex >= currentImages.length - 1;
    }

    /**
     * Actualizar indicadores
     */
    function updateModalIndicators() {
        const indicators = document.querySelectorAll('.modal-carousel-indicator');
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentImageIndex);
        });
    }

    /**
     * Ir a una imagen específica
     */
    function goToImage(index) {
        if (index >= 0 && index < currentImages.length) {
            currentImageIndex = index;
            updateCarousel();
        }
    }

    /**
     * Siguiente imagen
     */
    function nextImage() {
        if (currentImageIndex < currentImages.length - 1) {
            currentImageIndex++;
            updateCarousel();
        }
    }

    /**
     * Imagen anterior
     */
    function prevImage() {
        if (currentImageIndex > 0) {
            currentImageIndex--;
            updateCarousel();
        }
    }

    /**
     * Cerrar modal
     */
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restaurar scroll
    }

    // Event listeners para abrir modal
    serviceCards.forEach(card => {
        card.addEventListener('click', (e) => {
            const serviceType = card.getAttribute('data-service');
            if (serviceType) {
                openModal(serviceType);
            }
        });
    });

    // Cerrar al hacer clic en el botón de cerrar
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    // Cerrar al hacer clic en el overlay
    const modalOverlay = modal.querySelector('.modal-overlay');
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeModal);
    }

    // Cerrar con tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // Prevenir que el clic en el contenido cierre el modal
    const modalContent = modal.querySelector('.modal-content');
    if (modalContent) {
        modalContent.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }
}

