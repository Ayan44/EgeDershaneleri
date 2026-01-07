"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"

import { cn } from "../../lib/utils"

export interface ToggleThemeProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    theme?: "light" | "dark"
    onThemeToggle?: () => void
}

const ToggleTheme = React.forwardRef<HTMLButtonElement, ToggleThemeProps>(
    ({ className, theme = "light", onThemeToggle, ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
                    "h-10 w-10 border border-input hover:bg-accent hover:text-accent-foreground",
                    className
                )}
                onClick={onThemeToggle}
                aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
                {...props}
            >
                {theme === "light" ? (
                    <Moon className="h-4 w-4" />
                ) : (
                    <Sun className="h-4 w-4" />
                )}
                <span className="sr-only">Toggle theme</span>
            </button>
        )
    }
)
ToggleTheme.displayName = "ToggleTheme"

export { ToggleTheme }
