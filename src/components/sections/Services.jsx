import { Link } from 'react-router-dom'
import { COURSES_DATA } from '../../data/courses'

function Services() {
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
    <section className="services" id="services">
      <div className="container services__inner">
        <div className="services__copy">
          <p className="services__eyebrow">Xidmətlərimiz</p>
          <h2 className="services__title">Hazırlıq kursları və proqramlar</h2>
          <p className="services__subtitle">
            Beynəlxalq və yerli imtahanlara hazırlıq üçün peşəkar kurslar və
            fərdi dəstək xidmətlərimizlə tələbələrinizə dəstək olun.
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
                  <span>Ətraflı bax</span>
                  <span className="courseCard__arrow" aria-hidden="true">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services


