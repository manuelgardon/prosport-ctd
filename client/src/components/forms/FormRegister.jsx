/* eslint-disable react/no-unescaped-entities */
import { Link, Navigate } from "react-router-dom"
import axios from 'axios'
import { useState } from "react";
import logo from '../../assets/logo.svg'
import emailjs from 'emailjs-com'
import Swal from "sweetalert2"
import "../../utils/utilsCSS.css"
import Politicas from "../Politicas";



export default function FormRegistro() {

  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [domicilio, setDomicilio] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [telefono, setTelefono] = useState('');
  const [dni, setDni] = useState('');
  const [contrasenia, setContrasenia] = useState('');
  const [redirect, setRedirect] = useState(false)

  async function registarUsuario() {
    try {
      const response = await axios.post('http://localhost:1234/registro', {
        nombre,
        apellido,
        email,
        domicilio,
        fechaNacimiento,
        telefono,
        dni,
        contrasenia
      })
      Swal.fire({

        title:"Registro completado!",
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
      });
      setRedirect(true)
      console.log(response.data)
      await sendWelcomeEmail();
    } catch (error) {
      Swal.fire({

        title:"Email ya está registrado",
        icon: "warning",
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
  emailjs.init("Blgi9VopKOYoDr-NN")
  
  if (redirect) {
    <Navigate to={'/'} />
  }

  const sendWelcomeEmail = async () => {
    // Envía el correo de bienvenida
    const templateParams = {
      to_email: email,
      user_name: `${nombre} ${apellido}`, // Utiliza el nombre y apellido del usuario
    };

    try {
      const response = await emailjs.send('service_l6prbvb', 'template_w88qplt', templateParams);
      console.log('Correo electrónico de bienvenida enviado con éxito:', response);
    } catch (error) {
      console.error('Error al enviar el correo electrónico de bienvenida:', error);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // Realiza el registro del usuario
    await registarUsuario();
  }

  const [aceptado, setAceptado] = useState(false);
  const [mostrarPoliticas, setMostrarPoliticas] = useState(false);

  const handleAceptoChange = () => {
    const nuevoEstado = !aceptado;
    setAceptado(nuevoEstado);
    setRegistroHabilitado(nuevoEstado);
  };

  const handleLeerPoliticasClick = () => {
    setMostrarPoliticas(!mostrarPoliticas);
  };
  const [registroHabilitado, setRegistroHabilitado] = useState(false);

  const handleAceptarPoliticas = (aceptado) => {
    setRegistroHabilitado(aceptado);
  };

  return (
    <section className="">
      <div className="flex flex-col items-center justify-center px-6 py-[100px] mx-auto">
        <Link to={'/'} className="flex gap-2 items-center mb-6 text-2xl font-semibold text-gray-900">
          <img className="w-15 h-13 object-contain" src={logo} alt="logo" />
        </Link>
        <div className="w-full rounded-lg dark:border md:mt-0 sm:max-w-md xl:p-0mt-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-[#17B289] text-xl font-normal tracking-widest md:text-2xl">
              REGISTRARSE
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleFormSubmit}>
            <div>
                <label className="text-[#8AB0A6] block mb-2 text-sm text-base">Nombre</label>
                <input type="text" value={nombre} onChange={(e => setNombre(e.target.value))} className="bg-[#8AB0A6] bg-opacity-0 border-b-2 border-[#8AB0A6] text-[#8AB0A6] sm:text-sm block w-full" placeholder="" required />
              </div>
              <div>
                <label className="text-[#8AB0A6] block mb-2 text-sm text-base dark:text-white">Apellido</label>
                <input type="text" value={apellido} onChange={(e => setApellido(e.target.value))} className="bg-[#8AB0A6] bg-opacity-0 border-b-2 border-[#8AB0A6] text-[#8AB0A6] sm:text-sm block w-full" placeholder="" required />
              </div>
              <div>
                <label className="text-[#8AB0A6] block mb-2 text-sm text-base">Fecha Nacimiento</label>
                <input type="date" value={fechaNacimiento} onChange={(e => setFechaNacimiento(e.target.value))} className="bg-[#8AB0A6] bg-opacity-0 border-b-2 border-[#8AB0A6] text-[#8AB0A6] sm:text-sm block w-full" placeholder="" required />
              </div>
              <div>
                <label className="text-[#8AB0A6] block mb-2 text-sm text-base">Domicilio</label>
                <input type="text" value={domicilio} onChange={(e => setDomicilio(e.target.value))} className="bg-[#8AB0A6] bg-opacity-0 border-b-2 border-[#8AB0A6] text-[#8AB0A6] sm:text-sm block w-full" placeholder=""  required/>
              </div>
              <div>
                <label className="text-[#8AB0A6] block mb-2 text-sm text-base">Teléfono</label>
                <input type="tel" value={telefono} onChange={(e => setTelefono(e.target.value))} className="bg-[#8AB0A6] bg-opacity-0 border-b-2 border-[#8AB0A6] text-[#8AB0A6] sm:text-sm block w-full" placeholder="" required />
              </div>
              <div>
                <label className="text-[#8AB0A6] block mb-2 text-sm text-base">DNI</label>
                <input type="number" value={dni} onChange={(e => setDni(e.target.value))} className="bg-[#8AB0A6] bg-opacity-0 border-b-2 border-[#8AB0A6] text-[#8AB0A6] sm:text-sm block w-full" placeholder="" required />
              </div>
              <div>
                <label className="text-[#8AB0A6] block mb-2 text-sm text-base">Email</label>
                <input type="email" value={email} onChange={(e => setEmail(e.target.value))}
                  className="bg-[#8AB0A6] bg-opacity-0 border-b-2 border-[#8AB0A6] text-[#8AB0A6] sm:text-sm block w-full" placeholder="" required />
              </div>
              <div>
                <label htmlFor="password" className="text-[#8AB0A6] block mb-2 text-sm text-base dark:text-white">Contraseña</label>
                <input type="password" value={contrasenia} onChange={(e => setContrasenia(e.target.value))} placeholder="• • • • • • • • • • • • • • •" className="bg-[#8AB0A6] bg-opacity-0 border-b-2 border-[#8AB0A6] text-[#8AB0A6] sm:text-sm block w-full" required />
              </div>
              <p className="text-[#E1E1E1] text-sm">Debes aceptar nuestras políticas de uso para crear una cuenta</p>
              <button className="text-[#FF9B27] space-y-4 md:space-y-6 sm:p-2" onClick={handleLeerPoliticasClick}>Leer políticas</button>
              {mostrarPoliticas && (     
                <Politicas onAceptarPoliticas={handleAceptarPoliticas} />
              )}
              <label className='flex'>
                <input type="checkbox" checked={aceptado} onChange={handleAceptoChange} />
                <p className="text-white m-5">Acepto las políticas</p>
              </label>
              {registroHabilitado && (
                <div>
                  {<div className="flex flex-col items-center justify-center">
                    <button type="submit" className="font-normal m-[30px] tracking-widest text-xl w-60 h-35 text-[#59B9A0] bg-[#8AB0A6] bg-opacity-20 border border-[#59B9A0] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg text-sm px-5 py-2.5 text-center">CREAR CUENTA</button>
                  </div>}
                </div>
              )}                
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