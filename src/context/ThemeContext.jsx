import React, { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext();

export function useTheme() {
    return useContext(ThemeContext);
}

export function ThemeProvider({ children }) {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const root = window.document.documentElement;
        if (isDarkMode) {
            root.classList.add('dark');
        }
        else {
            root.classList.remove('dark');
        }   
    }, [isDarkMode]);

    const toggleTheme = () => {
        setIsDarkMode(prev => !prev);
    }

    const value = {
        isDarkMode,
        toggleTheme
    }

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}