/* eslint-disable react/prop-types */
import { IconFootball, IconBasketball, IconVolleyball, IconBxGridSmall, IconBxTennisBall } from "./icons";

export default function Filters({ onChange }) {

    const handleFilter = (deporte) => {
        onChange((prevState) => ({
            ...prevState,
            deporte,
        }));
    };

    return (

        <section className="flex gap-3 text-black justify-center items-center sm:relative w-full mb-10" >
            <label>Categoría</label>
            <button
                onClick={() => handleFilter('All')}
                className="block p-2 my-2 bg-[#222B2A] text-[#17B289] font-medium hover:bg-[#3d524f] rounded-3xl"
            >
                <IconBxGridSmall />
                Todas
            </button>
            <button
                onClick={() => handleFilter('Futbol')}
                className="block p-2 my-2 bg-[#222B2A] text-[#17B289] font-medium hover:bg-[#3d524f] rounded-3xl"
            >
                <IconFootball />
                Futbol
            </button>
            <button
                onClick={() => handleFilter('Basquet')}
                className="block p-2 my-2 bg-[#222B2A] text-[#17B289] font-medium hover:bg-[#3d524f] rounded-3xl"
            >
                <IconBasketball />
                Basket
            </button>
            <button
                onClick={() => handleFilter('Voleibol')}
                className="block p-2 my-2 bg-[#222B2A] text-[#17B289] font-medium hover:bg-[#3d524f] rounded-3xl"
            >
                <IconVolleyball />
                Voleibol
            </button>
            <button
                onClick={() => handleFilter('Tenis')}
                className="block p-2 my-2 bg-[#222B2A] text-[#17B289] font-medium hover:bg-[#3d524f] rounded-3xl"
            >
                <IconBxTennisBall />
                Tenis
            </button>
        </section>

    );
}


