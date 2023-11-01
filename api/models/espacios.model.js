const mongoose = require('mongoose');

const espacioSchema = new mongoose.Schema({
  deporte: {
    type: String,
    required: true
  },
  nombre: {
    type: String,
    required: true
  },
  fotos: [String],
  cantidadDeParticipantes: {
    type: Number,
    required: true
  },
  diaSemana: {
    type: String,
    required: true
  },
  horaInicio: {
    type: String,
    required: true
  },
  horaFin: {
    type: String,
    required: true
  }

});

const Espacio = mongoose.model('Espacio', espacioSchema);

module.exports = Espacio;
