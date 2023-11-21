/* eslint-disable react/prop-types */
import StarRating from 'react-star-ratings'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { UserContext } from '../UserContext'
import ListaCalificaciones from './ListaCalificaciones'

export default function Calificacion({ espacioId, obtenerPromedio, obtenerCalificacion }) {

    const [calificacionInicial, setCalificacionInicial] = useState(1)
    const [calificacion, setCalificacion] = useState(1)
    const [vacio, setVacio] = useState(true)
    const [promedio, setPromedio] = useState(0)
    const [calificaciones, setCalificaciones] = useState([])
    const [comentarioInicial, setComentarioInicial] = useState('')
    const [comentario, setComentario] = useState('')
    const { user } = useContext(UserContext)
    const usuarioId = user?._id
    const token = Cookies.get('token')

    useEffect(() => {
        async function obtenerCalificaciones() {
            try {
                const response = await axios.get(`http://localhost:1234/api/${espacioId}/calificaciones`)
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
                    setCalificacionInicial(calificacionDelUsuario.calificacion)
                    setComentarioInicial(calificacionDelUsuario.mensaje || '')
                    setCalificacion(calificacionDelUsuario.calificacion)
                    setComentario(calificacionDelUsuario.mensaje || '')
                }
            } catch (error) {
                console.error('Error al obtener las calificaciones')
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
            if(calificacion !== calificacionInicial || comentario !== comentarioInicial  ) {
                try {
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
                        window.location.reload()
                    }
                } catch (error) {
                    if (error.response.status === 403) {
                        alert('No puedes calificar este espacio si no has hecho una reserva antes')
                    }
                }
            } else {
                alert('No has realizado cambios en la calificación o el comentario')
            }
        } else {
            alert('Debes iniciar sesión para calificar este espacio')
        }
    }

    return (
        <div className='mt-10 border-t-2 p-6'>
            <section className='flex items-center gap-5'>
                <h3 className='font-bold text-4xl'>{calificacion}</h3>
                {token ? (
                    <div>
                        <StarRating
                            rating={calificacion}
                            starRatedColor="#17b289"
                            starHoverColor="#17b289"
                            changeRating={(newCalificacion) => handleCalificacion(newCalificacion)}
                            numberOfStars={5}
                        />
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
                    </div>
                ) : (
                    <div>
                        <StarRating
                            starRatedColor="#17b289"
                            starHoverColor="#17b289"
                            numberOfStars={5}
                            isInteractive={false}
                        />
                        <p>incia sesion y reserva para calificar este espacio</p>
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
                                disabled={true}
                            />
                            <button className='bg-green-500 text-white p-2 rounded-md mt-2 w-full transition-colors duration-300 ease-in-out hover:bg-green-600' onClick={() => publicarCalificacion()}>Publicar</button>
                        </div>
                    </div>
                )}
            </section>
            <ListaCalificaciones vacio={vacio} calificaciones={calificaciones} />
        </div>
    )
}