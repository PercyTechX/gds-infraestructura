/**
 * Módulo Carrusel de Proyectos con Swiper.js
 * Configura el carrusel de proyectos con efecto coverflow
 */

export function initProjectsSwiper() {
    const swiperContainer = document.querySelector('.projects-swiper');
    const swiperWrapper = swiperContainer ? swiperContainer.querySelector('.swiper-wrapper') : null;

    if (!swiperContainer || !swiperWrapper) {
        return;
    }

    let swiperInstance = null;
    let resizeTimeout;

    function enableSwiper() {
        if (swiperInstance) return;

        if (typeof Swiper === 'undefined') {
            console.error('Swiper.js no está cargado');
            swiperContainer.classList.add('projects-swiper--static');
            return;
        }

        const totalSlides = Math.max(swiperWrapper.children.length, 1);
        const middleIndex = Math.floor(totalSlides / 2);

        swiperContainer.classList.remove('projects-swiper--static');

        swiperInstance = new Swiper('.projects-swiper', {
            effect: 'coverflow',
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 'auto',
            coverflowEffect: {
                rotate: 20,
                stretch: 0,
                depth: 200,
                modifier: 1,
                slideShadows: true,
            },
            watchOverflow: true,
            watchSlidesProgress: true,
            preloadImages: false,
            updateOnWindowResize: true,
            lazy: {
                loadPrevNext: true,
                loadPrevNextAmount: 2,
            },
            loop: true,
            loopAdditionalSlides: totalSlides,
            loopedSlides: totalSlides,
            initialSlide: middleIndex,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                dynamicBullets: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                320: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                    coverflowEffect: {
                        rotate: 15,
                        depth: 150,
                    }
                },
                640: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                    coverflowEffect: {
                        rotate: 20,
                        depth: 180,
                    }
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 40,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 50,
                    coverflowEffect: {
                        rotate: 20,
                        depth: 200,
                    }
                },
            },
            speed: 400,
            keyboard: {
                enabled: false,
            },
            mousewheel: {
                enabled: false,
            },
            allowTouchMove: true,
            preventClicks: true,
            preventClicksPropagation: true,
            observer: true,
            observeParents: true,
            init: false,
            on: {
                afterInit(swiper) {
                    swiper.slideToLoop(middleIndex, 0, false);
                },
            },
        });

        swiperInstance.init();
    }

    function disableSwiper() {
        if (swiperInstance) {
            swiperInstance.destroy(true, true);
            swiperInstance = null;
        }

        swiperContainer.classList.add('projects-swiper--static');
    }

    function handleMode() {
        if (window.innerWidth <= 768) {
            disableSwiper();
        } else {
            enableSwiper();
        }
    }

    handleMode();

    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(handleMode, 200);
    });
}

