import { useState } from "react"

const FormPayment = () => {
    const [info, setInfo] = useState({
        numTarjeta:"",
        nombre:"",
        apellido:"",
        codigoSeguridad:"",
        dni:"",
        fechaVencimiento:"",
      })

    const handleChange = (e) => {
        setInfo({...info,[e.target.name]: e.target.value})
        console.log(info);
      }
      const buttom ="border-none w-50 bg-white text-black rounded-xl px-3 mb-2 font-semibold"

  return (
  <div className='min-h-screen bg-green-500 flex flex-col items-center justify-center'>
    <section className='w-80 flex flex-col items-center'>
        <h2 className='text-4xl mb-5 font-bold text-white'>Metodo de pago</h2>
        <h3 className='text-2xl mb-5 font-bold text-white'>¡Anticipa y elegi tus metodos de pago para que puedas reservar mas rapido!</h3>
        <form action="" className='text-center'>
            <input type="text" onChange={handleChange} placeholder='Num de tarjeta' name='numTarjeta' className={buttom}/>
            <input type="text" onChange={handleChange} placeholder='Nombre' name='nombre' className={buttom}/>
            <input type="text" onChange={handleChange} placeholder='Apellido' name='apellido' className={buttom}/>
            <input type="text" onChange={handleChange} placeholder='Codigo de seguridad' name='codigoSeguridad' className={buttom}/>
            <input type="text" onChange={handleChange} placeholder='Fecha de vencimiento' name='fechaVencimiento' className={buttom}/>
            <input type="text" onChange={handleChange} placeholder='DNI titular' name='dni' className={buttom}/>
            <button className="w-40 bg-white text-black mt-4 mx-4 " >Añadir tarjeta</button>
            <button className="w-40 bg-white text-black mt-4">Omitir</button>
        </form>
    </section>
  </div>
  )
}

export default FormPayment