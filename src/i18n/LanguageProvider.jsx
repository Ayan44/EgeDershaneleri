import React, { createContext, useContext, useState, useEffect } from 'react'
import { az } from '../locales/az.js'
import { en } from '../locales/en.js'

const LanguageContext = createContext()

const translations = {
    az,
    en,
}

export const useLanguage = () => {
    const context = useContext(LanguageContext)
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider')
    }
    return context
}

export const LanguageProvider = ({ children }) => {
    const [lang, setLang] = useState(() => {
        // Get initial language from localStorage or default to 'az'
        if (typeof window !== 'undefined') {
            return localStorage.getItem('ege_lang') || 'az'
        }
        return 'az'
    })

    const toggleLang = () => {
        setLang(prev => prev === 'az' ? 'en' : 'az')
    }

    // Persist language to localStorage
    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('ege_lang', lang)
        }
    }, [lang])

    // Safe translation function that handles nested keys
    const t = (key) => {
        const keys = key.split('.')
        let value = translations[lang]

        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k]
            } else {
                // Return the key if translation is missing
                return key
            }
        }

        // Return the value if it's a string or array, otherwise return the key
        if (typeof value === 'string' || Array.isArray(value)) {
            return value
        }
        return key
    }

    const value = {
        lang,
        toggleLang,
        t,
    }

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    )
}
