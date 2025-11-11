const mongoose = require('mongoose');

const cotizacionSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'El email es obligatorio'],
        trim: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Por favor ingresa un email válido']
    },
    telefono: {
        type: String,
        required: [true, 'El teléfono es obligatorio'],
        trim: true
    },
    tipoProyecto: {
        type: String,
        required: [true, 'El tipo de proyecto es obligatorio'],
        enum: {
            values: ['construccion-civil', 'infraestructura', 'remodelacion', 'consultoria', 'otro'],
            message: 'Tipo de proyecto no válido'
        }
    },
    ubicacion: {
        type: String,
        required: [true, 'La ubicación es obligatoria'],
        trim: true
    },
    presupuesto: {
        type: String,
        enum: ['menos-50k', '50k-100k', '100k-500k', 'mas-500k', 'No especificado'],
        default: 'No especificado'
    },
    mensaje: {
        type: String,
        required: [true, 'El mensaje es obligatorio'],
        trim: true
    },
    aceptaTerminos: {
        type: Boolean,
        required: [true, 'Debes aceptar los términos y condiciones'],
        default: false
    },
    fecha: {
        type: Date,
        default: Date.now
    },
    estado: {
        type: String,
        enum: ['pendiente', 'en-revision', 'contactado', 'cerrado'],
        default: 'pendiente'
    },
    notas: {
        type: String,
        trim: true
    }
}, {
    timestamps: true // Añade createdAt y updatedAt automáticamente
});

// Índices para búsquedas eficientes
cotizacionSchema.index({ email: 1 });
cotizacionSchema.index({ fecha: -1 });
cotizacionSchema.index({ estado: 1 });

const Cotizacion = mongoose.model('Cotizacion', cotizacionSchema);

module.exports = Cotizacion;

