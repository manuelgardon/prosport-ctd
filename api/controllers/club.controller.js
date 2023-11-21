const ClubDeportivo = require('../models/club.model');

// Función para obtener todos los clubes deportivos
const obtenerTodos = (req, res) => {
  ClubDeportivo.find()
    .then((clubes) => {
      res.json(clubes);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

// Función para obtener un club deportivo por su ID
const obtenerPorId = (req, res) => {
  ClubDeportivo.findById(req.params.id)
    .then((club) => {
      if (!club) {
        return res.status(404).json({ mensaje: 'Club deportivo no encontrado' });
      }
      res.json(club);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

// Función para crear un nuevo club deportivo
const crear = (req, res) => {
  const datosClub = req.body;

  const { espacio, ...clubData } = datosClub;

  const nuevoClub = new ClubDeportivo({
    ...clubData,
    espacio: espacio
  });

  nuevoClub.save()
    .then((club) => {
      res.status(201).json(club);
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
};

// Función para actualizar un club deportivo por su ID
const actualizar = (req, res) => {
  ClubDeportivo.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((club) => {
      if (!club) {
        return res.status(404).json({ mensaje: 'Club deportivo no encontrado' });
      }
      res.json(club);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

// Función para eliminar un club deportivo por su ID
const eliminar = (req, res) => {
  ClubDeportivo.findByIdAndDelete(req.params.id)
    .then((club) => {
      if (!club) {
        return res.status(404).json({ mensaje: 'Club deportivo no encontrado' });
      }
      res.json({ mensaje: 'Club deportivo eliminado' });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

// Exporta las funciones del controlador
module.exports = {
  obtenerTodos,
  obtenerPorId,
  crear,
  actualizar,
  eliminar,
};
