import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { press } from '../data/press.js';

const aboutCss = `
  .about-bio {
    max-width: var(--max-w-prose);
  }

  .about-bio p {
    margin-bottom: 1.4rem;
    font-size: var(--text-base);
    line-height: 1.8;
  }

  .about-bio p:last-child {
    margin-bottom: 0;
  }

  .pull-quote {
    margin: 4rem 0;
    padding: 1.75rem 0 1.75rem 2rem;
    border-left: 3px solid var(--gold);
  }

  .pull-quote p {
    font-style: italic;
    font-size: clamp(1.2rem, 2.5vw, 1.5rem);
    color: var(--cream);
    line-height: 1.5;
    margin: 0;
  }

  /* Press */
  .press-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.25rem;
  }

  .press-card {
    background: var(--navy-mid);
    border: 1px solid var(--navy-light);
    border-radius: var(--radius-lg);
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    transition: border-color var(--transition);
    text-decoration: none;
  }

  .press-card:hover {
    border-color: var(--gold);
  }

  .press-pub {
    font-family: var(--font-heading);
    font-size: var(--text-sm);
    font-weight: 700;
    color: var(--gold);
  }

  .press-type-badge {
    display: inline-block;
    font-family: var(--font-heading);
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    background: var(--navy-light);
    color: var(--cream-muted);
    padding: 0.15rem 0.5rem;
    border-radius: 3px;
    margin-left: 0.5rem;
  }

  .press-headline {
    font-size: var(--text-sm);
    color: var(--cream);
    line-height: 1.4;
    font-family: var(--font-heading);
    font-weight: 500;
  }

  .press-date {
    font-size: 0.8rem;
    color: var(--cream-muted);
    font-family: var(--font-heading);
    margin-top: auto;
  }

  @media (max-width: 860px) {
    .press-grid { grid-template-columns: repeat(2, 1fr); }
  }

  @media (max-width: 520px) {
    .press-grid { grid-template-columns: 1fr; }
  }
`;

function formatDate(dateStr) {
  const [y, m, d] = dateStr.split('-');
  return new Date(y, m - 1, d).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

export default function About() {
  useEffect(() => {
    document.title = 'About — Alex Bird Becker';
    const style = document.createElement('style');
    style.textContent = aboutCss;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <main>
      <div className="page-header container">
        <span className="section-label">About</span>
        <h1>Alex Bird Becker</h1>
      </div>

      <hr className="divider" />

      <section className="section">
        <div className="container">
          <div className="about-bio">
            <p>
              Delaware County, PA. Former teacher, trained researcher. Still asking questions.
              I work on digital wellbeing — through policy, community, and the tools
              that make organizing possible.
            </p>
          </div>
        </div>
      </section>

      {/* Press */}
      {press.length > 0 && (
        <>
          <hr className="divider" />
          <section className="section" id="press">
            <div className="container">
              <span className="section-label">Press</span>
              <h2 style={{ marginBottom: '2rem' }}>In the news</h2>
              <div className="press-grid">
                {press.map(item => (
                  <a
                    key={item.publication + item.date}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="press-card"
                  >
                    <span className="press-pub">
                      {item.publication}
                      <span className="press-type-badge">{item.type}</span>
                    </span>
                    <p className="press-headline">{item.headline}</p>
                    <span className="press-date">{formatDate(item.date)}</span>
                  </a>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      <hr className="divider" />

      <section className="section-sm" style={{ textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ marginBottom: '0.75rem' }}>Want to work together?</h2>
          <p style={{ maxWidth: '440px', margin: '0 auto 1.5rem' }}>
            Speaking, consulting, or community collaboration — I'd love to hear what you're building.
          </p>
          <Link to="/speaking" className="btn btn-primary">Get in touch</Link>
        </div>
      </section>
    </main>
  );
}
