/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as heartSolid } from '@fortawesome/free-solid-svg-icons'
import { faHeart as heartNormal } from '@fortawesome/free-regular-svg-icons'
import { Link } from "react-router-dom"
import { useEffect, useState } from 'react'

export default function EspacioCard({ espacio, agregarFavorito, eliminarFavorito, esFavoritoInicial }) {

    const [esFavorito, setEsFavorito] = useState(esFavoritoInicial)

    useEffect(() => {
        // aqui actualizamos el estado de esFavorito cuando la prop esFavoritoInicial cambia en espacios
        setEsFavorito(esFavoritoInicial)
    }, [esFavoritoInicial])

    function handleClick() {
        if (esFavorito) {
            eliminarFavorito(espacio)
            setEsFavorito(false)
        } else {
            agregarFavorito(espacio)
            setEsFavorito(true)
        }
    }

    return (
        <ul className='relative'>
            <li>
                <Link to={'/espacio/' + espacio?._id}>
                    <div className="rounded-2xl mb-2 flex">
                        {espacio?.fotos?.[0] && (
                            <img className="rounded-2xl object-cover aspect-square" src={`https://1023c07-prosport.s3.amazonaws.com/${espacio?.fotos[0]}`} alt=""/>
                        )}
                    </div>
                    <p className="bg-[#1D2223] text-[#17B289] text-2xl">{espacio?.nombre}</p>
                    <p className="bg-[#1D2223] border-2 border-[#FF9B27] text-[#FF9B27] rounded-b">{espacio?.deporte}</p>
                    <p className="bg-[#1D2223] border-2 border-[#FF9B27] text-[#FF9B27] rounded-b">Precio por hora: ${espacio?.precio}</p>
                    <p className="bg-[#1D2223] border-2 border-[#FF9B27] text-[#FF9B27] rounded-b">{espacio?.ciudad}</p>
                </Link>
                <div className='absolute top-5 right-5'>
                    <button onClick={handleClick}>
                        <FontAwesomeIcon icon={esFavorito ? heartSolid : heartNormal} size='2x' className={esFavorito ? 'text-[#FF9B27]' : ''} />
                    </button>
                </div>
            </li>
        </ul >
    );
}