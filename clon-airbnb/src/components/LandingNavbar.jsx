import { Link } from 'react-router-dom';

// Navbar recibe el usuario actual y la función para actualizarlo como props
const LandingNavbar = ({user}) => {
    return (
        //contenedor principal de la barre de navagación
        <nav className="bg-white shadow-sm p-4 flex items-center justify-between border-b border-gray-100">
            <div className="space-x-4 flex items-center">
                <Link 
                to="/"
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-full text-sm font-medium transition-colors duration-300">Inicio</Link>
                {/* solo se muestran estos links si el usuario NO está autenticado  */}
                {!user && <Link 
                to="/login"
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-full text-sm font-medium transition-colors duration-300">Login</Link>}
                {!user && <Link 
                to="/signup"
                className="px-4 py-2 bg-red-500 text-white rounded-full text-sm font-semibold hover:bg-red-600 transition-colors duration-300 shadow-md">Registro</Link>}
            </div>
        </nav>
    )
}

export default LandingNavbar;