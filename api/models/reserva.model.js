const mongoose = require('mongoose');

const reservaSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  centroDeportivo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CentroDeportivo',
    required: true
  },
  fechaReserva: {
    type: Date,
    required: true
  }
});

const Reserva = mongoose.model('Reserva', reservaSchema);

module.exports = Reserva;
