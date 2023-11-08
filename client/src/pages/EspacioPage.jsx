import { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import ServiciosRender from "../components/ServiciosRender"

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
            <section className="grid gap-2 grid-cols-[2fr_1fr] rounded-2xl overflow-hidden">
                <div>
                    {espacio.fotos?.[0] && (
                        //foto principal
                        <img className="aspect-square object-cover cursor-pointer" src={'http://localhost:1234/uploads/' + espacio.fotos[0]} alt=""
                            onClick={() => setRenderFotos(true)} />
                    )}
                </div>
                <div className="grid">
                    {espacio.fotos?.[1] && (
                        <img className="aspect-square object-cove cursor-pointer" src={'http://localhost:1234/uploads/' + espacio.fotos[1]} alt=""
                            onClick={() => setRenderFotos(true)} />
                    )}
                    {espacio.fotos?.[2] && (
                        <img className="aspect-square object-cover cursor-pointer" src={'http://localhost:1234/uploads/' + espacio.fotos[2]} alt=""
                            onClick={() => setRenderFotos(true)} />
                    )}
                </div>
            </section>
            <button className="bg-white rounded-2xl border-black shadow-md shadow-gray-600 absolute bottom-2 right-2 py-2 px-4 flex gap-2 font-medium" onClick={() => setRenderFotos(true)}>
                Show more photos
            </button>
            <article className="text-white">
                <h2>{espacio.nombre}</h2>
                <p>{espacio.descripcion}</p>
            </article>
            <ServiciosRender caracteristicas={espacio.caracteristicas}/>
        </section>
    )
}