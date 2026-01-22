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
    { value: '500+', label: t('achievements.statistics.labels.acceptedStudents') },
    { value: '100%', label: t('achievements.statistics.labels.successRate') },
    { value: '7+', label: t('achievements.statistics.labels.yearsExperience') },
    { value: '20+', label: t('achievements.statistics.labels.teachingStaff') }
  ], [t, lang])

  // Chart data with translations
  const CHART_DATA = useMemo(() => ({
    labels: [
      t('achievements.chart.labels.yos'),
      t('achievements.chart.labels.entrant'),
      t('achievements.chart.labels.english'),
      t('achievements.chart.labels.individual'),
      t('achievements.chart.labels.sat'),
    ],
    datasets: [
      {
        data: [35, 30, 20, 10, 15],
        backgroundColor: [
          'rgba(245, 158, 11, 0.8)',  // Amber - YÖS
          'rgba(37, 99, 235, 0.8)',    // Blue - Abituriyent
          'rgba(124, 58, 237, 0.8)',  // Purple - İngilis dili
          'rgba(239, 68, 68, 0.8)',   // Red - Fərdi
          'rgba(16, 185, 129, 0.8)',  // Green - SAT
        ],
        borderColor: [
          'rgba(245, 158, 11, 1)',
          'rgba(37, 99, 235, 1)',
          'rgba(124, 58, 237, 1)',
          'rgba(239, 68, 68, 1)',
          'rgba(16, 185, 129, 1)',
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
      name: t('achievements.studentResults.data.1.name') || 'Anar Həbibli',
      photo: '/photos/students/AnarHəbibli.png',
      examType: 'YÖS/TYS',
      score: 'Bilgisayar Mühendisliği',
      acceptedCountry: t('achievements.countries.turkey'),
      acceptedUniversity: t('achievements.universities.adnan')
    },
    {
      id: 2,
      name: t('achievements.studentResults.data.2.name') || 'Səidə Mustafayeva',
      photo: '/photos/students/SəidəMustafayeva.png',
      examType: 'YÖS/TYS',
      score: 'Bilgisayar Mühendisliği',
      acceptedCountry: t('achievements.countries.turkey'),
      acceptedUniversity: t('achievements.universities.iskenderun')
    },
    {
      id: 3,
      name: t('achievements.studentResults.data.3.name') || 'Azər Zamanov',
      photo: '/photos/students/AzərZamanov.png',
      examType: 'YÖS/TYS',
      score: 'Yazılım Mühendisliği',
      acceptedCountry: t('achievements.countries.turkey'),
      acceptedUniversity: t('achievements.universities.adnan')
    },
    {
      id: 4,
      name: t('achievements.studentResults.data.4.name') || 'Əminə Məhərrəmli',
      photo: '/photos/students/ƏminəMəhərrəmli.png',
      examType: 'YÖS/TYS',
      score: 'Bilgisayar Mühendisliği',
      acceptedCountry: t('achievements.countries.turkey'),
      acceptedUniversity: t('achievements.universities.iskenderun')
    },
    {
      id: 5,
      name: t('achievements.studentResults.data.5.name') || 'Kənan Kərimli',
      photo: '/photos/students/KənanKərimli.png',
      examType: 'YÖS/TYS',
      score: 'Makina Mühendisliği',
      acceptedCountry: t('achievements.countries.turkey'),
      acceptedUniversity: t('achievements.universities.adnan')
    },
    {
      id: 6,
      name: t('achievements.studentResults.data.6.name') || 'Əli Mehdiyev',
      photo: '/photos/students/ƏliMehdiyev.png',
      examType: 'YÖS/TYS',
      score: 'Diş Hekimliği',
      acceptedCountry: t('achievements.countries.turkey'),
      acceptedUniversity: t('achievements.universities.zonguldak')
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
      name: t('achievements.successStoriesData.sureyya.name'),
      photo: '/photos/students/Sürəyya.png',
      beforeAfter: t('achievements.successStoriesData.sureyya.beforeAfter'),
      story: t('achievements.successStoriesData.sureyya.story'),
      highlights: [
        t('achievements.successStoriesData.sureyya.highlights.duration'),
        t('achievements.successStoriesData.sureyya.highlights.type'),
        t('achievements.successStoriesData.sureyya.highlights.program')
      ],
      imageLeft: true
    },
    {
      id: 2,
      name: t('achievements.successStoriesData.zehra.name'),
      photo: '/photos/students/Zəhra.png',
      beforeAfter: t('achievements.successStoriesData.zehra.beforeAfter'),
      story: t('achievements.successStoriesData.zehra.story'),
      highlights: [
        t('achievements.successStoriesData.zehra.highlights.duration'),
        t('achievements.successStoriesData.zehra.highlights.type'),
        t('achievements.successStoriesData.zehra.highlights.program')
      ],
      imageLeft: false
    },
    {
      id: 3,
      name: t('achievements.successStoriesData.rena.name'),
      photo: '/photos/students/Rəna.png',
      beforeAfter: t('achievements.successStoriesData.rena.beforeAfter'),
      story: t('achievements.successStoriesData.rena.story'),
      highlights: [
        t('achievements.successStoriesData.rena.highlights.duration'),
        t('achievements.successStoriesData.rena.highlights.type'),
        t('achievements.successStoriesData.rena.highlights.program')
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


