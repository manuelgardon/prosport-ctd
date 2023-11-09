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
        <div className="w-full overflow-x-auto">

        <section className="flex whitespace-nowrap gap-3 text-black sm:relative mb-10" >
            
            <button
                onClick={() => handleFilter('All')}
                className="inline-block p-2 my-2 ml-3 bg-[#222B2A] text-[#17B289] font-medium hover:bg-[#3d524f] rounded-3xl"
            >
                <IconBxGridSmall />
                Todas
            </button>
            <button
                onClick={() => handleFilter('Futbol')}
                className="inline-block p-2 my-2 bg-[#222B2A] text-[#17B289] font-medium hover:bg-[#3d524f] rounded-3xl"
            >
                <IconFootball />
                Futbol
            </button>
            <button
                onClick={() => handleFilter('Basquet')}
                className="inline-block p-2 my-2 bg-[#222B2A] text-[#17B289] font-medium hover:bg-[#3d524f] rounded-3xl"
            >
                <IconBasketball />
                Basket
            </button>
            <button
                onClick={() => handleFilter('Voleibol')}
                className="inline-block p-2 my-2 bg-[#222B2A] text-[#17B289] font-medium hover:bg-[#3d524f] rounded-3xl"
            >
                <IconVolleyball />
                Voleibol
            </button>
            <button
                onClick={() => handleFilter('Tenis')}
                className="inline-block p-2 my-2 bg-[#222B2A] text-[#17B289] font-medium hover:bg-[#3d524f] rounded-3xl"
            >
                <IconBxTennisBall />
                Tenis
            </button>
        </section>
        </div>

    );
}


