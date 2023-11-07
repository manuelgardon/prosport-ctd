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
                const response = await axios.get(`http://localhost:8085/api/espacios?pagina=${pagina}$porPagina${espaciosPorPagina}&deporte=${filtros.deporte}`);
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
        <main className="dark:bg-[#18181B] dark:text-white w-900 flex flex-col justify-center items-center px-10 py-[80px] lg:py-[145px] grow">
            <Filters onChange={changeFilters} />
            <ul className="grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 text-center">
                {espacios.length > 0 && espacios.map(espacio => (
                    <Link key={espacio._id} to={'/espacio/' + espacio._id}>
                        <li>
                            <div className="rounded-2xl mb-2 flex">
                                {espacio.fotos?.[0] && (
                                    <img className="rounded-2xl object-cover aspect-square" src={'http://localhost:1234/uploads/' + espacio.fotos[0]} alt="" />
                                )}
                            </div>
                            <p className="bg-[#1D2223] text-[#17B289] text-2xl">{espacio.nombre}</p>
                            <p className=" bg-[#1D2223] border-2 border-[#FF9B27] text-[#FF9B27] rounded-b">{espacio.deporte}</p>
                        </li>
                    </Link>
                ))}
            </ul>
            <div>
                {/* Aqui deberia de renderizarse una funcion que agregue o elimine un boton para cada pagina en funcion de cuantos espacios hay registrados y renderizados */}
                <button onClick={() => cambiarPagina(1)}>Página 1</button>
                <button onClick={() => cambiarPagina(2)}>Página 2</button>
                <button onClick={() => cambiarPagina(3)}>Página 3</button>
            </div>
        </main>
    );
}
