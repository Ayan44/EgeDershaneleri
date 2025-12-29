// Course categories
export const COURSE_CATEGORIES = {
  IMTAHAN: 'İmtahan',
  DIL: 'Dil',
  OLIMPIADA: 'Olimpiada'
}

export const COURSES_DATA = [
  {
    id: 'sat',
    slug: 'sat',
    title: 'SAT Hazırlığı',
    shortDescription: 'SAT imtahanına yüksək nəticə əldə etmək üçün intensiv hazırlıq proqramı. Amerikalı universitetlərə qəbul üçün vacib bir addımdır.',
    category: COURSE_CATEGORIES.IMTAHAN,
    order: 1,
    navGroup: 'main',
    thumbnailUrl: '/courses/course.jpg',
    level: 'Orta səviyyə',
    format: 'Online',
    audience: [
      'Abituriyentlər və məzunlar',
      'Amerika universitetlərinə müraciət edənlər',
      'Yüksək akademik nəticə hədəfləyənlər',
      'Məktəb proqramını tamamlamaq istəyənlər'
    ],
    program: [
      'Reading: mətn anlayışı və təhlil bacarıqları',
      'Writing: esse yazma və qrammatika',
      'Math: algebra və həndəsə mövzuları',
      'Praktiki testlər və mock imtahanlar',
      'Fərdi məsləhətlər və irəliləyiş izləmə',
      'Öyrənmə strategiyaları və vaxt idarəetmə',
      'Həftəlik qiymətləndirmə testləri'
    ],
    outcomes: [
      'SAT imtahanında yüksək bal əldə etmə',
      'Amerika universitetlərinə qəbul şansının artması',
      'Akademik yazı və oxuma bacarıqlarının inkişafı',
      'Vaxt idarəetmə və streslə mübarizə bacarıqları',
      'Gələcək akademik uğurlar üçün əsas'
    ],
    ctaText: 'Qeydiyyat və məsləhət üçün əlaqə saxlayın'
  },
  {
    id: 'yos-tys',
    slug: 'yos-tys',
    title: 'YÖS / TYS Hazırlığı',
    shortDescription: 'Türk universitetlərinə qəbul üçün YÖS və TYS imtahanlarına peşəkar hazırlıq. Türkiyənin ən yaxşı universitetlərinə qəbul şansınızı artırın.',
    category: COURSE_CATEGORIES.IMTAHAN,
    order: 2,
    navGroup: 'main',
    thumbnailUrl: '/courses/course.jpg',
    level: 'Orta səviyyə',
    format: 'Online',
    audience: [
      'Türkiyə universitetlərinə müraciət edənlər',
      'YÖS/TYS imtahanına hazırlaşan abituriyentlər',
      'Türk təhsil sistemi ilə tanış olmaq istəyənlər',
      'Xaricdə təhsil hədəfləyənlər'
    ],
    program: [
      'YÖS: Riyaziyyat, Fizika, Kimya, Biologiya',
      'TYS: Türk dili və ədəbiyyatı, Riyaziyyat, Tarix',
      'Praktiki testlər və mövzu təkrarları',
      'Türk universitetləri haqqında məlumat',
      'Fərdi hazırlıq planı və izləmə',
      'Mock imtahanlar və performans təhlili',
      'Motivasiya və stres idarəetmə'
    ],
    outcomes: [
      'YÖS/TYS imtahanlarında yüksək nəticə',
      'Türkiyənin top universitetlərinə qəbul',
      'Türk təhsil sistemi ilə tanışlıq',
      'Akademik hazırlığın gücləndirilməsi',
      'Gələcək karyera perspektivlərinin genişlənməsi'
    ],
    ctaText: 'Qeydiyyat və məsləhət üçün əlaqə saxlayın'
  },
  {
    id: 'ielts',
    slug: 'ielts',
    title: 'IELTS Hazırlığı',
    shortDescription: 'Beynəlxalq ingilis dili imtahanı üçün peşəkar hazırlıq kursu. Dünyanın ən çox qəbul edilən ingilis dili sertifikatı.',
    category: COURSE_CATEGORIES.DIL,
    order: 3,
    navGroup: 'main',
    thumbnailUrl: '/courses/course.jpg',
    level: 'Bütün səviyyələr',
    format: 'Online',
    audience: [
      'Xaricdə təhsil hədəfləyənlər',
      'İş üçün ingilis dili sertifikatı ehtiyacı olanlar',
      'İngilis dilini peşəkar səviyyədə istifadə etmək istəyənlər',
      'Akademik və peşəkar inkişaf axtaranlar'
    ],
    program: [
      'Listening: müxtəlif aksentlər və situasiyalar',
      'Reading: akademik və ümumi mətnlər',
      'Writing: akademik esse və məktub yazma',
      'Speaking: təqdimat və müzakirə bacarıqları',
      'Mock imtahanlar və performans qiymətləndirmə',
      'Fərdi zəif tərəflərin gücləndirilməsi',
      'İngilis dili qramatikası və lüğət genişləndirmə'
    ],
    outcomes: [
      'IELTS imtahanında yüksək bal əldə etmə',
      'Dünya universitetlərinə qəbul şansının artması',
      'İngilis dilində effektiv ünsiyyət bacarıqları',
      'Akademik və peşəkar fürsətlərin genişlənməsi',
      'Qlobal karyera perspektivlərinin açılması'
    ],
    ctaText: 'Qeydiyyat və məsləhət üçün əlaqə saxlayın'
  },
  {
    id: 'toefl',
    slug: 'toefl',
    title: 'TOEFL Hazırlığı',
    shortDescription: 'TOEFL iBT imtahanına yüksək nəticə əldə etmək üçün intensiv hazırlıq proqramı. Amerika və Kanada universitetləri üçün ideal.',
    category: COURSE_CATEGORIES.DIL,
    order: 4,
    navGroup: 'main',
    thumbnailUrl: '/courses/course.jpg',
    level: 'Orta səviyyə',
    format: 'Online',
    audience: [
      'Amerika və Kanada universitetlərinə müraciət edənlər',
      'Akademik ingilis dili bacarıqlarını inkişaf etdirmək istəyənlər',
      'TOEFL sertifikatı tələb edən proqramlara müraciət edənlər',
      'Beynəlxalq təhsil hədəfləyənlər'
    ],
    program: [
      'Reading: akademik mətnlərin sürətli oxunması',
      'Listening: mühazirələr və konversasiyalar',
      'Speaking: akademik müzakirələr və təqdimatlar',
      'Writing: akademik esse və yazı bacarıqları',
      'Komputer əsaslı test interfeysi ilə tanışlıq',
      'Vaxt idarəetmə və strategiyalar',
      'Mock imtahanlar və detallı feedback'
    ],
    outcomes: [
      'TOEFL imtahanında yüksək bal əldə etmə',
      'Amerika/Kanada universitetlərinə qəbul',
      'Akademik ingilis dili bacarıqlarının inkişafı',
      'Beynəlxalq təhsil və karyera fürsətləri',
      'Qlobal akademik standartlara uyğunlaşma'
    ],
    ctaText: 'Qeydiyyat və məsləhət üçün əlaqə saxlayın'
  },
  {
    id: 'general-english',
    slug: 'general-english',
    title: 'Ümumi İngilis Dili',
    shortDescription: 'Ümumi ingilis dili bacarıqlarını inkişaf etdirmək üçün nəzərdə tutulmuş intensiv kurs proqramı.',
    category: COURSE_CATEGORIES.DIL,
    order: 5,
    navGroup: 'main',
    thumbnailUrl: '/courses/course.jpg',
    level: 'Başlanğıc səviyyə',
    format: 'Online',
    audience: [
      'İngilis dilini sıfırdan öyrənmək istəyənlər',
      'Ümumi ünsiyyət bacarıqlarını inkişaf etdirmək istəyənlər',
      'Səyahət və iş üçün ingilis dili öyrənmək istəyənlər',
      'Ailə və dostlarla ünsiyyət üçün dil bacarıqları'
    ],
    program: [
      'Əsas qrammatika qaydaları və istifadə',
      'Lüğət genişləndirmə və söz ehtiyatı',
      'Danışıq bacarıqları və tələffüz',
      'Oxuma və yazma bacarıqları',
      'Dinləmə anlayışı və ünsiyyət',
      'Real həyat situasiyalarında praktika',
      'Mədəniyyət və dil əlaqələri'
    ],
    outcomes: [
      'Ümumi ingilis dili ünsiyyəti bacarıqları',
      'Səyahət və iş mühitində rahatlıq',
      'Yeni dostluqlar və mədəni əlaqələr',
      'Özünəinamın artması və motivasiya',
      'Gələcək dil öyrənmə üçün əsas'
    ],
    ctaText: 'Qeydiyyat və məsləhət üçün əlaqə saxlayın'
  },
  {
    id: 'olympiad-math',
    slug: 'olympiad-math',
    title: 'Olimpiada Riyaziyyatı',
    shortDescription: 'Riyaziyyat olimpiadaları üçün ixtisaslaşdırılmış hazırlıq proqramı. Beynəlxalq riyaziyyat müsabiqələrinə qatılmaq istəyənlər üçün.',
    category: COURSE_CATEGORIES.OLIMPIADA,
    order: 6,
    navGroup: 'olympiad',
    thumbnailUrl: '/courses/course.jpg',
    level: 'Yüksək səviyyə',
    format: 'Online',
    audience: [
      'Riyaziyyat olimpiadalarına qatılmaq istəyən şagirdlər',
      'Yüksək riyaziyyat bacarıqlarını inkişaf etdirmək istəyənlər',
      'Beynəlxalq müsabiqələrə hazırlaşanlar',
      'Məntiq və analitik düşünmə bacarıqlarını gücləndirmək istəyənlər'
    ],
    program: [
      'Kombinatorika və ehtimal nəzəriyyəsi',
      'Həndəsə və koordinat sistemi',
      'Algebra və funksiyalar',
      'Məntiq problemi həlli strategiyaları',
      'Beynəlxalq olimpiada təcrübələri',
      'Fərdi məşq proqramları',
      'Performans izləmə və inkişaf təhlili'
    ],
    outcomes: [
      'Olimpiada riyaziyyatında yüksək bacarıqlar',
      'Beynəlxalq müsabiqələrdə uğur',
      'Məntiq və analitik düşünmənin inkişafı',
      'Akademik uğur və motivasiya',
      'Gələcək STEM karyerası üçün baza'
    ],
    ctaText: 'Qeydiyyat və məsləhət üçün əlaqə saxlayın'
  },
  {
    id: 'olympiad-iq',
    slug: 'olympiad-iq',
    title: 'IQ Olimpiada Hazırlığı',
    shortDescription: 'IQ və məntiq olimpiadaları üçün xüsusi hazırlıq proqramı. Beynəlxalq IQ müsabiqələrinə qatılmaq üçün ideal hazırlıq.',
    category: COURSE_CATEGORIES.OLIMPIADA,
    order: 7,
    navGroup: 'olympiad',
    thumbnailUrl: '/courses/course.jpg',
    level: 'Orta səviyyə',
    format: 'Online',
    audience: [
      'IQ olimpiadalarına qatılmaq istəyən şagirdlər',
      'Məntiq və düşünmə bacarıqlarını inkişaf etdirmək istəyənlər',
      'Beynəlxalq müsabiqələrə hazırlaşanlar',
      'Analitik düşünmə bacarıqlarını gücləndirmək istəyənlər'
    ],
    program: [
      'Məntiq problemi həlli strategiyaları',
      'Pattern recognition və analitik düşünmə',
      'Riyazi məntiq və kombinatorika',
      'Vaxt idarəetmə və strategiyalar',
      'Beynəlxalq IQ testləri praktikası',
      'Performans təhlili və zəif tərəflərin gücləndirilməsi',
      'Psixoloji hazırlıq və stres idarəetmə'
    ],
    outcomes: [
      'IQ müsabiqələrində yüksək nəticələr',
      'Məntiq və analitik düşünmə bacarıqlarının inkişafı',
      'Beynəlxalq müsabiqələrdə uğur qazanma',
      'Özünəinam və akademik motivasiya',
      'Gələcək akademik və peşəkar uğurlar'
    ],
    ctaText: 'Qeydiyyat və məsləhət üçün əlaqə saxlayın'
  },
  {
    id: 'olympiad-english',
    slug: 'olympiad-english',
    title: 'İngilis Dili Olimpiada Hazırlığı',
    shortDescription: 'İngilis dili olimpiadaları üçün yüksək səviyyəli hazırlıq proqramı. Beynəlxalq dil müsabiqələrinə qatılmaq üçün peşəkar dəstək.',
    category: COURSE_CATEGORIES.OLIMPIADA,
    order: 8,
    navGroup: 'olympiad',
    thumbnailUrl: '/courses/course.jpg',
    level: 'Yüksək səviyyə',
    format: 'Online',
    audience: [
      'İngilis dili olimpiadalarına qatılmaq istəyən şagirdlər',
      'Yüksək səviyyəli dil bacarıqlarını inkişaf etdirmək istəyənlər',
      'Beynəlxalq dil müsabiqələrinə hazırlaşanlar',
      'Akademik ingilis dili bacarıqlarını gücləndirmək istəyənlər'
    ],
    program: [
      'Akademik lüğət və ifadələr',
      'Esse yazma və yaradıcı yazı bacarıqları',
      'Dil qaydaları və qrammatika',
      'Təqdimat və debat bacarıqları',
      'Beynəlxalq olimpiada formatları',
      'Mətn təhlili və ədəbi tənqid',
      'Vaxt idarəetmə və strategiyalar'
    ],
    outcomes: [
      'İngilis dili olimpiadalarında yüksək uğur',
      'Akademik yazı və ünsiyyət bacarıqlarının inkişafı',
      'Beynəlxalq müsabiqələrdə iştirak',
      'Dil bacarıqlarının peşəkar səviyyəyə çatdırılması',
      'Gələcək akademik və karyera fürsətləri'
    ],
    ctaText: 'Qeydiyyat və məsləhət üçün əlaqə saxlayın'
  }
]

// Helper functions
export const getCourses = () => COURSES_DATA

export const getCourseById = (id) => COURSES_DATA.find(course => course.id === id)

export const getCoursesForGrid = () => {
  return COURSES_DATA.map(course => ({
    title: course.title,
    shortDescription: course.shortDescription,
    category: course.category,
    href: course.slug.startsWith('olympiad-')
      ? `/courses/olympiad/${course.slug.replace('olympiad-', '')}`
      : `/courses/${course.slug}`
  }))
}

export const getCoursesByCategory = () => {
  const grouped = {}
  COURSES_DATA.forEach(course => {
    const category = course.category
    if (!grouped[category]) {
      grouped[category] = []
    }
    grouped[category].push({
      ...course,
      href: course.slug.startsWith('olympiad-')
        ? `/courses/olympiad/${course.slug.replace('olympiad-', '')}`
        : `/courses/${course.slug}`
    })
  })
  return grouped
}