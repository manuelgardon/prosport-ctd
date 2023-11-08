// Funciones del controlador para manejar rutas CRUD
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const port = 1235;
const fs = require('fs');
const multer = require('multer')
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();


// Todos los metodos manipularan los datos como JSON
app.use(express.json());
app.use(
	cors({
		credentials: true,
		origin: 'http://127.0.0.1:8085',
	})
);

// Conexión a la base de datos
mongoose.connect(process.env.MONGO_URL);

// Rutas de identificacion de usuarios
app.post('/login', (req, res) => {
    
    const email = req.body.email
    const contrasenia = req.body.contrasenia
    const usuario = { email: email, contrasenia: contrasenia }

    const tokenAcceso = generarTokenAcceso(usuario)
    const tokenRecarga = jwt.sign(usuario, process.env.TOKEN_SECRETO_RECARGA)
    // Acá, como cada vez que se crea un nuevo token se guardaría en la base de datos. Ej: listadoTokens

    res.json({ tokenAcceso: tokenAcceso, tokenRecarga: tokenRecarga })

})

// Regenera el token de acceso para cuando expira
app.post('/token', (req, res) => {
	const tokenRecarga = req.body.token
	if(tokenRecarga === null) return res.sendStatus(401)
	// if(!listadoTokens.includes(tokenRecarga)) return res.sendStatus(403)
	jwt.verify(tokenRecarga, process.env.TOKEN_SECRETO_RECARGA, (err, usuario) => {
		if(err) return res.sendStatus(403)
		const tokenAcceso = generarTokenAcceso({ email: usuario.email })
		res.json({ tokenAcceso: tokenAcceso })
	})
})

// Elimina el token de la memoria para que no permita generar nuevos indefinidamente
app.delete('/logout', (req, res) => {
	
	// listadoTokens = listadoTokens.filter(token => token !== req.body.token)
	res.sendStatus(204)
})

app.get('/registro', )

function generarTokenAcceso(usuario) {
	return jwt.sign(usuario, process.env.TOKEN_SECRETO_ACCESO, { expiresIn: '20s' })
}

// Iniciar el servidor
app.listen(port, () => {
	console.log(`La API REST está escuchando en el puerto ${port}`);
});

app.get('/test', (req,res) => {
  	res.json('Test de conexion positivo')
})