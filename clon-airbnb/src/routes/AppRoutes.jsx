// Importamos los componentes de React Router necesarios:
// - Routes: contenedor de todas las rutas
// - Route: define una ruta individual
// - Navigate: redirige a otra ruta si se cumple una condición
import { Routes, Route, Navigate } from 'react-router-dom';
// Importamos las "páginas" (componentes de rutas)
import Login from '@/pages/Login.jsx';
import Signup from '@/pages/Signup.jsx';
import Error404 from '@/components/Error404.jsx'
import Landing from '@/components/Landing.jsx'
import Alojamientos from '@/pages/Alojamientos.jsx';
import AlojamientoDetalles from '@/pages/AlojamientoDetalles.jsx'
import Experiencias from '@/pages/Experiencias';
import ExperienciasDetalles from '@/pages/ExperienciasDetalles.jsx'
import Servicios from '@/pages/Servicios';
import ServiciosDetalles from '@/pages/ServiciosDetalles';
import Perfil from '@/pages/Perfil';


// Componente que recibe el usuario actual y la función para actualizarlo
const AppRoutes = ({ user, setUser }) => (
    <Routes>

        {/* Ruta para el login. Pasamos setUser como prop para actualizar el estado */}
        <Route path="/login" element={<Login setUser={setUser} />} />

        {/* Ruta para el registro */}
        <Route path="/signup" element={<Signup />} />

        {/* Ruta raíz ("/"): si no hay usuario, si hay se muestra "/alojamientos" */}
        <Route
            path="/"
            element={user ? <Navigate to="/alojamientos" replace /> : <Landing />}
        />

        {/* Ruta protegida */}
        {/* Ruta alojamientos */}
        <Route 
            path="/alojamientos" 
            element={user ? <Alojamientos /> : <Navigate to="/login" replace />} 
        />

        <Route 
            path="/alojamientos/:id" 
            element={user ? <AlojamientoDetalles /> : <Navigate to="/login" replace />} 
        />

        {/* Ruta experiencias */}
        <Route 
            path="/experiencias" 
            element={user ? <Experiencias /> : <Navigate to="/login" replace />} 
        />

        <Route 
            path="/experiencias/:id" 
            element={user ? <ExperienciasDetalles /> : <Navigate to="/login" replace />} 
        />

        {/* Ruta servicios */}
        <Route 
            path="/servicios" 
            element={user ? <Servicios /> : <Navigate to="/login" replace />} 
        />

        <Route 
            path="/servicios/:id" 
            element={user ? <ServiciosDetalles /> : <Navigate to="/login" replace />} 
        />

        {/* Ruta perfil */}
        <Route 
            path="/perfil" 
            element={user ? <Perfil user={user} /> : <Navigate to="/login" replace />} 
        />

        {/* Ruta comodín (404): se muestra si no coincide ninguna ruta anterior */}
        <Route path="*" element={<Error404 />} />
    </Routes>
);

// Exportamos el componente para poder usarlo en App.jsx
export default AppRoutes;