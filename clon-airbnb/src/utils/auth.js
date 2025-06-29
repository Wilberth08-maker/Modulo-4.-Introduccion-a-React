// Guarda el usuario en localeStorage (simulando sesión)
export const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];

    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
        throw new Error('Correo o contraseña incorrectos');
    }

    localStorage.setItem('user', JSON.stringify(user));
    return user;
};

export function registerUser(email, password) {
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Validar que el usuario no exista ya
    const userExists = users.some(user => user.email === email);
    if (userExists) {
        throw new Error("Este correo ya está registrado.");
    }

    users.push({ email, password });
    localStorage.setItem('users', JSON.stringify(users));
}

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