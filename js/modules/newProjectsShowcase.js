/**
 * Módulo para la sección "Nuestros Proyectos 02"
 * Controla el carrusel de miniaturas y la imagen destacada
 */

export function initNewProjectsShowcase() {
    const section = document.querySelector('.new-projects');

    if (!section) {
        return;
    }

    const mainImage = section.querySelector('[data-new-project-image]');
    const mainFigure = section.querySelector('.new-projects__main');
    const projectName = section.querySelector('[data-new-project-name]');
    const projectDescription = section.querySelector('[data-new-project-description]');
    const thumbsContainer = section.querySelector('[data-new-projects-thumbs]');
    const thumbs = Array.from(section.querySelectorAll('[data-new-project-thumb]'));
    const prevButton = section.querySelector('[data-new-project-prev]');
    const nextButton = section.querySelector('[data-new-project-next]');

    if (!mainImage || !projectName || !projectDescription || thumbs.length === 0) {
        return;
    }

    function revealSection() {
        section.classList.add('is-visible');
    }

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    revealSection();
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.25,
            rootMargin: '0px 0px -60px 0px',
        }
    );

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        revealSection();
        revealObserver.disconnect();
    } else {
        revealObserver.observe(section);

        if (section.getBoundingClientRect().top <= window.innerHeight * 0.8) {
            revealSection();
            revealObserver.unobserve(section);
        }
    }

    function setPlaceholderState(active) {
        if (!mainFigure) return;
        mainFigure.classList.toggle('new-projects__main--placeholder', Boolean(active));
    }

    function updateMainProject(targetThumb, { scrollIntoView = true } = {}) {
        if (!targetThumb) return;

        const { image, title, description, alt } = targetThumb.dataset;

        if (image) {
            mainImage.src = image;
        }

        mainImage.alt = alt || title || 'Proyecto de GDS Infraestructura';
        projectName.textContent = title || 'Proyecto destacado';
        projectDescription.textContent = description || 'Estamos preparando más información sobre este proyecto.';

        thumbs.forEach((thumb) => {
            const isActive = thumb === targetThumb;
            thumb.classList.toggle('is-active', isActive);
            thumb.setAttribute('aria-pressed', String(isActive));
            thumb.setAttribute('tabindex', isActive ? '0' : '-1');
        });

        if (scrollIntoView) {
            requestAnimationFrame(() => {
                targetThumb.scrollIntoView({
                    behavior: 'smooth',
                    inline: 'center',
                    block: 'nearest',
                });
            });
        }
    }

    function cycleProject(step) {
        if (thumbs.length === 0) return;

        const currentIndex = Math.max(0, thumbs.findIndex((thumb) => thumb.classList.contains('is-active')));
        const nextIndex = (currentIndex + step + thumbs.length) % thumbs.length;

        updateMainProject(thumbs[nextIndex]);
    }

    thumbs.forEach((thumb, index) => {
        thumb.setAttribute('role', 'tab');
        thumb.setAttribute('aria-pressed', thumb.classList.contains('is-active') ? 'true' : 'false');
        thumb.setAttribute('tabindex', thumb.classList.contains('is-active') ? '0' : '-1');
        thumb.dataset.index = String(index);

        thumb.addEventListener('click', () => {
            updateMainProject(thumb);
        });

        thumb.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                updateMainProject(thumb);
            }

            if (event.key === 'ArrowRight') {
                event.preventDefault();
                cycleProject(1);
            }

            if (event.key === 'ArrowLeft') {
                event.preventDefault();
                cycleProject(-1);
            }
        });

        const thumbImage = thumb.querySelector('img');

        if (thumbImage) {
            thumbImage.addEventListener('error', () => {
                thumb.classList.add('is-placeholder');
            });

            thumbImage.addEventListener('load', () => {
                thumb.classList.remove('is-placeholder');
            });
        }
    });

    prevButton?.addEventListener('click', () => {
        cycleProject(-1);
    });

    nextButton?.addEventListener('click', () => {
        cycleProject(1);
    });

    thumbsContainer?.setAttribute('role', 'tablist');
    thumbsContainer?.addEventListener('keydown', (event) => {
        if (event.key === 'Home') {
            event.preventDefault();
            updateMainProject(thumbs[0]);
        }

        if (event.key === 'End') {
            event.preventDefault();
            updateMainProject(thumbs[thumbs.length - 1]);
        }
    });

    mainImage.addEventListener('error', () => {
        setPlaceholderState(true);
    });

    mainImage.addEventListener('load', () => {
        setPlaceholderState(false);
    });

    const initialThumb = thumbs.find((thumb) => thumb.classList.contains('is-active')) || thumbs[0];
    updateMainProject(initialThumb, { scrollIntoView: false });
}


