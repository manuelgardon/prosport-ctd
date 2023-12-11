const Espacio = require('../models/espacios.model'); // Importa el model

// Obtener todos los espacios
const obtenerTodos = (req, res) => {
  Espacio.find()
    .then((espacios) => {
      res.json(espacios);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

// Obtener un espacio por su ID
const obtenerPorId = async (req, res) => {
    res.json(await Espacio.findById(req.params.id))
};

const obtenerEspaciosPaginados = async (req, res) => {
  try {

    const porPagina = 10
    const filtroDeporte = req.query.deporte
    const filtroFecha = req.query.fecha
    let query = {}
    if (filtroDeporte && filtroDeporte !== 'All') {
      query.deporte = filtroDeporte 
    }
    if (filtroFecha !== undefined) {
     query.diasDisponibles = filtroFecha
    } 

    const totalEspacios = await Espacio.countDocuments(query)
    const pagina = parseInt(req.query.pagina) || 1
    const inicio = (pagina - 1) * porPagina

    const espaciosPaginados = await Espacio.find(query)
      .skip(inicio)
      .limit(porPagina)

    res.json({espacios: espaciosPaginados, totalEspacios})
  } catch (error) {
    console.error(error)
    res.status(500).send('Error al obtener espacios paginados')
  }
}


const obtenerPorUsuario = async (req, res) => {
  const usuarioData = req.usuarioData; // Accede a los datos del usuario validado desde el middleware
  const espacios = await Espacio.find({ propietario: usuarioData.id });
  res.json(espacios);
}
// Crear un nuevo espacio
const crear = async (req, res) => {
  const {
    deporte,
    nombre,
    descripcion,
    ciudad,
    caracteristicas,
    fotosAgregadas,
    cantidadDeParticipantes,
    diasDisponibles,
    precio
  } = req.body;

  const usuarioData = req.usuarioData
  const espacioExistente = await Espacio.findOne({ nombre })

  if (espacioExistente) {
    return res.status(400).json({ mensaje: 'El espacio con este nombre ya existe' });
  }

  const espacio = await Espacio.create({
    propietario: usuarioData.id,
    deporte,
    nombre,
    descripcion,
    ciudad,
    caracteristicas,
    fotos: fotosAgregadas,
    cantidadDeParticipantes,
    diasDisponibles,
    precio
  })

  res.json(espacio)
}
// Actualizar un espacio por su ID
const actualizar = async (req, res) => {
  const  token  = req.cookies.token;
  const {
    id,
    deporte,
    nombre,
    descripcion,
    ciudad,
    caracteristicas,
    fotosAgregadas,
    cantidadDeParticipantes,
    diasDisponibles,
    precio
  } = req.body

  const espacio = await Espacio.findById(id)
  const usuarioData = req.usuarioData
  const espacioExistente = await Espacio.findOne({ nombre })
  if (espacioExistente) {
    return res.status(400).json({ mensaje: 'El espacio con este nombre ya existe' });
  }
    if (usuarioData.id === espacio.propietario.toString()) {
      espacio.set({
        deporte,
        nombre,
        descripcion,
        ciudad,
        caracteristicas,
        fotos: fotosAgregadas,
        cantidadDeParticipantes,
        diasDisponibles,
        precio
      }
      )
      espacio.save()
      res.json('Realizado')
    }
}

// Eliminar un espacio por su ID
const eliminar = (req, res) => {
  Espacio.findByIdAndDelete(req.params.id)
    .then((espacio) => {
      if (!espacio) {
        return res.status(404).json({ mensaje: 'Espacio no encontrado' });
      }
      res.json({ mensaje: 'Espacio eliminado' });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

module.exports = {
  obtenerTodos,
  obtenerEspaciosPaginados,
  obtenerPorId,
  obtenerPorUsuario,
  crear,
  actualizar,
  eliminar
};
