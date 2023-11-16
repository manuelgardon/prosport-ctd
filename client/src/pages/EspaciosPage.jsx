import axios from 'axios';
import { useEffect, useState } from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie'

export default function EspaciosPage() {

    const [espacios, setEspacios] = useState([])
    const [alerta, setAlerta] = useState(false)
    const [espacioPorEliminar, setEspacioPorEliminar] = useState(null)
    const [redirect, setRedirect] = useState(false)
    const location = useLocation()
    const token = Cookies.get('token')

    useEffect(() => {
        {/*
            axios.get('http://localhost:1234/espacios', { withCredentials: true })
                    .then(({ data }) => {
                        setEspacios(data);
            });
        */}

        if (token) {
            fetch('http://localhost:1234/api/user/espacios', {
                method: 'GET',
                credentials: 'include' // equivale a withCredentials
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error: ' + response.status);
                    }
                    return response.json();
                })
                .then(data => {
                    setEspacios(data);
                })
                .catch(error => {
                    console.error('Error: ', error);
                });

        } else{
            setRedirect(true)
        }
    }, [token])

    if(redirect) {
        return <Navigate to={'/'} />
    }

    if (!token && location.pathname === '/account/espacios') {
        return <Navigate to={'/'} />
    }

    function handleDelete(id) {
        // lanzamos la alerta en caso de que se presione el boton eliminar
        // y pasamos el id del espacio que se quiere eliminar
        setEspacioPorEliminar(id);
        setAlerta(true);
    }

    function handleCancel() {
        // si presionamos cancelar, se cierra la alerta y no se elimina el espacio
        setAlerta(false)
    }

    async function handleConfirm(id) {
        axios.delete(`http://localhost:1234/api/espacios/${id}`)
            .then((response) => {
                if (response.status === 200) {
                    setEspacios(espacios.filter(espacio => espacio._id !== id));
                } else {
                    console.error('Error eliminando espacio')
                }
            })
        setAlerta(false)
    }

    return (
        <section className='mt-[500px]'>
            <h1 className="text-4xl text-white">Espacios</h1>
            <Link to={'/account/espacios/new'} className="relative -right-[580px] hover:text-primary text-white">
                CREAR ESPACIO
            </Link>
            <hr className="mt-4 mb-4" />
            {espacios.length > 0 && espacios.map(espacio => (
                <article key={espacio._id} className='text-white'>
                    <div className="flex w-32 h-32 bg-gray-300 grow shrink-0">
                        {espacio.fotos.length > 0 && (
                            <img className="w-full" src={'http://localhost:1234/uploads/' + espacio.fotos[0]} alt={espacio.nombre} />
                        )}
                    </div>
                    <div className="grow-0 shrink text-white">
                        <h2 className="text-xl">{espacio.nombre}</h2>
                        <p><small>{espacio.deporte}</small></p>
                        <Link to={'/account/espacios/' + espacio._id} className="relative -right-[580px] hover:text-primary">
                            EDITAR
                        </Link>
                    </div>
                    <div className="grow-0 shrink text-white">
                        <button onClick={() => handleDelete(espacio._id)}>
                            ELIMINAR
                        </button>
                    </div>
                </article>
            ))}
            {alerta && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-4 rounded-md">
                        <h2 className="text-xl">¿Estás seguro de que deseas eliminar este espacio?</h2>
                        <div className="flex justify-end">
                            <button onClick={handleCancel}>CANCELAR</button>
                            <button onClick={() => handleConfirm(espacioPorEliminar)}>CONFIRMAR</button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )


}