import logo from '../assets/logo.svg'
import { Link } from "react-router-dom"

export default function Footer() {
    return (

        <footer className="bottom-0 left-0 z-20 w-full p-4 shadow sm:flex-col md:flex md:items-center md:justify-between md:p-6 mb-0 border-t-[1px] border-zinc-700">
  <section className="flex flex-col items-center gap-2 order-1 sm:order-2 my-6">
    <img src={logo} alt="logo" className="w-11 h-11 object-contain" />
    <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="#" className="hover:underline">Pro-Sport™</a>. All Rights Reserved.</span>
  </section>
  <section className="flex items-center justify-center order-2 sm:order-1">
    <Link to={"/politicas"} className="tracking-widest text-[#8AB0A6] block mb-2 text-sm text-end hover:underline">Políticas ProSport</Link>
  </section>
</footer>

    )
}