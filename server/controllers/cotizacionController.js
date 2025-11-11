/**
 * Controlador de Cotizaciones
 * Maneja la lógica de negocio para las cotizaciones
 */

const Cotizacion = require('../models/Cotizacion');

/**
 * Crear una nueva cotización
 */
exports.createCotizacion = async (req, res) => {
    try {
        const {
            nombre,
            email,
            telefono,
            tipoProyecto,
            ubicacion,
            presupuesto,
            mensaje,
            aceptaTerminos
        } = req.body;

        // Validación básica
        if (!nombre || !email || !telefono || !tipoProyecto || !ubicacion || !mensaje) {
            return res.status(400).json({
                success: false,
                message: 'Todos los campos obligatorios deben ser completados'
            });
        }

        if (!aceptaTerminos) {
            return res.status(400).json({
                success: false,
                message: 'Debes aceptar los términos y condiciones'
            });
        }

        // Crear nueva cotización
        const nuevaCotizacion = new Cotizacion({
            nombre,
            email,
            telefono,
            tipoProyecto,
            ubicacion,
            presupuesto: presupuesto || 'No especificado',
            mensaje,
            aceptaTerminos,
            fecha: new Date()
        });

        await nuevaCotizacion.save();

        res.status(201).json({
            success: true,
            message: 'Cotización guardada exitosamente',
            data: nuevaCotizacion
        });

    } catch (error) {
        console.error('Error guardando cotización:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: error.message
        });
    }
};

/**
 * Obtener todas las cotizaciones
 */
exports.getAllCotizaciones = async (req, res) => {
    try {
        const cotizaciones = await Cotizacion.find().sort({ fecha: -1 });
        res.json({
            success: true,
            count: cotizaciones.length,
            data: cotizaciones
        });
    } catch (error) {
        console.error('Error obteniendo cotizaciones:', error);
        res.status(500).json({
            success: false,
            message: 'Error obteniendo cotizaciones',
            error: error.message
        });
    }
};

/**
 * Obtener una cotización por ID
 */
exports.getCotizacionById = async (req, res) => {
    try {
        const cotizacion = await Cotizacion.findById(req.params.id);
        
        if (!cotizacion) {
            return res.status(404).json({
                success: false,
                message: 'Cotización no encontrada'
            });
        }

        res.json({
            success: true,
            data: cotizacion
        });
    } catch (error) {
        console.error('Error obteniendo cotización:', error);
        res.status(500).json({
            success: false,
            message: 'Error obteniendo cotización',
            error: error.message
        });
    }
};

