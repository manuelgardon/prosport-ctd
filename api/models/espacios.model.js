const mongoose = require('mongoose');

const espacioSchema = new mongoose.Schema({
  propietario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  calificaciones:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Calificacion',
  }],
  calificacionesPromedio: {
    type: Number,
    default: 0
  },
  deporte: {
    type: String,
    required: true
  },
  nombre: {
    type: String,
    required: true
  },
  fotos: { type: [String], required: true },
  descripcion: { type: String, required: true },
  ciudad: {
    type: String,
    required: true
  },
  cantidadDeParticipantes: {
    type: Number,
    required: true
  },
  caracteristicas: {
    type: [String],
    required: true
  },
  diasDisponibles:{
    type: [Date],
      required: true
  },
  reservas: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reserva',
  }],
  precio:{type:Number, required:true}
});

const Espacio = mongoose.model('Espacio', espacioSchema);

module.exports = Espacio;
