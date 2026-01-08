import Breadcrumb from '../components/ui/Breadcrumb'
import { useLanguage } from '../i18n/LanguageProvider'

function FAQ() {
  const { t } = useLanguage()
  return (
    <main className="container page">
      <Breadcrumb
        items={[
          { href: '/', label: t('faq.breadcrumb.home') },
          { label: t('faq.breadcrumb.faq') }
        ]}
      />
      <h1>{t('faq.title')}</h1>
      <p>{t('faq.intro')}</p>
    </main>
  )
}

export default FAQ


