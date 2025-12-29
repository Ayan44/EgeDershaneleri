import { Link } from 'react-router-dom'

function Hero() {
  return (
    <section className="hero">
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__fallback" />
        <img
          src="/videos/hero.webp"
          alt=""
          className="hero__webp"
          loading="lazy"
          aria-hidden="true"
        />
        <div className="hero__overlay" />
        <div className="hero__fade" />
      </div>

      <div className="hero__inner">
        <div className="container hero__content">
          <h1 className="hero__title">
            Gələcəyini bu gündən qur<span className="hero__title-accent">.</span>
          </h1>
          <p className="hero__subtitle">
            SAT, YÖS, IELTS və daha çoxu üçün nəticəyönümlü hazırlıq proqramları ilə
            tələbələri hədəflədikləri universitetlərə aparırıq.
          </p>

          <div className="hero__actions">
            <Link to="/contact" className="btn btn--primary">
              Əlaqə
            </Link>
            <Link to="/about" className="btn btn--secondary">
              Haqqımızda
            </Link>
          </div>

          <ul className="hero__chips">
            <li className="chip">SAT / YÖS / IELTS</li>
            <li className="chip">Peşəkar müəllim heyəti</li>
            <li className="chip">Nəticəyönümlü proqram</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Hero
