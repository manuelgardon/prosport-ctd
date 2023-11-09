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
            <section className="">
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
    <div className="w-screen flex justify-center">

        <section className="mt-[90px] flex flex-col w-21">
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
          
            <article className="text-white">
                <h2 className="bg-[#1D2223] text-[#17B289] text-2xl text-center" >{espacio.nombre}</h2>
                <p className="bg-[#1D2223] border-2 border-[#FF9B27] text-[#FF9B27] rounded-b text-center">{espacio.descripcion}</p>
            </article>
            <ServiciosRender caracteristicas={espacio.caracteristicas}/>
            <button className="bg-white rounded-2xl border-black shadow-md shadow-gray-600  bottom-2 right-2 py-2 px-4 flex gap-2 font-medium mx-auto" onClick={() => setRenderFotos(true)}>
                Show more photos
            </button>
        </section>
    </div>

    )
}