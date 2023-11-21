const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  apellido: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  domicilio: {
    type: String,
    required: true
  },
  fechaNacimiento: {
    type: String,
    required: true
  },
  telefono: {
    type: String,
    required: true
  },
  dni: {
    type: String,
    required: true
  },
  contrasenia: {
    type: String,
    required: true
  },
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;
