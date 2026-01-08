import { useEffect, useRef, useState, useMemo } from 'react'
import { Pie } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js'
import Breadcrumb from '../components/ui/Breadcrumb'
import ScrollReveal from '../components/ui/ScrollReveal'
import { useLanguage } from '../i18n/LanguageProvider'
import { useTheme } from '../components/ui/ThemeProvider'
ChartJS.register(ArcElement, Tooltip, Legend)

// Count-up animation hook for statistics
function useCountUpStats(targetValues) {
  const [values, setValues] = useState(() => targetValues.map(() => 0))
  const [isInView, setIsInView] = useState(false)
  const sectionRef = useRef(null)
  const targetsRef = useRef(targetValues)
  const frameIdRef = useRef(null)

  useEffect(() => {
    targetsRef.current = targetValues
  }, [targetValues])

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    if (prefersReducedMotion) {
      setValues(targetsRef.current)
      return
    }

    const node = sectionRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true)
          } else {
            setIsInView(false)
          }
        })
      },
      { threshold: 0.25 },
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [prefersReducedMotion])

  useEffect(() => {
    if (prefersReducedMotion) {
      return
    }

    if (!isInView) {
      if (frameIdRef.current !== null) {
        window.cancelAnimationFrame(frameIdRef.current)
        frameIdRef.current = null
      }
      setValues(targetsRef.current.map(() => 0))
      return
    }

    let start = null
    const duration = 1200

    const step = (timestamp) => {
      if (start === null) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)

      const nextValues = targetsRef.current.map((target) =>
        Math.round(target * progress),
      )

      setValues(nextValues)

      if (progress < 1) {
        frameIdRef.current = window.requestAnimationFrame(step)
      } else {
        frameIdRef.current = null
      }
    }

    frameIdRef.current = window.requestAnimationFrame(step)

    return () => {
      if (frameIdRef.current !== null) {
        window.cancelAnimationFrame(frameIdRef.current)
        frameIdRef.current = null
      }
    }
  }, [isInView, prefersReducedMotion])

  return { sectionRef, values }
}

function parseStatValue(raw) {
  if (typeof raw !== 'string') {
    return { target: 0, suffix: '' }
  }

  const match = raw.match(/^(\d+)(.*)$/)
  if (!match) {
    return { target: 0, suffix: '' }
  }

  return {
    target: Number.parseInt(match[1], 10) || 0,
    suffix: match[2] ?? '',
  }
}

