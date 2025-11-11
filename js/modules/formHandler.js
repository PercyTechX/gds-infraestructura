/**
 * Módulo de Manejo de Formularios
 * Gestiona el envío y validación del formulario de cotización
 */

const API_URL = '/api/cotizaciones';

export function initFormHandler() {
    const cotizacionForm = document.getElementById('cotizacion-form');
    const formMessage = document.getElementById('form-message');

    if (!cotizacionForm) return;

    cotizacionForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const formData = new FormData(cotizacionForm);
        const data = {
            nombre: formData.get('nombre'),
            email: formData.get('email'),
            telefono: formData.get('telefono'),
            tipoProyecto: formData.get('tipoProyecto'),
            ubicacion: formData.get('ubicacion'),
            presupuesto: formData.get('presupuesto'),
            mensaje: formData.get('mensaje'),
            aceptaTerminos: formData.get('aceptaTerminos') === 'on',
            fecha: new Date().toISOString()
        };

        // Validación
        const validation = validateForm(data);
        if (!validation.isValid) {
            showMessage(formMessage, validation.message, 'error');
            return;
        }

        // Enviar formulario
        await submitForm(cotizacionForm, formMessage, data);
    });
}

function validateForm(data) {
    if (!data.nombre || !data.email || !data.telefono || !data.tipoProyecto || !data.ubicacion || !data.mensaje) {
        return {
            isValid: false,
            message: 'Por favor, completa todos los campos obligatorios.'
        };
    }

    if (!data.aceptaTerminos) {
        return {
            isValid: false,
            message: 'Debes aceptar los términos y condiciones.'
        };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        return {
            isValid: false,
            message: 'Por favor, ingresa un correo electrónico válido.'
        };
    }

    return { isValid: true };
}

async function submitForm(form, messageElement, data) {
    const submitBtn = form.querySelector('.btn-submit');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok) {
            showMessage(messageElement, '¡Gracias! Tu solicitud de cotización ha sido enviada. Nos pondremos en contacto contigo pronto.', 'success');
            form.reset();
        } else {
            showMessage(messageElement, result.message || 'Hubo un error al enviar tu solicitud. Por favor, intenta nuevamente.', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showMessage(messageElement, 'Error de conexión. Por favor, verifica tu conexión a internet e intenta nuevamente.', 'error');
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
}

function showMessage(element, message, type) {
    if (!element) return;
    
    element.textContent = message;
    element.className = `form-message ${type}`;
    element.style.display = 'block';

    // Scroll al mensaje
    element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    // Ocultar mensaje después de 5 segundos si es éxito
    if (type === 'success') {
        setTimeout(() => {
            element.style.display = 'none';
        }, 5000);
    }
}

