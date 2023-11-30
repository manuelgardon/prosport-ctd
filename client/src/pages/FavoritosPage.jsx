import axios from 'axios';
import { Link, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useContext, useEffect } from "react";
import { useState } from "react";
// import { COOKIE_FAVORITOS_EXPIRED } from '../utils/utils';
import EspacioFavoritoAlerta from '../components/favoritos/EspacioFavoritoAlerta';
import EspacioFavoritoCard from '../components/favoritos/EspacioFavoritoCard';
import { UserContext } from '../UserContext';
import Swal from 'sweetalert2';
import "../utils/utilsCSS.css"

export default function FavoritosPage() {

    const [alerta, setAlerta] = useState(false)
    const [espacioPorEliminar, setEspacioPorEliminar] = useState(null)
    const [vacio, setVacio] = useState(true)
    const [favoritos, setFavoritos] = useState([])
    const token = Cookies.get('token')
    const { user } = useContext(UserContext)
    const usuarioId = user?._id

    function actualizarCookies(nuevaListaFavoritos) {
        if(usuarioId){
            Cookies.set(`favoritos_${usuarioId}`, JSON.stringify(nuevaListaFavoritos));
        }
    }

    useEffect(() => {
        async function cargarFavoritos() {
            try {
                const response = await axios.get('http://54.219.12.147:8085/api/user/favoritos', { withCredentials: true })
                if (response.data.favoritos) {
                    setFavoritos(response.data.favoritos)
                }
            } catch (error) {
                console.error('Error al cargar los favoritos', error)
            }
        }

        cargarFavoritos()
    }, [token, usuarioId])

    useEffect(() => {
        // actualizamos vacío si después de la eliminación no hay más favoritos
        setVacio(favoritos.length === 0)
    }, [favoritos]);

    function handleDelete(favorito) {
        setEspacioPorEliminar(favorito)
        setAlerta(true)
    }

    function handleCancel() {
        setAlerta(false)
    }

    async function eliminarFavorito(favorito) {
        try {
            const response = await axios.delete(`http://54.219.12.147:8085/api/favoritos/${favorito.espacioId._id}`, { withCredentials: true })

            if (response.status === 200) {
                console.log(response)
                // actualizamos el estado local de favoritos
                setFavoritos(prevFavoritos => prevFavoritos.filter(f => f._id !== favorito._id))
                const nuevaListaFavoritos = favoritos.filter(f => f._id !== favorito._id)
                actualizarCookies(nuevaListaFavoritos)
                console.log('Nuevo array de favoritos:', nuevaListaFavoritos);
                document.cookie = `favoritos_${favorito.espacioId._id}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/` // eliminamos el espacio favorito de las cookies
                console.log(`Cookie eliminada: favoritos_${favorito.espacioId._id}`);
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
                  })
            }
            setAlerta(false)
        } catch (error) {
            console.error('Error al eliminar espacio de favoritos', error)
        }
    }

    if (!token && location.pathname === '/account/favoritos') {
        return <Navigate to={'/'} />
    }

    return (
        <section className="my-[200px] px-10">
            {vacio ? (
                <h2 className="font-semibold text-3xl text-white">Aún no tienes favoritos. <Link to={'/'} className=" text-blue-600 font-semibold underline">Encuentra nuevos espacios</Link> y agrégalos a tus favoritos.</h2>
            ) : (
                favoritos.map(favorito =>
                    <EspacioFavoritoCard key={favorito._id} favorito={favorito} handleDelete={() => handleDelete(favorito)} />
                )
            )}
            {alerta && (
                <EspacioFavoritoAlerta handleCancel={handleCancel} eliminarFavorito={eliminarFavorito} espacioPorEliminar={espacioPorEliminar} />
            )}
        </section>
    )
}