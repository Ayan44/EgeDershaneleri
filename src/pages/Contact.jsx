import React, { useState, useEffect } from 'react'
import './ContactPage.css'

const CONTACT_FAQ_ITEMS = [
  {
    question: "Kurslara qeydiyyat necə həyata keçirilir?",
    answer: "Kurslara qeydiyyat üçün veb saytımız vasitəsilə onlayn müraciət edə bilərsiniz. Əlaqə məlumatlarımızı istifadə edərək bizimlə əlaqə saxlaya və detallı məlumat ala bilərsiniz."
  },
  {
    question: "Məsləhət sessiyaları necə təşkil olunur?",
    answer: "Məsləhət sessiyaları üçün WhatsApp və ya telefon vasitəsilə bizimlə əlaqə saxlaya bilərsiniz. Onlayn və ya oflayn görüş variantları mövcuddur."
  },
  {
    question: "Xaricdə təhsil üçün konsultasiya xidmətləri hansılardır?",
    answer: "Xaricdə təhsil konsultasiyası universitet seçimi, sənəd hazırlığı, viza prosesi, qəbul strategiyası və maliyyə planlaması daxil olmaqla tam dəstək xidmətləri təqdim edirik."
  },
  {
    question: "Fərdi dərslər mümkündürmü?",
    answer: "Bəli, fərdi dərslər tələbənin səviyyəsi və vaxt imkanlarına uyğun olaraq təşkil olunur. Qiymətlər və qrafik barədə məlumat üçün bizimlə əlaqə saxlayın."
  },
  {
    question: "Dərs qrafiki necə tənzimlənir?",
    answer: "Dərs qrafiki tələbənin mövcud proqramı nəzərə alınaraq fərdi şəkildə tərtib olunur. Həftə sonları və axşam saatlarında dərslər təşkil etmək mümkündür."
  },
  {
    question: "Əlaqə formasından istifadə etdikdən sonra nə olur?",
    answer: "Əlaqə formasını göndərdikdən sonra 24 saat ərzində sizinlə əlaqə saxlayacağıq. Bütün məlumatlar məxfi saxlanılır və yalnız konsultasiya məqsədi ilə istifadə olunur."
  },
  {
    question: "Ofisə şəxsən müraciət etmək mümkündürmü?",
    answer: "Bəli, ofisimizə şəxsən müraciət edə bilərsiniz. Ünvan məlumatları səhifənin yuxarı hissəsində göstərilib. Əvvəlcədən zəng edərək görüş təyin etməyinizi tövsiyə edirik."
  },
  {
    question: "Xaricdə təhsil proqramları üçün qiymətlər nə qədərdir?",
    answer: "Xaricdə təhsil xidmətlərinin qiymətləri seçdiyiniz universitet, proqram və xidmət paketindən asılı olaraq dəyişir. Ətraflı məlumat üçün bizimlə əlaqə saxlayın."
  }
]

