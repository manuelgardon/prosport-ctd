import Espacios from "../components/Espacios"
import { useState } from "react"

export default function IndexPage() {

    const [espacios, setEspacios] = useState([])
    const [filtros, setFiltros] = useState({
        deporte: 'All'
    })

    const filterEspacios = (espacios) => {
        return espacios.filter(espacio => {
            return (
                filtros.deporte === 'All' || espacio.deporte === filtros.deporte 
            )
        })
    }

    const filteredEspacios = filterEspacios(espacios)


    return (
        <Espacios changeFilters={setFiltros} espacios={filteredEspacios} setEspacios={setEspacios} filtros={filtros} setFiltros={setFiltros}/>
    )
}