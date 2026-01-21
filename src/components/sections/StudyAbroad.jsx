import { Link } from 'react-router-dom'
import ScrollReveal from '../ui/ScrollReveal'
import { useLanguage } from '../../i18n/LanguageProvider'
function StudyAbroad() {
  const { t } = useLanguage()
  return (
    <ScrollReveal
      baseOpacity={0}
      enableBlur={true}
      baseRotation={0}
      blurStrength={10}
    >
      <section className="studyAbroad" id="study-abroad">
        <div className="container studyAbroad__inner">
          <div className="studyAbroad__copy">
            <p className="studyAbroad__eyebrow">{t('studyAbroadComponent.eyebrow')}</p>
            <h2 className="studyAbroad__title">{t('studyAbroadComponent.title')}</h2>
            <p className="studyAbroad__subtitle">
              {t('studyAbroadComponent.subtitle')}
            </p>

            <ul className="studyAbroad__list">
              <li>{t('studyAbroadComponent.services.universitySelection')}</li>
              <li>{t('studyAbroadComponent.services.documentPreparation')}</li>
              <li>{t('studyAbroadComponent.services.scholarships')}</li>
              <li>{t('studyAbroadComponent.services.visaGuidance')}</li>
              <li>{t('studyAbroadComponent.services.educationPlan')}</li>
              <li>{t('studyAbroadComponent.services.ongoingSupport')}</li>
            </ul>

            <div className="studyAbroad__actions">
              <Link to="/contact" className="btn btn--primary">
                {t('studyAbroadComponent.buttons.getConsultation')}
              </Link>
              <Link to="/study-abroad" className="btn btn--secondary">
                {t('studyAbroadComponent.buttons.learnMore')}
              </Link>
            </div>
          </div>

          <div className="studyAbroad__media">
            <img
              className="studyAbroad__image"
              src="/photos/studyAbroad.jpeg"
              alt={t('studyAbroadComponent.imageAlt')}
              loading="lazy"
            />

            <div className="studyAbroad__highlight">
              <span className="studyAbroad__highlight-text">{t('studyAbroadComponent.highlight')}</span>
            </div>
          </div>
        </div>
      </section>
    </ScrollReveal>
  )
}

export default StudyAbroad
