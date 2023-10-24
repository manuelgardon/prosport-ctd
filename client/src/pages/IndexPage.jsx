import { useEffect, useState } from "react"

export default function IndexPage() {

    const [characters, setCharacters] = useState([])

    useEffect(() => {
        fetch('https://rickandmortyapi.com/api/character')
            .then(response => response.json())
            .then(data => {
                setCharacters(data.results)
            }) 
    }, [])

    return (

        <main className="dark:bg-[#18181B] dark:text-white w-900 flex justify-center items-center px-10 py-[100px] lg:py-[145px]">
            <ul className="grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 text-center">
                {characters.length > 0 && characters.splice(0, 10).map(character => (
                    <li key={character.id} className="">
                        <div className="flex rounded-t-xl relative">

                        <img src={character.image} alt={character.name} className="rounded-t border-collapse"/>
                        <img src="src/Icons/Like.png" alt="" className="w-5 h-5 my-2 absolute right-3"/>
                        
                        </div>
                       

                        <p className="bg-[#1D2223] text-[#17B289] text-2xl">{character.name}</p>
                        <p className=" bg-[#1D2223] border-2 border-[#FF9B27] text-[#FF9B27] rounded-b">{character.species}</p>
                        
                    </li>
                ))}
            </ul>
        </main>

    )
}