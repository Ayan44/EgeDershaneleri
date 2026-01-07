import React, { useState, useEffect } from 'react'
import './ContactPage.css'
import Breadcrumb from '../components/ui/Breadcrumb'
import ScrollReveal from '../components/ui/ScrollReveal'
import { useLanguage } from '../i18n/LanguageProvider'
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xdakqggz" // <-- öz endpoint-in

function Contact() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [errors, setErrors] = useState({})
  const [toast, setToast] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

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
      newErrors.fullName = t('contact.form.fullName.error')
    }

    if (!formData.email.trim()) {
      newErrors.email = t('contact.form.email.error')
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('contact.form.email.invalid')
    }

    if (!formData.message.trim()) {
      newErrors.message = t('contact.form.message.error')
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return
    if (isSubmitting) return

    setIsSubmitting(true)

    try {
      const payload = new FormData()
      payload.append("fullName", formData.fullName)
      payload.append("email", formData.email)
      payload.append("phone", formData.phone)
      payload.append("subject", formData.subject)
      payload.append("message", formData.message)

      // Email subject (Formspree dəstəkləyir)
      payload.append("_subject", `EGE Dershane — Contact: ${formData.subject || "no-subject"}`)

      // Honeypot (spam) — formda input kimi də verəcəyik
      payload.append("_gotcha", "")

      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: payload,
        headers: {
          Accept: "application/json",
        },
      })

      if (res.ok) {
        setToast({ type: "success", message: t("contact.form.success") })

        setFormData({
          fullName: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        })
      } else {
        // Formspree JSON error formatı ola bilər
        let errMsg = t("contact.form.error") || "Mesaj göndərilə bilmədi. Zəhmət olmasa yenidən cəhd edin."
        try {
          const data = await res.json()
          if (data?.errors?.length) errMsg = data.errors[0].message
        } catch { }

        setToast({ type: "error", message: errMsg })
      }
    } catch (error) {
      setToast({
        type: "error",
        message: t("contact.form.errorNetwork") || "Şəbəkə xətası. Zəhmət olmasa yenidən cəhd edin.",
      })
    } finally {
      setTimeout(() => setToast(null), 5000)
      setIsSubmitting(false)
    }
  }


  // Clear toast on unmount
  useEffect(() => {
    return () => {
      setToast(null)
    }
  }, [])

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
            { href: '/', label: t('contact.breadcrumb.home') },
            { label: t('contact.breadcrumb.contact') }
          ]}
        />
      </ScrollReveal>
      <div className="pageContentContact">
        {/* Hero Section */}
        <ScrollReveal
          baseOpacity={0}
          enableBlur={true}
          baseRotation={0}
          blurStrength={10}
        >
          <header className="pageHeader">
            <h1>{t('contact.page.title')}</h1>
            <p className="pageIntro">
              {t('contact.page.intro')}
            </p>
          </header>
        </ScrollReveal>
        {/* Contact Form + Info Section */}
        <ScrollReveal
          baseOpacity={0}
          enableBlur={true}
          baseRotation={0}
          blurStrength={10}
        >
          <section className="contactFormInfoSection contentSection">
            <div className="contactFormInfoContainer">
              {/* Left Column: Contact Info */}
              <div className="contactInfoColumn">
                <h2>{t('contact.info.title')}</h2>
                <div className="contactInfoRows">
                  <div className="contactInfoRow">
                    <div className="contactInfoIcon">
                      <img src="/photos/contact_icons/phone.png" alt="Phone" />
                    </div>
                    <div className="contactInfoContent">
                      <h3>{t('contact.info.phone.label')}</h3>
                      <p><a href="tel:+994501234567" className="contactLink">{t('contact.info.phone.number')}</a></p>
                    </div>
                  </div>

                  <div className="contactInfoRow">
                    <div className="contactInfoIcon">
                      <img src="/photos/contact_icons/email.png" alt="Email" />
                    </div>
                    <div className="contactInfoContent">
                      <h3>{t('contact.info.email.label')}</h3>
                      <p><a href="mailto:info@egedershane.az" className="contactLink">{t('contact.info.email.address')}</a></p>
                    </div>
                  </div>

                  <div className="contactInfoRow">
                    <div className="contactInfoIcon">
                      <img src="/photos/contact_icons/location.png" alt="Location" />
                    </div>
                    <div className="contactInfoContent">
                      <h3>{t('contact.info.location.label')}</h3>
                      <p>{t('contact.info.location.address')}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Contact Form */}
              <div className="contactFormColumn">
                <form onSubmit={handleSubmit} className="newContactForm">
                  <input
                    type="text"
                    name="_gotcha"
                    tabIndex="-1"
                    autoComplete="off"
                    style={{ display: "none" }}
                  />

                  {/* Row 1: First Name + Your Email */}
                  <div className="formRow">
                    <div className="formGroup">
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        className="formInput"
                        placeholder={t('contact.form.fullName.placeholder')}
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                        aria-describedby={errors.fullName ? "fullName-error" : undefined}
                      />
                      {errors.fullName && (
                        <span id="fullName-error" className="error" style={{ color: '#dc2626', fontSize: '0.875rem', marginTop: '0.25rem' }}>
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
                        placeholder={t('contact.form.email.placeholder')}
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        aria-describedby={errors.email ? "email-error" : undefined}
                      />
                      {errors.email && (
                        <span id="email-error" className="error" style={{ color: '#dc2626', fontSize: '0.875rem', marginTop: '0.25rem' }}>
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
                        placeholder={t('contact.form.phone.placeholder')}
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
                        <option value="">{t('contact.form.subject.placeholder')}</option>
                        <option value="course-registration">{t('contact.form.subject.options.courseRegistration')}</option>
                        <option value="consultation">{t('contact.form.subject.options.consultation')}</option>
                        <option value="study-abroad">{t('contact.form.subject.options.studyAbroad')}</option>
                        <option value="pricing">{t('contact.form.subject.options.pricing')}</option>
                        <option value="schedule">{t('contact.form.subject.options.schedule')}</option>
                        <option value="other">{t('contact.form.subject.options.other')}</option>
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
                      placeholder={t('contact.form.message.placeholder')}
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      aria-describedby={errors.message ? "message-error" : undefined}
                    />
                    {errors.message && (
                      <span id="message-error" className="error" style={{ color: '#dc2626', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                        {errors.message}
                      </span>
                    )}
                  </div>

                  {/* Send Message Button */}
                  <button type="submit" className="sendMessageBtn" disabled={isSubmitting}>
                    {isSubmitting ? (t('contact.form.submitting') || "Göndərilir...") : t('contact.form.submit')}
                  </button>

                </form>
              </div>
            </div>
          </section>
        </ScrollReveal>
        {/* Map Section */}
        <ScrollReveal
          baseOpacity={0}
          enableBlur={true}
          baseRotation={0}
          blurStrength={10}
        >
          <section className="mapSection contentSection">
            <h2>{t('contact.map.title')}</h2>
            <p>
              {t('contact.map.description')}
            </p>
            <div className="mapContainer">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d409.53295679861367!2d49.87523016905223!3d40.40504457518375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307d4798fdca67%3A0x7d7fd1d6cef8d6e8!2sEGE%20DERSHANELER%C4%B0!5e0!3m2!1sen!2saz!4v1767608397013!5m2!1sen!2saz"
                width="100%"
                height="400"
                style={{ border: 0, borderRadius: '8px' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ofis yeri - Baku, Azerbaijan"
              ></iframe>
            </div>
          </section>
        </ScrollReveal>
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