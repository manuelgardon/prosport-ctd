/* eslint-disable react/prop-types */
import { getInitials } from '../utils/utils'
import StarRating from 'react-star-ratings';

export default function ListaCalificaciones({vacio, calificaciones}){
    return(
        <section className='pt-4'>
                <div className='mb-3'
                >
                    <h2 className='text-[#17B289] text-3xl font-semibold mt-10'>Opiniones del espacio:</h2>
                </div>
                {vacio ? (<h4 className='text-white text-xl'>No hay reseñas ni calificaciones para este espacio</h4>) : (
                    <section className='flex flex-col gap-5 mt-10'>
                        {calificaciones.map((calificacion, index) => (
                        <section key={index + 1} >
                            <div className='flex items-center gap-4'>
                                <div className="profile-image w-8 h-8 bg-blue-500 rounded-full flex justify-center items-center text-white ">
                                    {getInitials(calificacion.usuarioNombre, calificacion.usuarioApellido)}
                                </div>
                                <div className='text-white text-xl'>
                                {calificacion.usuarioNombre} {calificacion.usuarioApellido}
                                </div>
                                <StarRating
                                    rating={calificacion.calificacion}
                                    starRatedColor="#FCD717"
                                    numberOfStars={5}
                                    starDimension='15px'
                                    star
                                />
                            </div>
                            <div className='block bg-white bg-opacity-80 mt-5'>
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