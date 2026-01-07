import { Link } from 'react-router-dom'
import { getCourses, COURSE_CATEGORIES } from '../data/courses'
import ScrollReveal from '../components/ui/ScrollReveal'
import Breadcrumb from '../components/ui/Breadcrumb'
import { useLanguage } from '../i18n/LanguageProvider'
function Courses() {
  const { t } = useLanguage()
  const allCourses = getCourses()
  const coursesByCategory = allCourses.reduce((grouped, course) => {
    const category = course.category
    if (!grouped[category]) {
      grouped[category] = []
    }
    grouped[category].push({
      ...course,
      href: course.slug.startsWith('olympiad-')
        ? `/courses/olympiad/${course.slug.replace('olympiad-', '')}`
        : `/courses/${course.slug}`
    })
    return grouped
  }, {})

  return (
    <ScrollReveal
      baseOpacity={0}
      enableBlur={true}
      baseRotation={0}
      blurStrength={10}
    >
      <main className="container page">

        <Breadcrumb
          items={[
            { href: '/', label: t('courses.breadcrumb.home') },
            { label: t('courses.breadcrumb.courses') }
          ]}
        />

        <h1>{t('courses.page.title')}</h1>
        <p className="courses__intro">
          {t('courses.page.intro')}
        </p>
        {
          Object.entries(coursesByCategory).map(([category, courses]) => (

            <section key={category} className="courses__category">
              <h2 className="courses__category-title">{category}</h2>

              <div className="courses__grid">
                {courses.map((course) => (
                  <Link key={course.id} to={course.href} className="course-card">
                    <h3 className="course-card__title">{course.title}</h3>
                    <p className="course-card__description">{course.shortDescription}</p>
                    <div className="course-card__cta">
                      <span>{t('courses.viewDetails')}</span>
                      <span className="course-card__arrow" aria-hidden="true">→</span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

          ))
        }
      </main >
    </ScrollReveal>
  )
}

export default Courses