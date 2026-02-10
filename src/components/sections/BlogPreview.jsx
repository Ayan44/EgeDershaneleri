import React from "react";
import { Link } from "react-router-dom";
import { fetchAllPosts } from "../../services/contentService";
import ScrollReveal from "../ui/ScrollReveal";
import { useLanguage } from "../../i18n/LanguageProvider";

export default function BlogPreview() {
  const { t, lang } = useLanguage()
  const [blogPostsData, setBlogPostsData] = React.useState([])

  React.useEffect(() => {
    fetchAllPosts().then(data => {
      if (data) {
        setBlogPostsData(data.slice(0, 3))
      }
    })
  }, [])

  // Translate blog posts based on current language
  const blogPosts = React.useMemo(() => {
    return blogPostsData.map(post => {
      let title, excerpt
      if (lang === 'en') {
        title = post.title_en || post.title
        excerpt = post.excerpt_en || post.excerpt
      } else {
        title = post.title || post.title_en
        excerpt = post.excerpt || post.excerpt_en
      }

      const categoryKey = post.category?.toLowerCase().replace(/\s+/g, '-') || ''
      const translatedCategory = categoryKey ? (t(`blog.categories.${categoryKey}`) || post.category) : post.category

      return {
        ...post,
        title,
        excerpt,
        category: translatedCategory,
        coverImage: post.coverUrl
      }
    })
  }, [blogPostsData, t, lang])

  return (
    <ScrollReveal
      baseOpacity={0}
      enableBlur={true}
      baseRotation={0}
      blurStrength={10}
    >
      <section className="blogPreview" id="blog">
        <div className="container blogPreview__inner">
          <header className="sectionHeader">
            <span className="sectionLabel">{t('blogPreview.label')}</span>
            <h2 className="sectionTitle">{t('blogPreview.title')}</h2>
            <p className="sectionDesc">
              {t('blogPreview.description')}
            </p>
          </header>

          <div className="blogPreview__grid">
            {blogPosts.map((post) => (
              <article key={post.id} className="blogCard">
                <Link to={`/blog?post=${post.slug}`} className="blogCard__link">
                  <div className="blogCard__image">
                    <div className="blogCard__imageOverlay">
                      <span className="blogCard__category">{post.category || t('blogPreview.category')}</span>
                    </div>
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="blogCard__imageSrc"
                      loading="lazy"
                      onError={(e) => {
                        // Fallback to gradient if image fails to load
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                      }}
                    />
                    {/* Fallback gradient if image fails */}
                    <div
                      className="blogCard__imageFallback"
                      style={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        display: 'none'
                      }}
                    />
                  </div>

                  <div className="blogCard__content">
                    <h3 className="blogCard__title">{post.title}</h3>
                    <p className="blogCard__excerpt">{post.excerpt}</p>
                    <time className="blogCard__date" dateTime={post.date}>
                      {post.date}
                    </time>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          <div className="blogPreview__cta">
            <Link to="/blog" className="button button--primary">
              {t('blogPreview.viewAll')}
            </Link>
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
}
