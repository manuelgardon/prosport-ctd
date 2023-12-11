/* eslint-disable react/prop-types */
import UploaderPhotos from '../UploaderPhotos'
import Servicios from '../Servicios';
import { DateRangePicker } from 'react-date-range';
import CiudadSelect from './CiudadSelectForm';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

export default function FormEspacio({ nombre, deporte, fotosAgregadas, descripcion, ciudad, cantidadDeParticipantes, diasDisponibles, precio, caracteristicas, setNombre, setDeporte, setFotosAgregadas, setDescripcion, setCiudad,
    setCantidadDeParticipantes, setPrecio, setCaracterisitcas, addNewEspacio, setDiasDisponibles
}) {
    return (
        <div className="flex justify-center grow mt-[60px] py-10 p-6 w-full">
            <form onSubmit={addNewEspacio} className=' p-10 rounded-2xl w-[80%]'>
                <section className='flex '>
                        <div className='flex-col w-[50%]'>
                        <h2 className="text-2xl text-[#17B289] font-bold mb-10">NOMBRE:</h2>
                
                        <input type="text" placeholder="Ingresá el nombre de tu espacio"
                            value={nombre}
                            onChange={e => setNombre(e.target.value)}
                            className='mb-10 bg-[#8AB0A6] bg-opacity-0 border-b-2 border-[#8AB0A6] text-[#8AB0A6] w-full' required/>
                        <h2 className="text-2xl text-[#17B289] font-bold mb-10">DEPORTE:</h2>
                        <select
                            value={deporte}
                            onChange={e => setDeporte(e.target.value)}
                            className="mb-10 bg-[#8AB0A6] bg-opacity-0 border-b-2 border-[#8AB0A6] text-[#8AB0A6] w-full"
                            required
                        >
                            <option value="">Seleccioná un deporte</option>
                            <option value="Futbol">Futbol</option>
                            <option value="Basquet">Basquet</option>
                            <option value="Voleibol">Voleibol</option>
                            <option value="Tenis">Tenis</option>
                        </select>
                        <h2 className="text-2xl text-[#17B289] font-bold mb-10">CIUDAD:</h2>
                        <div className=''>
                            <CiudadSelect ciudad={ciudad} onChange={setCiudad} />
                        </div>
                    </div>
                    <div className='w-[50%]'>
                        <UploaderPhotos fotosAgregadas={fotosAgregadas} onChange={setFotosAgregadas} />
                    </div>
                    </section>
                <h2 className="text-2xl text-[#17B289] font-bold mb-10">DESCRIPCIÓN</h2>
                <textarea
                    value={descripcion}
                    onChange={e => setDescripcion(e.target.value)}
                    placeholder='Ingresá una descripción de tu espacio'
                    rows='3'
                    className='w-full mb-10'            
                />
                <h2 className="text-2xl text-[#17B289] font-bold mb-10">DATOS DE LA RESERVA</h2>
                <section className="grid sm:grid-cols-2 gap-2 mb-10">
                    <div>
                        <h3 className="mb-6 text-xl text-[#E1E1E1] font-semi-bold">Cantidad de participantes</h3>
                        <input type="number"
                            value={cantidadDeParticipantes}
                            onChange={e => setCantidadDeParticipantes(e.target.value)} placeholder="12"
                            required />
                    </div>
                    <div>
                        <h3 className="text-xl text-[#E1E1E1] font-semi-bold">Precio por hora</h3>
                        <span className="text-[#E1E1E1]">(El precio de tu espacio no puede ser mayor a $1000)</span>
                        <input type="number"
                                    value={precio}
                                    step='any'
                                    onChange={(e) => {
                                        const newValue = parseFloat(e.target.value, 10);
                                        if (!isNaN(newValue) && newValue <= 1000) {
                                            setPrecio(newValue);
                                        }else{
                                            console.log('precio invalido');
                                        }
                                }} placeholder="12"
                            required />

                    </div>
                </section>
                <div>
                    <h3 className="text-xl text-[#E1E1E1] font-semi-bold mb-5">Días disponibles</h3>
                    <span className="text-[#E1E1E1]">Ingresá los días en que tu espacio estará disponible para realizar reservas</span>
                    <DateRangePicker
                                onChange={(ranges) => {
                                    const startDate = new Date(ranges.selection.startDate);
                                    const endDate = new Date(ranges.selection.endDate);
                                
                                    if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
                                        setDiasDisponibles({
                                          startDate,
                                          endDate,
                                        });
                                      } else {
                                        console.error('Fechas inválidas');
                                      }
                                
                                    console.log(startDate);
                                    console.log(endDate);
                                }}
                                showSelectionPreview={true}
                                moveRangeOnFirstSelection={false}
                                ranges={[{
                                    startDate: new Date(diasDisponibles?.startDate),
                                    endDate: new Date(diasDisponibles?.endDate),
                                    key: 'selection'
                                }]}
                                direction="horizontal"
                            />
                </div>
                <Servicios selected={caracteristicas} onChange={setCaracterisitcas} />
                <button className="font-normal m-[30px] tracking-widest text-xl w-60 h-35 text-[#59B9A0] bg-[#8AB0A6] bg-opacity-20 border border-[#59B9A0] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg text-sm px-5 py-2.5 text-center">GUARDAR</button>
            </form>
        </div>
    );
}
