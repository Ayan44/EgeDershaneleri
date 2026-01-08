import React from 'react'
import ScrollReveal from '../components/ui/ScrollReveal'
import { useLanguage } from '../i18n/LanguageProvider'

function TermsOfService() {
  const { t } = useLanguage()
  return (
    <main className="container page">
      <div className="pageContent">
        <ScrollReveal
          baseOpacity={0}
          enableBlur={true}
          baseRotation={0}
          blurStrength={10}
        >
          <header className="pageHeader">
            <h1>{t('termsOfService.title')}</h1>
            <p className="pageIntro">
              {t('termsOfService.intro')}
            </p>
          </header>
        </ScrollReveal>
        <div className="pageBody">
          <ScrollReveal
            baseOpacity={0}
            enableBlur={true}
            baseRotation={0}
            blurStrength={10}
          >
            <section className="contentSection">
              <h2>{t('termsOfService.sections.general.title')}</h2>
              <p>
                {t('termsOfService.sections.general.content')}
              </p>
            </section>
          </ScrollReveal>
          <ScrollReveal
            baseOpacity={0}
            enableBlur={true}
            baseRotation={0}
            blurStrength={10}
          >
            <section className="contentSection">
              <h2>{t('termsOfService.sections.contentUsage.title')}</h2>
              <p>
                {t('termsOfService.sections.contentUsage.content')}
              </p>
            </section>
          </ScrollReveal>
          <ScrollReveal
            baseOpacity={0}
            enableBlur={true}
            baseRotation={0}
            blurStrength={10}
          >
            <section className="contentSection">
              <h2>{t('termsOfService.sections.serviceChanges.title')}</h2>
              <p>
                {t('termsOfService.sections.serviceChanges.content')}
              </p>
            </section>
          </ScrollReveal>
          <ScrollReveal
            baseOpacity={0}
            enableBlur={true}
            baseRotation={0}
            blurStrength={10}
          >
            <section className="contentSection">
              <h2>{t('termsOfService.sections.liability.title')}</h2>
              <p>
                {t('termsOfService.sections.liability.content')}
              </p>
            </section>
          </ScrollReveal>
          <ScrollReveal
            baseOpacity={0}
            enableBlur={true}
            baseRotation={0}
            blurStrength={10}
          >
            <section className="contentSection">
              <h2>{t('termsOfService.sections.thirdParty.title')}</h2>
              <p>
                {t('termsOfService.sections.thirdParty.content')}
              </p>
            </section>
          </ScrollReveal>
          <ScrollReveal
            baseOpacity={0}
            enableBlur={true}
            baseRotation={0}
            blurStrength={10}
          >
            <section className="contentSection">
              <h2>{t('termsOfService.sections.changes.title')}</h2>
              <p>
                {t('termsOfService.sections.changes.content')}
              </p>
            </section>
          </ScrollReveal>
        </div>
      </div>
    </main>
  )
}

export default TermsOfService
