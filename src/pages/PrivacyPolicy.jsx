import React from 'react'
import ScrollReveal from '../components/ui/ScrollReveal'
import { useLanguage } from '../i18n/LanguageProvider'

function PrivacyPolicy() {
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
            <h1>{t('privacyPolicy.title')}</h1>
            <p className="pageIntro">
              {t('privacyPolicy.intro')}
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
              <p>
                {t('privacyPolicy.introduction')}
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
              <h2>{t('privacyPolicy.sections.dataCollection.title')}</h2>
              <p>
                {t('privacyPolicy.sections.dataCollection.intro')}
              </p>
              <ul>
                <li>{t('privacyPolicy.sections.dataCollection.items.fullName')}</li>
                <li>{t('privacyPolicy.sections.dataCollection.items.phone')}</li>
                <li>{t('privacyPolicy.sections.dataCollection.items.email')}</li>
              </ul>
              <p>
                {t('privacyPolicy.sections.dataCollection.note')}
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
              <h2>{t('privacyPolicy.sections.dataUsage.title')}</h2>
              <p>
                {t('privacyPolicy.sections.dataUsage.intro')}
              </p>
              <ul>
                <li>{t('privacyPolicy.sections.dataUsage.items.contact')}</li>
                <li>{t('privacyPolicy.sections.dataUsage.items.information')}</li>
                <li>{t('privacyPolicy.sections.dataUsage.items.inquiries')}</li>
                <li>{t('privacyPolicy.sections.dataUsage.items.quality')}</li>
              </ul>
            </section>
          </ScrollReveal>
          <ScrollReveal
            baseOpacity={0}
            enableBlur={true}
            baseRotation={0}
            blurStrength={10}
          >
            <section className="contentSection">
              <h2>{t('privacyPolicy.sections.dataSharing.title')}</h2>
              <p>
                {t('privacyPolicy.sections.dataSharing.content')}
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
              <h2>{t('privacyPolicy.sections.dataProtection.title')}</h2>
              <p>
                {t('privacyPolicy.sections.dataProtection.content')}
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
              <h2>{t('privacyPolicy.sections.userRights.title')}</h2>
              <p>
                {t('privacyPolicy.sections.userRights.intro')}
              </p>
              <ul>
                <li>{t('privacyPolicy.sections.userRights.items.access')}</li>
                <li>{t('privacyPolicy.sections.userRights.items.update')}</li>
              </ul>
              <p>
                {t('privacyPolicy.sections.userRights.note')}
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
              <h2>{t('privacyPolicy.sections.changes.title')}</h2>
              <p>
                {t('privacyPolicy.sections.changes.content')}
              </p>
            </section>
          </ScrollReveal>
        </div>
      </div>
    </main>
  )
}

export default PrivacyPolicy
