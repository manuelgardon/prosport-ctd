/* eslint-disable no-unused-vars */
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Navigate, useParams, useLocation } from 'react-router-dom'
import { UploaderPhotos } from '../components/UploaderPhotos'
import Cookies from 'js-cookie'
import Servicios from '../components/Servicios'

function EspacioFormPage() {

    const [deporte, setDeporte] = useState('')
    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [caracteristicas, setCaracterisitcas] = useState([])
    const [fotosAgregadas, setFotosAgregadas] = useState([])
    const [cantidadDeParticipantes, setCantidadDeParticipantes] = useState(1)
    const [diaSemana, setDiasemana] = useState('')
    const [horaInicio, setHoraInicio] = useState('')
    const [horaFin, setHoraFin] = useState('')
    const [redirect, setRedirect] = useState(false)
    const { id } = useParams()
    const location = useLocation()
    const token = Cookies.get('token')

    useEffect(() => {
        if (!id) return
        axios.get(`http://localhost:1234/api/espacios/${id}`)
            .then((response) => {
                const { data } = response
                setDeporte(data.deporte)
                setNombre(data.nombre)
                setDescripcion(data.descripcion)
                setCaracterisitcas(data.caracteristicas)
                setFotosAgregadas(data.fotos)
                setCantidadDeParticipantes(data.cantidadDeParticipantes)
                setFechaReserva(data.fechaReserva)
                setHoraInicio(data.horaInicio)
                setHoraFin(data.horaFin)
            })
    }, [id])

    async function addNewEspacio(e) {
        e.preventDefault()
        if (!id) {
            if (token) {
                const data = await axios.post('http://localhost:1234/api/espacios', {
                    deporte,
                    nombre,
                    descripcion,
                    caracteristicas,
                    fotosAgregadas,
                    cantidadDeParticipantes,
                    fechaReserva,
                    horaInicio,
                    horaFin
                }, { withCredentials: true })
                setRedirect(true)
            }
        } else {
            const data = await axios.put('http://localhost:1234/api/espacios', {
                id,
                deporte,
                nombre,
                descripcion,
                caracteristicas,
                fotosAgregadas,
                cantidadDeParticipantes,
                fechaReserva,
                horaInicio,
                horaFin
            }, { withCredentials: true })
            setRedirect(true)
        }
    }

    if (!token && location.pathname === `/account/espacios/${id}`) {
        return <Navigate to={'/'} />
    }

    if (redirect) {
        return <Navigate to={'/account/espacios'} />
    }

    return (
        <div className="flex justify-center grow mt-[60px] py-10 p-6 w-full">
            <form onSubmit={addNewEspacio} className=' p-10 rounded-2xl w-[80%]'>
                <h2 className="text-2xl mt-4">Nombre</h2>
                <p><small className="text-gray-500">Nombre del club</small></p>
                <input type="text" placeholder="Nombre, ej: Cancha ProSport"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                    className="w-full mb-2 border my-1 py-2 px-3 rounded-2xl"
                    required
                />
                <h2 className="text-2xl mt-4">Deporte</h2>
                <p>
                    <small className="text-gray-500">
                        El deporte que se realizara en el club
                    </small>
                </p>
                <select
                    value={deporte}
                    onChange={e => setDeporte(e.target.value)}
                    className="w-full mb-2 border my-1 py-2 px-3 rounded-2xl text-gray-400"
                    required
                >
                    <option value="">Selecciona un deporte</option>
                    <option value="Futbol">Futbol</option>
                    <option value="Basquet">Basquet</option>
                    <option value="Voleibol">Voleibol</option>
                </select>

                <UploaderPhotos fotosAgregadas={fotosAgregadas} onChange={setFotosAgregadas} />
                <h2 className="text-2xl mt-4">Descripcion</h2>
                <p>
                    <small className="text-gray-500 ">Descripcion del espacio
                    </small>
                </p>
                <textarea
                    value={descripcion}
                    onChange={e => setDescripcion(e.target.value)}
                />

                <h2 className="text-2xl mt-4">Datos de reserva</h2>
                <section className="grid sm:grid-cols-2 md:grid-cols-4 gap-2">
                    <div>
                        <h3 className="mt-2 -mb-1">Dia semana</h3>
                        <input type="text"
                            value={fechaReserva}
                            onChange={e => setFechaReserva(e.target.value)} placeholder="12"
                            required />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Cantidad de participantes</h3>
                        <input type="number"
                            value={cantidadDeParticipantes}
                            onChange={e => setCantidadDeParticipantes(e.target.value)} placeholder="12"
                            required />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Hora inicio</h3>
                        <input type="number"
                            value={horaInicio}
                            onChange={e => setHoraInicio(e.target.value)} placeholder="12"
                            required />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Hora fin</h3>
                        <input type="number"
                            value={horaFin}
                            onChange={e => setHoraFin(e.target.value)} placeholder="12"
                            required />
                    </div>
                </section>
                <Servicios selected={caracteristicas} onChange={setCaracterisitcas}/>
                <button className="bg-primary mt-2 w-full p-2 text-white rounded-2xl">Save</button>
            </form>
        </div>
    )

}

export default EspacioFormPage