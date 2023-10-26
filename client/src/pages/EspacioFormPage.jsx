import axios from 'axios'
import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import logo from '../assets/logo.svg'

function EspacioFormPage() {

    const [deporte, setDeporte] = useState('')
    const [nombre, setNombre] = useState('')
    const [cantidadDeParticipantes, setCantidadDeParticipantes] = useState(1)
    const [diaSemana, setDiasemana] = useState('')
    const [horaInicio, setHoraInicio] = useState('')
    const [horaFin, setHoraFin] = useState('')
    const [redirect, setRedirect] = useState(false)

    async function addNewClub(event) {
        event.preventDefault()
        const data = await axios.post('http://localhost:1233/api/espacios', {
            deporte,
            nombre,
            cantidadDeParticipantes,
            diaSemana,
            horaInicio,
            horaFin
        })
        setRedirect(true)
    }

    if (redirect) {
        return <Navigate to={'/'} />
    }


    return (
        <section className='bg-gray-500 dark:bg-[#18181B] grow'>

        <div className="flex flex-col items-center justify-center px-6 pt-[100px] m-4 my-12 md:h-screen lg:pt-20 ">
            <Link to={'/'} className="flex gap-2 items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                <img className="w-9 h-9 object-contain" src={logo} alt="logo" />
                Pro-Sport
            </Link>
            <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0mt-0  dark:bg-[#222B2A] dark:border-gray-700'>
                <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
                    <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>Crea un nuevo producto</h1>
                    <form className='space-y-4 md:space-y-6' onSubmit={addNewClub}>
                        <h2 className="block mb-2 text-2sm font-medium text-gray-900 dark:text-white">Nombre</h2>
                        <p ><small className="text-gray-500 block mb-2 text-sm font-medium">Nombre del club</small></p>
                        <input type="text" placeholder="title, for example: My amazing apartment"
                            value={nombre}
                            onChange={e => setNombre(e.target.value)}
                            className="w-full mb-2 border my-1 py-2 px-3 rounded-2xl bg-gray-50 border-gray-300 text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                        <h2 className="block mb-2 text-2sm font-medium text-gray-900 dark:text-white">Deporte</h2>
                        <p>
                            <small className="text-gray-500 block mb-2 text-sm font-medium">
                                El deporte que se realizara en el club
                            </small>
                        </p>
                        <input type="text" placeholder="address"
                            value={deporte}
                            onChange={e => setDeporte(e.target.value)}
                            className="w-full mb-2 border my-1 py-2 px-3 rounded-2xl bg-gray-50 border-gray-300 text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                        {/*<h2 className="block mb-2 text-2sm font-medium text-gray-900 dark:text-white">Description</h2>
                            <p>
                                <small className="text-gray-500 ">Description of the place
                                </small>
                            </p>
                            <textarea
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                        />*/}
                        <h2 className="block mb-2 text-2sm font-medium text-gray-900 dark:text-white">Check in & out</h2>
                        <section className=" flex flex-col items-center justify-center">
                            <div>
                                <h3 className="mt-2 -mb-1 block  text-2sm font-medium text-gray-900 dark:text-white">Dia semana</h3>
                                <input type="text"
                                    value={diaSemana}
                                    onChange={e => setDiasemana(e.target.value)} placeholder="12"
                                    className='mb-1 border my-1 py-1 px-2 rounded-2xl w-full bg-gray-50 border-gray-300 text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                            </div>
                            <div>
                                <h3 className="mt-2 -mb-1 block  text-2sm font-medium text-gray-900 dark:text-white">Cantidad de participantes</h3>
                                <input type="number"
                                    value={cantidadDeParticipantes}
                                    onChange={e => setCantidadDeParticipantes(e.target.value)} placeholder="12"
                                    className='mb-1 border my-1 py-1 px-2 rounded-2xl w-full bg-gray-50 border-gray-300 text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                            </div>
                            <div>
                                <h3 className="mt-2 -mb-1 block  text-2sm font-medium text-gray-900 dark:text-white">Hora inicio</h3>
                                <input type="number"
                                    value={horaInicio}
                                    onChange={e => setHoraInicio(e.target.value)} placeholder="12"
                                    className='mb-1 border my-1 py-1 px-2 rounded-2xl w-full bg-gray-50 border-gray-300 text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                            </div>
                            <div>
                                <h3 className="mt-2 -mb-1 block  text-2sm font-medium text-gray-900 dark:text-white">Hora fin</h3>
                                <input type="number"
                                    value={horaFin}
                                    onChange={e => setHoraFin(e.target.value)} placeholder="12"
                                    className='mb-1 border my-1 py-1 px-2 rounded-2xl w-full bg-gray-50 border-gray-300 text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                            </div>
                        </section>
                        <button className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-700 dark:hover:bg-green-500 dark:focus:ring-primary-800">Save</button>
                    </form>
                </div>
            </div>

        </div>
        </section>
    )
}


export default EspacioFormPage