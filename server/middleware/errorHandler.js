/**
 * Middleware de Manejo de Errores
 * Captura y maneja errores de forma centralizada
 */

exports.errorHandler = (err, req, res, next) => {
    console.error('Error:', err);

    // Error de validación de Mongoose
    if (err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map(e => e.message);
        return res.status(400).json({
            success: false,
            message: 'Error de validación',
            errors: messages
        });
    }

    // Error de MongoDB (duplicado)
    if (err.code === 11000) {
        return res.status(400).json({
            success: false,
            message: 'El registro ya existe'
        });
    }

    // Error de cast (ID inválido)
    if (err.name === 'CastError') {
        return res.status(400).json({
            success: false,
            message: 'ID inválido'
        });
    }

    // Error genérico
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Error interno del servidor',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
};

/**
 * Middleware para rutas no encontradas
 */
exports.notFound = (req, res, next) => {
    res.status(404).json({
        success: false,
        message: `Ruta no encontrada: ${req.originalUrl}`
    });
};

