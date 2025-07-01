import React, { useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { logout } from '@/utils/auth';
import { useDarkMode } from '@/styles/DarkModeContent';

// Componente para un video de ícono que se reproduce al hacer click
const VideoIcon = ({ src, isPlaying }) => {
    const videoRef = React.useRef(null);

    // Efecto para controlar la reproducción del video
    React.useEffect(() => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.currentTime = 0; // Reinicia el video al inicio
                videoRef.current.play();
            } else {
                videoRef.current.pause();
                videoRef.currentTime = 0;
            }
        }
    }, [isPlaying]);

    return (
        <video
            ref={videoRef}
            className="h-14 w-14 mr-2 rounded-full object-cover" // Aumentado a h-8 w-8
            muted
            playsInline
            disablePictureInPicture // <-- esto desactiva el botón de PiP
            controls={false} // Asegura que no aparezcan controles
        >
            <source src={src} type="video/webm" />
            Tu navegador no soporta el elemento de video.
        </video>
    );
};


const LandingNavbar = ({ user, setUser }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation(); // Obtiene la ubicación actual
    const [activeVideo, setActiveVideo] = useState(null); // Estado para el video activo
    const { darkMode, setDarkMode } = useDarkMode();

    const videoTimerRef = useRef(null);

    const handleLogout = () => {
        logout();
        setUser(null);
        setIsMenuOpen(false); // Cierra el menú al cerrar sesión
    };

    // Función para manejar el clic en una sección central
    const handleSectionClick = (sectionName) => {
        // 1. Limpiar cualquier timer
        if (videoTimerRef.current) {
            clearTimeout(videoTimerRef.current);
        }

        // 2. Inicaiar el setActiveVideo
        setActiveVideo(sectionName);

        // 3. Iniciar un nuevo timer
        videoTimerRef.current = setTimeout(() => {
            setActiveVideo(null); // Detener el video después de 2segundos
            videoTimerRef.current = null; 
        }, 2000);
    };

    // Limpiar el timer
    React.useEffect(() => {
        return () => {
            if (videoTimerRef.current) {
                clearTimeout(videoTimerRef.current);
            }
        };
    }, []);
    
    return (
        <nav className="bg-gray shadow-sm p-4 flex items-center justify-between border-b border-gray-100 relative z-10 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100">
            {/* Logo de Airbnb a la izquierda */}
            <div className="flex items-center">
                <Link to="https://www.airbnb.mx/" className="flex items-center space-x-2 text-red-500 hover:text-red-600 transition-colors duration-300">
                    {/* SVG de Airbnb  */}
                    {/* IMAGEN DEL LOGO DE AIRBNB DESDE LA URL */}
                    <img
                        src="https://www.svgrepo.com/show/475697/airbnb-color.svg" // <-- Aquí la URL de la imagen
                        alt="Airbnb Logo" // <-- Texto alternativo para accesibilidad
                        className="w-8 h-8 md:w-10 md:h-10" // <-- Clases de tamaño y estilo
                    />
                    <span className="text-xl md:text-2xl font-bold text-red-500">airbnb</span>
                </Link>
            </div>

        {/* Apartados centrales con videos */}
            <div className="hidden md:flex items-center space-x-8 mx-auto">
                <Link
                to="/"
                onClick={() => handleSectionClick('alojamientos')}
                className={`flex items-center pb-1 transition-colors duration-200 relative group
                    ${location.pathname === '/' || activeVideo === 'alojamientos'
                    ? 'text-gray-900 font-bold dark:text-gray-100'
                    : 'text-gray-700 hover:text-gray-900 font-medium dark:text-gray-300 dark:hover:text-gray-100'
                    }`}
                >
                <VideoIcon src="https://a0.muscache.com/videos/search-bar-icons/webm/house-selected.webm" isPlaying={location.pathname === '/' || activeVideo === 'alojamientos'} />
                Alojamientos
                {(location.pathname === '/' || activeVideo === 'alojamientos') && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-900 transform scale-x-120 transition-transform duration-300 dark:bg-gray-100"></span>
                )}
                </Link>

                <Link
                to="/experiencias"
                onClick={() => handleSectionClick('experiencias')}
                className={`flex items-center pb-1 transition-colors duration-200 relative group
                    ${location.pathname === '/experiencias' || activeVideo === 'experiencias'
                    ? 'text-gray-900 font-bold dark:text-gray-100'
                    : 'text-gray-700 hover:text-gray-900 font-medium dark:text-gray-300 dark:hover:text-gray-100'
                    }`}
                >
                <VideoIcon src="https://a0.muscache.com/videos/search-bar-icons/webm/balloon-selected.webm" isPlaying={location.pathname === '/experiencias' || activeVideo === 'experiencias'} />
                Experiencias
                <span className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-blue-900 text-white text-xs font-semibold px-2 py-0.5 rounded-full shadow-md z-10 whitespace-nowrap">
                    NUEVO
                </span>
                {(location.pathname === '/experiencias' || activeVideo === 'experiencias') && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-900 transform scale-x-120 transition-transform duration-300 dark:bg-gray-100"></span>
                )}
                </Link>

                <Link
                to="/servicios"
                onClick={() => handleSectionClick('servicios')}
                className={`flex items-center pb-1 transition-colors duration-200 relative group
                    ${location.pathname === '/servicios' || activeVideo === 'servicios'
                    ? 'text-gray-900 font-bold dark:text-gray-100'
                    : 'text-gray-700 hover:text-gray-900 font-medium dark:text-gray-300 dark:hover:text-gray-100'
                    }`}
                >
                <VideoIcon src="https://a0.muscache.com/videos/search-bar-icons/webm/consierge-selected.webm" isPlaying={location.pathname === '/servicios' || activeVideo === 'servicios'} />
                Servicios
                <span className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-blue-900 text-white text-xs font-semibold px-2 py-0.5 rounded-full shadow-md z-10 whitespace-nowrap">
                    NUEVO
                </span>
                {(location.pathname === '/servicios' || activeVideo === 'servicios') && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-900 transform scale-x-120 transition-transform duration-300 dark:bg-gray-100"></span>
                )}
                </Link>
            </div>  

            {/* Apartados a la derecha */} 
            <div className="flex items-center space-x-2">
                <button
                    className="hidden md:block text-gray-700 hover:bg-gray-100 font-semibold py-2 px-3 rounded-full transition-colors duration-200 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                    Conviértete en anfitrión
                </button>

                <button
                    className="w-10 h-10 flex items-center justify-center bg-gray-200 border border-gray-300 rounded-full shadow-sm text-gray-700 hover:shadow-md transition-shadow duration-200 focus:outline-none focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:hover:shadow-lg"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        aria-hidden="true"
                        role="presentation"
                        focusable="false"
                        className="h-4 w-4 fill-current"
                    >
                        <path d="M8 .25a7.77 7.77 0 0 1 7.75 7.78 7.75 7.75 0 0 1-7.52 7.72h-.25A7.75 7.75 0 0 1 .25 8.24v-.25A7.75 7.75 0 0 1 8 .25zm1.95 8.5h-3.9c.15 2.9 1.17 5.34 1.88 5.5H8c.68 0 1.72-2.37 1.93-5.23zm4.26 0h-2.76c-.09 1.96-.53 3.78-1.18 5.08A6.26 6.26 0 0 0 14.17 9zm-9.67 0H1.8a6.26 6.26 0 0 0 3.94 5.08 12.59 12.59 0 0 1-1.16-4.7l-.03-.38zm1.2-6.58-.12.05a6.26 6.26 0 0 0-3.83 5.03h2.75c.09-1.83.48-3.54 1.06-4.81zm2.25-.42c-.7 0-1.78 2.51-1.94 5.5h3.9c-.15-2.9-1.18-5.34-1.89-5.5h-.07zm2.28.43.03.05a12.95 12.95 0 0 1 1.15 5.02h2.75a6.28 6.28 0 0 0-3.93-5.07z" />
                    </svg>

                </button>
                {/* Menú hamburguesa y opciones de usuario  */}
                <div className="relative">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="w-10 h-10 flex items-center justify-center bg-gray-200 border border-gray-300 rounded-full shadow-sm text-gray-700 hover:shadow-md transition-shadow duration-200 focus:outline-none focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:hover:shadow-lg"

                    >
                        {/* Icono de hamburguesa */}
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>

                    {/* Dropdown del menú hamburguesa */}
                    {isMenuOpen && (
                        <div className="absolute right-0 mt-3 w-48 bg-white border border-gray-200 rounded-xl shadow-lg py-2 z-20 animate-fadeInUp dark:bg-gray-700 dark:border-gray-600">
                            <span className="block px-4 py-2 text-gray-700 text-sm dark:text-gray-200 truncate">Hola, **{user.email.split('@')[0]}**</span>
                            <div className="border-t border-gray-100 my-1"></div> {/* Separador */}
                                    <Link
                                        to="/profile"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200 dark:text-gray-200 dark:hover:bg-gray-600"
                                    >
                                        Mi perfil
                                    </Link>
                                    <button
                                        onClick={() => setDarkMode(!darkMode)}
                                        className="block w-full text-left px-4 py-2 rounded-lg transition-colors duration-200 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600"
                                    >
                                        {darkMode ? "Modo Claro" : "Modo Oscuro"}
                                    </button>
                                    <Link
                                        to="/signup"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="block px-4 py-2 text-gray-800 font-semibold hover:bg-gray-100 rounded-lg transition-colors duration-200 dark:text-gray-100 dark:hover:bg-gray-600"
                                    >
                                        Registrarse
                                    </Link>
                                    <div className="border-t border-gray-100 my-1"></div> {/* Separador */}
                                    <button
                                        onClick={handleLogout}
                                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200 dark:text-gray-200 dark:hover:bg-gray-600"
                                    >
                                        Cerrar Sesión
                                    </button>                        
                        </div>
                )}
            </div>
            </div>  
        </nav>
    );
};

export default LandingNavbar;