// const express = require('express');
// const app = express();
const Usuario = require('../models/usuario.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const cookieParser = require('cookie-parser');
// app.use(cookieParser());


// Registro de usuarios
const registrarUsuario = async (req, res) => {
  try {
    const { nombre, apellido, email, contrasenia } = req.body;
    // Verificar si el usuario ya existe
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: 'El usuario ya existe' });
    }
    const hashedContrasenia = await bcrypt.hash(contrasenia, 10);
    const nuevoUsuario = new Usuario({ nombre, apellido, email, contrasenia: hashedContrasenia });
    await nuevoUsuario.save();
    res.status(201).json({ mensaje: 'Usuario registrado con éxito' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Inicio de sesión
const iniciarSesion = async (req, res) => {
  try {
    const { email, contrasenia } = req.body;
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }
    const contraseniaMatch = await bcrypt.compare(contrasenia, usuario.contrasenia);
    if (contraseniaMatch) {
      const token = jwt.sign({ usuarioId: usuario._id }, process.env.TOKEN_SECRETO ); // Posible tercer parametro { expiresIn: '30m' }
      // res.cookie('token', token).json(usuario);
    } else {
      res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Cerrar sesión
const cerrarSesion = (req, res) => {
  // res.clearCookie('token');
  res.json({ mensaje: 'Sesión cerrada con éxito' });
};

module.exports = {
  registrarUsuario,
  iniciarSesion,
  cerrarSesion,
};
