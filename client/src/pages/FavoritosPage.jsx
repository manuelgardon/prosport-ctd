import axios from 'axios';
import { Link, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useState } from "react";
import EspacioFavoritoCard from '../components/favoritos/EspacioFavoritoCard';
import { COOKIE_FAVORITOS_EXPIRED } from '../utils/utils';
import EspacioFavoritoAlerta from '../components/favoritos/EspacioFavoritoAlerta';

export default function FavoritosPage() {

    const [alerta, setAlerta] = useState(false)
    const [espacioPorEliminar, setEspacioPorEliminar] = useState(null)
    const [vacio, setVacio] = useState(true);
    const [favoritos, setFavoritos] = useState([]);
    const token = Cookies.get('token');

    useEffect(() => {
        async function cargarFavoritos() {
            try {
                const response = await axios.get('http://localhost:1234/api/user/favoritos', { withCredentials: true });
                if (response.data.favoritos) {
                    setFavoritos(response.data.favoritos);
                }
            } catch (error) {
                console.error('Error al cargar los favoritos', error);
            }
        }

        cargarFavoritos();
    }, [token]);

    useEffect(() => {
        // Actualizamos vacío si después de la eliminación no hay más favoritos
        setVacio(favoritos.length === 0);
    }, [favoritos]);

    function handleDelete(favorito) {
        setEspacioPorEliminar(favorito);
        setAlerta(true);
    }

    function handleCancel() {
        setAlerta(false)
    }

    async function eliminarFavorito(favorito) {
        try {
            const response = await axios.delete(`http://localhost:1234/api/favoritos/${favorito.espacioId._id}`, { withCredentials: true });

            if (response.status === 200) {
                // actualizamos el estado local de favoritos
                setFavoritos(prevFavoritos => prevFavoritos.filter(f => f._id !== favorito._id));
                document.cookie = COOKIE_FAVORITOS_EXPIRED // elimina el espacio favorito de las cookies
            } else {
                alert('Error al eliminar espacio de favoritos');
            }
            setAlerta(false)
        } catch (error) {
            console.error('Error al eliminar espacio de favoritos', error);
        }
    }

    if (!token && location.pathname === '/account/favoritos') {
        return <Navigate to={'/'} />;
    }

    return (
        <section className="my-[200px] px-10">
            {vacio ? (
                <h2 className="font-semibold text-3xl text-white">Aún no tienes favoritos. <Link to={'/'} className=" text-blue-600 font-semibold underline">Encuentra nuevos espacios</Link> y agrégalos a tus favoritos.</h2>
            ) : (
                favoritos.map(favorito =>
                    <EspacioFavoritoCard key={favorito._id} handleDelete={handleDelete} favorito={favorito} />
                )
            )}
            {alerta && (
                <EspacioFavoritoAlerta handleCancel={handleCancel} eliminarFavorito={eliminarFavorito} espacioPorEliminar={espacioPorEliminar}/>
            )}
        </section>
    );
}