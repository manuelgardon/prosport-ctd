import { useContext, useEffect, useState } from 'react'
import { getInitials } from '../utils/utils'
import logo from '../assets/logo.svg'
import axios from 'axios'
import { Link, Navigate } from "react-router-dom"
import { UserContext } from '../UserContext'
import { COOKIE_EXPIRED } from '../utils/utils'
import Cookies from 'js-cookie'

export default function Header() {

    const { user, setUser } = useContext(UserContext)
    const [scrolling, setScrolling] = useState(false)
    // const [redirect, setRedirect] = useState(false)
    const [isMenuOpen, setMenuOpen] = useState(false);
    const usuarioId = user?._id


    const handleMenuToggle = () => {
        setMenuOpen(!isMenuOpen);
      };
    
      useEffect(() => {
        const handleScroll = () => {
          setScrolling(window.scrollY > 0);
        };
    
        window.addEventListener('scroll', handleScroll);
    
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);
    
      useEffect(() => {
        const menuToggle = document.getElementById('mobile-menu');
    
        if (menuToggle) {
          menuToggle.addEventListener('click', handleMenuToggle);
    
          return () => {
            menuToggle.removeEventListener('click', handleMenuToggle);
          };
        }
      }, [handleMenuToggle]);


    async function logOut() {
        try {
            await axios.post('http://localhost:1234/api/logout')
            document.cookie = COOKIE_EXPIRED
            Cookies.remove(`favoritos_${usuarioId}`)
            setUser(null)
            window.location.reload()
            return <Navigate to={'/'} />
        } catch (error) {
            console.error('Error al hacer logout', error)
        }
    }

    return (
        <header className={`flex w-full justify-around pt-5 ${scrolling ? 'bg-opacity-90 backdrop-blur-md' : ''}`}>
            <div><Link to={'/'} >
              <img src={logo} className="h-9 sm:h-12" alt="Flowbite Logo" /></Link>
            </div>
            <nav className="hidden md:flex items-center space-x-4">
                
                {user ? (
                    <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0 justify-between items-center">
                        <a href="#" className="text-[#A8F2DE] font-semibold text-xl hover:font-bold font-l rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none hover:underline"><Link to={'/'}>Inicio</Link></a>
                        <a href="#" className="text-[#A8F2DE] font-semibold text-xl hover:font-bold font-l rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none hover:underline"><Link to={'/account/espacios'}>Mis Espacios</Link></a>
                        <a href="#" className="text-[#A8F2DE] font-semibold text-xl hover:font-bold font-l rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none hover:underline"><Link to={'account/reservas'}>Mis reservas</Link></a>
                        <a href="#" className="text-[#A8F2DE] font-semibold text-xl hover:font-bold font-l rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none hover:underline"><Link to={'account/favoritos'}>Mis favoritos</Link></a>
                        <a href="#"><button className="text-[#A8F2DE] font-semibold text-xl hover:font-bold font-l rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none hover:underline" onClick={logOut}><Link to={'/'}>Cerrar sesión</Link></button></a>
                    
                    {user.nombre && (
                    <div className="profile-image w-10 h-10 bg-blue-500 rounded-full flex justify-center    items-center text-white text-xl font-semibold">{getInitials(user.nombre, user.apellido)}
                    </div>
                    )}
                    </ul>
                    ) :
                    (   
                    <div className="flex items-center lg:order-2">
                        <Link to={'/login'} className="text-[#A8F2DE] font-semibold text-xl hover:font-bold font-l rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none hover:underline">Iniciar sesión</Link>

                        <Link to={'/register'} className="text-[#A8F2DE] font-semibold text-xl hover:font-bold font-l rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none hover:underline">Crear cuenta</Link>
                    </div>
                )
                } 
            </nav>
        
            <div className="md:hidden cursor-pointer" id="mobile-menu">
                <svg className="w-9 h-9 rounded-2 text-[#FF9B27]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                </svg>
            </div>

            {isMenuOpen && (
        <div className="">
            {user ? (
          <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0 justify-between items-center">
                        <a href="#" className="text-[#A8F2DE] font-semibold text-xl hover:font-bold font-l rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none hover:underline"><Link to={'/'}>Inicio</Link></a>
                        <a href="#" className="text-[#A8F2DE] font-semibold text-xl hover:font-bold font-l rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none hover:underline"><Link to={'/account/espacios'}>Mis Espacios</Link></a>
                        <a href="#" className="text-[#A8F2DE] font-semibold text-xl hover:font-bold font-l rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none hover:underline"><Link to={'account/reservas'}>Mis reservas</Link></a>
                        <a href="#" className="text-[#A8F2DE] font-semibold text-xl hover:font-bold font-l rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none hover:underline"><Link to={'account/favoritos'}>Mis favoritos</Link></a>
                        <a href="#"><button className="text-[#A8F2DE] font-semibold text-xl hover:font-bold font-l rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none hover:underline" onClick={logOut}><Link to={'/'}>Cerrar sesión</Link></button></a>
                        </ul>   
                        ) : ( 
                            <div className="flex items-center lg:order-2">
                    <Link to={'/login'} className="text-[#A8F2DE] font-semibold text-xl hover:font-bold font-l rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none hover:underline">Iniciar sesión</Link>
    
                    <Link to={'/register'} className="text-[#A8F2DE] font-semibold text-xl hover:font-bold font-l rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none hover:underline">Crear cuenta</Link>
                </div>
       
       )}
            
            </div>
      )}
        </header>
    )
}