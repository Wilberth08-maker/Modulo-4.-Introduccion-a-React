import React from 'react';
import { useDarkMode } from '@/styles/DarkModeContent';

const Error404 = () => {
    const {darkMode} = useDarkMode();
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center p-5 font-sans text-gray-800 bg-white dark:bg-gray-900 dark:text-gray-200">
            <h1 className="text-6xl md:text-8xl font-extrabold text-black-500 mb-2 dark:text-red-500">404</h1>
            <h2 className="text-3xl md:text-4xl font-semibold mb-5 dark:text-white">¡Parece que te has desviado del camino!</h2>
            <p className="text-lg md:text-xl leading-relaxed mb-8 max-w-2xl dark:text-gray-300">
                La página que buscas no está disponible o nunca existió. No te preocupes,
                hasta el mejor viajero puede perderse de vez en cuando.
            </p>
            <button
                onClick={() => window.location.href = '/'}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 shadow-md dark:bg-red-700 dark:hover:bg-red-800 dark:shadow-lg"
            >
                Volver a la página principal
            </button>
        </div>
    );
};

export default Error404;