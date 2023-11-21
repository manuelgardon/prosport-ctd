/* eslint-disable react/prop-types */
import UploaderPhotos from '../UploaderPhotos'
<<<<<<< Updated upstream
import Servicios from '../Servicios'; 
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

export default function FormEspacio({ nombre, deporte, fotosAgregadas,  descripcion, cantidadDeParticipantes,diasDisponibles,  precio, caracteristicas, setNombre, setDeporte, setFotosAgregadas, setDescripcion,
    setCantidadDeParticipantes, setPrecio, setCaracterisitcas, addNewEspacio, setDiasDisponibles
=======
import Servicios from '../Servicios';
import CiudadSelect from './CiudadSelectForm';

export default function FormEspacio({ nombre, deporte, fotosAgregadas, descripcion, ciudad, fechaReserva, cantidadDeParticipantes, horaInicio, horaFin, precio, caracteristicas, setNombre, setDeporte, setFotosAgregadas, setDescripcion, setCiudad, setFechaReserva,
    setCantidadDeParticipantes, setHoraInicio, setHoraFin, setPrecio, setCaracterisitcas, addNewEspacio
>>>>>>> Stashed changes
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
                <h2 className="text-2xl mt-4">Ciudad</h2>
                <p>
                    <small className="text-gray-500">
                        La ciudad donde se encuentra el club
                    </small>
                </p>
                <div className='mb-10'>
                    <CiudadSelect ciudad={ciudad} onChange={setCiudad}/>
                </div>
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
                        <h3 className="mt-2 -mb-1">Cantidad de participantes</h3>
                        <input type="number"
                            value={cantidadDeParticipantes}
                            onChange={e => setCantidadDeParticipantes(e.target.value)} placeholder="12"
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
                <div>
                    <h3 className="mt-2 -mb-1">Días disponibles</h3>
                    <DateRangePicker
                        onChange={(ranges) => setDiasDisponibles({
                            startDate: new Date(ranges.selection.startDate), 
                            endDate: new Date(ranges.selection.endDate),
                        })}
                        showSelectionPreview={true}
                        moveRangeOnFirstSelection={false}
                        ranges={[{ 
                                startDate: new Date(diasDisponibles.startDate), 
                                endDate: new Date(diasDisponibles.endDate), 
                                key: 'selection' 
                                }]}
                        direction="horizontal"
                        />
                    </div>
                <Servicios selected={caracteristicas} onChange={setCaracterisitcas} />
                <button className="bg-primary mt-2 w-full p-2 text-white rounded-2xl">Save</button>
            </form>
        </div>
    );
}