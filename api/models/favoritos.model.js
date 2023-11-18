const mongoose = require('mongoose')

const favoritoSchema = new mongoose.Schema({
    espacioId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Espacio' },
    usuarioId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Usuario' },
})

const Favorito = mongoose.model('Favoritos', favoritoSchema)
module.exports = Favorito