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
    category: COURSE_CATEGORIES.IMTAHAN,
    order: 1,
    navGroup: 'main',
    thumbnailUrl: '/courses/course.jpg',
  },
  {
    id: 'yos-tys',
    slug: 'yos-tys',
    category: COURSE_CATEGORIES.IMTAHAN,
    order: 2,
    navGroup: 'main',
    thumbnailUrl: '/courses/course.jpg',
  },
  {
    id: 'ielts',
    slug: 'ielts',
    category: COURSE_CATEGORIES.DIL,
    order: 3,
    navGroup: 'main',
    thumbnailUrl: '/courses/course.jpg',
  },
  {
    id: 'toefl',
    slug: 'toefl',
    category: COURSE_CATEGORIES.DIL,
    order: 4,
    navGroup: 'main',
    thumbnailUrl: '/courses/course.jpg',
  },
  {
    id: 'general-english',
    slug: 'general-english',
    category: COURSE_CATEGORIES.DIL,
    order: 5,
    navGroup: 'main',
    thumbnailUrl: '/courses/course.jpg',
  },
  {
    id: 'olympiad-math',
    slug: 'olympiad-math',
    category: COURSE_CATEGORIES.OLIMPIADA,
    order: 6,
    navGroup: 'olympiad',
    thumbnailUrl: '/courses/course.jpg',
  },
  {
    id: 'olympiad-iq',
    slug: 'olympiad-iq',
    category: COURSE_CATEGORIES.OLIMPIADA,
    order: 7,
    navGroup: 'olympiad',
    thumbnailUrl: '/courses/course.jpg',
  },
  {
    id: 'olympiad-english',
    slug: 'olympiad-english',
    category: COURSE_CATEGORIES.OLIMPIADA,
    order: 8,
    navGroup: 'olympiad',
    thumbnailUrl: '/courses/course.jpg',
  },
  {
    id: 'graduation-preparation',
    slug: 'graduation-preparation',
    category: COURSE_CATEGORIES.IMTAHAN,
    order: 9,
    navGroup: 'main',
    thumbnailUrl: '/courses/course.jpg',
  },
  {
    id: 'entrant-preparation',
    slug: 'entrant-preparation',
    category: COURSE_CATEGORIES.IMTAHAN,
    order: 10,
    navGroup: 'main',
    thumbnailUrl: '/courses/course.jpg',
  },
  {
    id: 'miq',
    slug: 'miq',
    category: COURSE_CATEGORIES.IMTAHAN,
    order: 11,
    navGroup: 'main',
    thumbnailUrl: '/courses/course.jpg',
  },
  {
    id: 'russian-language',
    slug: 'russian-language',
    category: COURSE_CATEGORIES.DIL,
    order: 12,
    navGroup: 'main',
    thumbnailUrl: '/courses/course.jpg',
  },
  {
    id: 'german-language',
    slug: 'german-language',
    category: COURSE_CATEGORIES.DIL,
    order: 13,
    navGroup: 'main',
    thumbnailUrl: '/courses/course.jpg',
  }
]

// Helper functions
export const getCourses = () => COURSES_DATA

export const getCourseById = (id) => COURSES_DATA.find(course => course.id === id)

export const getCoursesForGrid = () => {
  return COURSES_DATA.map(course => ({
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
