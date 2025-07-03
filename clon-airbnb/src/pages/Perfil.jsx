import {useDarkMode} from '@/styles/DarkModeContent'

const Perfil = ({user}) => {

    const {darkMode} = useDarkMode();

    if (!user) {
        return (
            <div className="min-h-screen flex justify-center items-center text-gray-900 dark:text-gray-100">
                <p>Cargando perfil del usuario...</p>
            </div>
        );
    }

    return(
        < div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6 md:p-10 lg:p-16 flex justify-center" >
            <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8">

                {/* Sección de la Cabecera del Perfil */}
                <div className="flex flex-col items-center border-b pb-6 mb-6 border-gray-200 dark:border-gray-700">
                    {/* Avatar */}
                    <img
                        src="https://i.pinimg.com/736x/bd/f4/d3/bdf4d3fe1f9a17136319df951fe9b3e0.jpg"
                        alt="Foto de Perfil"
                        className="w-32 h-32 rounded-full object-cover mb-4 ring-4 ring-red-500 ring-opacity-50 dark:ring-red-400"
                    />

                    {/* Nombre del Usuario */}
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-1">
                        Nombre de Usuario
                    </h1>

                    {/* Ubicación */}
                    <p className="text-lg text-gray-600 dark:text-gray-400">
                        Chetumal, Quintana Roo, México
                    </p>
                </div>

                {/* Sección de Información Adicional */}
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3">
                        Sobre mí
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        Soy un entusiasta de los viajes y la fotografía, siempre buscando nuevas experiencias. Me encanta explorar la cultura local y compartir mis descubrimientos con otros.
                    </p>
                </div>

                {/* Sección de Verificación */}
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3">
                        Verificaciones
                    </h2>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                        <li className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            {user.email}
                        </li>
                        <li className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Teléfono
                        </li>
                    </ul>
                </div>
            </div>
        </div >
    );
};

export default Perfil;