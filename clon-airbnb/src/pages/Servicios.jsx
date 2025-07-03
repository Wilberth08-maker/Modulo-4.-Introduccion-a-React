import { useEffect, useState, useCallback, useMemo } from 'react';
import PagButtons from '@/components/PageButtons/PageButtons';
import {Link} from 'react-router-dom';
import FilterPanel from '@/components/FilterPanel/FilterPanel';

const Servicios = () => {
    const [servicios, setServicios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pageLoading, setPageLoading] = useState(false);
    const [error, setError] = useState(null); // Para manejar errores
    const [currentPage, setCurrentPage] = useState(1); // Nuevo estado para la página actual
    const itemsPerPage = 24; // Mostrar 24 tarjetas por página

    const [citySearch, setCitySearch] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [serviciosFilter, setServiciosFilter] = useState([]);

    const [cardsBlurred, setCardsBlurred] = useState(true); // Inicia borroso

    const fetchServicios = useCallback(async () => {
            try {
                setLoading(true);
                setCardsBlurred(true);

                // Simular carga
                const timer = new Promise((res) => setTimeout(res, 2000));

                const fetchPromise = fetch('/data/servicios.json');

                const [res] = await Promise.all([fetchPromise, timer]);

                if (!res.ok) throw new Error("Error al obtener los servicios");

                const data = await res.json();
                
                setServicios(data);
                setServiciosFilter(data);

                setTimeout(() => {
                    setCardsBlurred(false); // Tarjetas nítidas
                    setLoading(false); // Oculta el spinner principal
                }, 500); // Pequeño retraso para que el spinner principal tenga tiempo de desaparecer

            } catch (err) {
                console.error('Error cargando serivicios:', err);
                setError(err.message);
                setCardsBlurred(true);
            } finally {
                setLoading(false);
            }
    },[setLoading, setCardsBlurred, setError, setServicios, setServiciosFilter]);

    useEffect(() => {
        fetchServicios();
    }, [fetchServicios]);

    // Lógica de Filtrado
    //--------------------
    const handleFilter = useCallback(({ city, minPrice, maxPrice }) => {
    const min = parseFloat(minPrice);
    const max = parseFloat(maxPrice);

    const filtrados = servicios.filter(({ ubicacion, precio }) => {
            const ciudadOK = !city.trim() || ubicacion.toLowerCase().includes(city.toLowerCase());
            const precioOK =
                (isNaN(min) || precio >= min) &&
                (isNaN(max) || precio <= max);

            return ciudadOK && precioOK;
        });

        setServiciosFilter(filtrados);
        setCurrentPage(1);
        setCardsBlurred(true);
        setError(null);
    }, [servicios, setServiciosFilter, setCurrentPage, setError, setCardsBlurred]);

    const handleClearFilters = useCallback(() => {
        setCitySearch("");
        setMinPrice("");
        setMaxPrice("");
        setError(null);
        setCurrentPage(1); 
        setCardsBlurred(true); 

        
        handleFilter({ city: "", minPrice: "", maxPrice: "" });
    }, [handleFilter, setCitySearch, setMinPrice, setMaxPrice, setError, setCurrentPage, setCardsBlurred]); 

    // ------------

    // Lógica de paginación 
    const totalPages = Math.ceil(serviciosFilter.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Memoriza el bloque actual de servicios visible
    const currentServicios = useMemo(() => {
        return serviciosFilter.slice(startIndex, endIndex); 
    },[serviciosFilter, startIndex, endIndex]);

    // useEffect para re-activar el efecto de desenfoque cuando currentServicios cambia
    useEffect(() => {
        if (!loading && !pageLoading && currentServicios.length > 0) {
            // Un pequeño retraso para asegurar que los spinners se oculten primero
            const timer = setTimeout(() => {
                setCardsBlurred(false); // Tarjetas nítidas después de la transición de página
            }, 500); // 
            return () => clearTimeout(timer);
        }   else if (!loading && !pageLoading && currentServicios.length === 0) {
            setCardsBlurred(false); // Si no hay resultados
        }
    }, [currentServicios, loading, pageLoading]); 

    // Función para manejar el cambio de página con loading
    const changePage = useCallback(async (newPage) => {
        setPageLoading(true); // Activa el loading para el cambio de página
        setCardsBlurred(true);
        await new Promise(resolve => setTimeout(resolve, 500)); // Pequeña pausa para ver el spinner
        setCurrentPage(newPage);
        setPageLoading(false); // Desactiva el loading
    }, [setPageLoading, setCardsBlurred, setCurrentPage]);

    const handleNextPage = useCallback(() => {
        if (currentPage < totalPages) {
            changePage(currentPage + 1);
        }
    }, [currentPage, totalPages, changePage]);

    const handlePreviousPage = useCallback(() => {
        if (currentPage > 1) {
            changePage(currentPage - 1);
        }
    },[currentPage, changePage]);

    return (
        <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-900 text-black dark:text-white min-h-screen">
            {/* Contenido principal o indicador de carga (loading) */}
            {(loading || pageLoading) ? (
            <div className="flex justify-center items-center h-48 w-full"> 
                <div className="flex space-x-2"> {/* Contenedor para los puntos */}
                        <div
                            className="w-3 h-3 bg-red-500 rounded-full animate-pulse" 
                            style={{ animationDelay: '0s' }}
                        ></div>
                        <div
                            className="w-3 h-3 bg-red-500 rounded-full animate-pulse" 
                            style={{ animationDelay: '0.2s' }} 
                        ></div>
                        <div
                            className="w-3 h-3 bg-red-500 rounded-full animate-pulse" 
                            style={{ animationDelay: '0.4s' }} 
                        ></div>
                    </div>
                </div>
            ) : (
                <>
                    <div className="w-full flex justify-center py-4 px-4 md:px-0">
                        <div className="w-full max-w-6xl">
                            <FilterPanel
                                    citySearch={citySearch}
                                    setCitySearch={setCitySearch}
                                    minPrice={minPrice}
                                    setMinPrice={setMinPrice}
                                    maxPrice={maxPrice}
                                    setMaxPrice={setMaxPrice}
                                    onFilter={handleFilter}
                                    onClearFilters={handleClearFilters} 
                            />
                        </div>
                </div>
                {/* Paginación */}
                    <PagButtons
                            info={{ prev: currentPage > 1, next: currentPage < totalPages }}
                            onPrevious={handlePreviousPage}
                            onNext={handleNextPage}
                    /> 

                    {/* Muestra mensaje de error en caso de existir */}
                    {error && (
                        <p className="mb-6 text-red-500 font-semibold text-center text-sm">{error}</p>
                    )}

                    {/* Contenedor principal de las tarjetas */}
                    <div className={`
                            grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 
                            gap-x-4 gap-y-8 w-full max-w-7xl 
                            transition-all duration-500 ease-in-out 
                            ${cardsBlurred ? 'blur-md' : 'blur-none'}
                        `}>
                        {currentServicios.length > 0 ? (
                            currentServicios.map(serv => (
                            <Link 
                            key={serv.id} 
                            to={`/servicios/${serv.id}`}
                            className="group cursor-pointer block" 
                            >
                                {/* Contenedor de la imagen */}
                                <div className="relative overflow-hidden rounded-xl aspect-square mb-2">
                                    <img
                                        src={serv.imagen}
                                        alt={serv.titulo}
                                        className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
                                        aria-label={`Tarjeta del servicio ${serv.titulo}`}
                                        loading='lazy'

                                    />
                                    {/* Botón de favorito */}
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

                                {/* Información del servicio */}
                                <div className="text-sm">
                                    <h3 className="font-bold text-gray-900 dark:text-white truncate">
                                        {serv.titulo}
                                    </h3>
                                    <p className="font-semibold text-gray-900 dark:text-white">{serv.ubicacion}</p>
                                    <p className="font-normal text-gray-600 dark:text-gray-300">
                                        ${serv.precio}
                                        <span className="font-normal text-gray-600 dark:text-gray-300"> / noche</span>
                                        {/* CALIFICACIÓN */}
                                        <span className="float-right flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.92 8.72c-.783-.57-.381-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                                            </svg>
                                            {serv.calificacion}
                                        </span> 
                                    </p>
                                </div>
                            </Link>
                        ))
                    ):(
                        // Mensaje para cuando no hay alojamientos que mostrar
                        !loading && !error && (
                            <p className="col-span-full text-center text-gray-500 dark:text-gray-400">
                                    No hay alojamientos disponibles con los filtros actuales.
                            </p>
                        )
                    )}
                    </div>
                    {/* Paginación */}
                    {serviciosFilter.length > 0 && !error && (
                        <PagButtons
                            info={{ prev: currentPage > 1, next: currentPage < totalPages }}
                            onPrevious={handlePreviousPage}
                            onNext={handleNextPage}
                        />   
                    )} 
                </>
            )}       
        </div>
    );
};

export default Servicios;