function Contact() {
  const [openFaq, setOpenFaq] = useState(null)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [errors, setErrors] = useState({})
  const [toast, setToast] = useState(null)

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }


  const validateForm = () => {
    const newErrors = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Ad və soyad tələb olunur'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email tələb olunur'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Düzgün email formatı daxil edin'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Mesaj tələb olunur'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    // Mock form submission
    console.log('Form submitted:', formData)

    // Show success toast
    setToast({
      type: 'success',
      message: 'Mesajınız uğurla göndərildi! Qısa zamanda sizinlə əlaqə saxlayacağıq.'
    })

    // Reset form
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    })

    // Hide toast after 5 seconds
    setTimeout(() => {
      setToast(null)
    }, 5000)
  }

  // Clear toast on unmount
  useEffect(() => {
    return () => {
      setToast(null)
    }
  }, [])

  return (
    <main className="container page">
      <div className="pageContentContact">
        {/* Hero Section */}
        <header className="pageHeader">
          <h1>Əlaqə</h1>
          <p className="pageIntro">
            Bizimlə əlaqə saxlamaq üçün aşağıdakı məlumatlardan istifadə edə bilərsiniz. Sualınız varsa, bizimlə WhatsApp və ya email vasitəsilə əlaqə saxlaya bilərsiniz.
          </p>
        </header>

        {/* Contact Form + Info Section */}
        <section className="contactFormInfoSection contentSection">
          <div className="contactFormInfoContainer">
            {/* Left Column: Contact Info */}
            <div className="contactInfoColumn">
              <h2>Contact with us</h2>
              <div className="contactInfoRows">
                <div className="contactInfoRow">
                  <div className="contactInfoIcon">
                    <img src="/photos/contact_icons/phone.png" alt="Phone" />
                  </div>
                  <div className="contactInfoContent">
                    <h3>Telephone Number</h3>
                    <p><a href="tel:+994501234567" className="contactLink">+994 50 123 45 67</a></p>
                  </div>
                </div>

                <div className="contactInfoRow">
                  <div className="contactInfoIcon">
                    <img src="/photos/contact_icons/email.png" alt="Email" />
                  </div>
                  <div className="contactInfoContent">
                    <h3>Email Address</h3>
                    <p><a href="mailto:info@egedershane.az" className="contactLink">info@egedershane.az</a></p>
                  </div>
                </div>

                <div className="contactInfoRow">
                  <div className="contactInfoIcon">
                    <img src="/photos/contact_icons/location.png" alt="Location" />
                  </div>
                  <div className="contactInfoContent">
                    <h3>Office Location Address</h3>
                    <p>Bakı şəhəri, Nərimanov rayonu<br />Azadlıq prospekti 123</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="contactFormColumn">
              <form onSubmit={handleSubmit} className="newContactForm">
                {/* Row 1: First Name + Your Email */}
                <div className="formRow">
                  <div className="formGroup">
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    className="formInput"
                    placeholder="First Name"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    aria-describedby={errors.fullName ? "fullName-error" : undefined}
                  />
                    {errors.fullName && (
                      <span id="fullName-error" className="error" style={{color: '#dc2626', fontSize: '0.875rem', marginTop: '0.25rem'}}>
                        {errors.fullName}
                      </span>
                    )}
                  </div>

                  <div className="formGroup">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="formInput"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                    {errors.email && (
                      <span id="email-error" className="error" style={{color: '#dc2626', fontSize: '0.875rem', marginTop: '0.25rem'}}>
                        {errors.email}
                      </span>
                    )}
                  </div>
                </div>

                {/* Row 2: Phone Number + Your Subject */}
                <div className="formRow">
                  <div className="formGroup">
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="formInput"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="formGroup">
                    <select
                      id="subject"
                      name="subject"
                      className="formSelect"
                      value={formData.subject}
                      onChange={handleInputChange}
                    >
                      <option value="">Your Subject</option>
                      <option value="course-registration">Course Registration</option>
                      <option value="consultation">Consultation</option>
                      <option value="study-abroad">Study Abroad</option>
                      <option value="pricing">Pricing</option>
                      <option value="schedule">Schedule</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Row 3: Write A Message */}
                <div className="formGroup">
                  <textarea
                    id="message"
                    name="message"
                    className="formTextarea"
                    rows="6"
                    placeholder="Write A Message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    aria-describedby={errors.message ? "message-error" : undefined}
                  />
                  {errors.message && (
                    <span id="message-error" className="error" style={{color: '#dc2626', fontSize: '0.875rem', marginTop: '0.25rem'}}>
                      {errors.message}
                    </span>
                  )}
                </div>

                {/* Send Message Button */}
                <button type="submit" className="sendMessageBtn">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="contentSection">
          <h2>Tez-tez verilən suallar</h2>
          <p>
            Kurslar, ödənişlər və xidmətlərimizlə bağlı ən çox verilən sualların cavabları.
          </p>
          <div className="faqAccordion">
            {CONTACT_FAQ_ITEMS.map((item, index) => (
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

      {/* Toast Notification */}
      {toast && (
        <div className={`toast ${toast.type === 'error' ? 'error' : ''}`}>
          {toast.message}
        </div>
      )}
    </main>
  )
}

export default Contact