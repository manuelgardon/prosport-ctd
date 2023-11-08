/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom"
import axios from 'axios'
import { useState } from "react";
import logo from '../../assets/logo.svg'

const FormRegister = () => {

  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [domicilio, setDomicilio] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [telefono, setTelefono] = useState('');
  const [dni, setDni] = useState('');
  const [contrasenia, setContrasenia] = useState('');

  async function registerUser(e) {
    e.preventDefault()
    await axios.post('http://localhost:1234/registro', {
      nombre,
      apellido,
      email,
      domicilio,
      fechaNacimiento,
      telefono,
      dni,
      contrasenia
    })
    alert('Register done!')
  }

  return (
    <section className=" grow">
      <div className="flex flex-col items-center justify-center px-6 pt-[100px] md:h-screen lg:pt-0">
        <Link to={'/'} className="flex gap-2 items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img className="w-9 h-9 object-contain" src={logo} alt="logo" />
          Pro-Sport
        </Link>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0mt-0  dark:bg-[#222B2A] dark:border-gray-700 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8  ">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Crea una cuenta nueva
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={registerUser}>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tu nombre</label>
                <input type="text" value={nombre} onChange={(e => setNombre(e.target.value))} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@email.com" required />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tu Apellido</label>
                <input type="text" value={apellido} onChange={(e => setApellido(e.target.value))} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@email.com" required />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fecha Nacimiento</label>
                <input type="text" value={domicilio} onChange={(e => setDomicilio(e.target.value))} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="XXXXXXXXXXXXXX" required />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tu domicilio</label>
                <input type="text" value={fechaNacimiento} onChange={(e => setFechaNacimiento(e.target.value))} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@email.com" required />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tu telefono</label>
                <input type="tel" value={telefono} onChange={(e => setTelefono(e.target.value))} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@email.com" required />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tu dni</label>
                <input type="number" value={dni} onChange={(e => setDni(e.target.value))} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="XXXXXXXXXXXXXX" required />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tu email</label>
                <input type="email" value={email} onChange={(e => setEmail(e.target.value))}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@email.com" required />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
                <input type="password" value={contrasenia} onChange={(e => setContrasenia(e.target.value))} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
              </div>
              <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-700 dark:hover:bg-green-500 dark:focus:ring-primary-800">Sign in</button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                ¿Tienes una cuenta?<Link to={'/login'} className="font-medium text-primary-600 hover:underline dark:text-primary-500 px-1" >Inicia Sesión</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FormRegister