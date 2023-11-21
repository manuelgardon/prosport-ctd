const Usuario = require('../models/usuario.model');

// Obtener todos los usuarios
const obtenerTodos = (req, res) => {
  Usuario.find()
    .then((usuarios) => {
      res.json(usuarios);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

// Obtener un usuario por su ID
const obtenerPorId = (req, res) => {
  Usuario.findById(req.params.id)
    .then((usuario) => {
      if (!usuario) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado' });
      }
      res.json(usuario);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

// Crear un nuevo usuario
const crear = (req, res) => {
  const datosUsuario = req.body;
  const nuevoUsuario = new Usuario(datosUsuario);
  nuevoUsuario.save()
    .then((usuario) => {
      res.status(201).json(usuario);
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
};

// Actualizar un usuario por su ID
const actualizar = (req, res) => {
  Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((usuario) => {
      if (!usuario) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado' });
      }
      res.json(usuario);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

// Eliminar un usuario por su ID
const eliminar = (req, res) => {
  Usuario.findByIdAndDelete(req.params.id)
    .then((usuario) => {
      if (!usuario) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado' });
      }
      res.json({ mensaje: 'Usuario eliminado' });
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
