import logo from '../assets/logo.svg'

export default function Footer() {
    return (

        <footer className="bottom-0 left-0 z-20 w-full p-4 shadow md:flex md:items-center md:justify-between md:p-6 mb-0 border-t-[1px] border-zinc-700">
            <section className="flex items-center gap-2">
                <img src={logo} alt='logo' className='w-11 h-11 object-contain'/>
                <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="#" className="hover:underline">Pro-Sport™</a>. All Rights Reserved.
                </span>
            </section>
            <section>
                <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                    <li>
                        <a href="#" className="mr-4 hover:underline md:mr-6">About</a>
                    </li>
                    <li>
                        <a href="#" className="mr-4 hover:underline md:mr-6">Privacy Policy</a>
                    </li>
                    <li>
                        <a href="#" className="mr-4 hover:underline md:mr-6">Licensing</a>
                    </li>
                    <li>
                        <a href="#" className="hover:underline">Contact</a>
                    </li>
                </ul>
            </section>
        </footer>

    )
}