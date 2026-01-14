import React, { useState, useEffect } from 'react'
import './ContactPage.css'
import Breadcrumb from '../components/ui/Breadcrumb'
import ScrollReveal from '../components/ui/ScrollReveal'
import { useLanguage } from '../i18n/LanguageProvider'

// Use environment variables - no fallback for security
const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT
const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL
const CONTACT_PHONE = import.meta.env.VITE_CONTACT_PHONE

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
  const [submitCount, setSubmitCount] = useState(0)
  const [lastSubmitTime, setLastSubmitTime] = useState(0)

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

    // Validate fullName: required, max length, no HTML tags
    const fullName = formData.fullName.trim()
    if (!fullName) {
      newErrors.fullName = t('contact.form.fullName.error')
    } else if (fullName.length > 100) {
      newErrors.fullName = t('contact.form.fullName.tooLong') || 'Name is too long (max 100 characters)'
    } else if (/<[^>]*>/g.test(fullName)) {
      newErrors.fullName = t('contact.form.fullName.invalid') || 'Invalid characters in name'
    }

    // Validate email: required, proper format, max length
    const email = formData.email.trim()
    if (!email) {
      newErrors.email = t('contact.form.email.error')
    } else if (email.length > 254) {
      newErrors.email = t('contact.form.email.tooLong') || 'Email is too long'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = t('contact.form.email.invalid')
    }

    // Validate phone: optional but if provided, must be valid format
    const phone = formData.phone.trim()
    if (phone && phone.length > 20) {
      newErrors.phone = t('contact.form.phone.tooLong') || 'Phone number is too long'
    } else if (phone && !/^[\d\s\-\+\(\)]+$/.test(phone)) {
      newErrors.phone = t('contact.form.phone.invalid') || 'Invalid phone number format'
    }

    // Validate message: required, max length, no HTML tags
    const message = formData.message.trim()
    if (!message) {
      newErrors.message = t('contact.form.message.error')
    } else if (message.length > 5000) {
      newErrors.message = t('contact.form.message.tooLong') || 'Message is too long (max 5000 characters)'
    } else if (/<script[^>]*>/gi.test(message)) {
      newErrors.message = t('contact.form.message.invalid') || 'Invalid content in message'
    }

    // Validate subject: optional but if provided, max length
    const subject = formData.subject.trim()
    if (subject && subject.length > 200) {
      newErrors.subject = t('contact.form.subject.tooLong') || 'Subject is too long'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return
    if (isSubmitting) return

    // Rate limiting: max 3 submissions per 5 minutes
    const now = Date.now()
    const timeSinceLastSubmit = now - lastSubmitTime
    const fiveMinutes = 5 * 60 * 1000

    if (timeSinceLastSubmit < fiveMinutes && submitCount >= 3) {
      setToast({
        type: "error",
        message: t("contact.form.rateLimit") || "Too many submissions. Please wait a few minutes before trying again.",
      })
      setTimeout(() => setToast(null), 5000)
      return
    }

    // Update rate limiting state
    if (timeSinceLastSubmit >= fiveMinutes) {
      setSubmitCount(1)
    } else {
      setSubmitCount(prev => prev + 1)
    }
    setLastSubmitTime(now)

    setIsSubmitting(true)

    try {
      // Sanitize inputs before sending
      const sanitizeInput = (input) => {
        return String(input || '')
          .trim()
          .replace(/<[^>]*>/g, '') // Remove HTML tags
          .substring(0, 5000) // Max length
      }

      const payload = new FormData()
      payload.append("fullName", sanitizeInput(formData.fullName))
      payload.append("email", sanitizeInput(formData.email))
      payload.append("phone", sanitizeInput(formData.phone))
      payload.append("subject", sanitizeInput(formData.subject))
      payload.append("message", sanitizeInput(formData.message))

      // Email subject (Formspree dəstəkləyir)
      const safeSubject = sanitizeInput(formData.subject) || "no-subject"
      payload.append("_subject", `EGE Dershane — Contact: ${safeSubject}`)

      // Honeypot (spam) — formda input kimi də verəcəyik
      payload.append("_gotcha", "")

      if (!FORMSPREE_ENDPOINT) {
        setToast({
          type: "error",
          message: t("contact.form.errorConfig") || "Configuration error. Please contact support.",
        })
        setIsSubmitting(false)
        return
      }

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
        let errMsg = t("contact.form.error")
        try {
          const data = await res.json()
          // Only show safe error messages, don't expose internal details
          if (data?.errors?.length && typeof data.errors[0].message === 'string') {
            const safeMessage = data.errors[0].message.substring(0, 200)
            // Only use if it's a user-friendly message
            if (!safeMessage.includes('stack') && !safeMessage.includes('Error:')) {
              errMsg = safeMessage
            }
          }
        } catch {
          // Silently fail to avoid exposing errors
        }

        setToast({ type: "error", message: errMsg })
      }
    } catch (error) {
      // Don't expose error details to users
      setToast({
        type: "error",
        message: t("contact.form.errorNetwork"),
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
                      <img src="/photos/contact_icons/phone.png" alt={t('contact.info.phone.label')} />
                    </div>
                    <div className="contactInfoContent">
                      <h3>{t('contact.info.phone.label')}</h3>
                      <p><a href={CONTACT_PHONE ? `tel:${CONTACT_PHONE}` : '#'} className="contactLink">{t('contact.info.phone.number')}</a></p>
                    </div>
                  </div>

                  <div className="contactInfoRow">
                    <div className="contactInfoIcon">
                      <img src="/photos/contact_icons/email.png" alt={t('contact.info.email.label')} />
                    </div>
                    <div className="contactInfoContent">
                      <h3>{t('contact.info.email.label')}</h3>
                      <p><a href={CONTACT_EMAIL ? `mailto:${CONTACT_EMAIL}` : '#'} className="contactLink">{t('contact.info.email.address')}</a></p>
                    </div>
                  </div>

                  <div className="contactInfoRow">
                    <div className="contactInfoIcon">
                      <img src="/photos/contact_icons/location.png" alt={t('contact.info.location.label')} />
                    </div>
                    <div className="contactInfoContent">
                      <h3>{t('contact.info.location.label')}</h3>
                      <p>{t('contact.info.location.address')}</p>
                    </div>
                  </div>

                  <div className="contactInfoRow">
                    <div className="contactInfoIcon">
                      <img src="/photos/contact_icons/instagram.png" alt={t('contact.info.instagram.label')} />
                    </div>
                    <div className="contactInfoContent">
                      <h3>{t('contact.info.instagram.label')}</h3>
                      <p>
                        <a
                          href="https://www.instagram.com/ege_dershaneleri?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                          target="_blank"
                          rel="noopener noreferrer"
                          className="contactLink"
                        >
                          {t('contact.info.instagram.handle')}
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="contactInfoRow">
                    <div className="contactInfoIcon">
                      <img src="/photos/contact_icons/whatsapp.png" alt={t('contact.info.whatsapp.label')} />
                    </div>
                    <div className="contactInfoContent">
                      <h3>{t('contact.info.whatsapp.label')}</h3>
                      <p>
                        <a
                          href={CONTACT_PHONE ? `https://wa.me/${CONTACT_PHONE.replace(/[^0-9]/g, '')}` : '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="contactLink"
                        >
                          {t('contact.info.whatsapp.number')}
                        </a>
                      </p>
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
                    {isSubmitting ? t('contact.form.submitting') : t('contact.form.submit')}
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