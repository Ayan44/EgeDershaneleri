import React from 'react'

function PrivacyPolicy() {
  return (
    <main className="container page">
      <div className="pageContent">
        <header className="pageHeader">
          <h1>Məxfilik Siyasəti</h1>
          <p className="pageIntro">
            EGE Dershane olaraq istifadəçilərimizin məxfiliyinə hörmətlə yanaşır və şəxsi məlumatların qorunmasını prioritet hesab edirik.
          </p>
        </header>

        <div className="pageBody">
          <section className="contentSection">
            <p>
              Bu Məxfilik Siyasəti veb saytımızdan istifadə zamanı toplanan məlumatların hansı məqsədlərlə istifadə edildiyini izah edir.
            </p>
          </section>

          <section className="contentSection">
            <h2>Toplanan məlumatlar</h2>
            <p>
              Veb saytımız üzərindən yalnız əlaqə məqsədilə aşağıdakı minimal məlumatlar toplana bilər:
            </p>
            <ul>
              <li>Ad və soyad</li>
              <li>Telefon nömrəsi</li>
              <li>Elektron poçt (email) ünvanı</li>
            </ul>
            <p>
              Bu məlumatlar istifadəçi tərəfindən könüllü şəkildə təqdim edilir.
            </p>
          </section>

          <section className="contentSection">
            <h2>Məlumatların istifadə məqsədi</h2>
            <p>
              Toplanan məlumatlar aşağıdakı məqsədlərlə istifadə olunur:
            </p>
            <ul>
              <li>İstifadəçilərlə əlaqə saxlamaq</li>
              <li>Kurslar və xidmətlər haqqında məlumat vermək</li>
              <li>İstifadəçi sorğularını cavablandırmaq</li>
              <li>Xidmət keyfiyyətini artırmaq</li>
            </ul>
          </section>

          <section className="contentSection">
            <h2>Məlumatların paylaşılması</h2>
            <p>
              İstifadəçilərə aid şəxsi məlumatlar üçüncü şəxslərlə paylaşılmır. Yalnız qanunvericiliyin tələblərinə uyğun olaraq rəsmi qurumların sorğusu əsasında açıqlana bilər.
            </p>
          </section>

          <section className="contentSection">
            <h2>Məlumatların qorunması</h2>
            <p>
              Şəxsi məlumatların təhlükəsizliyini təmin etmək üçün texniki və inzibati tədbirlər görülür. Məlumatlara yalnız səlahiyyətli şəxslər tərəfindən giriş mümkündür.
            </p>
          </section>

          <section className="contentSection">
            <h2>İstifadəçi hüquqları</h2>
            <p>
              İstifadəçilər:
            </p>
            <ul>
              <li>Öz şəxsi məlumatları haqqında məlumat almaq</li>
              <li>Məlumatların yenilənməsini və ya silinməsini tələb etmək hüququna malikdirlər</li>
            </ul>
            <p>
              Bu məqsədlə bizimlə əlaqə saxlaya bilərlər.
            </p>
          </section>

          <section className="contentSection">
            <h2>Dəyişikliklər</h2>
            <p>
              EGE Dershane bu Məxfilik Siyasətinə istənilən vaxt dəyişiklik etmək hüququnu özündə saxlayır. Yenilənmiş versiya veb saytda dərc edildiyi andan qüvvəyə minir.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}

export default PrivacyPolicy