function Achievements() {
  const { t, lang } = useLanguage()
  const { theme } = useTheme()

  // Statistics data with translations
  const STATISTICS_DATA = useMemo(() => [
    { value: '850+', label: t('achievements.statistics.labels.acceptedStudents') },
    { value: '95%', label: t('achievements.statistics.labels.successRate') },
    { value: '1500+', label: t('achievements.statistics.labels.preparedStudents') },
    { value: '12+', label: t('achievements.statistics.labels.yearsExperience') },
    { value: '25+', label: t('achievements.statistics.labels.internationalInstitutions') },
    { value: '50+', label: t('achievements.statistics.labels.teachingStaff') }
  ], [t, lang])

  // Chart data with translations
  const CHART_DATA = useMemo(() => ({
    labels: [
      t('achievements.chart.labels.ielts'),
      t('achievements.chart.labels.toefl'),
      t('achievements.chart.labels.sat'),
      t('achievements.chart.labels.yos'),
      t('achievements.chart.labels.olympiad'),
    ],
    datasets: [
      {
        data: [30, 25, 20, 15, 10],
        backgroundColor: [
          'rgba(37, 99, 235, 0.8)',    // Blue - IELTS
          'rgba(124, 58, 237, 0.8)',  // Purple - TOEFL
          'rgba(16, 185, 129, 0.8)',  // Green - SAT
          'rgba(245, 158, 11, 0.8)',  // Amber - YÖS
          'rgba(239, 68, 68, 0.8)',   // Red - Olympiad
        ],
        borderColor: [
          'rgba(37, 99, 235, 1)',
          'rgba(124, 58, 237, 1)',
          'rgba(16, 185, 129, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(239, 68, 68, 1)',
        ],
        borderWidth: 2,
      },
    ],
  }), [t, lang])

  const CHART_OPTIONS = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          usePointStyle: true,
          font: {
            size: 12,
            family: 'Inter, system-ui, sans-serif',
            weight: '500',
          },
          color: theme === 'dark' ? '#ffffff' : '#374151',
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        cornerRadius: 8,
        callbacks: {
          label: function (context) {
            return context.label + t('achievements.chart.tooltipFormat') + context.raw
          }
        }
      },
    },
  }), [t, lang, theme])

  // Student results data
  const STUDENT_RESULTS_DATA = useMemo(() => [
    {
      id: 1,
      name: t('achievements.studentResults.data.1.name') || 'Ayla Məmmədova',
      photo: '/photos/students/student.jpg',
      examType: 'SAT',
      score: '1520/1600',
      acceptedCountry: t('achievements.countries.usa'),
      acceptedUniversity: t('achievements.universities.harvard')
    },
    {
      id: 2,
      name: t('achievements.studentResults.data.2.name') || 'Rəşad Hüseynov',
      photo: '/photos/students/student.jpg',
      examType: 'IELTS',
      score: '8.5/9.0',
      acceptedCountry: t('achievements.countries.canada'),
      acceptedUniversity: t('achievements.universities.toronto')
    },
    {
      id: 3,
      name: t('achievements.studentResults.data.3.name') || 'Nigar Kərimova',
      photo: '/photos/students/student.jpg',
      examType: 'YÖS',
      score: '520/600',
      acceptedCountry: t('achievements.countries.turkey'),
      acceptedUniversity: t('achievements.universities.koc')
    },
    {
      id: 4,
      name: t('achievements.studentResults.data.4.name') || 'Elvin Rəhimov',
      photo: '/photos/students/student.jpg',
      examType: 'TOEFL',
      score: '115/120',
      acceptedCountry: t('achievements.countries.usa'),
      acceptedUniversity: t('achievements.universities.mit')
    },
    {
      id: 5,
      name: t('achievements.studentResults.data.5.name') || 'Leyla İsmayılova',
      photo: '/photos/students/student.jpg',
      examType: 'SAT',
      score: '1480/1600',
      acceptedCountry: t('achievements.countries.canada'),
      acceptedUniversity: t('achievements.universities.mcgill')
    },
    {
      id: 6,
      name: t('achievements.studentResults.data.6.name') || 'Tural Məhərrəmov',
      photo: '/photos/students/student.jpg',
      examType: 'IELTS',
      score: '8.0/9.0',
      acceptedCountry: t('achievements.countries.russia'),
      acceptedUniversity: t('achievements.universities.moscow')
    }
  ], [t, lang])

  // Countries data
  const COUNTRIES_DATA = useMemo(() => [
    { name: t('achievements.countries.usa'), flag: '/photos/flags/usa.png', students: `320 ${t('achievements.countries.students')}` },
    { name: t('achievements.countries.canada'), flag: '/photos/flags/canada.png', students: `180 ${t('achievements.countries.students')}` },
    { name: t('achievements.countries.turkey'), flag: '/photos/flags/turkey.png', students: `250 ${t('achievements.countries.students')}` },
    { name: t('achievements.countries.russia'), flag: '/photos/flags/russia.png', students: `45 ${t('achievements.countries.students')}` },
    { name: t('achievements.countries.china'), flag: '/photos/flags/china.png', students: `35 ${t('achievements.countries.students')}` },
    { name: t('achievements.countries.poland'), flag: '/photos/flags/poland.png', students: `20 ${t('achievements.countries.students')}` }
  ], [t, lang])

  // Success stories data
  const SUCCESS_STORIES_DATA = useMemo(() => [
    {
      id: 1,
      name: t('achievements.successStoriesData.zeynab.name'),
      photo: '/photos/students/student.jpg',
      beforeAfter: t('achievements.successStoriesData.zeynab.beforeAfter'),
      story: t('achievements.successStoriesData.zeynab.story'),
      highlights: [
        t('achievements.successStoriesData.zeynab.highlights.duration'),
        t('achievements.successStoriesData.zeynab.highlights.type'),
        t('achievements.successStoriesData.zeynab.highlights.program')
      ],
      imageLeft: true
    },
    {
      id: 2,
      name: t('achievements.successStoriesData.orxan.name'),
      photo: '/photos/students/student.jpg',
      beforeAfter: t('achievements.successStoriesData.orxan.beforeAfter'),
      story: t('achievements.successStoriesData.orxan.story'),
      highlights: [
        t('achievements.successStoriesData.orxan.highlights.duration'),
        t('achievements.successStoriesData.orxan.highlights.type'),
        t('achievements.successStoriesData.orxan.highlights.program')
      ],
      imageLeft: false
    },
    {
      id: 3,
      name: t('achievements.successStoriesData.gunel.name'),
      photo: '/photos/students/student.jpg',
      beforeAfter: t('achievements.successStoriesData.gunel.beforeAfter'),
      story: t('achievements.successStoriesData.gunel.story'),
      highlights: [
        t('achievements.successStoriesData.gunel.highlights.duration'),
        t('achievements.successStoriesData.gunel.highlights.type'),
        t('achievements.successStoriesData.gunel.highlights.program')
      ],
      imageLeft: true
    }
  ], [t, lang])

  // Parse statistics for count-up animation
  const parsedStats = STATISTICS_DATA.map((stat) => ({
    ...stat,
    ...parseStatValue(stat.value),
  }))

  const numericTargets = parsedStats.map((stat) => stat.target)
  const { sectionRef, values } = useCountUpStats(numericTargets)

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
            { href: '/', label: t('achievements.breadcrumb.home') },
            { label: t('achievements.breadcrumb.achievements') }
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
            <h1>{t('achievements.page.title')}</h1>
            <p className="pageIntro">
              {t('achievements.page.intro')}
            </p>
          </header>
        </ScrollReveal>
        <div className="pageBody">

          {/* SECTION 2 — Statistics */}
          <ScrollReveal
            baseOpacity={0}
            enableBlur={true}
            baseRotation={0}
            blurStrength={10}
          >
            <section className="achievements-stats" ref={sectionRef}>
              <div className="container">
                <h2 className="achievements-section__title">{t('achievements.statistics.title')}</h2>
                <div className="achievements-stats__content">
                  <div className="achievements-stats__grid">
                    {parsedStats.map((stat, index) => (
                      <div key={stat.label} className="achievements-stat-card">
                        <div className="achievements-stat-card__value">
                          {values[index]}{stat.suffix}
                        </div>
                        <div className="achievements-stat-card__label">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                  <div className="achievements-stats__chart">
                    <div className="achievements-chart__container">
                      <Pie data={CHART_DATA} options={CHART_OPTIONS} />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </ScrollReveal>
          {/* SECTION 3 — Student Results */}
          <ScrollReveal
            baseOpacity={0}
            enableBlur={true}
            baseRotation={0}
            blurStrength={10}
          >
            <section className="achievements-results">
              <div className="container">
                <h2 className="achievements-section__title">{t('achievements.studentResults.title')}</h2>
                <div className="achievements-results__grid">
                  {STUDENT_RESULTS_DATA.map((student) => (
                    <div key={student.id} className="student-result-card">
                      <div className="student-result-card__photo">
                        <img
                          src={student.photo}
                          alt={student.name}
                          loading="lazy"
                        />
                      </div>
                      <div className="student-result-card__content">
                        <h3 className="student-result-card__name">{student.name}</h3>
                        <div className="student-result-card__exam">
                          <span className="student-result-card__exam-type">{student.examType}</span>
                          <span className="student-result-card__score">{student.score}</span>
                        </div>
                        <div className="student-result-card__acceptance">
                          <span className="student-result-card__country">{student.acceptedCountry}</span>
                          <span className="student-result-card__university">{student.acceptedUniversity}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </ScrollReveal>
          {/* SECTION 4 — Accepted Countries */}
          <ScrollReveal
            baseOpacity={0}
            enableBlur={true}
            baseRotation={0}
            blurStrength={10}
          >
            <section className="achievements-countries">
              <div className="container">
                <h2 className="achievements-section__title">{t('achievements.countries.title')}</h2>
                <div className="achievements-countries__grid">
                  {COUNTRIES_DATA.map((country) => (
                    <div key={country.name} className="country-card">
                      <div className="country-card__flag">
                        <img
                          src={country.flag}
                          alt={`${country.name} ${t('achievements.countries.flagAlt')}`}
                          loading="lazy"
                        />
                      </div>
                      <div className="country-card__name">{country.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </ScrollReveal>
          {/* SECTION 5 — Success Stories */}
          <ScrollReveal
            baseOpacity={0}
            enableBlur={true}
            baseRotation={0}
            blurStrength={10}
          >
            <section className="achievements-stories">
              <div className="container">
                <h2 className="achievements-section__title">{t('achievements.successStories.title')}</h2>
                <div className="achievements-stories__list">
                  {SUCCESS_STORIES_DATA.map((story) => (
                    <div key={story.id} className="success-story">
                      <div className={`success-story__inner ${story.imageLeft ? '' : 'success-story__inner--reversed'}`}>
                        <div className="success-story__image">
                          <img
                            src={story.photo}
                            alt={story.name}
                            loading="lazy"
                          />
                        </div>
                        <div className="success-story__content">
                          <h3 className="success-story__name">{story.name}</h3>
                          <div className="success-story__result">{story.beforeAfter}</div>
                          <p className="success-story__text">{story.story}</p>
                          <div className="success-story__highlights">
                            {story.highlights.map((highlight, index) => (
                              <span key={index} className="success-story__highlight">
                                {highlight}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </ScrollReveal>
        </div>
      </div>
    </main>
  )
}

export default Achievements


