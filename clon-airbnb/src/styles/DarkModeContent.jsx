import { createContext, useContext, useEffect, useState } from 'react';

const DarkModeContent = createContext();

export const useDarkMode = () => useContext(DarkModeContent);

export const DarkModeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(() => {
        const savedMode = localStorage.getItem('darkMode');
        return savedMode === 'true'; 
    });

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        
        localStorage.setItem('darkMode', darkMode.toString()); 
    }, [darkMode]);

    return (
        <DarkModeContent.Provider value={{ darkMode, setDarkMode }}>
            {children}
        </DarkModeContent.Provider>
    );
};