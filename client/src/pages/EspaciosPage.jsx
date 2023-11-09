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
        setEspacioPorEliminar(id);
        setAlerta(true);
    }

    function handleCancel() {
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
        <section className='w-screen mt-[100px] flex flex-col justify-between items-center'>
            <div className='flex flex-col'>
                
                <h1 className="text-4xl text-[#17B289]">Espacios</h1>
                <button className='text-[#00FF9D] bg-[#131818] border-[#00FF9D] border dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800 mt-6'>

                <Link to={'/account/espacios/new'} className="hover:text-primary  text-[#17B289]">
                    CREAR ESPACIO
                </Link>
                </button>
            </div>
            <div className='w-screen flex mt-6'>
            <hr className="mt-4 mb-4" />
                
            {espacios.length > 0 && espacios.map(espacio => (
                <article key={espacio._id} className='text-white  ml-9 w-full'>
                    <div className="flex w-55 h-20 bg-gray-300 grow shrink-0">
                        {espacio.fotos.length > 0 && (
                            <img className="w-full" src={'http://localhost:1234/uploads/' + espacio.fotos[0]} alt={espacio.nombre} />
                        )}
                    </div>
                    <div className="grow-0 shrink text-white">
                        <h2 className=" bg-[#1D2223] text-[#17B289] text-2xl">{espacio.nombre}</h2>
                        <p className='bg-[#1D2223] border-2 border-[#FF9B27] text-[#FF9B27] rounded-b'><small>{espacio.deporte}</small></p>
                        
                    </div>
                    <div className='mt-4 flex justify-around'>
                        <button>
                            <Link to={'/account/espacios/' + espacio._id} className="grow-0 shrink text-[#00FF9D] bg-[#131818] border-[#00FF9D] border dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">
                            EDITAR
                            </Link>
                        </button>
                        <button onClick={() => handleDelete(espacio._id)} className="grow-0 shrink text-[#00FF9D] bg-[#131818] border-[#00FF9D] border dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">
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
            </div>
        </section>
    )


}