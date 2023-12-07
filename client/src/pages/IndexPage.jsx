import Espacios from "../components/Espacios"
import { useState } from "react"
import CiudadSelectIndex from "../components/CiudadSelectFiltros"
import Carrusel from "../components/Carrusel"

export default function IndexPage() {

  const [espacios, setEspacios] = useState([])
  const [filtros, setFiltros] = useState({
    deporte: 'All',
    precio: 'All',
    precioMinimo: 0,
    precioMaximo: 1000,
    ciudad: ''
  })

  const filterEspacios = (espacios) => {
    return espacios.filter((espacio) => {
      return (
        (filtros.precio === 'All' ||
          (espacio.precio >= filtros.precioMinimo &&
            espacio.precio <= filtros.precioMaximo)) &&
        (filtros.deporte === 'All' || espacio.deporte === filtros.deporte) &&
        (filtros.ciudad === '' || espacio.ciudad === filtros.ciudad)
      )
    })
  }

  const filteredEspacios = filterEspacios(espacios)


  return (
    <main className="text-white w-[100%] flex flex-col justify-center items-center px-10 py-[80px] lg:py-[145px]  ">
      <Carrusel />
      <CiudadSelectIndex onChange={(ciudad) => setFiltros((prevFiltros) => ({ ...prevFiltros, ciudad }))} />
      <Espacios changeFilters={setFiltros} espacios={filteredEspacios} setEspacios={setEspacios} filtros={filtros} setFiltros={setFiltros} />
    </main>

  )
}
