
import { client, urlFor } from '../lib/sanityClient'

// Helper to convert block content to plain text
function toPlainText(blocks = []) {
  if (!blocks || !Array.isArray(blocks)) return blocks || ''
  return blocks
    .map(block => {
      if (block._type !== 'block' || !block.children) {
        return ''
      }
      return block.children.map(child => child.text).join('')
    })
    .join('\n\n')
}

// Courses






// Teachers




export async function fetchAllTeamMembers() {
  try {
    const query = `*[_type == "teamMember"] | order(order asc) {
      ...,
      "slug": slug.current,
      "courses": courses[]->{ "slug": slug.current }
    }`
    const members = await client.fetch(query)
    return members.map(member => ({
      ...member,
      id: member._id,
      // Keep role as internal value for filtering
      roleType: member.role, // 'teacher' or 'staff'
      
      // AZ fields
      fullName: member.name,
      jobTitle: member.title || (member.role === 'teacher' ? 'Müəllim' : 'Əməkdaş'), // Job title with fallback
      bio: toPlainText(member.bio),
      
      // EN fields
      fullName_en: member.name_en,
      jobTitle_en: member.title_en || (member.role === 'teacher' ? 'Teacher' : 'Staff'), // Job title with fallback
      bio_en: toPlainText(member.bio_en),

      photoUrl: member.photo ? urlFor(member.photo).url() : null,
      courseSlugs: member.courses ? member.courses.map(c => c.slug) : [],
      skills: member.skills || []
    }))
  } catch (error) {
    console.error("Sanity fetch failed. This is likely a CORS issue.")
    console.error("👉 ACTION REQUIRED: Go to https://www.sanity.io/manage, select your project, go to API > CORS Origins, and add: http://localhost:5173")
    console.warn("Falling back to local data...", error)
    return null
  }
}



export async function fetchTeacherBySlug(slug) {
    try {
        const query = `*[_type == "teamMember" && slug.current == $slug][0] {
          ...,
          "slug": slug.current,
          "courses": courses[]->{ "slug": slug.current }
        }`
        const member = await client.fetch(query, { slug })
        if (!member) return null
        
        return {
          ...member,
          id: member._id,
          roleType: member.role,
          
          // AZ
          fullName: member.name,
          jobTitle: member.title || (member.role === 'teacher' ? 'Müəllim' : 'Əməkdaş'),
          bio: toPlainText(member.bio),

          // EN
          fullName_en: member.name_en,
          jobTitle_en: member.title_en || (member.role === 'teacher' ? 'Teacher' : 'Staff'),
          bio_en: toPlainText(member.bio_en),

          photoUrl: member.photo ? urlFor(member.photo).url() : null,
          courseSlugs: member.courses ? member.courses.map(c => c.slug) : [],
          skills: member.skills || []
        }
    } catch (error) {
        console.warn("Sanity fetch failed:", error)
        return null
    }
}

// Testimonials
export async function getTestimonials({ limit } = {}) {
  try {
    const query = `*[_type == "testimonial"] | order(order asc, _createdAt desc)`
    const testimonials = await client.fetch(query)
    
    if (limit) {
      return testimonials.slice(0, limit)
    }
    return testimonials.map(t => ({
      ...t,
      id: t._id, // Map _id to id for component compatibility
      image: t.photo ? urlFor(t.photo).url() : null
    }))
  } catch (error) {
    console.error("Failed to fetch testimonials from Sanity:", error)
    return []
  }
}

// Site Settings
export async function fetchSiteSettings() {
  try {
    const query = `*[_type == "siteSettings"][0]`
    const settings = await client.fetch(query)
    
    if (!settings) {
      return null
    }

    return {
      ...settings,
      founderPhoto: settings.founderPhoto ? urlFor(settings.founderPhoto).url() : null,
      statisticsImage: settings.statisticsImage ? urlFor(settings.statisticsImage).url() : null,
      studyAbroadHero: settings.studyAbroadHero ? urlFor(settings.studyAbroadHero).url() : null,
    }
  } catch (error) {
    console.error('Error fetching site settings:', error)
    return null
  }
}

// Blog Posts

// Utility functions






