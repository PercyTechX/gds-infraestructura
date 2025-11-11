/**
 * Rutas Principales
 * Agrupa todas las rutas de la aplicación
 */

const express = require('express');
const router = express.Router();
const cotizacionesRoutes = require('./cotizaciones');

// Health check
router.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'Servidor funcionando correctamente',
        timestamp: new Date().toISOString()
    });
});

// Rutas de cotizaciones
router.use('/cotizaciones', cotizacionesRoutes);

module.exports = router;

