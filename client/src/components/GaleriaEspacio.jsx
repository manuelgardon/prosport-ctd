import { useState } from "react"

/* eslint-disable react/prop-types */
export default function GaleriaEspacio({ espacio }) {

    const [renderFotos, setRenderFotos] = useState(false)
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
        <div className="relative">
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
                    <div className="overflow-hidden">
                        {espacio.fotos?.[2] && (
                            <img className="aspect-square object-cover cursor-pointer" src={'http://localhost:1234/uploads/' + espacio.fotos[2]} alt=""
                                onClick={() => setRenderFotos(true)} />
                        )}
                    </div>
                </div>
                <button className="bg-white rounded-2xl border-black shadow-md shadow-gray-600 absolute bottom-2 right-2 py-2 px-4 flex gap-2 font-medium" onClick={() => setRenderFotos(true)}>
                    Show more photos
                </button>
            </section>
        </div>
    )
}