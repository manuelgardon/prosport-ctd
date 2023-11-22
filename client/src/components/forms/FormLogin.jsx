
/* eslint-disable react/no-unescaped-entities */
import { Link, Navigate } from "react-router-dom"
import logo from '../../assets/logo.svg'
import axios from "axios"
import { useState, useContext } from "react"
import { UserContext } from "../../UserContext"
import Swal from "sweetalert2"
import "../../utils/utilsCSS.css"


const FormLogin = () => {

  const { setUser, user } = useContext(UserContext)
  const [email, setEmail] = useState('')
  const [contrasenia, setPassword] = useState('')
  const [redirect, setRedirect] = useState(false)

  
  async function handleLogin(e) {
    e.preventDefault()
    try {
      const { data } = await axios.post('http://localhost:1234/login', {
        email,
        contrasenia
      }, { withCredentials: true })
      setUser(data)
      setRedirect(true)
      Swal.fire({

        title:"Iniciaste sesion",
        icon: "success",
        background:"#212121",
        backdrop:true,
        color: "#00FF9D",
        allowOutsideClick:false,
        allowEscapeKey:true,
        allowEnterKey:true,
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#00FF9D",
        buttonsStyling: false,
        customClass:{
          popup:"swal-popu",
          confirmButton:"swal"
        },
      })
    } catch (error) {
      Swal.fire({

        title:"Error de inicio",
        text: error.message,
        icon: "error",
        background:"#212121",
        backdrop:true,
        color: "#00FF9D",
        allowOutsideClick:false,
        allowEscapeKey:true,
        allowEnterKey:true,
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#00FF9D",
        buttonsStyling: false,
        customClass:{
          popup:"swal-popu",
          confirmButton:"swal"
        },
      });
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />
  }

  return (
    <section className=" sm:pt[100px] grow">
      <div className="flex flex-col items-center justify-center px-6 py-[100px] mx-auto md:h-screen lg:py-0 ">
        <Link to={'/'} className="flex gap-2 items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img className="w-15 h-13 object-contain" src={logo} alt="logo" />
          
        </Link>
        {user && (
          <div>Ya tienes una cuenta iniciada, redirigete a <span><Link to={'/'}>Home</Link> y sigue explorando nuevos lugares</span></div>
        )}
        {!user && (

          <div className="w-full dark:border md:mt-0 sm:max-w-md xl:p-0mt-0 dark:bg-[#222B2A] dark:border-gray-700 ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8  ">
            <h1 className="text-[#17B289] text-xl font-normal tracking-widest md:text-2xl dark:text-white">
                INICIAR SESIÓN
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                <label className="text-[#8AB0A6] block mb-2 text-sm text-xl dark:text-white">Email</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-[#8AB0A6] bg-opacity-0 border-b-2 border-[#8AB0A6] text-[#8AB0A6] sm:text-sm block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="t u m a i l @ e m a i l . c o m" required="" />
                </div>
                <div>
                <label htmlFor="password" className="text-[#8AB0A6] block mb-2 text-sm text-xl dark:text-white">Contraseña</label>
                  <input type="password" value={contrasenia} onChange={(e) => setPassword(e.target.value)} placeholder="• • • • • • • • • • • • • • •" className="bg-[#8AB0A6] bg-opacity-0 border-b-2 border-[#8AB0A6] text-[#8AB0A6] sm:text-sm block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                  <Link to={'/'} className="tracking-widest text-[#8AB0A6] block mb-2 text-sm text-end dark:text-white" >Olvidé mi contraseña</Link>
                </div>
                <div className="flex flex-col items-center justify-center ">
                  <button type="submit" onClick={handleLogin} className="font-normal m-[30px] tracking-widest text-xl w-40 text-[#59B9A0] bg-[#8AB0A6] bg-opacity-20 border border-[#59B9A0] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-700 dark:hover:bg-green-500 dark:focus:ring-primary-800">INGRESAR</button>
                </div>
                <p className="flex flex-col items-center justify-center text-sm font-light text-gray-500 dark:text-gray-400">
                  <Link to={'/register'} className="tracking-widest text-[#8AB0A6] block mb-2 text-sm text-end dark:text-white" >Registrarse</Link>
                </p>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default FormLogin