import { useLanguage } from '../i18n/LanguageProvider'

function Team() {
  const { t } = useLanguage()
  return (
    <main className="container page">
      <h1>{t('team.title')}</h1>
      <p>{t('team.intro')}</p>
    </main>
  )
}

export default Team


