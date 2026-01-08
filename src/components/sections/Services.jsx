import { Link } from 'react-router-dom'
import { COURSES_DATA } from '../../data/courses'
import ScrollReveal from '../ui/ScrollReveal'
import { useLanguage } from '../../i18n/LanguageProvider'
import { useMemo } from 'react'
function Services() {
  const { t, lang } = useLanguage()

  // Transform the centralized course data into the format needed for the grid
  const coursesForGrid = useMemo(() => {
    return COURSES_DATA.map(course => {
      const courseSlug = course.slug || course.id
      return {
        title: t(`courseDetails.data.${courseSlug}.title`) || course.title,
        description: t(`courseDetails.data.${courseSlug}.shortDescription`) || course.shortDescription,
        thumbnailUrl: course.thumbnailUrl,
        href: courseSlug.startsWith('olympiad-')
          ? `/courses/olympiad/${courseSlug.replace('olympiad-', '')}`
          : `/courses/${courseSlug}`
      }
    })
  }, [t, lang])

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
                    alt={`${course.title} ${t('services.courseAlt')}`}
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


