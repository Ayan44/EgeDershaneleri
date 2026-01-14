import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    // Disable browser's default scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    // Scroll to top with multiple methods for maximum compatibility
    const scrollToTop = () => {
      // Method 1: window.scrollTo (simple and reliable)
      window.scrollTo(0, 0)
      
      // Method 2: Direct property assignment (immediate, no animation)
      if (document.documentElement) {
        document.documentElement.scrollTop = 0
        document.documentElement.scrollLeft = 0
      }
      if (document.body) {
        document.body.scrollTop = 0
        document.body.scrollLeft = 0
      }
      
      // Method 3: scrollIntoView for main element
      const mainElement = document.querySelector('main')
      if (mainElement) {
        mainElement.scrollIntoView({ behavior: 'auto', block: 'start' })
      }
    }

    // Immediate scroll
    scrollToTop()

    // Scroll after DOM updates
    const rafId = requestAnimationFrame(() => {
      scrollToTop()
      // Also scroll after a small delay to handle async rendering
      setTimeout(scrollToTop, 10)
      setTimeout(scrollToTop, 50)
    })

    return () => {
      cancelAnimationFrame(rafId)
    }
  }, [pathname])

  return null
}

export default ScrollToTop

