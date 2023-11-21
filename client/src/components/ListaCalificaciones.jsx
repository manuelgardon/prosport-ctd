/* eslint-disable react/prop-types */
import { getInitials } from '../utils/utils'
import StarRating from 'react-star-ratings';

export default function ListaCalificaciones({vacio, calificaciones}){
    return(
        <section className='pt-4'>
                <div className='mb-3'
                >
                    <h2 className='font-semibold'>Opiniones del espacio:</h2>
                </div>
                {vacio ? (<h4>No hay reseñas ni calificaciones para este espacio</h4>) : (
                    <section className='flex flex-col gap-5'>
                        {calificaciones.map((calificacion, index) => (
                        <section key={index + 1} >
                            <div className='flex items-center gap-4'>
                                <div className="profile-image w-10 h-10 bg-blue-500 rounded-full flex justify-center items-center text-white text-xl font-semibold">
                                    {getInitials(calificacion.usuarioNombre, calificacion.usuarioApellido)}
                                </div>
                                {calificacion.usuarioNombre} {calificacion.usuarioApellido}
                                <StarRating
                                    rating={calificacion.calificacion}
                                    starRatedColor="#17b289"
                                    numberOfStars={5}
                                    starDimension='15px'
                                    star
                                />
                            </div>
                            <div className='block bg-white mt-2'>
                                {calificacion.mensaje && (
                                    <p>{calificacion.mensaje}</p>
                                )}
                            </div>
                        </section>
                        ))}
                    </section>
                )}
            </section>
    )
}