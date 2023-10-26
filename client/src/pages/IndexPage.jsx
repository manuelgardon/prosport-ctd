import { useEffect, useState } from "react"
import axios from "axios"

export default function IndexPage() {

    const [espacios, setEspacios] = useState([])

    useEffect(() => {
        axios.get('http://localhost:1234/api/espacios').then((response) => {
            setEspacios(response.data)
        })
    }, [])


    return (

        <main className="dark:bg-[#18181B] dark:text-white w-900 flex justify-center items-center px-10 py-[100px] lg:py-[145px] grow">
            <ul className="grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 text-center">
                {espacios.length > 0 && espacios.slice(0, 10).map(espacio => (
                    <li key={espacio._id}>
                        <div className="rounded-2xl mb-2 flex">
                            {espacio.fotos?.[0] && (
                                <img className="rounded-2xl object-cover aspect-square" src={'http://localhost:1234/uploads/' + espacio.fotos[0]} alt="" />
                            )}
                        </div>
                        <p className="bg-[#1D2223] text-[#17B289] text-2xl">{espacio.nombre}</p>
                        <p className=" bg-[#1D2223] border-2 border-[#FF9B27] text-[#FF9B27] rounded-b">{espacio.deporte}</p>
                    </li>
                ))}
            </ul>
        </main>

    )
}