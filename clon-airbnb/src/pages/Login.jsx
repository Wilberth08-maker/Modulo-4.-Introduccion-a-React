import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '@/utils/auth'
import { Link } from 'react-router-dom';

// Componente login recibe setUser como prop para actualizar la sesión
const Login = ({ setUser }) => {
    // Estados para capturar o guardar el email, la contraseña y los errores del formulario
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    // Hook para redirigir a otra ruta después del login
    const navigate = useNavigate()

    // Función que se ejecuta cuando envío el formulario 
    const handleSubmit = (e) => {
        // Prevenir que se recargue la página cuando implementamos formularios.
        e.preventDefault(); 

        // VALIDADIONES
        // Validación: todos los campos esten completos 
        if (!email || !password) {
            setError("Email o Contraseña inválidos");
            return;
        }

        // Validación básica: email debe contener el signo @ y la contraseña deber tener como mínimo 7 caracteres
        if (!email.includes("@") || password.length < 7) {
            setError("Email o Contraseña inválidos")
            return;
        }

        // Simulación de inicio de sesión exitoso
        try {
            const user = login(email, password); // Validación 
            setUser(user);                       // Guardar en estado global
            navigate("/");
        } catch (err) {
            setError(err.message);              // muestra el mensaje de error
        }
    }

    return (
        <div className="max-w-md w-full mx-auto p-8 rounded-xl shadow-lg bg-white mt-10 mb-10 md:mt-20 md:mb-20">
            <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-900">Iniciar Sesión</h2>

            {/* Muestra mensaje de error en caso de existir */}
            {error && (
                <p className="mb-6 text-red-500 font-semibold text-center text-sm">{error}</p>
            )}

            {/* Formulario de login */}
            <form className="space-y-6" onSubmit={handleSubmit}>
                {/* campo de correo */}
                <div>
                    <label htmlFor="email" className="block mb-2 font-medium text-gray-700">
                        Correo Electrónico
                    </label>
                    <input
                        id="email"
                        type="email"
                        placeholder="usuario@ejemplo.com"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition duration-200"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="username"
                        required
                    />
                </div>

                {/* campo de contraseña */}
                <div>
                    <label htmlFor="password" className="block mb-2 font-medium text-gray-700">
                        Contraseña
                    </label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Ingresa tu contraseña"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition duration-200"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
                        required
                    />
                </div>

                {/* Botón para enviar el formulario */}
                <button
                    type="submit"
                    className="w-full py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors duration-300 shadow-md transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                >
                    Iniciar Sesión
                </button>
            </form>
            {/* Enlace a registro */}
                <p className="mt-8 text-center text-gray-600 text-sm">
                    ¿No tienes una cuenta?{' '}
                    <Link to="/signup" className="text-red-500 hover:text-red-600 font-semibold hover:underline">
                    Regístrate aquí
                    </Link>
                </p>
        </div>
    )
}

export default Login;