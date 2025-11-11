/**
 * Módulo Hero Slideshow
 * Maneja el carrusel automático de imágenes de fondo en el hero
 */

const SLIDE_INTERVAL = 5000; // 5 segundos entre cambios

export function initHeroSlideshow() {
    const slides = document.querySelectorAll('.hero-slide');
    const indicators = document.querySelectorAll('.hero-indicator');
    
    if (slides.length === 0) return;

    let currentSlide = 0;
    let slideInterval;

    /**
     * Cambia al slide especificado
     */
    function goToSlide(index) {
        // Remover active de todos los slides e indicadores
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));

        // Agregar active al slide e indicador actual
        if (slides[index]) {
            slides[index].classList.add('active');
        }
        if (indicators[index]) {
            indicators[index].classList.add('active');
        }

        currentSlide = index;
    }

    /**
     * Avanza al siguiente slide
     */
    function nextSlide() {
        const next = (currentSlide + 1) % slides.length;
        goToSlide(next);
    }

    /**
     * Inicia el carrusel automático
     */
    function startSlideshow() {
        slideInterval = setInterval(nextSlide, SLIDE_INTERVAL);
    }

    /**
     * Detiene el carrusel automático
     */
    function stopSlideshow() {
        if (slideInterval) {
            clearInterval(slideInterval);
        }
    }

    // Agregar event listeners a los indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            goToSlide(index);
            stopSlideshow();
            // Reiniciar después de 3 segundos
            setTimeout(startSlideshow, 3000);
        });
    });

    // Pausar al pasar el mouse sobre el hero
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.addEventListener('mouseenter', stopSlideshow);
        hero.addEventListener('mouseleave', startSlideshow);
    }

    // Iniciar el carrusel
    startSlideshow();

    // Preload de imágenes para mejor rendimiento
    preloadImages();
}

/**
 * Precarga las imágenes del slideshow
 */
function preloadImages() {
    const slides = document.querySelectorAll('.hero-slide');
    slides.forEach(slide => {
        const bgImage = slide.style.backgroundImage;
        if (bgImage) {
            const url = bgImage.match(/url\(['"]?([^'"]+)['"]?\)/);
            if (url && url[1]) {
                const img = new Image();
                img.src = url[1];
            }
        }
    });
}

