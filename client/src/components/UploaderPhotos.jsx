/* eslint-disable react/prop-types */
import axios from "axios"
import { UploadIcon } from "./icons"

export function UploaderPhotos({fotosAgregadas, onChange}) {

    function uploadPhoto(event) {
        const files = event.target.files
        const data = new FormData()
        for (let i = 0; i < files.length; i++) {
            data.append('fotos ', files[i])
        }
        axios.post('http://localhost:1234/upload', data, {
            headers: { 'Content-Type':'multipart/form-data' }
        }).then(response => {
            const { data: fileNames } = response
            onChange(prev => {
                return [...prev, ...fileNames]
            })
        })
    } 


    return (
        <>
            <div className="flex gap-2">
            </div>
            <div className=" mt-3 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6 ">
                {fotosAgregadas.length > 0 && fotosAgregadas.map(link => (
                    <div className="h-32 flex relative" key={link}>
                        <img className='w-full rounded-2xl' src={'http://localhost:1234/uploads/' + link} alt="" />
                    </div>
                )
                )}
                <label className=" flex justify-center items-center gap-4 border bg-transparent rounded-2xl p-6 text-gray-900 font-semibold cursor-pointer">
                    <input type="file" multiple className="hidden" onChange={uploadPhoto} />
                    <UploadIcon />
                    Agrega fotos del espacio
                </label>
            </div>
        </>
    )
}