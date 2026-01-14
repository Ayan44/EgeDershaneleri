import { Link } from 'react-router-dom'
import { COURSES_DATA } from '../../data/courses'
import ScrollReveal from '../ui/ScrollReveal'
import { useLanguage } from '../../i18n/LanguageProvider'
import { useMemo, useState } from 'react'
function Services() {
  const { t, lang } = useLanguage()
  const [showAll, setShowAll] = useState(false)

  // Transform the centralized course data into the format needed for the grid
  const coursesForGrid = useMemo(() => {
    return COURSES_DATA.map(course => {
      const courseSlug = course.slug || course.id
      return {
        title: t(`courseDetails.data.${courseSlug}.title`),
        description: t(`courseDetails.data.${courseSlug}.shortDescription`),
        thumbnailUrl: course.thumbnailUrl,
        href: courseSlug.startsWith('olympiad-')
          ? `/courses/olympiad/${courseSlug.replace('olympiad-', '')}`
          : `/courses/${courseSlug}`
      }
    })
  }, [t, lang])

  const displayedCourses = showAll ? coursesForGrid : coursesForGrid.slice(0, 6)
  const hasMoreCourses = coursesForGrid.length > 6

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
            {displayedCourses.map((course) => (
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

          {hasMoreCourses && !showAll && (
            <div className="services__more">
              <button
                onClick={() => setShowAll(true)}
                className="btn btn--secondary"
              >
                {t('services.showMore')}
              </button>
            </div>
          )}
        </div>
      </section>
    </ScrollReveal>
  )
}

export default Services


