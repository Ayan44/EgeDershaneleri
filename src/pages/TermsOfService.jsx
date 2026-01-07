import React from 'react'
import ScrollReveal from '../components/ui/ScrollReveal'
function TermsOfService() {
  return (
    <main className="container page">
      <div className="pageContent">
        <ScrollReveal
          baseOpacity={0}
          enableBlur={true}
          baseRotation={0}
          blurStrength={10}
        >
        <header className="pageHeader">
          <h1>İstifadəçi Şərtləri</h1>
          <p className="pageIntro">
            Bu veb saytdan istifadə etməklə siz aşağıda qeyd olunan istifadəçi şərtləri ilə razılaşmış olursunuz. Əgər bu şərtlərlə razı deyilsinizsə, veb saytdan istifadə etməməyiniz tövsiyə olunur.
          </p>
        </header>
</ScrollReveal>
        <div className="pageBody">
          <ScrollReveal
            baseOpacity={0}
            enableBlur={true}
            baseRotation={0}
            blurStrength={10}
          >
          <section className="contentSection">
            <h2>Ümumi şərtlər</h2>
            <p>
              EGE Dershane veb saytı istifadəçilərə məlumatlandırıcı məqsədlə təqdim olunur. Saytda yerləşdirilən məlumatlar ümumi xarakter daşıyır.
            </p>
          </section>
          </ScrollReveal>
          <ScrollReveal
            baseOpacity={0}
            enableBlur={true}
            baseRotation={0}
            blurStrength={10}
          >
          <section className="contentSection">
            <h2>Məzmunun istifadəsi</h2>
            <p>
              Veb saytda yerləşdirilən mətnlər, şəkillər və digər materiallar EGE Dershane-yə məxsusdur. Bu materialların icazəsiz surətdə kopyalanması, yayılması və ya kommersiya məqsədilə istifadəsi qadağandır.
            </p>
          </section>
          </ScrollReveal>
          <ScrollReveal
            baseOpacity={0}
            enableBlur={true}
            baseRotation={0}
            blurStrength={10}
          >
          <section className="contentSection">
            <h2>Xidmətlərin dəyişdirilməsi</h2>
            <p>
              EGE Dershane istənilən vaxt veb saytın məzmununu, dizaynını və təqdim olunan məlumatları dəyişdirmək, yeniləmək və ya silmək hüququna malikdir.
            </p>
          </section>
          </ScrollReveal>
          <ScrollReveal
            baseOpacity={0}
            enableBlur={true}
            baseRotation={0}
            blurStrength={10}
          >
          <section className="contentSection">
            <h2>Məsuliyyətin məhdudlaşdırılması</h2>
            <p>
              Saytda təqdim olunan məlumatlar əsasında verilən qərarlara görə EGE Dershane məsuliyyət daşımır. İstifadəçi veb saytdan öz məsuliyyəti ilə istifadə edir.
            </p>
          </section>
          </ScrollReveal>
          <ScrollReveal
            baseOpacity={0}
            enableBlur={true}
            baseRotation={0}
            blurStrength={10}
          >
          <section className="contentSection">
            <h2>Üçüncü tərəf linkləri</h2>
            <p>
              Veb saytda üçüncü tərəflərə aid linklər mövcud ola bilər. Bu linklərin məzmununa görə EGE Dershane məsuliyyət daşımır.
            </p>
          </section>
          </ScrollReveal>
          <ScrollReveal
            baseOpacity={0}
            enableBlur={true}
            baseRotation={0}
            blurStrength={10}
          >
          <section className="contentSection">
            <h2>Dəyişikliklər</h2>
            <p>
              Bu istifadəçi şərtləri vaxtilə yenilənə bilər. Yenilənmiş versiya veb saytda dərc edildikdən sonra qüvvəyə minir.
            </p>
            </section>
            </ScrollReveal>
        </div>
      </div>
    </main>
  )
}

export default TermsOfService
