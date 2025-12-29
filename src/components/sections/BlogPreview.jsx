import React from "react";
import { Link } from "react-router-dom";
import { getBlogPosts } from "../../services/contentService";

export default function BlogPreview() {
  const blogPosts = getBlogPosts({ limit: 3 });

  return (
    <section className="blogPreview" id="blog">
      <div className="container blogPreview__inner">
        <header className="sectionHeader">
          <span className="sectionLabel">Bloq</span>
          <h2 className="sectionTitle">Son yazılar</h2>
          <p className="sectionDesc">
            Təhsil sahəsində ən son xəbərlər, məsləhətlər və uğur hekayələrimizlə tanış olun.
          </p>
        </header>

        <div className="blogPreview__grid">
          {blogPosts.map((post) => (
            <article key={post.id} className="blogCard">
              <Link to={`/blog?post=${post.slug}`} className="blogCard__link">
                <div className="blogCard__image">
                  <div className="blogCard__imageOverlay">
                    <span className="blogCard__category">Təhsil</span>
                  </div>
                  {/* Fallback gradient if image fails */}
                  <div
                    className="blogCard__imageFallback"
                    style={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
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
            Hamısına bax
          </Link>
        </div>
      </div>
    </section>
  );
}