export async function fetchFeaturedTeachers() {
  try {
    // Fetch teachers (role == "teacher"). Can also filter by featured if needed, but requirements said "Home slider that must show ONLY teachers"
    const query = `*[_type == "teamMember" && role == "teacher"] | order(order asc) {
       ...,
      "slug": slug.current,
      "courses": courses[]->{ "slug": slug.current }
    }`
    const teachers = await client.fetch(query)
    return teachers.map(teacher => ({
      ...teacher,
      id: teacher._id,
      roleType: teacher.role,
      
      // AZ
      fullName: teacher.name,
      jobTitle: teacher.title || (teacher.role === 'teacher' ? 'Müəllim' : 'Əməkdaş'),
      bio: toPlainText(teacher.bio),

      // EN
      fullName_en: teacher.name_en,
      jobTitle_en: teacher.title_en || (teacher.role === 'teacher' ? 'Teacher' : 'Staff'),
      bio_en: toPlainText(teacher.bio_en),

      photoUrl: teacher.photo ? urlFor(teacher.photo).url() : null,
      courseSlugs: teacher.courses ? teacher.courses.map(c => c.slug) : [],
       specialties: []
    }))
  } catch (error) {
    console.error("Sanity fetch failed (Featured Teachers). Likely CORS issue.")
    console.warn("Falling back to local data...", error)
    return null
  }
}

// ============================================
// COURSE DATA FETCHING
// ============================================

/**
 * Fetch all courses from Sanity
 */
export async function fetchAllCourses() {
  try {
    const query = `*[_type == "course"] | order(order asc) {
      ...,
      "slug": slug.current
    }`
    const courses = await client.fetch(query)
    return courses.map(course => ({
      ...course,
      id: course._id,
      
      // AZ
      title: course.title,
      shortDescription: course.shortDescription,
      level: course.level,
      format: course.format,
      audience: course.audience || [],
      learningOutcomes: course.learningOutcomes || [],
      
      // EN
      title_en: course.title_en,
      shortDescription_en: course.shortDescription_en,
      level_en: course.level_en,
      format_en: course.format_en,
      audience_en: course.audience_en || [],
      learningOutcomes_en: course.learningOutcomes_en || [],
      
      // Common
      thumbnailUrl: course.thumbnail ? urlFor(course.thumbnail).url() : null,
      category: course.category,
      slug: course.slug,
    }))
  } catch (error) {
    console.error("Failed to fetch courses from Sanity:", error)
    return null
  }
}

/**
 * Fetch a single course by slug from Sanity
 */
export async function fetchCourseBySlug(slug) {
  try {
    const query = `*[_type == "course" && slug.current == $slug][0] {
      ...,
      "slug": slug.current
    }`
    const course = await client.fetch(query, { slug })
    
    if (!course) return null
    
    return {
      ...course,
      id: course._id,
      
      // AZ
      title: course.title,
      shortDescription: course.shortDescription,
      level: course.level,
      format: course.format,
      audience: course.audience || [],
      learningOutcomes: course.learningOutcomes || [],
      
      // EN
      title_en: course.title_en,
      shortDescription_en: course.shortDescription_en,
      level_en: course.level_en,
      format_en: course.format_en,
      audience_en: course.audience_en || [],
      learningOutcomes_en: course.learningOutcomes_en || [],
      
      // Common
      thumbnailUrl: course.thumbnail ? urlFor(course.thumbnail).url() : null,
      category: course.category,
      slug: course.slug,
    }
  } catch (error) {
    console.error(`Failed to fetch course ${slug} from Sanity:`, error)
    return null
  }
}

export function getTeachersForCourse(courseSlug) {
  return TEAM_MEMBERS_DATA.filter(teacher => teacher.courseSlugs && teacher.courseSlugs.includes(courseSlug))
}

// Blog Posts

// ============================================
// BLOG POSTS FETCHING
// ============================================

/**
 * Fetch all blog posts from Sanity
 */
