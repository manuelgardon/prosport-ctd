/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"

// este componente renderiza cada uno de los espacios de la lista de favoritos
export default function EspacioFavoritoCard({ favorito, handleDelete }) {
    return (
        <ul >
            <li className=" w-1/3 relative"> 
                <h2 className="font-bold text-3xl pb-2 text-white">{favorito.espacioId.nombre}</h2>
                <Link to={'/espacio/' + favorito.espacioId._id}>
                    <section className="grid gap-2 grid-cols-[2fr_1fr] rounded-2xl overflow-hidden w-[500px]">
                        <div>
                            {favorito.espacioId.fotos?.[0] && (
                                //foto principal
                                <img className="aspect-square object-cover cursor-pointer" src={'http://localhost:1234/uploads/' + favorito.espacioId.fotos[0]} alt=""
                                />
                            )}
                        </div>
                        <div className="grid">
                            {favorito.espacioId.fotos?.[1] && (
                                <img className="aspect-square object-cove cursor-pointer" src={'http://localhost:1234/uploads/' + favorito.espacioId.fotos[1]} alt=""
                                />
                            )}
                            {favorito.espacioId.fotos?.[2] && (
                                <img className="aspect-square object-cover cursor-pointer" src={'http://localhost:1234/uploads/' + favorito.espacioId.fotos[2]} alt=""
                                />
                            )}
                        </div>
                    </section>
                </Link>
                <button onClick={() => handleDelete(favorito)} className="absolute top-14 right-32">
                    <FontAwesomeIcon icon={faHeart} size='2x' className="text-[#17B289]"
                    />
                </button>
            </li>
        </ul >
    )

}