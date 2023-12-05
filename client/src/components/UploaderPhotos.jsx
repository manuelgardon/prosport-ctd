/* eslint-disable react/prop-types */
import axios from "axios"
import { UploadIcon } from "./icons"
import { FaRegTrashAlt } from "react-icons/fa"
import { FaRegHeart } from "react-icons/fa"
import { FaHeart } from "react-icons/fa"

export default function UploaderPhotos({ fotosAgregadas, onChange }) {

    function uploadPhoto(event) {
        const files = event.target.files
        const data = new FormData()
    
        for (let i = 0; i < files.length; i++) {
            data.append('fotos', files[i])
        }
    
        const fileNames = Array.from(files).map(file => file.name)
    
        axios.post('http://54.219.42.160:8085/uploads', data, {
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(response => {
            console.log(response)
            const { data: { success } } = response
            if (success) {
                onChange(prev => [...prev, ...fileNames])
            } else {
                console.error('Error al cargar las fotos', response.data)
            }
        }).catch(error => {
            console.error('Error al subir las imagenes:', error)
        });
    }

    function eliminarFoto(archivo, event) {
        event.preventDefault();
        onChange([...fotosAgregadas.filter(foto => foto !== archivo)])
    }

    function seleccionarPrincipal(archivo, event) {
        event.preventDefault();
        const fotosNoSeleccionadas = fotosAgregadas.filter(foto => foto !== archivo)
        const nuevasFotos = ([archivo, ...fotosNoSeleccionadas])
        onChange(nuevasFotos)
    }

    return (
        <>
            <div className="flex gap-2">
                <div className=" ">
                    {fotosAgregadas.length > 0 && fotosAgregadas.map(foto => (
                        <div className="h-32 flex relative" key={foto}>
                            <img className='w-full rounded-2xl' src={`https://1023c07-prosport.s3.amazonaws.com/${foto}`} alt="" />
                            <button className="absolute top-2 right-2" onClick={(e) => eliminarFoto(foto, e)}>
                                <FaRegTrashAlt />
                            </button>
                            <button className="absolute bottom-2 right-2" onClick={(e) => seleccionarPrincipal(foto, e)}>
                                {foto === fotosAgregadas[0] ? <FaHeart/> : <FaRegHeart/>}
                            </button>
                        </div>
                    )
                    )}
                    <label className="w-90 flex justify-center items-center gap-4 border bg-transparent rounded-2xl p-6 text-white font-semibold cursor-pointer">
                        <input type="file" multiple className="hidden" onChange={uploadPhoto} />
                        <UploadIcon />
                        Agrega fotos del espacio
                    </label>
                </div>
            </div>
        </>
    )
}