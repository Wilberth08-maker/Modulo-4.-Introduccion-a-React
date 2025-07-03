import React from 'react';

const FilterPanel = ({ citySearch, setCitySearch, minPrice, setMinPrice, maxPrice, setMaxPrice, onFilter, onClearFilters}) => {

    return (
        <div className="flex items-center p-2 bg-white dark:bg-gray-800 rounded-full shadow-md border border-gray-200 dark:border-gray-700">
            {/* Campo de búsqueda por ciudad */}
            <div className="flex-1 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors duration-200 cursor-pointer">
                <label htmlFor="citySearch" className="block text-xs font-semibold text-gray-800 dark:text-gray-200 mb-0.5">Ciudad</label>
                <input
                    id="citySearch"
                    className="w-full text-sm text-gray-700 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none bg-transparent"
                    type="text"
                    value={citySearch}
                    onChange={(e) => setCitySearch(e.target.value)}
                    placeholder="Buscar por ciudad"
                />
            </div>
            

            <div className="h-6 w-px bg-gray-300 dark:bg-gray-600"></div> {/* Separador */}

            {/* Campo de búsqueda por precio */}
            <div className="flex-1 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors duration-200 cursor-pointer">
                <label htmlFor="minPrice" className="block text-xs font-semibold text-gray-800 dark:text-gray-200 mb-0.5">Precio mínimo</label>
                <input
                    id="minPrice"
                    className="w-full text-sm text-gray-700 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none bg-transparent"
                    type="number" // Cambiado a number para precio
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    placeholder="Precio más bajo"
                    min="0" // mínimo para precios
                />
            </div>
            <div className="h-6 w-px bg-gray-300 dark:bg-gray-600"></div> {/* Separador */}
            <div className="flex-1 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors duration-200 cursor-pointer">
                <label htmlFor="maxPrice" className="block text-xs font-semibold text-gray-800 dark:text-gray-200 mb-0.5">Precio máximo </label>
                <input
                    id="maxPrice"
                    className="w-full text-sm text-gray-700 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none bg-transparent"
                    type="number" // Cambiado a number para precio
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    placeholder="Precio más alto"
                />
            </div>
            
            {/* Botón para aplicar los filtros  */}
            <button
                className="flex items-center justify-center w-12 h-12 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75 transition-all duration-200 ease-in-out mr-1"
                onClick={() => onFilter({ city: citySearch, minPrice, maxPrice })} // Pasa los valores de los estados
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
            </button>

            {/* Botón para limpiar los filtros  */}
            <button
                className="flex items-center justify-center w-12 h-12 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75 transition-all duration-200 ease-in-out mr-1"
                onClick={onClearFilters}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>


            </button>
        </div>
    );
};

export default FilterPanel;