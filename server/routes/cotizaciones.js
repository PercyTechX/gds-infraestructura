/**
 * Rutas de Cotizaciones
 * Define las rutas relacionadas con cotizaciones
 */

const express = require('express');
const router = express.Router();
const cotizacionController = require('../controllers/cotizacionController');

// POST /api/cotizaciones - Crear nueva cotización
router.post('/', cotizacionController.createCotizacion);

// GET /api/cotizaciones - Obtener todas las cotizaciones
router.get('/', cotizacionController.getAllCotizaciones);

// GET /api/cotizaciones/:id - Obtener cotización por ID
router.get('/:id', cotizacionController.getCotizacionById);

module.exports = router;

