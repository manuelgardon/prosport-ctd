import Espacios from "../components/Espacios"
import { useState } from "react"

export default function IndexPage() {

    const [espacios, setEspacios] = useState([])
    const [filtros, setFiltros] = useState({
        deporte: 'All',
        precio: 'All',
        precioMinimo: 0,
        precioMaximo: 1000
    })

    const filterEspacios = (espacios) => {
        return espacios.filter(espacio => {
          return (
            (filtros.precio === 'All' ||
            (espacio.precio >= filtros.precioMinimo &&
              espacio.precio <= filtros.precioMaximo)) &&
            (filtros.deporte === 'All' || espacio.deporte === filtros.deporte)
          );
        });
      };

    const filteredEspacios = filterEspacios(espacios)


    return (
        <main className=" dark:text-white w-[100%] flex flex-col justify-center items-center px-10 py-[80px] lg:py-[145px] grow">
            <section className="flex flex-col lg:flex-row justify-between w-full lg:w-[900px] text-centergap-10 lg:text-left px-10 lg:px-0 my-[150px] ">
                <aside className="flex flex-col justify-center items-start gap-5">
                    <h1 className="text-4xl lg:text-5xl font-bold">Pro-Sport</h1>
                    <h2 className="text-xl lg:text-2xl font-bold">Espacios para practicar tus deportes favoritos y realizar tu reserva online.</h2>
                </aside>
            </section>
            <Espacios changeFilters={setFiltros} espacios={filteredEspacios} setEspacios={setEspacios} filtros={filtros} setFiltros={setFiltros} />
        </main>

    )
}
