import axios from 'axios'
import { useState } from 'react'
import { Navigate } from 'react-router-dom'

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
        <div className="grow mt-[60px] py-10 p-6 bg-blue-500">

            <form onSubmit={addNewClub}>
                <h2 className="text-2xl mt-4">Nombre</h2>
                <p><small className="text-gray-500">Nombre del club</small></p>
                <input type="text" placeholder="title, for example: My amazing apartment"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                    className="w-full mb-2 border my-1 py-2 px-3 rounded-2xl"
                />
                <h2 className="text-2xl mt-4">Deporte</h2>
                <p>
                    <small className="text-gray-500">
                        El deporte que se realizara en el club
                    </small>
                </p>
                <input type="text" placeholder="address"
                    value={deporte}
                    onChange={e => setDeporte(e.target.value)}
                    className="w-full mb-2 border my-1 py-2 px-3 rounded-2xl"
                />
                {/*<h2 className="text-2xl mt-4">Description</h2>
                    <p>
                        <small className="text-gray-500 ">Description of the place
                        </small>
                    </p>
                    <textarea
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                />*/}
                <h2 className="text-2xl mt-4">Check in & out</h2>
                <section className="grid sm:grid-cols-2 md:grid-cols-4 gap-2">
                    <div>
                        <h3 className="mt-2 -mb-1">Dia semana</h3>
                        <input type="text"
                            value={diaSemana}
                            onChange={e => setDiasemana(e.target.value)} placeholder="12" />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Cantidad de participantes</h3>
                        <input type="number"
                            value={cantidadDeParticipantes}
                            onChange={e => setCantidadDeParticipantes(e.target.value)} placeholder="12" />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Hora inicio</h3>
                        <input type="number"
                            value={horaInicio}
                            onChange={e => setHoraInicio(e.target.value)} placeholder="12" />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Hora fin</h3>
                        <input type="number"
                            value={horaFin}
                            onChange={e => setHoraFin(e.target.value)} placeholder="12" />
                    </div>
                </section>
                <button className="bg-primary mt-2 w-full p-2 text-white rounded-2xl">Save</button>
            </form>
        </div>
    )
}


export default EspacioFormPage