/* eslint-disable react/prop-types */
import { FaRegCopy } from "react-icons/fa"

export default function CopiarLink({url}) {

    function handleCopiar() {
        navigator.clipboard.writeText(url);
    }
    
    return (
        <div className='flex p-2.5 border rounded-md mt-3'>
            <input type="text" value={url} className='p-2.5 outline-none w-full bg-transparent hover:text-green-500 transition-all duration-300 ease-in-out cursor-pointer' />
            <button onClick={handleCopiar} className='mr-3 cursor-pointer'><FaRegCopy size={20} className='hover:text-green-400 transition-all duration-300 ease-in-out' /></button>
        </div>
    )
}