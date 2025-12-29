import { useState } from 'react'
import './AbroadEducation.css'

function StudyAbroad() {
  const [openFaq, setOpenFaq] = useState(null)

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  const faqData = [
    {
      question: "Proses nə qədər vaxt aparır?",
      answer: "Xaricdə təhsil prosesi tələbənin seçdiyi ölkə və proqramdan asılı olaraq 6-18 ay arası vaxt aparır. İlkin konsultasiyadan başlayaraq qəbul və viza prosesinə qədər hər mərhələ peşəkar dəstəklə həyata keçirilir."
    },
    {
      question: "Dil biliyi mütləqdirmi?",
      answer: "Bəzi ölkələr və proqramlar üçün dil sertifikatı tələb olunur, lakin hazırlıq proqramlarımız çərçivəsində dil təlimləri də təqdim edirik. Hər tələbənin səviyyəsinə uyğun fərdi yanaşma göstərilir."
    },
    {
      question: "Təqaüd imkanları varmı?",
      answer: "Bəli, müxtəlif ölkələrdə dövlət və universitet təqaüdləri mövcuddur. Tələbənin akademik göstəricilərinə və seçdiyi proqrama görə ən uyğun təqaüd variantlarını müəyyən edirik."
    },
    {
      question: "Hansı sənədlər lazımdır?",
      answer: "Əsas sənədlər: attestat/diplom, dil sertifikatı, pasport, tibbi arayış və maliyyə təminatı sübutu. Hər ölkə üçün xüsusi tələblər fərqli ola bilər - sənədlərin hazırlanmasında tam dəstək göstərilir."
    }
  ]

  return (
    <main className="abroad-education">
      {/* 1️⃣ Hero Section */}
      <section className="abroad-hero">
        <div className="abroad-hero__content">
          <div className="abroad-hero__text">
            <h1 className="abroad-hero__title">Xaricdə Təhsil Dəstəyi</h1>
            <p className="abroad-hero__subtitle">
              Qəbul prosesindən vizaya, yerləşmədən adaptasiyaya qədər tam xaricdə təhsil dəstəyi təqdim edirik.
              Tələbələrimizin xaricdə uğurlu təhsil həyatı qurmasına peşəkar köməklik göstəririk.
            </p>
          </div>
          <div className="abroad-hero__image">
            <div className="abroad-hero__placeholder">
              {/* Using a placeholder div since no specific image was provided */}
            </div>
          </div>
        </div>
      </section>

      {/* 2️⃣ Process Steps */}
      <section className="abroad-process">
        <div className="abroad-container">
          <h2 className="abroad-section__title">Xaricdə təhsil prosesi necə gedir?</h2>

          <div className="abroad-process__timeline">
            <div className="process-step">
              <div className="process-step__number">1</div>
              <div className="process-step__content">
                <h3 className="process-step__title">İlkin konsultasiya və profil analizi</h3>
                <ul className="process-step__list">
                  <li>Tələbənin akademik göstəriciləri və məqsədləri qiymətləndirilir</li>
                  <li>Uyğun ölkə və proqram variantları müzakirə edilir</li>
                </ul>
              </div>
            </div>

            <div className="process-step">
              <div className="process-step__number">2</div>
              <div className="process-step__content">
                <h3 className="process-step__title">Uyğun ölkə və universitet seçimi</h3>
                <ul className="process-step__list">
                  <li>Tələbənin büdcəsi və akademik səviyyəsinə uyğun variantlar təqdim edilir</li>
                  <li>Ən yaxşı qəbul şansı olan universitetlər tövsiyə edilir</li>
                </ul>
              </div>
            </div>

            <div className="process-step">
              <div className="process-step__number">3</div>
              <div className="process-step__content">
                <h3 className="process-step__title">Sənədlərin hazırlanması və müraciət</h3>
                <ul className="process-step__list">
                  <li>Bütün lazımi sənədlər peşəkar şəkildə hazırlanır</li>
                  <li>Universitetlərə rəsmi müraciətlər göndərilir</li>
                </ul>
              </div>
            </div>

            <div className="process-step">
              <div className="process-step__number">4</div>
              <div className="process-step__content">
                <h3 className="process-step__title">Qəbul və viza prosesi</h3>
                <ul className="process-step__list">
                  <li>Qəbul məktubları alındıqdan sonra viza sənədləri hazırlanır</li>
                  <li>Səfirlik görüşləri və viza alınması prosesində dəstək göstərilir</li>
                </ul>
              </div>
            </div>

            <div className="process-step">
              <div className="process-step__number">5</div>
              <div className="process-step__content">
                <h3 className="process-step__title">Köç, yerləşmə və adaptasiya dəstəyi</h3>
                <ul className="process-step__list">
                  <li>Hava limanında qarşılanma və yaşayış yerinə yerləşmə</li>
                  <li>Kulturovi adaptasiya və akademik həyatda dəstək</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3️⃣ Top Destinations */}
      <section className="abroad-destinations">
        <div className="abroad-container">
          <h2 className="abroad-section__title">Ən çox seçilən ölkələr</h2>

          <div className="abroad-destinations__grid">
            <div className="destination-card">
              <div className="destination-card__flag">
                <img
                  src="/photos/flags/turkey.png"
                  alt="Türkiyə bayrağı"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.classList.add('flag-fallback');
                  }}
                />
              </div>
              <div className="destination-card__content">
                <h3 className="destination-card__name">Türkiyə</h3>
                <p className="destination-card__description">
                  Keyfiyyətli təhsil, münasib qiymətlər və Avropa standartları ilə tanınan universitetlər.
                </p>
              </div>
            </div>

            <div className="destination-card">
              <div className="destination-card__flag">
                <img
                  src="/photos/flags/russia.png"
                  alt="Rusiya bayrağı"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.classList.add('flag-fallback');
                  }}
                />
              </div>
              <div className="destination-card__content">
                <h3 className="destination-card__name">Rusiya</h3>
                <p className="destination-card__description">
                  Texniki və humanitar sahələrdə yüksək səviyyəli təhsil, beynəlxalq tanınmış diplomlar.
                </p>
              </div>
            </div>

            <div className="destination-card">
              <div className="destination-card__flag">
                <img
                  src="/photos/flags/china.png"
                  alt="Çin bayrağı"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.classList.add('flag-fallback');
                  }}
                />
              </div>
              <div className="destination-card__content">
                <h3 className="destination-card__name">Çin</h3>
                <p className="destination-card__description">
                  Texnologiya və mühəndislik sahələrində dünya lideri olan universitetlər və təqaüd proqramları.
                </p>
              </div>
            </div>

            <div className="destination-card">
              <div className="destination-card__flag">
                <img
                  src="/photos/flags/usa.png"
                  alt="ABŞ bayrağı"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.classList.add('flag-fallback');
                  }}
                />
              </div>
              <div className="destination-card__content">
                <h3 className="destination-card__name">ABŞ</h3>
                <p className="destination-card__description">
                  Dünyanın ən prestijli universitetləri, geniş akademik imkanlar və karyera fürsətləri.
                </p>
              </div>
            </div>

            <div className="destination-card">
              <div className="destination-card__flag">
                <img
                  src="/photos/flags/canada.png"
                  alt="Kanada bayrağı"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.classList.add('flag-fallback');
                  }}
                />
              </div>
              <div className="destination-card__content">
                <h3 className="destination-card__name">Kanada</h3>
                <p className="destination-card__description">
                  Yüksək keyfiyyətli təhsil sistemi, multikultural mühit və immiqrasiya imkanları.
                </p>
              </div>
            </div>

            <div className="destination-card">
              <div className="destination-card__flag">
                <img
                  src="/photos/flags/poland.png"
                  alt="Polşa bayrağı"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.classList.add('flag-fallback');
                  }}
                />
              </div>
              <div className="destination-card__content">
                <h3 className="destination-card__name">Polşa</h3>
                <p className="destination-card__description">
                  Avropa standartlarında təhsil, aşağı təhsil haqqı və ingilis dilli proqramlar.
                </p>
              </div>
            </div>
          </div>

          {/* 4️⃣ Other Countries Note */}
          <div className="abroad-note">
            <div className="abroad-note__content">
              <p>
                Saytda göstərilməyən digər ölkələr üzrə də xaricdə təhsil üçün dəstək təqdim edirik.
                Seçimlər tələbənin məqsədinə və profilinə uyğun olaraq fərdi şəkildə müəyyən edilir.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5️⃣ Who Is It For */}
      <section className="abroad-audience">
        <div className="abroad-container">
          <h2 className="abroad-section__title">Kimlər üçün uyğundur?</h2>

          <div className="abroad-audience__grid">
            <div className="audience-item">
              <div className="audience-item__icon">🎓</div>
              <h3 className="audience-item__title">Orta məktəb məzunları</h3>
            </div>

            <div className="audience-item">
              <div className="audience-item__icon">📚</div>
              <h3 className="audience-item__title">Bakalavr / magistr oxumaq istəyənlər</h3>
            </div>

            <div className="audience-item">
              <div className="audience-item__icon">🎓</div>
              <h3 className="audience-item__title">Xaricdə diplom almaq istəyənlər</h3>
            </div>

            <div className="audience-item">
              <div className="audience-item__icon">👨‍👩‍👧‍👦</div>
              <h3 className="audience-item__title">Valideynlər (övladı üçün)</h3>
            </div>
          </div>
        </div>
      </section>

      {/* 6️⃣ Mini FAQ */}
      <section className="abroad-faq">
        <div className="abroad-container">
          <h2 className="abroad-section__title">Tez-tez verilən suallar</h2>

          <div className="faqAccordion">
            {faqData.map((faq, index) => (
              <div key={index} className="faqItem">
                <button
                  className={`faqQuestion ${openFaq === index ? 'faqQuestion--open' : ''}`}
                  onClick={() => toggleFaq(index)}
                  aria-expanded={openFaq === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span>{faq.question}</span>
                  <span className="faqIcon" aria-hidden="true">
                    {openFaq === index ? '−' : '+'}
                  </span>
                </button>
                <div
                  id={`faq-answer-${index}`}
                  className={`faqAnswer ${openFaq === index ? 'faqAnswer--open' : ''}`}
                  aria-hidden={openFaq !== index}
                >
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

export default StudyAbroad


