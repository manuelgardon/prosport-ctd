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
        <section className="flex flex-col gap-3 text-black justify-center items-center sm:relative w-full mb-10" >
            <div>
                { /*<button
                    onClick={() => setVentanaPrecios(!ventanaPrecios)}
                    className="bg-[#222B2A] p-2 text-[#17B289] font-medium rounded-lg hover:bg-[#3d524f]"
                >
                    Filtro por Precio
                </button>*/}
                {/* aqui debera ir el renderizado condicional de ventanaPrecio && () */}

            </div>
            <section className="flex gap-3 justify-center items-center sm:relative w-full mb-10">
                <div className="left-0 mt-2 bg-[#223331] p-4 rounded-lg flex w-[500px] justify-around items-center gap-3 h-[8em]">
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
                    <div className="flex gap-2">
                        <button onClick={handleAceptar} className="bg-green-500 p-2 text-white rounded-lg hover:bg-green-700 mt-4 w-20">Aceptar</button>
                        <button onClick={reestablecerPrecio} className="bg-[#FF9B27] p-2 text-white rounded-lg hover:bg-[#D08124] mt-4 w-20">Quitar</button>
                    </div>
                </div>

                {/* ------------------- Filtros por categoria --------------------- */}

                <button onClick={() => handleChangeCategoria('All')} className={`block p-2 my-2 {categoriaSeleccionada === 'All' ? 'bg-[#3d524f]' : 'bg-[#222B2A]'} text-[#17B289] font-medium hover:bg-[#D08124] rounded-3xl`}><IconBxGridSmall />Todas</button>

                <button onClick={() => handleChangeCategoria('Futbol')} className={`block p-2 my-2{categoriaSeleccionada === 'Futbol' ? 'bg-[#3d524f]' : 'bg-[#222B2A]'} text-[#17B289] font-medium hover:bg-[#D08124] rounded-3xl`}><IconFootball />Futbol</button>

                <button onClick={() => handleChangeCategoria('Basquet')} className={`block p-2 my-2 {categoriaSeleccionada === 'Basquet' ? 'bg-[#3d524f]' : 'bg-[#222B2A]'} text-[#17B289] font-medium hover:bg-[#D08124] rounded-3xl`}><IconBasketball />Basket</button>

                <button onClick={() => handleChangeCategoria('Voleibol')} className={`block p-2 my-2 {categoriaSeleccionada === 'Voleibol' ? 'bg-[#3d524f]' : 'bg-[#222B2A]'} text-[#17B289] font-medium hover:bg-[#D08124] rounded-3xl`}><IconVolleyball />Voleibol</button>

                <button onClick={() => handleChangeCategoria('Tenis')} className={`block p-2 my-2 {categoriaSeleccionada === 'Tenis' ? 'bg-[#3d524f]' : 'bg-[#222B2A]'} text-[#17B289] font-medium hover:bg-[#D08124] rounded-3xl`}><IconBxTennisBall />Tenis</button>

            </section>
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
        </section>

    );
}


