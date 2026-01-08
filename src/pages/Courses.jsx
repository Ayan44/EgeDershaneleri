import { Link } from 'react-router-dom'
import { getCourses, COURSE_CATEGORIES } from '../data/courses'
import ScrollReveal from '../components/ui/ScrollReveal'
import Breadcrumb from '../components/ui/Breadcrumb'
import { useLanguage } from '../i18n/LanguageProvider'
import { useMemo } from 'react'
function Courses() {
  const { t, lang } = useLanguage()
  const allCourses = getCourses()

  // Map category keys to translated names
  const categoryTranslationMap = useMemo(() => ({
    [COURSE_CATEGORIES.IMTAHAN]: t('courses.categories.imtahan'),
    [COURSE_CATEGORIES.DIL]: t('courses.categories.dil'),
    [COURSE_CATEGORIES.OLIMPIADA]: t('courses.categories.olimpiada'),
  }), [t, lang])

  const coursesByCategory = useMemo(() => {
    return allCourses.reduce((grouped, course) => {
      const category = course.category
      const translatedCategory = categoryTranslationMap[category] || category
      if (!grouped[translatedCategory]) {
        grouped[translatedCategory] = []
      }
      const courseSlug = course.slug || course.id
      grouped[translatedCategory].push({
        ...course,
        title: t(`courseDetails.data.${courseSlug}.title`) || course.title,
        shortDescription: t(`courseDetails.data.${courseSlug}.shortDescription`) || course.shortDescription,
        href: courseSlug.startsWith('olympiad-')
          ? `/courses/olympiad/${courseSlug.replace('olympiad-', '')}`
          : `/courses/${courseSlug}`
      })
      return grouped
    }, {})
  }, [allCourses, categoryTranslationMap, t, lang])

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