import { useState } from 'react'
import './AbroadEducation.css'
import Breadcrumb from '../components/ui/Breadcrumb'
import ScrollReveal from '../components/ui/ScrollReveal'
import { useLanguage } from '../i18n/LanguageProvider'
function StudyAbroad() {
  const { t } = useLanguage()
  const [openFaq, setOpenFaq] = useState(null)

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  const faqData = [
    {
      question: t('studyAbroad.faq.questions.duration.question'),
      answer: t('studyAbroad.faq.questions.duration.answer')
    },
    {
      question: t('studyAbroad.faq.questions.language.question'),
      answer: t('studyAbroad.faq.questions.language.answer')
    },
    {
      question: t('studyAbroad.faq.questions.scholarships.question'),
      answer: t('studyAbroad.faq.questions.scholarships.answer')
    },
    {
      question: t('studyAbroad.faq.questions.documents.question'),
      answer: t('studyAbroad.faq.questions.documents.answer')
    }
  ]

  return (
    <main className="container page">
      <ScrollReveal
        baseOpacity={0}
        enableBlur={true}
        baseRotation={0}
        blurStrength={10}
      >
        <Breadcrumb
          items={[
            { href: '/', label: t('studyAbroad.breadcrumb.home') },
            { label: t('studyAbroad.breadcrumb.studyAbroad') }
          ]}
        />
      </ScrollReveal>

      <div className="pageContentAbout">
        {/* 1️⃣ Hero Section */}
        <ScrollReveal
          baseOpacity={0}
          enableBlur={true}
          baseRotation={0}
          blurStrength={10}
        >
          <section className="abroad-hero">
            <div className="abroad-hero__content">
              <div className="abroad-hero__text">
                <h1 className="abroad-hero__title">{t('studyAbroad.hero.title')}</h1>
                <p className="abroad-hero__subtitle">
                  {t('studyAbroad.hero.subtitle')}
                </p>
              </div>
              <div className="abroad-hero__image">
                <div className="abroad-hero__placeholder">
                  <img
                    className="studyAbroad__image"
                    src="/photos/studyAbroad.jpeg"
                    alt={t('studyAbroadComponent.imageAlt')}
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>
        {/* 2️⃣ Process Steps */}
        <ScrollReveal
          baseOpacity={0}
          enableBlur={true}
          baseRotation={0}
          blurStrength={10}
        >
          <section className="abroad-process">
            <div className="abroad-container">
              <h2 className="abroad-section__title">{t('studyAbroad.process.title')}</h2>

              <div className="abroad-process__timeline">
                <div className="process-step">
                  <div className="process-step__number">1</div>
                  <div className="process-step__content">
                    <h3 className="process-step__title">{t('studyAbroad.process.steps.consultation.title')}</h3>
                    <ul className="process-step__list">
                      <li>{t('studyAbroad.process.steps.consultation.description1')}</li>
                      <li>{t('studyAbroad.process.steps.consultation.description2')}</li>
                    </ul>
                  </div>
                </div>

                <div className="process-step">
                  <div className="process-step__number">2</div>
                  <div className="process-step__content">
                    <h3 className="process-step__title">{t('studyAbroad.process.steps.selection.title')}</h3>
                    <ul className="process-step__list">
                      <li>{t('studyAbroad.process.steps.selection.description1')}</li>
                      <li>{t('studyAbroad.process.steps.selection.description2')}</li>
                    </ul>
                  </div>
                </div>

                <div className="process-step">
                  <div className="process-step__number">3</div>
                  <div className="process-step__content">
                    <h3 className="process-step__title">{t('studyAbroad.process.steps.preparation.title')}</h3>
                    <ul className="process-step__list">
                      <li>{t('studyAbroad.process.steps.preparation.description1')}</li>
                      <li>{t('studyAbroad.process.steps.preparation.description2')}</li>
                    </ul>
                  </div>
                </div>

                <div className="process-step">
                  <div className="process-step__number">4</div>
                  <div className="process-step__content">
                    <h3 className="process-step__title">{t('studyAbroad.process.steps.visa.title')}</h3>
                    <ul className="process-step__list">
                      <li>{t('studyAbroad.process.steps.visa.description1')}</li>
                      <li>{t('studyAbroad.process.steps.visa.description2')}</li>
                    </ul>
                  </div>
                </div>

                <div className="process-step">
                  <div className="process-step__number">5</div>
                  <div className="process-step__content">
                    <h3 className="process-step__title">{t('studyAbroad.process.steps.relocation.title')}</h3>
                    <ul className="process-step__list">
                      <li>{t('studyAbroad.process.steps.relocation.description1')}</li>
                      <li>{t('studyAbroad.process.steps.relocation.description2')}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* 3️⃣ Top Destinations */}
        <ScrollReveal
          baseOpacity={0}
          enableBlur={true}
          baseRotation={0}
          blurStrength={10}
        >
          <section className="abroad-destinations">
            <div className="abroad-container">
              <h2 className="abroad-section__title">{t('studyAbroad.destinations.title')}</h2>

              <div className="abroad-destinations__grid">
                <div className="destination-card">
                  <div className="destination-card__flag">
                    <img
                      src="/photos/flags/turkey.png"
                      alt="Türkiyə bayrağı"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.classList.add('flag-fallback');
                      }}
                    />
                  </div>
                  <div className="destination-card__content">
                    <h3 className="destination-card__name">{t('studyAbroad.destinations.countries.turkey.name')}</h3>
                    <p className="destination-card__description">
                      {t('studyAbroad.destinations.countries.turkey.description')}
                    </p>
                  </div>
                </div>

                <div className="destination-card">
                  <div className="destination-card__flag">
                    <img
                      src="/photos/flags/russia.png"
                      alt="Rusiya bayrağı"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.classList.add('flag-fallback');
                      }}
                    />
                  </div>
                  <div className="destination-card__content">
                    <h3 className="destination-card__name">{t('studyAbroad.destinations.countries.russia.name')}</h3>
                    <p className="destination-card__description">
                      {t('studyAbroad.destinations.countries.russia.description')}
                    </p>
                  </div>
                </div>

                <div className="destination-card">
                  <div className="destination-card__flag">
                    <img
                      src="/photos/flags/china.png"
                      alt="Çin bayrağı"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.classList.add('flag-fallback');
                      }}
                    />
                  </div>
                  <div className="destination-card__content">
                    <h3 className="destination-card__name">{t('studyAbroad.destinations.countries.china.name')}</h3>
                    <p className="destination-card__description">
                      {t('studyAbroad.destinations.countries.china.description')}
                    </p>
                  </div>
                </div>

                <div className="destination-card">
                  <div className="destination-card__flag">
                    <img
                      src="/photos/flags/usa.png"
                      alt="ABŞ bayrağı"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.classList.add('flag-fallback');
                      }}
                    />
                  </div>
                  <div className="destination-card__content">
                    <h3 className="destination-card__name">{t('studyAbroad.destinations.countries.usa.name')}</h3>
                    <p className="destination-card__description">
                      {t('studyAbroad.destinations.countries.usa.description')}
                    </p>
                  </div>
                </div>

                <div className="destination-card">
                  <div className="destination-card__flag">
                    <img
                      src="/photos/flags/canada.png"
                      alt="Kanada bayrağı"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.classList.add('flag-fallback');
                      }}
                    />
                  </div>
                  <div className="destination-card__content">
                    <h3 className="destination-card__name">{t('studyAbroad.destinations.countries.canada.name')}</h3>
                    <p className="destination-card__description">
                      {t('studyAbroad.destinations.countries.canada.description')}
                    </p>
                  </div>
                </div>

                <div className="destination-card">
                  <div className="destination-card__flag">
                    <img
                      src="/photos/flags/poland.png"
                      alt="Polşa bayrağı"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.classList.add('flag-fallback');
                      }}
                    />
                  </div>
                  <div className="destination-card__content">
                    <h3 className="destination-card__name">{t('studyAbroad.destinations.countries.poland.name')}</h3>
                    <p className="destination-card__description">
                      {t('studyAbroad.destinations.countries.poland.description')}
                    </p>
                  </div>
                </div>
              </div>

              {/* 4️⃣ Other Countries Note */}
              <div className="abroad-note">
                <div className="abroad-note__content">
                  <p>
                    {t('studyAbroad.destinations.note')}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* 5️⃣ Who Is It For */}
        <ScrollReveal
          baseOpacity={0}
          enableBlur={true}
          baseRotation={0}
          blurStrength={10}
        >
          <section className="abroad-audience">
            <div className="abroad-container">
              <h2 className="abroad-section__title">{t('studyAbroad.audience.title')}</h2>

              <div className="abroad-audience__grid">
                <div className="audience-item">
                  <div className="audience-item__icon">🎓</div>
                  <h3 className="audience-item__title">{t('studyAbroad.audience.items.graduates')}</h3>
                </div>

                <div className="audience-item">
                  <div className="audience-item__icon">📚</div>
                  <h3 className="audience-item__title">{t('studyAbroad.audience.items.students')}</h3>
                </div>

                <div className="audience-item">
                  <div className="audience-item__icon">🎓</div>
                  <h3 className="audience-item__title">{t('studyAbroad.audience.items.diploma')}</h3>
                </div>

                <div className="audience-item">
                  <div className="audience-item__icon">👨‍👩‍👧‍👦</div>
                  <h3 className="audience-item__title">{t('studyAbroad.audience.items.parents')}</h3>
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>
        {/* 6️⃣ Mini FAQ */}
        <ScrollReveal
          baseOpacity={0}
          enableBlur={true}
          baseRotation={0}
          blurStrength={10}
        >
          <section className="abroad-faq">
            <div className="abroad-container">
              <h2 className="abroad-section__title">{t('studyAbroad.faq.title')}</h2>

              <div className="faqAccordion">
                {faqData.map((faq, index) => (
                  <div key={index} className="faqItem">
                    <button
                      className={`faqQuestion ${openFaq === index ? 'faqQuestion--open' : ''}`}
                      onClick={() => toggleFaq(index)}
                      aria-expanded={openFaq === index}
                      aria-controls={`faq-answer-${index}`}
                    >
                      <span>{faq.question}</span>
                      <span className="faqIcon" aria-hidden="true">
                        {openFaq === index ? '−' : '+'}
                      </span>
                    </button>
                    <div
                      id={`faq-answer-${index}`}
                      className={`faqAnswer ${openFaq === index ? 'faqAnswer--open' : ''}`}
                      aria-hidden={openFaq !== index}
                    >
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </ScrollReveal>
      </div>
    </main>
  )
}

export default StudyAbroad


