/**
 * Módulo de Clientes
 * Maneja la funcionalidad del carrusel de clientes
 */

export function initClients() {
    const clientsTrack = document.querySelector('.clients-track');
    if (!clientsTrack) return;

    // Crear duplicados dinámicamente si es necesario para efecto infinito suave
    const clientLogos = clientsTrack.querySelectorAll('.client-logo');
    
    // Si hay menos de 6 logos, duplicar para efecto continuo
    if (clientLogos.length < 12) {
        const originalCount = clientLogos.length;
        clientLogos.forEach((logo, index) => {
            if (index < originalCount) {
                const clone = logo.cloneNode(true);
                clientsTrack.appendChild(clone);
            }
        });
    }

    // Pausar animación al pasar el mouse (ya manejado en CSS, pero podemos agregar funcionalidad extra)
    const clientsContainer = document.querySelector('.clients-container');
    if (clientsContainer) {
        clientsContainer.addEventListener('mouseenter', () => {
            clientsTrack.style.animationPlayState = 'paused';
        });

        clientsContainer.addEventListener('mouseleave', () => {
            clientsTrack.style.animationPlayState = 'running';
        });
    }

    // Lazy loading de imágenes
    initLazyLoading();
}

/**
 * Inicializa carga diferida de imágenes
 */
function initLazyLoading() {
    const images = document.querySelectorAll('.client-logo img');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => {
            if (img.dataset.src) {
                imageObserver.observe(img);
            }
        });
    }
}

