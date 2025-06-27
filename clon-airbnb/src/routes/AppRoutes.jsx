// Importamos los componentes de React Router necesarios:
// - Routes: contenedor de todas las rutas
// - Route: define una ruta individual
// - Navigate: redirige a otra ruta si se cumple una condición
import { Routes, Route, Navigate } from 'react-router-dom';
// Importamos las "páginas" (componentes de rutas)
import Login from '@/pages/Login.jsx';
import Signup from '@/pages/Signup.jsx';
import Error404 from '@/components/Error404.jsx'
import Home from '@/pages/Home.jsx';


// Componente que recibe el usuario actual y la función para actualizarlo
const AppRoutes = ({ user, setUser }) => (
    // <Routes> reemplaza al antiguo <Switch> desde React Router v6
    <Routes>
        {/* Ruta para el login. Pasamos setUser como prop para actualizar el estado */}
        <Route path="/login" element={<Login setUser={setUser} />} />
        {/* Ruta para el registro */}
        <Route path="/signup" element={<Signup />} />
        {/* Ruta raíz ("/"): si hay usuario, saluda, si no, redirige a login */}
        <Route path="/" element={<Home user={user} />}/>
        {/* Ruta comodín (404): se muestra si no coincide ninguna ruta anterior */}
        <Route path="*" element={<Error404 />} />
    </Routes>
);

// Exportamos el componente para poder usarlo en App.jsx
export default AppRoutes;