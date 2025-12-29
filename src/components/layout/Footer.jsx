import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="siteFooter">
      <div className="container footerContainer">
        {/* Main Footer Content */}
        <div className="footerGrid">
          {/* Brand Column */}
          <div className="footerColumn">
            <div className="footerBrand">
              <Link to="/" className="footerBrandLink">
                <span className="footerBrandText">EGE Dershane</span>
              </Link>
              <p className="footerBrandDesc">
                Xaricdə təhsil və imtahan hazırlığı üzrə peşəkar tədris mərkəzi.
              </p>
            </div>

            <div className="footerSocial">
              <h4 className="footerHeading">Bizi izləyin</h4>
              <div className="footerSocialLinks">
                <a
                  href="#"
                  className="footerSocialLink"
                  aria-label="Instagram səhifəmizə keçin"
                >
                  Instagram
                </a>
                <a
                  href="#"
                  className="footerSocialLink"
                  aria-label="WhatsApp ilə əlaqə saxlayın"
                >
                  WhatsApp
                </a>
                <a
                  href="#"
                  className="footerSocialLink"
                  aria-label="YouTube kanalımıza baxın"
                >
                  YouTube
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footerColumn">
            <h4 className="footerHeading">Tez keçidlər</h4>
            <nav className="footerNav">
              <ul className="footerNavList">
                <li>
                  <Link to="/" className="footerNavLink">
                    Ana səhifə
                  </Link>
                </li>
                <li>
                  <Link to="/courses" className="footerNavLink">
                    Kurslar
                  </Link>
                </li>
                <li>
                  <Link to="/teachers" className="footerNavLink">
                    Müəllim heyəti
                  </Link>
                </li>
                <li>
                  <Link to="/study-abroad" className="footerNavLink">
                    Xaricdə Təhsil
                  </Link>
                </li>
                <li>
                  <Link to="/achievements" className="footerNavLink">
                    Nailiyyətlərimiz
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="footerNavLink">
                    Bloq
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="footerNavLink">
                    Əlaqə
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Courses */}
          <div className="footerColumn">
            <h4 className="footerHeading">Kurslar</h4>
            <nav className="footerNav">
              <ul className="footerNavList">
                <li>
                  <Link to="/courses/sat" className="footerNavLink">
                    SAT
                  </Link>
                </li>
                <li>
                  <Link to="/courses/yos-tys" className="footerNavLink">
                    YÖS / TYS
                  </Link>
                </li>
                <li>
                  <Link to="/courses/ielts" className="footerNavLink">
                    IELTS
                  </Link>
                </li>
                <li>
                  <Link to="/courses/toefl" className="footerNavLink">
                    TOEFL
                  </Link>
                </li>
                <li>
                  <Link to="/courses/general-english" className="footerNavLink">
                    General English
                  </Link>
                </li>
                <li>
                  <Link to="/courses/olympiad/math" className="footerNavLink">
                    Olimpiada hazırlığı
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="footerColumn">
            <h4 className="footerHeading">Əlaqə məlumatları</h4>
            <div className="footerContact">
              <div className="footerContactItem">
                <span className="footerContactIcon" aria-hidden="true">📞</span>
                <a href="tel:+994501234567" className="footerContactLink">
                  +994 50 123 45 67
                </a>
              </div>
              <div className="footerContactItem">
                <span className="footerContactIcon" aria-hidden="true">✉️</span>
                <a href="mailto:info@egedershane.az" className="footerContactLink">
                  info@egedershane.az
                </a>
              </div>
              <div className="footerContactItem">
                <span className="footerContactIcon" aria-hidden="true">📍</span>
                <address className="footerContactAddress">
                  Bakı, Azərbaycan
                </address>
              </div>
              <div className="footerContactHours">
                Həftə içi: 10:00–19:00
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footerBottom">
          <div className="footerBottomContent">
            <div className="footerCopyright">
              <p>© 2025 EGE Dershane. Bütün hüquqlar qorunur.</p>
              <p className="footerDeveloper">
                Developed by{' '}
                <a
                  href="https://www.linkedin.com/in/ayan-qafarlı"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footerDeveloperLink"
                >
                  Ayan Gafarli
                </a>
              </p>
            </div>
            <nav className="footerBottomNav">
              <Link to="/privacy-policy" className="footerBottomLink">
                Məxfilik siyasəti
              </Link>
              <Link to="/terms-of-service" className="footerBottomLink">
                İstifadə şərtləri
              </Link>
            </nav>
          </div>

          {/* Scroll to Top Button */}
          <button
            onClick={scrollToTop}
            className="scrollToTop"
            aria-label="Yuxarı sürüşdür"
            type="button"
          >
            <span aria-hidden="true">↑</span>
          </button>
        </div>
      </div>
    </footer>
  )
}

export default Footer