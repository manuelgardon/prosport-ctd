import axios from 'axios'
import { useEffect, useState } from 'react'
import { Navigate, useParams, useLocation } from 'react-router-dom'
import FormEspacio from '../components/forms/FormEspacio'
import Cookies from 'js-cookie'

function EspacioFormPage() {
    const [deporte, setDeporte] = useState('')
    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [ciudad, setCiudad] = useState('')
    const [caracteristicas, setCaracterisitcas] = useState([])
    const [fotosAgregadas, setFotosAgregadas] = useState([])
    const [cantidadDeParticipantes, setCantidadDeParticipantes] = useState(1)
    const [diasDisponibles, setDiasDisponibles] = useState({ startDate: new Date(), endDate: new Date() });
    const [precio, setPrecio] = useState(100)
    const [redirect, setRedirect] = useState(false)
    const { id } = useParams()
    const location = useLocation()
    const token = Cookies.get('token')



    useEffect(() => {
        if (!id) return
        axios.get(`https://strongly-secure-kiwi.ngrok-free.app/api/espacios/${id}`)
            .then((response) => {
                const { data } = response
                setDeporte(data.deporte)
                setNombre(data.nombre)
                setDescripcion(data.descripcion)
                setCiudad(data.ciudad)
                setCaracterisitcas(data.caracteristicas)
                setFotosAgregadas(data.fotos)
                setCantidadDeParticipantes(data.cantidadDeParticipantes)
                setDiasDisponibles({
                    startDate : new Date(data.diasDisponibles.startDate),
                    endDate: new Date(data.diasDisponibles.endDate),
                })
                setPrecio(data.precio)
            })
    }, [id])



    async function addNewEspacio(e) {
        e.preventDefault()
        const { startDate, endDate } = diasDisponibles;
        const datesArray = getDatesArray(startDate, endDate);
        if (!id) {
            if (token) {
                try {
                    const response = await axios.post('https://strongly-secure-kiwi.ngrok-free.app/api/espacios', {
                        deporte,
                        nombre,
                        descripcion,
                        ciudad,
                        caracteristicas,
                        fotosAgregadas,
                        cantidadDeParticipantes,
                        diasDisponibles: datesArray.map(date => date.toISOString()),
                        precio
                    }, { withCredentials: true });
                    setRedirect(true);
                } catch (error) {
                    if (error.response.status === 400) {
                        alert(error.response.data.mensaje)
                    }
                    console.error('Error en la solicitud:', error);
                }
            }
        } else {
            try {
                const response = await axios.put('https://strongly-secure-kiwi.ngrok-free.app/api/espacios', {
                    id,
                    deporte,
                    nombre,
                    descripcion,
                    ciudad,
                    caracteristicas,
                    fotosAgregadas,
                    cantidadDeParticipantes,
                    diasDisponibles: datesArray.map(date => date.toISOString()),
                    precio
                }, { withCredentials: true })
                setRedirect(true)
            } catch (error) {
                if (error.response.status === 400) {
                    alert(error.response.data.mensaje)
                }
                console.error('Error en la solicitud:', error)
            }
        }
    }

    function getDatesArray(startDate, endDate) {
        const datesArray = [];
        let currentDate = startDate;
        while (currentDate <= endDate) {
            datesArray.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return datesArray;
    }

    if (!token && location.pathname === `/account/espacios/${id}`) {
        return <Navigate to={'/'} />
    }

    if (redirect) {
        return <Navigate to={'/account/espacios'} />
    }

    return (
        <FormEspacio
            nombre={nombre}
            deporte={deporte}
            fotosAgregadas={fotosAgregadas}
            descripcion={descripcion}
            diasDisponibles={diasDisponibles}
            ciudad={ciudad}
            cantidadDeParticipantes={cantidadDeParticipantes}
            precio={precio}
            caracteristicas={caracteristicas}
            setNombre={setNombre}
            setDeporte={setDeporte}
            setFotosAgregadas={setFotosAgregadas}
            setDescripcion={setDescripcion}
            setDiasDisponibles={setDiasDisponibles}
            setCiudad={setCiudad}
            setCantidadDeParticipantes={setCantidadDeParticipantes}
            setPrecio={setPrecio}
            setCaracterisitcas={setCaracterisitcas}
            addNewEspacio={addNewEspacio}
        />
    );
}

export default EspacioFormPage