const mongoose = require('mongoose');

const clubDeportivoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  encargado: {
    type: String,
    required: true
  },
  domicilio: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  telefono: {
    type: String,
    required: true
  },
  contrasenia: {
    type: String,
    required: true
  },
  cuil: {
    type: String,
    required: true    
  },
  espacio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Espacio',
    required: true
  }
});

const ClubDeportivo = mongoose.model('ClubDeportivo', clubDeportivoSchema);

module.exports = ClubDeportivo;
