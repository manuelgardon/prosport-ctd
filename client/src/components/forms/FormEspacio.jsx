/* eslint-disable react/prop-types */
import UploaderPhotos from '../UploaderPhotos'
import Servicios from '../Servicios'; 

export default function FormEspacio({ nombre, deporte, fotosAgregadas, descripcion, fechaReserva, cantidadDeParticipantes, horaInicio, horaFin, precio, caracteristicas, setNombre, setDeporte, setFotosAgregadas, setDescripcion, setFechaReserva,
    setCantidadDeParticipantes, setHoraInicio, setHoraFin, setPrecio, setCaracterisitcas, addNewEspacio
}) {
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
                    <option value="Tenis">Tenis</option>
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
                    <div>
                        <h3 className="mt-2 -mb-1">Precio por hora</h3>
                        <span>(El precio de tu espacio no puede ser mayor a $1000)</span>
                        <input type="number"
                            value={precio}
                            step='any'
                            onChange={(e) => {
                                const newValue = parseInt(e.target.value, 10);
                                if (!isNaN(newValue) && newValue <= 1000) {
                                  setPrecio(newValue);
                                }
                              }} placeholder="12"
                            required />
                    </div>
                </section>
                <Servicios selected={caracteristicas} onChange={setCaracterisitcas} />
                <button className="bg-primary mt-2 w-full p-2 text-white rounded-2xl">Save</button>
            </form>
        </div>
    );
}