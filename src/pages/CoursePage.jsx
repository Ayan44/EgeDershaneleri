import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getCourseBySlug } from '../services/contentService'
import ScrollReveal from '../components/ui/ScrollReveal'
import Breadcrumb from '../components/ui/Breadcrumb'
import { useLanguage } from '../i18n/LanguageProvider'
function CoursePage() {
  const { t, lang } = useLanguage()
  const { courseId, subCourseId } = useParams()
  const [showCampBanner, setShowCampBanner] = useState(false)

  // Determine the course slug
  let courseSlug = ''
  if (subCourseId) {
    // Handle olympiad courses: /courses/olympiad/:subCourseId
    courseSlug = `olympiad-${subCourseId}`
  } else if (courseId) {
    // Handle regular courses: /courses/:courseId
    courseSlug = courseId
  }

  const courseData = getCourseBySlug(courseSlug)

  // Translate course data based on current language
  const course = courseData ? {
    ...courseData,
    title: t(`courseDetails.data.${courseSlug}.title`),
    shortDescription: t(`courseDetails.data.${courseSlug}.shortDescription`),
    level: t(`courseDetails.data.${courseSlug}.level`),
    format: t(`courseDetails.data.${courseSlug}.format`),
    audience: (() => {
      const audienceData = t(`courseDetails.data.${courseSlug}.audience`)
      if (Array.isArray(audienceData)) {
        return audienceData
      }
      // Fallback: try to get individual items by index
      const audienceArray = []
      let index = 0
      while (index < 10) {
        const item = t(`courseDetails.data.${courseSlug}.audience.${index}`)
        if (!item || item === `courseDetails.data.${courseSlug}.audience.${index}`) break
        audienceArray.push(item)
        index++
      }
      return audienceArray
    })(),
    program: (() => {
      const programData = t(`courseDetails.data.${courseSlug}.program`)
      if (Array.isArray(programData)) {
        return programData
      }
      // Fallback: try to get individual items by index
      const programArray = []
      let index = 0
      while (index < 15) {
        const item = t(`courseDetails.data.${courseSlug}.program.${index}`)
        if (!item || item === `courseDetails.data.${courseSlug}.program.${index}`) break
        programArray.push(item)
        index++
      }
      return programArray
    })(),
  } : null

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0)
    
    // Show camp banner for YÖS/TYS course
    if (courseSlug === 'yos-tys') {
      setShowCampBanner(true)
    }
  }, [courseSlug])
  
  const handleCloseCampBanner = () => {
    setShowCampBanner(false)
  }

  if (!course) {
    return (
      <main className="container page">
        <Breadcrumb
          items={[
            { href: '/', label: t('courseDetails.breadcrumb.home') },
            { href: '/courses', label: t('courseDetails.breadcrumb.courses') },
            { label: t('courseDetails.breadcrumb.notFound') }
          ]}
        />

        <ScrollReveal
          baseOpacity={0}
          enableBlur={true}
          baseRotation={0}
          blurStrength={10}
        >
          <div className="pageContentAbout">
            <header className="pageHeader">
              <h1>{t('courseDetails.notFound.title')}</h1>
              <p>{t('courseDetails.notFound.message')}</p>

              <div className="page__cta">
                <Link to="/courses" className="btn btn--primary">
                  {t('courseDetails.notFound.viewAll')}
                </Link>
              </div>
            </header>
          </div>
        </ScrollReveal>
      </main>
    )
  }

  return (
    <main className="container page">
        <Breadcrumb
          items={[
            { href: '/', label: t('courseDetails.breadcrumb.home') },
            { href: '/courses', label: t('courseDetails.breadcrumb.courses') },
            { label: course.title }
          ]}
        />

        {/* Intensive Camp Banner for YÖS/TYS */}
        {showCampBanner && courseSlug === 'yos-tys' && (
          <div className="intensive-camp-banner">
            <div className="intensive-camp-banner__content">
              <div className="intensive-camp-banner__text">
                <h3 className="intensive-camp-banner__title">
                  {t('courseDetails.intensiveCamp.title')}
                </h3>
                <p className="intensive-camp-banner__description">
                  {t('courseDetails.intensiveCamp.description')}
                </p>
                <div className="intensive-camp-banner__schedule">
                  <span className="intensive-camp-banner__schedule-icon">⏰</span>
                  <span>{t('courseDetails.intensiveCamp.schedule')}</span>
                </div>
                <p className="intensive-camp-banner__opportunity">
                  {t('courseDetails.intensiveCamp.opportunity')}
                </p>
              </div>
              <button
                onClick={handleCloseCampBanner}
                className="intensive-camp-banner__close"
                aria-label={t('courseDetails.intensiveCamp.close')}
              >
                ×
              </button>
            </div>
          </div>
        )}

        <div className="pageContentAbout">
          {/* 1️⃣ Hero Section */}
          <ScrollReveal
            baseOpacity={0}
            enableBlur={true}
            baseRotation={0}
            blurStrength={10}
          >
            <section className="course-hero">
              <div className="container">
                <div className="course-hero__content">
                  <div className="course-hero__text">
                    <h1 className="course-hero__title">{course.title}</h1>
                    <p className="course-hero__subtitle">
                      {course.shortDescription}
                    </p>

                    <div className="course-hero__info">
                      <div className="info-chip">
                        <span className="info-chip__icon">📊</span>
                        <span>{course.level}</span>
                      </div>
                      {course.format && (Array.isArray(course.format) ? course.format : course.format.split(' / '))
                        .filter(item => item && item.trim())
                        .map((formatItem, index) => {
                          const trimmedFormat = formatItem.trim().toLowerCase()
                          const icon = trimmedFormat.includes('online') || trimmedFormat.includes('onlayn') 
                            ? '💻' 
                            : trimmedFormat.includes('əyani') || trimmedFormat.includes('in-person') || trimmedFormat.includes('offline')
                            ? '🏫'
                            : '💻'
                          return (
                            <div key={index} className="info-chip">
                              <span className="info-chip__icon">{icon}</span>
                              <span>{formatItem.trim()}</span>
                      </div>
                          )
                        })}
                    </div>

                    <div className="course-hero__cta">
                      <Link to="/contact" className="btn btn--primary btn--large">
                        {t('courseDetails.applyForRegistration')}
                      </Link>
                    </div>
                  </div>

                  <div className="course-hero__visual">
                    <div className="course-hero__image-wrapper">
                      <img
                        src={course.thumbnailUrl}
                        alt={course.title}
                        className="course-hero__image"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </ScrollReveal>

          {/* 2️⃣ Audience Section */}
          <ScrollReveal
            baseOpacity={0}
            enableBlur={true}
            baseRotation={0}
            blurStrength={10}
          >
            <section className="course-audience">
              <div className="container">
                <h2 className="course-section__title">{t('courseDetails.audience.title')}</h2>
                <div className="course-audience__grid">
                  {course.audience.map((item, index) => (
                    <div key={index} className="audience-card">
                      <div className="audience-card__icon">
                        {index === 0 && '🎓'}
                        {index === 1 && '📚'}
                        {index === 2 && '✈️'}
                        {index === 3 && '💼'}
                      </div>
                      <h3 className="audience-card__title">{item.split(':')[0] || item}</h3>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </ScrollReveal>

          {/* 3️⃣ Learning Outcomes Section */}
          <ScrollReveal
            baseOpacity={0}
            enableBlur={true}
            baseRotation={0}
            blurStrength={10}
          >
            <section className="course-outcomes">
              <div className="container">
                <h2 className="course-section__title">{t('courseDetails.learningOutcomes.title')}</h2>
                <div className="course-outcomes__grid">
                  {course.program.slice(0, 6).map((item, index) => (
                    <div key={index} className="outcome-item" style={{ animationDelay: `${index * 0.1}s` }}>
                      <div className="outcome-item__icon">
                        <span className="outcome-number">{index + 1}</span>
                      </div>
                      <div className="outcome-item__content">
                        <h3 className="outcome-item__title">{item.split(':')[0] || item}</h3>
                        <p className="outcome-item__description">
                          {item.includes(':') ? item.split(':')[1].trim() : item}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </ScrollReveal>


          {/* 5️⃣ Final CTA Section */}
          <ScrollReveal
            baseOpacity={0}
            enableBlur={true}
            baseRotation={0}
            blurStrength={10}
          >
            <section className="course-final-cta">
              <div className="container">
                <div className="course-final-cta__content">
                  <h2 className="course-final-cta__title">
                    {t('courseDetails.finalCta.title')}
                  </h2>
                  <p className="course-final-cta__subtitle">
                    {t('courseDetails.finalCta.subtitle')}
                  </p>

                  <div className="course-final-cta__actions">
                    <Link to="/contact" className="btn btn--primary btn--large">
                      {t('courseDetails.finalCta.applyNow')}
                    </Link>
                    <a href="tel:+994777440745" className="btn btn--secondary-course">
                      {t('courseDetails.finalCta.phone')}
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </ScrollReveal>
        </div>
      </main>
  )
}

export default CoursePage


