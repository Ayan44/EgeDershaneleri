import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";

import "swiper/css/pagination";

import { getTestimonials } from "../../services/contentService";

export default function Testimonials() {
  const testimonials = getTestimonials();

  return (
    <section className="testimonials" id="testimonials">
      <div className="container testimonials__inner">
        <header className="sectionHeader">
          <span className="sectionLabel">Tələbələrin fikirləri</span>
          <h2 className="sectionTitle">Məzunlarımızın təəssüratları</h2>
          <p className="sectionDesc">
            Kurslarımızda iştirak etmiş tələbələrin real fikirləri və təcrübələri.
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
            {testimonials.map((t) => (
              <SwiperSlide key={t.id}>
                <article className="testimonialCard">
                  <div className="testimonialAvatar">
                    <img
                      src="/photos/students/student.jpg"
                      alt={`${t.studentName} avatar`}
                      loading="lazy"
                    />
                  </div>
                  <p className="testimonialText">"{t.text}"</p>
                  <div className="testimonialName">{t.studentName}</div>
                  {t.scoreOrResult && (
                    <div className="testimonialScore">{t.scoreOrResult}</div>
                  )}
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}