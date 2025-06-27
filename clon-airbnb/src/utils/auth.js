// Guarda el usuario en localeStorage (simulando sesión)
export const login = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    };

    // Elimina la sesión del usuario
    export const logout = () => {
        localStorage.removeItem('user');
    };

    // Obtiene el usuario si existe en localeStorage
    export const getUser = () => {
        const data = localStorage.getItem('user');
        return data ? JSON.parse(data) : null;
    };

    // Verifica si hay sesión activa
    export const isAuthenticated = () => {
        return !!localStorage.getItem('user');
    };