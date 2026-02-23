import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { posts } from '../data/posts.js';

const blogCss = `
  .blog-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    max-width: 720px;
  }

  .blog-post-card {
    background: var(--navy-mid);
    border: 1px solid var(--navy-light);
    border-radius: var(--radius-lg);
    padding: 1.75rem;
    transition: border-color var(--transition);
  }

  .blog-post-card:hover {
    border-color: var(--gold);
  }

  .blog-post-card h2 {
    font-size: var(--text-lg);
    margin-bottom: 0.5rem;
  }

  .blog-post-card h2 a {
    color: var(--cream);
    text-decoration: none;
    transition: color var(--transition);
  }

  .blog-post-card h2 a:hover {
    color: var(--gold);
  }

  .blog-post-meta {
    font-family: var(--font-heading);
    font-size: var(--text-sm);
    color: var(--cream-muted);
    margin-bottom: 0.75rem;
  }

  .blog-post-card .excerpt {
    font-size: var(--text-sm);
    line-height: 1.6;
    color: var(--cream-dim);
  }

  .blog-empty {
    max-width: 480px;
    padding: 4rem 2rem;
    background: var(--navy-mid);
    border: 1px solid var(--navy-light);
    border-radius: var(--radius-lg);
    text-align: center;
  }

  .blog-empty h2 {
    font-size: var(--text-lg);
    margin-bottom: 0.75rem;
  }

  .blog-empty p {
    font-style: italic;
    color: var(--cream-dim);
  }
`;

function formatDate(dateStr) {
  const [y, m, d] = dateStr.split('-');
  return new Date(y, m - 1, d).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function Blog() {
  useEffect(() => {
    document.title = 'Blog — Alex Bird Becker';
    const style = document.createElement('style');
    style.textContent = blogCss;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <main>
      <div className="page-header container">
        <span className="section-label">Blog</span>
        <h1>Writing</h1>
      </div>

      <hr className="divider" />

      <section className="section">
        <div className="container">
          {posts.length === 0 ? (
            <div className="blog-empty">
              <h2>Essays coming soon.</h2>
              <p>
                I'm working on writing about digital wellbeing, advocacy strategy, and what
                it takes to build community in the age of the smartphone.
              </p>
            </div>
          ) : (
            <div className="blog-list">
              {posts
                .slice()
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .map(post => (
                  <article className="blog-post-card" key={post.slug}>
                    <p className="blog-post-meta">{formatDate(post.date)}</p>
                    <h2>
                      <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>
                    <p className="excerpt">{post.excerpt}</p>
                  </article>
                ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
