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
        <section className='mt-[60px] py-10 p-6 w-full'>
            <h2 className='text-2xl text-[#17B289] font-bold mb-10'>Lista de Reservas</h2>
            {reservas.length === 0 ? (
                <p className='text-xl text-[#E1E1E1] mb-10'>No hay reservas disponibles.</p>
            ) : (
                <section>
                    {reservas.map((reserva) => (
                        <Link to={`/account/reservas/${reserva?._id}`} key={reserva?._id}>
                            <article className='flex gap-4 bg-[#8AB0A6] bg-opacity-20 rounded-2xl overflow-hidden font-medium mb-10'>
                                <div className='w-48'>
                                    {reserva.espacioId?.fotos[0] && (
                                        <img src={`https://1023c07-prosport.s3.amazonaws.com/${reserva.espacioId.fotos[0]}`}
                                            className='object-cover' />
                                    )}
                                </div>
                                <div className='py-3 pr-3 grow text-[#E1E1E1]'>
                                    <h2 className='text-xl '>{reserva.espacioId?.nombre}</h2>
                                    <div className='flex gap-2 items-center border-t border-gray-300 mt-5 py-5'>
                                        <IconClockStart /> {reserva?.horaInicio} <span> &rarr;</span>
                                        <IconClockEnd /> {reserva?.horaFin}
                                    </div>
                                    <div className='flex gap-2'>
                                        <IconMoney />
                                        <p>Precio total: ${reserva?.precio}</p>
                                    </div>
                                    <p className='py-3 text-[#FF9B27]'>{reserva.fechaReserva.toString().split('T')[0]}</p>
                                </div>
                            </article>
                        </Link>
                    ))}
            </section>
            )}
        </section>
    );
}
