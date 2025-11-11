/**
 * Módulo de Animaciones
 * Maneja las animaciones al hacer scroll
 */

export function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar elementos para animación
    document.querySelectorAll('.about-card, .service-card, .project-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

/**
 * Animación de scroll para la sección "Sobre Nosotros"
 */
export function initAboutScrollAnimation() {
    const aboutSection = document.getElementById('nosotros');
    if (!aboutSection) return;

    const aboutImage = aboutSection.querySelector('.about-image');
    const aboutContent = aboutSection.querySelector('.about-content');
    
    if (!aboutImage || !aboutContent) return;

    // Crear Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Agregar clase 'animate' cuando la sección es visible
                aboutImage.classList.add('animate');
                aboutContent.classList.add('animate');
                
                // Desconectar el observer después de la animación para evitar re-animaciones
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2, // Se activa cuando el 20% de la sección es visible
        rootMargin: '0px 0px -50px 0px' // Trigger un poco antes de que entre completamente
    });

    // Observar la sección
    observer.observe(aboutSection);
}

