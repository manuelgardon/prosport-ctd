import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useParams } from "react-router-dom";
import GaleriaEspacio from "../components/GaleriaEspacio";
import { IconClockStart, IconClockEnd } from "../components/icons";

export default function ReservaPage() {

    const [reserva, setReserva] = useState(null);
    const { id } = useParams()
    const token = Cookies.get('token')

    useEffect(() => {

        async function obtenerReservas() {
            if (token) {
                try {
                    await axios.get('http://localhost:1234/api/user/reservas', { withCredentials: true })
                        .then(response => {
                            const reservaEncontrada = response.data.find(({ _id }) => _id === id);
                            if (reservaEncontrada) {
                                setReserva(reservaEncontrada)

                            }
                        }
                        )

                } catch (error) {
                    console.error('Error al obtener la lista de reservas:', error);
                }
            }

        }
        obtenerReservas();

    }, [token, id]);

    if (!reserva) {
        return ''
    }

    return (
        <div className="my-[200px]">
            <h2 className="text-3xl">{reserva.espacioId.nombre}</h2>
            <div className="bg-gray-300 p-6 my-6 rounded-xl flex items-center justify-between">
                <div>
                    <h2 className="">Tu informacion de reserva:</h2>
                    <div className='flex gap-2 items-center border-t border-gray-300 mt-2 py-2'>
                        <IconClockStart /> {reserva.horaInicio} <span> &rarr;</span>
                        <IconClockEnd /> {reserva.horaFin}
                    </div>
                </div>
                <div className="bg-primary p-6 rounded-2xl">
                    <div>Precio total</div>
                    <div className="text-3xl">${reserva.precio}</div>
                </div>
            </div>
            <GaleriaEspacio espacio={reserva.espacioId} />
        </div >
    )
}