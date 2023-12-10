import { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import ServiciosRender from "../components/ServiciosRender"
import Reserva from "../components/Reserva"
import GaleriaEspacio from "../components/GaleriaEspacio"
import Calificacion from "../components/Calificacion"
import StarRating from 'react-star-ratings'
import CompartirEspacio from "../components/compartir/CompartirEspacio"

export default function EspacioPage() {

    const [espacio, setEspacio] = useState()
    const [renderFotos, setRenderFotos] = useState(false)
    const [calificacion, setCalificacion] = useState(0)
    const [cantidadCalificaciones, setCantidadCalificaciones] = useState([])
    const [promedio, setPromedio] = useState(0)
    const [fechasDisponibles, setFechasDisponibles] = useState([]);
    const { id } = useParams()
    
    /* Funciones para obtener la informacion del componente hijo Calificacion */
    function obtenerCalificacion(calificacion) {
        setCalificacion(calificacion)
    }

    function obtenerPromedio(promedio) {
        setPromedio(promedio)
    }
    /* ----------------------------------------------------------------------- */

    // revisamos si el promedio es entero o decimal para mostrarlo correctamente
    function esEntero(promedio){
        if(promedio % 2 === 0){
            return promedio
        } else {
            return parseFloat(promedio.toFixed(1))
        }
    }

    useEffect(() => {
        if (!id) return
        axios.get(`http://18.144.53.6:1234/api/espacios/${id}`)
            .then((response) => {
                setEspacio(response.data)
                const calificaciones = response.data.calificaciones.length
                setCantidadCalificaciones(calificaciones)
                setFechasDisponibles(response.data.diasDisponibles || []);
            })
            .catch((error) => {
                console.error('Error al obtener el espacio', error);
            })
    }, [id])

    if (!espacio) return null

    if (renderFotos) {
        return (
            <section>
                <article>
                    <h2>Galeria de fotos de {espacio.nombre}</h2>
                    <button onClick={() => setRenderFotos(false)}>Cerrar galeria</button>
                </article>
                {espacio.fotos.length > 0 && espacio.fotos.map((foto, index) => (
                    <article key={index}>
                        <img src={`http://18.144.53.6:1234/${foto}`} alt={espacio.nombre} />
                    </article>
                ))}
            </section>
        )
    }
    return (

        <section className="m-[90px]">
            <section className='flex flex-col gap-5'>
                <section className='flex items-center'>
                    <div className='flex gap-2'>
                        <h2 className="text-xl text-white font-bold">ESPACIO: </h2>
                        <h2 className="text-xl text-white font-bold">{espacio.nombre}</h2>
                    </div>
                    <div className="flex items-center gap-3 m-[20px]">
                        <div className="flex items-center gap-5">
                            <StarRating
                                rating={promedio}
                                starRatedColor="#17b289"
                                numberOfStars={1}
                                isInteractive={false}
                            />
                            <h3 className="text-xl text-white font-bold">{esEntero(promedio)}</h3>
                        </div>
                        <div>
                            {cantidadCalificaciones === 1 && <p className="text-white text-xl">Calificado por {cantidadCalificaciones} usuario</p>}
                            {cantidadCalificaciones > 1 && <p className="text-white text-xl">Calificado por {cantidadCalificaciones} usuarios</p>}
                            {cantidadCalificaciones === 0 && <p className="text-white text-xl">Sin calificaciones</p>}
                        </div>
                    </div>
                    <div className="flex items-center text-white ml-auto pr-4 pt-8">
                        <h1 className=" opacity-40 pr-4 ">Compartir espacio :</h1>
                        <CompartirEspacio espacio={espacio} /> 
                    </div>
                </section>
                <section className="flex">
                    <div>
                        <GaleriaEspacio espacio={espacio} />
                    </div>
                    <div className="p-2">
                        <Reserva precio={espacio.precio} fechasDisponibles={fechasDisponibles} />
                        <ServiciosRender caracteristicas={espacio.caracteristicas} />
                    </div>

                </section>

                
                <section>
                <Calificacion espacioId={id} obtenerCalificacion={obtenerCalificacion}
                    obtenerPromedio={obtenerPromedio} />
                </section>
            </section>
        </section>
    )
}