import { Link } from "react-router-dom";

export default function FormLogin() {
    return (
        <div className="min-h-screen bg-green-700 flex flex-col items-center justify-center">
            <div className="w-80 flex flex-col items-center">
               <h2 className="text-2xl mb-5 font-bold text-white">Iniciar Sesión</h2>
               <form className="text-center">
                <input type="email" placeholder="Email" className="bg-[#18181b] border-none mb-3 text-center w-full rounded-xl"/>
                <input type="password" placeholder="Contraseña"
                className="bg-[#18181b] border-none mb-3 w-full p-1"/>
                <button className="bg-white text-red-700 px-4 py-2 rounded mt-2 hover:bg-yellow-300">Ingresar</button>
                <div className="mt-3">
                    <span>Dont have an account yet?</span>
                    <strong><Link to={'/register'} className="underline">Register now</Link></strong>
                </div>
               </form>
            </div>
        </div>
    );
}

