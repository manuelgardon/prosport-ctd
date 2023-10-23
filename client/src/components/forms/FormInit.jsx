import { useState } from "react"



const FormInit = () => {

  const [info, setInfo] = useState({
    email:"",
    contraseña:""
  })

  const [data, setData] = useState([])

  

  const handleChange = (e) => {
    setInfo({...info,[e.target.name]: e.target.value})
    
  }
  return (
  <div className="min-h-screen bg-green-500 flex flex-col items-center justify-center">
    <section className="w-80 flex flex-col items-center">
      <h2 className="text-4xl mb-5 font-bold">Iniciar sesion</h2> 
      <form className="text-center">
        
        <input type="email" onChange={handleChange} name="email" className="border-none w-50 bg-white text-black rounded-xl px-3 my-2 font-semibold" placeholder="Email"/>
        
        <input type="password" onChange={handleChange} name="contraseña" className="border-none w-50 bg-white text-black rounded-xl mb-2 px-3 font-semibold" placeholder="Contraseña"/>

        <button type="submit" className="w-40 bg-white text-black mt-4">Iniciar sesion</button>
    {/* <div>No tienes una cuenta? <Link to={"/register"}>Registrate</Link></div> */}
    </form>

    </section>
  </div>
  )
}

export default FormInit