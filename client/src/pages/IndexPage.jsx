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

        <main className="dark:bg-[#081b27] dark:text-white w-900 flex justify-center items-center px-10 py-[100px] lg:py-[145px]">
            <ul className="grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                {characters.length > 0 && characters.splice(0, 10).map(character => (
                    <li key={character.id}>
                        <img src={character.image} alt={character.name} />
                        <p>{character.name}</p>
                        <p>{character.species}</p>
                    </li>
                ))}
            </ul>
        </main>

    )
}