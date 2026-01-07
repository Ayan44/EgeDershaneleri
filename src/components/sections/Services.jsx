import { Link } from 'react-router-dom'
import { COURSES_DATA } from '../../data/courses'
import ScrollReveal from '../ui/ScrollReveal'
import { useLanguage } from '../../i18n/LanguageProvider'
function Services() {
  const { t } = useLanguage()

  // Transform the centralized course data into the format needed for the grid
  const coursesForGrid = Object.values(COURSES_DATA).map(course => ({
    title: course.title,
    description: course.shortDescription,
    thumbnailUrl: course.thumbnailUrl,
    href: course.id.startsWith('olympiad-')
      ? `/courses/olympiad/${course.id.replace('olympiad-', '')}`
      : `/courses/${course.id}`
  }))

  return (
    <ScrollReveal
      baseOpacity={0}
      enableBlur={true}
      baseRotation={0}
      blurStrength={10}
    >
      <section className="services" id="services">
        <div className="container services__inner">
          <div className="services__copy">
            <p className="services__eyebrow">{t('services.eyebrow')}</p>
            <h2 className="services__title">{t('services.title')}</h2>
            <p className="services__subtitle">
              {t('services.subtitle')}
            </p>
          </div>

          <div className="coursesGrid">
            {coursesForGrid.map((course) => (
              <Link key={course.href} to={course.href} className="courseCard">
                <div className="courseCard__media">
                  <img
                    src={course.thumbnailUrl}
                    alt={`${course.title} kursu`}
                    loading="lazy"
                  />
                </div>
                <div className="courseCard__content">
                  <h3 className="courseCard__title">{course.title}</h3>
                  <p className="courseCard__description">{course.description}</p>
                  <div className="courseCard__cta">
                    <span>{t('services.viewDetails')}</span>
                    <span className="courseCard__arrow" aria-hidden="true">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </ScrollReveal>
  )
}

export default Services


