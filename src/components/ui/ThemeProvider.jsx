import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext()

export const useTheme = () => {
    const context = useContext(ThemeContext)
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider')
    }
    return context
}

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        // Check if we're in the browser
        if (typeof window === 'undefined') return 'light'

        // Get saved theme from localStorage
        const saved = localStorage.getItem('theme')
        if (saved) return saved

        // Default to light mode
        return 'light'
    })

    const [mounted, setMounted] = useState(false)
    const [isTransitioning, setIsTransitioning] = useState(false)

    // Apply theme to document on mount and theme changes
    useEffect(() => {
        const root = document.documentElement

        // Remove existing theme classes
        root.classList.remove('light', 'dark')

        // Add current theme class
        root.classList.add(theme)

        // Persist to localStorage
        localStorage.setItem('theme', theme)

        // Mark as mounted to avoid hydration mismatch
        setMounted(true)
    }, [theme])

    // System theme changes are ignored - we default to light mode
    // Users can manually toggle to dark mode if desired

    const toggleTheme = () => {
        setIsTransitioning(true)

        // Switch theme after a brief delay
        setTimeout(() => {
            setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light')
        }, 200)

        // Reset transition state
        setTimeout(() => {
            setIsTransitioning(false)
        }, 600)
    }

    // Always provide context, but hide content until mounted to prevent hydration mismatch
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <div style={{ visibility: mounted ? 'visible' : 'hidden', position: 'relative' }}>
                {children}

                {/* Theme transition overlay */}
                {isTransitioning && (
                    <div className="theme-transition-overlay" />
                )}
            </div>
        </ThemeContext.Provider>
    )
}
