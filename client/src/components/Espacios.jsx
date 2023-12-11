/* eslint-disable react/prop-types */
import Cookies from 'js-cookie'
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import Filters from "../components/Filters"
import EspacioCard from './EspacioCard'
import { UserContext } from '../UserContext'
import Swal from 'sweetalert2'
import "../utils/utilsCSS.css"

export default function Espacios({ espacios, setEspacios, changeFilters, filtros }) {

    const [totalEspacios, setTotalEspacios] = useState(0)
    const [pagina, setPagina] = useState(1)
    const espaciosPorPagina = 10
    const [favoritos, setFavoritos] = useState([])
    const token = Cookies.get('token')
    const { user, setUser } = useContext(UserContext)
    const usuarioId = user?._id

    function actualizarCookies(nuevaListaFavoritos) {
        if (usuarioId) {
            Cookies.set(`favoritos_${usuarioId}`, JSON.stringify(nuevaListaFavoritos));
        }
    }

    useEffect(() => {

        async function cargarEspacios() {
            try {

                let apiUrl;

                if (filtros.date) {
                // Si filtros.date no es undefined, construir la URL con la fecha
                apiUrl = `http://18.144.53.6:1234/api/espacios?pagina=${pagina}&porPagina=${espaciosPorPagina}&deporte=${filtros.deporte}&ciudad=${filtros.ciudad}&diasDisponibles=${filtros.date}`;
                } else {
                // Si filtros.date es undefined, construir la URL sin la fecha
                apiUrl = `http://18.144.53.6:1234/api/espacios?pagina=${pagina}&porPagina=${espaciosPorPagina}&deporte=${filtros.deporte}&ciudad=${filtros.ciudad}`;
                }

                const response = await axios.get(apiUrl);
        
                if (!response.data) {
                    throw new Error('Error al cargar los espacios.');
                }
        
                setEspacios(response.data.espacios);
                setTotalEspacios(response.data.totalEspacios);
            } catch (error) {
                console.error('Error al cargar espacios:', error);
            }
        }

        async function cargarFavoritos() {
            // cargamos los favoritos de cada usuario
            try {
                const responseFavoritos = await axios.get(`http://18.144.53.6:1234/api/user/favoritos`, { withCredentials: true })
                const favoritos = responseFavoritos.data.favoritos || []
                setFavoritos(favoritos)
                // actualizamos el estado del usuario con los favoritos cargados
                setUser((prevUser) => ({ ...prevUser, favoritos }))
            } catch (error) {
                console.error(error)
            }
        }
        cargarEspacios()
        cargarFavoritos()
    }, [pagina, setEspacios, filtros.deporte,filtros.date, filtros.ciudad, usuarioId, token, setUser])

    const cambiarPagina = (nuevaPagina) => {
        setPagina(nuevaPagina)
    };

    async function agregarFavorito(espacio) {
        if (token) {
            try {
                const response = await axios.post('http://18.144.53.6:1234/api/favoritos', { espacioId: espacio._id }, { withCredentials: true })

                if (response.status === 200) {
                    // ejecutamos la funcion de actualizar para tener el estado mas reciente
                    setFavoritos((prevFavoritos) => [...prevFavoritos, { espacioId: espacio, _id: response.data.id }])
                    actualizarCookies([...favoritos, { espacioId: espacio, _id: response.data.id }]); // agregamos el espacio a las cookies
                } else {
                    Swal.fire({

                        title:"Error al agregar espacio a favoritos",
                        text: response.data.message,
                        icon: "error",
                        background:"#212121",
                        backdrop:true,
                        color: "#00FF9D",
                        allowOutsideClick:false,
                        allowEscapeKey:true,
                        allowEnterKey:true,
                        confirmButtonText: "Aceptar",
                        confirmButtonColor: "#00FF9D",
                        buttonsStyling: false,
                        customClass:{
                            popup:"swal-popu",
                            confirmButton:"swal"
                        },
                        });
                }
            } catch (error) {
                console.error('Error al agregar espacio a favoritos:', error)
            }
        } else {
            
            Swal.fire({

                title:"Debes iniciar sesión para agregar espacios a favoritos",
                icon: "warning",
                background:"#212121",
                backdrop:true,
                color: "#00FF9D",
                allowOutsideClick:false,
                allowEscapeKey:true,
                allowEnterKey:true,
                confirmButtonText: "Aceptar",
                confirmButtonColor: "#00FF9D",
                buttonsStyling: false,
                customClass:{
                    popup:"swal-popu",
                    confirmButton:"swal"
                },
                });
        }
    }


    async function eliminarFavorito(espacio) {
        if (token) {
            try {
                const response = await axios.delete(`http://18.144.53.6:1234/api/favoritos/${espacio._id}`, { withCredentials: true })
                if (response.status === 200) {
                    setFavoritos(prevFavoritos => prevFavoritos.filter(favorito => favorito._id !== espacio._id))
                    // ejecutamos la funcion de actualizar para tener el estado mas reciente
                    setFavoritos((prevFavoritos) => {
                        const nuevaListaFavoritos = prevFavoritos.filter(favorito => favorito._id !== espacio._id)
                        actualizarCookies(nuevaListaFavoritos)
                        Cookies.remove(`favoritos_${espacio._id}`)
                        return nuevaListaFavoritos
                    });
                } else {
                    Swal.fire({

                        title:"Error al eliminar espacio de favoritos",
                        icon: "error",
                        background:"#212121",
                        backdrop:true,
                        color: "#00FF9D",
                        allowOutsideClick:false,
                        allowEscapeKey:true,
                        allowEnterKey:true,
                        confirmButtonText: "Aceptar",
                        confirmButtonColor: "#00FF9D",
                        buttonsStyling: false,
                        customClass:{
                            popup:"swal-popu",
                            confirmButton:"swal"
                        },
                        });
                }
            } catch (error) {
                console.error('Error al eliminar espacio de favoritos', error)
                Swal.fire({

                    title:"Error al eliminar espacio de favoritos",
                    icon: "error",
                    background:"#212121",
                    backdrop:true,
                    color: "#00FF9D",
                    allowOutsideClick:false,
                    allowEscapeKey:true,
                    allowEnterKey:true,
                    confirmButtonText: "Aceptar",
                    confirmButtonColor: "#00FF9D",
                    buttonsStyling: false,
                    customClass:{
                        popup:"swal-popu",
                        confirmButton:"swal"
                    },
                    });
            }
        }
    }



    return (
        <section className='container max-w-screen-xl grow'>
            <Filters onChange={changeFilters} />
            {espacios.length > 0 ? (
                <ul className="grid gap-x-6 gap-y-8 grid md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-4 text-center">
                    {espacios.map((espacio) => (
                        <EspacioCard
                            key={espacio._id}
                            espacio={espacio}
                            esFavoritoInicial={favoritos.some((favorito) => favorito.espacioId._id === espacio._id)}
                            agregarFavorito={agregarFavorito}
                            eliminarFavorito={eliminarFavorito}
                        />
                    ))}
                </ul>
            ) : (
                <h2 className="font-bold text-4xl mb-10">No hay espacios disponibles que coincidan con los filtros seleccionados.</h2>
            )}
            <div className='py-10'>
                {/* aqui creamos una array de un objeto nuevo iterable con la propiedad length la cual nos inidca la cantidad de paginas que van a ser necesarias para representar la cantidad de espacios por pagina */}
                {Array.from({ length: Math.ceil(totalEspacios / espaciosPorPagina) }, (_, index) => (
                    <button key={index} className={
                        "mx-10 px-14 py-2 rounded-md bg-green-500 text-white" +
                        (pagina === index + 1 ? "bg-green-700" : "")
                    } onClick={() => cambiarPagina(index + 1)}>
                        Página {index + 1}
                    </button>
                ))}
            </div>
        </section >
    );
}