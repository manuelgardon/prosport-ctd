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

const obtenerPorUsuario = async (req, res) => {
  const usuarioData = req.usuarioData
  try {
    const reservas = await Reserva.find({ usuarioId: usuarioData.id }).populate('espacioId')
    if (!reservas) {
      res.status(404).json({ message: 'No hay reserva' })
    }
    res.json(reservas)
  }
  catch (error) {
    console.error('Error al obtener todas las reservas:', error)
    res.status(500).json({ message: 'Error al obtener detalles de la rererva' })
  }
}

// Crear una nueva reserva
// ... (código anterior)

const crear = async (req, res) => {
  const { espacioId, fechaReserva, horaInicio, horaFin, precio } = req.body;
  const usuarioData = req.usuarioData;

  try {
    // No es necesario convertir las fechas y horas a objetos Date en este punto

    const espacioNoDisponible = await Reserva.findOne({
      usuarioId: usuarioData.id,
      espacioId,
      fechaReserva,
      $or: [
        { horaInicio: { $lt: horaFin }, horaFin: { $gt: horaInicio } },
        { horaInicio: { $gte: horaInicio, $lt: horaFin } },
        { horaFin: { $lte: horaFin, $gt: horaInicio } },
      ],
      precio
    });

    if (espacioNoDisponible) {
      return res.status(400).json({ message: 'El espacio no está disponible en las fechas seleccionadas.' });
    }

    const reserva = await Reserva.create({
      usuarioId: usuarioData.id,
      espacioId,
      fechaReserva,
      horaInicio,
      horaFin,
      precio
    });

    res.status(200).json(reserva);
  } catch (error) {
    console.error('Error en la reserva:', error);
    res.status(500).json({ message: 'No se ha podido realizar la reserva' });
  }
};

// ... (código posterior)




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
  obtenerPorUsuario,
  crear,
  actualizar,
  eliminar
};
