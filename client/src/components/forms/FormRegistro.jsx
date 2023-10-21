import { useState } from "react"


const FormRegistro = () => {
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
        console.log(info);
      }
      return (
        <form >
            <h2>Registrate</h2>
            <label htmlFor="">Nombre:</label>
            <input type="text" onChange={handleChange} name="nombre" />
            <label htmlFor="">Apellido:</label>
            <input type="text" onChange={handleChange} name="apellido" />
            <label htmlFor="" >Email:</label>
            <input type="email" onChange={handleChange} name="email" />
            <label htmlFor="" >Celular:</label>
            <input type="text" onChange={handleChange} name="celular" />
            <label htmlFor="" >DNI:</label>
            <input type="text" onChange={handleChange} name="dni" />
            <label htmlFor="" >Fecha de nacimiento:</label>
            <input type="text" onChange={handleChange} name="fechaNacimiento"/>
            <label htmlFor="" >Contraseña:</label>
            <input type="password" onChange={handleChange} name="contraseña"/>
            <label htmlFor="" >Repetir Contraseña:</label>
            <input type="password" onChange={handleChange} name="reContraseña"/>
            <label htmlFor="" >Adjuntar foto: </label>
            <input type="text" />
    
        <button type="submit">Continuar</button>
    
        </form>
      )
}

export default FormRegistro