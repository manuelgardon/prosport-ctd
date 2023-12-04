const mongoose = require('mongoose')

const calificacionSchema = new mongoose.Schema({
    calificacion: {
        type: Number,
        required: true
    },
    mensaje: {
        type: String,
    },
    usuarioId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Usuario',
        required: true
    },
    espacioId : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Espacio'
    },
    fecha: {
        type: Date,
        default: Date.now,
    }
})

const Calificacion = mongoose.model('Calificacion', calificacionSchema)

module.exports = Calificacion