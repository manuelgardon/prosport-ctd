const Reserva = require('../models/reserva.model')

// Obtener todas las reservas
const obtenerTodos = (req, res) => {
  Reserva.find()
    .then((reservas) => {
      res.json(reservas);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

// Obtener una reserva por su ID
const obtenerPorId = (req, res) => {
  Reserva.findById(req.params.id)
    .then((reserva) => {
      if (!reserva) {
        return res.status(404).json({ mensaje: 'Reserva no encontrada' });
      }
      res.json(reserva);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

// Crear una nueva reserva
const crear = (req, res) => {
  const datosReserva = req.body;
  const nuevaReserva = new Reserva(datosReserva);
  nuevaReserva.save()
    .then((reserva) => {
      res.status(201).json(reserva);
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
};

// Actualizar una reserva por su ID
const actualizar = (req, res) => {
  Reserva.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((reserva) => {
      if (!reserva) {
        return res.status(404).json({ mensaje: 'Reserva no encontrada' });
      }
      res.json(reserva);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

// Eliminar una reserva por su ID
const eliminar = (req, res) => {
  Reserva.findByIdAndDelete(req.params.id)
    .then((reserva) => {
      if (!reserva) {
        return res.status(404).json({ mensaje: 'Reserva no encontrada' });
      }
      res.json({ mensaje: 'Reserva eliminada' });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

module.exports = {
  obtenerTodos,
  obtenerPorId,
  crear,
  actualizar,
  eliminar
};
