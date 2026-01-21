// Course Categories
export const COURSE_CATEGORIES = {
  IMTAHAN: 'imtahan',
  DIL: 'dil',
  OLIMPIADA: 'olimpiada',
}

// Course Data
export const COURSES_DATA = [
  // İmtahan kateqoriyası
  {
    id: 1,
    slug: 'sat',
    category: COURSE_CATEGORIES.IMTAHAN,
    navGroup: COURSE_CATEGORIES.IMTAHAN,
    thumbnailUrl: '/photos/courses/SAT.png',
  },
  {
    id: 2,
    slug: 'yos-tys',
    category: COURSE_CATEGORIES.IMTAHAN,
    navGroup: COURSE_CATEGORIES.IMTAHAN,
    thumbnailUrl: '/photos/courses/YOS_TYS.png',
  },
  {
    id: 3,
    slug: 'graduation-preparation',
    category: COURSE_CATEGORIES.IMTAHAN,
    navGroup: COURSE_CATEGORIES.IMTAHAN,
    thumbnailUrl: '/photos/courses/Buraxılış.png',
  },
  {
    id: 4,
    slug: 'entrant-preparation',
    category: COURSE_CATEGORIES.IMTAHAN,
    navGroup: COURSE_CATEGORIES.IMTAHAN,
    thumbnailUrl: '/photos/courses/Abituriyent.png',
  },

  // Dil kateqoriyası
  {
    id: 5,
    slug: 'ielts',
    category: COURSE_CATEGORIES.DIL,
    navGroup: COURSE_CATEGORIES.DIL,
    thumbnailUrl: '/photos/courses/IELTS.png',
  },
  {
    id: 6,
    slug: 'toefl',
    category: COURSE_CATEGORIES.DIL,
    navGroup: COURSE_CATEGORIES.DIL,
    thumbnailUrl: '/photos/courses/TOEFL.png',
  },
  {
    id: 7,
    slug: 'general-english',
    category: COURSE_CATEGORIES.DIL,
    navGroup: COURSE_CATEGORIES.DIL,
    thumbnailUrl: '/photos/courses/General.png',
  },
  {
    id: 8,
    slug: 'alman',
    category: COURSE_CATEGORIES.DIL,
    navGroup: COURSE_CATEGORIES.DIL,
    thumbnailUrl: '/photos/courses/Alman.png',
  },
  {
    id: 9,
    slug: 'rus',
    category: COURSE_CATEGORIES.DIL,
    navGroup: COURSE_CATEGORIES.DIL,
    thumbnailUrl: '/photos/courses/Rus.png',
  },

  // Olimpiada kateqoriyası
  {
    id: 10,
    slug: 'olympiad-math',
    category: COURSE_CATEGORIES.OLIMPIADA,
    navGroup: COURSE_CATEGORIES.OLIMPIADA,
    thumbnailUrl: '/photos/courses/OlimpRiyaz.png',
  },
  {
    id: 11,
    slug: 'olympiad-iq',
    category: COURSE_CATEGORIES.OLIMPIADA,
    navGroup: COURSE_CATEGORIES.OLIMPIADA,
    thumbnailUrl: '/photos/courses/MIQ.png',
  },
  {
    id: 12,
    slug: 'olympiad-english',
    category: COURSE_CATEGORIES.OLIMPIADA,
    navGroup: COURSE_CATEGORIES.OLIMPIADA,
    thumbnailUrl: '/photos/courses/OlimpEng.png',
  },
]

// Utility functions
export function getCourses() {
  return COURSES_DATA
}

export function getCourseById(id) {
  return COURSES_DATA.find(course => course.id === id)
}

export function getCoursesByCategory(category) {
  return COURSES_DATA.filter(course => course.category === category)
}
