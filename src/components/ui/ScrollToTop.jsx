import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Disable automatic scroll restoration
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual'
}

function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    // Handle scrolling after route changes
    const handleScroll = () => {
      if (hash) {
        // If there's a hash, scroll to the element with that ID
        const element = document.getElementById(hash.substring(1))
        if (element) {
          // Use setTimeout to ensure DOM is fully rendered
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }, 100)
        } else {
          // If element doesn't exist, scroll to top
          scrollToTop()
        }
      } else {
        // No hash, scroll to top immediately
        scrollToTop()
      }
    }

    const scrollToTop = () => {
      // Force scroll to top with multiple methods for reliability
      window.scrollTo(0, 0)
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
    }

    // Small delay to ensure DOM is fully updated
    const timer = setTimeout(() => {
      handleScroll()
    }, 50)

    return () => clearTimeout(timer)
  }, [pathname, hash])

  return null
}

export default ScrollToTop
