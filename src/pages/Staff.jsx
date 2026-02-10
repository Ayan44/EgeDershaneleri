import React, { useState, useEffect, useMemo } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import Modal from '../components/ui/Modal'
import Breadcrumb from '../components/ui/Breadcrumb'
import { fetchAllTeamMembers } from '../services/contentService'
import { COURSE_CATEGORIES } from '../constants'
import ScrollReveal from '../components/ui/ScrollReveal'
import { useLanguage } from '../i18n/LanguageProvider'
export default function Staff() {
  const { t, lang } = useLanguage()
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRole, setSelectedRole] = useState('all')
  const [selectedCategory, setSelectedCategory] = useState('')

  const [allTeachersData, setAllTeachersData] = useState([])

  useEffect(() => {
    fetchAllTeamMembers().then(data => {
      if (data && data.length > 0) {
        setAllTeachersData(data)
      }
    })
  }, [])

  // Translate teacher data based on current language
  // Text content comes from locale files (az.js, en.js)
  // Translate teacher data based on current language
  // Text content comes from locale files (az.js, en.js)
  // Translate teacher data based on current language
  // Text content comes from locale files (az.js, en.js) or Sanity
  const allTeachers = useMemo(() => {
    return allTeachersData.map(teacher => {
      // Logic:
      // 1. If lang is 'en', try Sanity EN fields -> Translation EN -> Sanity AZ -> Translation AZ/Key
      // 2. If lang is 'az', try Sanity AZ fields -> Translation AZ -> Key

      let resolvedFullName, resolvedJobTitle, resolvedBio

      if (lang === 'en') {
        resolvedFullName = teacher.fullName_en || t(`teachers.data.${teacher.slug}.fullName`) || teacher.fullName || teacher.slug // Fallback to AZ name if EN missing
        resolvedJobTitle = teacher.jobTitle_en || t(`teachers.data.${teacher.slug}.role`) || teacher.jobTitle || ''
        resolvedBio = teacher.bio_en || t(`teachers.data.${teacher.slug}.bio`) || teacher.bio || ''
      } else {
        // AZ (Default)
        resolvedFullName = teacher.fullName || t(`teachers.data.${teacher.slug}.fullName`) || teacher.slug
        resolvedJobTitle = teacher.jobTitle || t(`teachers.data.${teacher.slug}.role`) || ''
        resolvedBio = teacher.bio || t(`teachers.data.${teacher.slug}.bio`) || ''
      }

      // Process skills from Sanity (single source of truth for both cards and modal)
      // Note: We've removed hardcoded locale fallbacks as requested.
      const resolvedSpecialties = (teacher.skills || []).map(skill =>
        lang === 'en' ? (skill.title_en || skill.title_az) : skill.title_az
      )

      return {
        ...teacher,
        fullName: resolvedFullName,
        jobTitle: resolvedJobTitle,
        role: teacher.roleType, // Keep for filtering
        bio: resolvedBio,
        specialties: resolvedSpecialties,
      }
    })
  }, [allTeachersData, t, lang])

  // Get teacher from URL param and translate
  const selectedTeacher = useMemo(() => {
    const teacherSlug = searchParams.get('teacher')
    if (!teacherSlug) return null

    // Find in the already processed allTeachers list
    return allTeachers.find(t => t.slug === teacherSlug) || null
  }, [searchParams, allTeachers])

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

      const matchesRole = selectedRole === 'all' || teacher.role === selectedRole

      const matchesCategory = !selectedCategory ||
        teacher.specialties.some(specialty =>
          specialty.toLowerCase().includes(selectedCategory.toLowerCase())
        )

      return matchesSearch && matchesCategory && matchesRole
    })
  }, [allTeachers, searchTerm, selectedCategory, selectedRole])

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
    setSelectedRole('all')
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
            { label: t('teachers.breadcrumb.staff') }
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
            <h1>{t('teachers.page.staffTitle')}</h1>
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
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="teachers-filter-select"
                >
                  <option value="all">{t('teachers.filter.role.all')}</option>
                  <option value="teacher">{t('teachers.filter.role.teacher')}</option>
                  <option value="staff">{t('teachers.filter.role.staff')}</option>
                </select>
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

              {(searchTerm || selectedCategory || selectedRole !== 'all') && (
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
                        <p className="teacher-card__role">{teacher.jobTitle}</p>
                        <p className="teacher-card__bio">{teacher.bio}</p>

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
                      <p className="teacher-modal__role">{selectedTeacher.jobTitle}</p>
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
                        {(selectedTeacher.specialties || []).map((specialty, index) => (
                          <span key={index} className="teacher-modal__specialty">
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>

                    {selectedTeacher.courseSlugs && selectedTeacher.courseSlugs.length > 0 && (
                      <div className="teacher-modal__courses">
                        <h3>{t('teachers.modal.coursesTitle')}</h3>
                        <div className="teacher-modal__course-list">
                          {selectedTeacher.courseSlugs.map(courseSlug => {
                            const courseTitle = t(`courseDetails.data.${courseSlug}.title`) || courseSlug.replace('-', ' ').toUpperCase()
                            return (
                              <button
                                key={courseSlug}
                                className="teacher-modal__course teacher-modal__course--clickable"
                                onClick={() => handleCourseClick(courseSlug)}
                                type="button"
                              >
                                {courseTitle}
                              </button>
                            )
                          })}
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
