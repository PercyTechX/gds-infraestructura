/**
 * Módulo Back to Top
 * Maneja el botón de volver arriba
 */

export function initBackToTop() {
    const backToTopButton = document.getElementById('back-to-top');
    if (!backToTopButton) return;

    // Mostrar/ocultar botón según scroll
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.style.display = 'flex';
            backToTopButton.style.opacity = '1';
        } else {
            backToTopButton.style.opacity = '0';
            setTimeout(() => {
                if (window.pageYOffset <= 300) {
                    backToTopButton.style.display = 'none';
                }
            }, 300);
        }
    });

    // Scroll suave al hacer clic
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Inicialmente oculto
    backToTopButton.style.display = 'none';
    backToTopButton.style.opacity = '0';
    backToTopButton.style.transition = 'opacity 0.3s';
}

