/**
 * Archivo principal - Inicializa todos los módulos
 */

import { initNavigation } from './modules/navigation.js';
import { initFormHandler } from './modules/formHandler.js';
import { initScrollAnimations, initAboutScrollAnimation } from './modules/animations.js';
import { initClients } from './modules/clients.js';
import { initBackToTop } from './modules/backToTop.js';
import { initHeroSlideshow } from './modules/heroSlideshow.js';
import { initServicesCarousel } from './modules/servicesCarousel.js';
import { initServiceModal } from './modules/serviceModal.js';
import { initProjectsSwiper } from './modules/projectsSwiper.js';
import { initNewProjectsShowcase } from './modules/newProjectsShowcase.js';

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initHeroSlideshow();
    initFormHandler();
    initScrollAnimations();
    initAboutScrollAnimation();
    initClients();
    initBackToTop();
    initServicesCarousel();
    initServiceModal();
    initProjectsSwiper();
    initNewProjectsShowcase();
});
