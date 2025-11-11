/**
 * Servidor Principal
 * Configura y ejecuta el servidor Express
 */

const express = require('express');
const cors = require('cors');
const path = require('path');
const routes = require('./routes');
const { errorHandler, notFound } = require('./middleware/errorHandler');
const { connectDB } = require('./config/database');

// Cargar variables de entorno
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, '..')));

// Conectar a MongoDB
connectDB();

// Rutas API
app.use('/api', routes);

// Ruta para servir el index.html (SPA)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// Middleware de manejo de errores (debe ir al final)
app.use(notFound);
app.use(errorHandler);

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    console.log(`📝 Entorno: ${process.env.NODE_ENV || 'development'}`);
});

// Manejo de cierre graceful
process.on('SIGTERM', async () => {
    console.log('SIGTERM recibido. Cerrando servidor...');
    await require('./config/database').disconnectDB();
    process.exit(0);
});
