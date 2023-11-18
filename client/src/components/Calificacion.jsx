/* eslint-disable react/prop-types */
import StarRating from 'react-star-ratings'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { UserContext } from '../UserContext'
import ListaCalificaciones from './ListaCalificaciones'

export default function Calificacion({ espacioId, obtenerPromedio, obtenerCalificacion }) {

    const [calificacion, setCalificacion] = useState(0)
    const [vacio, setVacio] = useState(true)
    const [promedio, setPromedio] = useState(0)
    const [calificaciones, setCalificaciones] = useState([])
    const [comentario, setComentario] = useState('')
    const { user } = useContext(UserContext)
    const usuarioId = user?._id
    const token = Cookies.get('token')

    useEffect(() => {
        async function obtenerCalificaciones() {
            try {
                const response = await axios.get(`http://localhost:1234/api/${espacioId}/calificaciones`, { withCredentials: true })
                const data = response.data
                setPromedio(data.promedio)
                setCalificaciones(data.calificaciones)
                // con esto definimos si no hay calificaciones en el array y lo pasa a false
                setVacio(data.calificaciones.length === 0)
                // pasamos el promedio mediante la funcion del padre 
                obtenerPromedio(data.promedio)
                const calificacionDelUsuario = data.calificaciones.find(
                    (calificacion) => calificacion.usuarioId === usuarioId
                );

                if (calificacionDelUsuario) {
                    await obtenerCalificacion(data.calificacion)
                    setCalificacion(calificacionDelUsuario.calificacion)
                    setComentario(calificacionDelUsuario.mensaje || '')
                }
            } catch (error) {
                console.error('Error al obtener las calificaciones:', error)
            }
        }
        obtenerCalificaciones()
    }, [espacioId, usuarioId, obtenerPromedio, obtenerCalificacion])


    async function handleCalificacion(newCalificacion) {
        console.log(newCalificacion)
        setCalificacion(newCalificacion)
    }

    async function publicarCalificacion() {
        if (token) {
            try {
                console.log(calificacion)
                console.log(comentario)
                const response = await axios.post(
                    'http://localhost:1234/api/calificaciones',
                    {
                        espacioId,
                        calificacion,
                        mensaje: comentario,
                    },
                    { withCredentials: true }
                )
                if (response.status === 201) {
                    alert('Se agrego la calificacion con exito')
                }
            } catch (error) {
                if (error.response.status === 403) {
                    alert('No puedes calificar este espacio si no has hecho una reserva antes')
                }
            }
        }
    }

    return (
        <div className='mt-10 border-t-2 p-6'>
            <section className='flex items-center gap-5'>
                <h3 className='font-bold text-4xl'>{calificacion}</h3>
                <StarRating
                    rating={calificacion}
                    starRatedColor="#17b289"
                    starHoverColor="#17b289"
                    changeRating={(newCalificacion) => handleCalificacion(newCalificacion)}
                    numberOfStars={5}
                />
            </section>
            <div className='mt-4'>
                <label className='block text-gray-700 font-semibold'>
                    Deja tu comentario:
                </label>
                <textarea
                    value={comentario}
                    onChange={(e) => setComentario(e.target.value)}
                    placeholder='Escribe tu comentario aquí...'
                    className='mt-1 p-2 border rounded-md w-full'
                    rows='3'
                />
                <button className='bg-green-500 text-white p-2 rounded-md mt-2 w-full transition-colors duration-300 ease-in-out hover:bg-green-600' onClick={() => publicarCalificacion()}>Publicar</button>
            </div>
            <ListaCalificaciones vacio={vacio} calificaciones={calificaciones} />

        </div>
    )
}