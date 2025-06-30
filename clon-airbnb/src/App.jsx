import { useState, useEffect } from 'react';
// Importa el componente Navbar (barra de navegación)
import Navbar from "./components/Navbar";
// Importa las rutas de la aplicación (Login, Signup, Home, etc.)
import AppRoutes from "./routes/AppRoutes";

import { getUser } from './utils/auth';

function App() {
  // Estado para guardar al usuario logueado (null si no hay sesión)
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // useEffect se ejecuta una vez al cargar la app
  useEffect(() => {
    // Intenta obtener el usuario guardado en localStorage
    const userData = getUser();
    // Si hay datos, actualiza el estado con ese usuario
    if (userData) setUser(userData);

    // Simula un pequeño delay (300ms) para dar tiempo a cargar localStorage
    setTimeout(() => {
      setLoading(false); // ← después del delay, carga terminada
    }, 300)

  }, []); // El array vacío [] significa que se ejecuta solo 1 vez al montar el componente

  if (loading) {
    return (
      <div className="flex space-x-2 justify-center items-center h-48 w-full"> {/* Contenedor para los puntos */}
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
    );
  }

  return (
    <>
      {/* Navbar recibe el usuario actual y la función para actualizarlo */}
      <Navbar user={user} setUser={setUser} />
      {/* AppRoutes maneja las rutas y también recibe el estado de sesión */}
      <AppRoutes user={user} setUser={setUser} />
    </>
  );
}

// Exporta el componente App para usarlo en main.jsx
export default App;