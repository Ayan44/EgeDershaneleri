import { Link } from 'react-router-dom'

function StudyAbroad() {
  return (
    <section className="studyAbroad" id="study-abroad">
      <div className="container studyAbroad__inner">
        <div className="studyAbroad__copy">
          <p className="studyAbroad__eyebrow">Xaricdə Təhsil</p>
          <h2 className="studyAbroad__title">Dünyanın ən yaxşı universitetlərində təhsil</h2>
          <p className="studyAbroad__subtitle">
            Xaricdə təhsil arzunuzu gerçəkləşdirmək üçün peşəkar məsləhət və tam dəstək
            xidmətlərimizlə yanınızdayıq. Avropa, Amerika və digər ölkələrdəki
            universitetlərə qəbul prosesini sadələşdiririk.
          </p>

          <ul className="studyAbroad__list">
            <li>Universitet seçimi və uyğunluq analizi</li>
            <li>Sənəd hazırlığı və müraciət prosesi</li>
            <li>Təqaüd və qəbul strategiyası</li>
            <li>Viza istiqamətləndirilməsi</li>
            <li>Təhsil planı və yol xəritəsi</li>
            <li>Davamlı dəstək və monitorinq</li>
          </ul>

          <div className="studyAbroad__actions">
            <Link to="/contact" className="btn btn--primary">
              Məsləhət al
            </Link>
            <Link to="/study-abroad" className="btn btn--secondary">
              Ətraflı
            </Link>
          </div>
        </div>

        <div className="studyAbroad__media">
          <div
            className="studyAbroad__image"
            role="img"
            aria-label="Xaricdə təhsil üçün vizual (placeholder)"
          />

          <div className="studyAbroad__highlight">
            <span className="studyAbroad__highlight-text">Pulsuz ilkin konsultasiya</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default StudyAbroad
