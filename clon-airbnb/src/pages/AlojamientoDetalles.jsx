import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Importamos useParams y useNavigate
import { useDarkMode } from '@/styles/DarkModeContent';


const AlojamientoDetalles = () => {
    const { id } = useParams(); // Obtiene el ID de la URL (ej: /alojamientos/123 -> id = "123")
    const navigate = useNavigate(); // Hook para navegación programática 

    const [alojamiento, setAlojamiento] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const {darkMode} = useDarkMode();

    const [blurred, setBlurred] = useState(true); // Inicia borroso

    useEffect(() => {
        if (!id) return; // Si no hay ID en la URL, no se hace nada

        const fetchAlojamientoDetalles = async () => {
            try {
                setLoading(true);
                setError(null);
                setBlurred(true);
                
                // Simula una carga de datos con un retardo
                const timer = new Promise((res) => setTimeout(res, 1000));
                
                // Fetch de todos los alojamientos
                const fetchPromise = fetch('/data/alojamientos.json');
                
                const [res] = await Promise.all([fetchPromise, timer]);

                if (!res.ok) throw new Error("Error al obtener los detalles del alojamiento");

                const data = await res.json();
                
                // Filtra para encontrar el alojamiento específico por ID
                const foundAlojamiento = data.find(item => item.id.toString() === id);

                if (foundAlojamiento) {
                    setAlojamiento(foundAlojamiento);
                } else {
                    setError("Alojamiento no encontrado");
                }

                setTimeout(() => {
                    setBlurred(false);
                    setLoading(false);
                }, 600);

            } catch (err) {
                setError(err.message);
                setBlurred(true);
                setLoading(false);
            } finally {
                setLoading(false);
            }
        };

        fetchAlojamientoDetalles();
    }, [id]); // Dependencia del ID para que se ejecute cuando el ID en la URL cambie

    // Renderizado
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen dark:bg-gray-900">
                <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '0s' }}></div>
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-10 text-red-500 bg-white dark:bg-gray-900 dark:text-red-400">
                <p>Error: {error}</p>
                <button 
                    onClick={() => navigate(-1)} // Vuelve a la página anterior
                    className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                >
                    Volver
                </button>
            </div>
        );
    }

    if (!alojamiento) {
        return <div className="text-center py-10 text-gray-700 bg-white dark:bg-gray-900 dark:text-gray-300">Alojamiento no disponible.</div>;
    }

    // 
    return (
        <div className={`min-h-screen p-4 md:p-8 lg:p-12 bg-white dark:bg-gray-800 dark:text-gray-100 ${blurred ? 'blur-md' : 'blur-none'}`}>
            {/* Botón de regresar */}
            <button
                onClick={() => navigate(-1)} // Vuelve a la página anterior
                className="flex items-center mb-6 justify-center bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full w-10 h-10 shadow-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-75"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            {/* Cabecera con título y ubicación */}
            <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-2 dark:text-white">
                {alojamiento.titulo}
            </h1>
            <p className="text-lg text-gray-600 mb-6 flex items-center dark:text-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-gray-500 dark:text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                {alojamiento.ubicacion} &middot; <span className="ml-1 text-gray-700 font-medium dark:text-gray-200">{alojamiento.calificacion} ★</span>
            </p>

            {/* Imagen */}
            <div className="relative aspect-video rounded-xl overflow-hidden mb-8">
                <img
                    src={alojamiento.imagen}
                    alt={alojamiento.titulo}
                    className="w-full h-full object-cover"
                />
                {/* Botón de favorito  */}
                <button className="absolute top-2 right-2 p-1 rounded-full bg-opacity-70 transition-all duration-200 hover:scale-110">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 32 32"
                        aria-hidden="true"
                        role="presentation"
                        focusable="false"
                        className="block h-6 w-6 stroke-white stroke-2 overflow-visible  transition-colors duration-200 "
                    >
                        <path d="M16 28c7-4.73 14-10 14-17a6.98 6.98 0 0 0-7-7c-1.8 0-3.58.68-4.95 2.05L16 8.1l-2.05-2.05a6.98 6.98 0 0 0-9.9 0A6.98 6.98 0 0 0 2 11c0 7 7 12.27 14 17z"></path>
                    </svg>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                {/* Sección de detalles */}
                <div className="md:col-span-2">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4 dark:text-white">
                        Alojamiento en {alojamiento.ubicacion}
                    </h2>
                    <p className="text-gray-700 leading-relaxed mb-6 dark:text-gray-200">
                        {alojamiento.descripcion}
                    </p>

                    {/* Características destacadas */}
                    <div className="border-t border-b border-gray-200 py-6 mb-6 dark:border-gray-600">
                        <div className="flex items-center mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700 mr-3 dark:text-gray-300" fill="none" viewBox="0 0 32 32" stroke="currentColor" strokeWidth="2">
                                <path d="m15.59 1.91 1.02.8C22.17 7.04 25 11.46 25 15.98a8.99 8.99 0 0 1-.5 3.02H31v2h-2v9a1 1 0 0 1-.88 1H4a1 1 0 0 1-1-.88V21H1v-2h6.42c-.28-.9-.42-1.91-.42-3.01 0-2.25 1.1-4.82 3.27-7.75l.27-.35.55-.73 1.78 1.12L15.6 1.9zM27 21H5v8h22v-8zM16.4 5.1l-2.6 6.1-2.21-1.37-.17.24C9.87 12.3 9.07 14.2 9 15.77l-.01.21c0 1.1.17 2.04.48 2.85l.07.17h3a6.1 6.1 0 0 1-.05-.83c0-1.52.86-3.19 2.52-5.07l.24-.27.74-.81.74.8c1.82 2 2.76 3.76 2.76 5.35 0 .3-.02.57-.05.83h3.06l-.14-.07a6.7 6.7 0 0 0 .63-2.95c0-3.42-2.03-6.93-6.17-10.51l-.43-.36zm-.4 9.94-.08.1c-.9 1.14-1.36 2.11-1.41 2.88l-.01.15c0 .35.03.63.09.83h2.82c.06-.2.09-.48.09-.83 0-.79-.46-1.8-1.42-3.04l-.08-.1z"></path>
                            </svg>
                            <div>
                                <h3 className="font-semibold text-gray-900 dark:text-white">Espacio exterior increible</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300">Los huéspedes mencionan alberca como un punto destacado.</p>
                            </div>
                        </div>
                        <div className="flex items-center mb-4">
                            <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            viewBox="0 0 32 32" aria-hidden="true" 
                            role="presentation" 
                            focusable="false" 
                            stroke="currentColor"
                            className="h-6 w-6 text-gray-700 mr-3 dark:text-gray-100" >
                                <path d="M24.33 1.67a2 2 0 0 1 2 1.85v24.81h3v2H2.67v-2h3V3.67a2 2 0 0 1 1.85-2h.15zm-4 2H7.67v24.66h12.66zm4 0h-2v24.66h2zm-7 11a1.33 1.33 0 1 1 0 2.66 1.33 1.33 0 0 1 0-2.66z"></path>
                            </svg>
                            <div>
                                <h3 className="font-semibold text-gray-900 dark:text-white">Llegada autónoma</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300">Para entrar al alojamiento, usa la caja de seguridad para llaves.</p>
                            </div>                              
                        </div>
                        <div className="flex items-center">
                            <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            viewBox="0 0 32 32" aria-hidden="true" 
                            role="presentation" 
                            focusable="false" 
                            stroke="currentColor"
                            className="h-6 w-6 text-gray-700 mr-3 dark:text-gray-100" >
                                <path d="M16 0a12 12 0 0 1 12 12c0 6.34-3.81 12.75-11.35 19.26l-.65.56-1.08-.93C7.67 24.5 4 18.22 4 12 4 5.42 9.4 0 16 0zm0 2C10.5 2 6 6.53 6 12c0 5.44 3.25 11.12 9.83 17.02l.17.15.58-.52C22.75 23 25.87 17.55 26 12.33V12A10 10 0 0 0 16 2zm0 5a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"></path>
                            </svg>
                            <div>
                                <h3 className="font-semibold text-gray-900 dark:text-white">Excelente ubicación</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300">A los huéspedes que se quedaron aquí el año pasado les encantó la ubicación.</p>
                            </div>                              
                        </div>
                    </div>
                </div>

                {/* Tarjeta de reserva flotante */}
                <div className="md:col-span-1">
                    <div className="sticky top-20 border border-gray-200 rounded-xl p-6 shadow-md dark:bg-gray-700 dark:border-gray-600 dark:shadow-lg">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-2xl font-semibold text-gray-900 dark:text-white">${alojamiento.precio}</span>
                            <span className="text-gray-600 dark:text-gray-300">/ noche</span>
                        </div>
                        <button className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors duration-200">
                            Reservar
                        </button>
                        <p className="text-center text-sm text-gray-500 mt-2 dark:text-gray-400">Aún no se te cobrará nada</p>
                    </div>
                </div>
            </div>

            {/* Secciones adicionales */}
            <div className="border-t border-gray-200 pt-8 mt-8 dark:border-gray-600">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 dark:text-white">Ubicación</h2>
                <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center text-gray-500 dark:bg-gray-700 dark:text-gray-300">
                    Mapa de la ubicación
                </div>
            </div>
        </div>
    );
};

export default AlojamientoDetalles;