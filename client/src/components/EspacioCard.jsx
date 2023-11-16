/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as heartSolid } from '@fortawesome/free-solid-svg-icons'
import { faHeart as heartNormal } from '@fortawesome/free-regular-svg-icons'
import { Link } from "react-router-dom"

export default function EspacioCard({ espacio, agregarFavorito, eliminarFavorito, esFavorito }) {

    function handleClick() {
        if (esFavorito) {
            eliminarFavorito(espacio);
        } else {
            agregarFavorito(espacio);
        }
    }

    return (
        <ul className='relative'>
            <li>
                <Link to={'/espacio/' + espacio._id}>
                    <div className="rounded-2xl mb-2 flex">
                        {espacio.fotos?.[0] && (
                            <img className="rounded-2xl object-cover aspect-square" src={'http://localhost:1234/uploads/' + espacio.fotos[0]} alt="" />
                        )}
                    </div>
                    <p className="bg-[#1D2223] text-[#17B289] text-2xl">{espacio.nombre}</p>
                    <p className="bg-[#1D2223] border-2 border-[#FF9B27] text-[#FF9B27] rounded-b">{espacio.deporte}</p>
                    <p className="bg-[#1D2223] border-2 border-[#FF9B27] text-[#FF9B27] rounded-b">Precio por hora: ${espacio.precio}</p>
                </Link>
                <div className='absolute top-5 right-5'>
                    <button onClick={handleClick}>
                        <FontAwesomeIcon icon={esFavorito ? heartSolid : heartNormal} size='2x' className={esFavorito ? 'text-[#17B289]' : ''} />
                    </button>
                </div>
            </li>
        </ul >
    );
}