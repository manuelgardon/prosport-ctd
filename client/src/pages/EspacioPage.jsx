import { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import ServiciosRender from "../components/ServiciosRender"
import Reserva from "../components/Reserva"
import GaleriaEspacio from "../components/GaleriaEspacio"
import Calificacion from "../components/Calificacion"
import StarRating from 'react-star-ratings'

export default function EspacioPage() {

    const [espacio, setEspacio] = useState()
    const [renderFotos, setRenderFotos] = useState(false)
    const [calificacion, setCalificacion] = useState(0)
    const [promedio, setPromedio] = useState(0)
    const { id } = useParams()


    /* Funciones para obtener la informacion del componente hijo Calificacion */
    function obtenerCalificacion(calificacion) {
        setCalificacion(calificacion)
    }

    function obtenerPromedio(promedio) {
        setPromedio(promedio)
    }
    /* ----------------------------------------------------------------------- */

    useEffect(() => {
        if (!id) return
        axios.get(`http://localhost:1234/api/espacios/${id}`)
            .then((response) => {
                setEspacio(response.data)
            })
    }, [id])

    if (!espacio) return null

    if (renderFotos) {
        return (
            <section>
                <article>
                    <h2>Galeria de fotos de {espacio.nombre}</h2>
                    <button onClick={() => setRenderFotos(false)}>Cerrrar galeria</button>
                </article>
                {espacio.fotos.length > 0 && espacio.fotos.map((foto, index) => (
                    <article key={index}>
                        <img src={'http://localhost:1234/uploads/' + foto} alt={espacio.nombre} />
                    </article>
                ))}
            </section>
        )
    }
    return (

        <section className="mt-[90px] relative">
            <GaleriaEspacio espacio={espacio} />
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
                        <h3 className="text-3xl text-white font-bold">{promedio.toFixed(1)}</h3>
                    </div>
                    <Reserva precio={espacio.precio} />
                </section>
            </section>
            <section>
                <Calificacion espacioId={id} obtenerCalificacion={obtenerCalificacion}
                    obtenerPromedio={obtenerPromedio} />
            </section>
        </section>
    )
}