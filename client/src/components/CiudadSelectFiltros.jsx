/* eslint-disable react/prop-types */
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import { useState } from 'react'
import IconSearch, { IconCursorFill } from './icons'
export default function CiudadSelectIndex({ onChange }) {

    const [ciudad, setCiudad] = useState('')

    function handleChangeCiudad(ciudad) {
        setCiudad(ciudad)
        if (ciudad === '') {
            onChange('')
        }
    }

    async function handleSelectCiudad(ciudad) {
        const results = await geocodeByAddress(ciudad)
        const latLng = await getLatLng(results[0])
        console.log(latLng)
        setCiudad(ciudad)
        onChange(ciudad)
    }

    return (<div className='w-screen'>

        <PlacesAutocomplete
            value={ciudad} onChange={handleChangeCiudad} onSelect={handleSelectCiudad}
        >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div className="text-black w-full flex flex-col items-center relative">
                    <div className='relative'>
                        <IconSearch />
                        <input className='w-[500px] mb-2 my-1 py-2 px-12 rounded-2xl bg-[#131315] h-15 border-[#D08023] border-2 text-[#D08023]'
                        {...getInputProps({
                            placeholder: 'Selecciona la ciudad de tu espacio',    
                        })}/>
                        <IconCursorFill />
                    </div>
                    <div className="w-200 mt-2 bg-[#131315] border rounded z-10 text-[#D08023] absolute top-12 border-none">
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
    </div>
    );
}