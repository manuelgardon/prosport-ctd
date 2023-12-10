import axios from 'axios';
import { useEffect, useState } from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie'
import Swal from "sweetalert2"
import "../../utils/utilsCSS.css"

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
            fetch('http://18.144.53.6:1234/api/user/espacios', {
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
        try {
          const response = await axios.delete(`http://18.144.53.6:1234/api/espacios/${id}`);
          if (response.status === 200) {
            setEspacios(espacios.filter(espacio => espacio._id !== id));
            setAlerta(false);
            Swal.fire({
                title:"Espacio eliminado correctamente",
                icon: "success",
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
            window.location.reload()           
          } else {
            Swal.fire({
                title:"Error eliminando espacio",
                icon: "success",
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
            window.location.reload()  
          }
        } catch (error) {
          console.error('Error eliminando espacio:', error);
        }
      }

    return (
        <section className='mt-[120px] w-screen h-screen'>
            <div className='flex flex-col items-center justify-center'>

                <h1 className="text-2xl text-[#E1E1E1]">Mis Espacios</h1>
                <button className='font-normal m-[30px] tracking-widest w-60 h-35 text-[#59B9A0] bg-[#8AB0A6] bg-opacity-20 border border-[#59B9A0] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg text-sm px-5 py-2.5 text-center'>
                    <Link to={'/account/espacios/new'} className="">
                        CREAR ESPACIO
                    </Link>
                </button>
            </div>
            <hr className="mt-4 mb-4 border-[#83F3C8]" />
            <div className='flex'>
                
            {espacios.length > 0 && espacios.map(espacio => (
                <article key={espacio._id} className="border-[#83F3C8] border-2 m-4">
                    <div className="flex w-32 h-32 bg-gray-300 grow shrink-0">
                        {espacio.fotos.length > 0 && (
                            <img className="" src={`http://18.144.53.6:1234/${espacio?.fotos[0]}`} alt={espacio.nombre} />
                        )}
                    </div>
                    <div className="grow-0 shrink text-white flex flex-col justify-center items-center">
                        <h2 className="text-2xl text-[#A8F2DE]">{espacio.nombre}</h2>
                        <p className='text-xl'><small>{espacio.deporte}</small></p>
                        <button className='bg-green-500 p-2 text-white rounded-lg hover:bg-green-700 mt-4 w-50'>
                        <Link to={'/account/espacios/' + espacio._id}>
                            EDITAR
                        </Link>
                        </button>
                        <button onClick={() => handleDelete(espacio._id)} className='bg-[#FF9B27] p-2 text-white rounded-lg hover:bg-[#D08124] mt-4 w-50'>
                            ELIMINAR
                        </button>
                    </div>
                    <div className="grow-0 shrink text-white">
                    </div>
                </article>
            ))}
            {alerta && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="border border-[#00FF9D] bg-[#212121] p-4 rounded-md">
                        <h2 className="text-xl text-[#00FF9D]">¿Estás seguro de que deseas eliminar este espacio?</h2>
                        <div className="flex justify-between p-3">
                            <div>
                                <button className='bg-green-500 p-2 text-white rounded-lg hover:bg-green-700 mt-4 w-40' onClick={handleCancel}>CANCELAR</button>
                            </div>
                            <div>
                                <button className='bg-[#FF9B27] p-2 text-white rounded-lg hover:bg-[#D08124] mt-4 w-40' onClick={() => handleConfirm(espacioPorEliminar)}>CONFIRMAR</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            </div>
        </section>
    )


}