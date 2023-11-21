import { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { IconClockEnd, IconClockStart, IconMoney } from '../components/icons';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function ListaReservas() {

    const [reservas, setReservas] = useState([]);
    const token = Cookies.get('token');

    useEffect(() => {

        async function obtenerReservas() {
            if (token) {
                try {
                    const response = await axios.get('http://localhost:1234/api/user/reservas', { withCredentials: true });
                    setReservas(response.data);
                    console.log(response.data);
                } catch (error) {
                    console.error('Error al obtener la lista de reservas:', error);
                }
            }

        }
        obtenerReservas();

    }, [token]);

    if (!token && location.pathname === '/account/reservas') {
        return <Navigate to={'/'} />;
    }

    return (
        <section className='my-[200px] px-10'>
            <h2>Lista de Reservas</h2>
            {reservas.length === 0 ? (
                <p>No hay reservas disponibles.</p>
            ) : (
                <section>
                    {reservas.map((reserva) => (
                        <Link to={`/account/reservas/${reserva._id}`} key={reserva._id}>
                            <article className='flex gap-4 bg-gray-400 rounded-2xl overflow-hidden font-medium'>
                                <div className='w-48'>
                                    {reserva.espacioId.fotos[0] && (
                                        <img src={'http://localhost:1234/uploads/' + reserva.espacioId.fotos[0]}
                                            className='object-cover' />
                                    )}
                                </div>
                                <div className='py-3 pr-3 grow'>
                                    <h2 className='text-xl'>{reserva.espacioId.nombre}
                                    </h2>
                                    <div className='flex gap-2 items-center border-t border-gray-300 mt-2 py-2'>
                                        <IconClockStart /> {reserva.horaInicio} <span> &rarr;</span>
                                        <IconClockEnd /> {reserva.horaFin}
                                    </div>
                                    <div className='flex gap-2'>
                                        <IconMoney />
                                        Precio total: ${reserva.precio}
                                    </div>
                                    <p>{reserva.fechaReserva}</p>
                                </div>
                            </article>
                        </Link>
                    ))}
                </section>
            )}
        </section>
    );
}
