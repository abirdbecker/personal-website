import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { posts } from '../data/posts.js';

const blogPostCss = `
  .blog-post-layout {
    max-width: var(--max-w-prose);
    margin: 0 auto;
    padding: 4rem 1.5rem 6rem;
  }

  .blog-post-back {
    font-family: var(--font-heading);
    font-size: var(--text-sm);
    font-weight: 600;
    color: var(--cream-dim);
    display: inline-block;
    margin-bottom: 2.5rem;
    transition: color var(--transition);
  }

  .blog-post-back:hover {
    color: var(--cream);
  }

  .blog-post-header {
    margin-bottom: 2.5rem;
  }

  .blog-post-header h1 {
    font-size: clamp(1.75rem, 4vw, 2.75rem);
    line-height: 1.2;
    margin-bottom: 0.75rem;
  }

  .blog-post-date {
    font-family: var(--font-heading);
    font-size: var(--text-sm);
    color: var(--cream-muted);
  }

  .blog-post-divider {
    border: none;
    border-top: 1px solid var(--navy-light);
    margin-bottom: 2.5rem;
  }

  .blog-post-body {
    font-family: var(--font-body);
    font-size: var(--text-base);
    color: var(--cream-dim);
    line-height: 1.8;
  }

  .blog-post-body p {
    margin-bottom: 1.5rem;
  }

  .blog-not-found {
    text-align: center;
    padding: 6rem 1.5rem;
  }

  .blog-not-found h2 {
    margin-bottom: 1rem;
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

export default function BlogPost() {
  const { slug } = useParams();
  const post = posts.find(p => p.slug === slug);

  useEffect(() => {
    document.title = post ? `${post.title} — Alex Bird Becker` : 'Post Not Found';
    const style = document.createElement('style');
    style.textContent = blogPostCss;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, [post]);

  if (!post) {
    return (
      <main>
        <div className="blog-not-found container">
          <h2>Post not found.</h2>
          <p style={{ marginBottom: '1.5rem' }}>That post doesn't exist or may have moved.</p>
          <Link to="/blog" className="btn btn-outline">← Back to Blog</Link>
        </div>
      </main>
    );
  }

  const paragraphs = post.content.split(/\n\n+/);

  return (
    <main>
      <div className="blog-post-layout">
        <Link to="/blog" className="blog-post-back">← All posts</Link>
        <header className="blog-post-header">
          <h1>{post.title}</h1>
          <p className="blog-post-date">{formatDate(post.date)}</p>
        </header>
        <hr className="blog-post-divider" />
        <div className="blog-post-body">
          {paragraphs.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </div>
    </main>
  );
}
