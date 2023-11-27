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
        <div className='mt-10 border-t-2 p-6'>
            <section className=''>
            <label className='block text-[#E1E1E1] my-3'>CALIFICÁ EL ESPACIO</label>
                {token ? (    
                    <div className='w-full'>
                        <div className='flex items-center gap-2 m-[20px]'>
                            <StarRating
                                rating={calificacion}
                                starRatedColor="#FCD717"
                                starHoverColor="#17b289"
                                changeRating={(newCalificacion) => handleCalificacion(newCalificacion)}
                                numberOfStars={5}
                            />
                            <h3 className='font-bold text-3xl text-[#17b289]'>{calificacion}</h3>
                        </div>
                        <div className='mt-4'>
                         
                            <textarea
                                value={comentario}
                                onChange={(e) => setComentario(e.target.value)}
                                placeholder='Escribe tu comentario aquí...'
                                className='p-2 border rounded-md w-full'
                                rows='3'
                            />
                            <button className='justify-center w-60 h-35 bg-green-500 text-white p-2 rounded-md mt-3 transition-colors duration-300 ease-in-out hover:bg-green-600' onClick={() => publicarCalificacion()}>Publicar</button>
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
                        <p className='text-[#FF9B27] my-2'>Incia sesion y reserva para calificar este espacio</p>
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
                            <button className='w-60 bg-green-500 text-white p-2 rounded-md mt-2 transition-colors duration-300 ease-in-out hover:bg-green-600' onClick={() => publicarCalificacion()}>Publicar</button>
                        </div>
                    </div>
                )}
            </section>
            <ListaCalificaciones vacio={vacio} calificaciones={calificaciones} />
        </div>
    )
}