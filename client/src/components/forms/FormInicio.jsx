import { useState } from "react"
import { Link } from "react-router-dom"


const FormInicio = () => {

  const [info, setInfo] = useState({
    email:"",
    contraseña:""
  })

  const [data, setData] = useState([])

  

  const handleChange = (e) => {
    setInfo({...info,[e.target.name]: e.target.value})
    console.log(info);
  }
  return (
    <form >
      <h2>Iniciar sesion</h2> 
    <label htmlFor="" >Email:</label>
    <input type="email" onChange={handleChange} name="email" />
    <label htmlFor="" >Contraseña:</label>
    <input type="password" onChange={handleChange} name="contraseña"/>

    <button type="submit">Iniciar sesion</button>
    {/* <div>No tienes una cuenta? <Link to={"/register"}>Registrate</Link></div> */}


    </form>
  )
}

export default FormInicio