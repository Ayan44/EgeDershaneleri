import { Link } from 'react-router-dom'
import SplitText from '../ui/SplitText'
import { useLanguage } from '../../i18n/LanguageProvider'

function Hero() {
  const { t } = useLanguage()
  return (
    <section className="hero">
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__fallback" />
        <img
          src="/videos/hero.webp"
          alt=""
          className="hero__webp"
          loading="lazy"
          aria-hidden="true"
        />
        <div className="hero__overlay" />
        <div className="hero__fade" />
      </div>

      <div className="hero__inner">
        <div className="container hero__content">
          <SplitText
            tag="h1"
            text={t('hero.title')}
            className="hero__title"
            delay={100}
            duration={1.5}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 24 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.2}
            rootMargin="-80px"
            textAlign="left"
          />

          <p className="hero__subtitle">
            {t('hero.subtitle')}
          </p>

          <div className="hero__actions">
            <Link to="/contact" className="btn btn--primary">
              {t('hero.contact')}
            </Link>
            <Link to="/about" className="btn btn--secondary">
              {t('hero.about')}
            </Link>
          </div>

          <ul className="hero__chips">
            <li className="chip">{t('hero.chips.exams')}</li>
            <li className="chip">{t('hero.chips.teachers')}</li>
            <li className="chip">{t('hero.chips.results')}</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Hero
