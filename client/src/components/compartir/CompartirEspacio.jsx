/* eslint-disable react/prop-types */
import { useState } from 'react';
import { IoShareSocial, IoClose } from "react-icons/io5"
import CopiarLink from './CopiarLink';
import Redes from './Redes';


export default function CompartirEspacio({ espacio }) {
    const [ventana, setVentana] = useState(false)
    const url = document.URL;
    const titulo = `Te invitamos a que conozcas ${espacio.nombre} en ProSport`

    function handleAbrirVentana() {
        setVentana(true)
    }

    function handleCerrarVentana() {
        setVentana(false)
    }


    return (
        <section>
            <button onClick={handleAbrirVentana}>
                <IoShareSocial size={32}/>
            </button>
            {ventana && (
                <section className="fixed inset-0 z-10 bg-black bg-opacity-50 flex justify-center items-center text-white">
                    <section className="bg-zinc-800 p-5 rounded-xl">
                        <div className='flex items-center justify-between'>
                            <h3 className='py-2.5 font-semibold text-xl'>Compartir</h3>
                            <button onClick={handleCerrarVentana}><IoClose size={20} className='hover:text-green-300' /></button>
                        </div>
                        <img src={'http://localhost:1234/uploads/' + espacio.fotos[0]} alt={espacio.nombre} className='w-[500px] h-auto rounded-xl' />
                        <CopiarLink url={url}/>
                        <Redes url={url} titulo={titulo}/>
                    </section>
                </section>
            )}
        </section>
    )
}
