/**
 * Módulo Carrusel de Servicios
 * Maneja el deslizamiento de los servicios mostrando 3 a la vez
 */

export function initServicesCarousel() {
    const track = document.getElementById('services-track');
    const prevBtn = document.getElementById('services-prev');
    const nextBtn = document.getElementById('services-next');
    const indicatorsContainer = document.getElementById('services-indicators');

    if (!track || !prevBtn || !nextBtn) return;

    const cards = track.querySelectorAll('.service-card');
    if (cards.length === 0) return;

    let currentIndex = 0;
    let cardsPerView = getCardsPerView();

    // Calcular cards por vista según el ancho de pantalla
    function getCardsPerView() {
        if (window.innerWidth <= 768) return 1;
        if (window.innerWidth <= 1024) return 2;
        return 3;
    }

    // Calcular total de páginas
    function getTotalPages() {
        return Math.max(1, Math.ceil(cards.length / cardsPerView));
    }

    // Crear indicadores
    function createIndicators() {
        indicatorsContainer.innerHTML = '';
        const totalPages = getTotalPages();
        
        for (let i = 0; i < totalPages; i++) {
            const indicator = document.createElement('div');
            indicator.className = 'services-indicator';
            if (i === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => goToSlide(i));
            indicatorsContainer.appendChild(indicator);
        }
    }

    // Actualizar posición del carrusel
    function updateCarousel() {
        const cardWidth = cards[0].offsetWidth;
        const gap = 32; // 2rem en px
        const translateX = -(currentIndex * (cardWidth + gap));
        track.style.transform = `translateX(${translateX}px)`;
        
        updateIndicators();
    }

    // Actualizar indicadores
    function updateIndicators() {
        const indicators = indicatorsContainer.querySelectorAll('.services-indicator');
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    }

    // Ir a un slide específico
    function goToSlide(index) {
        const totalPages = getTotalPages();
        const normalizedIndex = ((index % totalPages) + totalPages) % totalPages;
        currentIndex = normalizedIndex;
        updateCarousel();
    }

    // Siguiente slide
    function nextSlide() {
        const totalPages = getTotalPages();
        currentIndex = (currentIndex + 1) % totalPages;
        updateCarousel();
    }

    // Slide anterior
    function prevSlide() {
        const totalPages = getTotalPages();
        currentIndex = (currentIndex - 1 + totalPages) % totalPages;
        updateCarousel();
    }

    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Recalcular en resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const newCardsPerView = getCardsPerView();
            if (newCardsPerView !== cardsPerView) {
                cardsPerView = newCardsPerView;
                currentIndex = currentIndex % getTotalPages();
                createIndicators();
                updateCarousel();
            } else {
                updateCarousel();
            }
        }, 250);
    });

    // Inicializar
    createIndicators();
    updateCarousel();

    // Auto-play opcional (comentado por defecto)
    // let autoPlayInterval;
    // function startAutoPlay() {
    //     autoPlayInterval = setInterval(() => {
    //         const maxIndex = Math.ceil(cards.length / cardsPerView) - 1;
    //         if (currentIndex < maxIndex) {
    //             nextSlide();
    //         } else {
    //             currentIndex = 0;
    //             updateCarousel();
    //         }
    //     }, 5000);
    // }
    // 
    // function stopAutoPlay() {
    //     if (autoPlayInterval) {
    //         clearInterval(autoPlayInterval);
    //     }
    // }
    // 
    // startAutoPlay();
    // 
    // const carouselWrapper = document.querySelector('.services-carousel-wrapper');
    // if (carouselWrapper) {
    //     carouselWrapper.addEventListener('mouseenter', stopAutoPlay);
    //     carouselWrapper.addEventListener('mouseleave', startAutoPlay);
    // }
}

