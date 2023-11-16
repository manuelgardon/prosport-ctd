const mongoose = require('mongoose');

const espacioSchema = new mongoose.Schema({
  propietario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
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
  cantidadDeParticipantes: {
    type: Number,
    required: true
  },
  caracteristicas: {
    type: [String],
    required: true
  },
  horaInicio: {
    type: String,
    required: true
  },
  horaFin: {
    type: String,
    required: true
  },
  descripcion: {
    type: String,
    required: true
  },
  precio:{type:Number, required:true}
});

const Espacio = mongoose.model('Espacio', espacioSchema);

module.exports = Espacio;
