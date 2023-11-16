/* eslint-disable react/prop-types */
import { useState } from "react";
import Slider from "rc-slider";
import 'rc-slider/assets/index.css';
import { IconFootball, IconBasketball, IconVolleyball, IconBxGridSmall, IconBxTennisBall } from "./icons";

export default function Filters({ onChange }) {

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
        // setVentanaPrecios(false);
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
                <div className="left-0 mt-2 bg-[#202222] p-4 rounded-lg shadow-lg z-10
                flex w-[500px] justify-center items-center gap-3">
                    <label className="text-white mb-2">Rango de precios</label>
                    <Slider
                        range
                        min={0}
                        max={1000}
                        value={[precioMinimo, precioMaximo]}
                        onChange={handleChangeRangoPrecio}
                        className="mb-2"
                    />
                    <div className="text-center mt-4 text-white">
                        Precio: {precioMinimo} - {precioMaximo}
                    </div>
                    <button
                        onClick={handleAceptar}
                        className="bg-green-500 p-2 text-white rounded-lg hover:bg-green-700 mt-4"
                    >
                        Aceptar
                    </button>
                </div>

                {/* ------------------- Filtros por categoria --------------------- */}

                <button
                    onClick={() => handleChangeCategoria('All')}
                    className={`block p-2 my-2 ${categoriaSeleccionada === 'All' ? 'bg-[#3d524f]' : 'bg-[#222B2A]'} text-[#17B289] font-medium hover:bg-[#3d524f] rounded-3xl`}
                >
                    <IconBxGridSmall />
                    Todas
                </button>
                <button
                    onClick={() => handleChangeCategoria('Futbol')}
                    className={`block p-2 my-2 ${categoriaSeleccionada === 'Futbol' ? 'bg-[#3d524f]' : 'bg-[#222B2A]'} text-[#17B289] font-medium hover:bg-[#3d524f] rounded-3xl`}
                >
                    <IconFootball />
                    Futbol
                </button>
                <button
                    onClick={() => handleChangeCategoria('Basquet')}
                    className={`block p-2 my-2 ${categoriaSeleccionada === 'Basquet' ? 'bg-[#3d524f]' : 'bg-[#222B2A]'} text-[#17B289] font-medium hover:bg-[#3d524f] rounded-3xl`}
                >
                    <IconBasketball />
                    Basket
                </button>
                <button
                    onClick={() => handleChangeCategoria('Voleibol')}
                    className={`block p-2 my-2 ${categoriaSeleccionada === 'Voleibol' ? 'bg-[#3d524f]' : 'bg-[#222B2A]'} text-[#17B289] font-medium hover:bg-[#3d524f] rounded-3xl`}
                >
                    <IconVolleyball />
                    Voleibol
                </button>
                <button
                onClick={() => handleChangeCategoria('Tenis')}
                className="inline-block p-2 my-2 bg-[#222B2A] text-[#17B289] font-medium hover:bg-[#3d524f] rounded-3xl"
            >
                <IconBxTennisBall />
                Tenis
            </button>

            </section>
        </section>

    );
}


