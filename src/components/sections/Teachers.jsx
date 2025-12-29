import React from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import ProfileCard from "../ui/ProfileCard";
import { getFeaturedTeachers } from "../../services/contentService";

export default function Teachers() {
  const navigate = useNavigate();
  const teachers = getFeaturedTeachers();

  const handleContactClick = (teacherName) => {
    // Placeholder for contact functionality
    console.log(`Contact clicked for ${teacherName}`);
    // Could navigate to contact page or open a modal
  };

  const handleTeacherCardClick = (teacherSlug) => {
    navigate(`/teachers?teacher=${teacherSlug}`);
  };

  return (
    <section className="teachers" id="teachers">
      <div className="container teachers__inner">
        <header className="sectionHeader">
          <span className="sectionLabel">Müəllim heyəti</span>
          <h2 className="sectionTitle">Peşəkar müəllimlərimiz</h2>
          <p className="sectionDesc">
            Təcrübəli və peşəkar müəllimlərimiz komandası ilə sizə ən yaxşı təhsil təcrübəsini təqdim edirik.
          </p>
        </header>

        <div className="teachers__swiperWrap">
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
            className="teachersSwiper"
          >
            {teachers.map((teacher) => (
              <SwiperSlide key={teacher.id}>
                <div className="teacherCard">
                  <div
                    className="teacherCard__clickable"
                    onClick={() => handleTeacherCardClick(teacher.slug)}
                  >
                    <ProfileCard
                      name={teacher.fullName}
                      title={teacher.role}
                      avatarUrl={teacher.photoUrl}
                      miniAvatarUrl={teacher.photoUrl}
                      handle={teacher.slug}
                      status="Online"
                      contactText="Əlaqə"
                      onContactClick={() => handleContactClick(teacher.fullName)}
                      enableTilt={true}
                      behindGlowEnabled={true}
                      showUserInfo={false}
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
