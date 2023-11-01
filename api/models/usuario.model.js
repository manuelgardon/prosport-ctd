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
  domicilio: String,
  fechaNacimiento: Date,
  telefono: String,
  dni: String,
  contrasenia: {
    type: String,
    required: true
  },
  foto: String
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;
