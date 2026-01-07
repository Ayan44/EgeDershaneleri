import { useState } from 'react'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from './ThemeProvider'
import { useLanguage } from '../../i18n/LanguageProvider'
import './FloatingControls.css'

const FloatingControls = () => {
    const { theme, toggleTheme } = useTheme()
    const { lang, toggleLang } = useLanguage()
    const [isAnimating, setIsAnimating] = useState(false)

    const handleThemeToggle = () => {
        if (isAnimating) return // Prevent double-clicks during animation

        setIsAnimating(true)
        toggleTheme()

        // Reset animation after transition completes
        setTimeout(() => setIsAnimating(false), 600)
    }

    const handleLanguageToggle = () => {
        toggleLang()
    }

    return (
        <div className="floating-controls">
            <div className="floating-controls__container">
                <button
                    className="floating-controls__button"
                    onClick={handleLanguageToggle}
                    aria-label={`Switch to ${lang === 'az' ? 'English' : 'Azerbaijani'}`}
                    title={`Switch to ${lang === 'az' ? 'English' : 'Azerbaijani'}`}
                >
                    <span className="floating-controls__text">
                        {lang === 'az' ? 'AZ' : 'EN'}
                    </span>
                </button>

                <button
                    className={`floating-controls__button ${isAnimating ? 'floating-controls__button--animating' : ''}`}
                    onClick={handleThemeToggle}
                    aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
                    title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
                    disabled={isAnimating}
                >
                    <div className="floating-controls__icon-wrapper">
                        {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
                    </div>
                </button>
            </div>
        </div>
    )
}

export default FloatingControls
