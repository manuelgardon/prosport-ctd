/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'


export default function CiudadSelect({ ciudad, onChange }) {
    const [inputCiudad, setInputCiudad] = useState(ciudad)

    // logramos que persista el valor del estado del input y no se borre
    useEffect(()=>{
        setInputCiudad(ciudad)
    }, [ciudad])

    function handleChangeCiudad(ciudad) {
        setInputCiudad(ciudad)
        if (ciudad === '') {
            onChange('')
        }
    }

    async function handleSelectCiudad(ciudad) {
        const results = await geocodeByAddress(ciudad)
        const latLng = await getLatLng(results[0])
        console.log(latLng)
        setInputCiudad(ciudad)
        onChange(ciudad)
    }

    return (
        <PlacesAutocomplete value={inputCiudad} onChange={handleChangeCiudad} onSelect={handleSelectCiudad}>
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div className="relative text-black">
                    <input
                        {...getInputProps({
                            placeholder: 'Selecciona la ciudad de tu espacio',
                            className: 'w-full mb-2 border my-1 py-2 px-3 rounded-2xl text-black',
                        })}
                    />
                    <div className="absolute w-full mt-2 bg-white border rounded z-10">
                        {loading && <div className="p-2">Cargando...</div>}
                        {suggestions.map((suggestion) => (
                            <div
                                {...getSuggestionItemProps(suggestion)}
                                key={suggestion.placeId}
                                className="p-2 cursor-pointer hover:bg-gray-100 z-50"
                            >
                                {suggestion.description}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </PlacesAutocomplete>
    )
}