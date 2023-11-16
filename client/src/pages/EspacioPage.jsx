import { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import ServiciosRender from "../components/ServiciosRender"
import Reserva from "../components/Reserva"
import GaleriaEspacio from "../components/GaleriaEspacio"

export default function EspacioPage() {

    const [espacio, setEspacio] = useState()
    const [renderFotos, setRenderFotos] = useState(false)
    const { id } = useParams()

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
            <GaleriaEspacio espacio={espacio}/>
            <article className="text-white">
                <h2>{espacio.nombre}</h2>
                <p>{espacio.descripcion}</p>
            </article>
            <ServiciosRender caracteristicas={espacio.caracteristicas} />
            <Reserva precio={espacio.precio} />
        </section>
    )
}