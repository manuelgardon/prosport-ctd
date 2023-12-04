const clubDeportivoController = require('./controllers/club.controller.js')
const espacioController = require('./controllers/espacio.controller.js')
const usuarioController = require('./controllers/usuario.controller.js')
const reservaController = require('./controllers/reserva.controller.js')
const favoritoController = require('./controllers/favorito.controller.js')
const calificacionController = require('./controllers/calificacion.controller.js')
const authMiddleware = require('./middlewares/auth.middleware.js')
const Usuario = require('./models/usuario.model.js')
const Reserva = require('./models/reserva.model.js')

// Funciones del controlador para manejar rutas CRUD
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors')
const port = 1234;
const fs = require('fs');
const multer = require('multer')
const AWS = require('aws-sdk');
const path = require('path');
require('dotenv').config();
const bodyParser = require('body-parser');
app.use(cookieParser());

app.use(bodyParser.json());

// Todos los metodos manipularan los datos como JSON
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(
  cors({
    credentials: true,
    origin: 'http://1023c07-prosport.s3-website-us-east-1.amazonaws.com',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  })
);

// Conexión a la base de datos
mongoose.connect(process.env.MONGO_URL);

// Rutas CRUD de clubes deportivos
app.get('/api/clubes', clubDeportivoController.obtenerTodos);
app.get('/api/clubes/:id', clubDeportivoController.obtenerPorId);
app.post('/api/clubes', clubDeportivoController.crear);
app.put('/api/clubes/:id', clubDeportivoController.actualizar);
app.delete('/api/clubes/:id', clubDeportivoController.eliminar);

// Rutas CRUD de espacios
//app.get('/api/espacios', espacioController.obtenerTodos);
app.get('/api/espacios/', espacioController.obtenerEspaciosPaginados);
app.get('/api/user/espacios/', authMiddleware, espacioController.obtenerPorUsuario);
app.get('/api/espacios/:id', espacioController.obtenerPorId);
app.post('/api/espacios', authMiddleware, espacioController.crear);
app.put('/api/espacios', authMiddleware, espacioController.actualizar);
app.delete('/api/espacios/:id', espacioController.eliminar);


// Rutas CRUD de reservas
app.get('/api/reservas', reservaController.obtenerTodos);
app.get('/api/reservas/:id',  reservaController.obtenerPorId);
app.get('/api/user/reservas', authMiddleware, reservaController.obtenerPorUsuario);
app.post('/api/reservas', authMiddleware, reservaController.crear);
app.put('/api/reservas/:id', reservaController.actualizar);
app.delete('/api/reservas/:id', reservaController.eliminar);

// Rutas CRUD de favoritos
app.get('/api/user/favoritos', authMiddleware, favoritoController.obtenerPorUsuario)
app.post('/api/favoritos', authMiddleware, favoritoController.crear)
app.delete('/api/favoritos/:id', authMiddleware, favoritoController.eliminar)

// Rutas de calificaciones
app.post('/api/calificaciones', authMiddleware, calificacionController.crear)
app.get('/api/:espacioId/calificaciones', calificacionController.obtenerCalificaciones)

// Rutas CRUD de usuarios
app.get('/api/usuarios', usuarioController.obtenerTodos);
app.get('/api/usuarios/:id', usuarioController.obtenerPorId);
app.post('/api/usuarios', usuarioController.crear);
app.put('/api/usuarios/:id', usuarioController.actualizar);
app.delete('/api/usuarios/:id', usuarioController.eliminar);


// Iniciar el servidor
app.listen(port, () => {
  console.log(`La API REST está escuchando en el puerto ${port}`);
});

app.get('/test', (req, res) => {
  res.json('Test de conexion positivo')
})

// Subir fotos desde archivos locales
/*const photosMiddleware = multer({ dest: 'uploads/' })
app.post('/uploads', photosMiddleware.array('fotos ', 50), (req, res) => {

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
*/

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

app.post('/uploads', upload.array('fotos', 50), (req, res) => {
  const files = req.files
  if (!files || files.length === 0) {
    res.status(400).json({ mensaje: 'No se han subido archivos' })
  }
  const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
  })

  const uploadPromises = files.map((file, index)=> {
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: file.originalname,
      Body: file.buffer,
    }
    return s3.upload(params).promise()
  })

  Promise.all(uploadPromises)
  .then((results) => {
    res.json({success: true})
  }) 
  .catch((error) =>{ 
    res.status(500).json({ mensaje: 'Error al subir archivos a S3:', error })
  })
})



// Ruta de registro
app.post('/registro', async (req, res) => {
  const { nombre, apellido, email, contrasenia, dni, telefono, fechaNacimiento, domicilio } = req.body;
  // Verificar si el usuario ya existe
  const usuarioExistente = await Usuario.findOne({ email });
  if (usuarioExistente) {
    return res.status(400).json({ mensaje: 'El usuario ya existe' });
  }
  const hashedContrasenia = bcrypt.hashSync(contrasenia, 10);
  try {
    const nuevoUsuario = new Usuario({
      nombre,
      apellido,
      email,
      dni,
      telefono,
      domicilio,
      fechaNacimiento,
      contrasenia: hashedContrasenia
    });
    await nuevoUsuario.save();
    res.status(201).json({ mensaje: 'Usuario registrado con éxito' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al registrar el usuario', error });
  }
});


app.post('/login', async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    return res.json(null) // Si hay un token, significa que el usuario ya está logueado
  }
  const { email, contrasenia } = req.body;
  // Validamos que el email del usuario exista
  const user = await Usuario.findOne({ email });
  if (!user) {
    res.status(404).json('El usuario no existe');
  } else {
    const passValid = bcrypt.compareSync(contrasenia, user.contrasenia);
    if (passValid) {
      // Creamos un token para el usuario usando su id y email para que se agregue a las cookies con estas propiedades
      jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET, (error, token) => {
        if (error) throw error;
        res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'none' }).json(user);
      });
    } else {
      res.status(422).json('La contraseña no es valida');
    }
  }
})

app.get('/api/profile', (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, async (error, data) => {
      if (error) throw error;
      const { nombre, apellido, email, _id } = await Usuario.findById(data.id);
      res.json({ nombre, apellido, email, _id });
    });
  } else {
    res.json(null);
  }
});

app.post('/api/logout', (req, res) => {
  res.cookie('token', '', { expires: new Date(0) })
  res.json(true)
})
