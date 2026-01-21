import React, { useState } from 'react'
import { GALLERY_ITEMS } from '../data/gallery'
import DomeGallery from '../components/sections/DomeGallery'
import Breadcrumb from '../components/ui/Breadcrumb'
import ScrollReveal from '../components/ui/ScrollReveal'
import { useLanguage } from '../i18n/LanguageProvider'

function About() {
  const { t } = useLanguage()
  const [openFaq, setOpenFaq] = useState(null)

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  const faqItems = [
    {
      question: t('about.faq.questions.registration.question'),
      answer: t('about.faq.questions.registration.answer')
    },
    {
      question: t('about.faq.questions.format.question'),
      answer: t('about.faq.questions.format.answer')
    },
    {
      question: t('about.faq.questions.duration.question'),
      answer: t('about.faq.questions.duration.answer')
    },
    {
      question: t('about.faq.questions.pricing.question'),
      answer: t('about.faq.questions.pricing.answer')
    },
    {
      question: t('about.faq.questions.studyAbroad.question'),
      answer: t('about.faq.questions.studyAbroad.answer')
    },
    {
      question: t('about.faq.questions.achievements.question'),
      answer: t('about.faq.questions.achievements.answer')
    },
    {
      question: t('about.faq.questions.schedule.question'),
      answer: t('about.faq.questions.schedule.answer')
    },
    {
      question: t('about.faq.questions.payment.question'),
      answer: t('about.faq.questions.payment.answer')
    }
  ]

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

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
            { href: '/', label: t('about.breadcrumb.home') },
            { label: t('about.breadcrumb.about') }
          ]}
        />
      </ScrollReveal>
      <div className="pageContentAbout">
        <ScrollReveal
          baseOpacity={0}
          enableBlur={true}
          baseRotation={0}
          blurStrength={10}
        >
          <header className="pageHeader">
            <h1>{t('about.page.title')}</h1>
            <p className="pageIntro">
              {t('about.page.intro')}
            </p>
          </header>
        </ScrollReveal>
        {/* In-page navigation */}
        <ScrollReveal
          baseOpacity={0}
          enableBlur={true}
          baseRotation={0}
          blurStrength={10}
        >
          <nav className="aboutNav" aria-label="Səhifə naviqasiyası">
            <div className="aboutNavButtons">
              <button
                onClick={() => scrollToSection('company')}
                className="aboutNavButton"
              >
                {t('about.navigation.company')}
              </button>
              <button
                onClick={() => scrollToSection('gallery')}
                className="aboutNavButton"
              >
                {t('about.navigation.gallery')}
              </button>
              <button
                onClick={() => scrollToSection('faq')}
                className="aboutNavButton"
              >
                {t('about.navigation.faq')}
              </button>
            </div>
          </nav>
        </ScrollReveal>

        <div className="pageBody">
          {/* Company Section */}
          <ScrollReveal
            baseOpacity={0}
            enableBlur={true}
            baseRotation={0}
            blurStrength={10}
          >
            <section id="company" className="contentSection">
              <h2>{t('about.company.title')}</h2>
              <p>
                {t('about.company.description')}
              </p>
              <div className="companyHighlights">
                <div className="highlightItem">
                  <h3>{t('about.company.mission.title')}</h3>
                  <p>{t('about.company.mission.description')}</p>
                </div>
                <div className="highlightItem">
                  <h3>{t('about.company.approach.title')}</h3>
                  <p>{t('about.company.approach.description')}</p>
                </div>
                <div className="highlightItem">
                  <h3>{t('about.company.results.title')}</h3>
                  <p>{t('about.company.results.description')}</p>
                </div>
              </div>
            </section>
          </ScrollReveal>

          {/* Gallery Section */}
          <ScrollReveal
            baseOpacity={0}
            enableBlur={true}
            baseRotation={0}
            blurStrength={10}
          >
            <section id="gallery" className="contentSection">
              <h2>{t('about.gallery.title')}</h2>
              <p>
                {t('about.gallery.description')}
              </p>
              {/* Gallery content will be implemented later */}
              <div style={{ width: '100%', height: '70vh' }}>
                <DomeGallery
                  images={GALLERY_ITEMS}
                  grayscale={false}
                  fit={1}
                  maxVerticalRotationDeg={0}
                  overlayBlurColor='transparent'
                />
              </div>
            </section>
          </ScrollReveal>

          {/* FAQ Section */}
          <ScrollReveal
            baseOpacity={0}
            enableBlur={true}
            baseRotation={0}
            blurStrength={10}
          >
            <section id="faq" className="contentSection">
              <h2>{t('about.faq.title')}</h2>
              <p>
                {t('about.faq.description')}
              </p>
              <div className="faqAccordion">
                {faqItems.map((item, index) => (
                  <div key={index} className="faqItem">
                    <button
                      className={`faqQuestion ${openFaq === index ? 'faqQuestion--open' : ''}`}
                      onClick={() => toggleFaq(index)}
                      aria-expanded={openFaq === index}
                      aria-controls={`faq-answer-${index}`}
                    >
                      <span>{item.question}</span>
                      <span className="faqIcon" aria-hidden="true">
                        {openFaq === index ? '−' : '+'}
                      </span>
                    </button>
                    <div
                      id={`faq-answer-${index}`}
                      className={`faqAnswer ${openFaq === index ? 'faqAnswer--open' : ''}`}
                      aria-hidden={openFaq !== index}
                    >
                      <p>{item.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </ScrollReveal>
        </div>
      </div>
    </main>
  )
}

export default About