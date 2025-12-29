import React, { useState } from 'react'
import { GALLERY_ITEMS } from '../data/gallery'
import DomeGallery from '../components/sections/DomeGallery';
const FAQ_ITEMS = [
  {
    question: "Kurslara qeydiyyat necə həyata keçirilir?",
    answer: "Kurslara qeydiyyat üçün veb saytımız vasitəsilə onlayn müraciət edə bilərsiniz. Əlaqə məlumatlarımızı istifadə edərək bizimlə əlaqə saxlaya və detallı məlumat ala bilərsiniz."
  },
  {
    question: "Dərslər hansı formada keçirilir?",
    answer: "Dərslərimiz həm onlayn, həm də oflayn formada keçirilir. Onlayn dərslər üçün interaktiv platforma təqdim edirik, oflayn dərslər isə müasir avadanlıqla təchiz olunmuş siniflərdə aparılır."
  },
  {
    question: "Kursların müddəti nə qədərdir?",
    answer: "Kursların müddəti imtahan növündən və tələbənin hazırlıq səviyyəsindən asılı olaraq dəyişir. SAT və IELTS kursları adətən 3-6 ay arası davam edir, lakin fərdi yanaşma ilə müddət tənzimlənə bilər."
  },
  {
    question: "Tədris haqları nə qədərdir?",
    answer: "Tədris haqları kurs növündən, müddətindən və tədris formasından (onlayn/oflayn) asılı olaraq dəyişir. Ətraflı məlumat üçün bizimlə əlaqə saxlayın."
  },
  {
    question: "Xaricdə təhsil xidmətləri hansılardır?",
    answer: "Xaricdə təhsil xidmətlərimiz universitet seçimi, sənəd hazırlığı, viza prosesi, qəbul strategiyası və təhsil planı hazırlığını əhatə edir."
  },
  {
    question: "Nailiyyət göstəricilərimiz necədir?",
    answer: "Tələbələrimizin əksəriyyəti hədəf imtahanlarında yüksək nəticələr göstərir. Konkret statistikalar üçün Nailiyyətlərimiz səhifəsinə baxa bilərsiniz."
  },
  {
    question: "Dərs cədvəli necə tərtib olunur?",
    answer: "Dərs cədvəli tələbənin mövcud proqramı və vaxt imkanları nəzərə alınaraq fərdi şəkildə tərtib olunur. Həftə sonları və axşam saatlarında dərslər təşkil etmək mümkündür."
  },
  {
    question: "Ödəniş şərtləri necədir?",
    answer: "Ödənişlər hissə-hissə həyata keçirilə bilər. İlkin ödənişdən sonra qalan məbləği kurs müddəti ərzində ayırmaq mümkündür."
  }
]

function About() {
  const [openFaq, setOpenFaq] = useState(null)

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <main className="container page">
      <div className="pageContentAbout">
        <header className="pageHeader">
          <h1>Haqqımızda</h1>
          <p className="pageIntro">
            EGE Dershane haqqında ətraflı məlumat, müəllim heyətimiz və tez-tez verilən suallar.
          </p>
        </header>

        {/* In-page navigation */}
        <nav className="aboutNav" aria-label="Səhifə naviqasiyası">
          <div className="aboutNavButtons">
            <button
              onClick={() => scrollToSection('company')}
              className="aboutNavButton"
            >
              EGE haqqında
            </button>
            <button
              onClick={() => scrollToSection('gallery')}
              className="aboutNavButton"
            >
              Qalereya
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="aboutNavButton"
            >
              FAQ
            </button>
          </div>
        </nav>

        <div className="pageBody">
          {/* Company Section */}
          <section id="company" className="contentSection">
            <h2>EGE Dershane haqqında</h2>
            <p>
              EGE Dershane xaricdə təhsil və imtahan hazırlığı sahəsində Azərbaycanın qabaqcıl təhsil mərkəzlərindən biridir.
              2020-ci ildən fəaliyyət göstərən mərkəzimiz yüzlərlə tələbəyə keyfiyyətli təhsil xidmətləri təqdim edir.
            </p>
            <div className="companyHighlights">
              <div className="highlightItem">
                <h3>Missiyamız</h3>
                <p>Tələbələrimizə yüksək keyfiyyətli təhsil verərək onların xaricdə təhsil arzularını gerçəkləşdirmək.</p>
              </div>
              <div className="highlightItem">
                <h3>Yanaşmamız</h3>
                <p>Fərdi yanaşma, praktiki metodlar və müasir texnologiyalarla təhsil prosesini effektivləşdirmək.</p>
              </div>
              <div className="highlightItem">
                <h3>Nəticələrimiz</h3>
                <p>Tələbələrimizin əksəriyyəti hədəf imtahanlarında yüksək ballar toplayaraq arzuladıqları universitetlərə qəbul olunur.</p>
              </div>
            </div>
          </section>

          {/* Gallery Section */}
          <section id="gallery" className="contentSection">
            <h2>Qalereya</h2>
            <p>
              EGE Dershane-nin fəaliyyəti, tədbirləri və tələbə uğurlarımızdan fotolar.
            </p>
            {/* Gallery content will be implemented later */}
            <div style={{width:'100%',height:'70vh'}}>
              <DomeGallery grayscale={false} fit={1} maxVerticalRotationDeg={0} overlayBlurColor='transparent' />
            </div>
          </section>

          {/* FAQ Section */}
          <section id="faq" className="contentSection">
            <h2>Tez-tez verilən suallar</h2>
            <p>
              Kurslar, ödənişlər və xidmətlərimizlə bağlı ən çox verilən sualların cavabları.
            </p>
            <div className="faqAccordion">
              {FAQ_ITEMS.map((item, index) => (
                <div key={index} className="faqItem">
                  <button
                    className={`faqQuestion ${openFaq === index ? 'faqQuestion--open' : ''}`}
                    onClick={() => toggleFaq(index)}
                    aria-expanded={openFaq === index}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <span>{item.question}</span>
                    <span className="faqIcon" aria-hidden="true">
                      {openFaq === index ? '−' : '+'}
                    </span>
                  </button>
                  <div
                    id={`faq-answer-${index}`}
                    className={`faqAnswer ${openFaq === index ? 'faqAnswer--open' : ''}`}
                    aria-hidden={openFaq !== index}
                  >
                    <p>{item.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}

export default About