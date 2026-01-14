import React, { useState, useEffect, useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Modal from '../components/ui/Modal'
import Breadcrumb from '../components/ui/Breadcrumb'
import { getBlogPosts, getBlogPostBySlug, getBlogCategories } from '../services/contentService'
import ScrollReveal from '../components/ui/ScrollReveal'
import { useLanguage } from '../i18n/LanguageProvider'

// Sanitize HTML content to prevent XSS attacks
// Allows safe formatting tags but removes scripts, event handlers, and dangerous attributes
const sanitizeHTML = (html) => {
  if (!html || typeof html !== 'string') return ''

  const cleaned = html.trim()
  if (!cleaned) return ''

  // Only proceed if we're in the browser (client-side)
  if (typeof document === 'undefined') {
    return cleaned
  }

  try {
    // Create a temporary div to parse and sanitize HTML
    const temp = document.createElement('div')
    // Set HTML content - browser will parse it correctly
    temp.innerHTML = cleaned

    // Remove dangerous elements and attributes
    const dangerousTags = ['script', 'iframe', 'object', 'embed', 'form', 'input', 'button', 'link', 'meta', 'style']
    const dangerousAttributes = ['onerror', 'onload', 'onclick', 'onmouseover', 'onfocus', 'onblur', 'onchange', 'onsubmit', 'onmouseout', 'onkeydown', 'onkeyup']

    // Remove dangerous tags
    dangerousTags.forEach(tag => {
      const elements = temp.querySelectorAll(tag)
      elements.forEach(el => el.remove())
    })

    // Remove dangerous attributes from all elements
    const allElements = temp.querySelectorAll('*')
    allElements.forEach(el => {
      dangerousAttributes.forEach(attr => {
        el.removeAttribute(attr)
      })
      // Remove javascript: and data: URLs from href and src
      const href = el.getAttribute('href')
      const src = el.getAttribute('src')
      if (href && (href.toLowerCase().startsWith('javascript:') || href.toLowerCase().startsWith('data:text/html'))) {
        el.removeAttribute('href')
      }
      if (src && (src.toLowerCase().startsWith('javascript:') || src.toLowerCase().startsWith('data:text/html'))) {
        el.removeAttribute('src')
      }
    })

    // Return the sanitized HTML - innerHTML will properly format it
    const sanitized = temp.innerHTML
    return sanitized || cleaned
  } catch (error) {
    // If sanitization fails, return original (trusted source - translation files)
    return cleaned
  }
}
export default function Blog() {
  const { t, lang } = useLanguage()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchTerm, setSearchTerm] = useState('')
  const allCategoriesText = useMemo(() => t('blog.filter.allCategories'), [t, lang])
  const [selectedCategory, setSelectedCategory] = useState(() => t('blog.filter.allCategories'))
  const [selectedPost, setSelectedPost] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const allPostsData = useMemo(() => getBlogPosts(), [])

  // Map original category names to translation keys
  const categoryKeyMap = useMemo(() => ({
    'SAT': 'sat',
    'IELTS': 'ielts',
    'TOEFL': 'toefl',
    'General English': 'general-english',
    'Xaricdə təhsil': 'xaricdə-təhsil',
    'Olimpiada': 'olimpiada',
  }), [])

  // Translate blog posts based on current language
  const allPosts = useMemo(() => {
    return allPostsData.map(post => {
      const categoryKey = categoryKeyMap[post.category] || post.category.toLowerCase().replace(/\s+/g, '-')
      const translatedCategory = t(`blog.categories.${categoryKey}`) || post.category
      const translatedContent = t(`blog.data.${post.slug}.content`)
      return {
        ...post,
        title: t(`blog.data.${post.slug}.title`) || post.title,
        excerpt: t(`blog.data.${post.slug}.excerpt`) || post.excerpt,
        category: translatedCategory,
        content: (translatedContent || post.content || '').trim(),
        coverImage: post.coverImage || post.coverUrl,
        date: t(`blog.data.${post.slug}.date`) || post.date,
        readTime: t(`blog.data.${post.slug}.readTime`) || post.readTime,
      }
    })
  }, [allPostsData, t, lang, categoryKeyMap])

  const categoriesData = useMemo(() => getBlogCategories(), [])
  const categories = useMemo(() => {
    return categoriesData.map(cat => {
      const key = categoryKeyMap[cat] || cat.toLowerCase().replace(/\s+/g, '-')
      return t(`blog.categories.${key}`) || cat
    })
  }, [categoriesData, t, lang, categoryKeyMap])

  // Update selectedCategory when language changes
  useEffect(() => {
    setSelectedCategory(prevCategory => {
      if (!prevCategory || prevCategory === allCategoriesText) {
        return allCategoriesText
      } else {
        // Try to find matching translated category
        const originalCategory = categoriesData.find(cat => {
          const key = categoryKeyMap[cat] || cat.toLowerCase().replace(/\s+/g, '-')
          const translated = t(`blog.categories.${key}`) || cat
          return translated === prevCategory
        })
        if (originalCategory) {
          const key = categoryKeyMap[originalCategory] || originalCategory.toLowerCase().replace(/\s+/g, '-')
          const newTranslated = t(`blog.categories.${key}`) || originalCategory
          return newTranslated
        } else {
          return allCategoriesText
        }
      }
    })
  }, [lang, allCategoriesText, t, categoriesData, categoryKeyMap])

  // Get post from URL param on mount and translate
  useEffect(() => {
    const postSlug = searchParams.get('post')
    if (postSlug) {
      const postData = getBlogPostBySlug(postSlug)
      if (postData) {
        // Translate post data
        const categoryKey = categoryKeyMap[postData.category] || postData.category.toLowerCase().replace(/\s+/g, '-')
        const translatedCategory = t(`blog.categories.${categoryKey}`) || postData.category
        const translatedContent = t(`blog.data.${postData.slug}.content`)
        const translatedPost = {
          ...postData,
          title: t(`blog.data.${postData.slug}.title`) || postData.title,
          excerpt: t(`blog.data.${postData.slug}.excerpt`) || postData.excerpt,
          category: translatedCategory,
          content: (translatedContent || postData.content || '').trim(),
          coverImage: postData.coverImage || postData.coverUrl,
          date: t(`blog.data.${postData.slug}.date`) || postData.date,
          readTime: t(`blog.data.${postData.slug}.readTime`) || postData.readTime,
        }
        setSelectedPost(translatedPost)
        setIsModalOpen(true)
      } else {
        // Remove invalid slug from URL
        const newSearchParams = new URLSearchParams(searchParams)
        newSearchParams.delete('post')
        setSearchParams(newSearchParams, { replace: true })
      }
    }
  }, [searchParams, setSearchParams, t, lang])

  // Filtered posts based on search and category
  const filteredPosts = useMemo(() => {
    return allPosts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesCategory = selectedCategory === allCategoriesText ||
        post.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [allPosts, searchTerm, selectedCategory, allCategoriesText, t])

  const openPostModal = (post) => {
    // Post is already translated in allPosts
    setSelectedPost(post)
    setIsModalOpen(true)
    setSearchParams({ post: post.slug })
  }

  const closePostModal = () => {
    setIsModalOpen(false)
    setSelectedPost(null)
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.delete('post')
    setSearchParams(newSearchParams, { replace: true })
  }

  const resetFilters = () => {
    setSearchTerm('')
    setSelectedCategory(allCategoriesText)
  }

  return (
    <main className="container page">
      <ScrollReveal
        baseOpacity={0}
        enableBlur={true}
        baseRotation={0}
        blurStrength={10}
      >
        <Breadcrumb
          items={[
            { href: '/', label: t('blog.breadcrumb.home') },
            { label: t('blog.breadcrumb.blog') }
          ]}
        />
      </ScrollReveal>
      <div className="pageContentAbout">
        <ScrollReveal
          baseOpacity={0}
          enableBlur={true}
          baseRotation={0}
          blurStrength={10}
        >
          <header className="pageHeader">
            <h1>{t('blog.page.title')}</h1>
            <p className="pageIntro">
              {t('blog.page.intro')}
            </p>
          </header>
        </ScrollReveal>
        <div className="pageBody">
          {/* Search and Filter Controls */}
          <ScrollReveal
            baseOpacity={0}
            enableBlur={true}
            baseRotation={0}
            blurStrength={10}
          >
            <div className="blog-controls">
              <div className="blog-search">
                <input
                  type="text"
                  placeholder={t('blog.search.placeholder')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="blog-search-input"
                />
              </div>

              <div className="blog-filter">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="blog-filter-select"
                >
                  <option value={allCategoriesText}>{allCategoriesText}</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {(searchTerm || selectedCategory !== allCategoriesText) && (
                <button
                  onClick={resetFilters}
                  className="button button--secondary blog-reset"
                >
                  {t('blog.reset')}
                </button>
              )}
            </div>
          </ScrollReveal>
          {/* Blog Grid */}
          <ScrollReveal
            baseOpacity={0}
            enableBlur={true}
            baseRotation={0}
            blurStrength={10}
          >
            <section className="blog-grid">
              {filteredPosts.length > 0 ? (
                filteredPosts.map(post => (
                  <article
                    key={post.id}
                    className="blog-card"
                    onClick={() => openPostModal(post)}
                    role="button"
                    tabIndex="0"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        openPostModal(post)
                      }
                    }}
                  >
                    <div className="blog-card__image">
                      {post.coverImage ? (
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          loading="lazy"
                        />
                      ) : (
                        <div className="blog-card__image-placeholder">
                          <span>📄</span>
                        </div>
                      )}
                      <span className={`blog-card__category blog-card__category--${(post.category || '').toLowerCase().replace(/\s/g, '-')}`}>
                        {post.category}
                      </span>
                    </div>

                    <div className="blog-card__content">
                      <h3 className="blog-card__title">{post.title}</h3>
                      <p className="blog-card__excerpt">{post.excerpt}</p>

                      <div className="blog-card__meta">
                        <time className="blog-card__date" dateTime={post.date}>
                          {post.date}
                        </time>
                        {post.readTime && (
                          <span className="blog-card__read-time">{post.readTime}</span>
                        )}
                      </div>
                    </div>
                  </article>
                ))
              ) : (
                <div className="blog-empty">
                  <h3>{t('blog.empty.title')}</h3>
                  <p>{t('blog.empty.message')}</p>
                  <button onClick={resetFilters} className="button button--primary">
                    {t('blog.empty.showAll')}
                  </button>
                </div>
              )}
            </section>
          </ScrollReveal>
        </div>
      </div>
      <ScrollReveal
        baseOpacity={0}
        enableBlur={true}
        baseRotation={0}
        blurStrength={10}
      >
        {/* Blog Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={closePostModal}
          title={selectedPost?.title || ''}
          size="large"
        >
          {selectedPost && (
            <div className="blog-modal">
              <div className="blog-modal__header">
                <div className="blog-modal__meta">
                  <span className={`blog-modal__category blog-modal__category--${(selectedPost.category || '').toLowerCase().replace(/\s/g, '-')}`}>
                    {selectedPost.category}
                  </span>
                  <time className="blog-modal__date" dateTime={selectedPost.date}>
                    {selectedPost.date}
                  </time>
                  {selectedPost.readTime && (
                    <span className="blog-modal__read-time">{selectedPost.readTime}</span>
                  )}
                </div>

                <h1 className="blog-modal__title">{selectedPost.title}</h1>
              </div>

              {selectedPost.coverImage && (
                <div className="blog-modal__cover">
                  <img
                    src={selectedPost.coverImage}
                    alt={selectedPost.title}
                  />
                </div>
              )}

              <div
                className="blog-modal__content"
                dangerouslySetInnerHTML={{ __html: sanitizeHTML(selectedPost.content || '') }}
              />
            </div>
          )}
        </Modal>
      </ScrollReveal>
    </main>
  )
}