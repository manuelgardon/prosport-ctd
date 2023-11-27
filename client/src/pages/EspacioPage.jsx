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
        axios.get(`http://localhost:1234/api/espacios/${id}`)
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
                        <img src={`https://1023c07-prosport.s3.amazonaws.com/${foto}`} alt={espacio.nombre} />
                    </article>
                ))}
            </section>
        )
    }
    return (

        <section className="mt-[90px] relative mx-auto my-auto">
            <GaleriaEspacio espacio={espacio} />
            <CompartirEspacio espacio={espacio} />
            <section className="flex justify-between px-10 mt-10">
                <article className="text-white">
                    <h2>{espacio.nombre}</h2>
                    <p>{espacio.descripcion}</p>
                    <ServiciosRender caracteristicas={espacio.caracteristicas} />
                </article>
                <section className='flex flex-col items-center gap-5'>
                    <div className="flex items-center gap-3">
                        <StarRating
                            rating={promedio}
                            starRatedColor="#17b289"
                            numberOfStars={1}
                            isInteractive={false}
                        />
                        <h3 className="text-3xl text-white font-bold">{esEntero(promedio)}</h3>
                    </div>
                    <div>
                        {cantidadCalificaciones === 1 && <p className="text-white text-xl">Calificado por {cantidadCalificaciones} usuario</p>}
                        {cantidadCalificaciones > 1 && <p className="text-white text-xl">Calificado por {cantidadCalificaciones} usuarios</p>}
                        {cantidadCalificaciones === 0 && <p className="text-white text-xl">Sin calificaciones</p>}
                    </div>
                    <Reserva precio={espacio.precio} fechasDisponibles={fechasDisponibles} />

                </section>
            </section>
            <section>
                <Calificacion espacioId={id} obtenerCalificacion={obtenerCalificacion}
                    obtenerPromedio={obtenerPromedio} />
            </section>
        </section>
    )
}