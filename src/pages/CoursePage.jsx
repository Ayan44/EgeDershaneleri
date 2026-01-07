import { Link, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { getCourseBySlug } from '../services/contentService'
import ScrollToTop from '../components/ui/ScrollToTop'
import ScrollReveal from '../components/ui/ScrollReveal'
import Breadcrumb from '../components/ui/Breadcrumb'
function CoursePage() {
  const { courseId, subCourseId } = useParams()

  // Determine the course slug
  let courseSlug = ''
  if (subCourseId) {
    // Handle olympiad courses: /courses/olympiad/:subCourseId
    courseSlug = `olympiad-${subCourseId}`
  } else if (courseId) {
    // Handle regular courses: /courses/:courseId
    courseSlug = courseId
  }

  const course = getCourseBySlug(courseSlug)

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0)
  }, [])

  if (!course) {
    return (
      <main className="container page">
        <Breadcrumb
          items={[
            { href: '/', label: 'Ana səhifə' },
            { href: '/courses', label: 'Kurslar' },
            { label: 'Kurs tapılmadı' }
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
              <h1>Kurs tapılmadı</h1>
              <p>Axtardığınız kurs mövcud deyil. Zəhmət olmasa kurs siyahısından seçin.</p>

              <div className="page__cta">
                <Link to="/courses" className="btn btn--primary">
                  Bütün kurslara bax
                </Link>
              </div>
            </header>
          </div>
        </ScrollReveal>
      </main>
    )
  }

  return (
    <>
      <ScrollToTop />
      <main className="container page">
        <Breadcrumb
          items={[
            { href: '/', label: 'Ana səhifə' },
            { href: '/courses', label: 'Kurslar' },
            { label: course.title }
          ]}
        />

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
                      <div className="info-chip">
                        <span className="info-chip__icon">💻</span>
                        <span>{course.format}</span>
                      </div>
                    </div>

                    <div className="course-hero__cta">
                      <Link to="/contact" className="btn btn--primary btn--large">
                        Qeydiyyat üçün müraciət et
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
                <h2 className="course-section__title">Kurs kimlər üçün uyğundur</h2>
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
                      <p className="audience-card__description">
                        {item.includes(':') ? item.split(':')[1].trim() : item}
                      </p>
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
                <h2 className="course-section__title">Nə öyrənəcəksən</h2>
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
                    Hazırsan? Qeydiyyatdan keç və gələcəyini qur!
                  </h2>
                  <p className="course-final-cta__subtitle">
                    İndi müraciət et və kursumuza qoşul. Sənin uğurun bizim prioritetimizdir.
                  </p>

                  <div className="course-final-cta__actions">
                    <Link to="/contact" className="btn btn--primary btn--large">
                      İndi müraciət et
                    </Link>
                    <a href="tel:+994501234567" className="btn btn--secondary">
                      📞 +994 50 123 45 67
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </ScrollReveal>
        </div>
      </main>
    </>
  )
}

export default CoursePage


