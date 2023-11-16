import Cookies from 'js-cookie';
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";
import Filters from "../components/Filters";
import EspacioCard from './EspacioCard';
import { COOKIE_FAVORITOS_EXPIRED } from '../utils/utils';


export default function Espacios({ espacios, setEspacios, changeFilters, filtros }) {

    const [pagina, setPagina] = useState(1);
    const espaciosPorPagina = 10;
    const [favoritos, setFavoritos] = useState([]);
    const token = Cookies.get('token')

    function actualizarCookies(nuevaListaFavoritos) {
        Cookies.set('favoritos', JSON.stringify(nuevaListaFavoritos));
    }

    useEffect(() => {

        async function cargarEspacios() {

            const cookiesFavoritos = Cookies.get('favoritos');
            if (cookiesFavoritos) {
                setFavoritos(JSON.parse(cookiesFavoritos));
            }

            try {
                const response = await axios.get(`http://localhost:1234/api/espacios?pagina=${pagina}&porPagina=${espaciosPorPagina}&deporte=${filtros.deporte}`);
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

    async function agregarFavorito(espacio) {
        if (token) {
            try {
                const response = await axios.post('http://localhost:1234/api/favoritos', { espacioId: espacio._id }, { withCredentials: true });

                if (response.status === 200) {
                    // utilizamos el estado más reciente al momento de la actualización
                    setFavoritos(prevFavoritos => [...prevFavoritos, espacio]);
                    actualizarCookies([...favoritos, espacio]); // agregamos el espacio a las cookies
                } else {
                    alert(`Error al agregar espacio a favoritos: ${response.data.message}`);
                }
            } catch (error) {
                console.error('Error al agregar espacio a favoritos:', error);
                if (error.response && error.response.data) {
                    alert(`Error al agregar espacio a favoritos: ${error.response.data.message}`);
                } else {
                    alert('Error al agregar espacio a favoritos');
                }
            }
        }
    }

    function eliminarFavorito(espacio) {
        if (token) {
            axios.delete(`http://localhost:1234/api/favoritos/${espacio._id}`, { withCredentials: true })
                .then((response) => {
                    if (response.status === 200) {
                        // utilizamos el estado más reciente al momento de la actualización
                        setFavoritos(prevFavoritos => prevFavoritos.filter(favorito => favorito._id !== espacio._id));
                        actualizarCookies(favoritos.filter(favorito => favorito._id !== espacio._id));
                        document.cookie = COOKIE_FAVORITOS_EXPIRED// eliminamos el espacio favorito de las cookies
                    } else {
                        alert('Error al eliminar espacio de favoritos');
                    }
                })
                .catch((error) => {
                    console.error(error);
                    alert('Error al eliminar espacio de favoritos');
                });
        }
    }


    return (
        <section>
            <Filters onChange={changeFilters} />
            {espacios.length > 0 ? (
                <ul className="grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 text-center">
                    {espacios.map(espacio => (
                        <EspacioCard key={espacio._id} espacio={espacio} esFavorito={favoritos.some(favorito => favorito._id === espacio._id)}
                            agregarFavorito={agregarFavorito} eliminarFavorito={eliminarFavorito} />
                    ))}
                </ul>
            ) : (
                <h2 className="font-bold text-4xl mb-10">No hay espacios disponibles que coincidan con los filtros seleccionados.</h2>
            )}
            <div>
                {/* Aqui deberia de renderizarse una funcion que agregue o elimine un boton para cada pagina en funcion de cuantos espacios hay registrados y renderizados */}
                <button onClick={() => cambiarPagina(1)}>Página 1</button>
                <button onClick={() => cambiarPagina(2)}>Página 2</button>
                <button onClick={() => cambiarPagina(3)}>Página 3</button>
            </div >
        </section >
    );

}