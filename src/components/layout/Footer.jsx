import React from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../../i18n/LanguageProvider'

const Footer = () => {
  const { t } = useLanguage()
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
                {t('footer.brand.description')}
              </p>
            </div>

            <div className="footerSocial">
              <h4 className="footerHeading">{t('footer.social.followUs')}</h4>
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
            <h4 className="footerHeading">{t('footer.quickLinks')}</h4>
            <nav className="footerNav">
              <ul className="footerNavList">
                <li>
                  <Link to="/" className="footerNavLink">
                    {t('nav.home')}
                  </Link>
                </li>
                <li>
                  <Link to="/courses" className="footerNavLink">
                    {t('nav.courses')}
                  </Link>
                </li>
                <li>
                  <Link to="/teachers" className="footerNavLink">
                    {t('nav.teachers')}
                  </Link>
                </li>
                <li>
                  <Link to="/study-abroad" className="footerNavLink">
                    {t('nav.studyAbroad')}
                  </Link>
                </li>
                <li>
                  <Link to="/achievements" className="footerNavLink">
                    {t('nav.achievements')}
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="footerNavLink">
                    {t('nav.blog')}
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="footerNavLink">
                    {t('nav.contact')}
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Courses */}
          <div className="footerColumn">
            <h4 className="footerHeading">{t('footer.courses')}</h4>
            <nav className="footerNav">
              <ul className="footerNavList">
                <li>
                  <Link to="/courses/sat" className="footerNavLink">
                    {t('nav.sat')}
                  </Link>
                </li>
                <li>
                  <Link to="/courses/yos-tys" className="footerNavLink">
                    {t('nav.yosTys')}
                  </Link>
                </li>
                <li>
                  <Link to="/courses/ielts" className="footerNavLink">
                    {t('nav.ielts')}
                  </Link>
                </li>
                <li>
                  <Link to="/courses/toefl" className="footerNavLink">
                    {t('nav.toefl')}
                  </Link>
                </li>
                <li>
                  <Link to="/courses/general-english" className="footerNavLink">
                    {t('nav.generalEnglish')}
                  </Link>
                </li>
                <li>
                  <Link to="/courses/olympiad/math" className="footerNavLink">
                    {t('nav.olympiadPrep')}
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="footerColumn">
            <h4 className="footerHeading">{t('footer.contactInfo')}</h4>
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
                {t('footer.hours')}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footerBottom">
          <div className="footerBottomContent">
            <div className="footerCopyright">
              <p>{t('footer.copyright')}</p>
              <p className="footerDeveloper">
                {t('footer.developedBy')}{' '}
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
                {t('footer.privacyPolicy')}
              </Link>
              <Link to="/terms-of-service" className="footerBottomLink">
                {t('footer.termsOfService')}
              </Link>
            </nav>
          </div>

          {/* Scroll to Top Button */}
          <button
            onClick={scrollToTop}
            className="scrollToTop"
            aria-label={t('footer.scrollToTop')}
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