import React from 'react';
import { Link } from 'react-router-dom'; // Asumiendo que usas react-router-dom para Link

// Puedes reemplazar esta URL con la ruta a tu propia imagen o una URL de CDN
const heroImageUrl = 'https://a0.muscache.com/im/pictures/dec2bf99-0d90-48b9-a905-23b8bee08995.jpg?im_w=1200';

const Landing = () => { 
    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
            {/* Contenido de texto y botones */}
            <div className="flex-1 flex flex-col items-center justify-center p-8 md:p-12 lg:p-20 text-center">
                <div className="flex-1 flex flex-col items-center justify-center p-8 md:p-12 lg:p-20 text-center">   
                        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-4 animate-fadeInUp">
                            Encuentra tu próximo hogar
                        </h1>
                        <p className="mb-8 text-lg md:text-xl text-gray-600 animate-fadeInUp delay-200">
                            Inicia sesión o regístrate para descubrir experiencias únicas.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 w-full max-w-sm animate-fadeInUp delay-400">
                            <Link
                                to="/login"
                                className="w-full sm:w-auto px-8 py-3 bg-red-500 text-white font-semibold rounded-lg shadow-lg hover:bg-red-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                            >
                                Iniciar Sesión
                            </Link>
                            <Link
                                to="/signup"
                                className="w-full sm:w-auto px-8 py-3 border border-gray-300 text-gray-800 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50"
                            >
                                Registrarse
                            </Link>
                        </div>
                    </div> 
            </div>

            {/* Imagen lateral */}
            <div className="flex-1 hidden md:flex items-center justify-center p-4 bg-gray-100">
                <div className="relative w-full h-full max-h-[80vh] md:max-h-full overflow-hidden rounded-lg shadow-xl">
                    <img
                        src={heroImageUrl}
                        alt="Interior moderno con diseño minimalista"
                        className="w-full h-full object-cover object-center transform transition-transform duration-500 hover:scale-105"
                    />
                    {/* Opcional: Overlay sutil para la imagen */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-10"></div>
                </div>
            </div>
        </div>
    );
};

export default Landing;