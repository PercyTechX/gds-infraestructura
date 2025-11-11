/**
 * Módulo de Utilidades
 * Funciones auxiliares reutilizables
 */

/**
 * Formatea una fecha a formato legible
 */
export function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('es-ES', options);
}

/**
 * Valida un email
 */
export function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Muestra u oculta un elemento
 */
export function toggleElement(element, show) {
    if (!element) return;
    element.style.display = show ? 'block' : 'none';
}

/**
 * Debounce function para optimizar eventos
 */
export function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

