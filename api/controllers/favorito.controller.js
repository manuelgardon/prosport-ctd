const Favorito = require('../models/favoritos.model')


const obtenerPorUsuario = async (req, res) => {
    const usuarioData = req.usuarioData
    try {
        const favoritos = await Favorito.find({ usuarioId: usuarioData.id }).populate('espacioId')
        if(!favoritos){
            res.status(404).json({ message: 'No se encontraron favoritos' })
        }
        res.json({success: true, favoritos: favoritos})
    } catch (error) {
        res.status(500).json({ message: 'Erro al obtener los favoritos' })
    }

}

const crear = async (req, res) => {
    const usuarioData  = req.usuarioData;
    const { espacioId } = req.body;

    try {
        const favorito = await Favorito.create({ usuarioId: usuarioData.id, espacioId });
        res.status(200).json(favorito);
    } catch (error) {
        console.error('Error al crear favorito:', error);
        res.status(500).json({ message: 'Error al crear favorito', error: error.message });
    }
};


const eliminar = async (req, res) => {
    const usuarioData = req.usuarioData;
    const espacioId = req.params.id;

    try {
        const resultado = await Favorito.findOneAndDelete({ usuarioId: usuarioData.id, espacioId });
        if (resultado) {
            res.status(200).json({ message: 'Favorito eliminado con éxito' });
        } else {
            res.status(404).json({ message: 'No se encontró el favorito' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar favorito' });
    }
};


module.exports = {
    crear,
    obtenerPorUsuario,
    eliminar
}