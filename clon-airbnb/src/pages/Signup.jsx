import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../utils/auth";

// Componente signup (registro)
const Signup = () => {
    // Estados para capturar/guardar el email, la contraseña y los errores del formulario
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [error, setError] = useState("");

    // Hook para redirigir a otra ruta después del login
    const navigate = useNavigate()

    // Función que se ejecuta cuando envío el formulario 
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevenir que se recargue la página cuando implementamos formularios.
        // VALIDACIONES
        // Validación: todos los campos esten completos 
        if (!email || !password || !confirmPass) {
            setError("Completa todos los campos");
            return;
        }

        // Valida que el email tenga formato básico
        if (!email.includes("@")) {
            setError("Email Inválido")
            return;
        }

        // Valida que la contraseña tenga al menos 7 caracteres
        if (password.length < 7) {
            setError("La contraseña debe tener al menos 7 caracteres")
            return;
        }

        // Verificar que la contraseña coincida
        if (password !== confirmPass) {
            setError("Las contraseñas no coinciden")
            return;
        }

        try{
            registerUser(email, password);

            // si pasa todas las validaciones, limpia el error
            setError("");        

            // simula un registro exitoso con un alert
            alert("Registro exitoso, ahora puedes iniciar sesión.")

            // Redirigir al usuario al login
            navigate("/login")
        }
        catch(err){
            setError(err.message);
        }
        
    }


    return (
        <div className="max-w-md w-full mx-auto p-8 rounded-xl shadow-lg bg-white mt-10 mb-10 md:mt-20 md:mb-20">
            <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-900">Crear Cuenta</h2>

            {/* Muestra mensaje de error en caso de existir */}
            {error && (
                <p className="mb-6 text-red-500 font-semibold text-center text-sm">{error}</p>
            )}

            {/* Formulario de registro */}
            <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Campo de correo */}
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
                        autoComplete="email"
                        required
                    />
                </div>


                {/* Campo de contraseña */}
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
                        autoComplete="new-password"
                        required
                    />
                </div>

                {/* campo para confirmar contraseña */}
                <div>
                    <label htmlFor="confirmPass" className="block mb-2 font-medium">
                        Confirmar contraseña
                    </label>
                    <input
                        id="confirmPass"
                        type="password"
                        placeholder="Confirmar Contraseña"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition duration-200"
                        value={confirmPass}
                        onChange={(e) => setConfirmPass(e.target.value)}
                        autoComplete="new-password"
                        required
                    />
                </div>

                {/* Botón para enviar el formulario */}
                <button
                    type="submit"
                    className="w-full py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors duration-300 shadow-md transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                >
                    Registrarse
                </button>
            </form>
        </div>
    )
}

export default Signup;