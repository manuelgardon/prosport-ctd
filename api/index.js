const clubDeportivoController = require('./controllers/club.controller');
const espacioController = require('./controllers/espacio.controller');
const usuarioController = require('./controllers/usuario.controller');
const reservaController = require('./controllers/reserva.controller');

// Funciones del controlador para manejar rutas CRUD
import app from './app';
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const path = require('path');
const port = 1234;
const fs = require('fs');
const multer = require('multer')
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Conexión a la base de datos
mongoose.connect(process.env.MONGO_URL);

// Todos los metodos manipularan los datos como JSON
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(
  cors({
    credentials: true,
    origin: 'http://127.0.0.1:8085',
  })
);

function validarToken(req, res, next) {
    // Queremos chequear el token que nos envian, verificarlo, y devolver el usuario
    // para obtener el usuario y permitirle la vista a espacios
    const headerAutenticacion = req.headers['authorization']
    const token = headerAutenticacion && headerAutenticacion.split(' ')[1]
    if (token === null) return res.sendStatus(401)

    jwt.verify(token, process.env.TOKEN_SECRETO_ACCESO, (err, email) => {
        if(err) return res.sendStatus(403)
        req.email = email
        next()
    })
}

// app.get('/registro',)

// Rutas CRUD de clubes deportivos
app.get('/api/clubes', validarToken, clubDeportivoController.obtenerTodos);
app.get('/api/clubes/:id', clubDeportivoController.obtenerPorId);
app.post('/api/clubes', clubDeportivoController.crear);
app.put('/api/clubes/:id', clubDeportivoController.actualizar);
app.delete('/api/clubes/:id', clubDeportivoController.eliminar);

// Rutas CRUD de espacios
app.get('/api/espacios', validarToken, espacioController.obtenerTodos);
app.get('/api/espacios/:id', espacioController.obtenerPorId);
app.post('/api/espacios', espacioController.crear);
app.put('/api/espacios/:id', espacioController.actualizar);
app.delete('/api/espacios/:id', espacioController.eliminar);


// Rutas CRUD de reservas
app.get('/api/reservas', reservaController.obtenerTodos);
app.get('/api/reservas/:id', reservaController.obtenerPorId);
app.post('/api/reservas', reservaController.crear);
app.put('/api/reservas/:id', reservaController.actualizar);
app.delete('/api/reservas/:id', reservaController.eliminar);


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