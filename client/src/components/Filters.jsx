/* eslint-disable react/prop-types */
import { useState } from "react";
import Slider from "rc-slider";
import 'rc-slider/assets/index.css';
import { IconFootball, IconBasketball, IconVolleyball, IconBxGridSmall, IconBxTennisBall } from "./icons";

export default function Filters({ onChange, cargarEspacios }) {

    const [precioMinimo, setPrecioMinimo] = useState(0)
    const [precioMaximo, setPrecioMaximo] = useState(0)
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('All')
    // const [ventanaPrecios, setVentanaPrecios] = useState(false)

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

    return (
        <section className="flex flex-col gap-3 text-black justify-center items-center sm:relative w-full mb-10" >

            <section className="flex flex-col gap-3 justify-center items-center sm:relative w-full mb-10">

                {/* ------------------- Filtros por categoria --------------------- */}
                <div className="flex space-x-16"> 
                    <button onClick={() => handleChangeCategoria('All')} className={`flex space-x-4 justify-center items-center p-2 pr-4 m-2 {categoriaSeleccionada === 'All' ? 'bg-[#3d524f]' : 'bg-[#222B2A]'} text-[#17B289] font-medium hover:bg-[#08261f] rounded-3xl`}><IconBxGridSmall /><a className="text-[22px] pr-5">Todas</a></button>

                    <button onClick={() => handleChangeCategoria('Futbol')} className={`flex space-x-4 justify-center items-center p-2 pr-4 m-2 {categoriaSeleccionada === 'Futbol' ? 'bg-[#3d524f]' : 'bg-[#222B2A]'} text-[#17B289] font-medium hover:bg-[#08261f] rounded-3xl`}><IconFootball /><a className="text-[22px] pr-5">Futbol</a></button>

                    <button onClick={() => handleChangeCategoria('Basquet')} className={`flex space-x-4 justify-center items-center p-2 m-2 pr-4 {categoriaSeleccionada === 'Basquet' ? 'bg-[#3d524f]' : 'bg-[#222B2A]'} text-[#17B289] font-medium hover:bg-[#08261f] rounded-3xl`}><IconBasketball /><a className="text-[22px] pr-5">Basket</a></button>

                    <button onClick={() => handleChangeCategoria('Voleibol')} className={`flex space-x-4 justify-center items-center p-2 m-2 pr-4 {categoriaSeleccionada === 'Voleibol' ? 'bg-[#3d524f]' : 'bg-[#222B2A]'} text-[#17B289] font-medium hover:bg-[#08261f] rounded-3xl`}><IconVolleyball /><a className="text-[22px] pr-5">Voley</a></button>

                    <button onClick={() => handleChangeCategoria('Tenis')} className={`flex space-x-4 justify-center items-center p-2 m-2 pr-4 {categoriaSeleccionada === 'Tenis' ? 'bg-[#3d524f]' : 'bg-[#222B2A]'} text-[#17B289] font-medium hover:bg-[#08261f] rounded-3xl`}><IconBxTennisBall /><a className="text-[22px] pr-5">Tenis</a></button>

                </div>
                
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
            </section>
        </section>

    );
}


