import React from "react";
import ScrollReveal from "../ui/ScrollReveal";
import { Swiper, SwiperSlide } from "swiper/react";

import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";

import "swiper/css/pagination";

import { getTestimonials } from "../../services/contentService";
import { useLanguage } from "../../i18n/LanguageProvider";

export default function Testimonials() {
  const { t, lang } = useLanguage()
  const testimonialsData = getTestimonials();

  // Translate testimonials based on current language
  const testimonials = React.useMemo(() => {
    return testimonialsData.map(testimonial => ({
      ...testimonial,
      studentName: t(`testimonials.data.${testimonial.id}.studentName`),
      text: t(`testimonials.data.${testimonial.id}.text`),
      scoreOrResult: t(`testimonials.data.${testimonial.id}.scoreOrResult`),
    }))
  }, [testimonialsData, t, lang])

  return (
    <ScrollReveal
      baseOpacity={0}
      enableBlur={true}
      baseRotation={0}
      blurStrength={10}
    >
      <section className="testimonials" id="testimonials">
        <div className="container testimonials__inner">
          <header className="sectionHeader">
            <span className="sectionLabel">{t('testimonials.label')}</span>
            <h2 className="sectionTitle">{t('testimonials.title')}</h2>
            <p className="sectionDesc">
              {t('testimonials.description')}
            </p>
          </header>

          <div className="testimonials__swiperWrap">
            <Swiper
              modules={[Pagination, Autoplay]}
              effect="slide"
              centeredSlides={true}
              grabCursor={true}
              loop={true}
              pagination={{ clickable: true }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
              }}
              slidesPerView={3}
              spaceBetween={24}
              breakpoints={{
                0: { slidesPerView: 1.1, spaceBetween: 16 },
                640: { slidesPerView: 2, spaceBetween: 18 },
                1024: { slidesPerView: 3, spaceBetween: 24 },
              }}
              className="testimonialsSwiper"
            >
              {testimonials.map((testimonial) => (
                <SwiperSlide key={testimonial.id}>
                  <article className="testimonialCard">
                    <div className="testimonialAvatar">
                      <img
                        src={testimonial.image}
                        alt={`${testimonial.studentName} avatar`}
                        loading="lazy"
                      />
                    </div>
                    <p className="testimonialText">"{testimonial.text}"</p>
                    <div className="testimonialName">{testimonial.studentName}</div>
                    {testimonial.scoreOrResult && (
                      <div className="testimonialScore">{testimonial.scoreOrResult}</div>
                    )}
                  </article>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
}