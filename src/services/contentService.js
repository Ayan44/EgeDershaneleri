import { COURSES_DATA } from '../data/courses'
import { TEACHERS_DATA } from '../data/teachers'
import { TESTIMONIALS_DATA } from '../data/testimonials'
import { BLOG_POSTS_DATA } from '../data/blogPosts'
import { BLOG_POSTS_DATA as BLOG_DATA } from '../data/blog'

// Courses
export function getCourses() {
  return COURSES_DATA
}

export function getCourseBySlug(slug) {
  return COURSES_DATA.find(course => course.slug === slug)
}

export function getCoursesForNav() {
  const grouped = {}

  COURSES_DATA.forEach(course => {
    const group = course.navGroup
    if (!grouped[group]) {
      grouped[group] = []
    }
    grouped[group].push({
      label: course.title,
      to: course.slug.startsWith('olympiad-')
        ? `/courses/olympiad/${course.slug.replace('olympiad-', '')}`
        : `/courses/${course.slug}`
    })
  })

  return grouped
}

// Teachers
export function getTeachers({ featuredOnly = false } = {}) {
  if (featuredOnly) {
    return TEACHERS_DATA.filter(teacher => teacher.featured)
  }
  return TEACHERS_DATA
}

export function getTeacherBySlug(slug) {
  return TEACHERS_DATA.find(teacher => teacher.slug === slug)
}

// Testimonials
export function getTestimonials({ limit } = {}) {
  const testimonials = [...TESTIMONIALS_DATA]
  if (limit) {
    return testimonials.slice(0, limit)
  }
  return testimonials
}

// Blog Posts

// Utility functions
export function getCourseById(id) {
  return COURSES_DATA.find(course => course.id === id)
}

export function getCoursesByCategory(category) {
  return COURSES_DATA.filter(course => course.category === category)
}

export function getFeaturedTeachers() {
  return getTeachers({ featuredOnly: true })
}

export function getTeachersForCourse(courseSlug) {
  return TEACHERS_DATA.filter(teacher => teacher.courseSlugs.includes(courseSlug))
}

// Blog Posts
export function getBlogPosts({ limit, category } = {}) {
  let posts = [...BLOG_DATA].sort((a, b) => new Date(b.date) - new Date(a.date))

  if (category && category !== 'Bütün kateqoriyalar') {
    posts = posts.filter(post => post.category === category)
  }

  if (limit) {
    posts = posts.slice(0, limit)
  }

  return posts
}

export function getBlogPostBySlug(slug) {
  return BLOG_DATA.find(post => post.slug === slug)
}

export function getBlogCategories() {
  const categories = new Set(BLOG_DATA.map(post => post.category))
  return Array.from(categories).sort()
}
