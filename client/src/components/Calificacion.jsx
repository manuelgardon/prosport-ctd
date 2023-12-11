/* eslint-disable react/prop-types */
import StarRating from 'react-star-ratings'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { UserContext } from '../UserContext'
import ListaCalificaciones from './ListaCalificaciones'
import Swal from 'sweetalert2'
import "../utils/utilsCSS.css"

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


    async function obtenerCalificaciones() {
        try {
            const response = await axios.get(`http://localhost:1234/api/${espacioId}/calificaciones`)
            const data = response.data
            console.log(data)
            setPromedio(data.promedio)
            setCalificaciones(data.calificaciones)
            console.log(data)
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

    /*async function eliminarCalificacion(calificacion) {
        try {
            const response = await axios.delete(
                `http://127.0.0.1:1234/api/calificaciones/${calificacion._id}`,
                { withCredentials: true }
            )
            if (response.status === 200) {
                Swal.fire({

                    title:"Se elimino la calificacion con exito",
                    icon: "success",
                    background:"#212121",
                    backdrop:true,
                    color: "#00FF9D",
                    allowOutsideClick:false,
                    allowEscapeKey:true,
                    allowEnterKey:true,
                    confirmButtonText: "Aceptar",
                    confirmButtonColor: "#00FF9D",
                    buttonsStyling: false,
                    customClass:{
                        popup:"swal-popu",
                        confirmButton:"swal"
                    },
                    });
                window.location.reload()
            }
        } catch (error) {
            console.error('Error al eliminar la calificacion')
        }
    }*/

    useEffect(() => {
        obtenerCalificaciones()
    }, [])


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
                        Swal.fire({

                            title:"Se agrego la calificacion con exito",
                            icon: "success",
                            background:"#212121",
                            backdrop:true,
                            color: "#00FF9D",
                            allowOutsideClick:false,
                            allowEscapeKey:true,
                            allowEnterKey:true,
                            confirmButtonText: "Aceptar",
                            confirmButtonColor: "#00FF9D",
                            buttonsStyling: false,
                            customClass:{
                                popup:"swal-popu",
                                confirmButton:"swal"
                            },
                            });
                        window.location.reload()
                    }
                } catch (error) {
                    if (error.response.status === 403) {
                        Swal.fire({

                            title:"No puedes calificar este espacio si no has hecho una reserva antes",
                            icon: "warning",
                            background:"#212121",
                            backdrop:true,
                            color: "#00FF9D",
                            allowOutsideClick:false,
                            allowEscapeKey:true,
                            allowEnterKey:true,
                            confirmButtonText: "Aceptar",
                            confirmButtonColor: "#00FF9D",
                            buttonsStyling: false,
                            customClass:{
                                popup:"swal-popu",
                                confirmButton:"swal"
                            },
                            });
                    }
                }
            } else {
                Swal.fire({

                    title:"No has realizado cambios en la calificación o el comentario",
                    icon: "error",
                    background:"#212121",
                    backdrop:true,
                    color: "#00FF9D",
                    allowOutsideClick:false,
                    allowEscapeKey:true,
                    allowEnterKey:true,
                    confirmButtonText: "Aceptar",
                    confirmButtonColor: "#00FF9D",
                    buttonsStyling: false,
                    customClass:{
                        popup:"swal-popu",
                        confirmButton:"swal"
                    },
                    });
            }
        } else {
            Swal.fire({

                title:"Debes iniciar sesión para calificar este espacio",
                icon: "warning",
                background:"#212121",
                backdrop:true,
                color: "#00FF9D",
                allowOutsideClick:false,
                allowEscapeKey:true,
                allowEnterKey:true,
                confirmButtonText: "Aceptar",
                confirmButtonColor: "#00FF9D",
                buttonsStyling: false,
                customClass:{
                    popup:"swal-popu",
                    confirmButton:"swal"
                },
                });
            
        }
    }

    return (
        <div className='mt-10 border-t-2 p-6 flex justify-center space-x-20 space-y-3'>
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
                        <div className="flex justify-center">
                            <StarRating
                                starRatedColor="#17b289"
                                starHoverColor="#17b289"
                                numberOfStars={5}
                                isInteractive={false}
                            />
                        </div>
                        <p className='text-white opacity-30'>Inicia sesion y reserva para calificar este espacio</p>
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
            <ListaCalificaciones vacio={vacio} calificaciones={calificaciones}/>
        </div>
    )
}