const mongoose = require('mongoose');

const reservaSchema = new mongoose.Schema({
  usuarioId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Usuario'
  },
  espacioId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Espacio'
  },
  fechaReserva: { type: Date, required: true },
  horaInicio: { type: String, required: true },
  horaFin: { type: String, required: true },
  precio: {type: Number, required: true}
});

const Reserva = mongoose.model('Reserva', reservaSchema);

module.exports = Reserva;