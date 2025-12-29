import { Link } from 'react-router-dom'
import { getCourses, COURSE_CATEGORIES } from '../data/courses'

function Courses() {
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
    <main className="container page">
      <div className="page__breadcrumb">
        <Link to="/">Ana səhifə</Link>
        <span>›</span>
        <span>Kurslar</span>
      </div>

      <h1>Kurslar</h1>
      <p className="courses__intro">
        Beynəlxalq və yerli imtahanlara hazırlıq üçün peşəkar kurs proqramlarımızla
        tələbələrinizə dəstək olun. Hər kurs xüsusi ehtiyaclarınıza uyğun hazırlanmışdır.
      </p>

      {Object.entries(coursesByCategory).map(([category, courses]) => (
        <section key={category} className="courses__category">
          <h2 className="courses__category-title">{category}</h2>

          <div className="courses__grid">
            {courses.map((course) => (
              <Link key={course.id} to={course.href} className="course-card">
                <h3 className="course-card__title">{course.title}</h3>
                <p className="course-card__description">{course.shortDescription}</p>
                <div className="course-card__cta">
                  <span>Ətraflı bax</span>
                  <span className="course-card__arrow" aria-hidden="true">→</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </main>
  )
}

export default Courses