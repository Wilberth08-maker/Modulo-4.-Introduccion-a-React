import { Link } from 'react-router-dom';
import {logout} from '@/utils/auth'

// Navbar recibe el usuario actual y la función para actualizarlo como props
const Navbar = ({ user, setUser }) => {
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
            {/* Si el usuario está autenticado, muestra botón para cerrar sesión */}
            {user && (
                <>
                    <span className="text-gray-700 hidden sm:block">¡Hola, **{user.email.split('@')[0]}**!</span>
                    <button
                        onClick={() => {
                            //Elimina al usuario de mi localStorage
                            logout();
                            //Actualiza el estado del usuario a null (sesión cerrada)
                            setUser(null);
                        }}
                        className="px-4 py-2 bg-red-500 text-white rounded-full text-sm font-semibold hover:bg-red-600 transition-colors duration-300 shadow-md"
                    >
                        Cerrar Sesión
                    </button>
                </>
                
            )}
        </nav>
    )
}

export default Navbar;