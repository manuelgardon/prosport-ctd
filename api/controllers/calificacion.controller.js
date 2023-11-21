const Usuario = require('../models/usuario.model')
const Espacio = require('../models/espacios.model')
const Calificacion = require('../models/calificacion.model')
const Reserva = require('../models/reserva.model')

const obtenerCalificaciones = async (req, res) => {
    const { espacioId } = req.params;

    try {
        const espacio = await Espacio.findById(espacioId).populate('calificaciones');
        if (!espacio) {
            return res.status(404).json('Espacio no encontrado');
        }

        const calificaciones = await Promise.all(
            espacio.calificaciones.map(async (calificacionId) => {
                const calificacion = await Calificacion.findById(calificacionId).populate('usuarioId');
                return {
                    usuarioId: calificacion.usuarioId._id,
                    usuarioNombre: calificacion.usuarioId.nombre,
                    usuarioApellido: calificacion.usuarioId.apellido,
                    calificacion: calificacion.calificacion,
                    mensaje: calificacion.mensaje
                };
            })
        );

        const totalCalificaciones = calificaciones.length;
        const sumaCalificaciones = calificaciones.reduce((total, calificacion) => total + calificacion.calificacion, 0);
        const promedio = totalCalificaciones > 0 ? sumaCalificaciones / totalCalificaciones : 0;

        res.status(200).json({ calificaciones, promedio });
    } catch (error) {
        console.error('Error al obtener las calificaciones:', error);
        res.status(500).json(error);
    }
};


const crear = async (req, res) => {
    const usuarioData = req.usuarioData
    const usuarioId = usuarioData.id
    const { espacioId, calificacion, mensaje } = req.body
    const usuario = await Usuario.findById(usuarioId)

    try {
        const espacio = await Espacio.findById(espacioId)

        if (!espacio) {
            return res.status(404).json({ message: 'No se encontró el espacio' })
        }

        // nos aseguramos si el usuario ya reservó el espacio que vamos a calificar
        const reservaUsuarioEspacio = await Reserva.findOne({
            usuarioId,
            espacioId,
        });

        if (!reservaUsuarioEspacio) {
            return res.status(403).json({ message: 'No puedes calificar un espacio sin hacer una reserva' });
        }
        /*  CREACION DE CALIIACION Y VALIDACION DE QUE EL USUARIO NO CALIFICO EL ESPACIO ANTERIORMENTE  */
        let usuarioCalifico = await Calificacion.findOne({
            espacioId,
            usuarioId,
        });


        if (usuarioCalifico) {
            // validamos si el usuario ya calificó el espacio
            usuarioCalifico.mensaje = mensaje
            usuarioCalifico.calificacion = calificacion
            await usuarioCalifico.save()
        } else {
            usuarioCalifico = await Calificacion.create({
                espacioId,
                usuarioId,
                calificacion,
                mensaje
            });

            espacio.calificaciones.push(usuarioCalifico._id)
        }

        /*---------- SUMAMOS Y PROMEDIAMOS LOS VALORES DE LAS CALIFICACIONES -----------*/
        let sumaCalificaciones = 0;

        for (const calificacionId of espacio.calificaciones) {
            const calificacion = await Calificacion.findById(calificacionId)

            if (calificacion && calificacion.calificacion) {
                sumaCalificaciones += calificacion.calificacion
            }
        }

        espacio.calificacionesPromedio =
            espacio.calificaciones.length > 0
                ? sumaCalificaciones / espacio.calificaciones.length
                : 0;

        await Promise.all([espacio.save(), usuarioCalifico.save()])
        res.status(201).json({
            ...usuarioCalifico.toObject(),
            usuarioNombre: usuario.nombre,
            usuarioApellido: usuario.apellido,
        });

    } catch (error) {
        console.error('Error al crear la calificación:', error)
        res.status(500).json({ message: 'Error al crear la calificación' })
    }
};


module.exports = {
    obtenerCalificaciones,
    crear
}