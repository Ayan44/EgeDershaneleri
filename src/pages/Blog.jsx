import React, { useState, useEffect, useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Modal from '../components/ui/Modal'
import Breadcrumb from '../components/ui/Breadcrumb'
import { getBlogPosts, getBlogPostBySlug, getBlogCategories } from '../services/contentService'
import ScrollReveal from '../components/ui/ScrollReveal'
export default function Blog() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Bütün kateqoriyalar')
  const [selectedPost, setSelectedPost] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const allPosts = getBlogPosts()
  const categories = getBlogCategories()

  // Get post from URL param on mount
  useEffect(() => {
    const postSlug = searchParams.get('post')
    if (postSlug) {
      const post = getBlogPostBySlug(postSlug)
      if (post) {
        setSelectedPost(post)
        setIsModalOpen(true)
      } else {
        // Remove invalid slug from URL
        const newSearchParams = new URLSearchParams(searchParams)
        newSearchParams.delete('post')
        setSearchParams(newSearchParams, { replace: true })
      }
    }
  }, [searchParams, setSearchParams])

  // Filtered posts based on search and category
  const filteredPosts = useMemo(() => {
    return allPosts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesCategory = selectedCategory === 'Bütün kateqoriyalar' ||
        post.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [allPosts, searchTerm, selectedCategory])

  const openPostModal = (post) => {
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
    setSelectedCategory('Bütün kateqoriyalar')
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
            { href: '/', label: 'Ana səhifə' },
            { label: 'Bloq' }
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
            <h1>Bloq</h1>
            <p className="pageIntro">
              Təhsil sahəsində ən son xəbərlər, məsləhətlər və uğur hekayələrimizlə tanış olun.
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
                placeholder="Bloq axtar..."
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
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {(searchTerm || selectedCategory !== 'Bütün kateqoriyalar') && (
              <button
                onClick={resetFilters}
                className="button button--secondary blog-reset"
              >
                Sıfırla
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
                    <span className={`blog-card__category blog-card__category--${post.category.toLowerCase().replace(/\s/g, '-')}`}>
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
                <h3>Nəticə tapılmadı</h3>
                <p>Axtardığınız kriteriyalara uyğun bloq yazısı tapılmadı.</p>
                <button onClick={resetFilters} className="button button--primary">
                  Bütün yazıları göstər
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
                <span className={`blog-modal__category blog-modal__category--${selectedPost.category.toLowerCase().replace(/\s/g, '-')}`}>
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
              dangerouslySetInnerHTML={{ __html: selectedPost.content }}
            />
          </div>
        )}
        </Modal>
        </ScrollReveal>
    </main>
  )
}