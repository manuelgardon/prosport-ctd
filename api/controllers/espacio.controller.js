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
    const pagina = parseInt(req.query.pagina) || 1;
    const porPagina = 10;
    const inicio = (pagina - 1) * porPagina;
    const filtroDeporte = req.query.deporte;

    let query = { skip: inicio, limit: porPagina };
    if (filtroDeporte && filtroDeporte !== 'All') {
      query.where = { deporte: filtroDeporte };
    }

    const espaciosPaginados = await Espacio.find(query.where)
      .skip(query.skip)
      .limit(query.limit);

    res.json(espaciosPaginados);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener los espacios paginados.');
  }
};


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
    caracteristicas,
    fotosAgregadas,
    cantidadDeParticipantes,
    fechaReserva,
    horaInicio,
    horaFin,
    precio
  } = req.body;

    const usuarioData = req.usuarioData
    const espacio = await Espacio.create({
      propietario: usuarioData.id,
      deporte,
      nombre,
      descripcion,
      caracteristicas,
      fotos: fotosAgregadas,
      cantidadDeParticipantes,
      fechaReserva,
      horaInicio,
      horaFin,
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
    caracteristicas,
    fotosAgregadas,
    cantidadDeParticipantes,
    diaSemana,
    horaInicio,
    horaFin, 
    precio
  } = req.body

  const espacio = await Espacio.findById(id)
  const usuarioData = req.usuarioData
    if (usuarioData.id === espacio.propietario.toString()) {
      espacio.set({
        deporte,
        nombre,
        descripcion,
        caracteristicas,
        fotos: fotosAgregadas,
        cantidadDeParticipantes,
        diaSemana,
        horaInicio,
        horaFin,
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
