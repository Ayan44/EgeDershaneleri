import React from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import ProfileCard from "../ui/ProfileCard";
import { getFeaturedTeachers } from "../../services/contentService";
import ScrollReveal from "../ui/ScrollReveal";
import { useLanguage } from "../../i18n/LanguageProvider";
export default function Teachers() {
  const { t, lang } = useLanguage()
  const navigate = useNavigate();
  const teachersData = getFeaturedTeachers();

  // Translate teacher data based on current language
  const teachers = React.useMemo(() => {
    return teachersData.map(teacher => ({
      ...teacher,
      fullName: t(`teachers.data.${teacher.slug}.fullName`) || teacher.fullName,
      role: t(`teachers.data.${teacher.slug}.role`) || teacher.role,
    }))
  }, [teachersData, t, lang])

  const handleContactClick = (teacherName) => {
    // Navigate to contact page with teacher name pre-filled
    navigate('/contact', { state: { teacherName } })
  };

  const handleTeacherCardClick = (teacherSlug) => {
    navigate(`/teachers?teacher=${teacherSlug}`);
  };

  return (
    <ScrollReveal
      baseOpacity={0}
      enableBlur={true}
      baseRotation={0}
      blurStrength={10}
    >
      <section className="teachers" id="teachers">
        <div className="container teachers__inner">
          <header className="sectionHeader">
            <span className="sectionLabel">{t('teachersSection.label')}</span>
            <h2 className="sectionTitle">{t('teachersSection.title')}</h2>
            <p className="sectionDesc">
              {t('teachersSection.description')}
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
                        status={t('teachersSection.status')}
                        contactText={t('teachersSection.contact')}
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
    </ScrollReveal>
  );
}
