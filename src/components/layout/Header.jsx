import { useEffect, useRef, useState, useCallback } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useLanguage } from '../../i18n/LanguageProvider'

const PHONE_NUMBER = '+994501234567'
const WHATSAPP_NUMBER = '994501234567'

function Header() {
  const { t } = useLanguage()
  const [menuOpen, setMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)
  const [openMobileDropdowns, setOpenMobileDropdowns] = useState({})
  const [navbarHidden, setNavbarHidden] = useState(false)
  const navRef = useRef(null)
  const location = useLocation()
  const lastScrollY = useRef(0)
  const scrollThreshold = useRef(10)

  const navItems = [
    { type: 'link', label: t('nav.home'), to: '/' },
    { type: 'link', label: t('nav.courses'), to: '/courses' },
    { type: 'link', label: t('nav.teachers'), to: '/teachers' },
    { type: 'link', label: t('nav.studyAbroad'), to: '/study-abroad' },
    { type: 'link', label: t('nav.achievements'), to: '/achievements' },
    { type: 'link', label: t('nav.about'), to: '/about' },
    { type: 'link', label: t('nav.blog'), to: '/blog' },
  ]

  const isMobile =
    typeof window !== 'undefined' && window.matchMedia
      ? window.matchMedia('(max-width: 768px)').matches
      : false

  const handleToggleMenu = () => {
    setMenuOpen((open) => !open)
  }

  const closeAllMenus = useCallback(() => {
    setMenuOpen(false)
    setOpenDropdown(null)
    setOpenMobileDropdowns({})
  }, [])

  const handleLinkClick = () => {
    closeAllMenus()
  }

  const navLinkClassName = ({ isActive, to }) => {
    // Special handling for courses link - should be active on all /courses/* routes
    if (to === '/courses' && location.pathname.startsWith('/courses')) {
      return 'nav__link nav__link--active'
    }
    // Special handling for teachers link - should be active on all /teachers* routes (including query params)
    if (to === '/teachers' && location.pathname.startsWith('/teachers')) {
      return 'nav__link nav__link--active'
    }
    return isActive ? 'nav__link nav__link--active' : 'nav__link'
  }

  const handleDesktopDropdownToggle = (id) => {
    if (isMobile) return
    setOpenDropdown((current) => (current === id ? null : id))
  }

  const handleMobileDropdownToggle = (id) => {
    setOpenMobileDropdowns((current) => ({
      ...current,
      [id]: !current[id],
    }))
  }

  // Body scroll lock for mobile menu
  useEffect(() => {
    if (!isMobile) return

    const body = document.body
    const html = document.documentElement

    if (menuOpen) {
      // Store current scroll position
      const scrollY = window.scrollY

      // Lock body scroll
      body.style.position = 'fixed'
      body.style.top = `-${scrollY}px`
      body.style.width = '100%'
      body.style.overflow = 'hidden'

      // Also lock html for better compatibility
      html.style.overflow = 'hidden'

      // Store scroll position for restoration
      body.dataset.scrollY = scrollY.toString()
    } else {
      // Restore body scroll
      const scrollY = parseInt(body.dataset.scrollY || '0', 10)

      body.style.position = ''
      body.style.top = ''
      body.style.width = ''
      body.style.overflow = ''

      html.style.overflow = ''

      // Restore scroll position
      window.scrollTo(0, scrollY)

      // Clean up stored position
      delete body.dataset.scrollY
    }

    return () => {
      // Cleanup on unmount
      body.style.position = ''
      body.style.top = ''
      body.style.width = ''
      body.style.overflow = ''
      html.style.overflow = ''
      delete body.dataset.scrollY
    }
  }, [menuOpen, isMobile])

  // Handle dropdown closing behaviors
  useEffect(() => {
    if (openDropdown === null) return

    const handleOutsideClick = (event) => {
      // Check if click is outside the nav container
      if (navRef.current && !navRef.current.contains(event.target)) {
        setOpenDropdown(null)
      }
    }

    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        setOpenDropdown(null)
      }
    }

    const handleScroll = () => {
      setOpenDropdown(null)
    }

    // Add event listeners
    document.addEventListener('mousedown', handleOutsideClick)
    document.addEventListener('keydown', handleEscapeKey)
    window.addEventListener('scroll', handleScroll, { capture: true, passive: true })

    // Cleanup function
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
      document.removeEventListener('keydown', handleEscapeKey)
      window.removeEventListener('scroll', handleScroll, { capture: true })
    }
  }, [openDropdown])

  // Auto-hide navbar on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Don't hide navbar if mobile menu is open
      if (menuOpen) {
        setNavbarHidden(false)
        return
      }

      // Always show navbar when at the very top
      if (currentScrollY <= 0) {
        setNavbarHidden(false)
        lastScrollY.current = currentScrollY
        return
      }

      // Check scroll direction with threshold to avoid jitter
      const scrollDifference = Math.abs(currentScrollY - lastScrollY.current)

      if (scrollDifference >= scrollThreshold.current) {
        const isScrollingDown = currentScrollY > lastScrollY.current
        setNavbarHidden(isScrollingDown)
        lastScrollY.current = currentScrollY
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [menuOpen])

  return (
    <header className={`site-header ${navbarHidden ? 'navbar--hidden' : ''}`}>
      <div className="container nav" ref={navRef}>
        <div className="nav__brand">
          <NavLink to="/" className="nav__brand-link" onClick={handleLinkClick}>
            <img
              src="/photos/logo.png"
              alt="EGE Dershane Logo"
              className="nav__brand-logo"
            />
          </NavLink>
        </div>

        <button
          type="button"
          className="nav__toggle"
          aria-label={menuOpen ? t('nav.ariaLabels.closeMenu') : t('nav.ariaLabels.openMenu')}
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          onClick={handleToggleMenu}
        >
          <div className="nav__icon-container">
            <Menu
              className={`nav__icon nav__icon--menu ${menuOpen ? 'nav__icon--hidden' : ''}`}
              size={20}
              strokeWidth={2.5}
            />
            <X
              className={`nav__icon nav__icon--close ${menuOpen ? '' : 'nav__icon--hidden'}`}
              size={20}
              strokeWidth={2.5}
            />
          </div>
        </button>

        <nav
          id="main-navigation"
          className={`nav__menu ${menuOpen ? 'nav__menu--open' : ''}`}
          aria-label="Main navigation"
        >
          <ul className="nav__links">
            {navItems.map((item) => {
              if (item.type === 'link') {
                return (
                  <li key={item.label} className="nav__item">
                    <NavLink
                      to={item.to}
                      className={navLinkClassName}
                      onClick={handleLinkClick}
                    >
                      {item.label}
                    </NavLink>
                  </li>
                )
              }

              if (item.type === 'dropdown') {
                const isDesktopOpen = openDropdown === item.id
                const isMobileOpen = !!openMobileDropdowns[item.id]
                const dropdownOpen = menuOpen ? isMobileOpen : isDesktopOpen
                const dropdownId = `dropdown-${item.id}`

                return (
                  <li key={item.id} className="nav__item nav__item--has-dropdown">
                    <button
                      type="button"
                      className="nav__dropdown-toggle"
                      aria-expanded={dropdownOpen}
                      aria-controls={dropdownId}
                      onClick={() =>
                        menuOpen
                          ? handleMobileDropdownToggle(item.id)
                          : handleDesktopDropdownToggle(item.id)
                      }
                    >
                      {item.label}
                      <span className="nav__chevron" aria-hidden="true">
                        ▾
                      </span>
                    </button>

                    <div
                      id={dropdownId}
                      className={`nav__dropdown ${dropdownOpen ? 'nav__dropdown--open' : ''
                        } ${item.id === 'courses' ? 'nav__dropdown--mega' : ''}`}
                    >
                      {item.id === 'courses' ? (
                        <div className="nav__dropdown-grid">
                          <div className="nav__dropdown-col">
                            {item.items
                              .filter((child) => !child.group)
                              .map((child) => (
                                <NavLink
                                  key={child.to}
                                  to={child.to}
                                  className="nav__dropdown-link"
                                  onClick={handleLinkClick}
                                >
                                  {child.label}
                                </NavLink>
                              ))}
                          </div>
                          <div className="nav__dropdown-col">
                            {item.items
                              .filter((child) => child.group)
                              .map((group) => (
                                <div key={group.label} className="nav__dropdown-group">
                                  <div className="nav__dropdown-group-title">
                                    {group.label}
                                  </div>
                                  {group.children?.map((child) => (
                                    <NavLink
                                      key={child.to}
                                      to={child.to}
                                      className="nav__dropdown-link"
                                      onClick={handleLinkClick}
                                    >
                                      {child.label}
                                    </NavLink>
                                  ))}
                                </div>
                              ))}
                          </div>
                        </div>
                      ) : (
                        <div className="nav__dropdown-list">
                          {item.items.map((child) => (
                            <NavLink
                              key={child.to}
                              to={child.to}
                              className="nav__dropdown-link"
                              onClick={handleLinkClick}
                            >
                              {child.label}
                            </NavLink>
                          ))}
                        </div>
                      )}
                    </div>
                  </li>
                )
              }

              return null
            })}
          </ul>

          <NavLink
            to="/contact"
            className="button button--primary nav__cta"
            onClick={handleLinkClick}
          >
            {t('nav.contact')}
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Header
