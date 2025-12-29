import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

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
          }, 0)
        } else {
          // If element doesn't exist, scroll to top
          window.scrollTo(0, 0)
        }
      } else {
        // No hash, scroll to top
        window.scrollTo(0, 0)
      }
    }

    // Use requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(() => {
      handleScroll()
    })
  }, [pathname, hash])

  return null
}

export default ScrollToTop
