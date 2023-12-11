/* eslint-disable react/prop-types */
import { useState } from "react";
import Slider from "rc-slider";
import 'rc-slider/assets/index.css';
import { IconFootball, IconBasketball, IconVolleyball, IconBxGridSmall, IconBxTennisBall } from "./icons";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function Filters({ onChange, cargarEspacios }) {

    const [precioMinimo, setPrecioMinimo] = useState(0)
    const [precioMaximo, setPrecioMaximo] = useState(0)
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('All')
    // const [ventanaPrecios, setVentanaPrecios] = useState(false)
    const [fechaSeleccionada, setFechaSeleccionada] = useState(undefined);
    function handleChangeCategoria(deporte) {
        onChange((prevState) => ({
            ...prevState,
            deporte,
        }));
        setCategoriaSeleccionada(deporte)
        cargarEspacios()
    }
    
    function reestablecerPrecio() {
        onChange((prevState) => ({
            ...prevState,
            precio: 'All',
            precioMinimo: 0,
            precioMaximo: 0
        }));

        setPrecioMinimo(0)
        setPrecioMaximo(0)
        cargarEspacios()
    }

    function handleChangeRangoPrecio([min, max]) {
        setPrecioMinimo(min);
        setPrecioMaximo(max);
    }

    function handleAceptar() {
        onChange((prevState) => ({
            ...prevState,
            precio: `${precioMinimo} - ${precioMaximo}`,
            precioMinimo: precioMinimo,
            precioMaximo: precioMaximo,
        }));
        cargarEspacios()
        // setVentanaPrecios(false);
    }
    function handlefechas(date) {
        const nuevaFechaSeleccionada = date || undefined;
    
        onChange((prevState) => ({
          ...prevState,
          date: nuevaFechaSeleccionada,
        }));
        setFechaSeleccionada(date)
        cargarEspacios();
    }
    function reestablecerFecha() {
        onChange((prevState) => ({
            ...prevState,
            date: undefined
        }));
        setFechaSeleccionada()
        cargarEspacios()
    }
    return (
        <section className="" >

            <section className="">

                {/* ------------------- Filtros por categoria --------------------- */}
                <hr className="my-4 border-t-2 border-[#2C4A42]"/>
                    <div className="flex justify-center"> 
                        <button  
                            onClick={() => handleChangeCategoria('All')}  
                            className={`flex flex-col items-center justify-center p-2 m-2 sm:flex-row sm:justify-center ${    categoriaSeleccionada === 'All' ? 'bg-[#08261f]' : 'bg-none'  } text-[#17B289] font-medium hover:bg-[#08261f] rounded-3xl`}>
                                <IconBxGridSmall />  
                                <a className="text-[22px] mt-2 sm:mt-0 sm:ml-2 pr-0 sm:pr-4 ">Todas</a>
                        </button>

                        <button  
                            onClick={() => 
                            handleChangeCategoria('Futbol')}  
                            className={`flex flex-col justify-center items-center p-2 m-2 sm:flex-row sm:justify-center ${    categoriaSeleccionada === 'Futbol' ? 'bg-[#08261f]' : 'bg-none'  } text-[#17B289] font-medium hover:bg-[#08261f] rounded-3xl`}>
                                <IconFootball />  
                                <a className="text-[22px] mt-2 sm:mt-0 sm:ml-2 pr-0 sm:pr-4 ">Futbol</a>
                        </button>     
                    
                        <button  
                            onClick={() => handleChangeCategoria('Basquet')}  
                            className={`flex flex-col justify-center items-center p-2 m-2 sm:flex-row sm:justify-center ${    categoriaSeleccionada === 'Basquet' ? 'bg-[#08261f]' : 'bg-none'  } text-[#17B289] font-medium hover:bg-[#08261f] rounded-3xl`}>
                                <IconBasketball />
                                <a className="text-[22px] mt-2 sm:mt-0 sm:ml-2 pr-0 sm:pr-4">Basket</a>
                        </button>

                        <button  
                            onClick={() => handleChangeCategoria('Voleibol')}  
                            className={`flex flex-col justify-center items-center p-2 m-2 sm:flex-row sm:justify-center ${    categoriaSeleccionada === 'Voleibol' ? 'bg-[#08261f]' : 'bg-none'  } text-[#17B289] font-medium hover:bg-[#08261f] rounded-3xl`}>
                                <IconVolleyball />  
                                <a className="text-[22px] mt-2 sm:mt-0 sm:ml-2 pr-0 sm:pr-4">Voley</a>
                        </button>

                        <button  
                            onClick={() => handleChangeCategoria('Tenis')}  
                            className={`flex flex-col justify-center items-center p-2 m-2 sm:flex-row sm:justify-center ${    categoriaSeleccionada === 'Tenis' ? 'bg-[#08261f]' : 'bg-none'  } text-[#17B289] font-medium hover:bg-[#08261f] rounded-3xl`}>
                                <IconBxTennisBall />  
                                <a className="text-[22px] mt-2 sm:mt-0 sm:ml-2 pr-0 sm:pr-4">Tenis</a>
                        </button>
                    </div>
                <div className="flex justify-center pb-5">
                    <div className="left-0 mt-2 bg-[#2C4A42] p-4 rounded-lg flex w-[500px] justify-around items-center gap-3 h-[8em]">
                        <div className="flex flex-col w-40 items-center">
                            <label className="text-[#AAF0D5] mb-3">Rango de precios</label>
                                <Slider
                                    range
                                    min={0}
                                    max={1000}
                                    value={[precioMinimo, precioMaximo]}
                                    onChange={handleChangeRangoPrecio}
                                    className="mb-1"/>
                            <div className="text-center mt-4 text-[#AAF0D5]">Precio: {precioMinimo} - {precioMaximo}</div>
                        </div>
                        <div className="flex flex-col items-center pb-3">
                        <button onClick={handleAceptar} className="bg-green-500 p-2 text-white rounded-lg hover:bg-green-700 mt-4 w-20">Aceptar</button>
                        <button onClick={reestablecerPrecio} className="bg-[#FF9B27] p-2 text-white rounded-lg hover:bg-[#D08124] mt-4 w-20">Quitar</button>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="flex flex-col w-40 items-center">
                            <label className="text-[#AAF0D5] mb-3">Selecciona una fecha:</label>
                            <DatePicker
                            selected={fechaSeleccionada}
                            onChange={handlefechas}
                            dateFormat="yyyy-MM-dd"
                            className="mb-1"
                            />
                            <button onClick={reestablecerFecha} className="bg-[#FF9B27] p-2 text-white rounded-lg hover:bg-[#D08124] mt-4 w-20">Limpiar fecha</button>
                    </div>
                </div>
                <hr className="mt-4 border-t-2 border-[#2C4A42]"/>
                <h1 className="text-[#AAF0D5] opacity-20 text-xl mb-4 ">Espacios disponibles</h1>
            </section>
        </section>

    );
}


