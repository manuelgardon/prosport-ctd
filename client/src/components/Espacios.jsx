/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";
import Filters from "../components/Filters";
import { Link } from "react-router-dom";

export default function Espacios({ espacios, setEspacios, changeFilters, filtros }) {
    const [pagina, setPagina] = useState(1);
    const espaciosPorPagina = 10;

    useEffect(() => {
        async function cargarEspacios() {
            try {
                const response = await axios.get(`http://localhost:1234/api/espacios?pagina=${pagina}$porPagina${espaciosPorPagina}&deporte=${filtros.deporte}`);
                if (!response.data) {
                    throw new Error('Error al cargar los espacios.');
                }
                setEspacios(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        cargarEspacios();
    }, [pagina, setEspacios, filtros.deporte]);

    const cambiarPagina = (nuevaPagina) => {
        setPagina(nuevaPagina);
    };


    return (
        <section className="w-screen">
            <Filters onChange={changeFilters} />
            <ul className="grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 text-center">
                {espacios.length > 0 && espacios.map(espacio => (
                    <Link key={espacio._id} to={'/espacio/' + espacio._id}>
                        <li>
                            <div className="rounded-2xl mb-2 flex ">
                                {espacio.fotos?.[0] && (
                                    <img className="rounded-2xl object-cover aspect-square bg-[#1D2223]" src={'http://localhost:1234/uploads/' + espacio.fotos[0]} alt="" />
                                )}
                            </div>
                            <p className="bg-[#1D2223] text-[#17B289] text-2xl">{espacio.nombre}</p>
                            <p className=" bg-[#1D2223] border-2 border-[#FF9B27] text-[#FF9B27] rounded-b">{espacio.deporte}</p>
                        </li>
                    </Link>
                ))}
            </ul>
            <div className="w-screen flex justify-between my-5">
                {/* Aqui deberia de renderizarse una funcion que agregue o elimine un boton para cada pagina en funcion de cuantos espacios hay registrados y renderizados */}
                <button onClick={() => cambiarPagina(1)} className="text-[#00FF9D] bg-[#131818] border-[#00FF9D] border dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800 ml-3">Página 1</button>
                <button onClick={() => cambiarPagina(2)} className="text-[#00FF9D] bg-[#131818] border-[#00FF9D] border dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">Página 2</button>
                <button onClick={() => cambiarPagina(3)} className="text-[#00FF9D] bg-[#131818] border-[#00FF9D] border dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">Página 3</button>
            </div>
        </section>
    );
}
