import React, { useState, useEffect, useMemo } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import Modal from '../components/ui/Modal'
import Breadcrumb from '../components/ui/Breadcrumb'
import { getTeachers, getTeacherBySlug } from '../services/contentService'
import { COURSE_CATEGORIES } from '../data/courses'
import ScrollReveal from '../components/ui/ScrollReveal'
import { useLanguage } from '../i18n/LanguageProvider'
export default function Teachers() {
  const { t } = useLanguage()
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')

  const allTeachers = getTeachers()

  // Get teacher from URL param
  const selectedTeacher = useMemo(() => {
    const teacherSlug = searchParams.get('teacher')
    return teacherSlug ? getTeacherBySlug(teacherSlug) : null
  }, [searchParams])

  const isModalOpen = !!selectedTeacher

  // Handle invalid teacher slug
  useEffect(() => {
    const teacherSlug = searchParams.get('teacher')
    if (teacherSlug && !selectedTeacher) {
      // Remove invalid slug from URL
      const newSearchParams = new URLSearchParams(searchParams)
      newSearchParams.delete('teacher')
      setSearchParams(newSearchParams, { replace: true })
    }
  }, [searchParams, selectedTeacher, setSearchParams])

  // Filtered teachers based on search and category
  const filteredTeachers = useMemo(() => {
    return allTeachers.filter(teacher => {
      const matchesSearch = teacher.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.role.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesCategory = !selectedCategory ||
        teacher.specialties.some(specialty =>
          specialty.toLowerCase().includes(selectedCategory.toLowerCase())
        )

      return matchesSearch && matchesCategory
    })
  }, [allTeachers, searchTerm, selectedCategory])

  const openTeacherModal = (teacher) => {
    setSearchParams({ teacher: teacher.slug })
  }

  const closeTeacherModal = () => {
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.delete('teacher')
    setSearchParams(newSearchParams, { replace: true })
  }

  const handleCourseClick = (courseSlug) => {
    // Close the teacher modal first
    closeTeacherModal()

    // Determine the correct route based on course slug
    let route
    if (courseSlug.startsWith('olympiad-')) {
      // Olympiad courses: /courses/olympiad/{subCourseId}
      const subCourseId = courseSlug.replace('olympiad-', '')
      route = `/courses/olympiad/${subCourseId}`
    } else {
      // Regular courses: /courses/{courseId}
      route = `/courses/${courseSlug}`
    }

    // Navigate to the course page
    navigate(route)
  }

  const resetFilters = () => {
    setSearchTerm('')
    setSelectedCategory('')
  }

  // Get unique categories for filter dropdown
  const availableCategories = useMemo(() => {
    const categories = new Set()
    allTeachers.forEach(teacher => {
      teacher.specialties.forEach(specialty => {
        categories.add(specialty)
      })
    })
    return Array.from(categories).sort()
  }, [allTeachers])

  return (
    <main className="container page">
      <ScrollReveal
        baseOpacity={0}
        enableBlur={true}
        baseRotation={0}
        blurStrength={10}
      >
        <Breadcrumb
          items={[
            { href: '/', label: t('teachers.breadcrumb.home') },
            { label: t('teachers.breadcrumb.teachers') }
          ]}
        />
      </ScrollReveal>
      <div className="pageContentAbout">
        <ScrollReveal
          baseOpacity={0}
          enableBlur={true}
          baseRotation={0}
          blurStrength={10}
        >
          <header className="pageHeader">
            <h1>{t('teachers.page.title')}</h1>
            <p className="pageIntro">
              {t('teachers.page.intro')}
            </p>
          </header>
        </ScrollReveal>
        <div className="pageBody">
          <ScrollReveal
            baseOpacity={0}
            enableBlur={true}
            baseRotation={0}
            blurStrength={10}
          >
            {/* Search and Filter Controls */}
            <div className="teachers-controls">
              <div className="teachers-search">
                <input
                  type="text"
                  placeholder={t('teachers.search.placeholder')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="teachers-search-input"
                />
              </div>

              <div className="teachers-filter">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="teachers-filter-select"
                >
                  <option value="">{t('teachers.filter.allSpecialties')}</option>
                  {availableCategories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {(searchTerm || selectedCategory) && (
                <button
                  onClick={resetFilters}
                  className="button button--secondary teachers-reset"
                >
                  {t('teachers.reset')}
                </button>
              )}
              {/* Teachers Grid */}
              <section className="teachers-grid">
                {filteredTeachers.length > 0 ? (
                  filteredTeachers.map(teacher => (
                    <article
                      key={teacher.id}
                      className="teacher-card"
                      onClick={() => openTeacherModal(teacher)}
                      role="button"
                      tabIndex="0"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          openTeacherModal(teacher)
                        }
                      }}
                    >
                      <div className="teacher-card__image">
                        <img
                          src={teacher.photoUrl}
                          alt={teacher.fullName}
                          loading="lazy"
                        />
                      </div>

                      <div className="teacher-card__content">
                        <h3 className="teacher-card__name">{teacher.fullName}</h3>
                        <p className="teacher-card__role">{teacher.role}</p>
                        <p className="teacher-card__bio">{teacher.shortBio}</p>

                        <div className="teacher-card__specialties">
                          {teacher.specialties.slice(0, 3).map(specialty => (
                            <span key={specialty} className="teacher-card__specialty">
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>
                    </article>
                  ))
                ) : (
                  <div className="teachers-empty">
                    <h3>{t('teachers.empty.title')}</h3>
                    <p>{t('teachers.empty.message')}</p>
                    <button onClick={resetFilters} className="button button--primary">
                      {t('teachers.empty.showAll')}
                    </button>
                  </div>
                )}
              </section>
            </div>
          </ScrollReveal>

          {/* Teacher Modal */}
          <ScrollReveal
            baseOpacity={0}
            enableBlur={true}
            baseRotation={0}
            blurStrength={10}
          >
            <Modal
              isOpen={isModalOpen}
              onClose={closeTeacherModal}
              title={`${selectedTeacher?.fullName || ''} ${t('teachers.modal.about')}`}
              size="large"
            >
              {selectedTeacher && (
                <div className="teacher-modal">
                  <div className="teacher-modal__header">
                    <div className="teacher-modal__image">
                      <img
                        src={selectedTeacher.photoUrl}
                        alt={selectedTeacher.fullName}
                      />
                    </div>

                    <div className="teacher-modal__info">
                      <h2 className="teacher-modal__name">{selectedTeacher.fullName}</h2>
                      <p className="teacher-modal__role">{selectedTeacher.role}</p>
                    </div>
                  </div>

                  <div className="teacher-modal__content">
                    <div className="teacher-modal__bio">
                      <h3>{t('teachers.modal.aboutTitle')}</h3>
                      <p>{selectedTeacher.bio}</p>
                    </div>

                    <div className="teacher-modal__specialties">
                      <h3>{t('teachers.modal.specialtiesTitle')}</h3>
                      <div className="teacher-modal__specialty-list">
                        {selectedTeacher.specialties.map(specialty => (
                          <span key={specialty} className="teacher-modal__specialty">
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>

                    {selectedTeacher.courseSlugs && selectedTeacher.courseSlugs.length > 0 && (
                      <div className="teacher-modal__courses">
                        <h3>{t('teachers.modal.coursesTitle')}</h3>
                        <div className="teacher-modal__course-list">
                          {selectedTeacher.courseSlugs.map(courseSlug => (
                            <button
                              key={courseSlug}
                              className="teacher-modal__course teacher-modal__course--clickable"
                              onClick={() => handleCourseClick(courseSlug)}
                              type="button"
                            >
                              {courseSlug.replace('-', ' ').toUpperCase()}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </Modal>
          </ScrollReveal>
        </div>
      </div>
    </main>
  )
}