export async function fetchAllPosts() {
  try {
    const query = `*[_type == "post"] | order(publishDate desc, order asc) {
      ...,
      "slug": slug.current,
      "author": author-> { name, name_en, "slug": slug.current }
    }`
    const posts = await client.fetch(query)
    return posts.map(post => ({
      ...post,
      id: post._id,
      slug: post.slug,
      coverUrl: post.coverImage ? urlFor(post.coverImage).url() : null,
      
      // AZ
      title: post.title_az,
      excerpt: post.excerpt_az,
      content: post.content_az,
      
      // EN
      title_en: post.title_en,
      excerpt_en: post.excerpt_en,
      content_en: post.content_en,
      
      date: post.publishDate,
      readTime: post.readingTime,
      category: post.category,
      author: post.author
    }))
  } catch (error) {
    console.error("Failed to fetch posts from Sanity:", error)
    return null
  }
}

/**
 * Fetch a single blog post by slug from Sanity
 */
export async function fetchPostBySlug(slug) {
  try {
    const query = `*[_type == "post" && slug.current == $slug][0] {
      ...,
      "slug": slug.current,
      "author": author-> { name, name_en, "slug": slug.current }
    }`
    const post = await client.fetch(query, { slug })
    if (!post) return null
    
    return {
      ...post,
      id: post._id,
      slug: post.slug,
      coverUrl: post.coverImage ? urlFor(post.coverImage).url() : null,
      
      // AZ
      title: post.title_az,
      excerpt: post.excerpt_az,
      content: post.content_az,
      
      // EN
      title_en: post.title_en,
      excerpt_en: post.excerpt_en,
      content_en: post.content_en,
      
      date: post.publishDate,
      readTime: post.readingTime,
      category: post.category,
      author: post.author
    }
  } catch (error) {
    console.error(`Failed to fetch post ${slug} from Sanity:`, error)
    return null
  }
}

// ============================================
// STUDENT RESULTS & SUCCESS STORIES
// ============================================

/**
 * Fetch all student results from Sanity
 */
export async function fetchStudentResults() {
  try {
    const query = `*[_type == "studentResult"] | order(order asc)`
    const results = await client.fetch(query)
    
    return results.map(r => ({
      id: r.order,
      nameAz: r.nameAz,
      nameEn: r.nameEn,
      photo: r.photo ? urlFor(r.photo).url() : null,
      examType: r.examType,
      scoreAz: r.scoreAz,
      scoreEn: r.scoreEn,
      acceptedCountryAz: r.acceptedCountryAz,
      acceptedCountryEn: r.acceptedCountryEn,
      acceptedUniversityAz: r.acceptedUniversityAz,
      acceptedUniversityEn: r.acceptedUniversityEn,
    }))
  } catch (error) {
    console.error("Failed to fetch student results from Sanity:", error)
    return null
  }
}

/**
 * Fetch all success stories from Sanity
 */
export async function fetchSuccessStories() {
  try {
    const query = `*[_type == "successStory"] | order(order asc)`
    const stories = await client.fetch(query)
    
    return stories.map(s => ({
      id: s.order,
      nameAz: s.nameAz,
      nameEn: s.nameEn,
      photo: s.photo ? urlFor(s.photo).url() : null,
      beforeAfterAz: s.beforeAfterAz,
      beforeAfterEn: s.beforeAfterEn,
      storyAz: s.storyAz,
      storyEn: s.storyEn,
      highlights: {
        durationAz: s.highlightDurationAz,
        durationEn: s.highlightDurationEn,
        typeAz: s.highlightTypeAz,
        typeEn: s.highlightTypeEn,
        programAz: s.highlightProgramAz,
        programEn: s.highlightProgramEn,
      },
      imageLeft: s.imageLeft,
    }))
  } catch (error) {
    console.error("Failed to fetch success stories from Sanity:", error)
    return null
  }
}

/**
 * Fetch gallery items from Sanity
 */
export async function getGalleryItems() {
  try {
    const query = `*[_type == "galleryItem"] | order(order asc, _createdAt desc) {
      _id,
      title,
      altAz,
      altEn,
      image
    }`
    const items = await client.fetch(query)
    return items.map(item => ({
      _id: item._id,
      title: item.title,
      altAz: item.altAz,
      altEn: item.altEn,
      image: item.image
    }))
  } catch (error) {
    console.error("Failed to fetch gallery items from Sanity:", error)
    return []
  }
}
