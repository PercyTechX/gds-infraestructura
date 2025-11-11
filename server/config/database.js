/**
 * Configuración de Base de Datos
 * Maneja la conexión a MongoDB
 */

const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/gds-infraestructura';

/**
 * Conectar a MongoDB
 */
exports.connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('✅ Conectado a MongoDB');
        return mongoose.connection;
    } catch (error) {
        console.error('❌ Error conectando a MongoDB:', error);
        process.exit(1);
    }
};

/**
 * Desconectar de MongoDB
 */
exports.disconnectDB = async () => {
    try {
        await mongoose.connection.close();
        console.log('✅ Desconectado de MongoDB');
    } catch (error) {
        console.error('❌ Error desconectando de MongoDB:', error);
    }
};

