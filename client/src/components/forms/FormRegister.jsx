import { useState } from "react"


const FormRegister = () => {
    const [info, setInfo] = useState({
        nombre:"",
        apellido:"",
        email:"",
        celular:"",
        dni:"",
        fechaNacimiento:"",
        contraseña:"",
        reContraseña:"",
        imagen:"",
      })
    
      const [data, setData] = useState([])
    
      
    
      const handleChange = (e) => {
        setInfo({...info,[e.target.name]: e.target.value})
      }

      const buttom ="border-none w-50 bg-white text-black rounded-xl px-3 mb-2 font-semibold"
      return (
      <div className="min-h-screen bg-green-500 flex flex-col items-center justify-center">
        <section className="w-80 flex flex-col items-center">
            <h2 className="text-4xl mb-5 font-bold text-white">Registrate</h2>

        <form className="text-center">
            <input type="text" onChange={handleChange} name="nombre" placeholder="Nombre" className={buttom}/>
            <input type="text" onChange={handleChange} name="apellido" placeholder="Apellido" className={buttom} />
            <input type="email" onChange={handleChange} name="email" placeholder="Email" className={buttom}/>
            <input type="text" onChange={handleChange} name="celular" placeholder="Celular" className={buttom}/>
            <input type="text" onChange={handleChange} name="dni" placeholder="DNI" className={buttom}/>
            <input type="text" onChange={handleChange} name="fechaNacimiento" placeholder="Fecha de nacimiento" className={buttom}/>
            <input type="password" onChange={handleChange} name="contraseña" placeholder="Contraseña" className={buttom}/>
            <input type="password" onChange={handleChange} name="reContraseña" placeholder="Repetir contraseña" className={buttom}/>
            <input type="text" placeholder="Adjuntar archivo"className={buttom}/>
    
            <button type="submit" className="w-40 bg-white text-black mt-4">Continuar</button>
    
        </form>
        </section>
      </div>
      )
}

export default FormRegister