const clubDeportivoController = require('./controllers/club.controller');
const espacioController = require('./controllers/espacio.controller');
const usuarioController = require('./controllers/usuario.controller');
const reservaController = require('./controllers/reserva.controller');
const authController = require('./controllers/auth.controller');

// Funciones del controlador para manejar rutas CRUD
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const port = 1234;
const fs = require('fs');
const multer = require('multer')
const path = require('path'); 
require('dotenv').config();
const bodyParser = require('body-parser');
const authMiddleware = require('./middleware/auth');

app.use(bodyParser.json());

// Todos los metodos manipularan los datos como JSON
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(
  cors({
    credentials: true,
    origin: 'http://127.0.0.1:8085',
  })
);

// Conexión a la base de datos
mongoose.connect(process.env.MONGO_URL);

// Rutas CRUD de clubes deportivos
app.get('/api/clubes', authMiddleware, clubDeportivoController.obtenerTodos);
app.get('/api/clubes/:id', authMiddleware, clubDeportivoController.obtenerPorId);
app.post('/api/clubes', authMiddleware, clubDeportivoController.crear);
app.put('/api/clubes/:id', authMiddleware, clubDeportivoController.actualizar);
app.delete('/api/clubes/:id', authMiddleware, clubDeportivoController.eliminar);

// Rutas CRUD de espacios
app.get('/api/espacios', authMiddleware, espacioController.obtenerTodos);
app.get('/api/espacios/:id', authMiddleware, espacioController.obtenerPorId);
app.post('/api/espacios', authMiddleware, espacioController.crear);
app.put('/api/espacios/:id', authMiddleware, espacioController.actualizar);
app.delete('/api/espacios/:id', authMiddleware, espacioController.eliminar);


// Rutas CRUD de reservas
app.get('/api/reservas', authMiddleware, reservaController.obtenerTodos);
app.get('/api/reservas/:id', authMiddleware, reservaController.obtenerPorId);
app.post('/api/reservas', authMiddleware, reservaController.crear);
app.put('/api/reservas/:id', authMiddleware, reservaController.actualizar);
app.delete('/api/reservas/:id', authMiddleware, reservaController.eliminar);


// Rutas CRUD de usuarios
app.get('/api/usuarios', authMiddleware, usuarioController.obtenerTodos);
app.get('/api/usuarios/:id', authMiddleware, usuarioController.obtenerPorId);
app.post('/api/usuarios', usuarioController.crear);
app.put('/api/usuarios/:id', authMiddleware, usuarioController.actualizar);
app.delete('/api/usuarios/:id', authMiddleware, usuarioController.eliminar);


// Iniciar el servidor
app.listen(port, () => {
  console.log(`La API REST está escuchando en el puerto ${port}`);
});

app.get('/test', (req,res) => {
  res.json('Test de conexion positivo')
})

// Subir fotos desde archivos locales
const photosMiddleware = multer({ dest: 'uploads/' })
app.post('/upload', photosMiddleware.array('fotos ', 50), (req, res) => {

  const uploadedFiles = []
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i]
    const parts = originalname.split('.')
    const extension = parts[parts.length - 1]
    const newPath = path + '.' + extension
    fs.renameSync(path, newPath)
    uploadedFiles.push(newPath.replace("uploads\\", '/'))
  }
  res.json(uploadedFiles)
})


// Ruta de registro
app.post('/registro', authController.registrarUsuario);

// Ruta de login
app.post('/login', authController.iniciarSesion);

// Ruta de logout
app.get('/logout', (req, res) => {
  // Simplemente elimina el token del cliente, no es necesario hacer nada en el servidor.
  res.json({ message: 'Sesión cerrada con éxito' });
});

// Rutas protegidas
app.get('/ruta-protegida', authMiddleware, (req, res) => {
  // Esta ruta solo es accesible para usuarios autenticados.
  res.json({ message: 'Ruta protegida' });
});