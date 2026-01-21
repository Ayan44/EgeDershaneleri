import { useEffect, useRef, useState } from 'react'
import ScrollReveal from '../ui/ScrollReveal'
import { useLanguage } from '../../i18n/LanguageProvider'
const STATS_CONFIG = [
  { value: '500+', label: 'Tələbə' },
  { value: '120+', label: 'Beynəlxalq qəbul' },
  { value: '10+', label: 'İllik təcrübə' },
]

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

function Stats() {
  const { t } = useLanguage()

  const STATS_CONFIG_TRANSLATED = [
    { value: '500+', label: t('stats.items.students') },
    { value: '100%', label: t('stats.items.internationalAdmissions') },
    { value: '7+', label: t('stats.items.yearsExperience') },
  ]

  const parsedStats = STATS_CONFIG_TRANSLATED.map((stat) => ({
    ...stat,
    ...parseStatValue(stat.value),
  }))

  const numericTargets = parsedStats.map((stat) => stat.target)
  const { sectionRef, values } = useCountUpStats(numericTargets)

  return (
    <ScrollReveal
      baseOpacity={0}
      enableBlur={true}
      baseRotation={0}
      blurStrength={10}
    >
      <section className="stats" ref={sectionRef}>
        <div className="container stats__inner">
          <div className="stats__copy">
            <p className="stats__eyebrow">{t('stats.eyebrow')}</p>
            <h2 className="stats__title">{t('stats.title')}</h2>
            <p className="stats__subtitle">
              {t('stats.subtitle')}
            </p>

            <dl className="stats__list">
              {parsedStats.map((stat, index) => (
                <div key={stat.label} className="stats__item">
                  <dt className="stats__value">
                    <span className="stats__value-badge">
                      {values[index]}
                      {stat.suffix}
                    </span>
                  </dt>
                  <dd className="stats__label">{stat.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="stats__media">
            <img
              src="/photos/statistics.png"
              alt={t('stats.imageAlt')}
              className="stats__image"
              loading="lazy"
            />

            <div className="stats__cards">
              <div className="stats__ceo-card founderCard">
                <div className="founderCard__avatar">
                  <img
                    src="/photos/founder.jpg"
                    alt={t('stats.founder.name')}
                    loading="lazy"
                  />
                </div>
                <div className="founderCard__text">
                  <p className="founderCard__name">{t('stats.founder.name')}</p>
                  <p className="founderCard__role">{t('stats.founder.role')}</p>
                  <div className="founderCard__socials">
                    <p>{t('stats.founder.social1')}</p>
                    <p>{t('stats.founder.social2')}</p>
                    <p>{t('stats.founder.social3')}</p>
                  </div>
                </div>
              </div>

              <div className="stats__ceo-card founderCard">
                <div className="founderCard__avatar">
                  <img
                    src="/photos/m-vusale.jpeg"
                    alt={t('stats.director.name')}
                    loading="lazy"
                  />
                </div>
                <div className="founderCard__text">
                  <p className="founderCard__name">{t('stats.director.name')}</p>
                  <p className="founderCard__role">{t('stats.director.role')}</p>
                  <div className="founderCard__socials">
                    <p>{t('stats.director.social1')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </ScrollReveal>
  )
}

export default Stats
